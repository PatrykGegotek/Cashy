import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import NavigationBar from "./components/NavigationBar";
import NewTransaction from "./components/NewTransaction";
import History from "./components/History";

function App() {
    return (<>
            <div className="main-background">
                <NavigationBar />
                <div className="main-content">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/history" element={<History />} />
                            <Route path="/new-income" element={<NewTransaction isExpense={false}/>} />
                            <Route path="/new-expense" element={<NewTransaction isExpense={true}/>} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);