import React,{useEffect,useState} from 'react'
import OfferCard from '@/components/offersCard/offersCard'
import Navbar from '@/components/studentNavbar'
import { useRouter } from 'next/router'
const main = () => {
  const router = useRouter()
  const [data, setData] = useState([])
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/student/signin");
    } 
    const fetchData = async () => {
      const response = await fetch('/api/alljobs');
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, [])
  
  return (
    <>
    <Navbar/>
    <div style={{paddingTop: '50px'}}>
      <h2 className="text-5xl font-semibold text-center my-7">Hello, Welcome to the TPC IITP Student's Portal</h2>
      <h3 className="text-4xl font-semibold text-center my-7">Here are some placement offers available</h3>
      <div className="flex flex-col lg:flex-row justify-center items-center my-10 gap-20 flex-wrap">
        {data ? data.map((item) => {
          return <OfferCard companyId={item.company_id} name={item.name} location={item.location} role={item.role_offered} branches={item.branches_allowed} cpi={item.eligibility} amount={item.ctc_lakhs}/>
        }):"Loading..."
        }


      </div>
    </div>
    </>
  )
}

export default main
