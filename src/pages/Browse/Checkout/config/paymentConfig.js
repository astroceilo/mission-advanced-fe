import { bcaText, bniText, briText, mandiri, } from "../../../../assets/images/payments/transfer";
import { dana, linkaja, ovo, shopeepay, } from "../../../../assets/images/payments/ewallet";
import { visa, mastercard, jcb } from "../../../../assets/images/payments/visa";


export const paymentConfig = {
  bca: {
    name: "Virtual Account BCA",
    code: "3901",
    icon: bcaText,
    type: "va",
    guides: [
      {
        title: "ATM BCA",
        steps: [
          "Masukkan kartu ATM dan PIN BCA Anda",
          'Di menu utama, pilih "Transaksi Lainnya". Pilih "Transfer". Pilih "Ke BCA Virtual Account"',
          "Masukkan nomor Virtual Account",
          'Pastikan data Virtual Account Anda benar, kemudian masukkan angka yang perlu Anda bayarkan, kemudian pilih "Benar"',
          'Cek dan perhatikan konfirmasi pembayaran dari layar ATM, jika sudah benar pilih "Ya", atau pilih "Tidak" jika data di layar masih salah',
          'Transaksi Anda sudah selesai. Pilih "Tidak" untuk tidak melanjutkan transaksi lain',
        ],
      },
      {
        title: "Mobile Banking BCA",
        steps: [
          "Buka Aplikasi BCA Mobile",
          'Pilih "m-BCA", kemudian pilih "m-Transfer"',
          'Pilih "BCA Virtual Account"',
          'Masukkan nomor Virtual Account, lalu pilih "OK"',
          'Klik tombol "Send" yang berada di sudut kanan atas aplikasi untuk melakukan transfer',
          'Klik "OK" untuk melanjutkan pembayaran',
          "Masukkan PIN Anda untuk meng-otorisasi transaksi",
          "Transaksi Anda telah selesai",
        ],
      },
      {
        title: "Internet Banking BCA",
        steps: [
          "Login ke KlikBCA Individual",
          'Pilih "Transfer", kemudian pilih "Transfer ke BCA Virtual Account"',
          "Masukkan nomor Virtual Account",
          'Pilih "Lanjutkan" untuk melanjutkan pembayaran',
          'Masukkan "RESPON KEYBCA APPLI 1" yang muncul pada Token BCA Anda, lalu klik tombol "Kirim"',
          "Pembayaran telah selesai",
        ],
      },
    ],
  },
  bni: {
    name: "Virtual Account BNI",
    code: "8808",
    icon: bniText,
    type: "va",
    guides: [
      {
        title: "ATM BNI",
        steps: [
          "Masukkan kartu ATM dan PIN BNI Anda",
          'Di menu utama, pilih "Transaksi Lainnya". Pilih "Transfer". Pilih "Ke BNI Virtual Account"',
          "Masukkan nomor Virtual Account",
          'Pastikan data Virtual Account Anda benar, kemudian masukkan angka yang perlu Anda bayarkan, kemudian pilih "Benar"',
          'Cek dan perhatikan konfirmasi pembayaran dari layar ATM, jika sudah benar pilih "Ya", atau pilih "Tidak" jika data di layar masih salah',
          'Transaksi Anda sudah selesai. Pilih "Tidak" untuk tidak melanjutkan transaksi lain',
        ],
      },
      {
        title: "Mobile Banking BNI",
        steps: [
          "Buka Aplikasi BNI Mobile",
          'Pilih "m-BNI", kemudian pilih "m-Transfer"',
          'Pilih "BNI Virtual Account"',
          'Masukkan nomor Virtual Account, lalu pilih "OK"',
          'Klik tombol "Send" yang berada di sudut kanan atas aplikasi untuk melakukan transfer',
          'Klik "OK" untuk melanjutkan pembayaran',
          "Masukkan PIN Anda untuk meng-otorisasi transaksi",
          "Transaksi Anda telah selesai",
        ],
      },
      {
        title: "Internet Banking BNI",
        steps: [
          "Login ke KlikBNI Individual",
          'Pilih "Transfer", kemudian pilih "Transfer ke BNI Virtual Account"',
          "Masukkan nomor Virtual Account",
          'Pilih "Lanjutkan" untuk melanjutkan pembayaran',
          'Masukkan "RESPON KEYBNI APPLI 1" yang muncul pada Token BNI Anda, lalu klik tombol "Kirim"',
          "Pembayaran telah selesai",
        ],
      },
    ],
  },
  bri: {
    name: "Virtual Account BRI",
    code: "002",
    icon: briText,
    type: "va",
    guides: [
      {
        title: "ATM BRI",
        steps: [
          "Masukkan kartu ATM dan PIN BRI Anda",
          'Di menu utama, pilih "Transaksi Lainnya". Pilih "Transfer". Pilih "Ke BRI Virtual Account"',
          "Masukkan nomor Virtual Account",
          'Pastikan data Virtual Account Anda benar, kemudian masukkan angka yang perlu Anda bayarkan, kemudian pilih "Benar"',
          'Cek dan perhatikan konfirmasi pembayaran dari layar ATM, jika sudah benar pilih "Ya", atau pilih "Tidak" jika data di layar masih salah',
          'Transaksi Anda sudah selesai. Pilih "Tidak" untuk tidak melanjutkan transaksi lain',
        ],
      },
      {
        title: "Mobile Banking BRI",
        steps: [
          "Buka Aplikasi BRI Mobile",
          'Pilih "m-BRI", kemudian pilih "m-Transfer"',
          'Pilih "BRI Virtual Account"',
          'Masukkan nomor Virtual Account, lalu pilih "OK"',
          'Klik tombol "Send" yang berada di sudut kanan atas aplikasi untuk melakukan transfer',
          'Klik "OK" untuk melanjutkan pembayaran',
          "Masukkan PIN Anda untuk meng-otorisasi transaksi",
          "Transaksi Anda telah selesai",
        ],
      },
      {
        title: "Internet Banking BRI",
        steps: [
          "Login ke KlikBRI Individual",
          'Pilih "Transfer", kemudian pilih "Transfer ke BRI Virtual Account"',
          "Masukkan nomor Virtual Account",
          'Pilih "Lanjutkan" untuk melanjutkan pembayaran',
          'Masukkan "RESPON KEYBRI APPLI 1" yang muncul pada Token BRI Anda, lalu klik tombol "Kirim"',
          "Pembayaran telah selesai",
        ],
      },
    ],
  },
  mandiri: {
    name: "Virtual Account Mandiri",
    code: "70012",
    icon: mandiri,
    type: "va",
    guides: [
      {
        title: "ATM Mandiri",
        steps: [
          "Masukkan kartu ATM dan PIN Mandiri Anda",
          'Di menu utama, pilih "Transaksi Lainnya". Pilih "Transfer". Pilih "Ke Mandiri Virtual Account"',
          "Masukkan nomor Virtual Account",
          'Pastikan data Virtual Account Anda benar, kemudian masukkan angka yang perlu Anda bayarkan, kemudian pilih "Benar"',
          'Cek dan perhatikan konfirmasi pembayaran dari layar ATM, jika sudah benar pilih "Ya", atau pilih "Tidak" jika data di layar masih salah',
          'Transaksi Anda sudah selesai. Pilih "Tidak" untuk tidak melanjutkan transaksi lain',
        ],
      },
      {
        title: "Mobile Banking Mandiri",
        steps: [
          "Buka Aplikasi Mandiri Mobile",
          'Pilih "m-Mandiri", kemudian pilih "m-Transfer"',
          'Pilih "Mandiri Virtual Account"',
          'Masukkan nomor Virtual Account, lalu pilih "OK"',
          'Klik tombol "Send" yang berada di sudut kanan atas aplikasi untuk melakukan transfer',
          'Klik "OK" untuk melanjutkan pembayaran',
          "Masukkan PIN Anda untuk meng-otorisasi transaksi",
          "Transaksi Anda telah selesai",
        ],
      },
      {
        title: "Internet Banking Mandiri",
        steps: [
          "Login ke KlikMandiri Individual",
          'Pilih "Transfer", kemudian pilih "Transfer ke Mandiri Virtual Account"',
          "Masukkan nomor Virtual Account",
          'Pilih "Lanjutkan" untuk melanjutkan pembayaran',
          'Masukkan "RESPON KEYMANDIRI APPLI 1" yang muncul pada Token Mandiri Anda, lalu klik tombol "Kirim"',
          "Pembayaran telah selesai",
        ],
      },
    ],
  },

  dana: {
    name: "Virtual Account DANA",
    icon: dana,
    type: "ewallet",
    guides: [
      {
        title: "DANA",
        steps: [
          "Buka Aplikasi DANA",
          'Pilih menu "Pay" atau dibagian bawah klik ikon "Scan QR"',
          "Arahkan kamera ke QR Code yang tersedia",
          'Masukkan jumlah pembayaran sesuai tagihan yang tertera',
          'Periksa kembali detail pembayaran, lalu klik "Bayar"',
          "Masukkan PIN DANA Anda untuk menyelesaikan pembayaran",
          "Pembayaran telah selesai",
        ]
      }
    ],
  },
  ovo: {
    name: "Virtual Account OVO",
    icon: ovo,
    type: "ewallet",
    guides: [
      {
        title: "OVO",
        steps: [
          "Buka Aplikasi OVO",
          'Pilih menu "Pay" atau dibagian bawah klik ikon "Scan QR"',
          "Arahkan kamera ke QR Code yang tersedia",
          'Masukkan jumlah pembayaran sesuai tagihan yang tertera',
          'Periksa kembali detail pembayaran, lalu klik "Bayar"',
          "Masukkan PIN OVO Anda untuk menyelesaikan pembayaran",
          "Pembayaran telah selesai",
        ]
      }
    ],
  },
  linkaja: {
    name: "Virtual Account LinkAja",
    icon: linkaja,
    type: "ewallet",
    guides: [
      {
        title: "LinkAja",
        steps: [
          "Buka Aplikasi LinkAja",
          'Pilih menu "Pay" atau dibagian bawah klik ikon "Scan QR"',
          "Arahkan kamera ke QR Code yang tersedia",
          'Masukkan jumlah pembayaran sesuai tagihan yang tertera',
          'Periksa kembali detail pembayaran, lalu klik "Bayar"',
          "Masukkan PIN LinkAja Anda untuk menyelesaikan pembayaran",
          "Pembayaran telah selesai",
        ]
      }
    ],
  },
  shopeepay: {
    name: "Virtual Account ShopeePay",
    icon: shopeepay,
    type: "ewallet",
    guides: [
      {
        title: "ShopeePay",
        steps: [
          "Buka Aplikasi ShopeePay",
          'Pilih menu "Pay" atau dibagian bawah klik ikon "Scan QR"',
          "Arahkan kamera ke QR Code yang tersedia",
          'Masukkan jumlah pembayaran sesuai tagihan yang tertera',
          'Periksa kembali detail pembayaran, lalu klik "Bayar"',
          "Masukkan PIN ShopeePay Anda untuk menyelesaikan pembayaran",
          "Pembayaran telah selesai",
        ]
      }
    ],
  },

  credit_card: {
    name: "Mastercard / Visa / JCB",
    icon: [mastercard, visa, jcb],
    type: "card",
  },
};
