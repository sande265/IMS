import { UncontrolledTooltip } from 'reactstrap';

const ActionHeader = (props) => {
    let { options, onSubmit, onCancel, onReset, onBack, onCreate } = props;
    return <div className="ml-auto">
        {options && options.map((items, idx) => {
            if (items.includes('save')) {
                return <button className="btn btn-sm" onClick={onSubmit} id="save">
                    <i class="ri-save-line"></i>
                    <UncontrolledTooltip target="save" placement="bottom">
                        Save / Submit
                    </UncontrolledTooltip>
                </button>
            }
            if (items.includes('cancel')) {
                return <button className="btn btn-sm" onClick={onCancel} id="cancel">
                    <i class="ri-close-line"></i>
                    <UncontrolledTooltip target="cancel" placement="bottom">
                        Cancel
                    </UncontrolledTooltip>
                </button>
            }
            if (items.includes('reset')) {
                return <button className="btn btn-sm" onClick={onReset} id="reset">
                    <i class="ri-restart-line"></i>
                    <UncontrolledTooltip target="reset" placement="bottom">
                        Reset Form
                    </UncontrolledTooltip>
                </button>
            }
            if (items.includes('back')) {
                return <button className="btn btn-sm" onClick={onBack} id="back">
                    <i class="ri-arrow-go-back-line"></i>
                    <UncontrolledTooltip target="back" placement="bottom">
                        Go Back
                    </UncontrolledTooltip>
                </button>
            }
            if (items.includes('create')) {
                return <button className="btn btn-sm rounded-20 px-2 py-1" onClick={onCreate} id="create">
                    <i class="ri-add-fill"></i>
                    <UncontrolledTooltip target="create" placement="bottom">
                        Create New
                    </UncontrolledTooltip>
                </button>
            }
            else return false
        })}
    </div>
}

export default ActionHeader