type BadgeProps = {
  text: string;
};

const Badge = ({ text }: BadgeProps) => {
  return (
    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
      {text}
    </span>
  );
};

export default Badge;