const EnergyManagementSystem = artifacts.require("EnergyManagementSystem");

module.exports = function (deployer) {
    const amountToSend = web3.utils.toWei('10', 'ether');


    deployer.deploy(EnergyManagementSystem, { value: amountToSend });
};
