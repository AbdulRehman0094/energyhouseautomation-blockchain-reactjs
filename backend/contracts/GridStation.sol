// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GridStation {
    address public gridStationAddress;
    uint256 public totalSoldToGrid;
    uint256 public totalBoughtFromGrid;

    uint256 public constant sellUnitsToGridPrice = 1000000000000000000 wei; // per unit
    uint256 public constant buyUnitsFromGridPrice = 2000000000000000000 wei; // per unit
    constructor() payable {}

    struct HouseRecord {
        uint256 totalUnitsSold;
        uint256 unitsSoldButNotPaid;
    }

    receive() external payable {}

    mapping(address => HouseRecord) public houseRecords;

    function sellUnitsToGrid(uint256 _units) external payable {
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
    }

    function buyUnitsFromGrid(uint256 _units) external payable {
        uint256 totalPrice = _units * buyUnitsFromGridPrice;
        require(msg.value >= totalPrice, "Insufficient payment");

        totalSoldToGrid -= _units;
        totalBoughtFromGrid += _units;

        // If there's excess ether sent by the caller, refund it
        uint256 excessAmount = msg.value - totalPrice;
        if (excessAmount > 0) {
            payable(msg.sender).transfer(excessAmount);
        }
    }

    function payHouse(address _houseOwner) private {
        uint256 amountToPay = houseRecords[_houseOwner].unitsSoldButNotPaid *
            sellUnitsToGridPrice;
        payable(_houseOwner).transfer(amountToPay);
        houseRecords[_houseOwner].unitsSoldButNotPaid = 0;
    }
}
