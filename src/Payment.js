import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import "./Payment.css"
import { useStateValue } from "./StateProvider";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();


    const stripe = useStripe();
    const elements = useElements();

    const [error, setError ] = useState(null);
    const [disabled, setDisabled ] = useState(true);
    const [succeded, setSucceded ] = useState("");
    const [ processing, setProcessing ] = useState(false);
    const [clientSecret, setClientSecret ] = useState(true);


    // whwenever basket changes it upgrades the basket cost
    useEffect(() => {
    //    generate the special stripe secret which allows us to charge a customer
         const getClientSecret = async () => {
             const response = await axios({
                 methpd: "post",
                //  stripe expect the total in a currencies sub unit example $10 = 10000  you have to times by 100
                 url: `/payments/create/total=${getBasketTotal(basket) * 100}`
             })
             setClientSecret(response.data.clientSecret)
         }
    }, [basket])


    const handleSubmit = async (event) => {
        // stripe action
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation

            setSucceded(true);
            setError(null)
            setProcessing(false)

            history.replace("/orders")
        })

    }

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className="payment">
            <div className="payment__container">
                <h1>
                    Checkout (<Link to="/checkout">{basket?.length}items</Link>)
                </h1>
                {/* Payment section - delivery address */}
                <div className="payment__section">
                  <div className="payment__title">
                      <h3> Delivery Address</h3>
                  </div>
                  <div className="payment__address">
                      <p>{user?.email}</p>
                      <p>123 React Lane</p>
                      <p>Los Angeles, CA</p>
                  </div>
                </div>
                {/* Payment section - Review Items */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review items and Delivery</h3>
                    </div>
                    <div className="payment__items">
                        {basket.map(item => (
                             <CheckoutProduct
                             id={item.id} // pass it as id= and not item=
                             title={item.title}
                             image={item.image}
                             price={item.price}
                             rating={item.rating}
                           />
                        ))}
                    </div>
                </div>
                {/* Payment section - Payment method */}
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Payment method</h3>
                    </div>
                    <div className="payment__details">
                        {/* Stripe payment */}
                        <form>
                            <CardElement onChange={handleChange} />

                            <div className="payment__priceContainer">
                            <CurrencyFormat
                                renderText={(value) => (
                                <>
                                    <h3>
                                    Order Total: <strong> {value}</strong>
                                    </h3>
                                </>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeprator={true}
                                prefix={"$"}
                            />
                            <button disabled={processing || disabled || succeded}>
                                <span>{processing ? <p>Processing</p> : "Buy Now" }</span>
                            </button>
                            </div>
                            {/* Errors */}
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
