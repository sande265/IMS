import {BrowserRouter} from "react-router-dom";
import Routes from "./routes/Routes";
import "./assets/scss/style.scss";
import './styles/custom.scss'

const App = () => {
    return <BrowserRouter>
        <Routes />
    </BrowserRouter>
}

export default App;