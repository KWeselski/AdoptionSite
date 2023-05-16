import styles from "../styles";
import { footerLinks } from "../constants";

const Footer = () => (
  <footer className="bg-green-800 text-white py-4">
    <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
      <div className="w-full sm:w-auto mb-4 sm:mb-0">
        <ul className="flex flex-col items-start">
          {footerLinks.sections.map((section, index) => (
            <li className="mr-4" key={index}>
              <a href={section.link} className={styles.footerLink}>
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full sm:w-auto mb-4 sm:mb-0">
        <ul className="flex flex-col items-start">
          <li className="mr-4">
            <a
              href={`tel:${footerLinks.contactInfo.phoneNumber}`}
              className={styles.footerLink}
            >
              {footerLinks.contactInfo.phoneNumber}
            </a>
          </li>
          <li className="mr-4">
            <a
              href={`mailto:${footerLinks.contactInfo.email}`}
              className={styles.footerLink}
            >
              {footerLinks.contactInfo.email}
            </a>
          </li>
          <li className="mr-4">
            <span className="font-semibold text-gray-300">
              {footerLinks.contactInfo.address}
            </span>
          </li>
        </ul>
      </div>
      <div className="w-full sm:w-auto mb-4 sm:mb-0">
        <ul className="flex flex-col items-start">
          {footerLinks.usefulLinks.map((section, index) => (
            <li className="mr-4" key={index}>
              <a href={section.link} className={styles.footerLink}>
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full sm:w-auto">
        <ul className="flex flex-col items-start">
          {footerLinks?.socialMediaLinks.map((socialMedia, index) => (
            <li className="mr-4" key={index}>
              <div className="flex flex-row items-center mt-3">
                <img
                  key={index}
                  src={socialMedia.icon}
                  alt={socialMedia.platform}
                  className="w-[24px] h-[24px] mr-2"
                />
                <a
                  href={socialMedia.link}
                  className={styles.footerLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {socialMedia.platform}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="mt-4 text-center">
      <p className="text-gray-300 text-sm">{footerLinks.legalInfo}</p>
    </div>
  </footer>
);

export default Footer;
