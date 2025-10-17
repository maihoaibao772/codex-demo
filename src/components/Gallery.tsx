import { MouseEvent } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import * as ScrollArea from '@radix-ui/react-scroll-area';

const galleryItems = [
  {
    src: 'https://images.unsplash.com/photo-1522199999282-74de0b6d0d4c?auto=format&fit=crop&w=1000&q=80',
    title: 'Nebula Loom',
  },
  {
    src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1000&q=80',
    title: 'Chromatic Dunes',
  },
  {
    src: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1000&q=80',
    title: 'Luminous Echoes',
  },
  {
    src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
    title: 'Infra Skyline',
  },
  {
    src: 'https://images.unsplash.com/photo-1482192597420-4817fdd7e8b0?auto=format&fit=crop&w=1000&q=80',
    title: 'Electric Bloom',
  },
  {
    src: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=1000&q=80',
    title: 'Prismatic Drift',
  },
];

const galleryCaption = (title: string) =>
  `Lorem ipsum frequencies for ${title.toLowerCase()}—crafted from synthetic twilight and impossible reflections.`;

const GalleryCard = ({ src, title }: { src: string; title: string }) => {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, { stiffness: 120, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 18 });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    rotateY.set((deltaX / bounds.width) * 12);
    rotateX.set((-deltaY / bounds.height) * 12);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur"
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.img
        src={src}
        alt={title}
        loading="lazy"
        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6">
        <motion.span className="text-lg font-semibold tracking-wide text-white">
          {title}
        </motion.span>
        <p className="text-xs text-white/70">{galleryCaption(title)}</p>
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  return (
    <section id="gallery" className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 py-28 md:py-36">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold uppercase tracking-[0.3em] text-white sm:text-4xl">
            Gallery
          </h2>
          <p className="mt-3 max-w-xl text-sm text-white/60">
            A looping window into artifacts I stitched together while dreaming in RGB. Hover to bend the light, scroll to find the pulse.
          </p>
        </div>
      </div>
      <ScrollArea.Root className="w-full">
        <ScrollArea.Viewport className="w-full">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {galleryItems.map((item) => (
              <GalleryCard key={item.title} {...item} />
            ))}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          orientation="horizontal"
          className="hidden h-2 w-full rounded-full bg-white/5 md:block"
        >
          <ScrollArea.Thumb className="flex-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </section>
  );
};

export default Gallery;
