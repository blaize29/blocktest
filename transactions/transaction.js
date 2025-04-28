const {v4: uuidv4} = require('uuid');

class Transaction {
    constructor({sender, recipient, amount}) {
        this.id = uuidv4();     //Unique ID for each transaction
        this.sender = sender;
        this.recipient = recipient;
        this.amount = amount;
    }
}