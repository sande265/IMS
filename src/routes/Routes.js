import { isAuthenticated } from "../helpers/GeneralHelpers"
import BasicLayout from "../Layout/BasicLayout"
import PrivateRoute from "../Layout/PrivateRoute"
import PublicRoute from "../Layout/PublicRoute"
import Login from "../Pages/auth/Login"
import { Route, Switch, useHistory } from "react-router"
import {
    Inventory, NewEditInventory, Customers, NewEditCustomers, Vendors, NewEditVendors, Dashboard, SalesReport,
    Categories, NewEditCategory, NewSales, Profile, Debtors, NewEditDebtors
} from "../components"
import DefaultLayout from "../Layout/DefaultLayout"
import NotFound from '../Pages/views/NotFound';

const Routes = (props) => {
    const history = useHistory();
    if (history.location.pathname === '/')
        history.push('/dashboard')
    return <Switch>
        <Route exact path={["/login"]}>
            <BasicLayout>
                <PublicRoute restricted={true} exact path="/login" component={Login} />
            </BasicLayout>
        </Route>

        <Route path={[
            "/dashboard", "/profile", "/inventories", "/inventory/new", "/inventory/:id", "/customers", '/customer/new', '/customers/:id',
            "/vendors", "/vendors/:id/edit", "/sales-report", '/categories', '/category/new', '/category/:id/edit', "/new-sale", "/debtors",
            "/debtors/:id/edit", "/debtors/new", "/debtors/history", "/debtors/payment"
        ]}>
            <DefaultLayout>
                <PrivateRoute type="private" component={() => {
                    return <>
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/inventories" component={Inventory} />
                        <Route exact path="/inventory/new" component={NewEditInventory} />
                        <Route exact path="/inventory/:id/edit" component={NewEditInventory} />
                        <Route exact path="/customers" component={Customers} />
                        <Route exact path="/customers/new" component={NewEditCustomers} />
                        <Route exact path="/customers/:id/edit" component={NewEditCustomers} />
                        <Route exact path="/vendors" component={Vendors} />
                        <Route exact path="/vendors/:id/edit" component={NewEditVendors} />
                        <Route exact path="/new-sale" component={NewSales} />
                        <Route exact path="/sales-report" component={SalesReport} />
                        <Route exact path="/categories" component={Categories} />
                        <Route exact path="/category/new" component={NewEditCategory} />
                        <Route exact path="/category/:id/edit" component={NewEditCategory} />
                        <Route exact path="/debtors" component={Debtors} />
                        <Route exact path="/debtors/new" component={NewEditDebtors} />
                        <Route exact path="/debtors/:id/edit" component={NewEditDebtors} />
                    </>
                }} />
            </DefaultLayout>
        </Route>

        <Route component={NotFound} />
        {isAuthenticated() ? history.push({ pathname: history.location.pathname }) : history.push("/login")}
    </Switch>
}

export default Routes