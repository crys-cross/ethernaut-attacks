import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackTelephone = async () => {
    // change contract addresses here.
    const telephoneAddress = ""; //type "await contract.address()" in ethernaut console
    // wiretap address = "0xBa456e44a97609837fa1f2684539A8CDFf03F7db";

    // Don't touch below 🚀
    // Vulnerability from being able to change woner of contract by using
    // another contract to satisfy its condition of not being the tx.origin
    // Additional read to understand more of tx.origin and msg.sender:
    // https://ethereum.stackexchange.com/questions/1891/whats-the-difference-between-msg-sender-and-tx-origin
    // https://ethereum.stackexchange.com/questions/1891/whats-the-difference-between-msg-sender-and-tx-origin
    // typing all commands in console below
};

attackTelephone()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
