import Transaction from "@/components/topup/checkoutCreditCard";
import { COLOR } from "@/theme/globalTheme";
import { TopUpTransactionDataInterface } from "@/interfaces/transaction/TopUpTransactionDataInterface";
import { chargeAndTopUpCoins } from "@/services/topupService";
import NavBar from "@/components/layout/navBar";
import { useState } from "react";

export default function Page() {

  return (
    <div style={{ margin: "0.0rem", backgroundColor: COLOR.background }}>
      <Transaction/>
      <NavBar />
    </div>
  );
}
