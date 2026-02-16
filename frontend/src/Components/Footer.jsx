const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 px-4 sm:px-8 lg:px-20 py-12 mt-16">

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">

        {/* Logo */}
        <div>
          <h2 className="text-white text-xl font-bold mb-4">
            HireFlow
          </h2>
          <p className="text-sm leading-relaxed">
            Making every customer feel valued—no matter the size of your audience.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-white font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-indigo-500 transition">Home</a></li>
            <li><a href="/" className="hover:text-indigo-500 transition">Support</a></li>
            <li><a href="/" className="hover:text-indigo-500 transition">Pricing</a></li>
            <li><a href="/" className="hover:text-indigo-500 transition">Affiliate</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-indigo-500 transition">Company</a></li>
            <li><a href="/" className="hover:text-indigo-500 transition">Blogs</a></li>
            <li><a href="/" className="hover:text-indigo-500 transition">Community</a></li>
            <li>
              <a href="/" className="hover:text-indigo-500 transition">
                Careers
                <span className="ml-2 text-xs bg-indigo-600 text-white px-2 py-1 rounded-md">
                  Hiring
                </span>
              </a>
            </li>
            <li><a href="/" className="hover:text-indigo-500 transition">About</a></li>
          </ul>
        </div>

        {/* Social + Copyright */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-semibold">Connect</h3>

          <div className="flex gap-4 text-gray-400">
            <a href="#" className="hover:text-indigo-500 transition">Dribbble</a>
            <a href="#" className="hover:text-indigo-500 transition">LinkedIn</a>
            <a href="#" className="hover:text-indigo-500 transition">Twitter</a>
            <a href="#" className="hover:text-indigo-500 transition">YouTube</a>
          </div>

          <p className="text-xs mt-6">
            © 2025 HireFlow. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
