import TopUp from "@/components/topup/topup";
import { COLOR } from "@/theme/globalTheme";
import { TopUpTransactionDataInterface } from "@/interfaces/transaction/TopUpTransactionDataInterface";
import { chargeAndTopUpCoins } from "@/services/topupService";
import NavBar from "@/components/layout/navBar";
import { useState } from "react";

export default function Page() {

  return (
    <div style={{ margin: "0.0rem", backgroundColor: COLOR.primary }}>
      <TopUp initialAmount={0}/>
      <NavBar />
    </div>
  );
}
