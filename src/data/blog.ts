import { BlogPost } from '../types';

export const blogs: BlogPost[] = [
  {
    id: 1,
    slug: 'hoc-pinyin-trong-7-ngay',
    title: 'Học pinyin trong 7 ngày',
    summary: 'Lộ trình luyện phát âm nhanh cho người mới.',
    content:
      'Pinyin là nền tảng để đọc và phát âm. Hãy bắt đầu bằng việc ghi nhớ 4 thanh điệu, sau đó luyện ghép âm qua flashcard và shadowing. Mỗi ngày 15 phút, sau 1 tuần bạn sẽ tự đọc được 150 từ cơ bản.',
    tags: ['pinyin', 'beginner'],
    date: '2024-10-01',
  },
  {
    id: 2,
    slug: 'tip-hoc-tu-vung-hsk',
    title: 'Tip học từ vựng HSK không quên',
    summary: 'Kết hợp spaced repetition và câu ví dụ sinh động.',
    content:
      'Từ vựng nên đi kèm ngữ cảnh. Hãy tạo thẻ gồm Hán tự, pinyin, nghĩa và 1 câu ví dụ. Ôn lại 10-20 thẻ mỗi ngày, dùng kỹ thuật spaced repetition để nhớ lâu.',
    tags: ['vocabulary', 'flashcard'],
    date: '2024-10-10',
  },
  {
    id: 3,
    slug: 'song-ngu-giup-tang-toc',
    title: 'Đọc song ngữ giúp tăng tốc',
    summary: 'Cách dùng bài đọc song ngữ để luyện phản xạ.',
    content:
      'Chọn bài đọc song ngữ ngắn, đọc to thành tiếng, khoanh vùng từ mới và đặt câu. Mỗi tuần một chủ đề: du lịch, công việc, ẩm thực. Kết hợp nghe podcast ngắn để tăng cảm âm.',
    tags: ['reading', 'listening'],
    date: '2024-10-15',
  },
];
