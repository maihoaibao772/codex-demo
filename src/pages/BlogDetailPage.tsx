import { Link, useParams } from 'react-router-dom';
import SectionWrapper from '../components/ui/SectionWrapper';
import Button from '../components/ui/Button';
import { blogs } from '../data/blog';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const post = blogs.find((b) => b.slug === slug);

  if (!post) {
    return (
      <div className="pt-10">
        <SectionWrapper>
          <p className="text-sm text-slate-600">Bài viết không tồn tại.</p>
          <Button as={Link} to="/blog" className="mt-4">
            Quay lại blog
          </Button>
        </SectionWrapper>
      </div>
    );
  }

  return (
    <div className="pt-10">
      <Button as={Link} to="/blog" variant="ghost" className="mb-4 bg-white text-primary">
        ← Quay lại
      </Button>
      <SectionWrapper>
        <div className="space-y-4">
          <div className="text-sm uppercase text-primary">{post.date}</div>
          <h1 className="text-3xl font-bold text-slate-900">{post.title}</h1>
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-primary">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-primary/10 px-3 py-1">
                #{tag}
              </span>
            ))}
          </div>
          <p className="text-base leading-relaxed text-slate-700">{post.content}</p>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default BlogDetailPage;
