import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const LinhTinh = () => {
  return (
    <section id="linh-tinh" className="mx-auto max-w-4xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="glass-card rounded-3xl p-10 shadow-neon"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl uppercase tracking-[0.4em] text-white/80">Linh Tinh 💻</h2>
          <Sparkles className="h-8 w-8 text-neon-cyan" />
        </div>
        <motion.div
          whileHover={{ y: -4 }}
          className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-inner backdrop-blur"
        >
          <h3 className="font-display text-xl text-white/90">Nhà coder</h3>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>
              <span className="font-semibold text-neon-cyan">Nhà coder:</span> Hoài Bảo
            </li>
            <li>
              <span className="font-semibold text-neon-cyan">Sinh năm:</span> 2006
            </li>
            <li>
              <span className="font-semibold text-neon-cyan">Quê quán:</span> Thanh Hóa
            </li>
            <li>
              <span className="font-semibold text-neon-cyan">Hiện tại:</span> Thành phố Hồ Chí Minh
            </li>
            <li>
              <span className="font-semibold text-neon-cyan">Mô tả:</span> Do rảnh nên ngồi nghịch 😆
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LinhTinh;
