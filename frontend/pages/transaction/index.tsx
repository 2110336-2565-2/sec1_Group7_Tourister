import Transaction from "@/components/transaction/checkoutCreditCard";
import { COLOR } from "@/theme/globalTheme";

export default function Page() {
  return (
    <div style={{ margin: "0.0rem", backgroundColor: COLOR.background }}>
      <Transaction />
    </div>
  );
}
