import { useContext } from 'react';
import { LangContext } from '../context/LangContext.jsx';

export default function AdminPanel() {
  const { t } = useContext(LangContext);

  return (
    <div className="admin-panel">
      <h2>{t?.adminTitle || 'لوحة الإدارة'}</h2>
      <div className="admin-stats">
        <div className="stat-item">
          <span>{t?.usersCount || 'عدد المستخدمين'}</span>
        </div>
        <div className="stat-item">
          <span>{t?.activeChats || 'المحادثات النشطة'}</span>
        </div>
      </div>
    </div>
  );
}

