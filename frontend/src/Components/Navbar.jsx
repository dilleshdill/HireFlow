const Navbar = () => {
  return (
    <div className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0A65CC] rounded-md"></div>
          <span className="text-xl font-semibold">MyJob</span>
        </div>

        {/* Menu */}
        <ul className="hidden md:flex gap-6 text-sm text-gray-600">
          <li className="text-[#0A65CC] font-medium border-b-2 border-[#0A65CC] pb-1">Home</li>
          <li>Find Job</li>
          <li>Employers</li>
          <li>Candidates</li>
          <li>Pricing Plans</li>
          <li>Customer Supports</li>
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="text-sm px-4 py-2 border rounded-md text-[#0A65CC] border-[#0A65CC]">
            Sign In
          </button>
          <button className="text-sm px-4 py-2 bg-[#0A65CC] text-white rounded-md">
            Post A Jobs
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
