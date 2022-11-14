# Ethernaut Attacks

## Description

-   This will be my simple compilation of all my solutions of hacking Ethernaut Game from Openzeppelin. Group of codes for each chapters will be grouped below for reference.

## Solutions

### 1 - Hello Ethernaut

### 2 - Fallback

### 3 - Fallout

### 4 - Coin Flip

### 5 - Telephone

### 6 - Token

### 7 - Delegation

### 8 - Force

### 9 - Vault

### 10 - King

### 11 - Elevator

### 12 - Privacy

### 13 - Gatekeeper One

-   AttackGateKeeperOne.sol - contracts
-   GateKeeperOneSample.sol - contracts
-   deployAttackGateKeeperOne.ts - deploy
-   deployGateKeeperOneSample.ts - deploy
-   attackGateKeeperOne.ts -scripts
-   Deploy AttackGateKeeperOne.sol at goerli network with deployAttackGateKeeperOne.ts and run attackGateKeeperOne.ts to attack. GateKeeperOneSample.sol is for testing locally.

### 14 - Gatekeeper Two

-   AttackGateKeeperTeo.sol - contracts
-   GateKeeperTwoSample.sol - contracts
-   deployAttackGateKeeperTwo.ts - deploy
-   deployGateKeeperTwoSample.ts - deploy
-   Deploy AttackGateKeeperTwo.sol at goerli network with deployAttackGateKeeperTwo.ts and it will run the attack since it uses a constructor. Change the gateTwoAddress or instance from the deployer script. GateKeeperTwoSample.sol is for testing locally.

### 15 - Naught Coin

-   IERC20.sol
-   attackNaughtCoin1.ts - scripts
-   attackNaughtCoin1.ts - scripts
-   run script attackNaughtCoin1.ts from player account as this will approve your secondary account to spend the NaughtCoin. Then run attackNaughtCoin2.ts using the said secondary account to transfer all NaughtCoin from player account to secondary account. Edit different address from the scripts. You may use any method in changing account in hardhat but as for me I change the account in Hardhat config under networks for that specific chain(Ethernauts uses Goerli upon the time making this).

### 16 - Preservation

-   LattackLibraryContract.sol - contract
-   PreservationSample.sol - contract
-   deployLAttackContract.ts - deploy
-   attackPreservation.ts - scripts
-   deploy LattackLibraryContract.sol using deployLAttackContract.ts. After deployment put address of deployed library and other needed addresses in attackPreservation.ts and run script in goerli.

### 17 - Recovery

-   attackRecovery.ts - scripts
-   edit addresess and run attackRecovery.ts to attack to network goerli. Lost address may be search with etehrscan or be determined by rpl encoding in solidity.

### 18 - Magic Number

-   attackMAgicNumber.ts - scripts
-   edit addresess and run attackMAgicNumber.ts to attack to network goerli.

### 19 - Alien Codex

-   attackAlienCodex.ts - scripts
-   edit addresess and run attackAlienCodex.ts to attack to network goerli.

### 20 - Denial

-   AttackDenial.sol - contract
-   deployAttackDenial.ts - deploy
-   AttackDenial.ts - scripts
-   deploy AttackDenial.sol using deployAttackDenial.ts to goerli network. After deployment put address of deployed library and other needed addresses in AttackDenial.ts and run script in goerli.

### 21 - Shop

-   AttackShop.sol - contract
-   deployAttackShop.ts - deploy
-   AttackShop.ts - scripts
-   deploy AttackShop.sol using deployAttackShop.ts to goerli network. After deployment put address of deployed library and other needed addresses in AttackShop.ts and run script in goerli.
-   TODO- scripts

### 22 - Dex

-   AttackDex.ts - scripts
-   Put address of deployed library and other needed addresses in AttackDex.ts and run script in goerli.
-   TODO- scripts

### 23 - Dex Two

-   AttackToken.sol - contracts
-   attackDexTwo.ts - scripts
-   deploy AttackToken.sol using deployAttackToken.ts to goerli network. After deployment put address of deployed library and other needed addresses in attackDexTwo.ts and run script in goerli.

### 24 - Puzzle Wallet

### 25 - Motorbike

### 26 - Double Entry

### 27 - Good Samaritan

## Notes

-   This is a work in progeress and will populate more as I progress furtehr into the game.
