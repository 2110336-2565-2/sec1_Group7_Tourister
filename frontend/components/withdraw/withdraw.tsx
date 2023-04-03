import React, { useState } from "react";
import { useRouter } from "next/router";
import { COLOR } from "@/theme/globalTheme";
import { userWithdrawCoins } from "@/services/withdrawService";
import Link from "next/link";
interface TopUpProps {
  initialAmount: number;
}

const topUpValues: TopUpValue[] = [
  { label: "300", value: 300 },
  { label: "500", value: 500 },
  { label: "700", value: 700 },
  { label: "1000", value: 1000 },
  { label: "2000", value: 2000 },
  { label: "3000", value: 3000 },
];

const TopUp: React.FC<TopUpProps> = ({ initialAmount }) => {
  const [amount, setAmount] = useState(initialAmount);
  const [showPopup, setShowPopup] = useState(false);

  const router = useRouter();

  const handleValueClick = (value: number) => {
    setAmount(value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.value === "" ||
      (Number(event.target.value) >= 0 && Number(event.target.value) <= 1000000)
    ) {
      setAmount(parseInt(event.target.value));
    } else {
      alert("Input value must be between ฿100 and ฿1000000.");
    }
  };

  const handleWithdraw = async () => {
    try {
      const res = await userWithdrawCoins({ amount: amount.toString() });
      console.log(res);
      setShowPopup(true);
    } catch (err) {
      console.log(err);
    }
  };
  const [dateTime, setDateTime] = useState(new Date());
  const formattedDateTime = dateTime.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <div>
      <h1>Coin Withdraw</h1>
      <div>Withdraw value (THB)</div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "10px",
        }}
      >
        {topUpValues.map(({ label, value }) => (
          <button
            key={value}
            style={{
              padding: "10px",
              border: "1px solid gray",
              borderRadius: "5px",
              backgroundColor: amount === value ? "lightblue" : "white",
            }}
            onClick={() => handleValueClick(value)}
          >
            {label}
          </button>
        ))}
      </div>
      Input Amount (THB) :
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        placeholder="Enter custom amount"
        style={{ marginTop: "10px" }}
      />
      <div>
        {" "}
        Bank account number:
        <input
          type="string"
          value={""}
          placeholder="xxx-x-x0707-x"
          style={{ marginTop: "10px" }}
        />
      </div>
      <div>
        {" "}
        Bank:
        <input
          type="string"
          value={""}
          placeholder="e.g. SCB"
          style={{ marginTop: "10px" }}
        />
      </div>
      <div style={{ margin: "0.0rem", backgroundColor: COLOR.secondary }}>
        {amount !== undefined && (
          <p style={{ marginTop: "10px" }}>
            You have selected a withdraw amount of THB {amount.toFixed(2)}
          </p>
        )}
      </div>
      <button
        id="credit-card"
        className="btn"
        type="button"
        disabled={amount === 0}
        onClick={handleWithdraw}
      >
        Withdraw
      </button>
      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <h2>Withdraw successful</h2>
            <div>Withdraw {amount} coins</div>
            <div>Received {amount} THB in your Bank Account</div>
            <div>Withdraw Method: Internet Banking</div>
            <div>Created On: {formattedDateTime}</div>
            <Link href={"./manage_account"}>
              <button onClick={handleClosePopup}>
                Go to manage account page
              </button>
            </Link>
          </div>
        </div>
      )}
      <style jsx>{`
        .popup-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .popup {
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default TopUp;
