import type { GameEvent } from '../lib/types';

export const events: GameEvent[] = [
  {
    id: 'lang-tran',
    title: 'Làng Trấn Linh',
    body: 'Dân làng run rẩy xin giúp đỡ trước yêu thú quanh quẩn.',
    tags: ['ân nghĩa', 'thử thách'],
    choices: [
      {
        text: 'Dùng kiếm khí trấn áp',
        effects: { stats: { qi: 1, rep: 1 }, log: 'Bạn phóng kiếm quang, yêu thú bỏ chạy.' }
      },
      {
        text: 'Chữa trị dân làng',
        effects: { stats: { will: 1, rep: 2 }, addItem: 'đan trị thương', log: 'Bạn băng bó và để lại đan dược.' }
      },
      {
        text: 'Lờ đi',
        effects: { stats: { rep: -1 }, log: 'Bạn rời đi trong ánh mắt oán hận.' }
      }
    ]
  },
  {
    id: 'tu-luyen-son',
    title: 'Tụ Luyện Sơn',
    body: 'Đỉnh núi tràn khí linh dâng trào, bạn có thể hấp thu.',
    tags: ['tu luyện'],
    choices: [
      {
        text: 'Ngồi thiền hít thở',
        effects: { stats: { qi: 2, will: 1 }, log: 'Khí tức lưu chuyển toàn thân.' }
      },
      {
        text: 'Chia sẻ khí tức với đồng môn',
        effects: { stats: { qi: 1, rep: 1 }, log: 'Tình đồng môn thêm bền.' }
      }
    ]
  },
  {
    id: 'ma-tam-ket',
    title: 'Kết giới Ma Tâm',
    body: 'Tâm ma thầm thì, hứa ban cho sức mạnh.',
    tags: ['ma tâm'],
    choices: [
      {
        text: 'Đối diện tâm ma',
        effects: { stats: { will: 2 }, log: 'Bạn nhìn sâu vào nỗi sợ của mình.' },
        skillCheck: {
          stat: 'will',
          threshold: 5,
          success: { stats: { fate: 1 }, log: 'Tâm ma tan biến.' },
          fail: { stats: { fate: -1 }, log: 'Vết nứt trong tâm khảm vang lên.' }
        }
      },
      {
        text: 'Nhận lời dụ dỗ',
        effects: { stats: { qi: 2, rep: -2 }, log: 'Sức mạnh đen tối len lỏi.' },
        followups: [{ id: 'ma-tam-chuoc', weight: 1 }]
      }
    ]
  },
  {
    id: 'dan-duoc-co',
    title: 'Đan Dược Cổ',
    body: 'Một luyện đan sư lạ mặt mời bạn thử đan hoàn.',
    tags: ['đan dược'],
    choices: [
      {
        text: 'Uống ngay',
        effects: { stats: { qi: 1, fate: 1 }, addItem: 'linh đan', log: 'Đan lực nóng bỏng.' }
      },
      {
        text: 'Phân tích trước',
        effects: { stats: { will: 1 }, log: 'Bạn nhận ra tạp chất độc.' },
        skillCheck: {
          stat: 'will',
          threshold: 4,
          success: { stats: { rep: 1 }, log: 'Bạn cảnh báo mọi người.' },
          fail: { stats: { fate: -1 }, log: 'Đan sư phật ý.' }
        }
      }
    ]
  },
  {
    id: 'su-do',
    title: 'Môn Phái Mời Gọi',
    body: 'Một trưởng lão từ tông môn danh tiếng xuất hiện.',
    tags: ['sư đồ'],
    choices: [
      {
        text: 'Bái sư',
        effects: { stats: { rep: 1 }, addTalent: 'dao-thu-chi-tam', log: 'Bạn trở thành nội môn đệ tử.' },
        followups: [{ id: 'noi-mon-thi', weight: 1 }]
      },
      {
        text: 'Từ chối lịch sự',
        effects: { stats: { rep: 1, fate: 1 }, log: 'Bạn giữ tự do.' }
      }
    ]
  },
  {
    id: 'noi-mon-thi',
    title: 'Nội Môn Thử Thách',
    body: 'Tân đệ tử phải vượt tháp ảo cảnh.',
    tags: ['thử thách'],
    choices: [
      {
        text: 'Dốc toàn lực leo tháp',
        effects: { stats: { qi: 1, will: 1 }, log: 'Bạn phá tan 3 tầng.' }
      },
      {
        text: 'Quan sát ảo cảnh',
        effects: { stats: { fate: 1 }, log: 'Bạn tìm ra quy luật ẩn.' }
      }
    ]
  },
  {
    id: 'hanh-thien',
    title: 'Hành Thiện Duyên',
    body: 'Một bà lão xin giúp sửa căn nhà mục nát.',
    tags: ['ân nghĩa'],
    choices: [
      {
        text: 'Dùng pháp lực dựng nhà',
        effects: { stats: { rep: 2, will: 1 }, log: 'Ngôi nhà sáng lên tia hy vọng.' }
      },
      {
        text: 'Tặng vật phẩm',
        effects: { stats: { rep: 1 }, removeItem: 'linh đan', log: 'Bạn trao đan dược quý.' }
      }
    ]
  },
  {
    id: 'am-long',
    title: 'Âm Long Khởi Động',
    body: 'Long mạch dưới đất đang cuộn dâng, khí tức hung hiểm.',
    tags: ['thiên kiếp'],
    choices: [
      {
        text: 'Trấn áp long mạch',
        effects: { stats: { qi: 2, fate: 1 }, log: 'Bạn khắc trận pháp ổn định mạch.' },
        followups: [{ id: 'long-anh', weight: 1 }]
      },
      {
        text: 'Thu nhận long mạch',
        effects: { stats: { qi: 3, rep: -1 }, addArtifact: 'u-linh-hoa', log: 'Bạn điều khiển long hỏa.' }
      }
    ]
  },
  {
    id: 'long-anh',
    title: 'Long Ảnh Hồi Ức',
    body: 'Long tộc xuất hiện cảm ơn bạn, đưa ra một trắc nghiệm.',
    tags: ['thiên kiếp', 'đố'],
    choices: [
      {
        text: 'Giải đáp long văn',
        effects: { stats: { fate: 2 }, log: 'Bạn đọc được bí văn cổ.' }
      },
      {
        text: 'Xin nhận truyền thừa',
        effects: { stats: { qi: 1, rep: 1 }, addArtifact: 'thanh-van-lo', log: 'Bạn tiếp nhận long huyết.' }
      }
    ]
  },
  {
    id: 'am-coc',
    title: 'Âm Cốc Tĩnh Thất',
    body: 'Lối vào một động phủ yên tĩnh, tiếng đàn vang vọng.',
    tags: ['kỳ ngộ'],
    choices: [
      {
        text: 'Nghe đàn',
        effects: { stats: { will: 1, fate: 1 }, log: 'Âm điệu thanh tẩy tâm hồn.' }
      },
      {
        text: 'Tìm kiếm báu vật',
        effects: { stats: { rep: -1 }, addItem: 'ngọc tịnh tâm', log: 'Bạn tìm thấy một viên ngọc sáng.' }
      }
    ]
  },
  {
    id: 'ma-tam-chuoc',
    title: 'Ma Tâm Chuộc Lại',
    body: 'Tâm ma xuất hiện yêu cầu bạn chứng minh lòng trung thành.',
    tags: ['ma tâm'],
    choices: [
      {
        text: 'Hiến tế ký ức',
        effects: { stats: { fate: -2 }, log: 'Bạn cảm thấy trống rỗng.' }
      },
      {
        text: 'Phản kháng',
        effects: { stats: { will: 2, rep: 1 }, log: 'Bạn xé nát mộng cảnh.' },
        followups: [{ id: 'ma-tam-hoa', weight: 1 }]
      }
    ]
  },
  {
    id: 'ma-tam-hoa',
    title: 'Ma Tâm Hóa Liên',
    body: 'Tâm ma chuyển hóa thành đoá sen đen, đòi bạn lựa chọn.',
    tags: ['ma tâm', 'kỳ ngộ'],
    choices: [
      {
        text: 'Nuôi dưỡng sen đen',
        effects: { stats: { qi: 1, fate: 1 }, addArtifact: 'lam-tam-luoc', log: 'Bạn điều hòa được tâm hỏa.' }
      },
      {
        text: 'Thiêu rụi',
        effects: { stats: { will: 2 }, log: 'Bạn giữ tâm mình sáng tỏ.' }
      }
    ]
  },
  {
    id: 'ky-lan-tu',
    title: 'Kỳ Lân Từ',
    body: 'Một kỳ lân bị thương nằm trên thảo nguyên.',
    tags: ['kỳ ngộ', 'ân nghĩa'],
    choices: [
      {
        text: 'Chữa trị bằng đan',
        effects: { stats: { rep: 2 }, removeItem: 'linh đan', log: 'Kỳ lân khỏe lại và tặng bạn bảo khí.' },
        followups: [{ id: 'ky-lan-ta-le', weight: 1 }]
      },
      {
        text: 'Giết lấy sừng',
        effects: { stats: { qi: 2, rep: -3 }, addItem: 'sừng kỳ lân', log: 'Bạn nhận được vật phẩm hiếm.' }
      }
    ]
  },
  {
    id: 'ky-lan-ta-le',
    title: 'Kỳ Lân Tạ Lễ',
    body: 'Kỳ lân trao cho bạn lựa chọn quà tặng.',
    tags: ['kỳ ngộ'],
    choices: [
      {
        text: 'Nhận linh cốt',
        effects: { addArtifact: 'kien-cot-linh-thach', log: 'Cơ thể bạn được củng cố.' }
      },
      {
        text: 'Nhận bí quyết',
        effects: { addTalent: 'thien-ly-nhan', log: 'Bạn hiểu thấu thiên cơ.' }
      }
    ]
  },
  {
    id: 'an-oan-co-nhan',
    title: 'Ân Oán Cố Nhân',
    body: 'Một đồng môn cũ tới đòi món nợ chưa trả.',
    tags: ['ân oán'],
    choices: [
      {
        text: 'Đối quyết',
        effects: { stats: { qi: 2 }, log: 'Bạn quyết đấu công bằng.' }
      },
      {
        text: 'Dàn xếp',
        effects: { stats: { rep: 1, will: 1 }, log: 'Mâu thuẫn được hòa giải.' }
      }
    ]
  },
  {
    id: 'tu-than-loi',
    title: 'Tử Thần Lời Mời',
    body: 'Một âm linh mời bạn giao dịch để kéo dài thọ nguyên.',
    tags: ['âm linh', 'giao dịch'],
    choices: [
      {
        text: 'Ký hiệp ước',
        effects: { stats: { fate: 2, rep: -1 }, log: 'Âm linh để lại ấn ký.' }
      },
      {
        text: 'Cự tuyệt và trừ tà',
        effects: { stats: { will: 1, rep: 1 }, addArtifact: 'u-linh-hoa', log: 'Bạn dùng U Linh Hỏa thiêu sạch.' }
      }
    ]
  },
  {
    id: 'trien-vong-dao',
    title: 'Triển Vọng Đạo',
    body: 'Một tiên giả dự báo tương lai của bạn.',
    tags: ['tiên cơ'],
    choices: [
      {
        text: 'Hỏi về thiên kiếp',
        effects: { stats: { fate: 1 }, log: 'Bạn được chỉ dẫn cách vượt kiếp.' },
        followups: [{ id: 'dao-ky-kiep', weight: 1 }]
      },
      {
        text: 'Xin lời khuyên nhân gian',
        effects: { stats: { rep: 1 }, log: 'Bạn hiểu thêm nhân tình thế thái.' }
      }
    ]
  },
  {
    id: 'dao-ky-kiep',
    title: 'Đạo Kỳ Kiếp',
    body: 'Tiên giả đưa bạn vào trận pháp mô phỏng thiên kiếp.',
    tags: ['thiên kiếp', 'thử thách'],
    choices: [
      {
        text: 'Chấp nhận sấm chớp',
        effects: { stats: { qi: 2, will: 1 }, log: 'Bạn chịu đựng sấm lôi dồn dập.' }
      },
      {
        text: 'Phân tích trận pháp',
        effects: { stats: { fate: 1, will: 1 }, log: 'Bạn ghi nhớ mọi biến chuyển.' }
      }
    ]
  },
  {
    id: 'ky-gio-bien',
    title: 'Kỳ Gió Biển',
    body: 'Ngoài khơi, gió linh cuồn cuộn, có thể luyện thân.',
    tags: ['tu luyện'],
    choices: [
      {
        text: 'Đón nhận gió lạnh',
        effects: { stats: { will: 1 }, log: 'Bạn cứng rắn hơn sau cơn gió.' }
      },
      {
        text: 'Thu thập giọt sương',
        effects: { stats: { fate: 1 }, addItem: 'sương linh', log: 'Giọt sương chứa đạo ý.' }
      }
    ]
  },
  {
    id: 'dao-cot-than',
    title: 'Đạo Cốt Thần',
    body: 'Bạn phát hiện di thể một chân nhân với di vật.',
    tags: ['kỳ ngộ'],
    choices: [
      {
        text: 'Tế bái và học đạo',
        effects: { stats: { will: 1, rep: 1 }, log: 'Bạn cảm nhận được đạo vận.' }
      },
      {
        text: 'Thu lấy pháp khí',
        effects: { addArtifact: 'dao-van-thu', stats: { rep: -1 }, log: 'Bạn cầm lấy đạo thư sáng rực.' }
      }
    ]
  },
  {
    id: 'hao-khi-tan',
    title: 'Hào Khí Tán',
    body: 'Một quán rượu đạo sĩ mời bạn uống Hào Khí Tán.',
    tags: ['giải trí'],
    choices: [
      {
        text: 'Uống hết bầu',
        effects: { stats: { qi: 1, rep: 1 }, log: 'Khí thế ngút trời.' }
      },
      {
        text: 'Từ chối giữ tỉnh táo',
        effects: { stats: { will: 1 }, log: 'Bạn giữ đầu óc minh mẫn.' }
      }
    ]
  },
  {
    id: 'thanh-lau-mong',
    title: 'Thanh Lâu Mộng',
    body: 'Bạn vô tình lạc vào ảo mộng do yêu hồ tạo nên.',
    tags: ['ảo cảnh'],
    choices: [
      {
        text: 'Chém rách ảo ảnh',
        effects: { stats: { qi: 1, will: 1 }, log: 'Ảo ảnh tan như khói.' }
      },
      {
        text: 'Lắng nghe lời thì thầm',
        effects: { stats: { fate: 1 }, log: 'Bạn học được bí quyết tu thần.' }
      }
    ]
  },
  {
    id: 'thien-ky-van',
    title: 'Thiên Ký Văn',
    body: 'Một thẻ tre khắc thiên cơ rơi vào tay bạn.',
    tags: ['tiên cơ'],
    choices: [
      {
        text: 'Giải mã thiên cơ',
        effects: { stats: { fate: 2 }, log: 'Bạn cảm giác tương lai sáng rõ.' }
      },
      {
        text: 'Ghi chép vào đạo thư',
        effects: { stats: { will: 1 }, addItem: 'thẻ thiên cơ', log: 'Bạn lưu lại để nghiên cứu.' }
      }
    ]
  }
];
