import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackPuzzleWallet = async () => {
    // change contract addresses here.
    const puzzleWalletAddress = "0xAc7EcD98B60C2094BdD63eEaF73436ebE8A28e9a"; //type "await contract.address()" in ethernaut console

    // Don't touch below
    // The vulnerability here arises due to storage collision between the proxy contract (PuzzleProxy) and logic contract (PuzzleWallet)
    // You may read more on:
    // https://eip2535diamonds.substack.com/p/understanding-delegatecall-and-how
    // https://blog.openzeppelin.com/proxy-patterns/
    const provider = await ethers.getDefaultProvider("goerli");
    /*Private Keys in .env file or hardcode here*/
    const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
    const wallet = new Wallet(PRIVATE_KEY, provider);

    const tx1 = await wallet.sendTransaction({
        from: "",
        data: "",
    });
    const txReceipt1 = await tx1.wait(1);
    console.log(txReceipt1);
    const ABI = [
        "function approve(address spender, uint amount)",
        "function swap(address from, address to, uint amount)",
        "function balanceOf(address token, address account)",
    ];
    const contractAttack = await ethers.getContractAt(ABI, puzzleWalletAddress);
};

attackPuzzleWallet()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
