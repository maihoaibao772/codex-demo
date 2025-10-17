import type { OathTrait } from '../lib/types';

export const oathTraits: OathTrait[] = [
  {
    keywords: ['bảo hộ', 'chắn', 'che chở'],
    title: 'Tâm Khiên',
    description: '+1 Ý Chí khi chọn cứu giúp người khác.',
    effects: { will: 1 },
    triggerTags: ['ân nghĩa', 'cứu giúp']
  },
  {
    keywords: ['bá đạo', 'công kích', 'đả'],
    title: 'Bá Thể',
    description: '+1 Khí khi chọn hành động tấn công.',
    effects: { qi: 1 },
    triggerTags: ['thử thách', 'thiên kiếp', 'tấn công']
  },
  {
    keywords: ['tĩnh', 'thiền', 'an'],
    title: 'Định Tâm',
    description: '+1 Mệnh khi vượt qua khảo nghiệm.',
    effects: { fate: 1 },
    triggerTags: ['thử thách', 'thiên kiếp', 'ma tâm']
  },
  {
    keywords: ['ân nghĩa', 'nhân', 'thiện'],
    title: 'Nhân Hòa',
    description: '+1 Danh khi giúp dân làng.',
    effects: { rep: 1 },
    triggerTags: ['ân nghĩa', 'ân oán']
  },
  {
    keywords: ['kiêu hùng', 'ngạo', 'thách'],
    title: 'Thiên Kiêu',
    description: '+1 Khí khi đối đầu thiên kiếp.',
    effects: { qi: 1 },
    triggerTags: ['thiên kiếp']
  },
  {
    keywords: ['ẩn', 'giữ kín', 'bí'],
    title: 'Ẩn Sĩ',
    description: 'Giữ lại 1 pháp khí sau khi thất bại.',
    effects: {}
  }
];

export const resolveOathTrait = (input: string) => {
  const normalized = input.trim().toLowerCase();
  return (
    oathTraits.find((trait) =>
      trait.keywords.some((keyword) => normalized.includes(keyword))
    ) ?? {
      keywords: ['phàm tâm'],
      title: 'Phàm Tâm',
      description: 'Không có hiệu quả đặc biệt, nhưng trái tim vẫn kiên định.',
      effects: {}
    }
  );
};
