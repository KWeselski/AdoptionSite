import styles from "../styles";

const SectionHero = ({ title, description, children }) => {
  return (
    <section className="flex flex-col p-4">
      <div
        className={`${styles.flexCenter} w-full flex-col xl:px-0 sm:px-16 px-6`}
      >
        <p className="text-[48px] text-green-700 font-semibold">{title}</p>
        <p className="text-[18px] text-gray-500 font-semibold">{description}</p>
      </div>
      {children}
    </section>
  );
};

export default SectionHero;
