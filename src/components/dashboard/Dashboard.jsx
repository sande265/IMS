import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getDailySales} from "../../actions/dashboard-actions";
import ContentWrapper from "../../Layout/Main";
import {Table} from "../../shared/tableComponents";

const Dashboard = (props) => {

    const d = props.location?.search?.split("date")[1]?.replace("=", "")

    const {sales, sales_err} = useSelector(state => ({
        sales: state.dashboard.sales,
        sales_err: state.dashboard.error
    }))
    const dispatch = useDispatch();
    const date = d ? d : new Date().toISOString().split("T")[0]
    // const date = "2021-06-06"

    console.log("d", d);
    console.log("props", props);

    const [state, setState] = useState({
        data: {},
        total_amount: '',
        total_qty: '',
    })

    useEffect(() => {
        props.history.push({
            pathname: props.location.pathname,
            search: props.location.search
        })
    }, [])

    useEffect(() => {
        dispatch(getDailySales(date))
    }, [])

    useEffect(() => {
        if (sales) {
            setState(sales)
        } else if (sales_err?.status === 400) {
          setState(sales_err.data)
     }
    }, [sales])

    const {data, total_amount, total_qty, monthly_total} = state;

    return <ContentWrapper>
        <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-4">
                <div className="card " style={{borderRadius: '8px 50px 8px 8px'}}>
                    <div className="card-header with-border">Total Sale Today</div>
                    <div className="card-body align-items-center">
                        <span style={{fontSize: 30}}>Rs: </span>
                        <span className="float-right" style={{fontSize: "30px", fontWeight: 900}}>{total_amount ? total_amount : 0}</span>
                    </div>
                </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3">
                <div className="card " style={{borderRadius: '8px 50px 8px 8px'}}>
                    <div className="card-header with-border">Total Quantity Sold</div>
                    <div className="card-body">
                        <div className="text-center" style={{fontSize: "30px", fontWeight: 900}}>{total_qty ? total_qty : 0}</div>
                    </div>
                </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-5">
                <div className="card " style={{borderRadius: '8px 50px 8px 8px'}}>
                    <div className="card-header with-border">Sold Items</div>
                    <div className="card-body">
                        <div className="table-wrapper">
                            <Table tableClass="table-hover w-100" columns={['name', 'qty', {name: "amount", alignment: 'right'}]}>
                                {data && data.length > 0 ? data.map(item => {
                                    return <tr>
                                        <td>{item.product_name}</td>
                                        <td>{item.qty}</td>
                                        <td className="text-right">{item.sale_price && item.qty ? (item.sale_price * item.qty) : 0}</td>
                                    </tr>
                                }) : <tr className="text-center">
                                    <td colSpan="10">No Records</td>
                                </tr>}
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-4">
                <div className="card " style={{borderRadius: '8px 50px 8px 8px'}}>
                    <div className="card-header with-border">Monthlty Sales</div>
                    <div className="card-body align-items-center">
                        <span style={{fontSize: 30}}>Rs: </span>
                        <span className="float-right" style={{fontSize: "30px", fontWeight: 900}}>{monthly_total ? monthly_total : 0}</span>
                    </div>
                </div>
            </div>
        </div>
    </ContentWrapper>
}

export default Dashboard;
