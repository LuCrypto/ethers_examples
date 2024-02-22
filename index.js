require('dotenv').config()

const { ethers } = require("ethers");

const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${process.env.INFURAID}`)

// My address of first metamask
const address = '0x51C09bEED2479cB2C03F2D8c6c8f340f963572f5'

const main = async () => {
  const balance = await provider.getBalance(address)
  console.log(`\nETH Balance of ${address} --> ${ethers.utils.formatEther(balance)} ETH\n`)

  const network = await provider.getNetwork()
  console.log(`network: ${JSON.stringify(network, null, 2)}`)

  const countTransaction = await provider.getTransactionCount(address)
  console.log(`countTransaction : ${countTransaction}`)

  const getGasPrice = await provider.getGasPrice()
  console.log(`getGasPrice : ${ethers.utils.formatUnits(getGasPrice, 'gwei')} gwei`)

  const getFeeData = await provider.getFeeData()

  // display the fee data in gwei
  const obj = {
    gasFee: ethers.utils.formatUnits(getFeeData.gasPrice, 'gwei'),
    maxPriorityFeePerGas: ethers.utils.formatUnits(getFeeData.maxPriorityFeePerGas, 'gwei'),
    maxFeePerGas: ethers.utils.formatUnits(getFeeData.maxFeePerGas, 'gwei')
  }

  console.log(`getFeeData : ${JSON.stringify(obj, null, 2)}`)

}

main()

