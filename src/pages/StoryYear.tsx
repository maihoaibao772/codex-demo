import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';

const storyData: Record<string, { month: string; img: string; note: string }[]> = {
  '2023': [
    { month: 'Tháng 1', img: 'https://source.unsplash.com/random/400x300?forest', note: 'Khởi đầu bình yên' },
    { month: 'Tháng 6', img: 'https://source.unsplash.com/random/400x300?road', note: 'Những bước chân xa' },
    { month: 'Tháng 11', img: 'https://source.unsplash.com/random/400x300?night', note: 'Thành phố ngủ quên' },
  ],
  '2024': [
    { month: 'Tháng 2', img: 'https://source.unsplash.com/random/400x300?light', note: 'Ánh sáng đầu mùa' },
    { month: 'Tháng 8', img: 'https://source.unsplash.com/random/400x300?sky', note: 'Mây trôi giữa những ngày' },
    { month: 'Tháng 12', img: 'https://source.unsplash.com/random/400x300?abstract', note: 'Những nét màu cuối năm' },
  ],
  '2025': [
    { month: 'Tháng 3', img: 'https://source.unsplash.com/random/400x300?flower', note: 'Nhịp sống đơm hoa' },
    { month: 'Tháng 7', img: 'https://source.unsplash.com/random/400x300?sunrise', note: 'Hơi ấm bình minh mới' },
    { month: 'Tháng 10', img: 'https://source.unsplash.com/random/400x300?galaxy', note: 'Vũ trụ trong tầm tay' },
  ],
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.12, duration: 0.6, ease: 'easeOut' },
  }),
};

export function StoryYearPage() {
  const { year } = useParams<{ year?: string }>();
  const entries = year && year in storyData ? storyData[year] : null;
  const displayYear = year ?? '...';

  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 pt-28 pb-24">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-semibold tracking-[0.3em] text-neon-purple sm:text-4xl"
          >
            Story of {displayYear}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-3 break-words px-2 text-center text-sm leading-relaxed text-white/70 sm:px-4 sm:text-left sm:text-base"
          >
            Những khoảnh khắc đọng lại qua từng tháng, ánh sáng và nhịp thở của hành trình {year}.
          </motion.p>
        </div>
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Button asChild variant="outline">
            <Link to="/story">← Back to timeline</Link>
          </Button>
        </motion.div>
      </div>

      {!entries && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-panel flex flex-col items-center justify-center gap-4 rounded-3xl px-6 py-12 text-center"
        >
          <p className="break-words px-2 text-center text-base leading-relaxed text-white/70 sm:px-4 sm:text-lg">
            Không tìm thấy câu chuyện cho năm này. Hãy trở lại timeline để tiếp tục hành trình.
          </p>
          <Button asChild>
            <Link to="/story">Trở về Story Mode</Link>
          </Button>
        </motion.div>
      )}

      {entries && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-6 md:gap-8 sm:grid-cols-2 md:grid-cols-3"
        >
          {entries.map((entry, index) => (
            <motion.article
              key={`${entry.month}-${entry.img}`}
              variants={cardVariants}
              custom={index}
              className="glass-panel group overflow-hidden rounded-3xl border border-white/10 shadow-xl"
            >
              <div className="relative h-52 overflow-hidden sm:h-56">
                <motion.img
                  src={entry.img}
                  alt={`${entry.month} illustration`}
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.05 }}
                  whileInView={{ scale: 1 }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
              <div className="flex flex-col gap-2 px-4 py-5 text-center">
                <span className="text-xs font-semibold uppercase tracking-[0.4em] text-neon-cyan sm:text-sm">
                  {entry.month}
                </span>
                <p className="break-words px-2 text-sm leading-relaxed text-white/80 sm:px-4 sm:text-base">
                  {entry.note}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}
    </section>
  );
}
