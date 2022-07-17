import {Route, Routes, Navigate} from "react-router-dom";

import HomePage from "./pages/Home-page";

function App() {
    return (
        <Routes>
            <Route path={''} element={<HomePage/>}/>
            <Route path={'/:id'} element={<HomePage/>}/>
            <Route path={'*'} element={<Navigate to=""/>}/>
        </Routes>
    );
}

export default App;
