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

    function compare() returns (int256)
	{
        uint256 startGas = msg.gas;
        assert("foobie".toSlice().compare("foobie".toSlice()) == 0);
        assert("foobie".toSlice().compare("foobif".toSlice()) < 0);
        assert("foobie".toSlice().compare("foobid".toSlice()) > 0);
        assert("foobie".toSlice().compare("foobies".toSlice()) < 0);
        assert("foobie".toSlice().compare("foobi".toSlice()) > 0);
        assert("foobie".toSlice().compare("doobie".toSlice()) > 0);
        assert("01234567890123456789012345678901".toSlice().compare("012345678901234567890123456789012".toSlice()) < 0);
        return int256(startGas - msg.gas);
	}
	
}
