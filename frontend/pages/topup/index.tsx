import TopUp from "@/components/topup/topup";
import { COLOR } from "@/theme/globalTheme";
import { TopUpTransactionDataInterface } from "@/interfaces/transaction/TopUpTransactionDataInterface";
import { chargeAndTopUpCoins } from "@/services/topupService";
import NavBar from "@/components/layout/navBar";
import { useState } from "react";
import Link from "next/link";

export default function Page() {
  return (
    <div style={{ margin: "0.0rem", backgroundColor: COLOR.primary }}>
      <Link href={"./manage_account"}>
        <button>Back</button>
      </Link>
      <TopUp initialAmount={0} />
      {/* <NavBar /> */}
    </div>
  );
}
