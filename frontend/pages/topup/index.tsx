import TopUp from "@/components/topup/topup";
import { COLOR } from "@/theme/globalTheme";
import { TopUpTransactionDataInterface } from "@/interfaces/transaction/TopUpTransactionDataInterface";
import { chargeAndTopUpCoins } from "@/services/topupService";
import NavBar from "@/components/layout/navBar";
import { useState } from "react";
import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export default function Page() {
  return (
    <div 
      style={{ 
        margin: "0.0rem", 
        // backgroundColor: COLOR.primary 
        // margin: "0.0rem", backgroundColor: COLOR.background
      }}
    >
      <Link href={"./manage_account"}>
        <button
          style={{
            margin: ".3rem 0px 0px 0px",
            background: "white",
            border: "0px",
            transform: "translate(2.3rem,5.5rem)",
          }}
          type="button"
        >
          <ChevronLeftIcon />
        </button>
      </Link>
      <TopUp initialAmount={0} />
      {/* <NavBar /> */}
    </div>
  );
}
