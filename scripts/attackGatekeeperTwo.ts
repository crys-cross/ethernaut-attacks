import { ethers } from "hardhat";

async function attackGateKeeperTwo() {}

attackGateKeeperTwo()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
