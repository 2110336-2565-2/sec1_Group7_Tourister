import React, { useState } from "react";
import { useRouter } from "next/router";
import { COLOR } from "@/theme/globalTheme";
import { userWithdrawCoins } from "@/services/withdrawService";
import Link from "next/link";
import { validationSchema, FormData, defaultValues } from "./withdrawSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldName, Form } from "@/css/layout";
import { FormInputText } from "../formInput/FormInputText";
import { FormInputSelect } from "@/components/formInput/FormInputSelect";
import { Controller } from "react-hook-form";
import styled from "styled-components";
import { Avatar, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { PrimaryButton, RequireFormLabel, StyledInput } from "@/css/styling";
import { Done } from "@mui/icons-material";
import Swal from "sweetalert2";

interface TopUpProps {
  initialAmount: number;
}

interface withdrawValue {
  label:string,
  value:number
}


const bankOptions = [
  { value: "scb", label: "SCB - ธนาคารไทยพาณิชย์" },
  { value: "TTB", label: "TTB - ธนาคารทหารไทย" },
  { value: "kbank", label: "KBANK - ธนาคารกสิกรไทย" },
  { value: "bbl", label: "BBL - ธนาคารกรุงเทพ" },
  { value: "krungsri", label: "Krungsri - ธนาคารกรุงศรีอยุธยา" },
  { value: "tmb", label: "TMB - ธนาคารทหารไทยธนชาต" },
  { value: "cimb", label: "CIMB - ธนาคารซีไอเอ็มบีไทย" },
  { value: "uob", label: "UOB - ธนาคารยูโอบี" },
  { value: "icbc", label: "ICBC - ธนาคารไอซีบีซี (ไทย)" },
  { value: "bay", label: "BAY - ธนาคารกรุงศรีฯ" },
  { value: "hsbc", label: "HSBC - ธนาคารเอชเอสบีซี" },
  { value: "deutsche", label: "Deutsche - ธนาคารเดอตูช์" },
  { value: "citibank", label: "Citibank - ธนาคารซิตี้แบงก์" },
  { value: "standardchartered", label: "SCB - ธนาคารสแตนดาร์ดชาร์เตอร์ด์" },
  { value: "thanachart", label: "TNC - ธนาคารธนชาต" },
  { value: "mbanking", label: "mBanking - ธนาคารกรุงไทย mBanking" },
  { value: "gsb", label: "GSB - ธนาคารออมสิน" },
  { value: "tbank", label: "TBank - ธนาคารตากสิน" },
  { value: "baac", label: "BAAC - ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร" },
  { value: "gls", label: "GLS - ธนาคารทิสโก้เกียรตินาคินภัทร" },
  { value: "kkp", label: "KKP - ธนาคารเกียรตินาคินภัทร" },
];

const withdrawValues: withdrawValue[] = [
  { label: "300", value: 300 },
  { label: "500", value: 500 },
  { label: "700", value: 700 },
  { label: "1000", value: 1000 },
  { label: "2000", value: 2000 },
  { label: "3000", value: 3000 },
];

const TopUp: React.FC<TopUpProps> = ({ initialAmount }) => {
  const [amount, setAmount] = useState<number>(initialAmount);
  const [showPopup, setShowPopup] = useState(false);
  const [bankAccountNumber, setBankAccountNumber] = useState<string>("");
  const [bankAccount, setBankAccount] = useState<string>("");

  const handleBankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBankAccount(event.target.value);
  };

  const validateAccountNumber = (input: string) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(input);
  };
  const validateAmount = (input: number) => {
    return Number(input) >= 0 && Number(input) <= 1000000;
  };

  const handleValueClick = (value: number) => {
    setAmount(value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(parseInt(event.target.value));
  };
  const handleBankNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBankAccountNumber(event.target.value);
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

  const onSubmit = async () => {
    // console.log("submit");
    // console.log(validateAmount(amount));
    // console.log(validateAccountNumber(bankAccountNumber));
    if (validateAmount(amount) && validateAccountNumber(bankAccountNumber)) {
      Swal.fire({
        title: 'Please wait...',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        willOpen: ()=> {
          Swal.showLoading();
        }
      });
      try {
        const res = await userWithdrawCoins({ amount: amount.toString() });
        Swal.close();
        // console.log(res);
        setShowPopup(true);
      } catch (err:any) {
        console.log(err);
        Swal.close();
        Swal.fire({
          text: err.message,
          icon: "error",
          timer: 2000
        })
      }
    } else {
      Swal.fire({
        text: "Invalid Input",
        icon: "error",
        timer: 2000,
      });
      return;
    }
  };
//   console.log(amount);
  const {
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });
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
        Coin Withdrawal
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
          Withdraw value (coins)
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
            padding: "10px 20px 10px 20px",
          }}
        >
          {withdrawValues.map(({ label, value }) => (
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
        <RequireFormLabel
          className="AsteriskRequired"
          style={{
            alignItems: "center",
            padding: "10px 20px 10px 20px",
            margin: "auto",
            alignSelf: "center",
          }}
        >
          Input Amount (coins)
        </RequireFormLabel>
        <StyledInput
          name="amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter custom amount"
        />
        <RequireFormLabel
          className="AsteriskRequired"
          style={{
            alignItems: "center",
            padding: "10px 20px 10px 20px",
            margin: "auto",
            alignSelf: "center",
          }}
        >
          Bank account number
        </RequireFormLabel>
        <StyledInput
          type="string"
          value={bankAccountNumber}
          onChange={handleBankNumberChange}
          placeholder="Enter Bank Number"
        />
        <RequireFormLabel
          className="AsteriskRequired"
          style={{
            alignItems: "center",
            padding: "10px 20px 10px 20px",
            margin: "auto",
            alignSelf: "center",
          }}
        >
          Select bank
        </RequireFormLabel>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
            padding: "0px 20px 10px 20px",
          }}
        >
          <FormInputSelect
            name="bankAccount"
            control={control}
            label=""
            options={bankOptions}
          />
        </div>

        <div
          style={{
            margin: "0.0rem",
            padding: "10px 20px 10px 20px",
            // backgroundColor: COLOR.primary,
          }}
        >
          {amount !== undefined && (
            <div>
              <p
                style={{
                  // margin: "auto"
                  marginTop: "10px",
                  marginBottom: "-2px",
                }}
              >
                You have selected a withdraw amount of
              </p>
              <p
                style={{
                  // margin: "auto"
                  fontSize: 10,
                  marginTop: "-3px",
                }}
              >
                (You will received same amount of THB in your bank account)
              </p>
              <p
                style={{
                  margin: "auto",
                  color: COLOR.primary,
                  fontSize: 25,
                  fontWeight: "bold",
                  transform: "translateY(-10px)",
                }}
              >
                {amount.toFixed(2)} coins
              </p>
            </div>
          )}
        </div>
        <div
          style={{
            alignSelf: "center",
            textAlign: "center",
            padding: "10px",
          }}
        >
          <button
            id="credit-card"
            className="btn"
            type="button"
            disabled={amount === 0}
            onClick={onSubmit}
            style={{
              backgroundColor: amount === 0 ? COLOR.disable : COLOR.background,
              border: 0,
              borderRadius: 12,
              height: 50,
              width: "300px",
              padding: "10px auto",
              margin: "20px",
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Withdraw
          </button>
        </div>
      </div>
      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <div
              style={{
                marginTop: "-38px",
                padding: "5px",
                backgroundColor: "white",
                borderRadius: "50%",
              }}
            >
              <Avatar sx={{ bgcolor: "mediumaquamarine" }}>
                <Done fontSize="medium" style={{ color: "white" }} />
              </Avatar>
            </div>
            <h3 style={{ margin: "0px 0 0px 0" }}>Withdraw Successfully</h3>
            <label
              style={{ color: "dimgrey", fontSize: "14px", margin: "-4px" }}
            >
              {formattedDateTime}
            </label>
            <hr
              style={{
                border: "1px solid lightgrey",
                width: "100%",
                margin: "20px 0",
              }}
            />
            <div style={{ display: "table", width: "100%" }}>
              <div style={{ display: "table-row", height: "40px" }}>
                <div style={{ display: "table-cell" }}>Withdraw</div>
                <div
                  style={{
                    display: "table-cell",
                    fontWeight: "600",
                    fontSize: "18px",
                  }}
                >
                  {amount} coins
                </div>
              </div>
              <div style={{ display: "table-row", height: "35px" }}>
                <div style={{ display: "table-cell" }}>Received</div>
                <div style={{ display: "table-cell" }}>
                  {amount} THB in your Bank Account
                </div>
              </div>
              <div style={{ display: "table-row", height: "35px" }}>
                <div style={{ display: "table-cell" }}>Payment Method:</div>
                <div style={{ display: "table-cell" }}>Internet banking</div>
              </div>
            </div>
            {/* <div>Pay {props.amount} THB</div>
            <div>Received {props.amount} coins</div>
            <div>Payment Method: Credit Card</div> */}
            <Link href={"./manage_account"}>
              <button
                onClick={handleClosePopup}
                style={{
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "mediumaquamarine",
                  fontSize: "20px",
                  color: "white",
                  letterSpacing: "1px",
                  width: "320px",
                  height: "42px",
                  marginTop: "20px",
                }}
              >
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
    // </Form>
  );
};

export default TopUp;
