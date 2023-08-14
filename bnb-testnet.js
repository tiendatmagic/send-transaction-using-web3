require('dotenv').config();
const Web3 = require('web3');
const BigNumber = require('bignumber.js');

const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");

const PRIVATE_KEY = process.env.PRIVATE_KEY; // Thay YOUR_PRIVATE_KEY bằng private key thực tế
const FROM_ADDRESS = process.env.FROM_ADDRESS; // Thay YOUR_FROM_ADDRESS bằng địa chỉ ví nguồn
const TO_ADDRESS = process.env.TO_ADDRESS; // Thay TO_ADDRESS bằng địa chỉ ví đích

async function bsc_transaction() {
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 21000; // Gas limit cho một giao dịch chuẩn

  const balanceInWei = await web3.eth.getBalance(FROM_ADDRESS);

  // Tạo đối tượng BigNumber cho giá gas
  const gasPriceBigNumber = new BigNumber(gasPrice);

  // Tính toán số dư còn lại sau khi trừ phí gas
  const remainingBalanceInWei = new BigNumber(balanceInWei).minus(gasPriceBigNumber.times(gasLimit));

  // Kiểm tra xem có đủ số dư để thực hiện giao dịch không
  if (remainingBalanceInWei.lt(0)) {
    console.log("Không đủ số dư để thực hiện giao dịch.");
    return;
  }

  var SignedTransaction = await web3.eth.accounts.signTransaction({
    to: TO_ADDRESS,
    value: remainingBalanceInWei.toString(), // Sử dụng số dư còn lại
    gas: gasLimit,
    gasPrice: gasPrice.toString()
  }, PRIVATE_KEY);

  web3.eth.sendSignedTransaction(SignedTransaction.rawTransaction).then((receipt) => {
    console.log(receipt);
  });
}

bsc_transaction();
