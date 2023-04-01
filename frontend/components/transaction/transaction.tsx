import { useState, useEffect } from "react";
import { TopUpTransactionDataInterface } from "@/interfaces/transaction/TopUpTransactionDataInterface";
// import { OmiseCard } from "omise-react-native";
import { chargeAndTopUpCoins } from "@/services/topupService";

function Transaction() {
  const [omiseToken, setOmiseToken] = useState("");
  const [omiseSource, setOmiseSource] = useState("");
  const [topup, setTopup] = useState<TopUpTransactionDataInterface>({
    omiseToken: "",
    omiseSource: "",
    chargeAmount: 0,
    coins: 0,
  });

  useEffect(() => {
    OmiseCard.configure({
      publicKey: "pkey_test_5vai0hszx1or7r9s9gf",
    });
  }, []);

  function handleCheckout(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    OmiseCard.open({
      amount: 12345,
      currency: "THB",
      defaultPaymentMethod: "credit_card",
      onCreateTokenSuccess: async (nonce: string) => {
        if (nonce.startsWith("tokn_")) {
          setOmiseToken(nonce);
        } else {
          setOmiseSource(nonce);
        }
        setTopup({
          omiseToken: omiseToken,
          omiseSource: omiseSource,
          chargeAmount: 12345,
          coins: 12345,
        });
        const res = await chargeAndTopUpCoins(topup);
        console.log(res);
        event.currentTarget.submit();
      },
    });
  }

  return (
    <form
      id="checkoutForm"
      method="POST"
      action="/charge"
      onSubmit={handleCheckout}
    >
      <input name="omiseToken" value={omiseToken} />
      <input name="omiseSource" value={omiseSource} />
      <button type="submit" id="checkoutButton">
        Checkout
      </button>
    </form>
  );
}

export default Transaction;
