//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Protocol {
    uint public value = 100;

    function changeValue(uint _value) external {
        value = _value;
    }
}
