import { dana, linkaja, ovo, shopeepay, } from "../../../../assets/images/payments/ewallet";
import { bca, bni, bri, mandiri, } from "../../../../assets/images/payments/transfer";
import { visa, mastercard, jcb } from "../../../../assets/images/payments/visa";


export const paymentMethods = [
  {
    group: "Transfer Bank",
    type: "list",
    items: [
      { id: "bca", label: "Bank BCA", type: "bank", icon: bca },
      { id: "bni", label: "Bank BNI", type: "bank", icon: bni },
      { id: "bri", label: "Bank BRI", type: "bank", icon: bri },
      { id: "mandiri", label: "Bank Mandiri", type: "bank", icon: mandiri },
    ],
  },
  {
    group: "E-Wallet",
    type: "list",
    items: [
      { id: "dana", label: "Dana", type: "bank", icon: dana },
      { id: "ovo", label: "OVO", type: "bank", icon: ovo },
      { id: "linkaja", label: "LinkAja", type: "bank", icon: linkaja },
      { id: "shopeepay", label: "ShopeePay", type: "bank", icon: shopeepay },
    ],
  },
  {
    group: "Kartu Kredit/Debit",
    type: "card",
    item: {
      id: "credit_card",
      icons: [mastercard, visa, jcb],
      label: "Mastercard, Visa, JCB",
    },
  },
];
