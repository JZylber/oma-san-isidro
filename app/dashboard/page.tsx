import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Ingreso a la web de OMA San Isidro",
};

export default function OMALogin() {
  return (
    <div className="w-full h-full flex flex-col items-center p-8">
      <h1 className="font-unbounded text-8xl w-fit py-16">
        Dashboard OMA San Isidro
      </h1>
      <p className="font-montserrat text-4xl w-fit">
        ¡Hola! Para usar seleccioná del menú de la izquuierda la categoría que
        quieras editar.
      </p>
    </div>
  );
}
