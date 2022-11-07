import { ethers } from "hardhat";

const attackMagicNumber = async () => {
    // change contract addresses here. change gas only if needed.
    const magicNumberAddress = "0xb19100EB1FfB398Aba2b7774e4b345C25e3e0061";
    const playerAddress = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954";
    const bytecode = "600a600c600039600a6000f3602a60505260206050f3";

    // const GOERLI_RPC_URL = "/*Place infura or alchemy link here*/";
    // don't touch below
    const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
    const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);
    const signer = await provider.getSigner();
    const tx1 = await signer.sendTransaction({
        from: playerAddress,
        data: bytecode,
    });
    const txReceipt1 = await tx1.wait(1);
    console.log(txReceipt1);
    const txHash = await tx1.wait(1);
    const _solver = await txHash.contractAddress;
    const ABI = ["function setSolver(address _solver)"];
    const contract = await ethers.getContractAt(ABI, magicNumberAddress);
    const tx2 = await contract.setSolver(_solver);
    const txReceipt = await tx2.wait(1);
    console.log(txReceipt);
};

attackMagicNumber()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
