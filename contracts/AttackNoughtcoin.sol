// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

interface INaughtCoin {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
}
