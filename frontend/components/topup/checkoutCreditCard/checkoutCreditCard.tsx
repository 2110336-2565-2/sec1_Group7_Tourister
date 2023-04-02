import { useState, useEffect, Component } from "react";
import { TopUpTransactionDataInterface } from "@/interfaces/transaction/TopUpTransactionDataInterface";
import { chargeAndTopUpCoins } from "@/services/topupService";
import Script from "react-load-script";
import { Button } from "@mui/material";
import { COLOR } from "@/theme/globalTheme";
import { useRouter } from "next/router";
import appConfig from "@/configs/appConfig";

// appConfig.OMISE_PUBLIC_KEY;
var PUBLIC_KEY = appConfig.OMISE_PUBLIC_KEY;
let OmiseCard: any;

function Checkout(props: any) {
  const [topup, setTopup] = useState<TopUpTransactionDataInterface>({
    chargeAmount: 0,
    coins: 0,
    omiseSource: "",
    omiseToken: "",
  });

  // const router = useRouter();
  // let { amount } = router.query;
  // const parsedAmount = parseInt(amount as string, 10) * 100;

  const handleScriptLoad = async () => {
    OmiseCard = window.OmiseCard;
    // console.log(window.OmiseCard);
    // general info
    OmiseCard.configure({
      publicKey: PUBLIC_KEY,
      frameLabel: "TopUp Payment",
      submitLabel: "PAY NOW",
      currency: "thb",
    });
  };
  const createCreditCardCharge = async (
    transData: TopUpTransactionDataInterface
  ) => {
    console.log(transData);
    try {
      const res = await chargeAndTopUpCoins(transData);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const creditCardConfigure = async () => {
    OmiseCard.configure({
      defaultPaymentMethod: "credit_card",
      otherPaymentMethods: [],
    });
    OmiseCard.configureButton("#credit-card");
    OmiseCard.attach();
  };

  const omiseHandler = async () => {
    // const { createCreditCardCharge } = props;
    const parsedAmount = parseInt(props.amount as string, 10) * 100;
    console.log(parsedAmount);
    OmiseCard.open({
      frameDescription: "Invoice #3847",
      amount: parsedAmount,
      onCreateTokenSuccess: (token: any) => {
        console.log(token);
        let Token = "";
        let Source = "";
        if (token.startsWith("tokn_")) {
          Token = token;
        } else {
          Source = token;
        }
        // setTopup({
        //   omiseToken: Token,
        //   omiseSource: Source,
        //   chargeAmount: parsedAmount,
        //   coins: parsedAmount,
        // });
        // console.log({
        //   omiseToken: Token,
        //   omiseSource: Source,
        //   chargeAmount: parsedAmount,
        //   coins: parsedAmount,
        // });
        createCreditCardCharge({
          omiseToken: Token,
          omiseSource: Source,
          chargeAmount: parsedAmount,
          coins: parsedAmount,
        });
      },
      onFormClosed: () => {},
    });
  };

  const handleClick = async (event: any) => {
    event.preventDefault();
    creditCardConfigure();
    omiseHandler();
  };

  return (
    <div>
      <Script url="https://cdn.omise.co/omise.js" onLoad={handleScriptLoad} />

      <form>
        <button
          id="credit-card"
          className="btn"
          type="button"
          // disabled={parsedAmount === 0}
          onClick={handleClick}
        >
          Pay with Credit Card
        </button>
      </form>
    </div>
  );
}

export default Checkout;
