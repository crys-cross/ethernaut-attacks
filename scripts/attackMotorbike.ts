import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackMotorbike = async () => {
    // change contract addresses here.
    const motorbikeAddress = "0x383e5cdD8324Bb0E1DA147b2fD869e1cfA930887"; //type "await contract.address()" in ethernaut console
    const bombAddress = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954";

    // Don't touch below
};

attackMotorbike()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
