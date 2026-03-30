import {BrowserRouter, Route, Routes} from "react-router-dom";
import Checkout from "./Pages/Checkout.jsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} Component={Checkout} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;