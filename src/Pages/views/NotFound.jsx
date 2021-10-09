import BasicLayout from "../../Layout/BasicLayout";

const NotFound = (props) => {
    return <BasicLayout>
        <div className="content">
            <div>
                <h1 className="font-bold text-center">404 Not Found</h1>
                <button className="btn btn-primary text-center" onClick={() => props.history.goBack()}>Go Back</button>
            </div>
        </div>
    </BasicLayout>
}

export default NotFound