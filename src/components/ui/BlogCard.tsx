import { Link } from 'react-router-dom';
import { BlogPost } from '../../types';

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div>
        <div className="text-xs uppercase tracking-wide text-primary">{post.date}</div>
        <h3 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-primary">{post.title}</h3>
        <p className="mt-2 text-sm text-slate-600">{post.summary}</p>
      </div>
      <div className="mt-3 text-sm font-semibold text-primary">Đọc tiếp →</div>
    </Link>
  );
};

export default BlogCard;
