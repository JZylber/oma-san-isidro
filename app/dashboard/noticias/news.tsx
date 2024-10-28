"use client";

import { inferRouterOutputs } from "@trpc/server";
import ActionButton from "components/buttons/ActionButton/ActionButton";
import Checkbox from "components/common/form/CheckBox";
import Loader from "components/Loader/Loader";
import Modal from "components/Popups/Modal";
import Table from "components/Table/Table";
import Image from "next/image";
import { Fragment, use, useEffect, useState } from "react";
import { AppRouter } from "server/routers/_app";
import { trpc } from "utils/trpc";

const displayDate = (date: Date) => {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const blankNews = {
  agregado: new Date(),
  link: "",
  titulo: "",
  visible: false,
  id_noticia: -1,
};

const NewsModal = ({
  openModal,
  closeModal,
  onConfirm,
  result,
}: {
  openModal: boolean;
  closeModal: () => void;
  onConfirm: (news: News) => void;
  result?: News;
}) => {
  const [newNews, setNewNews] = useState<News>(
    result ? result : { ...blankNews }
  );
  useEffect(() => {
    setNewNews(result ? result : { ...blankNews });
  }, [result]);
  return (
    <Modal
      openModal={openModal}
      closeModal={closeModal}
      className="bg-primary-white border-2 border-primary-black rounded-xl m-auto w-1/2"
    >
      <div className="flex flex-col items-center">
        <h1 className="font-unbounded text-4xl py-8">Noticia</h1>

        <form className="flex flex-col gap-y-4 w-2/3 px-8 py-4">
          <div className="flex flex-col gap-y-2">
            <label className="font-montserrat text-2xl font-semibold">
              Título
            </label>
            <input
              type="text"
              value={newNews.titulo}
              onChange={(e) =>
                setNewNews({ ...newNews, titulo: e.target.value })
              }
              className="bg-primary-white border-2 border-primary-black rounded-md p-2 font-montserrat text-2xl"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="font-montserrat text-2xl font-semibold">
              Link
            </label>
            <input
              type="text"
              value={newNews.link}
              onChange={(e) => setNewNews({ ...newNews, link: e.target.value })}
              className="bg-primary-white border-2 border-primary-black rounded-md p-2 font-montserrat text-2xl"
            />
          </div>
          <div className="flex items-center justify-between py-2">
            <label className="font-montserrat text-2xl font-semibold">
              Visible
            </label>
            <Checkbox
              checked={newNews.visible}
              onChange={(e) => {
                setNewNews({ ...newNews, visible: e.target.checked });
              }}
              width={24}
              height={24}
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label className="font-montserrat text-2xl font-semibold">
              Fecha
            </label>
            <input
              value={newNews.agregado.toISOString().split("T")[0]}
              type="date"
              className="bg-primary-white border-2 border-primary-black rounded-md p-2 font-montserrat text-2xl"
              onChange={(e) => {
                setNewNews({
                  ...newNews,
                  agregado: new Date(e.target.value + " GMT-0300"),
                });
              }}
            />
          </div>
        </form>
        <div className="flex justify-around py-8 border-t w-full">
          <ActionButton onClick={closeModal}>Cancelar</ActionButton>
          <ActionButton
            onClick={() => {
              onConfirm(newNews);
            }}
            important
          >
            {!result ? "Agregar" : "Guardar"}
          </ActionButton>
        </div>
      </div>
    </Modal>
  );
};

type Unpacked<T> = T extends (infer U)[] ? U : T;
type News = Unpacked<inferRouterOutputs<AppRouter>["dashboard"]["getNews"]>;

const DashboardNews = () => {
  const [openModal, setOpenModal] = useState(false);
  const news = trpc.dashboard.getNews.useQuery(undefined, {
    refetchInterval: 0,
  });
  const updateNews = trpc.dashboard.setNews.useMutation();
  const [currentNews, setCurrentNews] = useState<News | undefined>(undefined);
  if (news.isLoading || news.isRefetching) return <Loader />;
  if (news.isError) return <div>Error: {news.error.message}</div>;
  if (news.isSuccess)
    return (
      <div>
        <div className="flex py-4">
          <ActionButton
            onClick={() => {
              setCurrentNews(undefined);
              setOpenModal(true);
            }}
            important
            className="!w-[120px] flex justify-around items-center"
          >
            <span className="font-unbounded">NUEVA</span>
            <Image src="/icons/add.svg" alt="sumar" width={24} height={24} />
          </ActionButton>
        </div>
        <Table
          values={news.data.filter(
            (publication) =>
              publication.agregado.getFullYear() === new Date().getFullYear()
          )}
          allValues={news.data}
          headers={["Título", "Link", "Visible", "Fecha", "Acciones"]}
          make_element={(publication, index) => {
            return (
              <Fragment key={index}>
                <div className="py-4 px-2 truncate">{publication.titulo}</div>
                <div className="py-4 px-2 truncate">{publication.link}</div>
                <div className="py-4 px-2 flex justify-center">
                  <Image
                    src={
                      publication.visible
                        ? "/icons/check.svg"
                        : "/icons/close.svg"
                    }
                    width={24}
                    height={24}
                    alt={publication.visible ? "visible" : "no visible"}
                  />
                </div>
                <div className="py-4 px-2">
                  {displayDate(publication.agregado)}
                </div>
                <div className="py-4 px-2">
                  <div className="flex justify-center items-center gap-x-4 w-full h-full">
                    <Image
                      src="/icons/edit.svg"
                      alt="editar"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                      onClick={() => {
                        setCurrentNews(publication);
                        setOpenModal(true);
                      }}
                    />
                    <Image
                      src="/icons/delete.svg"
                      alt="eliminar"
                      width={24}
                      height={24}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </Fragment>
            );
          }}
          grid
          tableClassName="grid-cols-[4fr_4fr_1fr_1fr_2fr]"
        />
        <NewsModal
          openModal={openModal}
          closeModal={() => setOpenModal(false)}
          onConfirm={async (newNews: News) => {
            await updateNews.mutateAsync(newNews);
            news.refetch();
            setOpenModal(false);
          }}
          result={currentNews}
        />
      </div>
    );
  return null;
};

export default DashboardNews;
