import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();
import ERC20_ABI from "./ABI/ERC20_ABI.json" assert { type: "json" };
import AMBIENT_ABI from "./ABI/AMBIENT_SCROLL_ABI.json" assert { type: "json" };

const myAddress = '0xA161FB1d3c5B5914561ddf5e70952efBcb8a7af9'
const addressAmbient = '0xaaaaAAAACB71BF2C8CaE522EA5fa455571A74106'
const addressUDSC = '0x06efdbff2a14a7c8e15944d1f4a48f9f95f663a4'
const addressUSDT = '0xf55BEC9cafDbE8730f096Aa55dad6D22d44099Df'

const main = async () => {
  // PROVIDER
  const provider = new ethers.providers.JsonRpcProvider("https://rpc.scroll.io")
  const instanceWallet = new ethers.Wallet(process.env.PRIVATE_KEY_THIRD_METAMASK, provider)

  // CONTRACTS
  const contractUSDC = new ethers.Contract(addressUDSC, ERC20_ABI, provider)
  const contractUSDT = new ethers.Contract(addressUSDT, ERC20_ABI, provider)
  const routerAmbientContract = new ethers.Contract(addressAmbient, AMBIENT_ABI, instanceWallet);

  const tx = await routerAmbientContract.swap(
    addressUDSC, // Address of the token to sell
    addressUSDT, // Address of the token to buy
    ethers.utils.parseUnits('420', 'wei'), // Gas limit
    true, // isBuy (true if you want to buy, false if you want to sell)
    true, // inBaseQty (true if the amount is in base token, false if the amount is in quote token)
    '1000000', // qty (amount of tokens to buy or sell)
    0, // tip (tip amount in wei)
    '21267430153580247136652501917186561137', // limitPrice (price limit in wei)
    '997389', // minOut (minimum amount of tokens to buy or sell)
    0, // reserveFlags (flags to specify which reserves to use)
  )
  console.log('tx : ', tx)

  const receipt = await tx.wait();
  console.log('Transaction receipt', receipt);


  // // Préparer les paramètres de la transaction
  // const amountIn = ethers.utils.parseUnits('1.0', 18); // 1 Token A, en supposant qu'il a 18 décimales
  // const amountOutMin = ethers.utils.parseUnits('0.5', 18); // Montant minimal de Token B que vous êtes prêt à accepter
  // const path = [contractUSDC, contractUSDT]; // Chemin du swap
  // const to = myAddress; // Votre adresse de portefeuille
  // const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // Timestamp de la deadline après laquelle la transaction ne sera plus valide

  // // Créer la transaction
  // const tx = await routerAmbientContract.swapExactTokensForTokens(
  //   amountIn,
  //   amountOutMin,
  //   path,
  //   to,
  //   deadline,
  //   { gasLimit: '1000000' } // Définir une limite de gaz appropriée
  // );

  // Signer et envoyer la transaction
  // const signedTx = await signer.sendTransaction(tx);
  // console.log('signedTx : ', signedTx);
  // const receipt = await signedTx.wait();

  // console.log('Transaction receipt', receipt);



  // const name = await contractUSDC.name()
  // const symbol = await contractUSDC.symbol()
  // const balance = await contractUSDC.balanceOf(myAddress)

  // console.log(`\nReading from ${myAddress}`)
  // console.log(`Name: ${name}`)
  // console.log(`Symbol: ${symbol}`)
  // console.log(`Balance Returned: ${balance / 1000000} USDC`)

  // const name2 = await contractUSDT.name()
  // const symbol2 = await contractUSDT.symbol()
  // const balance2 = await contractUSDT.balanceOf(addressMetamask)

  // console.log(`\nReading from ${addressMetamask}`)
  // console.log(`Name: ${name2}`)
  // console.log(`Symbol: ${symbol2}`)
  // console.log(`Balance Returned: ${balance2 / 1000000} USDT`)

  // console.log('private key : ', process.env.PRIVATE_KEY_THIRD_METAMASK)
}

main()
