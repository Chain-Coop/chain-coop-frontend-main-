const Card = ({ children, className }: any) => {
  return (
    <div className={`rounded-lg bg-card shadow-md ${className}`}>
      {children}
    </div>
  );
};

export default Card;
