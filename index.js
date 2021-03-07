'use strict'

const Web3 = require('web3')

const BuildTransactionChecker = require('./transactionChecker')
const CreateClient = require('./ethClient')

const web3 = CreateClient(Web3)
const checkBlock = BuildTransactionChecker(web3)

setInterval(() => {
  checkBlock()
}, 7000)


// Goals
// monitor a certain wallet: 0x19020bbb917199db899b64fdc43bd0e380c35a4d
// check transactions and value
// send a message to slack or whatsapp with every transaction