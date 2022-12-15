import { ethers } from "hardhat";

const attackForce = async () => {
    // change contract addresses here.
    const forceAddress = ""; //type "await contract.address()" in ethernaut console
    const player = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954"; //place your player address here (you may type player in ethernaut console)
    // attackForce address = "";

    // Don't touch below 🚀
    // Vulnerability from being able to change woner of contract by using
    // another contract to satisfy its condition of not being the tx.origin
    // Additional read to understand more of tx.origin and msg.sender:
    // https://ethereum.stackexchange.com/questions/1891/whats-the-difference-between-msg-sender-and-tx-origin
    // https://ethereum.stackexchange.com/questions/1891/whats-the-difference-between-msg-sender-and-tx-origin
    // typing all commands in console below
    // type contract.abi in ethernaut to expose all ABI (change this only if there was an update in ethernaut and this is no longer the same)

    const attack = await ethers.getContract("AttackForce");
};

attackForce()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
