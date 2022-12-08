import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackDoubleEntry = async () => {
    // change contract addresses here.
    const doubleEntryAddress = "0xC4BB01C7AA492bdFF60f6989542d71DB7cb73Fd1"; //type "await contract.address()" in ethernaut console
    const playerAddress = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954";
    const attackAddress = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954";

    // Don't touch below 🚀
    // Vulnerability from
    // Read more:
    // https://docs.soliditylang.org/en/latest/abi-spec.html#contract-abi-specification

    // console.log(txReceipt1);
};

attackDoubleEntry()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
