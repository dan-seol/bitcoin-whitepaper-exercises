"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

//Part 1
function createBlock(data) {
	let length = Blockchain.blocks.length;
	let prevBlock = Blockchain.blocks[length-1];

	let block = {
		index: length,
		prevHash: prevBlock.hash,
		data: data,
		timestamp: Date.now()
	};

	block.hash = blockHash(block);
	return block;
}

/**
 * ## Part 2

Define a `verifyChain(..)` function that checks all blocks in the chain to ensure the chain is valid, and returns `true` or `false` accordingly. It may be useful to define a `verifyBlock(..)` function that can be called for each block object.

Each block should be checked for the following:

* `data` must be non-empty
* for the genesis block only, the hash must be `"000000"`
* `prevHash` must be non-empty
* `index` must be an integer >= `0`
* the `hash` must match what recomputing the hash with `blockHash(..)` produces

In addition to verifying a block, the linkage between one block and its previous block must be checked, throughout the whole chain. That is, the block at position 4 needs to have a `prevHash` equal to the `hash` of the block at position `3`, and so on.

Print out verification that the blockchain is valid after having added all the poem text as blocks.

 */
//Part 2
function verifyBlock(prevBlock, block) {
	if ((prevBlock !== null) 
		&& (!!block.data) 
		&& (!!block.prevHash) 
		&& (block.index >= 0) 
		&& (block.hash === blockHash(block)) 
		&& (prevBlock.hash === block.prevHash)) {
		return block;
	} 

	return null;
}

function verifyChain(chain) {
	let blocks = chain.blocks;
	let genesisBlock = blocks[0];

	return genesisBlock.index === 0 && genesisBlock.hash === "000000" && !!blocks.reduce((prev, curr) => verifyBlock(prev, curr));
}

// TODO: insert each line into blockchain
for (let line of poem) {
	Blockchain.blocks.push(createBlock(line));
}

console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);

// **********************************

function blockHash(bl) {
	return crypto.createHash("sha256").update(
		// TODO: use block data to calculate hash
		JSON.stringify(bl, ["index", "prevHash", "data", "timestamp"])
	).digest("hex");
}
