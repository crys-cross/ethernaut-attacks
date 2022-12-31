# Ethernaut Attacks

## Description

-   This will be my simple compilation of all my solutions of hacking Ethernaut Game from Openzeppelin. Group of codes for each chapters will be grouped below for reference. All this is done through EthersJS with Hardhat. It is using goerli network as default since at the time of making this, ethernaut uses goerli network.

## Levels

### 1 - Hello Ethernaut
#### PROBLEM:
- In this level, the player needs to get the password to submit with authenticate() in order to pass this level.

#### SOLUTION:
- After cycling with all the commands in the ethernaut console, the player will arrive with the commands to view the password. The script provided here already has all the commands. Just change the Hello Ethernaut address to your instance. Run attackHelloEthernaut.ts with (yarn hardhat scripts/attackHelloEthernaut.ts --network goerli) to run it in goerli network and wait for it to pass.

#### FILES:
- attackHelloEthernaut.ts - scripts

----------------------------

### 2 - Fallback
#### PROBLEM:
- Claim ownership of the contract and drain its balance to zero.

#### SOLUTION:
- There are two ways visible in the contract in claiming ownership. One is through contribute() function and the receive() function. It is more realistic to attack receive() since we need to match 1000 ETH in order to meet contribute() condition to become owner. To activate receive(), Player needs to send a transaction of ETH directly to the contract which is provided in the script. Change the Fallback level address to your instance. Run attackFallback.ts with (yarn hardhat scripts/attackFallback.ts) to run it and wait for it to pass.

#### FILES:
- attackFallback.ts - scripts

----------------------------

### 3 - Fallout
#### PROBLEM:
- Claim ownership of this contract.

#### SOLUTION:
- In older versions of solisity contract, constructors were functions named the same as the contract name. In this level, Fallout contract is not the same as Fal1out function within the contract thus not making is as a constructor but rather an ordinary function which the player could call to become the new owner. Change the Fallout level address to your instance. Run attackFallout.ts with (yarn hardhat scripts/attackFallout.ts) and wait for it to pass.

#### FILES:
- attackFallout.ts - scripts

----------------------------

### 4 - Coin Flip
#### PROBLEM:
- Win this coinflip game by correctly guessing for 10 times in a row.

#### SOLUTION:
-   The mechanism of this contract is not random by any chance and could be predicted by deploying a similar contract with the same mechanism to predict the outcome and rig the game. Change coinflip instance address then run attackCoinFlip.ts with (yarn hardhat scripts/attackCoinFlip.ts) and wait for it to pass.

#### FILES:
-   TODO: check while loop to stop at 10, 
-   AttackCoinFlip.sol - contracts
-   CoinFlip.sol - contracts
-   deployAttackCoinFlip.ts - deploy
-   attackCoinFlip.ts -scripts

----------------------------

### 5 - Telephone
#### PROBLEM:
- Claim ownership of the contract.

#### SOLUTION:
-   In changeOwner() function, player could become owner if they could meet the condition of tx.origin not equals to message.sender which could be done with the help of another contract. Change Telephone instance address then run attackTelephone.ts with (yarn hardhat scripts/attackTelephone.ts) and wait for it to pass.

#### FILES:
-   Wiretap.sol - contracts
-   deployWiretap.ts - deploy
-   attackTelephone.ts -scripts

----------------------------

### 6 - Token
#### PROBLEM:
- In this level the player will be given 20 starting token. Player needs to have more than the starting 20 token to pass this level.

#### SOLUTION:
- The maximum value of uint256 is 2 raise to the power 256 minus 1 or 115,792,089,237,316,195,423,570,985,008,687,907,853,269,984,665,640,564,039,457,584,007,913,129,639,935. Going over that amount will bring you back to start at 0 and under 0 to that maximum amount which is called underflow and overflow. Solidity contracts below 0.8 doesn't have a built in check for overflow and underflow and needs the safemath from openzeppelin to prevent that in which no checks are available in this contract. Change the Token level address to your instance. Run attackToken.ts with (yarn hardhat scripts/attackToken.ts) to run it and wait for it to pass.

#### FILES:
- attackToken.ts - scripts

----------------------------

### 7 - Delegation
#### PROBLEM:
- Claim ownership of the contract.

#### SOLUTION:
-   This is a simple delegate call. Just send a transaction with the data of the function signature. Run attackDelegation.ts using (yarn hardhat run scripts/attackDelegation.ts) to attack and wait for it to pass.

#### FILES:
- TODO: Fix error
-   attackDelegation.ts -scripts

----------------------------

### 8 - Force
#### PROBLEM:
- Make this contract balance to be greater than zero. The challenge is that this contract is supposedly unable to receive ETH or any tokens.

#### SOLUTION:
-  The function selfdesctruct can bypass this challenge. Just make a contract with selfdesctruct to transfer funds from that contract to this contract. Deploy AttackForce.sol at goerli network with deployAttackForce.ts and run attackForce.ts using (yarn hardhat run scripts/attackForce.ts) to attack and wait for it to pass.

#### FILES:
-   AttackForce.sol - contracts
-   deployAttackForce.ts - deploy
-   attackForce.ts -scripts

----------------------------

### 9 - Vault
#### PROBLEM:
- Unlock vault contract to pass the level.

#### SOLUTION:
-   Password variable is set to private but that does not secure it from being read. Read the storage and unlock the contract using the read password. Just run attackVault.ts using (yarn hardhat run scripts/attackVault.ts) to attack and wait for it to pass.

#### FILES:
-   attackVault.ts -scripts

----------------------------

### 10 - King
#### PROBLEM:
- Break this contract game by prefereably making others be unable to be King.

#### SOLUTION:
-   In receive() function, the contract uses transfer() which will stop execution if the target won't be able to receive any value(unlike send). By this the player can cause an error in this part of the function so that the function will stop there and won't reach the assigning of king part. Player can assign a contract with no receive() function as the new king and with the error, new new king can be assigned. So change King instance address and run attackKing.ts using (yarn hardhat run scripts/attackKing.ts) to attack and wait for it to pass.

#### FILES:
-   TODO: reclaim check
-   attackKing.ts -scripts
-   EternalKing.sol - contracts
-   deployEternalKing.ts - deploy(not needed)


----------------------------

### 11 - Re-entrancy
#### PROBLEM:
- Steal the funds of this contract.

#### SOLUTION:
-   The contract is suceptible to reentrancy if there is a withdraw function in which the balance is changed after the value is sent in which the withdrawer could continously withdraw before the balance is updated. With this the player could deploy an attack contract just change Reentrancy address at args in deployEternalKing then deploy EternalKing.sol at goerli network using deployEternalKing.ts. Also change Reentrancy address in attackKing.ts  then run using (yarn hardhat run scripts/attackKing.ts) to attack and wait for it to pass.


#### FILES:
-   TODO: Timeout checks
-   AttactReentrancy.sol - contracts
-   deployAttactReentrancy.ts - deploy
-   attactReentrancy.ts -scripts

----------------------------

### 12 - Elevator
#### PROBLEM:
- The goal is for the player to reach the top of the building. The challenge comes from the current contract having no function to provide that.

#### SOLUTION:
-  Original contract does not grant the ability to reach to top floor. But with another contract and interacting it through interface, the player could have the option in that contract to set the isLastFloor to true. Just deploy AttactBuilding.sol at goerli network using deployEternalKing.ts. Change Instance address in attactBuilding.ts  then run using (yarn hardhat run scripts/attactBuilding.ts) to attack and wait for it to pass.

#### FILES:
-   AttactBuilding.sol - contracts
-   deployAttactBuilding.ts - deploy
-   attactBuilding.ts -scripts

----------------------------

### 13 - Privacy
#### PROBLEM:
- Unlock the contract by reading the private password.

#### SOLUTION:
-   Player can read the data which is needed to unlock the contract from storage. Player just needs to know the location of the storage and convert it to byte16 to meet the requirement in unlocking the contract. Run attackPrivacy.ts using (yarn hardhat run scripts/attackPrivacy.ts) to attack and wait for it to pass.

#### FILES:
-   attackPrivacy.ts -scripts

----------------------------

### 14 - Gatekeeper One
#### PROBLEM:
- Register Player's address as entrant.Challenge lies with passing all the requirements in order to be accepted as entrant by the contract.

#### SOLUTION:
-   Player needs to know about type conversion, opcode and difference of tx.origin from msg.sender in order to meet the requirements of this contract and be able to register Player's address as an entrant. Deploy AttackGateKeeperOne.sol at goerli network with deployAttackGateKeeperOne.ts and run attackGateKeeperOne.ts to attack. GateKeeperOneSample.sol is for testing locally.

#### FILES:
-   AttackGateKeeperOne.sol - contracts
-   GateKeeperOneSample.sol - contracts
-   deployAttackGateKeeperOne.ts - deploy
-   deployGateKeeperOneSample.ts - deploy
-   attackGateKeeperOne.ts -scripts

----------------------------

### 14 - Gatekeeper Two
#### PROBLEM:
- Register Player's address as entrant. Similar challenge to gatekeeper one.

#### SOLUTION:
-   In this, player needs to have knowledge about assembbly, caller and extcodesize to meet the requirements in order to regsiter Player's address as entrant. Deploy AttackGateKeeperTwo.sol at goerli network with deployAttackGateKeeperTwo.ts and it will run the attack since it uses a constructor. Change the gateTwoAddress or instance from the deployer script. GateKeeperTwoSample.sol is for testing locally.

#### FILES:
-   AttackGateKeeperTeo.sol - contracts
-   GateKeeperTwoSample.sol - contracts
-   deployAttackGateKeeperTwo.ts - deploy
-   deployGateKeeperTwoSample.ts - deploy

----------------------------

### 15 - Naught Coin
#### PROBLEM:
- Transfer the 10 years locked token that Player holds to another address. Need to have the token balance held to become zero to pass this level.

#### SOLUTION:
-   Transfer is not the only method available for an ERC20 token to transfer tokens from one address to another. Another way is through transferFrom(). Run script attackNaughtCoin1.ts from player account as this will approve your secondary account to spend the NaughtCoin. Then run attackNaughtCoin2.ts using the said secondary account to transfer all NaughtCoin from player account to secondary account. Edit different address from the scripts. You may use any method in changing account in hardhat but as for me I change the account in Hardhat config under networks for that specific chain(Ethernauts uses Goerli upon the time making this).

#### FILES:
-   TODO: wallet connect with using two different accounts
-   IERC20.sol
-   attackNaughtCoin1.ts - scripts
-   attackNaughtCoin1.ts - scripts

----------------------------

### 16 - Preservation
#### PROBLEM:
- Claim ownership of the this contract to pass this level.

#### SOLUTION:
-   The two contracts should have parallel storage layout but since it's not, setting storedTime in LibraryContract will actually overwrite storage in slot 0 of Preservation contract and not storedTime which is in slot 3 of storage. With this, Player can change LibraryContract with Player's own maliscious contract to set owner via these storage vulnerability. Deploy LattackLibraryContract.sol using deployLAttackContract.ts. After deployment put address of deployed library and other needed addresses in attackPreservation.ts and run script in goerli.

#### FILES:
-   TODO: contractFactory to deploy contracts from the attack script and not on a separate deploy script.
-   LattackLibraryContract.sol - contract
-   PreservationSample.sol - contract
-   deployLAttackContract.ts - deploy
-   attackPreservation.ts - scripts

----------------------------

### 17 - Recovery
#### PROBLEM:
- Retrieve the lost contract and recover the '0.001' ETH in that contract to pass this level.

#### SOLUTION:
-   Finding the lost address could be done through etherscan checking internal txn of the instance address or through rlp encoding but here the chosen method was etherscan. Edit addresess and run attackRecovery.ts to attack to network goerli.

#### FILES:
-   attackRecovery.ts - scripts

----------------------------

### 18 - Magic Number
#### PROBLEM:
- Provide the contract a solver. Challenge lies that the solver needs to be only 10 opcodes small.

#### SOLUTION:
-   Player needs to be knowledgeable about opcodes and put together the needed opcodes then send the opcodes as data in a transaction directly to the contract. edit addresess and run attackMAgicNumber.ts to attack to network goerli.

#### FILES:
-   attackMAgicNumber.ts - scripts

----------------------------

### 19 - Alien Codex
#### PROBLEM:
- Claim ownership of this contract to pass this level.

#### SOLUTION:
-   Upon checking, retract() function will reduce the codex.lenght but will not have any safeguards for overflow and underflow whcih would give access to the whole storage of the contract if the Player knows the location of the slot of the storage he is aiming for like for example owner that seemed to be at slot 0 then use the revise() function to send the right data to change the owner. Edit addresess and run attackAlienCodex.ts to attack to network goerli.

#### FILES:
-   attackAlienCodex.ts - scripts

----------------------------

### 20 - Denial
#### PROBLEM:
- Break the contract by making the owner unable to withdraw to pass this level.

#### SOLUTION:
-   Player can mess up the contracts withdraw function with the call since it does not have checks for gas limit thus it can activate another contracts receive() function and making it unable for the owner to withdraw. Just make the maliscious contract the partner. Deploy AttackDenial.sol using deployAttackDenial.ts to goerli network. After deployment put address of deployed library and other needed addresses in AttackDenial.ts and run script in goerli.

#### FILES:
-   AttackDenial.sol - contract
-   deployAttackDenial.ts - deploy
-   AttackDenial.ts - scripts

----------------------------

### 21 - Shop
#### PROBLEM:
- Buy item with less than the asking price to pass this level.

#### SOLUTION:
-   Player can alter the price with a maliscious contract. Deploy AttackShop.sol using deployAttackShop.ts to goerli network. After deployment put address of deployed library and other needed addresses in AttackShop.ts and run script in goerli.
-   TODO- scripts

#### FILES:
-   AttackShop.sol - contract
-   deployAttackShop.ts - deploy
-   AttackShop.ts - scripts

----------------------------

### 22 - Dex
#### PROBLEM:
- Steal the funds from the contract via price manipulation to pass this level.

#### SOLUTION:
-   Solidity does not support fractions and will have some discrepancy in its mathematical operation and player can use that vulnerability to drain all the tokens from the contract. Put address of deployed library and other needed addresses in AttackDex.ts and run script in goerli.
-   TODO- scripts

#### FILES:
-   AttackDex.ts - scripts

----------------------------

### 23 - Dex Two
#### PROBLEM:
- Drain all the balance of both token A and B from the contract.

#### SOLUTION:
-   This swap contract does not check if what token is being exchanged thus player can use a maliscious token contract to help in draining all the tokens in this contract. Deploy AttackToken.sol using deployAttackToken.ts to goerli network. After deployment put address of deployed library and other needed addresses in attackDexTwo.ts and run script in goerli.
-   TODO- scripts

#### FILES:
-   AttackToken.sol - contracts
-   attackDexTwo.ts - scripts

----------------------------

### 24 - Puzzle Wallet
#### PROBLEM:
- Hijack contract by becoming admin to pass this level.

#### SOLUTION:
-   There is a stage collision in the proxy contract(PuzzleProxy) and logic contract(PuzzleWallet) that Players will be able to use. Put address of deployed library and other needed addresses in AttackPuzzleWallet.ts and run script in goerli.

#### FILES:
-   AttackPuzzleWallet.ts - scripts

----------------------------

### 25 - Motorbike
#### PROBLEM:
- Player has to make the proxy (Motorbike) unusable by destroying the implementation/logic contract (Engine) through selfdestruct.

#### SOLUTION:
-   Player has the option to upgrade the logic contract with another contract that has selfdestruct function. Player needs to first become the upgrader which could be done by the initialize() function. Deploy AttackMotorbikeEngine.sol using deployAttackMotorbikeEngine.ts to goerli network. After deployment put address of deployed library and other needed addresses in attackMotorbike.ts and run script in goerli.
-   TODO- scripts

#### FILES:
-   AttackMotorbikeEngine.sol - contract
-   deployAttackMotorbikeEngine.ts - deploy
-   attackMotorbike.ts - scripts

----------------------------

### 26 - Double Entry
#### PROBLEM:
- Player has to find the bug in the CryptoVault and create a Forta bot to protect it from being drained.

#### SOLUTION:
- Description

#### FILES:
-   attckDoubleEntryPoint.ts - scripts

----------------------------

### 27 - Good Samaritan
#### PROBLEM:
- Drain the wallet of the good samaritan ready to donate 

#### SOLUTION:
- Description

#### FILES:

----------------------------

## Notes

-   This is a work in progeress and will populate more as I progress furtehr into the game.
