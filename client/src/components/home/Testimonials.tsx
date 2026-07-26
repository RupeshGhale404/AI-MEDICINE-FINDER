import { Star } from "lucide-react";

function Testimonials() {
  const testimonials = [
    {
      name: "Rupesh",
      role: "Project User",
      message:
        "The AI Medicine Finder helped me quickly locate medicines and nearby pharmacies. The AI assistant is very helpful.",
    },
    {
      name: "Medical Student",
      role: "Student",
      message:
        "The medicine search is fast and accurate. The interface is clean and easy to use.",
    },
    {
      name: "Pharmacy Manager",
      role: "Administrator",
      message:
        "Inventory management and pharmacy information are well organized. Highly recommended.",
    },
  ];

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800">
            What Our Users Say
          </h2>

          <p className="text-gray-500 mt-4">
            Feedback from users of AI Medicine Finder.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition"
            >
              <div className="flex mb-5">

                {[1,2,3,4,5].map((star)=>(
                  <Star
                    key={star}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}

              </div>

              <p className="text-gray-600 leading-7">
                "{item.message}"
              </p>

              <div className="mt-6 border-t pt-5">

                <h3 className="font-bold text-lg">
                  {item.name}
                </h3>

                <p className="text-gray-500">
                  {item.role}
                </p>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;