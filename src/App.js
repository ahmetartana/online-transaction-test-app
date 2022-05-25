import './App.css';
import Balance from './components/business/balance/Balance';

const accounts = {
  balance: 1300,
  saving: 2300
}

function App() {
  return (
    <div className="App">
      <Balance accounts={accounts} />
    </div>
  );
}

export default App;
