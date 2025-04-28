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