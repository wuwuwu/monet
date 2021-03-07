var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'wss://mainnet.infura.io/ws/v3/7607e4c3895e4b3f8f85c1cfa7f481d8');

// original
// const account = '0x19020bbb917199db899b64fdc43bd0e380c35a4d'
// last
const account = '0xe07b86dfe1cf42d51909fd46e34b2d1a6c93700c'


async function retrieveAccount() {
  console.log('starting...')
  const blockNumber = await web3.eth.getBlockNumber()
  console.log('Block number: ',blockNumber);
  const block = await web3.eth.getBlock(11992801)
  // console.log('Transactions: ', block.transactions);
  if (block != null && block.transactions != null) {
    // txHash -> identifier of each transaction
    for (let txHash of block.transactions) {
      // for each transaction, check if they belong to our target account
      let tx = await web3.eth.getTransaction(txHash);
      if (account == tx.to.toLowerCase()) {
        console.log("----> Bingo!")
        console.log('Transaction log on block: ' + blockNumber)
        console.log({address: tx.from, value: web3.utils.fromWei(tx.value, 'ether'), timestamp: new Date() })
        // Here we operate with the transaction -> send sms
      }
    }
  }
}

retrieveAccount()

// const block = web3.eth.getBlock(blockNumber)
// console.log('Searching block ' + number);
// web3.eth.getAccounts(console.log);


// Done, Get the number of the last block
// Done, Return the block belonging to that number
// todo: Check if the block is null or has no transactions
// todo: Review if there are transactions for the account
// todo: of there is any, broadcast it