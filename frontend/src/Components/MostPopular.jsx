import React from 'react'

const MostPopular = () => {
  return (
    <div className='pt-4'>
        <footer className="bg-neutral-primary">
            <div className="mx-auto w-full max-w-screen-xl">
            <h1 className='px-4 text-2xl'>Most Popular Vacancies</h1>    
            <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
                
                <div>
                    <h2 className="text-sm font-semibold text-heading uppercase">Company</h2>
                    <p className="mb-6 text-gray-400">2500+ openings</p>
                    <ul className="text-body font-medium">
                        <li className="mb-4">
                            <p className=" hover:underline">About</p>
                            <p className="mb-6 text-gray-400">2500+ openings</p>
                        </li>
                        <li className="mb-4">
                            <p className="hover:underline">Careers</p>
                            <p className="mb-6 text-gray-400">2500+ openings</p>
                        </li>
                        <li className="mb-4">
                            <p className="hover:underline">Brand Center</p>
                            <p className="mb-6 text-gray-400">2500+ openings</p>
                        </li>
                        
                    </ul>
                </div>
                <div>
                    <h2 className="text-sm font-semibold text-heading uppercase">Help center</h2>
                    <p className="mb-6 text-gray-400">2500+ openings</p>
                    <ul className="text-body font-medium">
                        <li className="mb-4">
                            <p className="hover:underline">Discord Server</p>
                            <p className="mb-6 text-gray-400">2500+ openings</p>
                        </li>
                        <li className="mb-4">
                            <p className="hover:underline">Twitter</p>
                            <p className="mb-6 text-gray-400">2500+ openings</p>
                        </li>
                        <li className="mb-4">
                            <p className="hover:underline">Facebook</p>
                            <p className="mb-6 text-gray-400">2500+ openings</p>
                        </li>
                        
                    </ul>
                </div>
                <div>
                    <h2 className="text-sm font-semibold text-heading uppercase">Legal</h2>
                    <p className="mb-6 text-gray-400">2500+ openings</p>
                    <ul className="text-body font-medium">
                        <li className="mb-4">
                            <p className="hover:underline">Privacy Policy</p>
                            <p className="mb-6 text-gray-400">2500+ openings</p>
                        </li>
                        <li className="mb-4">
                            <p className="hover:underline">Licensing</p>
                            <p className="mb-6 text-gray-400">2500+ openings</p>
                        </li>
                        <li className="mb-4">
                            <p className="hover:underline">Terms &amp; Conditions</p>
                            <p className="mb-6 text-gray-400">2500+ openings</p>
                        </li>
                        
                    </ul>
                </div>
                <div>
                    <h2 className="text-sm font-semibold text-heading uppercase">Download</h2>
                    <p className="mb-6 text-gray-400">2500+ openings</p>
                    <ul className="text-body font-medium">
                        <li className="mb-4">
                            <p className="hover:underline">iOS</p>
                            <p className="mb-6 text-gray-400">2500+ openings</p>
                        </li>
                        <li className="mb-4">
                            <p className="hover:underline">Android</p>
                            <p className="mb-6 text-gray-400">2500+ openings</p>
                        </li>
                        <li className="mb-4">
                            <p className="hover:underline">Windows</p>
                            <p className="mb-6 text-gray-400">2500+ openings</p>
                        </li>
                        
                    </ul>
                </div>
            </div>
            
            </div>
        </footer>

    </div>
  )
}

export default MostPopular
