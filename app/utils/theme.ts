export const loadTheme = () => {
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme === 'dark' || (savedTheme === 'system' && prefersDark) ? 'dark' : 'light';
  }
  return 'light';
};

export const setTheme = (theme: 'light' | 'dark') => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
};

export const initTheme = () => {
  const theme = loadTheme();
  setTheme(theme);
  return theme;
};
