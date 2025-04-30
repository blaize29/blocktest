//Import built-in crypto module for SHA-256 and SHA3-256
const crypto = require('crypto');

//Import external libraries for BLAKE2 and BLAKE3
const blake = require('blakejs');
const { hash: blake3Hash } = require('blake3');

//Define available hashing algorithms
const HASH_ALGORITHMS = {
    'SHA256': 'sha256',
    'SHA3-256': 'sha3-256',
    'BLAKE2b': 'blake2b512',    //crypto has blake2b512
    'BLAKE3': 'blake3'
};

//Defaulting hashing algorithm
const DEFAULT_ALGORITHM = 'SHA256';


class Block{
    constructor({timestamp, lastHash, data, nonce = 0, difficulty = 1, hashAlgo = DEFAULT_ALGORITHM})   {
        this.timestamp = timestamp;         //Time when block was created
        this.lastHash = lastHash;           //Hash of previous block
        this.data = data;                   //Transaction data
        this.nonce = nonce;                 //Random number used for mining
        this. difficulty = difficulty;      //(optional for experiment)
        this.hashAlgo = hashAlgo;           //Hashing algorithm used
        this.hash = this.calculateHash()    //Block's own hash
    }
};

//Method to calculate the block's hash based on current properties
calculateHash() {
    const input = `${this.timestamp}${this.lastHash}${JSON.stringify(this.data)}${this.nonce}${this.difficulty}`;

    switch (this.hashAlgo) {
        case 'SHA256':
            return crypto.createHash('sha256').update(input).digest('hex');

        case 'SHA3-256':
            return crypto.createHash('sha3-256').update(input).digest('hex');  
        
        case 'BLAKE2b':
            return crypto.createHash('blake2b512').update(input).digest('hex');

        case 'BLAKE3':
            return blake3Hash(Buffer.from(input)).toString('hex');

        default:
            throw new Error(`Unsupported hashing algorithm: ${this.hashAlgo}`);
    }
}

//Static method to create the Genesis block
static genesis(hashAlgo = DEFAULT_ALGORITHM) {
    return new this({
        timestamp: 'Genesis time',
        lastHash: '----',
        data: [],
        nonce: 0, 
        difficulty: 1,
        hashAlgo
    });
}

//Static method to mine a new block
static mineBlock({ lastBlock, data, hashAlgo = DEFAULT_ALGORITHM }) {
    let timestamp, nonce = 0; 
    const lastHash = lastBlock.Hash;
    let difficulty = lastBlock.difficulty; //Optional: Difficulty could be adjusted dynamically

    let hash; 

    do {
        timestamp = Date.now();
        nonce++; 
        hash = newBlock({ timestamp, lastHash, data, nonce, difficulty, hashAlgo }).calculateHash(); 
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty)); //Basic Proof of Work

    return new this({ timestamp, lastHash, data, nonce, difficulty, hash, hashAlgo });
}

module.exports = Block; 
