import React, {useState} from "react";
import {Redirect, useParams} from "react-router-dom";
import {Box, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";


function generateInvoiceID() {
    return Math.floor(Math.random() * 10000)
}

const useStyles = makeStyles({
    row:{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 200px',
    },
    cell:{
        textAlign:"left",
        minWidth:'100px',
    },
    priceCell:{
        paddingLeft:'16px',
        backgroundColor:"#dddddd"
    },
    container:{
        height:'330px',
        display: 'grid',
        gridTemplateRows: ({packagesLen})=>`50px repeat(${packagesLen},50px) auto`,
    }
})

export function CustomerInvoice({customers, invoices}) {
    const {customerId} = useParams();
    const invoice = invoices[customerId];
    const classes = useStyles({packagesLen: invoice?.packages?.length});
    const [invoiceId, setInvoiceID] = useState(generateInvoiceID);
    if (!customerId) return <Redirect to={'/customers'}/>
    if (!invoice?.packages?.length) {
        const customer = customers.find(customer => customer.id == customerId);
        return <Typography variant={'h3'}>{customer?.name} has no packages</Typography>
    }
    return <Box  m={10} mb={0}>
        <Box display={'flex'} m={4} mb={6} justifyContent={'space-between'} alignItems={"flex-start"} >
            <Box display={'flex'} textAlign={"left"} flexDirection={'column'}>
                {new Date().toLocaleDateString()}
                <br/>
                {invoice.customerName}
            </Box>
            <Box textAlign={"left"} flexDirection={'column'} display={"flex"}>
                <Typography variant={'h5'}>Invoice</Typography>
                <Typography variant={'text'}>{`No.${invoiceId}`}</Typography>
            </Box>
        </Box>

        <Box className={classes.container} >

            <Box height={'50px'} className={classes.row} >
                <Box  className={classes.cell}><Typography variant='h6'>ID</Typography></Box>
                <Box className={classes.cell}><Typography variant='h6'>Weight</Typography></Box>
                <Box className={`${classes.cell} ${classes.priceCell}`}><Typography variant='h6'>Price</Typography></Box>
            </Box>
                {Object.values(invoice.packages).map((row) => {
                    console.log(row)
                    return (
                        <Box className={classes.row}
                        >
                            <Box className={classes.cell}>{row.id}</Box>
                            <Box className={classes.cell}>{row.weight}</Box>
                            <Box className={`${classes.cell} ${classes.priceCell}`}>{row.price}$</Box>
                        </Box>
                    )
                })}
            <Box className={classes.row}>
                <Box  className={classes.cell}></Box>
                <Box display={"flex"} alignItems={"flex-end"} className={classes.cell} >{invoice.totalWeight}kg</Box>
                <Box display={"flex"} alignItems={"flex-end"}  className={`${classes.cell} ${classes.priceCell}`} ><Typography variant='h5'>Total: {invoice.totalPrice}$</Typography></Box>
            </Box>
        </Box>
        <Box display={'flex'} mt={6} alignItems={'center'} flexDirection={'column'}>
            <Typography>You received {invoice.packages.length} packages</Typography>
            <Typography>Thank you for using our services</Typography>
        </Box>
    </Box>
}