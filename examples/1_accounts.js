require('dotenv').config()

const { ethers } = require("ethers");

console.log('INFURAID:', process.env.INFURAID)

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURAID}`)

const address = '0x51C09bEED2479cB2C03F2D8c6c8f340f963572f5'

const main = async () => {
    const balance = await provider.getBalance(address)
    console.log(`\nETH Balance of ${address} --> ${ethers.utils.formatEther(balance)} ETH\n`)
}

main()

