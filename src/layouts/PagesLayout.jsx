import React from "react";
import NavBar from '../components/NavBar'

export default function PagesLayout({children}) {
  return (
    <div>
      <NavBar />
      {children}
      <footer className="w-full h-20 bg-black text-white text-center grid place-items-center">
        <p>c {new Date().getFullYear()} All right reserverd</p>
      </footer>
    </div>
  );
}
