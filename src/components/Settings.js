import { useContext } from "react";
import SettingsContext from "./SettingsContext";

const Settings = () => {
  const settingsInfo = useContext(SettingsContext)

  return (
    <div className="container settings-container">
      <div className="settings">
        <div className="content">
          <label>Work: {settingsInfo.workMinutes} minutes</label>
          <input
            type="number"
            value={settingsInfo.workMinutes}
            onChange={e => settingsInfo.setWorkMinutes(e.target.value < 1 ? 1 : e.target.value)}
            min='1'
            max='50'
          />
        </div>
        <div className="content">
          <label>Break: {settingsInfo.breakminutes} minutes</label>
          <input
            type="number"
            value={settingsInfo.breakminutes}
            onChange={e => settingsInfo.setBreakminutes(e.target.value < 1 ? 1 : e.target.value)}
            min='1'
            max='15'
          />
        </div>
      </div>
      <button className="back" onClick={() => {settingsInfo.setShowSettings(false)}}>Back</button>
    </div>
  )
}

export default Settings;