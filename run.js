// =============================================================================
//
// Strings benchmark suite
//
// Instructions:
//
// 1. Start testrpc (ideally in a different terminal)
//    > /opt/node/lib/node_modules/ethereumjs-testrpc/bin/testrpc -d
// 2. Run the tests - the last arg is the bytecode file for the contract
//    > node run.js
//
// =============================================================================

// Input files
const abi_file = 'strings_abi.json';

// These addresses are generated as standard by testrpc -d
const ADDR0 = "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1";
const ADDR1 = "0xffcf8fdee72ac11b5c542428b35eef5769c409f0";
const ADDR2 = "0x22d491bde2303f2f43325b2108d26f1eaba1e32b";

// Set up Web3. Need testrpc to be running.
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

const fs = require('fs');

// Read the Contract ABI [TODO - error handling]
const ABI = fs.readFileSync(abi_file,'utf8');
const Strings = web3.eth.contract(JSON.parse(ABI));

//const GAS = web3.eth.estimateGas({data:EVM}); <-- doesn't work for Solidity
const GAS = 4000000;

// =============================================================================
// Control loop

// Serialise the execution of the asynchronous calls so we get sensible output
function series(callbacks) {
    function next() {
        var callback = callbacks.shift();
        if(callback) {
            callback(function() {
                next();
            });
        }
    }
    next();
}

// Aaagh... need to grapple with early binding to make this work...
/*
var test = ['compare',  'compareLoop'];
var func = [runCompare, runCompareLoop];
var tests = [];
for (var i=0; i<test.length; i++) {
    tests.push(function(next) { deployAndRun(`LLL/${test[i]}.hex`, func[i], next); });
    tests.push(function(next) { deployAndRun(`LLL/${test[i]}_opt.hex`, func[i], next); });
    tests.push(function(next) { deployAndRun(`Solidity/${test[i]}.hex`, func[i], next); });
    tests.push(function(next) { deployAndRun(`Solidity/${test[i]}_opt.hex`, func[i], next); });
}
series(tests);
*/

var tests = [];

/*
tests.push(
    function(next) { deployAndRun(`LLL/compare.hex`, runCompare, next); },
    function(next) { deployAndRun(`LLL/compare_opt.hex`, runCompare, next); },
    function(next) { deployAndRun(`Solidity/compare.hex`, runCompare, next); },
    function(next) { deployAndRun(`Solidity/compare_opt.hex`, runCompare, next) }
);

tests.push(
    function(next) { deployAndRun(`LLL/compareLoop.hex`, runCompareLoop, next); },
    function(next) { deployAndRun(`LLL/compareLoop_opt.hex`, runCompareLoop, next); },
    function(next) { deployAndRun(`Solidity/compareLoop.hex`, runCompareLoop, next); },
    function(next) { deployAndRun(`Solidity/compareLoop_opt.hex`, runCompareLoop, next);}
);

tests.push(
    function(next) { deployAndRun(`LLL/compareStrings.hex`, runCompareStrings, next); },
    function(next) { deployAndRun(`LLL/compareStrings_opt.hex`, runCompareStrings, next); },
    function(next) { deployAndRun(`Solidity/compareStrings.hex`, runCompareStrings, next); },
    function(next) { deployAndRun(`Solidity/compareStrings_opt.hex`, runCompareStrings, next);}
);

tests.push(
    function(next) { deployAndRun(`LLL/lenBytes32.hex`, runLenBytes32, next); },
    function(next) { deployAndRun(`LLL/lenBytes32_opt.hex`, runLenBytes32, next); },
    function(next) { deployAndRun(`Solidity/lenBytes32.hex`, runLenBytes32, next); },
    function(next) { deployAndRun(`Solidity/lenBytes32_opt.hex`, runLenBytes32, next);}
);

tests.push(
    function(next) { deployAndRun(`LLL/lenBytes32Loop.hex`, runLenBytes32Loop, next); },
    function(next) { deployAndRun(`LLL/lenBytes32Loop_opt.hex`, runLenBytes32Loop, next); },
    function(next) { deployAndRun(`Solidity/lenBytes32Loop.hex`, runLenBytes32Loop, next); },
    function(next) { deployAndRun(`Solidity/lenBytes32Loop_opt.hex`, runLenBytes32Loop, next);}
);
*/

tests.push(
    function(next) { deployAndRun(`LLL/lenRunes.hex`, runLenRunes, next); },
    function(next) { deployAndRun(`LLL/lenRunes_opt.hex`, runLenRunes, next); },
    function(next) { deployAndRun(`Solidity/lenRunes.hex`, runLenRunes, next); },
    function(next) { deployAndRun(`Solidity/lenRunes_opt.hex`, runLenRunes, next);}
);

series(tests);

function runCompare(strings)
{
    gasPrint(strings.compare());
    strings.compare.sendTransaction({from: ADDR0}, getGas);
}

function runCompareLoop(strings)
{
    gasPrint(strings.compareLoop());
    strings.compareLoop.sendTransaction({from: ADDR0}, getGas);
}

function runCompareStrings(strings)
{
    gasPrint(strings.compareStrings("Foo","Foo",0));
    gasPrint(strings.compareStrings("Bar","Foo",-1));
    gasPrint(strings.compareStrings("Foo","Bar",1));
    gasPrint(strings.compareStrings("1234567890abcdef1234567890abcdef", "1234567890abcdef1234567890abcdef", 0));
    gasPrint(strings.compareStrings("1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", 0));
    gasPrint(strings.compareStrings("1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcde", 1));

    strings.compareStrings.sendTransaction("Foo","Foo",0, {from: ADDR0}, getGas);
    strings.compareStrings.sendTransaction("Bar","Foo",-1, {from: ADDR0}, getGas);
    strings.compareStrings.sendTransaction("Foo","Bar",1, {from: ADDR0}, getGas);
    strings.compareStrings.sendTransaction("1234567890abcdef1234567890abcdef", "1234567890abcdef1234567890abcdef", 0, {from: ADDR0}, getGas);
    strings.compareStrings.sendTransaction("1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", 0, {from: ADDR0}, getGas);
    strings.compareStrings.sendTransaction("1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef", "1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcde", 1, {from: ADDR0}, getGas);
}

function runLenBytes32(strings)
{
    gasPrint(strings.lenBytes32());
    strings.lenBytes32.sendTransaction({from: ADDR0}, getGas);
}

function runLenBytes32Loop(strings)
{
    gasPrint(strings.lenBytes32Loop());
    strings.lenBytes32Loop.sendTransaction({from: ADDR0}, getGas);
}

// testcases from http://www.cl.cam.ac.uk/~mgk25/ucs/examples/quickbrown.txt
function runLenRunes(strings)
{
    gasPrint(strings.lenRunes("The quick brown fox jumps over the lazy dog", 43));
    gasPrint(strings.lenRunes("Quizdeltagerne spiste jordbær med fløde, mens cirkusklovnen Wolther spillede på xylofon", 87));
    gasPrint(strings.lenRunes("Falsches Üben von Xylophonmusik quält jeden größeren Zwerg", 58));
    gasPrint(strings.lenRunes("Γαζέες καὶ μυρτιὲς δὲν θὰ βρῶ πιὰ στὸ χρυσαφὶ ξέφωτο", 52));
    gasPrint(strings.lenRunes("Kæmi ný öxi hér ykist þjófum nú bæði víl og ádrepa", 50));
    gasPrint(strings.lenRunes("いろはにほへとちりぬるをわかよたれそつねならむうゐのおくやまけふこえてあさきゆめみしゑひもせす", 47));
    gasPrint(strings.lenRunes("Съешь же ещё этих мягких французских булок да выпей чаю", 55));
    //strings.lenRunes.sendTransaction({from: ADDR0}, getGas);
}


// =============================================================================
// Helper functions

function deployAndRun(codeFile, testFunction, callback)
{
    let evm = fs.readFileSync(codeFile,'utf8').trim();
    Strings.new(
        {from: ADDR0, data: evm, gas: GAS},
        function(err, myContract){
            if(!err) {
                // NOTE: The callback will fire twice!
                // Once the contract has the transactionHash property set
                // and once its deployed on an address.
                if(myContract.address) {
                    debug(3, '[deployAndRun] Contract deployed to ' + myContract.address);
                    debug(1, '[deployAndRun] Starting benchmarks.');
                    var receipt = web3.eth.getTransactionReceipt(myContract.transactionHash);
                    debug(3, receipt.cumulativeGasUsed);
                    debug(2, '[deployAndRun] Calling ' + testFunction.name + '()');
                    console.log(codeFile);
                    testFunction(myContract);
                    callback();
                }
            } else {
                debug(1, '[deployAndRun] Error deployng contract.');
            }
        });
}

function gasPrint(foo)
{
    console.log(web3.toDecimal(web3.toHex(foo)));
}

function getGas(err, transaction)
{
    if(!err) {
        debug(2, '[getGas] ' + transaction);
        var receipt = web3.eth.getTransactionReceipt(transaction);
        debug(3, JSON.stringify(receipt));
        console.log(receipt.cumulativeGasUsed);
    }
}

function formatResult(err, result)
{
    if(!err) {
        debug(2, '[formatResult] ' + web3.toHex(result));
        var output = web3.toHex(result).slice(2);
        var address = 0;
        while(output.length) {
            console.log(('0000' + address.toString(16)).slice(-4)
                        + ' ' + output.substr(0,64));
            output = output.slice(64);
            address += 32;
        }
    }
}

// e.g. DEBUG=2 node strings.js
let debugLevel = parseInt(process.env.DEBUG);
function debug(level, message)
{
    if(debugLevel !== NaN && debugLevel >= level) {
        console.log('DEBUG[' + level + '] ' + message);
    }
}
