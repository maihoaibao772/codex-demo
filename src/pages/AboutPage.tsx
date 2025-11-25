import SectionTitle from '../components/ui/SectionTitle';
import SectionWrapper from '../components/ui/SectionWrapper';
import Button from '../components/ui/Button';

const faqs = [
  {
    q: 'Website có miễn phí không?',
    a: 'Nội dung demo hoàn toàn miễn phí. Khi triển khai thật cậu có thể thêm gói học trả phí.',
  },
  {
    q: 'Có lớp live không?',
    a: 'Có. Tớ cập nhật lịch trong mục Sự kiện, cậu có thể đăng ký tham gia thử.',
  },
  {
    q: 'Cần kiến thức nền tảng gì?',
    a: 'Không cần. Bắt đầu từ HSK0 với pinyin và 150 từ cơ bản.',
  },
];

const AboutPage = () => {
  return (
    <div className="pt-10 space-y-8">
      <SectionTitle title="Về Chinese Zoo" subtitle="Sứ mệnh: biến việc học tiếng Trung thành hành trình vui vẻ" />
      <SectionWrapper>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Tại sao là "Zoo"?</h3>
            <p className="mt-2 text-sm text-slate-600">
              Vì mỗi góc học là một khu tham quan nhỏ: lộ trình, từ vựng, flashcard, bài tập, sự kiện. Cậu chọn khu mình thích và
              học theo nhịp của riêng mình.
            </p>
            <p className="mt-2 text-sm text-slate-600">
              UI mềm mại, thẻ bo tròn, ảnh thiên nhiên giúp não thư giãn, tăng dopamine và ghi nhớ tốt hơn.
            </p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-white to-accent/10 p-6 shadow-soft">
            <h4 className="text-lg font-semibold text-slate-900">Liên hệ</h4>
            <form className="mt-3 space-y-3">
              <input
                type="text"
                placeholder="Tên của cậu"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none"
              />
              <textarea
                placeholder="Cậu muốn nhắn gì?"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none"
                rows={4}
              />
              <Button type="submit">Gửi cho tớ</Button>
            </form>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <SectionTitle title="FAQ" />
        <div className="space-y-3">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="text-sm font-semibold text-slate-900">{f.q}</div>
              <p className="mt-1 text-sm text-slate-600">{f.a}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default AboutPage;
