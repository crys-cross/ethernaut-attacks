import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackMotorbike = async () => {
    // change contract addresses here.
    const motorbikeAddress = "0x383e5cdD8324Bb0E1DA147b2fD869e1cfA930887"; //type "await contract.address()" in ethernaut console
    const bombAddress = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954";

    // Don't touch below
    // Engine contract is vulnerable since you can find the address of the logic implementation.
    // To know more, READ:
    // https://eip2535diamonds.substack.com/p/understanding-delegatecall-and-how
    // https://docs.soliditylang.org/en/v0.6.0/units-and-global-variables.html#contract-related
    // https://blog.openzeppelin.com/proxy-patterns/
    // https://forum.openzeppelin.com/t/uups-proxies-tutorial-solidity-javascript/7786
    // https://docs.openzeppelin.com/contracts/4.x/api/proxy
    // https://github.com/OpenZeppelin/openzeppelin-upgrades/blob/master/packages/core/contracts/Initializable.sol
};

attackMotorbike()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
