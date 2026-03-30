import React, { useState } from 'react';
import axios from 'axios';

const Checkout = () => {
    const [amount, setAmount] = useState(500);

    const handlePay = async () => {
        if (amount < 10) { //  Basic validation to prevent tiny payments
            alert("Minimum amount is 10 BDT");
            return;
        }

        try {
            // Sending dynamic amount to backend
            const res = await axios.post('http://localhost:5000/payment/init', { amount: Number(amount) });
            if (res.data.url) {
                window.location.replace(res.data.url);
            }
        } catch (err) {
            console.error("Payment initiation failed:", err);
            alert("Connection error. Is your backend running on port 5000?");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Secure Checkout</h2>
                    <p style={styles.subtitle}>Practice SSLCommerz Sandbox</p>
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Enter Amount (BDT)</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)} // 🔵 Update state on input change
                        style={styles.input}
                        placeholder="e.g. 500"
                    />
                </div>

                <div style={styles.summary}>
                    <span>Total Payable:</span>
                    <span style={styles.totalAmount}>{amount || 0} ৳</span>
                </div>

                <button onClick={handlePay} style={styles.payButton}>
                    {/* Added bKash logo icon for better UI */}
                    <img
                        src="https://www.logo.wine/a/logo/BKash/BKash-Icon-Logo.wine.svg"
                        alt="bKash"
                        style={styles.btnIcon}
                    />
                    Pay with bKash
                </button>

                <p style={styles.footerNote}>Powered by SSLCommerz Sandbox</p>
            </div>
        </div>
    );
};

// Inline styles for a "Beautiful" UI
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f7f6',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    card: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
    },
    header: {
        marginBottom: '30px'
    },
    title: {
        margin: '0',
        color: '#333',
        fontSize: '24px'
    },
    subtitle: {
        color: '#777',
        fontSize: '14px',
        marginTop: '5px'
    },
    inputGroup: {
        textAlign: 'left',
        marginBottom: '25px'
    },
    label: {
        display: 'block',
        fontSize: '14px',
        fontWeight: '600',
        color: '#555',
        marginBottom: '8px'
    },
    input: {
        width: '100%',
        padding: '12px 15px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.3s',
        boxSizing: 'border-box'
    },
    summary: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 0',
        borderTop: '1px solid #eee',
        marginBottom: '25px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333'
    },
    totalAmount: {
        color: '#e2136e'
    },
    payButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: '#e2136e',
        color: 'white',
        border: 'none',
        padding: '15px',
        borderRadius: '8px',
        fontSize: '18px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background 0.3s'
    },
    btnIcon: {
        height: '24px',
        marginRight: '10px'
    },
    footerNote: {
        fontSize: '12px',
        color: '#aaa',
        marginTop: '20px'
    }
};

export default Checkout;