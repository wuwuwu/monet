const Web3 = require('web3');

class TransactionChecker {
    web3;
    account;

    constructor(projectId, account) {
        // todo: change hardcoded values for readings from .dev
        this.web3 = new Web3(Web3.givenProvider || 'wss://mainnet.infura.io/ws/v3/7607e4c3895e4b3f8f85c1cfa7f481d8');
        this.account = account.toLowerCase();
    }

    async checkBlock() {
        // get the latest block number
        const blockNumber = await this.web3.eth.getBlockNumber()
        const block = await this.web3.eth.getBlock(blockNumber)
        console.log('Searching block ' + blockNumber);
        // console.log('This is the block: ', block)


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