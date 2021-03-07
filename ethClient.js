'use strict'

module.exports = Web3 => {
  const provider = new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/7607e4c3895e4b3f8f85c1cfa7f481d8')
  return new Web3(provider)
}