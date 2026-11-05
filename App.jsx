import { useContext } from 'react';
import { LangContext } from './src/context/LangContext.jsx';
import ChatBox from './src/components/ChatBox.jsx';
import AdminPanel from './src/components/AdminPanel.jsx';

function App() {
  const { t } = useContext(LangContext);
  return (
    <div className="app">
      <h1>{t?.appTitle || 'WeDating'}</h1>
      <ChatBox />
      <AdminPanel />
    </div>
  );
}

export default App;

