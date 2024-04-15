const { Web3 } = require('web3');

const web3 = new Web3('http://127.0.0.1:9545/');

const contractABI = require('./build/contracts/EnergyManagementSystem.json').abi;

const contractAddress = '0xE403eE6AbCD9dE0F7FCAa4f9b1F46a4f97d2E73C';
const contract = new web3.eth.Contract(contractABI, contractAddress);

async function registerUser(username) {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.registerOwner(username).send({ from: accounts[0] });
        console.log('User registered successfully');
    } catch (error) {
        console.error('Error registering user:', error);
    }
}

async function addHouse(houseName, houseAddress, gridStation) {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.addHouse(houseName, houseAddress, gridStation).send({ from: accounts[0], gas: 300000 });
        console.log('House added successfully');
    } catch (error) {
        console.error('Error adding house:', error);
    }
}

async function getAllHouses() {
    try {
        const result = await contract.methods.getAllHouses().call();
        console.log('All Houses:', result);
        return result;
    } catch (error) {
        console.error('Error getting all houses:', error);
    }
}

async function getHouseById(houseId) {
    try {
        const result = await contract.methods.getHouseById(houseId).call();
        console.log('House by ID:', result);
    } catch (error) {
        console.error('Error getting house by ID:', error);
    }
}

async function isOwnerExist(ownerAddress) {
    try {
        const result = await contract.methods.getHouseById(ownerAddress).call();
        console.log('IsOwnerExist', result);
        return result;
    } catch (error) {
        console.error('Error getting house by ID:', error);
    }
}

async function updateEnergyProduction(houseId, newProduction) {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.updateEnergyProduction(houseId, newProduction).send({ from: accounts[0], gas: 300000 });
        console.log('Energy production updated successfully');
    } catch (error) {
        console.error('Error updating energy production:', error);
    }
}

async function updateEnergyConsumption(houseId, newConsumption, value) {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.updateEnergyConsumption(houseId, newConsumption).send({ from: accounts[0], gas: 300000, value: value });
        console.log('Energy consumption updated successfully');
    } catch (error) {
        console.error('Error updating energy consumption:', error);
    }
}

async function buyFromGrid(houseId, units, value) {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.buyFromGrid(houseId, units).send({ from: accounts[0], value: value });
        console.log('Energy bought from grid successfully');
    } catch (error) {
        console.error('Error buying energy from grid:', error);
    }
}

async function sellToGrid(houseId, units) {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.sellToGrid(houseId, units).send({ from: accounts[0] });
        console.log('Energy sold to grid successfully');
    } catch (error) {
        console.error('Error selling energy to grid:', error);
    }
}

async function getAccountBalance(accountAddress) {
    try {
        // Get the balance of the account
        const balance = await web3.eth.getBalance(accountAddress);

        // Convert balance from Wei to Ether
        const balanceInEther = web3.utils.fromWei(balance, 'ether');
        console.log(`Account balance: ${balanceInEther} Ether`);
    } catch (error) {
        console.error('Error getting account balance:', error);
    }
}

async function main() {

    // await registerUser('abc');
    // await addHouse('abc house', 'abc address', '0x0148261cb5ebefcb6a3835b9422f4a1d7a7b2a07');
    const houses = await getAllHouses();
    for (let i = 0; i < houses.length; i++) {
        const house = houses[i];
        const consumption = parseInt(house.energyConsumption.toString());
        const production = parseInt(house.energyProduction.toString());
        if (production >= consumption) {
            const newConsumption = production + 2;
            await updateEnergyConsumption(house.houseId, newConsumption, (newConsumption - production) * 150)
        } else if (consumption > production) {
            const newProduction = consumption + 2;
            await updateEnergyProduction(house.houseId, newProduction);
        }
        await getHouseById(house.houseId);

    }

}

main();
