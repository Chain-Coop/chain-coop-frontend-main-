const Card = ({ children, className }: any) => {
  return (
    <div
      className={`m-[1em] rounded-lg bg-card p-[2em] px-16 py-14 shadow-md ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
