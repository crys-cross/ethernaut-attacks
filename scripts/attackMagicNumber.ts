import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackMagicNumber = async () => {
    // change contract addresses here. change gas only if needed.
    const magicNumberAddress = process.env.MAGICNUMBER!;
    const playerAddress = process.env.PLAYER;
    const bytecode = "0x600a600c600039600a6000f3602a60505260206050f3";
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
    const provider = await ethers.getDefaultProvider("goerli");
    const PRIVATE_KEY =
        process.env.PRIVATE_KEY || ""; /*Private Keys in .env file or hardcode here*/
    const wallet = new Wallet(PRIVATE_KEY, provider);

    const tx1 = await wallet.sendTransaction({
        from: playerAddress,
        data: bytecode,
    });
    const txReceipt1 = await tx1.wait(1);
    console.log(txReceipt1);
    const _solver = await txReceipt1.contractAddress;
    const ABI = ["function setSolver(address _solver)"];
    const contract = await ethers.getContractAt(ABI, magicNumberAddress);
    const oldSolver = await contract.solver();
    console.log("Old solver is: ", oldSolver);
    const tx2 = await contract.setSolver(_solver);
    const txReceipt = await tx2.wait(1);
    console.log(txReceipt);
    const newSolver = await contract.solver();
    console.log("New solver is: ", newSolver);
    if (!oldSolver) {
        console.log("Congrats! Level Passed, You may now submit to ethernaut");
    } else {
        console.log("New solver is not set, review code above and try again...");
    }
};

attackMagicNumber()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
