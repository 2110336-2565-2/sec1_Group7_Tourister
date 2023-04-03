import { useState, useEffect, Component } from "react";
import { TopUpTransactionDataInterface } from "@/interfaces/transaction/TopUpTransactionDataInterface";
import { chargeAndTopUpCoins } from "@/services/topupService";
import Script from "react-load-script";
import { Avatar, Button } from "@mui/material";
import { COLOR } from "@/theme/globalTheme";
import { useRouter } from "next/router";
import appConfig from "@/configs/appConfig";
import Link from "next/link";
import { Check, Done } from "@mui/icons-material";

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
  const formattedDateTime = dateTime.toLocaleString("en-GB", { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  }).replace(',','');

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
            <div style={{marginTop:"-38px", padding:"5px", backgroundColor:"white", borderRadius:"50%"}}>
              <Avatar sx={{ bgcolor: "mediumaquamarine" }}>
                <Done fontSize="medium" style={{color:"white"}}/>
              </Avatar>
            </div>
            <h3 style={{margin:"0px 0 0px 0"}}>Top up Successfully</h3>
            <label style={{color:"dimgrey", fontSize:"14px", margin:"-4px"}}>{formattedDateTime}</label>
            <hr style={{border:"1px solid lightgrey", width:"100%", margin:"20px 0"}}/>
            <div style={{display:"table", width:"100%"}}>
              <div style={{display:"table-row", height:"40px"}}>
                <div style={{display:"table-cell"}}>Pay</div>
                <div style={{display:"table-cell", fontWeight:"600", fontSize:"18px"}}>{props.amount} THB</div>
              </div>
              <div style={{display:"table-row", height:"35px"}}>
                <div style={{display:"table-cell"}}>Received</div>
                <div style={{display:"table-cell"}}>{props.amount} coins</div>
              </div>
              <div style={{display:"table-row", height:"35px"}}>
                <div style={{display:"table-cell"}}>Payment Method:</div>
                <div style={{display:"table-cell"}}>Credit Card</div>
              </div>
            </div>
            {/* <div>Pay {props.amount} THB</div>
            <div>Received {props.amount} coins</div>
            <div>Payment Method: Credit Card</div> */}
            <Link href={"./manage_account"}>
              <button onClick={handleClosePopup} style={{
                border:"none", borderRadius:"5px", backgroundColor:"mediumaquamarine",
                fontSize:"20px", color:"white", letterSpacing:"1px",
                width:"320px", height:"42px", marginTop:"20px"
              }}>
                Continue
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
          margin: 20px;
          min-width: 320px;
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
