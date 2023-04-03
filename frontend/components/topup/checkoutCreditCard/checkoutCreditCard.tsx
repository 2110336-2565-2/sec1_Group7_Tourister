import { useState, useEffect, Component } from "react";
import { TopUpTransactionDataInterface } from "@/interfaces/transaction/TopUpTransactionDataInterface";
import { chargeAndTopUpCoins } from "@/services/topupService";
import Script from "react-load-script";
import { Button } from "@mui/material";
import { COLOR } from "@/theme/globalTheme";
import { useRouter } from "next/router";
import appConfig from "@/configs/appConfig";
import Link from "next/link";

const PUBLIC_KEY = appConfig.OMISE_PUBLIC_KEY;
console.log(PUBLIC_KEY);
let OmiseCard: any;

function Checkout(props: any) {
  const router = useRouter();
  // let { amount } = router.query;
  // const parsedAmount = parseInt(amount as string, 10) * 100;
  const [showPopup, setShowPopup] = useState(false);

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
      setShowPopup(true);
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
        createCreditCardCharge({
          omiseToken: Token,
          omiseSource: Source,
          chargeAmount: parsedAmount,
          coins: parsedAmount,
        });
        // router.push("./manage_account")
      },
      onFormClosed: () => {},
    });
  };

  const handleClick = async (event: any) => {
    event.preventDefault();
    creditCardConfigure();
    omiseHandler();
  };

  const handleClosePopup = () => {
    setShowPopup(false);
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

  return (
    <div>
      <Script url="https://cdn.omise.co/omise.js" onLoad={handleScriptLoad} />

      <form>
        <button
          id="credit-card"
          className="btn"
          type="button"
          disabled={props.amount === 0}
          onClick={handleClick}
        >
          Pay with Credit Card
        </button>
      </form>
      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <h2>TopUp successful</h2>
            <div>Pay {props.amount} THB</div>
            <div>Received {props.amount} coins</div>
            <div>Payment Method: Credit Card</div>
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
}

export default Checkout;
