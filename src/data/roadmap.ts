import { RoadmapStep } from '../types';

export const roadmap: RoadmapStep[] = [
  {
    level: 'HSK 0-1',
    description: 'Nắm pinyin, 150 từ cơ bản, câu chào hỏi.',
    focus: ['Phát âm chuẩn thanh điệu', 'Chào hỏi, giới thiệu bản thân', 'Nhận mặt chữ giản thể'],
    resources: ['Flashcard HSK1', 'Ứng dụng luyện phát âm', 'Video hội thoại cơ bản'],
  },
  {
    level: 'HSK 2-3',
    description: 'Mở rộng lên 600+ từ, mẫu câu thông dụng.',
    focus: ['Ngữ pháp 不 / 没', 'Thì quá khứ với 了', 'Mẫu hỏi với 吗/呢'],
    resources: ['Sách HSK2-3', 'Podcast ngắn', 'Quiz luyện phản xạ'],
  },
  {
    level: 'HSK 4-5',
    description: 'Tự tin thảo luận, đọc tin tức ngắn.',
    focus: ['Câu phức, liên từ', 'Từ vựng học thuật', 'Viết đoạn văn ngắn'],
    resources: ['Bài đọc song ngữ', 'Mock test HSK4-5', 'Câu lạc bộ đọc'],
  },
  {
    level: 'HSK 6',
    description: 'Thành thạo, nghe đọc hiểu báo chí chuyên sâu.',
    focus: ['Thành ngữ, ẩn dụ', 'Tốc độ nghe cao', 'Viết luận dài'],
    resources: ['Đề thi thật', 'Phỏng vấn native', 'Seminar chuyên đề'],
  },
];
