import { footerLinks } from '../constants';
import styles from '../styles';

const Footer = () => (
  <footer className="bg-green-800 text-white py-4">
    <div className={`${styles.flexBetween} container mx-auto px-4 flex-wrap `}>
      <div className="w-full sm:w-auto mb-4 sm:mb-0">
        <ul className={styles.footerLinkContainer}>
          {footerLinks.sections.map((section, index) => (
            <li className={styles.footerLi} key={index}>
              <a href={section.link} className={styles.footerLink}>
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full sm:w-auto mb-4 sm:mb-0">
        <ul className={styles.footerLinkContainer}>
          <li className={styles.footerLi}>
            <a
              href={`tel:${footerLinks.contactInfo.phoneNumber}`}
              className={styles.footerLink}
            >
              {footerLinks.contactInfo.phoneNumber}
            </a>
          </li>
          <li className={styles.footerLi}>
            <a
              href={`mailto:${footerLinks.contactInfo.email}`}
              className={styles.footerLink}
            >
              {footerLinks.contactInfo.email}
            </a>
          </li>
          <li className={styles.footerLi}>
            <span className="font-semibold text-gray-300">
              {footerLinks.contactInfo.address}
            </span>
          </li>
        </ul>
      </div>
      <div className="w-full sm:w-auto mb-4 sm:mb-0">
        <ul className={styles.footerLinkContainer}>
          {footerLinks.usefulLinks.map((section, index) => (
            <li className={styles.footerLi} key={index}>
              <a href={section.link} className={styles.footerLink}>
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full sm:w-auto">
        <ul className={styles.footerLinkContainer}>
          {footerLinks?.socialMediaLinks.map((socialMedia, index) => (
            <li className={styles.footerLi} key={index}>
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
