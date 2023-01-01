import { ethers } from "hardhat";
// import { expect } from "chai";
// import { Wallet } from "ethers";
// import { HardhatRuntimeEnvironment } from "hardhat/types";
// import deployContract from "../deploy/deployGeneric";
import { run } from "hardhat";

const attackVault = async () => {
    // change contract addresses here.
    const gateTwoAddress = "0xC1d2C999345e3E29e36B3397BED9E0ebf0414e0E"; //type "await contract.address()" in ethernaut console
    const args: any[] = [gateTwoAddress];
    const deployer = process.env.PRIVATE_KEY || "";
    // [deployer] = await ethers.getSigners();

    // Don't touch below 🚀
    // Vulnerability comes from the possibility of making a malicious contract the king
    // Additional read to understand more on recieve and transfer to make the contract needed:
    // https://ethereum.stackexchange.com/questions/81994/what-is-the-receive-keyword-in-solidity/81995
    // https://docs.soliditylang.org/en/v0.8.10/types.html#members-of-addresses

    // deploying attack contract here
    // const deployed = await deployContract(hre, "AttackGateKeeperTwo", args);
    // alternative below
    console.log("Deploying attack contract AttackGateKeeperTwo...");
    const Factory = await ethers.getContractFactory("AttackGateKeeperTwo", deployer);
    const attackGateKeeperTwo = await Factory.deploy();
    console.log(attackGateKeeperTwo);
    console.log(`Contract deployed to ${attackGateKeeperTwo.address}`);
    console.log("Attack contract deployed...");
    // experimantal verify below
    // if (attackGateKeeperTwo.address){
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
    // type contract.abi in ethernaut to expose all ABI (change this only if there was an update in ethernaut and this is no longer the same)

    console.log("Done, Submit to ethernaut.");
};

attackVault()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
