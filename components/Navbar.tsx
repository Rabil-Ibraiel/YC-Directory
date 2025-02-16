import { auth, signIn, signOut } from "@/auth";
import { CirclePlus, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="flex justify-between items-center h-24 bg-white text-black px-5 text-xl section_container">
      <Link href="/">
        <Image src={"/logo.png"} alt="Logo" width={144} height={30} />
      </Link>
      <div className="">
        {session && session?.user ? (
          <div className="flex items-center gap-4">
            <Link href={"/startup/create"}>
              <span className="hidden sm:block">Create</span>
              <span className="sm:hidden">
                <CirclePlus className="size-8"/>
              </span>
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button>
                <span className="hidden sm:block">Logout</span>
                <span className="sm:hidden">
                  <LogOut className="size-7 text-red-600"/>
                </span>
              </button>
            </form>
            <Link href={`/user/${session?.id}`}>
              <Image
                className="avatar"
                src={session?.user.image}
                alt="fd"
                width={48}
                height={48}
              />
            </Link>
          </div>
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <button type="submit">Sign in</button>
          </form>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
