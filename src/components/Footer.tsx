import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export const Footer = () => {
	return (
		<section className="footer">
			<div className="footer__brand">
				<h2 className="logo">
					beat-<span>Ros</span>
				</h2>
				<h5>
					All rights reserved by <span>Cnerd Mahadi.</span>
				</h5>
				<div className="footer__socials--mid">
					<div className="footer__social-links">
						<FaFacebook className="footer__social-icon" />
						<FaTwitter className="footer__social-icon" />
						<FaInstagram className="footer__social-icon" />
						<FaLinkedin className="footer__social-icon" />
					</div>
				</div>
			</div>
			<div className="footer__link-tab">
				<div className="footer__link-head">
					<h4>Help</h4>
					<div className="footer__links">
						<a href="#">FAQ</a>
						<a href="#">Return Order</a>
						<a href="#">Cancel Order</a>
					</div>
				</div>
				<div className="footer__link-head">
					<h4>Company</h4>
					<div className="footer__links">
						<a href="#">About Us</a>
						<a href="#">Contact Us</a>
						<a href="#">Careers</a>
					</div>
				</div>
			</div>
			<div className="footer__socials">
				<div className="footer__social-links">
					<FaFacebook className="footer__social-icon" />
					<FaTwitter className="footer__social-icon" />
					<FaInstagram className="footer__social-icon" />
					<FaLinkedin className="footer__social-icon" />
				</div>
			</div>
		</section>
	);
};
