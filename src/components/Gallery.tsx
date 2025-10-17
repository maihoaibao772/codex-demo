import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1526481280695-3c4694813f21?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80&sat=-100",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80"
];

const Gallery = () => {
  return (
    <section id="gallery" className="mx-auto max-w-6xl px-6 py-24">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-3xl uppercase tracking-[0.4em] text-white/80">Gallery</h2>
        <span className="text-xs uppercase tracking-[0.3em] text-white/50">Random vibes</span>
      </div>
      <motion.div
        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {images.map((src, index) => (
          <motion.article
            key={src + index}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-neon"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ y: -6 }}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={src}
                alt={`Neon inspiration ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <div className="absolute inset-x-0 bottom-0 translate-y-full bg-slate-950/80 p-4 text-center text-xs uppercase tracking-[0.3em] text-white/80 transition-transform duration-500 group-hover:translate-y-0">
              Electric fragment #{index + 1}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Gallery;
