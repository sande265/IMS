import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { clearAlerts } from "../actions/alert-actions";
import SnackbarMessages from "../shared/SnackbarMessages";

const BasicLayout = ({ component: Component, children, title, ...rest }) => {

    const [showSnackbar, setShowSnackbar] = useState(false)

    const { alerts } = useSelector(state => ({
        alerts: state.alerts,
    }), shallowEqual);
    const dispatch = useDispatch()

    useEffect(() => {
        setShowSnackbar(alerts && alerts.showSnackbar)
    }, [alerts])

    const handleSnackbar = () => {
        dispatch(clearAlerts())
        setShowSnackbar(!showSnackbar)
    }
    return (
        <>
            {(alerts.type === "success" || alerts.type === "error") && showSnackbar && (
                <SnackbarMessages
                    message={alerts.message}
                    variant={alerts.type}
                    duration={6000}
                    handleClose={e => handleSnackbar(e)}
                    open={showSnackbar}
                />
            )}
            {Component && <Component {...rest} />}
            {children}
        </>
    )
}

export default BasicLayout;