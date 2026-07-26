import {
  Mail,
  Phone,
  MapPin,
  Send,
} from "lucide-react";

function Contact() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-800">
            Contact Us
          </h2>

          <p className="text-gray-500 mt-4">
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left */}

          <div className="space-y-8">

            <div className="flex items-center gap-5 bg-gray-50 p-5 rounded-xl shadow">

              <div className="bg-blue-600 p-4 rounded-full">
                <Mail className="text-white" />
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  Email
                </h3>

                <p className="text-gray-500">
                  support@aimedicinefinder.com
                </p>
              </div>

            </div>

            <div className="flex items-center gap-5 bg-gray-50 p-5 rounded-xl shadow">

              <div className="bg-green-600 p-4 rounded-full">
                <Phone className="text-white" />
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  Phone
                </h3>

                <p className="text-gray-500">
                  +977-9800000000
                </p>
              </div>

            </div>

            <div className="flex items-center gap-5 bg-gray-50 p-5 rounded-xl shadow">

              <div className="bg-red-600 p-4 rounded-full">
                <MapPin className="text-white" />
              </div>

              <div>
                <h3 className="font-bold text-lg">
                  Address
                </h3>

                <p className="text-gray-500">
                  Kathmandu, Nepal
                </p>
              </div>

            </div>

          </div>

          {/* Right */}

          <form className="bg-gray-50 rounded-2xl shadow-lg p-8">

            <h3 className="text-2xl font-bold mb-6">
              Send us a Message
            </h3>

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full border rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full border rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full border rounded-lg p-4 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
              >
                <Send size={20} />
                Send Message
              </button>

            </div>

          </form>

        </div>

      </div>
    </section>
  );
}

export default Contact;