import { motion } from "framer-motion";
import { FormEvent, useState } from "react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9 }}
        className="glass-card rounded-3xl p-10 shadow-neon"
      >
        <h2 className="font-display text-3xl uppercase tracking-[0.4em] text-white/80">Contact</h2>
        <p className="mt-4 text-white/60">Drop a message and the neon spirits will respond.</p>
        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col text-left text-xs uppercase tracking-[0.3em] text-white/50">
              Name
              <input
                required
                name="name"
                className="mt-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 shadow-inner transition focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-purple/60"
              />
            </label>
            <label className="flex flex-col text-left text-xs uppercase tracking-[0.3em] text-white/50">
              Email
              <input
                required
                type="email"
                name="email"
                className="mt-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 shadow-inner transition focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-purple/60"
              />
            </label>
          </div>
          <label className="flex flex-col text-left text-xs uppercase tracking-[0.3em] text-white/50">
            Message
            <textarea
              required
              name="message"
              rows={4}
              className="mt-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/90 shadow-inner transition focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-purple/60"
            />
          </label>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(247,37,133,0.65)" }}
            whileTap={{ scale: 0.97 }}
            className="w-full rounded-full bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-950"
          >
            {submitted ? "Summoning..." : "Send Message"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
