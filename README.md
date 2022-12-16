# Ethernaut Attacks

## Description

-   This will be my simple compilation of all my solutions of hacking Ethernaut Game from Openzeppelin. Group of codes for each chapters will be grouped below for reference.

## Solutions

### 1 - Hello Ethernaut

- attackHelloEthernaut.ts - scripts
- Change the Hello Ethernaut address to your instance. Run attackHelloEthernaut.ts with (yarn hardhat scripts/attackHelloEthernaut.ts --network goerli) to run it in goerli network and wait for it to pass.

### 2 - Fallback

- attackFallback.ts - scripts
- Change the Fallback level address to your instance. Run attackFallback.ts with (yarn hardhat scripts/attackFallback.ts --network goerli) to run it in goerli network and wait for it to pass.

### 3 - Fallout

- attackFallout.ts - scripts
- Change the Fallout level address to your instance. Run attackFallout.ts with (yarn hardhat scripts/attackFallback.ts --network goerli) to run it in goerli network and wait for it to pass.

### 4 - Coin Flip

-   AttackCoinFlip.sol - contracts
-   CoinFlip.sol - contracts
-   deployAttackCoinFlip.ts - deploy
-   attackCoinFlip.ts -scripts
-   Deploy AttackCoinFlip.sol at goerli network with deployAttackCoinFlip.ts and run attackCoinFlip.ts to attack.

### 5 - Telephone

-   Wiretap.sol - contracts
-   deployWiretap.ts - deploy
-   attackTelephone.ts -scripts
-   Deploy Wiretap.sol at goerli network with deployWiretap.ts and run attackTelephone.ts using (yarn hardhat run scripts/attackTelephone.ts) to attack.

### 6 - Token

- attackToken.ts - scripts
- Change the Token level address to your instance. Run attackToken.ts with (yarn hardhat scripts/attackToken.ts) to run it and wait for it to pass.

### 7 - Delegation

- TODO: Fix error
-   attackDelegation.ts -scripts
-   Run attackDelegation.ts using (yarn hardhat run scripts/attackDelegation.ts) to attack and wait for it to pass.

### 8 - Force

-   AttackForce.sol - contracts
-   deployAttackForce.ts - deploy
-   attackForce.ts -scripts
-   Deploy AttackForce.sol at goerli network with deployAttackForce.ts and run attackForce.ts using (yarn hardhat run scripts/attackForce.ts) to attack and wait for it to pass.

### 9 - Vault

-   attackVault.ts -scripts
-   Run attackVault.ts using (yarn hardhat run scripts/attackVault.ts) to attack and wait for it to pass.

### 10 - King

-   TODO: give reclaim check and run
-   EternalKing.sol - contracts
-   deployEternalKing.ts - deploy
-   attackKing.ts -scripts
-   Deploy EternalKing.sol at goerli network with deployEternalKing.ts and run attackKing.ts using (yarn hardhat run scripts/attackKing.ts) to attack and wait for it to pass.


### 11 - Re-entrancy

-   TODO: Timeout checks
-   AttactReentrancy.sol - contracts
-   deployAttactReentrancy.ts - deploy
-   attactReentrancy.ts -scripts
-   Change Reentrancy address at args in deployEternalKing then deploy EternalKing.sol at goerli network uaing deployEternalKing.ts. Also change Reentrancy address in attackKing.ts  then run using (yarn hardhat run scripts/attackKing.ts) to attack and wait for it to pass.


### 12 - Elevator

### 13 - Privacy

### 14 - Gatekeeper One

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
-   TODO- scripts

### 24 - Puzzle Wallet

-   AttackPuzzleWallet.ts - scripts
-   Put address of deployed library and other needed addresses in AttackPuzzleWallet.ts and run script in goerli.

### 25 - Motorbike

-   AttackMotorbikeEngine.sol - contract
-   deployAttackMotorbikeEngine.ts - deploy
-   attackMotorbike.ts - scripts
-   deploy AttackMotorbikeEngine.sol using deployAttackMotorbikeEngine.ts to goerli network. After deployment put address of deployed library and other needed addresses in attackMotorbike.ts and run script in goerli.
-   TODO- scripts

### 26 - Double Entry

-   attckDoubleEntryPoint.ts - scripts

### 27 - Good Samaritan

## Notes

-   This is a work in progeress and will populate more as I progress furtehr into the game.
