import Transaction from "@/components/transaction/transaction";
import { COLOR } from "@/theme/globalTheme";
import Head from "next/head";

export default function Page() {
  return (
    <div style={{ margin: "0.0rem", backgroundColor: COLOR.background }}>
      <Head>
        <script src="https://cdn.omise.co/omise.js"></script>
      </Head>
      <Transaction />
    </div>
  );
}
