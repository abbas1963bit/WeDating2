import { useContext } from 'react';
import { LangContext } from './src/context/LangContext.jsx';
import { ChatBox } from './src/components/ChatBox.jsx';
import { AdminPanel } from './src/pages/AdminPanel.jsx';

function App() {
  const { t, currentLang } = useContext(LangContext);

  return (
    <div className="app" dir={['ar','fa','ur','he'].includes(currentLang) ? 'rtl' : 'ltr'}>
      <header>
        <h1>{t('siteTitle')}</h1>
      </header>
      <main>
        <section className="chat-section">
          <ChatBox recipient={{name:"مستخدم"}} messages={[]} onSendMessage={()=>{}} />
        </section>
        <section className="admin-section">
          <AdminPanel />
        </section>
      </main>
    </div>
  );
}

export default App;

