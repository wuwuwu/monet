const Web3 = require('web3');

const projectId = '7607e4c3895e4b3f8f85c1cfa7f481d8'

class TransactionChecker {
  web3;
  web3ws;
  account;
  subscription;



  constructor(projectId, account) {
    this.web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/' + projectId));
    this.web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/v3/' + projectId));
    this.account = account.toLowerCase();
  }

  subscribe(topic) {
    this.subscription = this.web3ws.eth.subscribe(topic, (err, res) => {
      if (err) console.error(err);
    });
  }

  watchTransactions() {
    console.log('Watching all pending transactions...');
    this.subscription.on('data', (txHash) => {
      setTimeout(async () => {
        try {
          let tx = await this.web3.eth.getTransaction(txHash);
          if (tx != null) {
            if (this.account == tx.to.toLowerCase()) {
              console.log({address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date()});
            }
          }
        } catch (err) {
          console.error(err);
        }
      }, 60000)
    });
  }
}

let txChecker = new TransactionChecker(process.env.INFURA_ID, '0x19020bbb917199db899b64fdc43bd0e380c35a4d');
txChecker.subscribe('pendingTransactions');
txChecker.watchTransactions();