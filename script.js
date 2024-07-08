function generatePaymentCode() {
    return 'Ticket-' + Math.random().toString(36).substr(2, 10).toUpperCase();
}

function copyToClipboard() {
    const link = document.getElementById('copy-link').getAttribute('data-link');
    navigator.clipboard.writeText(link).then(function() {
        alert('Link copied to clipboard');
    }, function(err) {
        alert('Failed to copy: ', err);
    });
}

document.querySelectorAll('.ewallet-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.ewallet-option').forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        option.querySelector('input[type="radio"]').checked = true;
    });
});

document.getElementById('payment-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const ewallet = document.querySelector('input[name="ewallet"]:checked').value;
    const amount = document.getElementById('amount').value;
    const paymentCode = generatePaymentCode();

    document.getElementById('receipt-amount').textContent = amount;
    document.getElementById('selected-ewallet').textContent = ewallet;
    document.getElementById('payment-code').textContent = paymentCode;

    if (ewallet === "OVO") {
        document.getElementById('ovo-info').textContent = "Jika menggunakan pembayaran ini bisa menggunakan aplikasi PPOB yang bisa untuk transfer ke akun e-wallet ini.";
    } else {
        document.getElementById('ovo-info').textContent = "";
    }

    // Kirim data ke PHP menggunakan AJAX
    fetch('process_payment.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'paymentCode=' + paymentCode + '&amount=' + amount + '&ewallet=' + ewallet
    })
    .then(response => response.text())
    .then(data => {
        // Tampilkan respons dari PHP
        alert(data);

        // Perbarui bagian receipt
        document.getElementById('receipt-amount').textContent = amount;
        // ... pembaruan lainnya
    });

    document.getElementById('payment-gateway').classList.remove('active');
    document.getElementById('receipt').classList.add('active');
});
