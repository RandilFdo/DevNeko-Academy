'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'si';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'hero.title': 'DEVNEKO ACADEMY',
    'hero.tagline': 'The Future of Learning',
    'hero.subtitle': 'Dive hands-on into the future of technology. Build real robots, master essential engineering skills, and future-proof your career.',
    'hero.cta': 'Join the Lab',
    'nav.courses': 'Courses',
    'nav.projects': 'Projects',
    'nav.archive': 'Archive',
    'login': 'Log In',
    'dashboard.skillTree': 'Skill Tree',
    'course.start': 'Start Course',
    'hero.pricingTitle': 'Start your journey today',
    'hero.standardLab': 'Standard Lab',
    'hero.masteryProgram': 'Mastery Program',
    'lms.sidebar.search': 'Search lessons...',
    'lms.sidebar.curriculum': 'Curriculum',
    'lms.sidebar.published': 'PUBLISHED',
    'lms.chat.title': 'Mentor Live Chat',
    'lms.chat.placeholder': 'Ask your mentor...',
    'lms.button.completed': 'Completed',
    'lms.button.markCompleted': 'Mark as Completed',
    'lms.resources.title': 'Lesson Resources',
    'settings.title': 'Settings',
    'settings.tab.profile': 'Personal Info',
    'settings.tab.appearance': 'Appearance',
    'settings.tab.security': 'Security',
    'settings.button.save': 'Save Changes',
    'settings.button.back': 'Back to Learning',
  },
  si: {
    'hero.title': 'ඩෙව්නෙකෝ ඇකඩමි',
    'hero.tagline': 'ඉගෙනීමේ අනාගතය',
    'hero.subtitle': 'තාක්ෂණයේ අනාගතය අත්විඳින්න. සැබෑ රොබෝවරුන් නිර්මාණය කර ඉංජිනේරු කුසලතා ප්‍රගුණ කරන්න.',
    'hero.cta': 'විද්‍යාගාරයට එක්වන්න',
    'nav.courses': 'පාඨමාලා',
    'nav.projects': 'ව්‍යාපෘති',
    'nav.archive': 'ලේඛනාගාරය',
    'login': 'ඇතුල් වන්න',
    'dashboard.skillTree': 'නිපුණතා ගස',
    'course.start': 'පාඨමාලාව අරඹන්න',
    'hero.pricingTitle': 'අදම ඔබේ ගමන අරඹන්න',
    'hero.standardLab': 'සම්මත විද්‍යාගාරය',
    'hero.masteryProgram': 'ප්‍රවීණතා වැඩසටහන',
    'lms.sidebar.search': 'පාඩම් සොයන්න...',
    'lms.sidebar.curriculum': 'විෂය මාලාව',
    'lms.sidebar.published': 'ප්‍රකාශිතයි',
    'lms.chat.title': 'උපදේශක සජීවී කතාබහ',
    'lms.chat.placeholder': 'ඔබේ උපදේශකයාගෙන් විමසන්න...',
    'lms.button.completed': 'සම්පූර්ණයි',
    'lms.button.markCompleted': 'සම්පූර්ණ කළ බව සලකුණු කරන්න',
    'lms.resources.title': 'පාඩම් සම්පත්',
    'settings.title': 'සැකසුම්',
    'settings.tab.profile': 'පෞද්ගලික තොරතුරු',
    'settings.tab.appearance': 'පෙනුම',
    'settings.tab.security': 'ආරක්ෂාව',
    'settings.button.save': 'වෙනස්කම් සුරකින්න',
    'settings.button.back': 'නැවත ඉගෙනීමට',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
