import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="relative mx-auto max-w-4xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="glass-card rounded-3xl p-10 text-center shadow-neon"
      >
        <h2 className="font-display text-3xl uppercase tracking-[0.4em] text-white/80">About</h2>
        <p className="mt-6 text-lg text-white/75">
          I'm mahiiruu_, I create things that don't exist.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
