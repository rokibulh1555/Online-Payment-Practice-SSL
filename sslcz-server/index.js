
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const SSLCommerzPayment = require('sslcommerz-lts');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false;

app.post('/payment/init', async (req, res ) => {
    const tran_id = `TXN_${Date.now()}`;
    const data = {
        total_amount: req.body.amount,
        currency: 'BDT',
        tran_id: tran_id,
        success_url: `http://localhost:5000/payment/success/${tran_id}`,
        fail_url: `http://localhost:5000/payment/fail/${tran_id}`,
        cancel_url: `http://localhost:5000/payment/cancel`,
        ipn_url: `http://localhost:5000/ipn`,
        shipping_method: 'No',
        product_name: 'Practice Item',
        product_category: 'Demo',
        product_profile: 'general',
        cus_name: 'Test User',
        cus_email: 'test@mail.com',
        cus_add1: 'Dhaka',
        cus_city: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01700000000',
    };

    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then(apiResponse => {
        if (apiResponse.GatewayPageURL) {
            res.send({ url: apiResponse.GatewayPageURL });
        } else {
            res.status(400).send({ message: "SSLCommerz Initialization Failed."})
        }
    });
});

app.post('/payment/success/:tranId', async (req, res) => {
    const { val_id } = req.body;
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

    sslcz.validate({val_id}).then(response => {
        if( response.status === 'VALID' || response.status === 'VALIDATED') {
            res.redirect(`http://localhost:5173/success?txn=${req.params.tranId}`);
        } else {
            res.redirect(`http://localhost:5173/fail`);
        }
    });
});

app.post(`/payment/fail/:tranId`, async (req, res) => {
    res.redirect(`http://localhost:5173/fail`);
});

app.post('/payment/cancel', async (req, res) => {
    res.redirect(`http://localhost:5173/`);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));