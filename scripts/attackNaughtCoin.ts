import { ethers } from "hardhat";

const approveNaughtCoin = async () => {
    // change your player and spender address here
    const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
    const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2 || "";
    const player = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954";
    const spender = "0x5BDE7cAa4aF4C56A73a4bCBCC3760A76057dba4E";
    // change naughtcoin instance address here
    const naughtCoinAddress = "0x3a7425BC6e24Be643cBa3e830C1356091a42Abd3";

    // 1st part connect player
    const contract = await ethers.getContractAt("IERC20", naughtCoinAddress);
    const contractPlayer = contract.connect(player);
    const amount = await contractPlayer.balanceOf(player);
    const tx = await contractPlayer.approve(spender, amount);
    const success = await tx.wait(1);
    const amountApproved = (await contractPlayer.allowance(player, spender)).toString();
    console.log(`Amount allowed to transfer: ${amountApproved}`);
    const playerBalance = await contractPlayer.balanceOf(player);
    const spenderBalance = await contractPlayer.balanceOf(spender);
    console.log(`Players Balance: ${playerBalance}`);
    console.log(`Spenders Balance: ${spenderBalance}`);

    // start 2nd part to connect spender
    console.log("Will be using spender for further transactions...");
    const contractSpender = contract.connect(spender);
    // const IERC20 = await ethers.getContractAt("IERC20", naughtCoinAddress);
    // const amount = (await IERC20.allowance(player, spender)).toString();
    // console.log(`Amount allowed to transfer: ${amount}`);
    // // const amount = (await IERC20.balanceOf(player)).toString();
    // // const tx1 = await IERC20.approve(spender, amount);
    // // await tx1.wait(1);
    // const tx2 = await IERC20.transferFrom(player, spender, amount);
    // await tx2.wait(1);
    // const playerBalance = await IERC20.balanceOf(player);
    // const spenderBalance = await IERC20.balanceOf(spender);
    // console.log(`Players Balance: ${playerBalance}`);
    // console.log(`Spenders Balance: ${spenderBalance}`);
};

approveNaughtCoin()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
