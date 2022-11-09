import { ethers } from "hardhat";

const attackDenial = async () => {};

attackDenial()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
