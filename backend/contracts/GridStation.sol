// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GridStation {
    address public gridStationAddress;
    uint256 public totalSoldToGrid;
    uint256 public totalBoughtFromGrid;

    uint256 public constant sellUnitsToGridPrice = 100 wei; // per unit
    uint256 public constant buyUnitsFromGridPrice = 50 wei; // per unit

    struct HouseRecord {
        uint256 totalUnitsSold;
        uint256 unitsSoldButNotPaid;
    }

    mapping(address => HouseRecord) public houseRecords;

    function sellUnitsToGrid(uint256 _units) external payable {
        require(
            msg.value == _units * sellUnitsToGridPrice,
            "Insufficient payment"
        );
        totalSoldToGrid += _units;
        houseRecords[msg.sender].totalUnitsSold += _units;
        houseRecords[msg.sender].unitsSoldButNotPaid += _units;
        if (houseRecords[msg.sender].unitsSoldButNotPaid >= 20) {
            payHouse(msg.sender);
        }
    }

    function buyUnitsFromGrid(uint256 _units) external {
        require(_units <= soldUnits, "Insufficient units available");
        // Transfer payment to house owner
        payable(msg.sender).transfer(_units * buyUnitsFromGridPrice);
        // Update sold units count
        soldUnits -= _units;
        totalBoughtFromGrid += _units;
    }

    function payHouse(address _houseOwner) private {
        uint256 amountToPay = houseRecords[_houseOwner].unitsSoldButNotPaid *
            sellUnitsToGridPrice;
        payable(_houseOwner).transfer(amountToPay);
        houseRecords[_houseOwner].unitsSoldButNotPaid = 0;
    }
}
