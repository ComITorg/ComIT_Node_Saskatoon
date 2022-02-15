import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config()


const monies = [
  { currency: 'USD', amount: 210 },
  { currency: 'EUR', amount: 105 },
  { currency: 'CAD', amount: 500 }
];

const convertMoney = async (toCurrency) => {
  const response = await axios.get(`http://data.fixer.io/api/latest?access_key=${process.env.FIXER_IO_API_KEY}&symbols=${toCurrency}&format=1`);
  return response.data.rates;
};

const calculate = async (monies, currency) => {
  let result = 0;
  const calculcateResult =  monies.map(async(money) => {
    if (money.currency !== currency) {
      const exchangeRate = await convertMoney(money.currency);
      result += (1 / exchangeRate[money.currency]) * money.amount;
    } else {
      result += money.amount
    }
  })

  await Promise.all(calculcateResult);
  return result;
}

console.log(await calculate(monies, 'EUR'));