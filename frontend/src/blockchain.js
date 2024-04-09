const { Web3 } = require('web3');
const { abi: houseAbi } = require('./jsons/House.json');
const { abi: gridStationAbi } = require('./jsons/GridStation.json');
const houseContractAddress = '0xEcb6F6124827BE59e3C6d24Ed3FFF5c8975f142f';
const gridStationAddress = '0x591D8c585558b2cCa052A9B8e042d3EffA379deA';
const houseOwnerContractAddress = '0xaF5fF1573A6382cE09538710b65AC99e52bCEa6a';
const web3 = new Web3('http://127.0.0.1:9545/');



const houseContract = new web3.eth.Contract(houseAbi, houseContractAddress);
const gridStationContract = new web3.eth.Contract(gridStationAbi, gridStationAddress);
const houseOwnerContract = new web3.eth.Contract(gridStationAbi, houseOwnerContractAddress);



// Method to add a new house



export async function addHouse(houseName, houseAddress, gridStationAddress, userAddress) {
    try {

        const result = await houseContract.methods.addHouse(houseName, houseAddress, gridStationAddress).send({ from: userAddress, gas: 300000 });
        console.log('New house added:', result);
        
    } catch (error) {
        console.error('Error adding house:', error);
    }
}

// Method to get all houses
export async function getAllHouses() {
    try {
        const result = await houseContract.methods.getAllHouses().call();
        console.log('All houses:', result);
        return result;
    } catch (error) {
        console.error('Error getting all houses:', error);
    }
}

// Method to get house by ID
async function getHouseById(houseId) {
    try {
        const result = await houseContract.methods.getHouseById(houseId).call();
        console.log('House by ID:', result);
    } catch (error) {
        console.error('Error getting house by ID:', error);
    }
}

// Method to update energy production for a house
async function updateEnergyProduction(houseId, newProduction, userAddress) {
    try {
        const accounts = await web3.eth.getAccounts();
        const result = await houseContract.methods.updateEnergyProduction(houseId, newProduction).send({ from: userAddress, gas: 900000 });
        console.log('Energy production updated:', result);
    } catch (error) {
        console.error('Error updating energy production:', error);
    }
}

// Method to update energy consumption for a house
async function updateEnergyConsumption(houseId, newConsumption, userAddress) {
    try {
        const result = await houseContract.methods.updateEnergyConsumption(houseId, newConsumption).send({ from: userAddress });
        console.log('Energy consumption updated:', result);
    } catch (error) {
        console.error('Error updating energy consumption:', error);
    }
}


async function sendEthersToSmartContract(senderAccount, smartContractAddress, amountInEther) {
    try {
        const amountToSend = web3.utils.toWei(amountInEther, 'ether'); // Amount to send in ethers
        const transaction = await web3.eth.sendTransaction({
            from: senderAccount,
            to: smartContractAddress,
            value: amountToSend,
        });
        console.log('Ethers sent to GridStation contract:', transaction);
    } catch (error) {
        console.error('Error sending ethers to GridStation contract:', error);
    }
}

// Check the balance of the GridStation contract
export async function checkBalance(address) {
    try {
        const balanceInWei = await web3.eth.getBalance(address);
        const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether');
        console.log('Balance:', balanceInEth, 'ETH');
        return balanceInEth
    } catch (error) {
        console.error('Error checking balance:', error);
    }
}



async function sellUnitsToGrid(units) {
    try {
        // Send transaction to the contract
        const accounts = await web3.eth.getAccounts();
        const result = await gridStationContract.methods.sellUnitsToGrid(units).send({ from: accounts[0], value: units * 100 });
        console.log('Transaction hash:', result.transactionHash);
    } catch (error) {
        console.error('Error selling units to the grid:', error);
    }
}

// Method to buy units from the grid
async function buyUnitsFromGrid(units) {
    try {
        // Send transaction to the contract
        const accounts = await web3.eth.getAccounts();
        const result = await gridStationContract.methods.buyUnitsFromGrid(units).send({ from: accounts[0], value: units * 50 });
        console.log('Transaction hash:', result.transactionHash);
    } catch (error) {
        console.error('Error buying units from the grid:', error);
    }
}


const getTotalSoldToGrid = async () => {
    gridStationContract.methods.totalSoldToGrid().call()
        .then((result) => {
            console.log('totalSoldToGrid:', result);
        })
        .catch((error) => {
            console.error('Error getting totalSoldToGrid:', error);
        });
}


const getTotalBoughtFromGrid = async () => {
    gridStationContract.methods.totalBoughtFromGrid().call()
        .then((result) => {
            console.log('totalBoughtFromGrid:', result);
        })
        .catch((error) => {
            console.error('Error getting totalBoughtFromGrid:', error);
        });
}


async function getHouseRecordFromGrid(userAddress) {
    try {

        const result = await houseContract.methods.getHouseRecord().send({ from: userAddress, gas: 300000 });
        console.log('house record:', result);
    } catch (error) {
        console.error('Error adding house:', error);
    }
}

export const registerOwner = async ( username, userAddress) => {
    await houseOwnerContract.methods.registerOwner(username).send({ from: userAddress });
    console.log('Owner registered successfully.');
};




export const isOwnerExist = async (userAddress) => {
    const result = await houseOwnerContract.methods.isOwnerExist(userAddress).call();
    console.log('Owner exists:', result);
    return result
};



const getOwnerDetails = async ( userAddress) => {
    const result = await houseOwnerContract.methods.getOwnerDetails(userAddress).call();
    console.log('Owner username:', result[0]);
    console.log('Owner address:', result[1]);
};


// Call the methods as needed
// Example usage:

const energyMeter = async () => {
    const accounts = await web3.eth.getAccounts();

    // await sendEthersToSmartContract(accounts[2], gridStationAddress, 10);
    // await checkBalance(gridStationAddress);
    // await checkBalance(houseContractAddress);
    // await checkBalance(accounts[1]); //89.998567187713900509 ETH


    // addHouse('My House 1', '123 Main St 1', gridStationAddress, accounts[1]);
    // getAllHouses();
    // getHouseById(1);
    // updateEnergyProduction(1, 2, accounts[1]);
    // updateEnergyConsumption(1, 10, accounts[1]);
    // await getTotalSoldToGrid();
    // await getTotalBoughtFromGrid();
    // sellUnitsToGrid(10); // Sell 10 units to the grid
    // buyUnitsFromGrid(5); // Buy 5 units from the grid
    // payHouse('0x456def...');
}
energyMeter();

