// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract GateKeeperOneGasEstimate {
    function enterGate(address _gateAddr, uint256 _gas) public returns (bool) {
        bytes8 gateKey = bytes8(uint64(tx.origin));
        (bool success, ) = address(_gateAddr).call.gas(_gas)(
            abi.encodeWithSignature("enter(bytes8)", gateKey)
        );
        return success;
    }
}
