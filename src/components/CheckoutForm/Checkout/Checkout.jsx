import React, { useState , useEffect } from 'react'
import useStyle from './styles'
import {Paper , Stepper , Step , Typography , CircularProgress , Divider , Button, StepLabel} from '@material-ui/core'
import AdressForm from '../AdressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
const steps=['Shipping adress' , 'Payment details'];

const Checkout = ({cart}) => {
    
    const [checkoutToken , setCheckoutToken] = useState(null);
    const [activeStep ,setActiveStep] = useState(0);
    const [shippingData , setShippingData] = useState({});
    const classes=useStyle();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id , {type: 'cart'})
                   
                setCheckoutToken(token)
            }catch(error){

            }
        }
        generateToken();
    }, [cart]);

    const nextStep = () => setActiveStep((prevActiveStep) =>prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) =>prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    const Confirmation = () => (
        <div>Confirmation</div>
    )

    const Form = () => activeStep === 0
    ? <AdressForm checkoutToken={checkoutToken} next={next}/>
    : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} />

  return (
  <>
    <div className={classes.toolbar}/>
    <main className={classes.layout}>
    <Paper className={classes.paper}>
        <Typography variant="h4" align='center'>Checkout</Typography>
        <Stepper activeStep={activeStep} className={classes.Stepper}>
            {steps.map((step)=>(
                <Step key={step}>
                    <StepLabel>{step}</StepLabel>
                </Step>
            ))}
        </Stepper>
        {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}

    </Paper>

    </main>
  </>
  )
}

export default Checkout
