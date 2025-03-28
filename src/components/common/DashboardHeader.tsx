export const DashboardHeader = ({ children, className, onClick }: any) => {
  return (
    <header
      className={`${className} flex h-[70px] w-full bg-text2 font-sans text-xl font-semibold tracking-tight text-white`}
      onClick={onClick}
    >
      {children}
    </header>
  );
};
