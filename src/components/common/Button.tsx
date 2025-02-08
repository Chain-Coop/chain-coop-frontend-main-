export const Primary = ({ children, className, onClick, disabled }: any) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-center font-sans text-[15px] font-medium leading-6 outline-none focus:outline-none ${className} ${disabled ? "disabled" : ""}`}
    >
      {children}
    </button>
  );
};

export const ComingSoon = ({ children, className }: any) => {
  return (
    <button
      className={`font-base flex cursor-not-allowed justify-center rounded-xl  px-[15px] py-[6px] font-sans font-semibold ${className}`}
    >
      {children}
    </button>
  );
};

export const Blog = ({ children, className }: any) => {
  return (
    <button className={`font-base cursor-not-allowed ${className}`}>
      {children}
    </button>
  );
};

export const EnterButton = ({
  children,
  className,
  onClick,
  disabled,
  type,
}: any) => {
  return (
    <div className="relative mb-[1em]">
      <button
        className={`relative flex w-full justify-center rounded-full bg-text2 p-[15px] font-medium text-text5  ${className}  ${disabled ? "disabled" : ""}`}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {children}
      </button>
    </div>
  );
};
