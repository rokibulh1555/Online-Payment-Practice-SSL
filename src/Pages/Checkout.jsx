import {useState} from "react";
import axios from "axios";


const Checkout = () => {

    const [amount, setAmount ] = useState(500);

    const handlePay = async () => {
        if(!amount || amount < 10) {
            alert("Please enter a valid amount (Minimum 15 BDT)");
            return;
        }
        try {
            const res = await axios.post('http://localhost:5000/payment/init', { amount: Number(amount)});
            if( res.data.url ) {
                window.location.replace(res.data.url);
            }
        } catch (error) {
            console.error(error);
            alert("Server Error. Ensure Node.js backend is running.");
        }
    };

    return (
        <div className={'container d-flex justify-content-center align-items-center vh-100'} style={{ backgroundColor: ''}}>
            <div className={'card shadow-sm p-4'} style={{ maxWidth: '400px', width: '100%', borderRadius: '15px'}}>
                <div className={'text-center mb-4'}>
                    <h3 className={'fw-bold'}>Make Your Payment</h3>
                    <p className={'text-muted small'}>SSLCommerz Sandbox Mode</p>
                </div>

                <div className={'mb-3'}>
                    <label className={'form-label fw-semibold'}>Amount (BDT)</label>
                    <input
                        type={'number'}
                        className={'form-control form-control-lg'}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <div className={'d-flex justify-content-between mb-4 border-top pt-3'}>
                    <span className={'text-secondary'}>Payable</span>
                    <span className={'fw-bold text-primary'}>{amount || 0} ৳</span>
                </div>

                <button
                    onClick={handlePay}
                    className={'btn btn-lg w-100 text-white fw-bold'}
                    style={{ backgroundColor: '#e2136e'}}
                >
                    Pay Now
                </button>

            </div>
        </div>
    )
}

export default Checkout;