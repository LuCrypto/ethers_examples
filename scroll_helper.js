// This function will send ETH to an address
const sendETHToAddress = async (instanceWallet, address, amount = '0.001') => {
  // TRANSACTION
  const tx = {
    to: address,
    value: ethers.utils.parseEther(amount),
  }

  await instanceWallet.signTransaction(tx)
  console.log('tx : ', await instanceWallet.sendTransaction(tx));
}
