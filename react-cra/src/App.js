import { useEffect, useState } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [userMoney, setUserMoney] = useState(0);
  const [transferredValue, setTransferredValue] = useState(0);

  const onChangeCoin = (e) => {
    setSelectedCoin(JSON.parse(e.target.value));
    transferredValue &&
      setTransferredValue(
        userMoney / JSON.parse(e.target.value).quotes.USD.price
      );
  };
  const userMoneyHandler = (e) => setUserMoney(e.target.value);
  const onClickTransfer = (e) => {
    e.preventDefault();
    setTransferredValue(userMoney / selectedCoin.quotes.USD.price);
  };
  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers')
      .then((res) => res.json())
      .then((json) => {
        setCoins(json);
        setIsLoading(false);
        setSelectedCoin(json[0]);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {isLoading ? '' : `(${coins.length})`}</h1>
      {isLoading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <h3>Transfer USD to Coin!</h3>
          <select onChange={onChangeCoin}>
            {coins.map((coin) => (
              <option value={JSON.stringify(coin)} key={coin.id}>
                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price}
              </option>
            ))}
          </select>
          <form>
            <input
              type="number"
              placeholder="input your USD"
              onChange={userMoneyHandler}
              value={userMoney}
            />
            <button onClick={onClickTransfer}>Let's transfer!</button>
          </form>
          {!!transferredValue && (
            <span>
              You can buy {transferredValue} {selectedCoin.name}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
