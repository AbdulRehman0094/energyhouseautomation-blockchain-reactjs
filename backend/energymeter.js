const { Web3 } = require('web3');

// Initialize Web3 with your provider
const web3 = new Web3('http://127.0.0.1:9545/'); // Update with your provider URL

// Load the contract ABI
const contractABI = require('./build/contracts/EnergyManagementSystem.json').abi;

// Initialize the contract instance
const contractAddress = '0xE403eE6AbCD9dE0F7FCAa4f9b1F46a4f97d2E73C'; // Update with your contract address
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Method to register a new user
async function registerUser(username) {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.registerOwner(username).send({ from: accounts[0] });
        console.log('User registered successfully');
    } catch (error) {
        console.error('Error registering user:', error);
    }
}

// Method to add a new house
async function addHouse(houseName, houseAddress, gridStation) {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.addHouse(houseName, houseAddress, gridStation).send({ from: accounts[0], gas: 400000 });
        console.log('House added successfully');
    } catch (error) {
        console.error('Error adding house:', error);
    }
}

// Method to get all houses
async function getAllHouses() {
    try {
        const result = await contract.methods.getAllHouses().call();
        console.log('All Houses:', result);
    } catch (error) {
        console.error('Error getting all houses:', error);
    }
}

// Method to get house by ID
async function getHouseById(houseId) {
    try {
        const result = await contract.methods.getHouseById(houseId).call();
        console.log('House by ID:', result);
    } catch (error) {
        console.error('Error getting house by ID:', error);
    }
}

// Method to update energy production for a house
async function updateEnergyProduction(houseId, newProduction) {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.updateEnergyProduction(houseId, newProduction).send({ from: accounts[0] });
        console.log('Energy production updated successfully');
    } catch (error) {
        console.error('Error updating energy production:', error);
    }
}

// Method to update energy consumption for a house
async function updateEnergyConsumption(houseId, newConsumption) {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.updateEnergyConsumption(houseId, newConsumption).send({ from: accounts[0] });
        console.log('Energy consumption updated successfully');
    } catch (error) {
        console.error('Error updating energy consumption:', error);
    }
}

// Method to buy energy from grid
async function buyFromGrid(houseId, units, value) {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.buyFromGrid(houseId, units).send({ from: accounts[0], value: value });
        console.log('Energy bought from grid successfully');
    } catch (error) {
        console.error('Error buying energy from grid:', error);
    }
}

// Method to sell energy to grid
async function sellToGrid(houseId, units) {
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.sellToGrid(houseId, units).send({ from: accounts[0] });
        console.log('Energy sold to grid successfully');
    } catch (error) {
        console.error('Error selling energy to grid:', error);
    }
}

// Example usage
async function main() {
    // Call your methods here
    // registerUser('hello');
    // addHouse('house 1', 'B2', '0x945e060fa4b1098c52651a0769e2e91741aa68ee')
    // getAllHouses();

    await updateEnergyProduction(1, 23);
    // await buyFromGrid(1, 20, 20 * 20);

}

main();
