require('dotenv').config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY,{
    apiVersion: "2022-08-01",
}); // Replace with your Stripe Secret Key

const createPaymentIntent =  async (req, res) => {
    const {amount} = req.body;
    console.log(amount)
    try{
        const paymentIntent =  await stripe.paymentIntents.create({
            amount:10000,
            currency:'SGD',
            automatic_payment_methods:{
                enabled:true
            }
        })
        res.status(201).json({
            status: "success",
            data: {clientSecret:paymentIntent.client_secret},
          });
    }catch(error){
        console.log(error);
            res.status(500).json({
              status: "error",
              message: "Failed to create payment intent.",
              error: error.message,
            });
    }
}

module.exports = {
    createPaymentIntent
}