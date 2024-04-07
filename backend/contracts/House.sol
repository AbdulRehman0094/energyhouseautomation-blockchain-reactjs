// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract House {
    struct HouseInfo {
        string houseName;
        string houseAddress;
        uint256 houseId;
        uint256 energyProduction;
        uint256 energyConsumption;
        address houseOwner;
        address gridStation;
    }

    mapping(uint256 => HouseInfo) public houses;
    uint256 public houseCount;

    // Event to emit when energy is bought or sold
    event EnergyTransaction(
        address indexed from,
        address indexed to,
        uint256 units
    );

    modifier checkEnergyBalance(uint256 _houseId) {
        uint256 production = houses[_houseId].energyProduction;
        uint256 consumption = houses[_houseId].energyConsumption;
        if (production < consumption) {
            uint256 unitsToBuy = consumption - production;
            buyFromGrid(_houseId, unitsToBuy);
        } else if (production > consumption) {
            uint256 unitsToSell = production - consumption;
            sellToGrid(_houseId, unitsToSell);
        }
        _;
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
            _gridStation
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
    ) external checkEnergyBalance(_houseId) {
        require(_houseId <= houseCount, "Invalid House ID");
        houses[_houseId].energyProduction = _newProduction;
    }

    // Method to update energy consumption for a house
    function updateEnergyConsumption(
        uint256 _houseId,
        uint256 _newConsumption
    ) external checkEnergyBalance(_houseId) {
        require(_houseId <= houseCount, "Invalid House ID");
        houses[_houseId].energyConsumption = _newConsumption;
    }

    // Internal method to buy units from grid station
    function buyFromGrid(uint256 _houseId, uint256 _units) internal {
        // Call grid station contract to buy units
        // emit EnergyTransaction(houses[_houseId].houseOwner, houses[_houseId].gridStation, _units);
    }

    // Internal method to sell units to grid station
    function sellToGrid(uint256 _houseId, uint256 _units) internal {
        // Call grid station contract to sell units
        // emit EnergyTransaction(houses[_houseId].gridStation, houses[_houseId].houseOwner, _units);
    }
}
