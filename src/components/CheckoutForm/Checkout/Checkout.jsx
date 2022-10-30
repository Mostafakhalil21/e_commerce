import React, { useState , useEffect } from 'react'
import useStyle from './styles'
import {Paper , Stepper , CssBaseline, Step , Typography , CircularProgress , Divider , Button, StepLabel} from '@material-ui/core'
import AdressForm from '../AdressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import { Link , useNavigate } from 'react-router-dom';
const steps=['Shipping adress' , 'Payment details'];


const Checkout = ({cart , order ,onCaptureCheckout,error}) => {
    
    const [checkoutToken , setCheckoutToken] = useState(null);
    const [activeStep ,setActiveStep] = useState(0);
    const [shippingData , setShippingData] = useState({});
    const navigate = useNavigate()
    const classes=useStyle();

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id , {type: 'cart'})
                   
                setCheckoutToken(token)
            }catch(error){
                // navigate('/')
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


    let Confirmation = () => order.customer ?(
        <>
            <div>
                <Typography variant='h5'>Thank you for your purachse , {order.customer.firstname} {order.customer.lastname}</Typography>
                <Divider className={classes.divider} />
                <Typography variant='subtitle2'>Order ref :{order.customer_reference}</Typography>

            </div>
            <br />
            <Button component={Link} to="/" variant='outlined' type="button" >Back to Home</Button>
        </>
    ) : (<div className={classes.spinner}>
        <CircularProgress />
    </div>
    )
    if(error){
        <>
            <Typography variant='h5'>Error:{error}</Typography>
            <br />
            <Button component={Link} to="/" variant='outlined' type="button" >Back to Home</Button>

        </>
    }
    const Form = () => activeStep === 0
    ? <AdressForm checkoutToken={checkoutToken} next={next}/>
    : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} nextStep={nextStep}  backStep={backStep} onCaptureCheckout={onCaptureCheckout} />

  return (
  <>
  <CssBaseline />
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
