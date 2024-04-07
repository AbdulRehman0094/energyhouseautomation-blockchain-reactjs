// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HouseOwner {
    struct Owner {
        string username;
        address userAddress;
    }

    mapping(address => Owner) public users;

    // Method to register a new user
    function registerOwner(string memory _username) external {
        require(!isOwnerExist(msg.sender), "User already exists");
        users[msg.sender] = Owner(_username, msg.sender);
    }

    // Method to check if a user already exists
    function isOwnerExist(address _userAddress) public view returns (bool) {
        return users[_userAddress].userAddress != address(0);
    }
}
