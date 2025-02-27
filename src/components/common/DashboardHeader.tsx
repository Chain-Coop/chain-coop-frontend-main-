export const DashboardHeader = ({ children, className, onClick }: any) => {
  return (
    <header
      className={`${className} -mx-4 flex h-[2.5em] bg-text2 font-sans text-xl font-semibold text-white lg:-mx-8`}
      onClick={onClick}
    >
      {children}
    </header>
  );
};
