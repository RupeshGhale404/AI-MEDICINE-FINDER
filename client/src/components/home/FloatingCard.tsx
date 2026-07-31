interface FloatingCardProps {
  icon: string;
  title: string;
  subtitle: string;
  className?: string;
}

function FloatingCard({
  icon,
  title,
  subtitle,
  className = "",
}: FloatingCardProps) {
  return (
    <div
      className={`
      absolute
      bg-white
      rounded-2xl
      shadow-xl
      px-5
      py-4
      flex
      items-center
      gap-4
      animate-bounce
      ${className}
    `}
      style={{
        animationDuration: "4s",
      }}
    >
      <div className="text-3xl">
        {icon}
      </div>

      <div>
        <h3 className="font-bold text-gray-800">
          {title}
        </h3>

        <p className="text-gray-500 text-sm">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default FloatingCard;