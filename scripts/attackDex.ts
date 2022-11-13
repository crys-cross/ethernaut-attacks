import { ethers } from "hardhat";

const attackDex = async () => {
    // change contract addresses here.
    const dexAddress = "0x10929702D8f5E0720596E87d3567874b37848Ee3";
    // const attackShopBuyerAddress = "0xd643B0403958543e445e16dC720566E0D7e11f8a";

    const provider = ethers.getDefaultProvider();
    const token1Address = await provider.getStorageAt(dexAddress, 0);
    const token2Address = await provider.getStorageAt(dexAddress, 1);
    console.log(token1Address);
    console.log(token2Address);

    // Don't touch below
    // Vulnerability comes from get_swap_price(). division wont always result in an integer
    // but sometimes a fraction in which does not exist in solidity
    // You may read more on:
    // https://eips.ethereum.org/EIPS/eip-20
    // https://docs.soliditylang.org/en/v0.8.11/types.html#division
    // const ABI1 = ["function buyFromShop(address _shopAddr)"];
};

attackDex()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
