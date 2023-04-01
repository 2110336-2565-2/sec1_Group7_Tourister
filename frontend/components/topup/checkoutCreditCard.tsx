import { useState, useEffect, Component } from "react";
import { TopUpTransactionDataInterface } from "@/interfaces/transaction/TopUpTransactionDataInterface";
import { chargeAndTopUpCoins } from "@/services/topupService";
import Script from "react-load-script";
import { Button } from "@mui/material";
import { COLOR } from "@/theme/globalTheme";

var PUBLIC_KEY = "pkey_test_5vazimccpm3mze85kj6";

function Checkout(props: any) {
  // console.log(PUBLIC_KEY);
  let OmiseCard: any;
  const [omiseToken, setOmiseToken] = useState("");
  const [omiseSource, setOmiseSource] = useState("");
  const [chargeAmount, setChargeAmount] = useState(0);
  var inputValue = 100000;
  const [topup, setTopup] = useState<TopUpTransactionDataInterface>({
    omiseToken: "",
    omiseSource: "",
    chargeAmount: 0,
    coins: 0,
  });

  const createCreditCardCharge = async (
    transData: TopUpTransactionDataInterface
  ) => {
    console.log("res");
    const res = await chargeAndTopUpCoins(transData);
    console.log("res");
    console.log(res);
  };

  const handleScriptLoad = () => {
    OmiseCard = window.OmiseCard;
    // console.log(window.OmiseCard);
    // general info
    OmiseCard.configure({
      publicKey: PUBLIC_KEY,
      frameLabel: "Trip Payment",
      submitLabel: "PAY NOW",
      currency: "THB",
    });
  };
  const creditCardConfigure = async () => {
    OmiseCard.configure({
      defaultPaymentMethod: "credit_card",
      otherPaymentMethods: [],
    });
    OmiseCard.configureButton("#credit-card");
    OmiseCard.attach();
  };

  const omiseHandler = () => {
    // const { createCreditCardCharge } = props;
    console.log(inputValue);
    OmiseCard.open({
      frameDescription: "Invoice #3847",
      amount: inputValue,
      onCreateTokenSuccess: (token: any) => {
        console.log(token);
        let Token = "";
        let Source = "";
        if (token.startsWith("tokn_")) {
          Token = token;
        } else {
          Source = token;
        }
        setTopup({
          omiseToken: Token,
          omiseSource: Source,
          chargeAmount: inputValue,
          coins: inputValue,
        });
        createCreditCardCharge(topup);
      },
      onFormClosed: () => {},
    });
  };

  const handleClick = async (event: any) => {
    // event.preventDefault();
    creditCardConfigure();
    omiseHandler();
  };

  async function handleInputChange(e: any) {
    setChargeAmount(e.target.value);
  }
  return (
    <div>
      <Script url="https://cdn.omise.co/omise.js" onLoad={handleScriptLoad} />
      {/* <input type="text" value={chargeAmount} onChange={handleInputChange} /> */}

      {/* <button onClick={handleInputChange}>Submit</button> */}
      <form>
        <button
          id="credit-card"
          className="btn"
          type="button"
          // disabled={cart.amount === 0}
          onClick={handleClick}
        >
          Pay with Credit Card
        </button>
      </form>
    </div>
  );
}

export default Checkout;
