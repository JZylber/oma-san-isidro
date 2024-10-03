import Loader from "components/Loader/Loader";

export default function Loading() {
  return (
    <div className="grow flex h-full w-full items-center justify-center">
      <Loader />
    </div>
  );
}
