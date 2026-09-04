import { TajwidLetter, ExampleWord, QuizItem } from '../types';

export const SYAMSIYAH_LETTERS: TajwidLetter[] = [
  {
    id: 'ta',
    letter: 'ت',
    name: 'Ta',
    transliteration: 'T',
    type: 'syamsiyah',
    sampleWord: 'التَّوَّابُ',
    sampleWordRead: 'at-tawwābu',
    sampleMeaning: 'Maha Penerima Taubat',
    explanation: 'Huruf ل melebur ke dalam huruf ت yang bertasydid, sehingga dibaca at-tawwābu.'
  },
  {
    id: 'tsa',
    letter: 'ث',
    name: 'Tsa',
    transliteration: 'Ts',
    type: 'syamsiyah',
    sampleWord: 'الثَّوَابُ',
    sampleWordRead: 'ats-tsawābu',
    sampleMeaning: 'Pahala / Balasan',
    explanation: 'Huruf ل tidak dibaca dan langsung masuk ke huruf ث bertasydid, menjadi ats-tsawābu.'
  },
  {
    id: 'dal',
    letter: 'د',
    name: 'Dal',
    transliteration: 'D',
    type: 'syamsiyah',
    sampleWord: 'الدِّينُ',
    sampleWordRead: 'ad-dīnu',
    sampleMeaning: 'Agama / Hari Pembalasan',
    explanation: 'Huruf ل melebur langsung ke huruf د bertasydid, dibaca ad-dīnu.'
  },
  {
    id: 'dzal',
    letter: 'ذ',
    name: 'Dzal',
    transliteration: 'Dz',
    type: 'syamsiyah',
    sampleWord: 'الذِّكْرُ',
    sampleWordRead: 'adz-dzikru',
    sampleMeaning: 'Peringatan / Al-Qur\'an',
    explanation: 'Huruf ل diidghamkan ke dalam huruf ذ bertasydid, dibaca adz-dzikru.'
  },
  {
    id: 'ra',
    letter: 'ر',
    name: 'Ra',
    transliteration: 'R',
    type: 'syamsiyah',
    sampleWord: 'الرَّحْمٰنُ',
    sampleWordRead: 'ar-raḥmānu',
    sampleMeaning: 'Maha Pengasih',
    explanation: 'Huruf ل melebur ke huruf ر yang bertasydid, sehingga dilafalkan ar-raḥmānu.'
  },
  {
    id: 'zai',
    letter: 'ز',
    name: 'Zai',
    transliteration: 'Z',
    type: 'syamsiyah',
    sampleWord: 'الزَّكَاةُ',
    sampleWordRead: 'az-zakātu',
    sampleMeaning: 'Zakat / Kesucian',
    explanation: 'Huruf ل tidak dilafalkan, langsung menekan huruf ز bertasydid, dibaca az-zakātu.'
  },
  {
    id: 'sin',
    letter: 'س',
    name: 'Sin',
    transliteration: 'S',
    type: 'syamsiyah',
    sampleWord: 'السَّلَامُ',
    sampleWordRead: 'as-salāmu',
    sampleMeaning: 'Kedamaian / Kesejahteraan',
    explanation: 'Huruf ل melebur ke dalam huruf س bertasydid, dibaca as-salāmu.'
  },
  {
    id: 'syin',
    letter: 'ش',
    name: 'Syin',
    transliteration: 'Sy',
    type: 'syamsiyah',
    sampleWord: 'الشَّمْسُ',
    sampleWordRead: 'asy-syamsu',
    sampleMeaning: 'Matahari',
    explanation: 'Huruf ل tidak dibaca, langsung masuk ke huruf ش yang bertasydid: asy-syamsu.'
  },
  {
    id: 'shad',
    letter: 'ص',
    name: 'Shad',
    transliteration: 'Sh',
    type: 'syamsiyah',
    sampleWord: 'الصَّلَاةُ',
    sampleWordRead: 'ash-shalātu',
    sampleMeaning: 'Shalat / Doa',
    explanation: 'Huruf ل melebur ke huruf ص bertasydid, dibaca tebal ash-shalātu.'
  },
  {
    id: 'dhad',
    letter: 'ض',
    name: 'Dhad',
    transliteration: 'Dh',
    type: 'syamsiyah',
    sampleWord: 'الضُّحَى',
    sampleWordRead: 'adh-dhuḥā',
    sampleMeaning: 'Waktu Dhuha (Pagi Hari)',
    explanation: 'Huruf ل tidak dilafalkan dan dimasukkan ke huruf ض bertasydid: adh-dhuḥā.'
  },
  {
    id: 'tha',
    letter: 'ط',
    name: 'Tha',
    transliteration: 'Th',
    type: 'syamsiyah',
    sampleWord: 'الطَّرِيقُ',
    sampleWordRead: 'ath-tharīqu',
    sampleMeaning: 'Jalanan',
    explanation: 'Huruf ل diidghamkan ke dalam huruf ط bertasydid, dibaca ath-tharīqu.'
  },
  {
    id: 'zha',
    letter: 'ظ',
    name: 'Zha',
    transliteration: 'Zh',
    type: 'syamsiyah',
    sampleWord: 'الظَّالِمُونَ',
    sampleWordRead: 'azh-zhālimūna',
    sampleMeaning: 'Orang-orang Zalim',
    explanation: 'Huruf ل melebur ke huruf ظ bertasydid, dilafalkan azh-zhālimūna.'
  },
  {
    id: 'lam',
    letter: 'ل',
    name: 'Lam',
    transliteration: 'L',
    type: 'syamsiyah',
    sampleWord: 'اللَّيْلُ',
    sampleWordRead: 'al-laylu',
    sampleMeaning: 'Malam Hari',
    explanation: 'Huruf ل pertama melebur ke huruf ل kedua yang bertasydid: al-laylu.'
  },
  {
    id: 'nun',
    letter: 'ن',
    name: 'Nun',
    transliteration: 'N',
    type: 'syamsiyah',
    sampleWord: 'النَّاسُ',
    sampleWordRead: 'an-nāsu',
    sampleMeaning: 'Manusia',
    explanation: 'Huruf ل melebur ke huruf ن bertasydid disertai sedikit dengung (ghunnah): an-nāsu.'
  }
];

export const QAMARIYAH_LETTERS: TajwidLetter[] = [
  {
    id: 'alif',
    letter: 'ا',
    name: 'Alif / Hamzah',
    transliteration: 'A',
    type: 'qamariyah',
    sampleWord: 'الْإِنْسَانُ',
    sampleWordRead: 'al-insānu',
    sampleMeaning: 'Manusia',
    explanation: 'Huruf ل dibaca jelas (izhar) dengan sukun sebelum huruf hamzah/alif: al-insānu.'
  },
  {
    id: 'ba',
    letter: 'ب',
    name: 'Ba',
    transliteration: 'B',
    type: 'qamariyah',
    sampleWord: 'الْبَيْتُ',
    sampleWordRead: 'al-baytu',
    sampleMeaning: 'Rumah',
    explanation: 'Huruf ل dibaca jelas (terdengar bunyi L-nya), huruf ب tidak bertasydid: al-baytu.'
  },
  {
    id: 'jim',
    letter: 'ج',
    name: 'Jim',
    transliteration: 'J',
    type: 'qamariyah',
    sampleWord: 'الْجَنَّةُ',
    sampleWordRead: 'al-jannatu',
    sampleMeaning: 'Surga',
    explanation: 'Huruf ل berharakat sukun dibaca terang sebelum huruf ج: al-jannatu.'
  },
  {
    id: 'ha-pedas',
    letter: 'ح',
    name: 'Ha (ح)',
    transliteration: 'Ḥ',
    type: 'qamariyah',
    sampleWord: 'الْحَمْدُ',
    sampleWordRead: 'al-ḥamdu',
    sampleMeaning: 'Segala Puji',
    explanation: 'Huruf ل dibaca jelas dan tegas: al-ḥamdu.'
  },
  {
    id: 'kha',
    letter: 'خ',
    name: 'Kha',
    transliteration: 'Kh',
    type: 'qamariyah',
    sampleWord: 'الْخَيْرُ',
    sampleWordRead: 'al-khayru',
    sampleMeaning: 'Kebaikan',
    explanation: 'Huruf ل sukun dibaca jelas sebelum huruf خ: al-khayru.'
  },
  {
    id: 'ain',
    letter: 'ع',
    name: '\'Ain',
    transliteration: '\'',
    type: 'qamariyah',
    sampleWord: 'الْعِلْمُ',
    sampleWordRead: 'al-\'ilmu',
    sampleMeaning: 'Ilmu Pengetahuan',
    explanation: 'Huruf ل dibaca izhar (jelas) sebelum huruf ع: al-\'ilmu.'
  },
  {
    id: 'ghain',
    letter: 'غ',
    name: 'Ghain',
    transliteration: 'Gh',
    type: 'qamariyah',
    sampleWord: 'الْغَيْبُ',
    sampleWordRead: 'al-ghaybu',
    sampleMeaning: 'Hal yang Gaib',
    explanation: 'Huruf ل sukun dibaca terang tanpa melebur ke huruf غ: al-ghaybu.'
  },
  {
    id: 'fa',
    letter: 'ف',
    name: 'Fa',
    transliteration: 'F',
    type: 'qamariyah',
    sampleWord: 'الْفَجْرُ',
    sampleWordRead: 'al-fajru',
    sampleMeaning: 'Fajar / Waktu Shubuh',
    explanation: 'Huruf ل terdengar jelas sebelum huruf ف: al-fajru.'
  },
  {
    id: 'qaf',
    letter: 'ق',
    name: 'Qaf',
    transliteration: 'Q',
    type: 'qamariyah',
    sampleWord: 'الْقَمَرُ',
    sampleWordRead: 'al-qamaru',
    sampleMeaning: 'Bulan',
    explanation: 'Huruf ل berharakat sukun dibaca jelas: al-qamaru.'
  },
  {
    id: 'kaf',
    letter: 'ك',
    name: 'Kaf',
    transliteration: 'K',
    type: 'qamariyah',
    sampleWord: 'الْكِتَابُ',
    sampleWordRead: 'al-kitābu',
    sampleMeaning: 'Buku / Al-Qur\'an',
    explanation: 'Huruf ل dibaca jelas tanpa tasydid pada huruf ك: al-kitābu.'
  },
  {
    id: 'mim',
    letter: 'م',
    name: 'Mim',
    transliteration: 'M',
    type: 'qamariyah',
    sampleWord: 'الْمَسْجِدُ',
    sampleWordRead: 'al-masjidu',
    sampleMeaning: 'Masjid',
    explanation: 'Huruf ل dibaca jelas dan terdengar vokal L: al-masjidu.'
  },
  {
    id: 'ha-simpul',
    letter: 'هـ',
    name: 'Ha\' (هـ)',
    transliteration: 'H',
    type: 'qamariyah',
    sampleWord: 'الْهُدَى',
    sampleWordRead: 'al-hudā',
    sampleMeaning: 'Petunjuk',
    explanation: 'Huruf ل sukun dibaca jelas sebelum huruf هـ: al-hudā.'
  },
  {
    id: 'wau',
    letter: 'و',
    name: 'Wau',
    transliteration: 'W',
    type: 'qamariyah',
    sampleWord: 'الْوَقْتُ',
    sampleWordRead: 'al-waqtu',
    sampleMeaning: 'Waktu',
    explanation: 'Huruf ل dilafalkan jelas secara izhar sebelum huruf و: al-waqtu.'
  },
  {
    id: 'ya',
    letter: 'ي',
    name: 'Ya',
    transliteration: 'Y',
    type: 'qamariyah',
    sampleWord: 'الْيَوْمُ',
    sampleWordRead: 'al-yawmu',
    sampleMeaning: 'Hari Ini',
    explanation: 'Huruf ل dibaca jelas dengan sukun sebelum huruf ي: al-yawmu.'
  }
];

// Key featured examples requested by user prompt
export const FEATURED_EXAMPLES: ExampleWord[] = [
  {
    id: 'syams-1',
    arabic: 'الشَّمْسُ',
    transliteration: 'asy-syamsu',
    meaning: 'Matahari',
    type: 'syamsiyah',
    letter: 'ش',
    letterName: 'Syin',
    explanation: 'Alif Lam bertemu huruf Syamsiyah (ش). Huruf ل tidak dibaca dan huruf ش diberi tasydid.',
    parts: {
      al: 'الـ',
      highlightLetter: 'شَّ',
      hasTasydid: true,
      rest: 'مْسُ'
    }
  },
  {
    id: 'syams-2',
    arabic: 'الرَّحْمٰنُ',
    transliteration: 'ar-raḥmānu',
    meaning: 'Yang Maha Pengasih',
    type: 'syamsiyah',
    letter: 'ر',
    letterName: 'Ra',
    explanation: 'Alif Lam bertemu huruf Syamsiyah (ر). Huruf ل melebur ke huruf ر bertasydid sehingga dibaca ar-raḥmānu.',
    parts: {
      al: 'الـ',
      highlightLetter: 'رَّ',
      hasTasydid: true,
      rest: 'حْمٰنُ'
    }
  },
  {
    id: 'syams-3',
    arabic: 'النَّاسُ',
    transliteration: 'an-nāsu',
    meaning: 'Manusia',
    type: 'syamsiyah',
    letter: 'ن',
    letterName: 'Nun',
    explanation: 'Alif Lam bertemu huruf Syamsiyah (ن). Huruf ل tidak dibaca dan huruf ن dibaca bertasydid dengan ghunnah.',
    parts: {
      al: 'الـ',
      highlightLetter: 'نَّ',
      hasTasydid: true,
      rest: 'اسُ'
    }
  },
  {
    id: 'qamar-1',
    arabic: 'الْقَمَرُ',
    transliteration: 'al-qamaru',
    meaning: 'Bulan',
    type: 'qamariyah',
    letter: 'ق',
    letterName: 'Qaf',
    explanation: 'Alif Lam bertemu huruf Qamariyah (ق). Huruf ل berharakat sukun dan dibaca jelas (izhar).',
    parts: {
      al: 'الْـ',
      highlightLetter: 'قَ',
      hasTasydid: false,
      rest: 'مَرُ'
    }
  },
  {
    id: 'qamar-2',
    arabic: 'الْكِتَابُ',
    transliteration: 'al-kitābu',
    meaning: 'Buku / Al-Kitab',
    type: 'qamariyah',
    letter: 'ك',
    letterName: 'Kaf',
    explanation: 'Alif Lam bertemu huruf Qamariyah (ك). Huruf ل dibaca jelas dan huruf ك tidak bertasydid.',
    parts: {
      al: 'الْـ',
      highlightLetter: 'كِ',
      hasTasydid: false,
      rest: 'تَابُ'
    }
  },
  {
    id: 'qamar-3',
    arabic: 'الْحَمْدُ',
    transliteration: 'al-ḥamdu',
    meaning: 'Segala Puji',
    type: 'qamariyah',
    letter: 'ح',
    letterName: 'Ha',
    explanation: 'Alif Lam bertemu huruf Qamariyah (ح). Huruf ل berharakat sukun dibaca terang dan tegas.',
    parts: {
      al: 'الْـ',
      highlightLetter: 'حَ',
      hasTasydid: false,
      rest: 'مْدُ'
    }
  }
];

export const QUIZ_QUESTIONS: QuizItem[] = [
  {
    id: 1,
    wordArabic: 'الشَّمْسُ',
    wordLatin: 'asy-syamsu',
    meaning: 'Matahari',
    correctAnswer: 'syamsiyah',
    highlightLetter: 'ش',
    explanation: 'Huruf setelah ال adalah ش (Syin) yang bertasydid. Huruf ل tidak dibaca, melainkan melebur (idgham) menjadi asy-syamsu.'
  },
  {
    id: 2,
    wordArabic: 'الْقَمَرُ',
    wordLatin: 'al-qamaru',
    meaning: 'Bulan',
    correctAnswer: 'qamariyah',
    highlightLetter: 'ق',
    explanation: 'Huruf setelah ال adalah ق (Qaf). Huruf ل diberi tanda sukun (ْ) dan dibaca jelas (izhar) menjadi al-qamaru.'
  },
  {
    id: 3,
    wordArabic: 'الرَّحْمٰنُ',
    wordLatin: 'ar-raḥmānu',
    meaning: 'Maha Pengasih',
    correctAnswer: 'syamsiyah',
    highlightLetter: 'ر',
    explanation: 'Huruf setelah ال adalah ر (Ra) bertasydid. Huruf ل diidghamkan ke huruf ر, sehingga dibaca ar-raḥmānu.'
  },
  {
    id: 4,
    wordArabic: 'الْكِتَابُ',
    wordLatin: 'al-kitābu',
    meaning: 'Kitab / Buku',
    correctAnswer: 'qamariyah',
    highlightLetter: 'ك',
    explanation: 'Huruf setelah ال adalah ك (Kaf). Huruf ل dibaca terang dan jelas sebagai al-kitābu.'
  },
  {
    id: 5,
    wordArabic: 'النَّاسُ',
    wordLatin: 'an-nāsu',
    meaning: 'Manusia',
    correctAnswer: 'syamsiyah',
    highlightLetter: 'ن',
    explanation: 'Huruf setelah ال adalah ن (Nun) bertasydid. Huruf ل melebur ke huruf nun: an-nāsu.'
  },
  {
    id: 6,
    wordArabic: 'الْحَمْدُ',
    wordLatin: 'al-ḥamdu',
    meaning: 'Segala Puji',
    correctAnswer: 'qamariyah',
    highlightLetter: 'ح',
    explanation: 'Huruf setelah ال adalah ح (Ha). Huruf ل berharakat sukun dan dilafalkan dengan jelas: al-ḥamdu.'
  },
  {
    id: 7,
    wordArabic: 'الصَّلَاةُ',
    wordLatin: 'ash-shalātu',
    meaning: 'Shalat',
    correctAnswer: 'syamsiyah',
    highlightLetter: 'ص',
    explanation: 'Huruf setelah ال adalah ص (Shad) bertasydid. Huruf ل tidak dibaca: ash-shalātu.'
  },
  {
    id: 8,
    wordArabic: 'الْمَسْجِدُ',
    wordLatin: 'al-masjidu',
    meaning: 'Masjid',
    correctAnswer: 'qamariyah',
    highlightLetter: 'م',
    explanation: 'Huruf setelah ال adalah م (Mim). Huruf ل dibaca jelas (izhar qamari): al-masjidu.'
  },
  {
    id: 9,
    wordArabic: 'السَّلَامُ',
    wordLatin: 'as-salāmu',
    meaning: 'Keselamatan',
    correctAnswer: 'syamsiyah',
    highlightLetter: 'س',
    explanation: 'Huruf setelah ال adalah س (Sin) bertasydid. Bunyi L melebur ke dalam S: as-salāmu.'
  },
  {
    id: 10,
    wordArabic: 'الْفَجْرُ',
    wordLatin: 'al-fajru',
    meaning: 'Waktu Fajar',
    correctAnswer: 'qamariyah',
    highlightLetter: 'ف',
    explanation: 'Huruf setelah ال adalah ف (Fa). Huruf ل disukunkan dan terdengar jelas: al-fajru.'
  }
];

export const MNEMONIC_QAMARIYAH = {
  arabic: 'اَبْغِ حَجَّكَ وَخَفْ عَقِيْمَهُ',
  latin: 'Abghi hajjaka wa khaf \'aqīmahu',
  meaning: 'Tuntutlah haji yang mabrur dan takutlah pada haji yang hampa/sia-sia.',
  letters: ['ا', 'ب', 'غ', 'ح', 'ج', 'ك', 'و', 'خ', 'ف', 'ع', 'ق', 'ي', 'م', 'هـ']
};
