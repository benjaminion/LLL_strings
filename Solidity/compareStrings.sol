pragma solidity ^0.4.10;

import 'strings.sol';

contract String {
	using strings for *;

    function abs(int x) private returns (int) {
        if(x < 0)
            return -x;
        return x;
    }

    function sign(int x) private returns (int)
    {
        if (x==0)
            return 0;
        else
            return x/abs(x);
    }

    function compareStrings(string _s1, string _s2, int256 _expected) returns (int256)
    {
        uint256 startGas = msg.gas;
        assert(sign(_s1.toSlice().compare(_s2.toSlice())) == _expected);
        return int256(startGas - msg.gas);
    }

}
