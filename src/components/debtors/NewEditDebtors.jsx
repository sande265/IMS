import ContentWrapper from "../../Layout/Main";

const NewEditDebtors = (props) => {
    let {id} = props.match.params;
    return <ContentWrapper>
        Hello From Debtors Edit {id}
    </ContentWrapper>
}

export default NewEditDebtors