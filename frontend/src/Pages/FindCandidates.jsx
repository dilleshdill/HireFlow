import React from 'react'
import Navbar from '../Components/Navbar.jsx'
import RecruiterJobFilters from '../Components/Recruiter/RecruiterJobFilters.jsx'
import FindCandidateCard from '../Components/Recruiter/FindCandidateCard.jsx'

const FindCandidates = () => {
  return (
    <>
        <Navbar />
        <div>
            <RecruiterJobFilters />
            <FindCandidateCard />
        </div>
    </>
  )
}

export default FindCandidates