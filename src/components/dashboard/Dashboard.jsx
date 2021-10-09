import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDailySales } from "../../actions/dashboard-actions";
import ContentWrapper from "../../Layout/Main";
import { Table } from "../../shared/tableComponents";

const Dashboard = (props) => {

    const { sales } = useSelector(state => ({
        sales: state.dashboard.sales
    }))
    const dispatch = useDispatch();
    const date = new Date().toISOString().split("T")[0]
    // const date = "2021-06-06"

    const [state, setState] = useState({
        data: {},
        total_amount: '',
        total_qty: '',
    })

    useEffect(() => {
        dispatch(getDailySales(date))
    }, [])

    useEffect(() => {
        if (sales) {
            setState(sales)
        }
    }, [sales])

    const { data, total_amount, total_qty } = state;

    console.log("state", state);

    return <ContentWrapper>
        <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-4">
                <div className="card card-success">
                    <div className="card-header with-border">Total Sale Today</div>
                    <div className="card-body align-items-center">
                        <span style={{ fontSize: 30 }}>Rs: </span>
                        <span className="float-right" style={{ fontSize: "30px", fontWeight: 900 }}>{total_amount ? total_amount : 0}</span>
                    </div>
                </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-3">
                <div className="card card-success">
                    <div className="card-header with-border">Total Sale Quantity</div>
                    <div className="card-body">
                        <div className="text-center" style={{ fontSize: "30px", fontWeight: 900 }}>{total_qty ? total_qty : 0}</div>
                    </div>
                </div>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-5">
                <div className="card card-success">
                    <div className="card-header with-border">Sold Items</div>
                    <div className="card-body">
                        <div className="table-wrapper">
                            <Table tableClass="table-hover w-100" columns={['name', 'qty', { name: "amount", alignment: 'right' }]}>
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
        </div>
    </ContentWrapper>
}

export default Dashboard;