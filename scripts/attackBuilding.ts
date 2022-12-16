import { ethers } from "hardhat";

const attackBuilding = async () => {
    // change contract addresses here.
    const buildingAddress = "0xEfC594B6E8100d412aadc34D4E6ACBbD6CC0E85a"; //type "await contract.address()" in ethernaut console
    // AttackBuilding address = "0x44d67b486C68c1273871a5De10DD3fe2E8df4714";

    // Don't touch below 🚀
    // Can alter last floor by using another contract
    // Additional read about interface:
    // site
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
    ];
    const attack = await ethers.getContract("AttackBuilding");
    const contract = await ethers.getContractAt(ABI, buildingAddress);
};

attackBuilding()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
