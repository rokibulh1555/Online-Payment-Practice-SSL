import {BrowserRouter, Route, Routes} from "react-router-dom";
import Checkout from "./Pages/Checkout.jsx";
import Success from "./Pages/Success.jsx";
import Fail from "./Pages/Fail.jsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} Component={Checkout} />
                <Route path={'/success'} Component={Success} />
                <Route path={'fail'} Component={Fail} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;