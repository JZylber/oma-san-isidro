import Link from "next/link";
import Image from "next/image";

const footerClasses = "max-tablet:w-[80%] max-tablet:mt-[5.6rem] tablet:max-desktop:grid tablet:max-desktop:w-[85%] tablet:max-desktop:grid-cols-8 tablet:max-desktop:[column-gap:calc(2.5*100vw/104.25)] tablet:max-desktop:[grid-template-rows:5.8rem_max-content] tablet:max-desktop:items-start tablet:max-desktop:[row-gap:calc(6*100vh/149.25)] tablet:max-desktop:mt-[7.2rem] desktop:grid desktop:grid-cols-10 desktop:[column-gap:calc(2.5*100vw/180)] desktop:[grid-template-rows:9rem_max-content] desktop:items-start desktop:[row-gap:calc(6*100vmin/128)] desktop:w-[80%] desktop:mt-[16rem] desktop:max-w-[1200px]";
const footerSecretaryClasses = "tablet:max-desktop:[grid-column:7/-1] tablet:max-desktop:[grid-row:1/2] desktop:[grid-column:9/-1] desktop:[grid-row:1/2] tablet:[transform:translateX(calc(-2*100vmin/128))] tablet:w-max";
const footerSecretaryTitleClasses = "font-montserrat font-bold max-tablet:text-[1.4rem] max-tablet:[line-height:calc(2*100vmin/50)] max-tablet:mb-[0.8rem] tablet:max-desktop:text-[1.5rem] tablet:max-desktop:[line-height:calc(2.25*100vmin/104.25)] tablet:max-desktop:[margin-bottom:calc(0.625*100vmin/104.25)] desktop:text-[2rem] desktop:[line-height:calc(3*100vmin/128)] desktop:[margin-bottom:calc(1.25*100vmin/128)]";
const footerSecretaryNameClasses = "font-montserrat font-medium max-tablet:text-[1.4rem] max-tablet:[line-height:calc(2*100vmin/50)] tablet:max-desktop:text-[1.5rem] tablet:max-desktop:[line-height:calc(2.25*100vmin/104.25)] desktop:text-[2rem] desktop:[line-height:calc(3*100vmin/128)]";
const footerLinksClasses = "max-tablet:h-[9.6rem] max-tablet:flex max-tablet:justify-between max-tablet:mt-[3.2rem] max-tablet:mb-[3.2rem] tablet:max-desktop:[grid-column:1/7] tablet:max-desktop:[grid-row:1/2] tablet:max-desktop:grid tablet:max-desktop:grid-cols-6 tablet:max-desktop:[column-gap:calc(2.5*100vw/104.25)] tablet:max-desktop:[grid-template-rows:1fr] tablet:max-desktop:h-full desktop:[grid-column:1/9] desktop:[grid-row:1/2] desktop:grid desktop:grid-cols-8 desktop:[column-gap:calc(2.5*100vw/180)] desktop:[grid-template-rows:1fr] desktop:h-full";
const footerLinksItemClasses = "font-montserrat font-medium underline text-black max-tablet:text-[1.4rem] max-tablet:[line-height:calc(2*100vmin/50)] max-tablet:mb-[.8rem] tablet:max-desktop:text-[1.5rem] desktop:text-[2rem] desktop:[line-height:calc(3*100vmin/128)] desktop:pb-[.8rem] [&_a:visited]:text-black";
const footerLogoClasses = "h-full aspect-square tablet:[grid-column:1/2] tablet:[grid-row:1/2]";
const footerCreditsClasses = "font-montserrat font-normal flex flex-col items-center gap-y-[16px] border-t border-black max-tablet:text-[1.4rem] max-tablet:[line-height:calc(1.75*100vmin/50)] max-tablet:pt-[calc(2*100vmin/50)] max-tablet:pb-[calc(2*100vmin/50)] tablet:max-desktop:[grid-column:1/-1] tablet:max-desktop:[grid-row:2/3] tablet:max-desktop:text-[1.5rem] tablet:max-desktop:[line-height:calc(2.3125*100vmin/104.25)] tablet:max-desktop:py-[1.6rem] tablet:flex-row tablet:justify-between desktop:[grid-column:1/-1] desktop:[grid-row:2/3] desktop:text-[2rem] desktop:[line-height:calc(3*100vmin/128)] desktop:pt-[calc(2.5*100vmin/128)] desktop:pb-[calc(3*100vmin/128)]";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={footerClasses}>
      <div className={footerSecretaryClasses}>
        <p className={footerSecretaryTitleClasses}>Secretaria Regional</p>
        <p className={footerSecretaryNameClasses}>Elena Guillé</p>
      </div>
      <div className={footerLinksClasses}>
        <ul className="list-none max-desktop:flex max-desktop:flex-col max-desktop:justify-around tablet:max-desktop:justify-start tablet:max-desktop:items-start tablet:max-desktop:flex-wrap tablet:max-desktop:gap-x-[5.5rem] tablet:max-desktop:[grid-column:2/-1] tablet:max-desktop:[grid-row:1/2] tablet:max-desktop:min-h-full desktop:grid desktop:grid-cols-7 desktop:[column-gap:calc(2.5*100vw/180)] desktop:[grid-column:2/9] desktop:[grid-row:1/2] desktop:min-h-full">
          <li className="h-[50%] tablet:max-desktop:min-w-[40%] desktop:[grid-column:1/4] desktop:[grid-row:1]">
            <div className={footerLinksItemClasses}>
              <a href="https://www.oma.org.ar/">Sitio principal de OMA</a>
            </div>
          </li>
          <li className="h-[50%] tablet:max-desktop:min-w-[40%] desktop:[grid-column:1/4]">
            <div className={footerLinksItemClasses}>
              <a href="http://omasanisidro.flashingsites.com.ar/index_old.htm">
                Sitio viejo
              </a>
            </div>
          </li>
          <li className="h-[50%] desktop:ml-[1rem] desktop:[grid-column:5/7] desktop:[grid-row:1]">
            <div className={footerLinksItemClasses}>
              <Link href={"/contacto"}>Contacto</Link>
            </div>
          </li>
          <li className="h-[50%] desktop:ml-[1rem] desktop:[grid-column:5/7]">
            <div className={footerLinksItemClasses}>
              <a href="https://oma.org.ar/donaciones/">Contribuciones</a>
            </div>
          </li>
        </ul>
        <div className={footerLogoClasses} style={{ position: "relative" }}>
          <Image src="/images/logoOMA.svg" fill alt="" style={{ objectFit: "contain" }} />
        </div>
      </div>
      <div className={footerCreditsClasses}>
        <div>
          <p className="tablet:inline-block">© {year} Joaquín Aldrey y Julián Zylber.</p>
          <p className="tablet:inline-block">Todos los derechos reservados.</p>
        </div>
        <div>
          <a
            href="https://www.instagram.com/oma_sanisidro?igsh=MTh4aXkwbnFyMWJheQ=="
            title="Instagram"
          >
            <Image
              src={"/icons/instagram.png"}
              alt={"Instagram"}
              width={30}
              height={30}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
