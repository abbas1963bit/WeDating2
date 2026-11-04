import React, { useState } from 'react';
import { validateEmail, sanitizeInput } from '../utils/security.js';

export function AdminPanel() {
  const [userList, setUserList] = useState([
    { id: 1, name: 'سارة', email: 'sara@example.com', status: 'active' },
    { id: 2, name: 'علي', email: 'ali@example.com', status: 'banned' }
  ]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [errorMsg, setErrorMsg] = useState('');

  const addUser = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const cleanName = sanitizeInput(newUser.name.trim());
    const cleanEmail = sanitizeInput(newUser.email.trim());

    if (!cleanName || !cleanEmail) {
      setErrorMsg('املأ جميع الحقول');
      return;
    }
    if (!validateEmail(cleanEmail)) {
      setErrorMsg('البريد الإلكتروني غير صالح');
      return;
    }

    setUserList([
      ...userList,
      {
        id: Date.now(),
        name: cleanName,
        email: cleanEmail,
        status: 'active'
      }
    ]);
    setNewUser({ name: '', email: '' });
  };

  const toggleBan = (userId) => {
    setUserList(
      userList.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === 'active' ? 'banned' : 'active' }
          : u
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">لوحة الإدارة</h1>

      <form onSubmit={addUser} className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-3">إضافة مستخدم جديد</h2>
        {errorMsg && <p className="text-red-500 mb-3">{errorMsg}</p>}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="اسم المستخدم"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-pink-500 text-white px-5 py-2 rounded hover:bg-pink-600"
        >
          إضافة
        </button>
      </form>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">الاسم</th>
              <th className="p-3 text-left">البريد</th>
              <th className="p-3 text-left">الحالة</th>
              <th className="p-3 text-left">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.id} className="border-t">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  {user.status === 'active' ? (
                    <span className="text-green-600">نشط</span>
                  ) : (
                    <span className="text-red-500">محظور</span>
                  )}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => toggleBan(user.id)}
                    className={`px-3 py-1 rounded text-white text-sm ${
                      user.status === 'active' ? 'bg-red-500' : 'bg-green-500'
                    }`}
                  >
                    {user.status === 'active' ? 'حظر' : 'إلغاء الحظر'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

