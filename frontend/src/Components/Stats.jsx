const stats = [
  { label: "Live Job", value: "1,75,324" },
  { label: "Companies", value: "97,354" },
  { label: "Candidates", value: "38,47,154" },
  { label: "New Jobs", value: "7,532" },
]

const Stats = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((item, i) => (
        <div
          key={i}
          className="bg-white shadow rounded-lg p-6 text-center"
        >
          <p className="text-xl font-bold text-gray-900">{item.value}</p>
          <p className="text-sm text-gray-500 mt-1">{item.label}</p>
        </div>
      ))}
    </div>
  )
}

export default Stats
