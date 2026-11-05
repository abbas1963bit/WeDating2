import { useState, useContext } from 'react';
import { LangContext } from '../context/LangContext.jsx';

export default function ChatBox() {
  const { t } = useContext(LangContext);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;
    setMessages([...messages, { text: trimmed, sender: 'user' }]);
    setInputText('');
  };

  return (
    <div className="chat-box">
      <div className="chat-header">
        <h4>{t?.chat || 'الدردشة'}</h4>
      </div>
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="chat-form">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t?.typeMessage || 'اكتب رسالة'}
        />
        <button type="submit">{t?.send || 'إرسال'}</button>
      </form>
    </div>
  );
}

