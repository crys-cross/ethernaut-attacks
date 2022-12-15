// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EternalKing {
    function claimKingship(address payable _to) public payable {
        (bool sent, ) = _to.call{value: (msg.value)}("");
        require(sent, "Failed to send value!");
    }
}
