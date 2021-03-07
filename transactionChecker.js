const Web3 = require('web3');
const dotenv = require('dotenv').config();
var request = require('request');

class TransactionChecker {
    web3;
    account;

    constructor(projectId, account) {
        this.web3 = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/' + projectId)
        this.account = account.toLowerCase();
    }

    async checkBlock() {
        let block = await Web3.providers.HttpProvider('https://mainnet.infura.io/v3/7607e4c3895e4b3f8f85c1cfa7f481d8').eth.getBlockNumber();
        let number = block.number;

        console.log('Searching block ' + number);

        if (block != null && block.transactions != null) {
            for (let txHash of block.transactions) {
                let tx = await this.web3.eth.getTransaction(txHash);
                if (this.account == tx.to.toLowerCase()) {
                    console.log('Transaction log on block: ' + number)
                    console.log({address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date() })
                }
            }
        }
    }
}

let txChecker = new TransactionChecker('7607e4c3895e4b3f8f85c1cfa7f481d8', '0x19020bbb917199db899b64fdc43bd0e380c35a4d')
txChecker.checkBlock();