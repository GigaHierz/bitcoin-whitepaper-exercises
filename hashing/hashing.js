"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
const poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

let Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});




// TODO: insert each line into blockchain
function createBlock(poems) {
	let i = 0;

	poems.map((line) => {
		let prevHash = Blockchain.blocks[i].hash
		Blockchain.blocks.push({
			prevHash,
			index: ++i,
			hash: "",
			data: line,
			timestamp: Date.now(),
		});
		Blockchain.blocks[i].hash = blockHash(
			Blockchain.blocks[i]
		);
	});

};

// remove the first line of the poem and add it to the genisis block.
Blockchain.blocks[0].data = poem.shift(1);
createBlock(poem);


console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);

function verifyChain(blockchain) {
	return blockchain.blocks.map((block) => verifyBlock(block)).filter((el) => el === false).length === 0;
}


function verifyBlock(bl) {
	return bl.index === 0 ?
		bl.hash === "000000"
		: bl.data !== '' && bl.prevHash === Blockchain.blocks[bl.index - 1].hash && bl.index >= 0 && bl.hash === blockHash(bl);
}


// **********************************

function blockHash(bl) {
	return crypto.createHash("sha256").update(
		bl.prevHash + bl.index + bl.data + bl.timestamp
		// TODO: use block data to calculate hash
	).digest("hex");
}
