import { ExerciseQuestion } from '../types';

export const exercises: ExerciseQuestion[] = [
  {
    id: 1,
    type: 'multiple',
    question: 'Từ nào nghĩa là "xin chào"?',
    options: ['谢谢', '你好', '再见', '老师'],
    answer: '你好',
    explanation: '你好 (nǐ hǎo) = xin chào.',
  },
  {
    id: 2,
    type: 'fill',
    question: 'Điền pinyin cho từ "老师": _____',
    answer: 'lǎoshī',
    explanation: '老师 đọc là lǎoshī, nghĩa là giáo viên.',
  },
  {
    id: 3,
    type: 'match',
    question: 'Ghép nghĩa đúng: "谢谢"',
    options: ['Tạm biệt', 'Cảm ơn', 'Xin chào'],
    answer: 'Cảm ơn',
  },
];
