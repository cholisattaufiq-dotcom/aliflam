export type TajwidType = 'syamsiyah' | 'qamariyah';

export interface ExampleWord {
  id: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  type: TajwidType;
  letter: string;
  letterName: string;
  explanation: string;
  // Breakdown for highlighting
  parts: {
    al: string; // 'الـ' or 'ال'
    highlightLetter: string; // letter with harakat
    hasTasydid: boolean;
    rest: string; // rest of the word
  };
}

export interface TajwidLetter {
  id: string;
  letter: string; // Arabic character e.g. 'ت'
  name: string; // 'Ta'
  transliteration: string; // 't'
  type: TajwidType;
  sampleWord: string; // 'التَّوَّابُ'
  sampleWordRead: string; // 'at-tawwābu'
  sampleMeaning: string; // 'Maha Penerima Taubat'
  explanation: string;
}

export interface QuizItem {
  id: number;
  wordArabic: string;
  wordLatin: string;
  meaning: string;
  correctAnswer: TajwidType;
  highlightLetter: string;
  explanation: string;
}

export type ActiveTab = 'beranda' | 'syamsiyah' | 'qamariyah' | 'perbandingan' | 'latihan' | 'game';
