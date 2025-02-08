const Card = ({ children, className }: any) => {
  return (
    <div
      className={`m-[1em] rounded-lg bg-card p-[2em] shadow-md sm:px-5 lg:px-16 lg:py-10 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
