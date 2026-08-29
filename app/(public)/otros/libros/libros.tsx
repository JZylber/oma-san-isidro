import { Button } from "../../../../components/buttons/Button";
import Image from "next/image";

const BooksPage = () => {
  return (
    <>
      <h1 className="font-unbounded font-semibold max-tablet:text-[3.6rem] max-tablet:[margin-top:8vmin] max-tablet:[margin-bottom:5vmin] tablet:text-[4.8rem] tablet:leading-[2.5]">Libros a la venta</h1>
      <section className="mt-20">
        <p className="font-montserrat font-light max-tablet:text-[1.4rem] tablet:max-desktop:text-tablet-reading desktop:text-desktop-reading">
          Los libros de OMA se venden a través de la tienda online, donde pueden
          consultar los títulos disponibles, sus precios y realizar la compra.
        </p>
      </section>
      <section className="mt-[2rem] flex justify-center">
        <a
          href="https://tienda.oma.org.ar/"
          className="max-w-2xl desktop:max-w-4xl grow"
        >
          <Button content="Tienda de OMA">
            <Image
              className="hidden desktop:block"
              width={42}
              height={42}
              src="/images/newsArrow.svg"
              alt=""
            />
          </Button>
        </a>
      </section>
    </>
  );
};

export default BooksPage;
