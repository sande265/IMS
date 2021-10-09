import { history } from "./helpers/GeneralHelpers";
import { Router } from "react-router-dom";
import Routes from "./routes/Routes";
import "./assets/css/nucleo-icons.css";
import "./assets/scss/style.scss";
import "./assets/demo/demo.css";
// import './styles/adminlte.css'
import './styles/custom.css'

const App = () => {
    return <Router history={history}>
        <Routes />
    </Router>
}

export default App;