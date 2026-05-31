"use client";
import Layout from "../../../components/Layout/Layout";

const mailTextClasses = "font-montserrat font-normal max-tablet:text-[1.4rem] tablet:text-desktop-reading";
const categoryTitleClasses = "font-unbounded font-medium max-tablet:text-[1.82rem] max-tablet:w-full max-tablet:mb-[16px] tablet:self-center tablet:text-desktop-actionable";
const zoneClasses = "flex w-full mt-[3.2rem] mb-[3.2rem] max-tablet:flex-col max-tablet:items-center";
const zoneH4Classes = "font-montserrat font-semibold max-tablet:text-[1.4rem] max-tablet:mb-[1.6rem] tablet:w-[40%] tablet:text-desktop-reading";
const zoneUlClasses = "list-none tablet:w-[60%]";
const zoneLiClasses = `${mailTextClasses} max-tablet:mb-[.8rem]`;
const independentCategoryClasses = "[&:not(:first-child)]:mt-[1.6rem] [&_h3]:max-tablet:mb-[1.2rem] [&_h3]:tablet:mb-[2rem]";

const ContactPage = () => {
  return (
    <>
      <h1 className="font-unbounded font-semibold max-tablet:text-[3.6rem] max-tablet:[margin-top:8vmin] max-tablet:[margin-bottom:5vmin] tablet:text-[4.8rem] tablet:leading-[2.5]">Contacto</h1>
      <div className="box-border border-2 border-primary-black rounded-[9px] mb-[4.8rem] max-tablet:py-[32px] max-tablet:px-[16px] tablet:p-[3.2rem]">
        <h3 className={categoryTitleClasses}>Consultas por Zonas</h3>
        <div className={zoneClasses}>
          <h4 className={zoneH4Classes}>Vicente López</h4>
          <ul className={zoneUlClasses}>
            <li className={zoneLiClasses}>
              Gloria Sampablo:{" "}
              <a href="mailto:gloriasampablo@gmail.com">
                gloriasampablo@gmail.com
              </a>
            </li>
            <li className={zoneLiClasses}>
              Alicia Lozano:{" "}
              <a href="mailto:alilo_ali@hotmail.com">alilo_ali@hotmail.com</a>
            </li>
          </ul>
        </div>
        <div className={zoneClasses}>
          <h4 className={zoneH4Classes}>San Isidro</h4>
          <ul className={zoneUlClasses}>
            <li className={zoneLiClasses}>
              Elena Guillé:{" "}
              <a href="mailto:elena2014@gmail.com">elena2014@gmail.com</a>
            </li>
          </ul>
        </div>
        <div className={zoneClasses}>
          <h4 className={zoneH4Classes}>San Fernando - Tigre - Don Torcuato</h4>
          <ul className={zoneUlClasses}>
            <li className={zoneLiClasses}>
              Silvia Chillo:{" "}
              <a href="mailto:silviachillo@gmail.com">silviachillo@gmail.com</a>
            </li>
          </ul>
        </div>
        <div className={zoneClasses}>
          <h4 className={zoneH4Classes}>José C.Paz - San Miguel - Malvinas Argentinas</h4>
          <ul className={zoneUlClasses}>
            <li className={zoneLiClasses}>
              Silvia Chillo:{" "}
              <a href="mailto:silviachillo@gmail.com">silviachillo@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={independentCategoryClasses}>
        <h3 className={categoryTitleClasses}>Mateclubes</h3>
        <p className={mailTextClasses}>
          Gloria Sampablo:{" "}
          <a href="mailto:gloriasampablo@gmail.com">gloriasampablo@gmail.com</a>
        </p>
        <p className={mailTextClasses}>
          Silvia Chillo:{" "}
          <a href="mailto:silviachillo@gmail.com">silviachillo@gmail.com</a>
        </p>
      </div>
      <div className={independentCategoryClasses}>
        <h3 className={categoryTitleClasses}>
          Torneo de Geometría e Imaginación
        </h3>
        <p className={mailTextClasses}>
          Roxana Magistrali:{" "}
          <a href="mailto:roxana.magistrali@gmail.com">
            roxana.magistrali@gmail.com
          </a>
        </p>
      </div>
      <div className={independentCategoryClasses}>
        <h3 className={categoryTitleClasses}>Instagram</h3>
        <p className={mailTextClasses}>
          Instagram oficial de Oma San Isidro:{" "}
          <a href="https://www.instagram.com/oma_sanisidro?igsh=MTh4aXkwbnFyMWJheQ==">
            https://www.instagram.com/oma_sanisidro
          </a>
        </p>
      </div>
      <div className={independentCategoryClasses}>
        <h3 className={categoryTitleClasses}>Desarrolladores</h3>
        <p className={mailTextClasses}>
          Para consultas y feedback sobre la página:{" "}
          <a href="mailto:omasanisidro.devs@gmail.com">
            omasanisidro.devs@gmail.com
          </a>
        </p>
      </div>
    </>
  );
};

export default ContactPage;
