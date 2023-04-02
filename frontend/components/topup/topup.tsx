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
  { label: "2000", value: 2000},
  { label: "3000", value: 3000 },
];

const TopUp: React.FC<TopUpProps> = ({ initialAmount }) => {
  const [amount, setAmount] = useState(initialAmount);
  const router = useRouter();

  const handleValueClick = (value: number) => {
    setAmount(value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(event.target.value));
  };

  const handleTopUp = () => {
    router.push({
      pathname: "./topup/checkoutCreditCard",
      query: { amount },
    });
  };


  return (
    <div>
      <h1>Coin Top Up</h1>
      <div>Top up value (THB)</div>
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
      <div style={{ margin: "0.0rem", backgroundColor: COLOR.secondary }}>
        {amount !== undefined && (
          <p style={{ marginTop: "10px" }}>
            You have selected a top-up amount of THB {amount.toFixed(2)}
          </p>
        )}
      </div>
      <div>
        {/* <button onClick={handleTopUp}>Pay Now</button> */}
        <Transaction amount={amount} />
      </div>
    </div>
  );
};

export default TopUp;
