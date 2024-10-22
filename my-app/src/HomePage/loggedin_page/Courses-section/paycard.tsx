import React from "react";
import { useCountries } from "use-react-countries";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  BanknotesIcon,
  CreditCardIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

// Initialize Stripe with your public key
const stripePromise = loadStripe("pk_test_51QCNeHLA9w1dgMF8JVDTDH30vH4z7pnq3kACSffRrUDvsmCd5585X6Cp1Xd238eC2xS9IKWdHIV85YDhkMkUmpVQ00n278C65x");

interface CheckoutFormProps {
  onPaymentSuccess: () => void;
}

function formatCardNumber(value: string) {
  const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = val.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
}

function CheckoutForm({ onPaymentSuccess }: CheckoutFormProps) {
  const { countries } = useCountries();
  const [type, setType] = React.useState("card");
  const [email, setEmail] = React.useState("");
  const stripe = useStripe();
  const elements = useElements();

  // Handle Stripe payment
  const handleStripePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement!,
      billing_details: {
        email,
      },
    });

    if (error) {
      console.error(error);
    } else {
      console.log("Payment method created:", paymentMethod);
      // Call the onPaymentSuccess prop when payment is successful
      onPaymentSuccess();
    }
  };

  // Handle PayPal payment
  const handlePayPalPayment = (details: any, data: any) => {
    console.log("Transaction completed by", details.payer.name.given_name);
    // Call the onPaymentSuccess prop when payment is successful
    onPaymentSuccess();
  };

  return (
    <Card className="w-full max-w-[24rem]">
      <CardHeader
        color="gray"
        floated={false}
        shadow={false}
        className="m-0 grid place-items-center px-4 py-8 text-center"
      >
        <div className="mb-4 h-20 p-6 text-white">
          {type === "card" ? (
            <CreditCardIcon className="h-10 w-10 text-white" />
          ) : (
            <img
              alt="paypal "
              className="w-14 "
              src="https://docs.material-tailwind.com/icons/paypall.png"
            />
          )}
        </div>
        <Typography variant="h5" color="white">
          Material Tailwind PRO
        </Typography>
      </CardHeader>
      <CardBody>
        <Tabs value={type} className="overflow-visible">
          <TabsHeader className="relative z-0 ">
            <Tab value="card" onClick={() => setType("card")}>
              Pay with Card
            </Tab>
            <Tab value="paypal" onClick={() => setType("paypal")}>
              Pay with PayPal
            </Tab>
          </TabsHeader>
          <TabsBody
            className="!overflow-x-hidden !overflow-y-visible"
            animate={{
              initial: {
                x: type === "card" ? 400 : -400,
              },
              mount: {
                x: 0,
              },
              unmount: {
                x: type === "card" ? 400 : -400,
              },
            }}
          >
            <TabPanel value="card" className="p-0">
              <Elements stripe={stripePromise}>
                <form className="mt-12 flex flex-col gap-4" onSubmit={handleStripePayment}>
                  <div>
                    <Typography variant="small" color="blue-gray" className="mb-2 font-medium">
                      Your Email
                    </Typography>
                    <Input
                      type="email"
                      placeholder="name@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>

                  <div className="my-3">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 font-medium"
                    >
                      Card Details
                    </Typography>
                    <CardElement className=" !border-t-blue-gray-200 focus:!border-t-gray-900" />
                  </div>

                  <Button type="submit" size="lg" disabled={!stripe || !elements}>
                    Pay Now
                  </Button>
                  <Typography
                    variant="small"
                    color="gray"
                    className="mt-2 flex items-center justify-center gap-2 font-medium opacity-60"
                  >
                    <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Payments are secure and encrypted
                  </Typography>
                </form>
              </Elements>
            </TabPanel>

            <TabPanel value="paypal" className="p-0">
              <PayPalScriptProvider options={{ "client-id": "your-paypal-client-id-here" }}>
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: "10.00", // Replace with your amount
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      handlePayPalPayment(details, data);
                    });
                  }}
                />
              </PayPalScriptProvider>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </CardBody>
    </Card>
  );
}

export default CheckoutForm;
