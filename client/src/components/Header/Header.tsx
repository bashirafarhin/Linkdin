import Logo from "../ui/Logo";
import HeaderActions from "./HeaderActions";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 shadow-sm gap-7">
      <Logo />
      <NavBar />
      <HeaderActions />
    </header>
  );
}
