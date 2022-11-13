import { ethers } from "hardhat";

const attackDex = async () => {
    // change contract addresses here.
    const dexAddress = "0x10929702D8f5E0720596E87d3567874b37848Ee3";
    const token1Address = "0x85aE05EF06fbAFfaA0BE49ECE835c60569E59f22"; //type "await contract.token1()" in ethernaut console
    const token2Address = "0xf2B9A6A13e103E5b0E028Fd07Cf4d4cf879D3C34"; //type "await contract.token2()" in ethernaut console

    // Don't touch below
    // Vulnerability comes from get_swap_price(). division wont always result in an integer
    // but sometimes a fraction in which does not exist in solidity
    // You may read more on:
    // https://eips.ethereum.org/EIPS/eip-20
    // https://docs.soliditylang.org/en/v0.8.11/types.html#division

    // TODO: automate token address getting from contract
    // experimental below to get token1 and token2 address
    // const provider = ethers.getDefaultProvider();
    // const token1Address = await provider.getStorageAt(dexAddress, 0);
    // const token2Address = await provider.getStorageAt(dexAddress, 1);
    // console.log(token1Address);
    // console.log(token2Address);
    // const ABI = [
    //     "function token1() public view returns (address);",
    //     "function token2() public view returns (address);",
    // ];
    // const contractAttack = await ethers.getContractAt(ABI, dexAddress);
    // const t1 = await contractAttack.token1();
    // const t2 = await contractAttack.token2();
    // console.log(t1);
    // console.log(t2);
};

attackDex()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
