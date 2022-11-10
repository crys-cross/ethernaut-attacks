import { AbiCoder } from "@ethersproject/abi";
import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackShop = async () => {
    // change contract addresses here.
    const shopAddress = "0xF675Be946818f77Ba00aD069C99C97080800656E";
    const playerAddress = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954";

    // Don't touch below
    // Exploit comes from no check for underflow on retract function and changing storage value for owner
    // You may read more on:
    // https://programtheblockchain.com/posts/2018/03/09/understanding-ethereum-smart-contract-storage/
    // https://docs.soliditylang.org/en/v0.6.0/security-considerations.html#two-s-complement-underflows-overflows
    // https://ethereum.stackexchange.com/questions/63403/in-solidity-how-does-the-slot-assignation-work-for-storage-variables-when-there
};

attackShop()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
