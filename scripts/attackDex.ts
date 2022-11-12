import { ethers } from "hardhat";

const attackDex = async () => {};

attackDex()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
