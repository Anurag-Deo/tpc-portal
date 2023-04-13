import React,{useEffect} from 'react'
import StudentAppliedCard from '@/components/studentAppliedCard/StudentAppliedCard'
import Navbar from '@/components/recruiterNavbar'
import { useRouter } from 'next/router'
const main = () => {
  const router = useRouter()
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/company/signin");
    } 
  }, [])
  
  return (
    <>
    <Navbar/>
    <div style={{paddingTop: '50px'}}>
      <h2 className="text-5xl font-semibold text-center my-7">Hello, Welcome to the TPC IITP Company's Portal</h2>
      <h3 className="text-4xl font-semibold text-center my-7">Here is the list of studnets who have applied to your company</h3>
      <div className="flex flex-col lg:flex-row justify-center items-center my-10 gap-20 flex-wrap">
        <StudentAppliedCard name={"Anurag Deo"} cpi={8.7} department={"CSE"} email={"anurag_2101ai04@iitp.ac.in"} skills={"DSA Web development"}/>
        <StudentAppliedCard name={"Anurag Deo"} cpi={8.7} department={"CSE"} email={"anurag_2101ai04@iitp.ac.in"} skills={"DSA Web development"}/>
        <StudentAppliedCard name={"Anurag Deo"} cpi={8.7} department={"CSE"} email={"anurag_2101ai04@iitp.ac.in"} skills={"DSA Web development"}/>
        <StudentAppliedCard name={"Anurag Deo"} cpi={8.7} department={"CSE"} email={"anurag_2101ai04@iitp.ac.in"} skills={"DSA Web development"}/>
        <StudentAppliedCard name={"Anurag Deo"} cpi={8.7} department={"CSE"} email={"anurag_2101ai04@iitp.ac.in"} skills={"DSA Web development"}/>
        <StudentAppliedCard name={"Anurag Deo"} cpi={8.7} department={"CSE"} email={"anurag_2101ai04@iitp.ac.in"} skills={"DSA Web development"}/>


      </div>
    </div>
    </>
  )
}

export default main
