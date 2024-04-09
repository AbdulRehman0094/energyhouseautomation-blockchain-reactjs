const GridStation = artifacts.require("GridStation");

module.exports = async function (deployer) {
    await deployer.deploy(GridStation);
    const accounts = await web3.eth.getAccounts();
    const myContractInstance = await GridStation.deployed();
    const amountToSend = web3.utils.toWei('20', 'ether');
    await web3.eth.sendTransaction({
        from: accounts[0],
        to: myContractInstance.address,
        value: amountToSend
    });
};




