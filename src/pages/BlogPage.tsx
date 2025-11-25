import SectionTitle from '../components/ui/SectionTitle';
import SectionWrapper from '../components/ui/SectionWrapper';
import BlogCard from '../components/ui/BlogCard';
import { blogs } from '../data/blog';

const BlogPage = () => {
  return (
    <div className="pt-10">
      <SectionTitle title="Blog" subtitle="Tips học nhanh, áp dụng được ngay" />
      <SectionWrapper>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
};

export default BlogPage;
