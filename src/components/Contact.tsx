import { FormEvent, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';

type Field = {
  id: string;
  label: string;
  type: string;
  placeholder: string;
};

const fields: Field[] = [
  { id: 'name', label: 'Name', type: 'text', placeholder: 'your alias' },
  { id: 'email', label: 'Email', type: 'email', placeholder: 'contact@voidmail.xyz' },
];

const Contact = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    console.log('contact-form', payload);
    setMessage('');
    event.currentTarget.reset();
  };

  const handleGlow = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    event.currentTarget.style.setProperty('--x', `${x}%`);
    event.currentTarget.style.setProperty('--y', `${y}%`);
  }, []);

  const resetGlow = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.removeProperty('--x');
    event.currentTarget.style.removeProperty('--y');
  }, []);

  return (
    <section id="contact" className="relative mx-auto flex max-w-4xl flex-col gap-10 px-6 pb-32 pt-10 md:pb-40">
      <div className="flex flex-col gap-3">
        <h2 className="text-3xl font-semibold uppercase tracking-[0.3em] text-white sm:text-4xl">Contact</h2>
        <p className="text-sm text-white/60">
          Drop a line, a waveform, or a wild prompt. I reply in gradients.
        </p>
      </div>
      <motion.form
        onSubmit={handleSubmit}
        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 shadow-glow backdrop-blur"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-40 blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 opacity-0 transition-opacity duration-700 group-focus-within:opacity-100" />
        <div className="relative grid gap-6">
          {fields.map((field) => (
            <div key={field.id} className="flex flex-col gap-2">
              <label htmlFor={field.id} className="text-xs uppercase tracking-[0.35em] text-white/50">
                {field.label}
              </label>
              <div
                className="relative"
                onMouseMove={handleGlow}
                onMouseLeave={resetGlow}
              >
                <span className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10" />
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="peer w-full rounded-2xl border border-transparent bg-black/40 px-4 py-3 text-sm text-white/80 outline-none transition-all duration-300 focus:border-transparent focus:bg-black/60"
                  required
                />
                <span
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 peer-focus:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at var(--x,50%) var(--y,50%), rgba(236,72,153,0.35), transparent 65%)',
                  }}
                />
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-xs uppercase tracking-[0.35em] text-white/50">
              Message
            </label>
            <div
              className="relative"
              onMouseMove={handleGlow}
              onMouseLeave={resetGlow}
            >
              <span className="pointer-events-none absolute inset-0 rounded-2xl border border-white/10" />
              <textarea
                id="message"
                name="message"
                placeholder="tell me a story from tomorrow"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="peer h-32 w-full rounded-2xl border border-transparent bg-black/40 px-4 py-3 text-sm text-white/80 outline-none transition-all duration-300 focus:border-transparent focus:bg-black/60"
                required
              />
              <span
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 peer-focus:opacity-100"
                style={{
                  background:
                    'radial-gradient(circle at var(--x,50%) var(--y,50%), rgba(99,102,241,0.35), transparent 65%)',
                }}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Send Transmission</Button>
          </div>
        </div>
      </motion.form>
    </section>
  );
};

export default Contact;
