import { useState } from "react";
import './Balance.css';

export default function Balance(props) {
    const { accounts = { balance: 1000, saving: 1000 } } = props;
    const [message, setMessage] = useState('');
    const [accountValue, setAccountValue] = useState(accounts);
    const [transferValue, setTransferValue] = useState(0);

    const checkCurrentBalance = (balance, saving) => {
        if (balance <= 0 || saving <= 0) {
            setMessage('Blance values connot less than zero')
            return false;
        }

        if (transferValue > 1000) {
            setMessage('You cannot send more than 1000$ money in a day')
            return false;
        }

        return true;
    }

    const sendBalance = () => {
        const tempBalanceValue = accountValue.balance + 100;
        const tempSavingBalanceValue = accountValue.saving - 100;
        setMessage('')
        setTransferValue(transferValue + 100)

        if (checkCurrentBalance(tempBalanceValue, tempSavingBalanceValue)) {
            setAccountValue({ balance: tempBalanceValue, saving: tempSavingBalanceValue })
        }
    }

    const sendSavingBalance = () => {
        const tempBalanceValue = accountValue.balance - 100;
        const tempSavingBalanceValue = accountValue.saving + 100;
        setMessage('')
        setTransferValue(transferValue + -100)
        if (checkCurrentBalance(tempBalanceValue, tempSavingBalanceValue)) {
            setAccountValue({ balance: tempBalanceValue, saving: tempSavingBalanceValue })
        }
    }

    return (
        <div className="Balance-header">
            <div className="Row">
                <div className="Balance-box">
                    <h2>You Account Balance</h2>
                    <h1 id="balance-value-text">{accountValue.balance}$</h1>
                    <button id="balance-button" className="Balance-button" onClick={sendBalance}>Send 100$</button>
                </div>
                <div className="Balance-box">
                    <h2>You Account Saving Balance</h2>
                    <h1 id="saving-value-text">{accountValue.saving}$</h1>
                    <button id="saving-button" className="Balance-button" onClick={sendSavingBalance}>Send 100$</button>
                </div>
            </div>
            {message && <div className="Balance-message">
                <span>{message}</span>
            </div>}
        </div>
    )
}