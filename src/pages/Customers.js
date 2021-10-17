import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import React from "react";
import {useHistory} from "react-router-dom";

export function Customers({customers, onCustomerDelete}) {
    const history = useHistory()
    return <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
                <TableRow>

                    <TableCell>id</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>

                </TableRow>
            </TableHead>
            <TableBody>
                {customers.map((row) => {

                    return (
                        <TableRow
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            key={row.id}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell><Button onClick={()=>history.push(`/invoice/${row.id}`)} variant="contained">Create Invoice</Button></TableCell>
                            <TableCell><Button onClick={() => onCustomerDelete(row.id)}
                                               variant="contained">Delete</Button></TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    </TableContainer>;
}