import { QRCode } from "react-qr-svg";

const ProductInfo = (props) => {
    let { width, value } = props;
    return (
        <QRCode
            bgColor="#FFFFFF"
            fgColor="#000000"
            level="Q"
            style={{ width: width ? width : 'auto', height: 'auto', maxHeight: '256px' }}
            value={value}
        />
    )
}

export default ProductInfo;