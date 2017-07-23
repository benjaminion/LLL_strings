pragma solidity ^0.4.10;

import 'strings.sol';

contract String {
	using strings for *;

    function lenBytes32() returns (uint256)
    {
        uint256 startGas = msg.gas;
        assert(0x0000000000000000000000000000000000000000000000000000000000000000.len() == 0);
        assert(0x4200000000000000000000000000000000000000000000000000000000000000.len() == 1);
        assert(0x4242000000000000000000000000000000000000000000000000000000000000.len() == 2);
        assert(0x4242420000000000000000000000000000000000000000000000000000000000.len() == 3);
        assert(0x4242424200000000000000000000000000000000000000000000000000000000.len() == 4);
        assert(0x4242424242000000000000000000000000000000000000000000000000000000.len() == 5);
        assert(0x4242424242420000000000000000000000000000000000000000000000000000.len() == 6);
        assert(0x4242424242424200000000000000000000000000000000000000000000000000.len() == 7);
        assert(0x4242424242424242000000000000000000000000000000000000000000000000.len() == 8);
        assert(0x4242424242424242420000000000000000000000000000000000000000000000.len() == 9);
        assert(0x4242424242424242424200000000000000000000000000000000000000000000.len() == 10);
        assert(0x4242424242424242424242000000000000000000000000000000000000000000.len() == 11);
        assert(0x4242424242424242424242420000000000000000000000000000000000000000.len() == 12);
        assert(0x4242424242424242424242424200000000000000000000000000000000000000.len() == 13);
        assert(0x4242424242424242424242424242000000000000000000000000000000000000.len() == 14);
        assert(0x4242424242424242424242424242420000000000000000000000000000000000.len() == 15);
        assert(0x4242424242424242424242424242424200000000000000000000000000000000.len() == 16);
        assert(0x4242424242424242424242424242424242000000000000000000000000000000.len() == 17);
        assert(0x4242424242424242424242424242424242420000000000000000000000000000.len() == 18);
        assert(0x4242424242424242424242424242424242424200000000000000000000000000.len() == 19);
        assert(0x4242424242424242424242424242424242424242000000000000000000000000.len() == 20);
        assert(0x4242424242424242424242424242424242424242420000000000000000000000.len() == 21);
        assert(0x4242424242424242424242424242424242424242424200000000000000000000.len() == 22);
        assert(0x4242424242424242424242424242424242424242424242000000000000000000.len() == 23);
        assert(0x4242424242424242424242424242424242424242424242420000000000000000.len() == 24);
        assert(0x4242424242424242424242424242424242424242424242424200000000000000.len() == 25);
        assert(0x4242424242424242424242424242424242424242424242424242000000000000.len() == 26);
        assert(0x4242424242424242424242424242424242424242424242424242420000000000.len() == 27);
        assert(0x4242424242424242424242424242424242424242424242424242424200000000.len() == 28);
        assert(0x4242424242424242424242424242424242424242424242424242424242000000.len() == 29);
        assert(0x4242424242424242424242424242424242424242424242424242424242420000.len() == 30);
        assert(0x4242424242424242424242424242424242424242424242424242424242424200.len() == 31);
        assert(0x4242424242424242424242424242424242424242424242424242424242424242.len() == 32);
        return startGas - msg.gas;
    }
}