const { ethers } = require("ethers");
require('dotenv').config()

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURAID}`)

const main = async () => {
    const block = await provider.getBlockNumber()

    console.log(`\nBlock Number: ${block}\n`)

    const blockInfo = await provider.getBlock(block)

    console.log(blockInfo)

    const { transactions } = await provider.getBlockWithTransactions(block)

    console.log(`\nLogging first transaction in block:\n`)
    console.log(transactions[0])
}

main()