import {Dialog, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import * as Yup from 'yup';
import { Formik } from 'formik';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export function AddPackageModal({onCancel, open, onConfirm, customers,packages}){
    return (
        <Dialog
            maxWidth="sm"
            fullWidth
            onClose={onCancel}
            open={open}
        >
            {open && (
                <Formik
                    initialValues={{
                        customer: '',
                        weight: '',
                        price: ''
                    }}
                    validateOnBlur={false}
                    validationSchema={Yup.object().shape({
                        customer: Yup.object().required(),
                        weight: Yup.number().required(),
                        price: Yup.number().required()
                    })}
                    onSubmit={(values, {
                        setErrors,
                        setStatus,
                        setSubmitting
                    }) => {
                        try {
                            const {price, weight, customer} = values
                            const data = {
                                price,
                                weight,
                                customerid: customer.id,
                                customerName: customer.name,
                                shippingOrder:packages.length + 1
                            };
                            onConfirm(data);
                            setStatus({ success: true });
                            setSubmitting(false);
                        } catch (error) {
                            setStatus({ success: false });
                            setErrors({ submit: error.message });
                            setSubmitting(false);

                        }
                    }}
                >
                    {({
                          errors,
                          handleBlur,
                          handleChange,
                          handleSubmit,
                          isSubmitting,
                          touched,
                          values
                      }) => (
                        <form onSubmit={handleSubmit}>

                            <Box p={3}>
                                <Typography
                                    align="center"
                                    gutterBottom
                                    variant="h3"
                                    color="textPrimary"
                                >
                                    New Package
                                </Typography>
                            </Box>
                            <Divider />
                            <Box p={3}>
                                <Box mt={2}>
                                    <TextField
                                        autoFocus
                                        error={Boolean(touched.price && errors.price)}
                                        fullWidth
                                        helperText={touched.price && errors.price}
                                        label="Price"
                                        name="price"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.price}
                                        variant="outlined"
                                        type="number"
                                    />
                                </Box>
                                <Box mt={2}>
                                    <TextField
                                        error={Boolean(touched.weight && errors.weight)}
                                        fullWidth
                                        helperText={touched.weight && errors.weight}
                                        label="Weight"
                                        name="weight"
                                        type="number"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.password}
                                        variant="outlined"
                                    />
                                </Box>
                                <Box mt={2}>
                                    <FormControl
                                        error={Boolean(touched.customer && errors.customer)}
                                        fullWidth
                                        variant="outlined">
                                        <InputLabel >Customer</InputLabel>
                                        <Select
                                            label="Weight"
                                            name="customer"
                                            onBlur={handleBlur}
                                            value={values.customer}
                                            onChange={handleChange}
                                        >
                                            {customers.map(customer=>
                                                <MenuItem key={customer.id} value={customer}>{customer.name}</MenuItem>)}
                                        </Select>
                                        {touched.customer && errors.customer &&<FormHelperText> {errors.customer}</FormHelperText>}
                                    </FormControl>
                                </Box>
                            </Box>
                            <Divider />
                            <Box
                                p={2}
                                display="flex"
                                alignItems="center"
                            >
                                <Box flexGrow={1} />
                                    <Button onClick={onCancel} >
                                        Cancel
                                    </Button>

                                <Button
                                    variant="contained"
                                    type="submit"
                                    disabled={isSubmitting}
                                    color="secondary"
                                >
                                    Confirm
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            )}
        </Dialog>
    )
}
