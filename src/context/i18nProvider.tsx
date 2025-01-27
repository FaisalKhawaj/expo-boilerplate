import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from 'react';
  import {useTranslation} from 'react-i18next'; // Import useTranslation
  
  import {translate, i18n} from '../locales';
  
  interface I18nContextProps {
    currentLocale: string;
    translate: typeof translate;
    handleLocale: (locale: string) => void;
    i18nInstance: typeof i18n;
    refreshKey: number; // New: A key to force updates
  
  
  }
  
  const I18nContext = createContext<I18nContextProps>({
    currentLocale: i18n.language, // Use i18n.language
    translate,
    handleLocale: () => {}, // No-op by default
    i18nInstance: i18n,
    refreshKey: 0, // Default value
  
  
  });
  
  export const I18nProvider: React.FC<{
    children: ReactNode;
    initialLocale?: string;
  }> = ({
    children,
    initialLocale = 'en', // Default locale
  }) => {
    const [currentLocale, setCurrentLocale] = useState(initialLocale);
    const {i18n: i18nInstance} = useTranslation(); // Use useTranslation to get i18n instance
    const [refreshKey, setRefreshKey] = useState(0); // New state for forcing re-render
  
    useEffect(() => {
      i18nInstance.changeLanguage(currentLocale); // Use changeLanguage
    }, [currentLocale, i18nInstance]);
  
    const handleLocale = (locale: string) => {
      i18nInstance.changeLanguage(locale);
      setCurrentLocale(locale);
      setRefreshKey(prev => prev + 1); // Increment key to trigger updates
    };
  
    useEffect(() => {
      const onChange = () => {
        setCurrentLocale(i18nInstance.language);
        setRefreshKey(prev => prev + 1); // Trigger re-render on language change
      };
      i18nInstance.on('languageChanged', onChange);
      return () => {
        i18nInstance.off('languageChanged', onChange);
      };
    }, [i18nInstance]);
  
  
    return (
      <I18nContext.Provider value={{currentLocale, translate, handleLocale,i18nInstance,
        refreshKey}}>
        {children}
      </I18nContext.Provider>
    );
  };
  
  export const useI18n = () => {
    const context = useContext(I18nContext);
    if (!context) {
      throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
  };
  