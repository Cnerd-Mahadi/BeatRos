import { Link } from "react-router-dom";
import { BlogCard } from "../components/blog/BlogCard";
import { blogs } from "../data/blogs";

export const Blogs = () => {
	const allBlogs = blogs;

	return (
		<div className="container blogs">
			{allBlogs.map((blog) => {
				return (
					<Link key={blog.id} to={`/blog-details/${blog.id}`}>
						<BlogCard blog={blog} />
					</Link>
				);
			})}
		</div>
	);
};
