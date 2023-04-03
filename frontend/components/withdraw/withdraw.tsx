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
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { PrimaryButton, RequireFormLabel } from "@/css/styling";

interface TopUpProps {
  initialAmount: number;
}
const HeaderInPopup = styled.h4`
  margin: 0.7rem 0 0.5rem 0;
`;

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
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankAccount, setBankAccount] = useState<accountType>("");
  const router = useRouter();
  //   const [selectedBank, setSelectedBank] = useState("");

  const handleBankChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBankAccount(event.target.value);
  };

  //   const watchAccountType = watch("accountType");

  const handleValueClick = (value: number) => {
    setAmount(value);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // if (
    //   event.target.value === "" ||
    //   (Number(event.target.value) >= 0 && Number(event.target.value) <= 1000000)
    // ) {
    setAmount(parseInt(event.target.value));
    // } else {
    //   alert("Input value must be between ฿100 and ฿1000000.");
    // }
  };
  const handleBankNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      event.target.value === "" ||
      (Number(event.target.value) >= 0 &&
        Number(event.target.value) <= 10000000000)
    ) {
      setBankAccountNumber(event.target.value);
    } else {
      alert("Wrong Format Input");
    }

    // validationSchema
    //   .validate({ bankAccount, bankAccountNumber })
    //   .then((values) => {
    //     setBankAccountNumber(event.target.value);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
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
  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async () => {
    try {
      const res = await userWithdrawCoins({ amount: amount.toString() });
      console.log(res);
      setShowPopup(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Form
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Coin Withdraw</h1>
        <div>Withdraw value (THB)</div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
          }}
        >
          {withdrawValues.map(({ label, value }) => (
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
        <div
          style={{ display: "grid", width: "80%", justifyContent: "center" }}
        >
          <RequireFormLabel className="AsteriskRequired">
            Input Amount (THB)
          </RequireFormLabel>
          <Controller
            name="amount"
            control={control}
            render={({
              field: { onChange, value },
              fieldState: { error },
              formState,
            }) => (
              <TextField
                helperText={error ? error.message : null}
                size="small"
                error={Boolean(error)}
                onChange={handleAmountChange}
                value={amount}
                fullWidth
                // placeholder="Enter custom amount"
                variant="outlined"
                InputProps={{
                  readOnly: false,
                }}
              />
            )}
          />
          <RequireFormLabel className="AsteriskRequired">
            Bank account number
          </RequireFormLabel>
          <FormInputText
            name="accountNumber"
            control={control}
            label="Bank account number"
          />

          <RequireFormLabel className="AsteriskRequired">
            Select bank
          </RequireFormLabel>
          <FormInputSelect
            name="bankAccount"
            control={control}
            label=""
            options={bankOptions}
          />
        </div>

        {/* <label htmlFor="bankSelect">Select bank:</label>
        <select id="bankSelect" value={bankAccount} onChange={handleBankChange}>
          <option value="">Select an option</option>
          {bankOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select> */}
        <div style={{ margin: "0.0rem", backgroundColor: COLOR.secondary }}>
          {amount !== undefined && (
            <p style={{ marginTop: "10px" }}>
              You have selected a withdraw amount of THB {amount.toFixed(2)}
            </p>
          )}
        </div>
        {/* <button
          id="credit-card"
          className="btn"
          type="button"
          disabled={amount === 0}
          onClick={handleWithdraw}
          >
          Withdraw
        </button> */}
        <PrimaryButton
          style={{ alignSelf: "center", marginTop: "3rem" }}
          type="submit"
          variant="contained"
        //   onClick={onSubmit}
        >
          Withdraw
        </PrimaryButton>
      </Form>
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
