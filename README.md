# Ethernaut Attacks

## Description

-   This will be my simple compilation of all my solutions of hacking Ethernaut Game from Openzeppelin. Group of codes for each chapters will be grouped below for reference.

## Levels

### 1 - Hello Ethernaut
#### PROBLEM:
- In this level, the player needs to get the password to submit with authenticate() in order to pass this level.

#### SOLUTION:
- After cycling with all the commands in the ethernaut console, the player will arrive with the commands to view the password. The script provided here already has all the commands. Just change the Hello Ethernaut address to your instance. Run attackHelloEthernaut.ts with (yarn hardhat scripts/attackHelloEthernaut.ts --network goerli) to run it in goerli network and wait for it to pass.

#### FILES:
- attackHelloEthernaut.ts - scripts

### 2 - Fallback
#### PROBLEM:
- In this level, the player needs to get the password to submit with authenticate() in order to pass this level.

#### SOLUTION:
- Change the Fallback level address to your instance. Run attackFallback.ts with (yarn hardhat scripts/attackFallback.ts --network goerli) to run it in goerli network and wait for it to pass.

#### FILES:
- attackFallback.ts - scripts
- Change the Fallback level address to your instance. Run attackFallback.ts with (yarn hardhat scripts/attackFallback.ts --network goerli) to run it in goerli network and wait for it to pass.

### 3 - Fallout
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
- attackFallout.ts - scripts
- Change the Fallout level address to your instance. Run attackFallout.ts with (yarn hardhat scripts/attackFallback.ts --network goerli) to run it in goerli network and wait for it to pass.

### 4 - Coin Flip
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
-   AttackCoinFlip.sol - contracts
-   CoinFlip.sol - contracts
-   deployAttackCoinFlip.ts - deploy
-   attackCoinFlip.ts -scripts
-   Deploy AttackCoinFlip.sol at goerli network with deployAttackCoinFlip.ts and run attackCoinFlip.ts to attack.

### 5 - Telephone
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
-   Wiretap.sol - contracts
-   deployWiretap.ts - deploy
-   attackTelephone.ts -scripts
-   Deploy Wiretap.sol at goerli network with deployWiretap.ts and run attackTelephone.ts using (yarn hardhat run scripts/attackTelephone.ts) to attack.

### 6 - Token
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
- attackToken.ts - scripts
- Change the Token level address to your instance. Run attackToken.ts with (yarn hardhat scripts/attackToken.ts) to run it and wait for it to pass.

### 7 - Delegation
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
- TODO: Fix error
-   attackDelegation.ts -scripts
-   Run attackDelegation.ts using (yarn hardhat run scripts/attackDelegation.ts) to attack and wait for it to pass.

### 8 - Force
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
-   AttackForce.sol - contracts
-   deployAttackForce.ts - deploy
-   attackForce.ts -scripts
-   Deploy AttackForce.sol at goerli network with deployAttackForce.ts and run attackForce.ts using (yarn hardhat run scripts/attackForce.ts) to attack and wait for it to pass.

### 9 - Vault
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
-   attackVault.ts -scripts
-   Run attackVault.ts using (yarn hardhat run scripts/attackVault.ts) to attack and wait for it to pass.

### 10 - King
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
-   TODO: give reclaim check and run
-   EternalKing.sol - contracts
-   deployEternalKing.ts - deploy
-   attackKing.ts -scripts
-   Deploy EternalKing.sol at goerli network with deployEternalKing.ts and run attackKing.ts using (yarn hardhat run scripts/attackKing.ts) to attack and wait for it to pass.


### 11 - Re-entrancy
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
-   TODO: Timeout checks
-   AttactReentrancy.sol - contracts
-   deployAttactReentrancy.ts - deploy
-   attactReentrancy.ts -scripts
-   Change Reentrancy address at args in deployEternalKing then deploy EternalKing.sol at goerli network using deployEternalKing.ts. Also change Reentrancy address in attackKing.ts  then run using (yarn hardhat run scripts/attackKing.ts) to attack and wait for it to pass.


### 12 - Elevator
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
-   AttactBuilding.sol - contracts
-   deployAttactBuilding.ts - deploy
-   attactBuilding.ts -scripts
-   Deploy AttactBuilding.sol at goerli network using deployEternalKing.ts. Change Instance address in attactBuilding.ts  then run using (yarn hardhat run scripts/attactBuilding.ts) to attack and wait for it to pass.

### 13 - Privacy
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
-   attackPrivacy.ts -scripts
-   Run attackPrivacy.ts using (yarn hardhat run scripts/attackPrivacy.ts) to attack and wait for it to pass.


### 14 - Gatekeeper One
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
-   AttackGateKeeperOne.sol - contracts
-   GateKeeperOneSample.sol - contracts
-   deployAttackGateKeeperOne.ts - deploy
-   deployGateKeeperOneSample.ts - deploy
-   attackGateKeeperOne.ts -scripts
-   Deploy AttackGateKeeperOne.sol at goerli network with deployAttackGateKeeperOne.ts and run attackGateKeeperOne.ts to attack. GateKeeperOneSample.sol is for testing locally.

### 14 - Gatekeeper Two
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
-   AttackGateKeeperTeo.sol - contracts
-   GateKeeperTwoSample.sol - contracts
-   deployAttackGateKeeperTwo.ts - deploy
-   deployGateKeeperTwoSample.ts - deploy
-   Deploy AttackGateKeeperTwo.sol at goerli network with deployAttackGateKeeperTwo.ts and it will run the attack since it uses a constructor. Change the gateTwoAddress or instance from the deployer script. GateKeeperTwoSample.sol is for testing locally.

### 15 - Naught Coin
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
-   IERC20.sol
-   attackNaughtCoin1.ts - scripts
-   attackNaughtCoin1.ts - scripts
-   run script attackNaughtCoin1.ts from player account as this will approve your secondary account to spend the NaughtCoin. Then run attackNaughtCoin2.ts using the said secondary account to transfer all NaughtCoin from player account to secondary account. Edit different address from the scripts. You may use any method in changing account in hardhat but as for me I change the account in Hardhat config under networks for that specific chain(Ethernauts uses Goerli upon the time making this).

### 16 - Preservation
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
-   LattackLibraryContract.sol - contract
-   PreservationSample.sol - contract
-   deployLAttackContract.ts - deploy
-   attackPreservation.ts - scripts
-   deploy LattackLibraryContract.sol using deployLAttackContract.ts. After deployment put address of deployed library and other needed addresses in attackPreservation.ts and run script in goerli.

### 17 - Recovery
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
-   attackRecovery.ts - scripts
-   edit addresess and run attackRecovery.ts to attack to network goerli. Lost address may be search with etehrscan or be determined by rpl encoding in solidity.

### 18 - Magic Number
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
-   attackMAgicNumber.ts - scripts
-   edit addresess and run attackMAgicNumber.ts to attack to network goerli.

### 19 - Alien Codex
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
-   attackAlienCodex.ts - scripts
-   edit addresess and run attackAlienCodex.ts to attack to network goerli.

### 20 - Denial
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
-   AttackDenial.sol - contract
-   deployAttackDenial.ts - deploy
-   AttackDenial.ts - scripts
-   deploy AttackDenial.sol using deployAttackDenial.ts to goerli network. After deployment put address of deployed library and other needed addresses in AttackDenial.ts and run script in goerli.

### 21 - Shop
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
-   AttackShop.sol - contract
-   deployAttackShop.ts - deploy
-   AttackShop.ts - scripts
-   deploy AttackShop.sol using deployAttackShop.ts to goerli network. After deployment put address of deployed library and other needed addresses in AttackShop.ts and run script in goerli.
-   TODO- scripts

### 22 - Dex
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
-   AttackDex.ts - scripts
-   Put address of deployed library and other needed addresses in AttackDex.ts and run script in goerli.
-   TODO- scripts

### 23 - Dex Two
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
-   AttackToken.sol - contracts
-   attackDexTwo.ts - scripts
-   deploy AttackToken.sol using deployAttackToken.ts to goerli network. After deployment put address of deployed library and other needed addresses in attackDexTwo.ts and run script in goerli.
-   TODO- scripts

### 24 - Puzzle Wallet
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
-   AttackPuzzleWallet.ts - scripts
-   Put address of deployed library and other needed addresses in AttackPuzzleWallet.ts and run script in goerli.

### 25 - Motorbike
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
-   AttackMotorbikeEngine.sol - contract
-   deployAttackMotorbikeEngine.ts - deploy
-   attackMotorbike.ts - scripts
-   deploy AttackMotorbikeEngine.sol using deployAttackMotorbikeEngine.ts to goerli network. After deployment put address of deployed library and other needed addresses in attackMotorbike.ts and run script in goerli.
-   TODO- scripts

### 26 - Double Entry
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:
-   attckDoubleEntryPoint.ts - scripts

### 27 - Good Samaritan
#### PROBLEM:
- Description

#### SOLUTION:
- Description

#### FILES:

## Notes

-   This is a work in progeress and will populate more as I progress furtehr into the game.
