import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } from "../helper-hardhat-config";
import verify from "../utils/verify";

const deployEternalKing: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    // preparations here
    const { deployments, getNamedAccounts, network } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS;

    log("-----------------------------------------------------");
    // deployments here
    const args: any[] = [];
    const eternalKing = await deploy("EternalKing", {
        from: deployer,
        log: true,
        args: args,
        waitConfirmations: waitBlockConfirmations,
    });

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(eternalKing.address, args);
    }
};
export default deployEternalKing;
deployEternalKing.tags = ["eternalking", "alleternalking"];
