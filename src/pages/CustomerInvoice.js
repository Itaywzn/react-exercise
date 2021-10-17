import {Box, TableFooter, Typography} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import React from "react";
import {Redirect, useParams} from "react-router-dom";

function generateUuid() {
    // taken from stackoverflow
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

export function CustomerInvoice({customers, invoices}) {
    const {customerId} = useParams();
    if (!customerId) return <Redirect to={'/customers'} />
    const invoice = invoices[customerId];
    if (!invoice?.packages?.length) {
        const customer = customers.find(customer=> customer.id == customerId);
        return <Typography variant={'h3'}>{customer?.name} has no packages</Typography>
    }
    return <Box m={10}>
        <Box display={'flex'} justifyContent={'space-around'}>
            <Box display={'flex'} flexDirection={'column'}>
                {new Date().toLocaleDateString()}
                <br/>
                {invoice.customerName}
            </Box>
            <Box flexDirection={'column'} display={"flex"} >
                <Typography variant={'h5'}>Invoice</Typography>
                <Typography variant={'text'}>{`${generateUuid()}`}</Typography>
            </Box>
        </Box>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Weight</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.values(invoice.packages).map((row) => {
console.log(row)
                        return (
                            <TableRow
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.weight}</TableCell>
                                <TableCell>{row.price}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
                <TableFooter>
                    <TableCell><Typography variant='h6'>Total</Typography></TableCell>
                    <TableCell>{invoice.totalWeight}</TableCell>
                    <TableCell>{invoice.totalPrice}</TableCell>
                </TableFooter>
            </Table>
        </TableContainer>
        <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
            <Typography>You received {invoice.packages.length} packages</Typography>
            <Typography>Thank you for using our services</Typography>
        </Box>
    </Box>
}