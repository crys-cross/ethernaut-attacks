import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackMagicNumber = async () => {
    // change contract addresses here. change gas only if needed.
    const magicNumberAddress = "0x0Da41194c379e212EFA9067A28945cF6a8Acb62D";
    const playerAddress = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954";
    const bytecode = "0x600a600c600039600a6000f3602a60505260206050f3";

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
