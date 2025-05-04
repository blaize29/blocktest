//This file should manage
//the chain itself (this.chain), pending transactions(this.transactionPool)
//adding new blocks, validating the chain, switching hash algorithms dynamically

const Block = require ('./block');
const Transaction = require ('../transaction/transaction');
const { DEFAULT_ALGORITHM, hashData } = require ('../util/crypto-util');

