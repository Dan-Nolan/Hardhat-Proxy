//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract ProtocolV2 {
    uint public value = 100;

    function changeValue(uint _value) external {
        value = _value * 10;
    }

    function lookupValueDoubled() external view returns(uint) {
        return value * 2;
    }
}
