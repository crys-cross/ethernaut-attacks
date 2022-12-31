// import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } from "../helper-hardhat-config";
import verify from "../utils/verify";

export interface DeployFunction {
    (env: HardhatRuntimeEnvironment, contractName: string, args: any[]): Promise<void | boolean>;
    skip?: (env: HardhatRuntimeEnvironment, contractName: string) => Promise<boolean>;
    tags?: string[];
    dependencies?: string[];
    runAtTheEnd?: boolean;
    id?: string;
}

const deployContract: DeployFunction = async (
    hre: HardhatRuntimeEnvironment,
    contractName: string,
    args: any[]
) => {
    // preparations here
    const { deployments, getNamedAccounts, network } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS;

    log("-----------------------------------------------------");
    // deployments here
    const argss: any[] = args;
    const deployedContract = await deploy(contractName, {
        from: deployer,
        log: true,
        args: argss,
        waitConfirmations: waitBlockConfirmations,
    });

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...");
        await verify(deployedContract.address, args);
    }
};
export default deployContract;
deployContract.tags = ["eternalking", "alleternalking"];
