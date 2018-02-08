const translations = {
  da: {
    Login: 'Log ind',
    Sun: 'Søn',
    Mon: 'Man',
    Tue: 'Tir',
    Wed: 'Ons',
    Thu: 'Tor',
    Fri: 'Fre',
    Sat: 'Lør'
  },
  en: {}
};
export let language = 'da';
export function setLanguage(lan) {
  if (translations[lan]) {
    language = lan;
  } else {
    throw new Error(`no such language in i18n: ${lan}`);
  }
}
export function __(str) {
  return translations[language][str] || str;
}
