import { Route, Routes } from 'react-router-dom';
import './App.css';
import InputPage from './components/InputPage';
import DataPage from './components/DataPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<InputPage />} />
      <Route path='/:location' element={<DataPage />} />
    </Routes>
  );
}

export default App;
