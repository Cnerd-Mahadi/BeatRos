import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export const Footer = () => {
	return (
		<section className="footer">
			<div className="footer__brand">
				<h2 className="logo">
					beat-<span>Ros</span>
				</h2>
				<h5>
					All rights reserved by{" "}
					<a href="https://github.com/Cnerd-Mahadi">
						<span>Cnerd Mahadi.</span>
					</a>
				</h5>
				<div className="footer__socials--mid">
					<div className="footer__social-links">
						<a href="https://www.facebook.com/cnerdmahadi">
							<FaFacebook className="footer__social-icon" />
						</a>
						<a href="https://twitter.com/CnerdMahadi">
							<FaTwitter className="footer__social-icon" />
						</a>
						<a href="https://www.instagram.com/c_n.e.r.d/">
							<FaInstagram className="footer__social-icon" />
						</a>
						<a href="https://www.linkedin.com/in/mahbubur-rahman-mahadi-0b13951b1/">
							<FaLinkedin className="footer__social-icon" />
						</a>
					</div>
				</div>
			</div>
			<div className="footer__link-tab">
				<div className="footer__link-head">
					<h4>Help</h4>
					<div className="footer__links">
						<a href="https://hytest.fi/information/online-store-faq">FAQ</a>
						<a href="https://hytest.fi/information/online-store-faq">
							Return Order
						</a>
						<a href="https://hytest.fi/information/online-store-faq">
							Cancel Order
						</a>
					</div>
				</div>
				<div className="footer__link-head">
					<h4>Company</h4>
					<div className="footer__links">
						<a href="https://hytest.fi/about-us">About Us</a>
						<a href="https://hytest.fi/contact">Contact Us</a>
						<a href="https://careers.google.com/">Careers</a>
					</div>
				</div>
			</div>
			<div className="footer__socials">
				<div className="footer__social-links">
					<a href="https://www.facebook.com/cnerdmahadi">
						<FaFacebook className="footer__social-icon" />
					</a>
					<a href="https://twitter.com/CnerdMahadi">
						<FaTwitter className="footer__social-icon" />
					</a>
					<a href="https://www.instagram.com/c_n.e.r.d/">
						<FaInstagram className="footer__social-icon" />
					</a>
					<a href="https://www.linkedin.com/in/mahbubur-rahman-mahadi-0b13951b1/">
						<FaLinkedin className="footer__social-icon" />
					</a>
				</div>
			</div>
		</section>
	);
};
