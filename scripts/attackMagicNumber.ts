import { ethers } from "hardhat";

const attackMagicNumber = async () => {
    // change contract addresses here. change gas only if needed.
    const magicNumberAddress = "0xb19100EB1FfB398Aba2b7774e4b345C25e3e0061";
    const playerAddress = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954";
    const bytecode = "0x6F40A0F4fD7B7dd225b85F7e8A73a9cb9e024321";
    // don't touch below
};

attackMagicNumber()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
