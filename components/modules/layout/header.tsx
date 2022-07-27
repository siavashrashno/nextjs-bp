import dynamic from "next/dynamic";

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <header className="fixed top-0 h-header-md md:h-header z-layout shadow-header w-full bg-white "></header>
  );
};

export default Header;
