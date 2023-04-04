import Transaction from "@/components/topup/checkoutCreditCard/checkoutCreditCard";
import TopUp from "@/components/topup/topup";
import { COLOR } from "@/theme/globalTheme";
import { TopUpTransactionDataInterface } from "@/interfaces/transaction/TopUpTransactionDataInterface";
import { chargeAndTopUpCoins } from "@/services/topupService";
import NavBar from "@/components/layout/navBar";
import { useState } from "react";
import { AuthProvider } from "@/components/AuthProvider";
import { NotificationProvider } from "@/components/notification/NotificationProvider";

export default function Page() {

  return (
    <AuthProvider>
      <NotificationProvider>
      <div style={{ margin: "0.0rem", backgroundColor: COLOR.background }}>
        <Transaction/>
        <NavBar />
      </div>
      </NotificationProvider>
    </AuthProvider>
  );
}
