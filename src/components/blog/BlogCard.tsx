import { FC } from "react";
import { blogs } from "../../data/blogs";

type BlogCardProps = {
	blog: (typeof blogs)[0];
};

export const BlogCard: FC<BlogCardProps> = ({ blog }) => {
	return (
		<div className="blog-card">
			<img src={blog.image} alt="" />
			<div className="blog-card__info">
				<h5 className="blog-card__info-type">Infotainment -</h5>
				<h5 className="blog-card__info-date">{blog.updated}</h5>
			</div>
			<div className="blog-card__text">
				<h3>{blog.title}</h3>
				<p className="blog-card__hook">{blog.hook}</p>
			</div>
			<div className="blog-card__author-image">
				<img src={blog.authorImage} alt="" />
				<div className="blog-card__author-info">
					<h5>{blog.author}</h5>
					<p>Author, Blogger</p>
				</div>
			</div>
		</div>
	);
};
