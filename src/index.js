import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import Caffee from "./routes/Caffee";
import Restaurant from "./routes/Restaurant";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="caffee" element={<Caffee />} />
        <Route path="restaurant" element={<Restaurant />} />
        <Route path="*" element={
        <main style={{ padding: "1em" }}>
          <p>There's nothing here!</p>
        </main>
      }
    />
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
