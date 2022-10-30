import { ethers } from "hardhat";

async function attackPreservation() {
    // change contract addresses here. change gas only if needed.
   
}

attackPreservation()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
