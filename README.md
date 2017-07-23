# LLL Strings [Work in Progress]

Benchmarking an LLL implementation of parts of Nick Johnson's string & slice utility [library](https://github.com/Arachnid/solidity-stringutils) for Solidity against the original.

To do:

 * Implement some more parts.
 * Publish the results.
 * Explain the results.
 * Profit!

## Introduction

I imagine that few pieces of Solidity code are as finely tuned as Nick Johnson's [string utilities library](https://github.com/Arachnid/solidity-stringutils).  Nick's algorithms are genius, the code is super-lean, and he has been prepared to include hand-coded assembly language at critical points.

One of the premises of LLL is that it offers [close-to-the-metal optimizations](https://github.com/ethereum/serpent) (to quote VB himself).  So this is a challenge: how do LLL versions of the Solidiy strings routines perform when compared with the originals?
