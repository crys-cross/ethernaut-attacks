import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "hardhat-contract-sizer";
import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

// RPC from Alchemy
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const PRIVATE_KEY_2 = process.env.PRIVATE_KEY_2 || "";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

// API from scanners of different chains/networks
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "Your etherscan API key";
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "Your polygonscan API key";
const SNOWTRACE_API_KEY = process.env.SNOWTRACE_API_KEY || "Your snowtrace API key";
const FTMSCAN_API_KEY = process.env.FTMSCAN_API_KEY || "Your ftmscan API key";
const REPORT_GAS = process.env.REPORT_GAS || false;

const config: HardhatUserConfig = {
    defaultNetwork: "goerli",
    // solidity: "0.8.8",
    solidity: {
        compilers: [
            { version: "0.8.16" },
            { version: "0.8.8" },
            { version: "0.8.4" },
            { version: "0.6.6" },
            { version: "0.6.0" },
        ],
    },
    networks: {
        hardhat: {
            // // If you want to do some forking, uncomment this
            // forking: {
            //   url: MAINNET_RPC_URL
            // }
            chainId: 31337,
        },
        goerli: {
            url: GOERLI_RPC_URL || "",
            accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
            chainId: 5,
        },
        fantomtest: {
            url: "https://rpc.testnet.fantom.network" || "",
            accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
            chainId: 4002,
        },
        fujitest: {
            url: "https://api.avax-test.network/ext/bc/C/rpc" || "",
            accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
            chainId: 43113,
        },
        mumbaitest: {
            url: MUMBAI_RPC_URL || "",
            accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
            chainId: 80001,
        },
        optimismkovan: {
            url: "https://kovan.optimism.io/" || "",
            accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
            chainId: 69,
        },
        bnbtest: {
            url: "https://data-seed-prebsc-1-s1.binance.org:8545" || "",
            accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
            chainId: 97,
        },
        klaytontest: {
            url: "https://api.baobab.klaytn.net:8651" || "",
            accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
            chainId: 1001,
        },
        // arbitrum: {
        //     url: "https://data-seed-prebsc-1-s1.binance.org:8545" || "",
        //     accounts: [PRIVATE_KEY],
        //     chainId: 97,
        // },
        metisstardust: {
            url: "https://stardust.metis.io/?owner=588" || "",
            accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
            chainId: 588,
        },
        evmostest: {
            url: "https://eth.bd.evmos.dev:8545" || "",
            accounts: [PRIVATE_KEY, PRIVATE_KEY_2],
            chainId: 9000,
        },
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "ETH",
    },
    etherscan: {
        apiKey: {
            goerli: ETHERSCAN_API_KEY!,
            ftmTestnet: FTMSCAN_API_KEY,
            avalancheFujiTestnet: SNOWTRACE_API_KEY,
            polygonMumbai: POLYGONSCAN_API_KEY,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user: {
            default: 1,
        },
    },
    // mocha: {
    //     timeout: 40000, //4000 seconds
    // },
};
export default config;
