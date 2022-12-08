import { ethers } from "hardhat";

const attackDoubleEntry = async () => {
    // change contract addresses here.
    const helloEthernautAddress = "0xC4BB01C7AA492bdFF60f6989542d71DB7cb73Fd1"; //type "await contract.address()" in ethernaut console

    // Don't touch below 🚀
    // Vulnerability from public view of password
    // typing all commands in console below
    // const ABI = //type contract.abi in ethernaut to expose all ABI
    const contract = await ethers.getContract(helloEthernautAddress);
    const tx1 = await contract.info();
    console.log(tx1);
    const tx2 = await contract.info1();
    console.log(tx2);
    const tx3 = await contract.info2("hello");
    console.log(tx3);
    const tx4 = (await contract.infoNum()).toString();
    console.log(tx4);
    const tx5 = await contract.info42();
    console.log(tx5);
    const tx6 = await contract.theMethodName();
    console.log(tx6);
    const tx7 = await contract.method7123949();
    console.log(tx7);

    // console.log(txReceipt1);
};

attackDoubleEntry()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
