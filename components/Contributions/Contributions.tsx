import Image from "next/image";

const contributionContainerClasses = "border-2 border-black bg-primary-light-blue rounded-[9px] flex items-center max-tablet:p-[2.4rem_1.6rem] tablet:p-[3.2rem]";
const contributionsIconClasses = "max-tablet:hidden tablet:inline-block tablet:relative tablet:[object-fit:cover] tablet:aspect-square tablet:mr-[3.2rem] tablet:max-desktop:h-[105px] desktop:h-[127px]";
const titleClasses = "text-black flex underline font-montserrat font-semibold text-[2.4rem]";
const titleImageClasses = "relative inline-block w-[25px] h-[25px] max-tablet:order-1 tablet:order-2";
const textClasses = "font-montserrat font-light text-black max-tablet:text-[1.4rem] tablet:text-[2rem]";

const Contributions = () => {
    return(
    <div className={contributionContainerClasses}>
        <div className={contributionsIconClasses}><Image src="/images/donateIcon.svg" fill={true} alt=""/></div>
        <div>
        <a href="https://oma.org.ar/donaciones/" className={titleClasses}>
                        <div className={titleImageClasses}><Image src="/images/pageLinkIcon.svg" fill={true} alt=""/></div>
                        <span className="max-tablet:order-2 tablet:order-1">Hacé tu aporte acá</span>
        </a>
        <p className={textClasses}>OMA es principalmente financiada por sus participantes. Para soportar los crecientes costos de funcionamiento, agredeceríamos muchísimo si pueden contribuir con lo que puedan.</p>
        </div>
    </div>
    );
}

export default Contributions;