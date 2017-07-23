pragma solidity ^0.4.10;

import 'strings.sol';

contract String {
	using strings for *;

    function lenBytes32Loop() returns (uint256)
    {
        uint256 startGas = msg.gas;

        bytes32 value = ~0x00;
        int i = 32;
        while(i >= 0) {
             assert(value.len() == uint(i));
             value = bytes32(uint(value) * 0x100);
             --i;
        }

        return startGas - msg.gas;
    }
}
