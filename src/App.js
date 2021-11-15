import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import "./assets/css/nucleo-icons.css";
import "./assets/scss/style.scss";
import "./assets/demo/demo.css";
import './styles/custom.scss'

const App = () => {
    return <BrowserRouter>
        <Routes />
    </BrowserRouter>
}

export default App;