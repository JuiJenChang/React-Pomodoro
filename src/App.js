import { useState } from 'react';
import './App.css';
import SettingsContext from './components/SettingsContext';
import Settings from './components/Settings';
import Timer from './components/Timer';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakminutes, setBreakminutes] = useState(5);
  
  return (
    <main>
      <SettingsContext.Provider value={{
        workMinutes,
        breakminutes,
        showSettings,
        setWorkMinutes,
        setBreakminutes,
        setShowSettings
      }}>
        {showSettings ? <Settings /> : <Timer /> }
      </SettingsContext.Provider>
    </main>
  )
}

export default App;
