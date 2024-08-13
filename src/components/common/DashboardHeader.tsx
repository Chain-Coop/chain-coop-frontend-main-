import React from "react";

export const DashboardHeader = ({ children, className, onClick }: any) => {
  return (
    <header
      className={`${className} flex h-[2.5em] w-full bg-text2 font-sans text-xl font-semibold text-text5`}
      onClick={onClick}
    >
      {children}
    </header>
  );
};
