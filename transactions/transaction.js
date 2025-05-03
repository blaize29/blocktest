const {v4: uuidv4} = require('uuid');

class Transaction {
    constructor({sender, recipient, amount}) {
        this.id = uuidv4();              //Unique ID for each transaction
        this.timestamp = Date.now();     //Timestamp when transaction is created
        this.sender = sender;
        this.recipient = recipient;
        this.amount = amount;
    }
}

module.exports = Transaction;