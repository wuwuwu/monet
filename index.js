const Web3 = require('web3');

// todo: check if change to more efficient way to use web3
// todo: check websockets in heroku

// setup twilio environment
const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken, {lazyLoading: true, logLevel: 'debug'});

// const projectId = '7607e4c3895e4b3f8f85c1cfa7f481d8'

class TransactionChecker {
  web3;
  web3ws;
  account;
  subscription;



  constructor(projectId, account) {
    this.web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/7607e4c3895e4b3f8f85c1cfa7f481d8'));
    this.web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/7607e4c3895e4b3f8f85c1cfa7f481d8'));
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
      // console.log('Transaction: ', txHash);
      // set interval to execute every minute
      setTimeout(async () => {
        try {
          // let tx = await this.web3ws.eth.getTransaction(txHash);
          // console.log("tx: ", tx);
          this.web3ws.eth.getTransaction(txHash)
            .then((tx) => {
              if (tx != null) {
                if (tx.to != null && this.account == tx.to.toLowerCase()) {
                  // when the account belongs to our target, do shit
                  console.log({address: tx.from, value: this.web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date()});
                  const value = this.web3.utils.fromWei(tx.value, 'ETH');
                  const address = tx.from;
                  // Send Whatsapp todo: need to vwerify account with FB

                  // Send the sms
                  client.messages
                    .create({
                      body: `${address} did transaction for ${value}`,
                      from: '+19175254862',
                      to: '+529842053889'
                    })
                    .then(message => console.log(message.sid));
                }
              }
            })
        } catch (err) {
          console.error(err);
        }
      }, 7000)
    });
  }
}

let txChecker = new TransactionChecker('7607e4c3895e4b3f8f85c1cfa7f481d8', '0x19020bbb917199db899b64fdc43bd0e380c35a4d');
txChecker.subscribe('pendingTransactions');
txChecker.watchTransactions();