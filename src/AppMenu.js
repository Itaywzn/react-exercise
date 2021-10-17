import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import React, {useCallback, useState} from "react";
import {Drawer, ListItem, ListItemText} from "@mui/material";
import List from "@mui/material/List";
import {Link} from "react-router-dom";
import {useLocationChangeCallback} from "./customHooks/useLocationChangeCallback";

const routes =
    [{to: '/customers', label: 'Customers'},
    {to: '/packages', label: 'Packages'},
    {to: '/invoices', label: 'Invoices'},]

export function AppMenu() {
    const [menuOpen, setMenuOpen] = useState(false);
    const invertMenuState = useCallback(() => setMenuOpen((prevState => !prevState)), [])
    const closeMenu = useCallback(() => setMenuOpen(false), [])
    useLocationChangeCallback(closeMenu)
    return <>  <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}
                    onClick={invertMenuState}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    Mail Delivery Service
                </Typography>

            </Toolbar>
        </AppBar>
    </Box>
        <Drawer
            anchor={"left"}
            open={menuOpen}
            onClose={invertMenuState}
        >
            <List style={{width: "300px"}}>
                {routes.map((route, index) => (<ListItem key={index} to={route.to} component={Link} button>
                    <ListItemText primary={route.label}/>
                </ListItem>))}
            </List>
        </Drawer>
    </>
}