import { GrammarPoint } from '../types';

export const grammarPoints: GrammarPoint[] = [
  {
    id: 1,
    title: 'Cấu trúc khẳng định với 是 (shì)',
    explanation: 'Dùng 是 để nối chủ ngữ và danh từ/đại từ, tương đương "là".',
    pattern: 'A + 是 + B',
    examples: ['我是学生。- Tôi là học sinh.', '他是老师。- Anh ấy là giáo viên.'],
    quiz: [
      {
        id: 101,
        type: 'multiple',
        question: 'Từ nào dùng để nói "là"?',
        options: ['在', '是', '有', '的'],
        answer: '是',
      },
    ],
  },
  {
    id: 2,
    title: 'Phủ định với 不 (bù)',
    explanation: '不 đặt trước động từ hoặc tính từ để phủ định.',
    pattern: 'S + 不 + V/Adj',
    examples: ['我不吃辣。- Tôi không ăn cay.', '他今天不去公司。- Hôm nay anh ấy không tới công ty.'],
    quiz: [
      {
        id: 102,
        type: 'fill',
        question: 'Điền vào chỗ trống: 我 ___ 累。 (Tôi không mệt)',
        answer: '不',
      },
    ],
  },
];
