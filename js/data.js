/*
  data.js - contains vocabulary and sentence seeds.
*/

(function (global) {
  const HB = (global.HB = global.HB || {});

const vocabList = [
  { hanzi: '你', pinyin: 'ni', meaning: 'bạn' },
  { hanzi: '好', pinyin: 'hao', meaning: 'tốt' },
  { hanzi: '我', pinyin: 'wo', meaning: 'tôi' },
  { hanzi: '不', pinyin: 'bu', meaning: 'không' },
  { hanzi: '五', pinyin: 'wu', meaning: 'năm' },
  { hanzi: '他', pinyin: 'ta', meaning: 'anh ấy' },
  { hanzi: '她', pinyin: 'ta', meaning: 'cô ấy' },
  { hanzi: '大', pinyin: 'da', meaning: 'to' },
  { hanzi: '口', pinyin: 'kou', meaning: 'miệng' },
  { hanzi: '白', pinyin: 'bai', meaning: 'trắng' },
  { hanzi: '吗', pinyin: 'ma', meaning: 'trợ từ nghi vấn' },
  { hanzi: '马', pinyin: 'ma', meaning: 'ngựa' },
  { hanzi: '妈', pinyin: 'ma', meaning: 'mẹ' },
  { hanzi: '八', pinyin: 'ba', meaning: 'tám' },
  { hanzi: '很', pinyin: 'hen', meaning: 'rất' },
  { hanzi: '忙', pinyin: 'mang', meaning: 'bận' },
  { hanzi: '难', pinyin: 'nan', meaning: 'khó' },
  { hanzi: '语', pinyin: 'yu', meaning: 'ngôn ngữ' },
  { hanzi: '汉', pinyin: 'han', meaning: 'Hán' },
  { hanzi: '人', pinyin: 'ren', meaning: 'người' },
  { hanzi: '爸', pinyin: 'ba', meaning: 'bố' },
  { hanzi: '太', pinyin: 'tai', meaning: 'quá' },
  { hanzi: '弟', pinyin: 'di', meaning: 'em trai' },
  { hanzi: '男', pinyin: 'nan', meaning: 'nam' },
  { hanzi: '哥', pinyin: 'ge', meaning: 'anh trai' },
  { hanzi: '妹', pinyin: 'mei', meaning: 'em gái' },
  { hanzi: '学', pinyin: 'xue', meaning: 'học' },
  { hanzi: '英', pinyin: 'ying', meaning: 'Anh (nước Anh)' },
  { hanzi: '得', pinyin: 'de', meaning: 'rất/được' },
  { hanzi: '饿', pinyin: 'e', meaning: 'đói' },
  { hanzi: '去', pinyin: 'qu', meaning: 'đi' },
  { hanzi: '法', pinyin: 'fa', meaning: 'Pháp' },
  { hanzi: '韩', pinyin: 'han', meaning: 'Hàn Quốc' },
  { hanzi: '国', pinyin: 'guo', meaning: 'quốc gia' },
  { hanzi: '日', pinyin: 'ri', meaning: 'Nhật' },
  { hanzi: '对', pinyin: 'dui', meaning: 'đúng' },
  { hanzi: '也', pinyin: 'ye', meaning: 'cũng' },
  { hanzi: '天', pinyin: 'tian', meaning: 'ngày trời' },
  { hanzi: '明', pinyin: 'ming', meaning: 'sáng/mai' },
  { hanzi: '见', pinyin: 'jian', meaning: 'gặp' },
  { hanzi: '邮局', pinyin: 'you ju', meaning: 'bưu điện' },
  { hanzi: '寄', pinyin: 'ji', meaning: 'gửi' },
  { hanzi: '信', pinyin: 'xin', meaning: 'thư' },
];

const easySentences = [
  { hanzi: '你好吗？', pinyin: 'ni hao ma', meaning: 'Bạn khỏe không?' },
  { hanzi: '我很好。', pinyin: 'wo hen hao', meaning: 'Tôi rất khỏe.' },
  { hanzi: '你忙吗？', pinyin: 'ni mang ma', meaning: 'Bạn bận không?' },
  { hanzi: '我不忙。', pinyin: 'wo bu mang', meaning: 'Tôi không bận.' },
  { hanzi: '他是中国人。', pinyin: 'ta shi zhong guo ren', meaning: 'Anh ấy là người Trung Quốc.' },
  { hanzi: '她是老师。', pinyin: 'ta shi lao shi', meaning: 'Cô ấy là giáo viên.' },
  { hanzi: '我们学汉语。', pinyin: 'wo men xue han yu', meaning: 'Chúng tôi học tiếng Hán.' },
  { hanzi: '你呢？', pinyin: 'ni ne', meaning: 'Còn bạn?' },
  { hanzi: '他也学英语。', pinyin: 'ta ye xue ying yu', meaning: 'Anh ấy cũng học tiếng Anh.' },
  { hanzi: '我去邮局寄信。', pinyin: 'wo qu you ju ji xin', meaning: 'Tôi đi bưu điện gửi thư.' },
];

const hardSentences = [
  { hanzi: '你弟弟忙不忙？', pinyin: 'ni di di mang bu mang', meaning: 'Em trai bạn bận không?' },
  { hanzi: '他太忙了。', pinyin: 'ta tai mang le', meaning: 'Nó bận quá.' },
  { hanzi: '你哥哥是哪国人？', pinyin: 'ni ge ge shi na guo ren', meaning: 'Anh trai bạn là người nước nào?' },
  { hanzi: '他是韩国人。', pinyin: 'ta shi han guo ren', meaning: 'Anh ấy là người Hàn Quốc.' },
  { hanzi: '你饿不饿？', pinyin: 'ni e bu e', meaning: 'Bạn đói không?' },
  { hanzi: '我不饿。', pinyin: 'wo bu e', meaning: 'Tôi không đói.' },
  { hanzi: '我们明天见。', pinyin: 'wo men ming tian jian', meaning: 'Chúng ta gặp nhau ngày mai.' },
  { hanzi: '你妈妈忙不忙？', pinyin: 'ni ma ma mang bu mang', meaning: 'Mẹ bạn bận không?' },
  { hanzi: '她很忙。', pinyin: 'ta hen mang', meaning: 'Bà ấy rất bận.' },
  { hanzi: '你去邮局做什么？', pinyin: 'ni qu you ju zuo shen me', meaning: 'Bạn đi bưu điện làm gì?' },
  { hanzi: '我去寄信。', pinyin: 'wo qu ji xin', meaning: 'Tôi đi gửi thư.' },
];

const allSentences = [...easySentences, ...hardSentences];

const dataMeta = {
  vocabCount: vocabList.length,
  sentenceCount: allSentences.length,
};

  Object.assign(HB, {
    vocabList,
    easySentences,
    hardSentences,
    allSentences,
    dataMeta,
  });
})(window);
