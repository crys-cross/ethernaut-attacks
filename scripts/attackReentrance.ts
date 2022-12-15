import { ethers } from "hardhat";

const attackReentrance = async () => {
    // change contract addresses here.
    const reentranceAddress = "0xe094498d7F6F2d4E3b829E3A52e2dd2745498e46"; //type "await contract.address()" in ethernaut console

    // Don't touch below 🚀
    // Vulnerability comes from the possibility of making a malicious contract the king
    // Additional read to understand more on recieve and transfer to make the contract needed:
    // https://ethereum.stackexchange.com/questions/81994/what-is-the-receive-keyword-in-solidity/81995
    // https://docs.soliditylang.org/en/v0.8.10/types.html#members-of-addresses
    // typing all commands in console below
    // type contract.abi in ethernaut to expose all ABI (change this only if there was an update in ethernaut and this is no longer the same)
    const ABI = [
        {
            constant: true,
            inputs: [],
            name: "_king",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            payable: undefined,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "prize",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            payable: undefined,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: undefined,
            inputs: [],
            name: "owner",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            payable: undefined,
            stateMutability: "nonpayable",
            type: "function",
        },
    ];
    const attack = await ethers.getContract("AttackReentrance");
    const contract = await ethers.getContractAt(ABI, reentranceAddress);

    console.log("Done, Submit to ethernaut.");
};

attackReentrance()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
