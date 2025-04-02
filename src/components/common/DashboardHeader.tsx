export const DashboardHeader = ({ children, className, onClick }: any) => {
  return (
    <header
      className={`${className} -ml-4 flex h-[70px] w-[calc(100%+2rem)] bg-text2 font-sans text-xl font-semibold tracking-tight text-white`}
      onClick={onClick}
    >
      {children}
    </header>
  );
};
