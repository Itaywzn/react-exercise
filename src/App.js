import React, {useCallback, useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import './App.css';
import {Customers} from "./pages/Customers";
import {Packages} from "./pages/Packages";
import {AppMenu} from "./AppMenu";
import {getWeightFromText} from "./dataHelpers";
import {Invoices} from "./pages/Invoices";
import {CustomerInvoice} from "./pages/CustomerInvoice";


function App() {
    const [appData, setAppData] = useState({customers: [], packages: []});
    const [invoices, setInvoices] = useState({});
    const [newPackIdGen, setNewPackIdGen] = useState(1);

    const handleCustomerDelete = useCallback(
        (customerId) => {
            const filteredCustomers = appData.customers.filter(customer => customer.id !== customerId);
            setAppData({...appData, customers: filteredCustomers})
            const newInvoices ={...invoices}
            delete newInvoices[customerId]
            setInvoices(newInvoices)
    }, [appData,invoices])

    const handlePackageDelete = useCallback(
        (packageItem) => {
            const filteredPackages = appData.packages.filter(item => item.id !== packageItem.id);
            setAppData({...appData, packages:filteredPackages})
            const customerPackagesData = invoices[packageItem.customerid];
            customerPackagesData.packages = customerPackagesData.packages
                .filter(item => item.id !== packageItem.id);
            customerPackagesData.totalWeight -= getWeightFromText(packageItem.weight);
            customerPackagesData.totalPrice -= packageItem.price;
            setInvoices(invoices)
        }, [invoices, appData])

    const handlePackageAdd = useCallback(
        (pack) => {
            const packageItem = {...pack, id:`Npack${newPackIdGen}`}
            setNewPackIdGen((prev)=>prev+1)
            setAppData({...appData, packages:[...appData.packages, packageItem] })
            const newInvoices = {...invoices};
            const customerPackagesData =
                newInvoices[packageItem.customerid] || {customerName:packageItem.customerName,totalWeight: 0, totalPrice: 0,packages:[] };
            customerPackagesData.packages.push(packageItem);
            customerPackagesData.totalWeight += packageItem.weight;
            customerPackagesData.totalPrice += packageItem.price;
            newInvoices[packageItem.customerid] =customerPackagesData;
            setInvoices(newInvoices)
        }, [newPackIdGen, appData, invoices])

    const sortPackages = (packages) => {
       return packages.sort((a, b) => a.shippingOrder - b.shippingOrder);
    }

    const handlePackagesSortChange = useCallback(
        (oldVal, newVal) => {
            const {packages} = appData;
            const targetPackage = packages.find(item => item.shippingOrder=== oldVal);
            const replacementPackage = packages.find(item => item.shippingOrder=== newVal);
            targetPackage.shippingOrder = newVal;
            replacementPackage.shippingOrder = oldVal;
            const newPackages = sortPackages(packages);
            setAppData({...appData ,packages:newPackages})
        }
    , [appData])

    const [dataLoaded, setDataLoaded] = useState(false);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/data.json");
                const {packages,customers } = await response.json();
                const invoices = packages?.reduce((acc, item) => {
                    const customerInvoice = acc[item.customerid] || {customerName:'',totalWeight: 0, totalPrice: 0,packages:[] };
                    const packagesByCustomer = customerInvoice.packages;
                    packagesByCustomer.push(item);
                    if (!customerInvoice.customerName){
                        const customer =  customers.find((customer)=> customer.id === item.customerid)
                        customerInvoice.customerName = customer.name;
                    }
                    customerInvoice.packages = packagesByCustomer;
                    customerInvoice.totalWeight += getWeightFromText(item.weight);
                    customerInvoice.totalPrice += item.price;
                    acc[item.customerid] = customerInvoice;
                    return acc;
                }, {})
                setAppData({packages:sortPackages(packages) ,customers })
                setInvoices(invoices)
                setDataLoaded(true)
            } catch (e) {
                console.error(e)
            }

        }

        fetchData();
    }, [dataLoaded])
    if (!dataLoaded) return (<div style={{ marginLeft: '50%' }}>loading</div>)
    return (
        <div className="App">
            <Router>
                <AppMenu/>
                <Switch>
                    <Route exact path={'/customers'}
                           component={() => <Customers
                               customers={appData.customers}
                               onCustomerDelete={handleCustomerDelete}
                           />}
                    />
                    <Route exact path={'/packages'}
                           component={() => <Packages
                               onPackageDelete={handlePackageDelete}
                               onPackagesSortChange={handlePackagesSortChange}
                               packages={appData.packages}
                               customers={appData.customers}
                               invoicesByCustomerId={invoices}
                               onPackageAdd={handlePackageAdd}
                           />}
                    />
                    <Route exact path={'/invoices'}
                           component={() => <Invoices
                               invoices={invoices}
                           />}
                    />
                    <Route exact path={'/invoice/:customerId'}
                           component={() => <CustomerInvoice
                               invoices={invoices}
                               customers={appData.customers}
                           />}
                    />
                    <Route/>
                </Switch>
            </Router>
        </div>

    );
}

export default App;
