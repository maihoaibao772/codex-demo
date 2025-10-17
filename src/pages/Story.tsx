import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const timeline = [
  {
    year: '2023',
    description: 'The quiet beginning.',
    image: 'https://images.unsplash.com/photo-1526312426976-f4d754fa9bd6?auto=format&fit=crop&w=1200&q=80',
    note: 'Khởi đầu nhẹ nhàng, nhịp thở đầu tiên của ánh sáng.',
  },
  {
    year: '2024',
    description: 'The storm of creation.',
    image: 'https://images.unsplash.com/photo-1474433188271-d3f339f41911?auto=format&fit=crop&w=1200&q=80',
    note: 'Cơn bão sắc màu và âm thanh nhào nặn nên câu chuyện.',
  },
  {
    year: '2025',
    description: 'The light finds form.',
    image: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?auto=format&fit=crop&w=1200&q=80',
    note: 'Nguồn sáng kết tinh, đường nét trở nên rõ ràng.',
  },
];

export function StoryPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  const navigate = useNavigate();

  const hueFilter = useTransform(scrollYProgress, [0, 1], ['hue-rotate(0deg)', 'hue-rotate(45deg)']);
  const gradientOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.8]);

  return (
    <section
      ref={containerRef}
      className="relative mx-auto flex w-full max-w-6xl flex-col gap-14 pt-28 pb-32 md:flex-row"
    >
      <motion.div
        style={{ filter: hueFilter, opacity: gradientOpacity }}
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(0,245,255,0.25),_transparent_60%),radial-gradient(circle_at_bottom_right,_rgba(155,91,255,0.3),_transparent_55%)] blur-3xl"
      />
      <div className="md:sticky md:top-32 md:h-[calc(100vh-8rem)] md:w-64">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-semibold tracking-[0.35em] text-neon-cyan sm:text-4xl"
        >
          Story Mode ⏳
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-4 break-words px-2 text-center text-xs uppercase tracking-[0.4em] text-white/60 sm:px-4 sm:text-sm md:text-left"
        >
          Chạm để mở từng năm và lắng nghe câu chuyện.
        </motion.p>
        <motion.div
          className="mt-10 hidden h-64 w-[3px] bg-gradient-to-b from-neon-cyan via-neon-magenta to-neon-purple md:block"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </div>
      <div className="flex-1 space-y-10">
        {timeline.map((entry, index) => (
          <motion.button
            key={entry.year}
            type="button"
            onClick={() => navigate(`/story/${entry.year}`)}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, delay: index * 0.15, ease: [0.33, 1, 0.68, 1] }}
            className="group relative flex w-full overflow-hidden rounded-3xl border border-white/10 text-left shadow-2xl transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
            aria-label={`Open story for ${entry.year}`}
          >
            <motion.div
              layout
              className="absolute inset-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              <img src={entry.image} alt={`${entry.year} background`} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent" />
            </motion.div>
            <div className="relative z-10 flex w-full flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-10">
              <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
                <span className="text-xs font-semibold uppercase tracking-[0.5em] text-neon-magenta sm:text-sm">
                  {entry.year}
                </span>
                <h3 className="break-words text-2xl font-semibold text-white sm:text-3xl">{entry.description}</h3>
              </div>
              <p className="break-words px-2 text-sm leading-relaxed text-white/80 transition-colors duration-300 group-hover:text-white sm:px-4 sm:text-base">
                {entry.note}
              </p>
              <span className="text-2xl text-neon-cyan transition-transform duration-300 group-hover:translate-x-2">↗</span>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
