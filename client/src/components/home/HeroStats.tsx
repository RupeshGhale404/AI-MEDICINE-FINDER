import {
  Pill,
  MapPin,
  Users,
  Package,
} from "lucide-react";

interface Props {
  medicines: number;
  pharmacies: number;
  users: number;
  inventory: number;
}

function HeroStats({
  medicines,
  pharmacies,
  users,
  inventory,
}: Props) {
  const cards = [
    {
      icon: <Pill size={26} />,
      value: medicines,
      label: "Medicines",
    },
    {
      icon: <MapPin size={26} />,
      value: pharmacies,
      label: "Pharmacies",
    },
    {
      icon: <Users size={26} />,
      value: users,
      label: "Users",
    },
    {
      icon: <Package size={26} />,
      value: inventory,
      label: "Inventory",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-5 mt-10">
      {cards.map((card, index) => (
        <div
          key={index}
          className="
          bg-white/15
          backdrop-blur-lg
          rounded-2xl
          p-5
          border
          border-white/20
          hover:scale-105
          transition
          duration-300
        "
        >
          <div className="text-white mb-3">
            {card.icon}
          </div>

          <h2 className="text-3xl font-bold">
            {card.value}
          </h2>

          <p className="text-blue-100">
            {card.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export default HeroStats;