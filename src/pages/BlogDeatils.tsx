import { useParams } from "react-router-dom";
import { ElementError } from "../components/common/ElementError";
import { blogs } from "../data/blogs";

export const BlogDetails = () => {
	const blogId = Number(useParams().id);
	const blog = blogs.find((blog) => blog.id === blogId);

	return blog ? (
		<div className="blog-details">
			<div className="blog-details__author">
				<img src={blog.authorImage} alt="" />
				<h3 className="blog-details__author-name">{blog.author}</h3>
				<h3 className="blog-details__date">{blog.updated}</h3>
			</div>
			<h2>{blog.title}</h2>
			<h3>{blog.hook}</h3>
			<img src={blog.image} alt="" />
			<p dangerouslySetInnerHTML={{ __html: blog.description }} />
		</div>
	) : (
		<ElementError />
	);
};
