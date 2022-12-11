import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackCoinFlip = async () => {
    // change contract addresses here.
    const coinFlipAddress = "0xe3958F5f3E7C470c3F0a9d680C9C0670D9688a66"; //type "await contract.address()" in ethernaut console
    const player = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954"; //place your player address here

    // Don't touch below 🚀
    // Vulnerability from it being predictable
    // additional read:
    // https://ethereum.org/en/developers/docs/blocks/
    // https://solidity-by-example.org/interface/
    // typing all commands in console below
    // DON't FORGET TO DEPLOY 'AttackCoinFlip.sol' first before running this script !!!

    const contract = await ethers.getContract("AttackCoinFlip");
};

attackCoinFlip()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
