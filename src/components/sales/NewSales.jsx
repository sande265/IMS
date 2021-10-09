import ContentWrapper from "../../Layout/Main";
import { BasicInput } from "../../shared/tableComponents/form-elements";

const NewSales = (props) => {
    const links = [
        {
            name: 'New Sale'
        }
    ]
    return <ContentWrapper title="New Sale" links={links}>
        <div className="w-50 mx-auto d-flex align-items-center justify-content-center">
            <div className="card">
                <div className="card-body">
                    <BasicInput
                        label="Product ID"
                        name=""
                    />
                </div>
            </div>
        </div>
    </ContentWrapper>
}

export default NewSales;