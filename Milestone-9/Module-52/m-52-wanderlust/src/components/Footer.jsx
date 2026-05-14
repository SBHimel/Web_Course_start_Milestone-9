import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative bg-black text-gray-400 px-6 md:px-16 py-20 overflow-hidden">

      {/* Glow background effect */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-400/10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Brand */}
        <div className="mb-14">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight">
            Wanderlust
          </h1>

          <p className="mt-4 max-w-xl text-gray-400 leading-relaxed">
            Your gateway to extraordinary travel experiences around the world.
            Discover, explore, and travel beyond imagination.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Newsletter */}
          <div>
            <h3 className="text-white mb-4 tracking-widest text-sm">
              NEWSLETTER
            </h3>

            <p className="mb-5 text-sm">
              Get exclusive deals & travel inspiration weekly.
            </p>

            <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent outline-none flex-1 text-sm text-white placeholder-gray-500"
              />
              <button className="text-white hover:text-cyan-400 transition text-lg">
                ↗
              </button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white mb-4 tracking-widest text-sm">
              QUICK LINKS
            </h3>

            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "Destinations", href: "/destinations" },
                { name: "My Bookings", href: "/my-booking" },
                { name: "Profile", href: "/profile" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition hover:translate-x-1 inline-block duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white mb-4 tracking-widest text-sm">
              SUPPORT
            </h3>

            <ul className="space-y-3">
              <li className="hover:text-white transition cursor-pointer">Help Center</li>
              <li className="hover:text-white transition cursor-pointer">Terms of Service</li>
              <li className="hover:text-white transition cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white transition cursor-pointer">Refund Policy</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white mb-4 tracking-widest text-sm">
              CONTACT
            </h3>

            <ul className="space-y-3 text-sm">
              <li className="hover:text-white transition">+880 17XXXXXXX</li>
              <li className="hover:text-white transition">info@wanderlust.com</li>
              <li className="hover:text-white transition">
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-14 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-sm text-gray-500">
            © 2026 Wanderlust. Crafted with passion ✈️
          </p>

          <div className="flex gap-6 mt-5 md:mt-0 text-white/70 text-lg">

            <span className="hover:text-white cursor-pointer transition">𝕏</span>
            <span className="hover:text-white cursor-pointer transition">in</span>
            <span className="hover:text-white cursor-pointer transition">◎</span>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;