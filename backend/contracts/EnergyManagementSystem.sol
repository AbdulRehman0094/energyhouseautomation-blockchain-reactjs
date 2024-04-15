// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EnergyManagementSystem {
    uint256 public totalSoldToGrid;
    uint256 public totalBoughtFromGrid;

    uint256 public constant sellUnitsToGridPrice = 10; // per unit
    uint256 public constant buyUnitsFromGridPrice = 15; // per unit

    struct HouseRecord {
        uint256 totalUnitsSold;
        uint256 unitsSoldButNotPaid;
    }

    struct HouseInfo {
        string houseName;
        string houseAddress;
        uint256 houseId;
        uint256 energyProduction;
        uint256 energyConsumption;
        address houseOwner;
        address gridStation;
        uint256 boughtFromGrid;
        uint256 soldToGrid;
    }

    struct Owner {
        string username;
        address userAddress;
    }

    mapping(address => HouseRecord) public houseRecords;
    mapping(uint256 => HouseInfo) public houses;
    mapping(address => Owner) public users;

    uint256 public houseCount = 0;

    event EnergyTransaction(
        address indexed from,
        address indexed to,
        uint256 units
    );

    receive() external payable {}

    // Method to register a new user
    function registerOwner(string memory _username) external {
        require(!isOwnerExist(msg.sender), "User already exists");
        users[msg.sender] = Owner(_username, msg.sender);
    }

    // Method to check if a user already exists
    function isOwnerExist(address _userAddress) public view returns (bool) {
        return users[_userAddress].userAddress != address(0);
    }

    // Method to add a new house
    function addHouse(
        string memory _houseName,
        string memory _houseAddress,
        address _gridStation
    ) external {
        houseCount++;
        houses[houseCount] = HouseInfo(
            _houseName,
            _houseAddress,
            houseCount,
            0,
            0,
            msg.sender,
            _gridStation,
            0,
            0
        );
    }

    // Method to get all houses
    function getAllHouses() external view returns (HouseInfo[] memory) {
        HouseInfo[] memory allHouses = new HouseInfo[](houseCount);
        for (uint256 i = 1; i <= houseCount; i++) {
            allHouses[i - 1] = houses[i];
        }
        return allHouses;
    }

    // Method to get house by ID
    function getHouseById(
        uint256 _houseId
    ) external view returns (HouseInfo memory) {
        return houses[_houseId];
    }

    // Method to update energy production for a house
    function updateEnergyProduction(
        uint256 _houseId,
        uint256 _newProduction
    ) external payable {
        require(_houseId <= houseCount, "Invalid House ID");
        houses[_houseId].energyProduction = _newProduction;
        if (
            houses[_houseId].energyConsumption >
            houses[_houseId].energyProduction
        ) {
            buyFromGrid(
                _houseId,
                houses[_houseId].energyConsumption -
                    houses[_houseId].energyProduction
            );
            houses[_houseId].boughtFromGrid +=
                houses[_houseId].energyConsumption -
                houses[_houseId].energyProduction;
        } else {
            sellToGrid(
                _houseId,
                houses[_houseId].energyProduction -
                    houses[_houseId].energyConsumption
            );
            houses[_houseId].boughtFromGrid +=
                houses[_houseId].energyProduction -
                houses[_houseId].energyConsumption;
        }
    }

    // Method to update energy consumption for a house
    function updateEnergyConsumption(
        uint256 _houseId,
        uint256 _newConsumption
    ) external payable {
        require(_houseId <= houseCount, "Invalid House ID");
        houses[_houseId].energyConsumption = _newConsumption;
        if (
            houses[_houseId].energyConsumption >
            houses[_houseId].energyProduction
        ) {
            buyFromGrid(
                _houseId,
                houses[_houseId].energyConsumption -
                    houses[_houseId].energyProduction
            );
            houses[_houseId].boughtFromGrid +=
                houses[_houseId].energyConsumption -
                houses[_houseId].energyProduction;
        } else {
            sellToGrid(
                _houseId,
                houses[_houseId].energyProduction -
                    houses[_houseId].energyConsumption
            );
            houses[_houseId].boughtFromGrid +=
                houses[_houseId].energyProduction -
                houses[_houseId].energyConsumption;
        }
    }

    function buyFromGrid(uint256 _houseId, uint256 _units) public payable {
        require(_units > 0, "Invalid units to buy");
        require(
            houses[_houseId].gridStation != address(0),
            "Grid station address not set"
        );
        address payable gridStationAddr = payable(houses[_houseId].gridStation);
        uint256 amount = _units * buyUnitsFromGridPrice;
        require(msg.value >= amount, "Insufficient payment");
        totalBoughtFromGrid += _units;
        gridStationAddr.transfer(msg.value);
        emit EnergyTransaction(
            msg.sender,
            houses[_houseId].gridStation,
            _units
        );
    }

    function sellToGrid(uint256 _houseId, uint256 _units) public {
        require(_units > 0, "Invalid units to sell");
        require(
            houses[_houseId].gridStation != address(0),
            "Grid station address not set"
        );

        uint256 amountToPay = _units * sellUnitsToGridPrice;
        require(
            address(this).balance >= amountToPay,
            "Grid station does not have enough funds"
        );

        totalSoldToGrid += _units;
        houseRecords[msg.sender].totalUnitsSold += _units;
        houseRecords[msg.sender].unitsSoldButNotPaid += _units;
        if (houseRecords[msg.sender].unitsSoldButNotPaid >= 20) {
            payHouse(msg.sender);
        }
        emit EnergyTransaction(
            msg.sender,
            houses[_houseId].gridStation,
            _units
        );
    }

    function payHouse(address _houseOwner) private {
        uint256 amountToPay = houseRecords[_houseOwner].unitsSoldButNotPaid *
            sellUnitsToGridPrice;
        payable(_houseOwner).transfer(amountToPay);
        houseRecords[_houseOwner].unitsSoldButNotPaid = 0;
    }
}
