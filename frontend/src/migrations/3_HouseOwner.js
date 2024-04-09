const HouseOwner = artifacts.require("HouseOwner");

module.exports = function (deployer) {
    deployer.deploy(HouseOwner);
};