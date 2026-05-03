const BankInformation = () => {
  return (
    <div className="my-[1.6rem] flex justify-center">
      <div className="border-2 border-primary-black rounded-[9px] w-[80%] max-tablet:p-[2rem_1rem] tablet:box-border tablet:flex tablet:flex-wrap tablet:p-[1.6rem] tablet:max-desktop:leading-[1.3] [&_h3]:font-unbounded [&_h3]:font-normal [&_h3]:max-tablet:text-[1.4rem] [&_h3]:tablet:max-desktop:text-tablet-reading [&_h3]:desktop:text-[1.7rem]">
        <h3>
          El depósito debe realizarse a nombre de: Fundación Olimpíada
          Matemática Argentina en cualquier sucursal del banco Galicia (Cuenta
          Corriente)
        </h3>
        <ul className="list-disc list-inside">
          <li className="font-montserrat font-light list-item mt-[1.6rem] max-tablet:text-[1.4rem] tablet:max-desktop:text-tablet-reading desktop:text-[1.7rem]">Alias: FOMA.OLIMPIADA</li>
          <li className="font-montserrat font-light list-item mt-[1.6rem] max-tablet:text-[1.4rem] tablet:max-desktop:text-tablet-reading desktop:text-[1.7rem]">N° Cuenta: 0002676-5665-6</li>
          <li className="font-montserrat font-light list-item mt-[1.6rem] max-tablet:text-[1.4rem] tablet:max-desktop:text-tablet-reading desktop:text-[1.7rem]">CBU: 0070665620000002676566</li>
          <li className="font-montserrat font-light list-item mt-[1.6rem] max-tablet:text-[1.4rem] tablet:max-desktop:text-tablet-reading desktop:text-[1.7rem]">CUIT: 30-67928383-5</li>
        </ul>
      </div>
    </div>
  );
};

export default BankInformation;
