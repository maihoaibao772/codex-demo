import { motion } from 'framer-motion';

const lines = [
  "I'm mahiiruu_",
  "I create things that don't exist.",
  'They glitch, glow, and sometimes whisper back.',
];

const capsules = [
  'Designing surreal interfaces where physics is optional and delight is compulsory.',
  'Mixing procedural art, generative audio, and whispers from beta universes.',
  'Collaborating with dreamers, rebels, and algorithms to prototype better myths.',
];

const About = () => {
  return (
    <section id="about" className="relative mx-auto flex max-w-5xl flex-col gap-12 px-6 py-28 md:py-36">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18 } } }}
        className="space-y-6"
      >
        {lines.map((line) => (
          <motion.p
            key={line}
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-3xl font-light leading-tight text-white/80 md:text-4xl"
          >
            {line}
          </motion.p>
        ))}
      </motion.div>
      <div className="grid gap-6 md:grid-cols-3">
        {capsules.map((copy, idx) => (
          <motion.div
            key={copy}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: idx * 0.1, duration: 0.7, ease: 'easeOut' }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/10 to-pink-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <p className="relative text-sm leading-relaxed text-white/60">{copy}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default About;
