
import { handleLogin, handleLogout } from "@/actions";
import { auth, signIn, signOut } from "@/auth";
import { CirclePlus, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NavbarButtons from "./NavbarButtons";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="flex justify-between items-center h-24 bg-white text-black px-5 text-xl section_container">
      <Link href="/">
        <Image src={"/logo.png"} alt="Logo" width={144} height={30} />
      </Link>
      <NavbarButtons session={session}/>
    </nav>
  );
};

export default Navbar;
