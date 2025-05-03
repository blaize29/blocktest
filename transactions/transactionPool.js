//Transaction pool to manage multiple pending transactions

class TransactionPool {
    constructor() {
        //Store transactions in a Map with transaction ID as the key
        this.transactions = new Map();
    }
        //Adds a new transaction to the pool
    addTransaction(transaction) {
        this.transactions.set(transaction.id, transaction);
    }

        //Checks if a transaction from the same sender already exists
        //Prevents double-spending
    hasTrasactionsFrom(sender) {
        for (const tx of this.transactions.values()) {
            if (tx.sender === sender) {
                return true;
            }
        }
        return false; 
    }

        //Retrieves all transactions as an array
        //Useful for including them in a new block
        //returns {Transaction[]}
        getTransactions() {
            return Array.from(this.transactions.value());
        }

        //Clears the pool (e.g. after transactions are added to a new block)
        clear() {
            this.transactions.clear(); 
        }

        //Removes specific transactions from the pool (after mining)
        //array of transaction IDs that were included in a block
        removeTransactions(confirmedIds) {
            for (const id of confirmedIds) {
                this.transactions.delete(id);
            }
        }
    }
 

module.exports = TransactionPool;