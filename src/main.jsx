import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const PersonalWeatherComponent = lazy(
  () => import('./components/PersonalWheather/PersonalWheather.jsx')
);
const LocalForecastComponent = lazy(() => import('./components/LocalForecast/LocalForecast.jsx'));
const CitiesComponent = lazy(() => import('./components/CitiesComponent/CitiesComponent.jsx'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route
            index
            element={
              <React.Suspense fallback={<h2>Cargando datos...</h2>}>
                <PersonalWeatherComponent />
              </React.Suspense>
            }
          />
          <Route
            path="/localforecast"
            element={
              <React.Suspense fallback={<h2>Cargando datos...</h2>}>
                <LocalForecastComponent />
              </React.Suspense>
            }
          />
          <Route
            path="/cities"
            element={
              <React.Suspense fallback={<h2>Cargando datos...</h2>}>
                <CitiesComponent />
              </React.Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
