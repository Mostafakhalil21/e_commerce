import React from "react";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from './style'

const products = [
    {id:1, name:'shoes', description: 'Running shoes' , price:'$5' , image:'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,b_rgb:f5f5f5/ed291e67-4618-49ec-8dda-2c2221a5df41/revolution-6-next-nature-road-running-shoes-JQzLqf.png' },
    {id:2, name:'Macbook', description: 'Apple macbook' , price:'$10' , image:'https://www.apple.com/v/macbook-pro-14-and-16/b/images/overview/hero/hero_intro_endframe__e6khcva4hkeq_large.jpg' }
]


const Products = ({products , onAddToCart}) => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
    <div className={classes.toolbar}/>
        <Grid container justifyContent="center" spacing={4}>
            {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Product product={product} onAddToCart={onAddToCart}/>
                </Grid>
            ))}
        </Grid>
    </main>
  )
}

export default Products
