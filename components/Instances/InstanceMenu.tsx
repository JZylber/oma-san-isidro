import { Fragment, useEffect, useState } from "react";
import InstanceData from "./Instance";
import { useSearchParams } from "next/navigation";
import { Competition } from "../../server/app-router-db-calls";
import Pending from "../Pending/Pending";
import React from "react";

export interface Instance {
  instancia: string;
  fecha: Date;
}

interface InstanceMenuProps {
  competition: Competition;
  instances: Instance[];
}

const getInitialInstance = (
  instances: Instance[],
  query: string | undefined
) => {
  if (query) {
    const index = instances.findIndex(
      (instance) => instance.instancia === query
    );
    if (index !== -1) {
      return index;
    }
  }
  const index = instances.findIndex((instance) => {
    let date = new Date(instance.fecha);
    date.setDate(date.getDate() + 1);
    return date > new Date();
  });
  if (index !== -1) {
    return index;
  }
  return 0;
};

const titleClasses = "font-unbounded font-semibold max-tablet:text-[3.6rem] max-tablet:[margin-top:5vmin] max-tablet:[margin-bottom:5vmin] tablet:text-[4.8rem]";
const menuBarClasses = "list-none flex bg-white box-border max-tablet:flex-col tablet:justify-between tablet:max-desktop:w-[85%] tablet:max-desktop:py-[1.6rem] desktop:w-[80%] desktop:max-w-[1200px] desktop:py-[1.6rem]";
const menuBarItemClasses = "font-montserrat font-normal flex items-center lowercase transition-all max-tablet:text-[1.75rem] max-tablet:w-full tablet:max-desktop:text-tablet-reading tablet:max-desktop:leading-[2.4rem] desktop:text-desktop-reading desktop:leading-[2.9rem] hover:font-medium hover:text-[x-large]";
const menuBarSeparatorClasses = "max-tablet:border-t max-tablet:border-[grey] max-tablet:w-full tablet:border-l tablet:border-[grey] tablet:h-full";

const Instances = ({ competition, instances }: InstanceMenuProps) => {
  const query = useSearchParams();
  const [currentInstance, setCurrentInstance] = useState<number>(
    getInitialInstance(
      instances,
      query ? (query.get("instancia") as string) : undefined
    )
  );
  useEffect(() => {
    if (query && query.get("instancia")) {
      setCurrentInstance(
        getInitialInstance(instances, query.get("instancia") as string)
      );
    }
  }, [query, instances]);
  const instancesAvailable: boolean = instances.length > 0;
  if (!instancesAvailable) {
    return (
      <Pending text="Todavía no hay información de las instancias para este año" />
    );
  } else {
    return (
      <>
        <h1 className={titleClasses}>Instancias</h1>
        <ul className={menuBarClasses}>
          {instances.map((instance, index) => (
            <Fragment key={index}>
              <li
                onClick={() => setCurrentInstance(index)}
                className={`${menuBarItemClasses}${index === currentInstance ? " font-bold" : ""}`}
              >
                {instance.instancia}
              </li>
              {index < instances.length - 1 && (
                <li>
                  <div className={menuBarSeparatorClasses}></div>
                </li>
              )}
            </Fragment>
          ))}
        </ul>
        <InstanceData
          competition={competition}
          instance={instances[currentInstance]}
        />
      </>
    );
  }
};

export default Instances;
