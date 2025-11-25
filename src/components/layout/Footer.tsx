const Footer = () => {
  return (
    <footer className="mt-16 bg-slate-900 text-slate-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="text-xl font-semibold text-white">Chinese Zoo</div>
          <p className="mt-3 text-sm text-slate-300">
            Nơi học tiếng Trung như dạo chơi sở thú: nhiều góc vui, dễ nhớ, thân thiện.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white">Khóa học</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>HSK 1-6 roadmap</li>
            <li>Flashcard & SRS</li>
            <li>Ngữ pháp mini-quiz</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Cộng đồng</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>Group chat học tập</li>
            <li>Livestream hàng tuần</li>
            <li>Tài liệu PDF</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white">Nhận tài liệu mới</h4>
          <form className="mt-3 flex gap-2">
            <input
              type="email"
              placeholder="Email của cậu"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-white hover:brightness-110"
            >
              Gửi
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-400">
        © 2024 Chinese Zoo. Made with love & bamboo.
      </div>
    </footer>
  );
};

export default Footer;
