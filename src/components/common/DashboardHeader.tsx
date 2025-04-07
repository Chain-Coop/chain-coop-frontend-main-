export const DashboardHeader = ({ children, className, onClick }: any) => {
  return (
    <header
      className={`${className} -ml-8 flex h-[60px] w-[calc(100%+3rem)] bg-text2 text-lg font-semibold tracking-tight text-white md:-ml-14 md:h-[70px] md:w-[calc(100%+8rem)] md:text-xl`}
      onClick={onClick}
    >
      {children}
    </header>
  );
};
