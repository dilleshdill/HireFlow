import { PencilLine } from 'lucide-react'
import React from 'react'

const UserJobAlerts = () => {
  return (
    <div>
        <div className="flex items-center justify-between p-2">
        <p>Applied(567)</p>
        <div>
          <button
            onClick={() => setShowAllJobs((prev) => !prev)}
            className="p-2 flex items-center justify-center text-gray-500 gap-2"
          >
            
            <PencilLine className="size-4" />
            Edit Job Alert
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserJobAlerts