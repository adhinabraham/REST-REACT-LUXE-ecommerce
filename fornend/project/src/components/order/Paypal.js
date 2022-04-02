import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import axios from "axios";

toast.configure();


const Paypal = ({ grandtotal }) => {
  const paypal = useRef();
  const navigate = useNavigate();

  const notification = (m) => {
    toast.success(" " + m, {
      theme: "dark",
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const notification2 = (m) => {
    toast.error(" " + m, {
      theme: "dark",
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    
  // username: userid,
  //   address: address,
  //   payment_method: paymentmethod,
  //   order_number: uniqueid,
    
    const username = localStorage.getItem("userid")
    const address = localStorage.getItem("addrssid");
    const payment = "PayPal"
    const ordernumber = localStorage.getItem("orderid");
    console.log(ordernumber,"paypalordernumber")
    
    const placeorder = async () => {
      try {
        const paymentoption = "PayPal";
        const data = {"username":username,"address":address,"payment_method":payment,"order_number":ordernumber};
        const url = "http://127.0.0.1:8000/order/orderplaced/";
        const { data: res } = await axios.post(url, data);
        const userdetail = { "userid": username };

        const urls = "http://127.0.0.1:8000/cart/additem/";
        await axios.put(urls, userdetail)
        localStorage.removeItem("orderid")
        localStorage.removeItem("addrssid")
        localStorage.removeItem("carttotal");

        navigate('/')
        // const createdmessage = res.message;

        // const notify = notification(createdmessage);
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          const errornotify = notification2(error.response.data.message);
        }
      } finally {
        console.log("Order Placing completed");
      }
    };
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Thank You For Shopping From LUXE.",
                amount: {
                  currency_code: "USD",
                  value: grandtotal,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.table(order);
          placeorder()

        },

        onError: (err) => {
          console.error(err);
        },
        style: {
          layout: "vertical",
          color: "gold",
          shape: "pill",
          label: "pay",
        },
      })
      .render(paypal.current);
  }, [grandtotal]);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
};
export default Paypal;
