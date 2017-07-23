pragma solidity ^0.4.10;

import 'strings.sol';

contract String {
	using strings for *;

    function lenRunes(string _s1, uint256 _expected) returns (int256)
    {
        uint256 startGas = msg.gas;
        assert(_s1.toSlice().len() == _expected);
        return int256(startGas - msg.gas);
    }

}
