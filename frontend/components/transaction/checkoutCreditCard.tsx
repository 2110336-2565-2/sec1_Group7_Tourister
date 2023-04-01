import { useState, useEffect } from "react";
import { TopUpTransactionDataInterface } from "@/interfaces/transaction/TopUpTransactionDataInterface";
import { chargeAndTopUpCoins } from "@/services/topupService";
import Script from "react-load-script";
import { Button } from "@mui/material";
import { COLOR } from "@/theme/globalTheme";

var PUBLIC_KEY = "pkey_test_5vai0hszx1or7r9s9gf";

function Checkout() {
  let OmiseCard: any;
  const [omiseToken, setOmiseToken] = useState("");
  const [omiseSource, setOmiseSource] = useState("");
  const [topup, setTopup] = useState<TopUpTransactionDataInterface>({
    omiseToken: "",
    omiseSource: "",
    chargeAmount: 0,
    coins: 0,
  });
  const handleScriptLoad = () => {
    OmiseCard = window.OmiseCard;
    // console.log(window.OmiseCard);
    // general info
    OmiseCard.configure({
      PUBLIC_KEY,
      frameLabel: "Trip Payment",
      submitLabel: "PAY NOW",
      currency: "THB",
    });
  };
  const creditCardConfigure = () => {
    OmiseCard.configure({
      defaultPaymentMethod: "credit_card",
      otherPaymentMethods: [],
    });
    OmiseCard.configureButton("#credit-card");
    OmiseCard.attach();
  };

  const omiseHandler = () => {
    // const { cart, createCreditCardCharge } = this.props;
    OmiseCard.open({
      frameDescription: "Invoice #3847",
      amount: 9999,
      onCreateTokenSuccess: (token: any) => {
        console.log(token);
      },
      onFormClosed: () => {},
    });
  };

  const handleClick = async (event: any) => {
    // event.preventDefault();
    console.log("we");
    creditCardConfigure();
    console.log("we");
    omiseHandler();
  };

  return (
    <div>
        <Script
          url="https://cdn.omise.co/omise.js"
          onLoad={handleScriptLoad}
        />

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
