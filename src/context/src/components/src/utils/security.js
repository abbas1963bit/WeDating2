	
	
أنا
const bytesToHex = (buf) =>
  Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

const hexToBytes = (hex) =>
  new Uint8Array((hex.match(/.{2}/g) || []).map((h) => parseInt(h, 16)));

const deriveBits = async (password, saltBytes) => {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  return crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: saltBytes, iterations: 310000, hash: 'SHA-256' },
    key,
    256
  );
};

export const hashPassword = async (password) => {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const bits = await deriveBits(password, salt);
  return `${bytesToHex(salt)}:${bytesToHex(bits)}`;
};

export const verifyPassword = async (password, stored) => {
  if (typeof stored !== 'string') return false;
  const [saltHex, hashHex] = stored.split(':');
  if (!saltHex || !hashHex) return false;
  const bits = await deriveBits(password, hexToBytes(saltHex));
  return bytesToHex(bits) === hashHex;
};

export const validateEmail = (email) => {
  if (typeof email !== 'string') return false;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
};

export const sanitizeInput = (str) => {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

