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
- Claim ownership of the contract and drain its balance to zero.

#### SOLUTION:
- Change the Fallback level address to your instance. Run attackFallback.ts with (yarn hardhat scripts/attackFallback.ts --network goerli) to run it in goerli network and wait for it to pass.

#### FILES:
- attackFallback.ts - scripts
- Change the Fallback level address to your instance. Run attackFallback.ts with (yarn hardhat scripts/attackFallback.ts --network goerli) to run it in goerli network and wait for it to pass.

### 3 - Fallout
#### PROBLEM:
- Claim ownership of this contract.

#### SOLUTION:
- Description

#### FILES:
- attackFallout.ts - scripts
- Change the Fallout level address to your instance. Run attackFallout.ts with (yarn hardhat scripts/attackFallback.ts --network goerli) to run it in goerli network and wait for it to pass.

### 4 - Coin Flip
#### PROBLEM:
- Win this coinflip game by correctly guessing for 10 times in a row.

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
- Claim ownership of the contract.

#### SOLUTION:
- Description

#### FILES:
-   Wiretap.sol - contracts
-   deployWiretap.ts - deploy
-   attackTelephone.ts -scripts
-   Deploy Wiretap.sol at goerli network with deployWiretap.ts and run attackTelephone.ts using (yarn hardhat run scripts/attackTelephone.ts) to attack.

### 6 - Token
#### PROBLEM:
- In this level the player will be given 20 starting token. Player needs to have more than the starting 20 token to pass this level.

#### SOLUTION:
- Description

#### FILES:
- attackToken.ts - scripts
- Change the Token level address to your instance. Run attackToken.ts with (yarn hardhat scripts/attackToken.ts) to run it and wait for it to pass.

### 7 - Delegation
#### PROBLEM:
- Claim ownership of the contract.

#### SOLUTION:
- Description

#### FILES:
- TODO: Fix error
-   attackDelegation.ts -scripts
-   Run attackDelegation.ts using (yarn hardhat run scripts/attackDelegation.ts) to attack and wait for it to pass.

### 8 - Force
#### PROBLEM:
- Make this contract balance to be greater than zero. The challenge is that this contract is supposedly unable to receive ETH or any tokens.

#### SOLUTION:
- Description

#### FILES:
-   AttackForce.sol - contracts
-   deployAttackForce.ts - deploy
-   attackForce.ts -scripts
-   Deploy AttackForce.sol at goerli network with deployAttackForce.ts and run attackForce.ts using (yarn hardhat run scripts/attackForce.ts) to attack and wait for it to pass.

### 9 - Vault
#### PROBLEM:
- Unlock vault contract to pass the level.

#### SOLUTION:
- Description

#### FILES:
-   attackVault.ts -scripts
-   Run attackVault.ts using (yarn hardhat run scripts/attackVault.ts) to attack and wait for it to pass.

### 10 - King
#### PROBLEM:
- Break this contract game by prefereably making others be unable to be King.

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
- Steal the funds of this contract.

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
- The goal is for the player to reach the top of the building. The challenge comes from the current contract having no function to provide that.

#### SOLUTION:
- Description

#### FILES:
-   AttactBuilding.sol - contracts
-   deployAttactBuilding.ts - deploy
-   attactBuilding.ts -scripts
-   Deploy AttactBuilding.sol at goerli network using deployEternalKing.ts. Change Instance address in attactBuilding.ts  then run using (yarn hardhat run scripts/attactBuilding.ts) to attack and wait for it to pass.

### 13 - Privacy
#### PROBLEM:
- Unlock the contract by reading the private password.

#### SOLUTION:
- Description

#### FILES:
-   attackPrivacy.ts -scripts
-   Run attackPrivacy.ts using (yarn hardhat run scripts/attackPrivacy.ts) to attack and wait for it to pass.


### 14 - Gatekeeper One
#### PROBLEM:
- Register Player's address as entrant.Challenge lies with passing all the requirements in order to be accepted as entrant by the contract.

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
- Register Player's address as entrant. Similar challenge to gatekeeper one.

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
- Transfer the 10 years locked token that Player holds to another address. Need to have the token balance held to become zero to pass this level.

#### SOLUTION:
- Description

#### FILES:
-   IERC20.sol
-   attackNaughtCoin1.ts - scripts
-   attackNaughtCoin1.ts - scripts
-   run script attackNaughtCoin1.ts from player account as this will approve your secondary account to spend the NaughtCoin. Then run attackNaughtCoin2.ts using the said secondary account to transfer all NaughtCoin from player account to secondary account. Edit different address from the scripts. You may use any method in changing account in hardhat but as for me I change the account in Hardhat config under networks for that specific chain(Ethernauts uses Goerli upon the time making this).

### 16 - Preservation
#### PROBLEM:
- Claim ownership of the this contract to pass this level.

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
- Retrieve the lost contract and recover the '0.001' ETH in that contract to pass this level.

#### SOLUTION:
- Description

#### FILES:
-   attackRecovery.ts - scripts
-   edit addresess and run attackRecovery.ts to attack to network goerli. Lost address may be search with etehrscan or be determined by rpl encoding in solidity.

### 18 - Magic Number
#### PROBLEM:
- Provide the contract a solver. Challenge lies that the solver needs to be only 10 opcodes small.

#### SOLUTION:
- Description

#### FILES:
-   attackMAgicNumber.ts - scripts
-   edit addresess and run attackMAgicNumber.ts to attack to network goerli.

### 19 - Alien Codex
#### PROBLEM:
- Claim ownership of this contract to pass this level.

#### SOLUTION:
- Description

#### FILES:
-   attackAlienCodex.ts - scripts
-   edit addresess and run attackAlienCodex.ts to attack to network goerli.

### 20 - Denial
#### PROBLEM:
- Break the contract by making the owner unable to withdraw to pass this level.

#### SOLUTION:
- Description

#### FILES:
-   AttackDenial.sol - contract
-   deployAttackDenial.ts - deploy
-   AttackDenial.ts - scripts
-   deploy AttackDenial.sol using deployAttackDenial.ts to goerli network. After deployment put address of deployed library and other needed addresses in AttackDenial.ts and run script in goerli.

### 21 - Shop
#### PROBLEM:
- Buy item with less than the asking price to pass this level.

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
- Steal the funds from the contract via price manipulation to pass this level.

#### SOLUTION:
- Description

#### FILES:
-   AttackDex.ts - scripts
-   Put address of deployed library and other needed addresses in AttackDex.ts and run script in goerli.
-   TODO- scripts

### 23 - Dex Two
#### PROBLEM:
- Drain all the balance of both token A and B from the contract.

#### SOLUTION:
- Description

#### FILES:
-   AttackToken.sol - contracts
-   attackDexTwo.ts - scripts
-   deploy AttackToken.sol using deployAttackToken.ts to goerli network. After deployment put address of deployed library and other needed addresses in attackDexTwo.ts and run script in goerli.
-   TODO- scripts

### 24 - Puzzle Wallet
#### PROBLEM:
- Hijack contract by becoming admin to pass this level.

#### SOLUTION:
- Description

#### FILES:
-   AttackPuzzleWallet.ts - scripts
-   Put address of deployed library and other needed addresses in AttackPuzzleWallet.ts and run script in goerli.

### 25 - Motorbike
#### PROBLEM:
- Player has to make the proxy (Motorbike) unusable by destroying the implementation/logic contract (Engine) through selfdestruct.

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
