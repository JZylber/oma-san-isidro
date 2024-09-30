import Cookies from "js-cookie";

const UserChip = () => {
  const user = Cookies.get("currentUser");
  console.log(user);
  return (
    <div className="mt-auto flex bg-transparent border border-primary-black"></div>
  );
};

export default UserChip;
