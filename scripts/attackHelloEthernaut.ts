import { ethers } from "hardhat";

const attackDoubleEntry = async () => {
    // change contract addresses here.
    const helloEthernautAddress = "0x7aCb43E5F92E3A268d63294459611b2AdC75366e"; //type "await contract.address()" in ethernaut console

    // Don't touch below 🚀
    // Vulnerability from public view of password
    // typing all commands in console below
    //type contract.abi in ethernaut to expose all ABI
    const ABI = [
        {
            inputs: [{ internalType: "string", name: "_password", type: "string" }],
            stateMutability: "nonpayable",
            type: "constructor",
            constant: undefined,
            payable: undefined,
        },
        {
            inputs: [{ internalType: "string", name: "passkey", type: "string" }],
            name: "authenticate",
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "getCleared",
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "info",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "pure",
            type: "function",
        },
        {
            inputs: [],
            name: "info1",
            outputs: Array(1),
            stateMutability: "pure",
            type: "function",
        },
        {
            inputs: [{ internalType: "string", name: "param", type: "string" }],
            name: "info2",
            stateMutability: "pure",
            type: "function",
        },
        {
            inputs: [],
            name: "info42",
            stateMutability: "pure",
            type: "function",
        },
        {
            inputs: [],
            name: "infoNum",
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "method7123949",
            stateMutability: "pure",
            type: "function",
        },
        {
            inputs: [],
            name: "password",
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "theMethodName",
            stateMutability: "view",
            type: "function",
        },
    ];
    const contract = await ethers.getContractAt(ABI, helloEthernautAddress);
    const tx1 = await contract.info();
    console.log(tx1);
    const tx2 = await contract.info1();
    console.log(tx2);
    const tx3 = await contract.info2("hello");
    console.log(tx3);
    const tx4 = (await contract.infoNum()).toString();
    console.log(tx4);
    const tx5 = await contract.info42();
    console.log(tx5);
    const tx6 = await contract.theMethodName();
    console.log(tx6);
    const tx7 = await contract.method7123949();
    console.log(tx7);

    // console.log(txReceipt1);
};

attackDoubleEntry()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
