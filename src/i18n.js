const translations = {
  da: {
    'ByHax (under development)': 'ByHax (under udvikling)'
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
