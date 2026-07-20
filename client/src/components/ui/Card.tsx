import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

const Card = ({ children }: CardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition">
      {children}
    </div>
  );
};

export default Card;