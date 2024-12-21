export function getEmailState() {
  if (typeof window === 'undefined') {
    return { read: new Set(), favorites: new Set() };
  }

  const read = new Set(JSON.parse(localStorage.getItem('readEmails') || '[]'));
  const favorites = new Set(JSON.parse(localStorage.getItem('favoriteEmails') || '[]'));
  
  return { read, favorites };
}

export function saveEmailState(state) {
  localStorage.setItem('readEmails', JSON.stringify([...state.read]));
  localStorage.setItem('favoriteEmails', JSON.stringify([...state.favorites]));
}

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(date);
}

