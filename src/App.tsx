import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';
import 'antd/dist/antd.min.css';
import './App.scss';

import { ContactLists } from './pages';
import HomeLayout from './layouts/layout';

function App() {
    return (
        <Router>
            <HomeLayout>
                <Routes>
                    <Route path='/' element={<ContactLists />}></Route>
                </Routes>
            </HomeLayout>
        </Router>
    );
}

export default App;
