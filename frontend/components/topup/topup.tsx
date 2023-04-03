import React, { useState } from "react";
import { useRouter } from "next/router";
import { COLOR } from "@/theme/globalTheme";
import Transaction from "@/components/topup/checkoutCreditCard/checkoutCreditCard";

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
    if (event.target.value === '' || (Number(event.target.value) >= 100 && Number(event.target.value) <= 1000000)) {
      setAmount(parseInt(event.target.value));
    } else {
      alert('Input value must be between ฿100 and ฿1000000.');
    }
  };



  return (
    <div>
      <h1
        style={{
          alignItems: "center",
          textAlign: "center",
          margin: "auto",
          alignSelf: "center",
          paddingBottom: "20px",
          paddingTop: "45px",
          fontWeight: "bold",
          // backgroundColor: COLOR.background,
        }}
      >
        Coin Top Up
      </h1>
      <div
        style={{
          alignItems: "center",
          padding: "10px 20px 10px 20px",
          margin: "auto",
          alignSelf: "center",
        }}
      >
        Top up value (THB)
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "10px",
          padding: "10px 20px 10px 20px",
        }}
      >
        {topUpValues.map(({ label, value }) => (
          <button
            key={value}
            style={{
              fontSize: 17,
              padding: "10px",
              border: "1px solid lightgray",
              borderRadius: "5px",
              backgroundColor: "white",

              // backgroundColor: amount === value ? COLOR.orange : "white",
              borderColor: amount === value ? COLOR.orange : "lightgray",
              fontWeight: amount === value ? "bold" : "normal",
              color: amount === value ? COLOR.orange : "black",
            }}
            onClick={() => handleValueClick(value)}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        style={{
          alignItems: "center",
          padding: "10px 20px 10px 20px",
          margin: "auto",
          alignSelf: "center",
        }}
      >
      Input Amount (THB) :
      </div>
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        placeholder="Enter custom amount"
        style={{ 
          width: 350,
          margin: "auto", 
          color: COLOR.orange,
          padding: "10px 10px 10px 10px", 
          transform: "translateX(20px)",
          border: "1px solid grey",
          fontSize: 17,
          fontWeight: "bold",
        }}
      />
      <div style={{ 
        margin: "0.0rem", 
        padding: "10px 20px 10px 20px", 
        // backgroundColor: COLOR.orange,
      }}>
        {amount !== undefined && (
          <p style={{ marginTop: "10px" }}>
            You have selected a top-up amount of 
            THB {amount.toFixed(2)}
          </p>
        )}
      </div>
      <div>
        <Transaction amount={amount} />
      </div>

    </div>
  );
};

export default TopUp;
