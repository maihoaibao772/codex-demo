import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import SectionWrapper from '../components/ui/SectionWrapper';
import SectionTitle from '../components/ui/SectionTitle';
import FeatureCard from '../components/ui/FeatureCard';
import EventCard from '../components/ui/EventCard';
import BlogCard from '../components/ui/BlogCard';
import { events } from '../data/events';
import { blogs } from '../data/blog';

const heroBg =
  'https://images.unsplash.com/photo-1505764706515-aa95265c5abb?auto=format&fit=crop&w=1600&q=80';

const HomePage = () => {
  return (
    <div className="pt-8">
      <div
        className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-soft"
        style={{ minHeight: '70vh' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `linear-gradient(120deg, rgba(15,118,110,0.7), rgba(15,118,110,0.3)), url(${heroBg})` }}
        />
        <div className="relative grid h-full grid-cols-1 gap-6 px-6 py-12 md:grid-cols-2 md:px-10 lg:px-16">
          <div className="flex flex-col justify-center space-y-6">
            <div className="inline-flex w-max rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
              Học tiếng Trung như đi dạo sở thú
            </div>
            <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
              Khám phá Mandarin qua lộ trình HSK, flashcard và sự kiện vui nhộn.
            </h1>
            <p className="text-lg text-white/85">
              Lớp học thân thiện, dữ liệu rõ ràng, UI giàu cảm hứng. Chọn lộ trình phù hợp, luyện từ vựng, flashcard và bài tập
              mỗi ngày.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button as={Link} to="/roadmap">
                Chọn lộ trình HSK
              </Button>
              <Button as={Link} to="/flashcards" variant="ghost">
                Bắt đầu ôn flashcard
              </Button>
            </div>
          </div>
          <div className="glass mt-6 rounded-3xl bg-white/15 p-6 text-white shadow-lg backdrop-blur md:mt-0">
            <h3 className="text-xl font-semibold">Hành trình của cậu</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-lg">🧭</span>
                <div>
                  <div className="font-semibold">Lộ trình HSK 0→6</div>
                  <p className="text-white/80">Từng bước rõ ràng, kèm tài liệu & check-list.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-lg">🧠</span>
                <div>
                  <div className="font-semibold">Flashcard & Spaced Repetition</div>
                  <p className="text-white/80">Ôn tập thông minh, nhớ lâu hơn với ví dụ sinh động.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-lg">🎯</span>
                <div>
                  <div className="font-semibold">Bài tập thực chiến</div>
                  <p className="text-white/80">Trắc nghiệm, điền từ, ghép câu để luyện phản xạ.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <SectionWrapper id="explore">
        <SectionTitle
          title="Khám phá khóa học"
          subtitle="Chọn module cậu hứng thú nhất và vào học ngay"
          action={
            <Button as={Link} to="/vocabulary" size="sm">
              Xem từ vựng
            </Button>
          }
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            title="Lộ trình HSK 0 → 6"
            description="Checklist mục tiêu, đầu ra, tài liệu ở từng cấp độ."
            cta="Mở lộ trình"
            to="/roadmap"
            image="https://images.unsplash.com/photo-1582719478248-54e9f2af4c69?auto=format&fit=crop&w=800&q=80"
            icon={<span>🧭</span>}
          />
          <FeatureCard
            title="Từ vựng theo chủ đề"
            description="Bảng từ Hán tự - Pinyin - Nghĩa Việt kèm filter chủ đề."
            cta="Xem list"
            to="/vocabulary"
            image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
            icon={<span>📚</span>}
          />
          <FeatureCard
            title="Flashcard & SRS"
            description="Lật thẻ, đánh dấu đã nhớ/chưa nhớ để ôn lặp."
            cta="Ôn ngay"
            to="/flashcards"
            image="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80"
            icon={<span>🧠</span>}
          />
          <FeatureCard
            title="Lớp Live & Sự kiện"
            description="Theo dõi lịch livestream, workshop, thử thách nhóm."
            cta="Xem lịch"
            to="#events"
            image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80"
            icon={<span>🎥</span>}
          />
        </div>
      </SectionWrapper>

      <SectionWrapper id="events">
        <SectionTitle title="Sự kiện sắp diễn ra" subtitle="Livestream, workshop và thử thách hàng tuần" />
        <div className="grid gap-5 md:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="community">
        <SectionTitle title="Tham gia cộng đồng" subtitle="Group chat, tài liệu và mentor hỗ trợ" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-gradient-to-br from-primary/10 via-white to-accent/10 p-8 shadow-soft">
            <h3 className="text-xl font-semibold text-slate-900">Nhóm chat + tài liệu</h3>
            <p className="mt-2 text-sm text-slate-600">
              Nhận file PDF, quiz hàng tuần và nhờ mentor sửa phát âm. Tất cả trong một nhóm chat riêng tư.
            </p>
            <Button as="a" href="#" className="mt-4">
              Tham gia ngay
            </Button>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-primary/70 p-8 text-white shadow-soft">
            <h3 className="text-xl font-semibold">Câu lạc bộ đọc song ngữ</h3>
            <p className="mt-2 text-sm text-white/80">
              Mỗi tuần một chủ đề: du lịch, công việc, ẩm thực. Đọc to, sửa lỗi, tăng phản xạ.
            </p>
            <Button as="a" href="#" variant="ghost" className="mt-4 bg-white text-primary">
              Đăng ký suất thử
            </Button>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="blog">
        <SectionTitle title="Blog / Tips học tiếng Trung" subtitle="Ngắn gọn, áp dụng được ngay" />
        <div className="grid gap-5 md:grid-cols-3">
          {blogs.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="cta">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Nhận checklist HSK miễn phí</h3>
            <p className="mt-2 text-sm text-slate-600">
              Đăng ký email để tớ gửi cậu bộ checklist 30 ngày chinh phục HSK1 kèm flashcard.
            </p>
          </div>
          <form className="flex flex-col gap-3 md:flex-row">
            <input
              type="email"
              placeholder="Email của cậu"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-primary focus:outline-none"
            />
            <Button type="submit">Nhận ngay</Button>
          </form>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default HomePage;
