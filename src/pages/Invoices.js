import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import React from "react";

export function Invoices({invoices}) {
    return <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Total Weight</TableCell>
                    <TableCell>Total Price</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.values(invoices).map((row) => {

                    return (
                        row.packages?.length > 0 &&
                        <TableRow
                            key={row.customerName}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell>{row.customerName}</TableCell>
                            <TableCell>{`${row.totalWeight}kg`}</TableCell>
                            <TableCell>{row.totalPrice}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    </TableContainer>;
}
