import type { Artifact, Talent } from '../lib/types';

export const artifacts: Artifact[] = [
  {
    id: 'lam-tam-luoc',
    name: 'Lam Tâm Lược',
    description: 'Khi vượt ải tâm ma, nhận +1 Ý Chí.',
    tags: ['ý chí', 'tâm ma']
  },
  {
    id: 'thanh-van-lo',
    name: 'Thanh Vân Lô',
    description: 'Mỗi lần dùng đan dược, +1 Khí.',
    tags: ['đan', 'khí']
  },
  {
    id: 'huyen-ngoc-phu',
    name: 'Huyền Ngọc Phù',
    description: 'Lần đầu thất bại thiên kiếp trong run không nhận vết nứt.',
    tags: ['phòng ngự']
  },
  {
    id: 'kien-cot-linh-thach',
    name: 'Kiên Cốt Linh Thạch',
    description: 'Tăng giới hạn Khí lên 12.',
    tags: ['khí', 'giới hạn']
  },
  {
    id: 'dao-van-thu',
    name: 'Đạo Văn Thư',
    description: 'Chọn lựa có rủi ro cao nhận thêm +1 Mệnh khi thành công.',
    tags: ['mệnh', 'rủi ro']
  },
  {
    id: 'u-linh-hoa',
    name: 'U Linh Hỏa',
    description: 'Đốt ác linh nhận +1 Danh.',
    tags: ['danh', 'linh']
  },
  {
    id: 'khuyen-thien-co',
    name: 'Khuyển Thiên Cổ',
    description: 'Thêm 1 lựa chọn khi gặp sự kiện ân oán.',
    tags: ['sự kiện', 'ân oán']
  },
  {
    id: 'bach-tuyet-can',
    name: 'Bạch Tuyết Căn',
    description: 'Sau mỗi thiên kiếp thành công, phục hồi 1 vật phẩm tiêu hao.',
    tags: ['hồi phục']
  }
];

export const talents: Talent[] = [
  {
    id: 'khong-chien-thang',
    name: 'Không Chiến Thắng',
    description: 'Khi tránh giao chiến, +1 Danh.'
  },
  {
    id: 'tam-bao-tinh',
    name: 'Tam Bảo Tính',
    description: 'Bảo lưu 1 vật phẩm khi chết.'
  },
  {
    id: 'thien-ly-nhan',
    name: 'Thiên Lý Nhãn',
    description: 'Nhìn trước kết quả rủi ro trung bình.'
  },
  {
    id: 'dao-thu-chi-tam',
    name: 'Đạo Thư Chi Tâm',
    description: 'Nhận thêm 1 điểm Ý Chí sau mỗi khảo nghiệm.'
  },
  {
    id: 'am-ha-song',
    name: 'Ám Hà Sông',
    description: 'Lần đầu nhận vết nứt, chuyển thành +1 Mệnh.'
  },
  {
    id: 'hoan-nguyen',
    name: 'Hoàn Nguyên',
    description: 'Sau khi chết giữ lại 1 pháp khí.'
  },
  {
    id: 'don-kiem-luc',
    name: 'Đơn Kiếm Lực',
    description: 'Mỗi lần chọn hành động tấn công được +1 Khí tạm thời.'
  }
];
