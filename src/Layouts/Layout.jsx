import NavBar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { titleCase } from "../utils/properCase";

export default function Layout() {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <div className="min-h-full">
      <NavBar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {pathname.split("/")[1]
              ? titleCase(pathname.split("/")[1])
              : "Dashboard"}
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
