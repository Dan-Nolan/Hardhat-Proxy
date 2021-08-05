//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Proxy {
    uint public value = 100;
    address protocol;

    constructor(address _protocol) {
        protocol = _protocol;
    }

    // if the function methodID is not found
    // this function is invoked
    fallback() external {
      address _impl = protocol;
      assembly {
        let ptr := mload(0x40)

        // (1) copy incoming call data
        calldatacopy(ptr, 0, calldatasize())

        // (2) forward call to logic contract
        let result := delegatecall(gas(), _impl, ptr, calldatasize(), 0, 0)
        let size := returndatasize()

        // (3) retrieve return data
        returndatacopy(ptr, 0, size)

        // (4) forward return data back to caller
        switch result
        case 0 { revert(ptr, size) }
        default { return(ptr, size) }
      }
    }

    function changeAddress(address _protocol) external {
        // TODO: governance?
        protocol = _protocol;
    }
}
