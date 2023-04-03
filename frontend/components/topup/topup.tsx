import React, { useState } from "react";
import { useRouter } from "next/router";
import { COLOR } from "@/theme/globalTheme";
import Transaction from "@/components/topup/checkoutCreditCard/checkoutCreditCard";
import { StyledInput, PrimaryButton } from '@/css/styling'

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
          paddingBottom: "30px",
          paddingTop: "45px",
          fontWeight: "bold",
          color: "white",
          // backgroundColor: COLOR.background,
        }}
      >
        Coin Top Up
      </h1>
      <div 
        style={{
          borderColor: "transparent",
          backgroundColor: "white",
          borderTopLeftRadius: "20px",
          borderTopRightRadius: "20px",
          paddingTop: "20px",
          // borderBottomColor: "transparent"
          // border: "none"
        }}
      >
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

                // backgroundColor: amount === value ? COLOR.primary : "white",
                borderColor: amount === value ? COLOR.primary : "lightgray",
                fontWeight: amount === value ? "bold" : "normal",
                color: amount === value ? COLOR.primary : "black",
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
        <StyledInput
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter custom amount"
        />
        <div style={{ 
          margin: "0.0rem", 
          padding: "10px 20px 10px 20px", 
          // backgroundColor: COLOR.primary,
        }}>
          {amount !== undefined && (
            <div>
            <p style={{ 
              // margin: "auto"
              marginTop: "10px" 
            }}>
              You have selected a top-up amount of 
            </p>
            <p
              style={{
                margin: "auto",
                color: COLOR.primary,
                fontSize: 25,
                fontWeight: "bold",
                transform: "translateY(-10px)"
              }}
            >
              THB {amount.toFixed(2)}
            </p>
            </div>
          )}
        </div>
        <div style={{
          alignSelf: "center",
          textAlign: "center",
          padding: "10px",
        }}
        >
          {/* <PrimaryButton> */}
            <Transaction amount={amount} />
          {/* </PrimaryButton> */}
        </div>

      </div>
    </div>
  );
};

export default TopUp;
