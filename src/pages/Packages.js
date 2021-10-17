import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import React, {useCallback, useState} from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {AddPackageModal} from "./AddPackageModal";

export function Packages({
                            packages,
                            onPackagesSortChange,
                            invoicesByCustomerId,
                            onPackageDelete,
                            customers,
                            onPackageAdd}) {
    const [addPackageOpen, setAddPackageOpen] = useState(false)
    const handleClosePackageModal = useCallback(()=>{
        setAddPackageOpen(false)
    },[])
    const handlePackageAdd = useCallback((item)=>{
        onPackageAdd(item)
    },[onPackageAdd])
    return <>
        <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>id</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell>Price</TableCell>

                    <TableCell>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={()=>setAddPackageOpen(true)}
                        >
                            <AddIcon/>
                        </IconButton></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {packages.map((row, index) => {
                    const customer = invoicesByCustomerId[row.customerid];
                    return (
                        <TableRow
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            key={row.id}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell>{customer?.customerName || 'deleted customer'}</TableCell>

                            <TableCell> {row.weight}</TableCell>
                            <TableCell>{row.price}</TableCell>
                            <TableCell>
                                {customer && <Button variant="contained" onClick={() => onPackageDelete(row)}>Delete</Button>}
                                {index !== 0 ? <IconButton
                                    onClick={() => onPackagesSortChange(row.shippingOrder, row.shippingOrder - 1)}
                                >
                                    <ArrowUpwardIcon/>
                                </IconButton>: <div style={{display:'inline-block',width:'40px'}}/>}
                                {index !== packages.length-1 && <IconButton
                                    onClick={() => onPackagesSortChange(row.shippingOrder, row.shippingOrder + 1)}
                                >
                                    <ArrowDownwardIcon/>
                                </IconButton>}
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    </TableContainer>
    <AddPackageModal
        customers={customers}
        open={addPackageOpen}
        onCancel={handleClosePackageModal}
        onConfirm={handlePackageAdd}
        packages={packages}
    />
    </>;
}
