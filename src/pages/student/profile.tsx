import React,{useState} from 'react'
import Navbar from '@/components/studentNavbar'
import Link from "next/link";
import Lottie from "@/components/lottie";
import OfferCard from '@/components/offersCard/offersCard';
const profile = () => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [cpi, setCpi] = useState('')
  const [roll, setRoll] = useState('')
  const [department, setDepartment] = useState('')
  return (
    <>
    <Navbar/>
    <div className="flex flex-col lg:flex-row md:flex-row items-center">
        <section className="bg-gray-50 dark:bg-gray-900 lg:w-[50%] md:w-[50%] w-[80%] flex align-middle justify-center items-center">
          <Lottie
            animationPath={
              "https://assets3.lottiefiles.com/packages/lf20_lyp6fz8l.json"
            }
          ></Lottie>
        </section>
        <section className="bg-gray-50 dark:bg-gray-900 lg:w-[70%] md:w-[70%] w-[90%]">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              {/* <img
                className="w-10 h-10 mr-2"
                src="https://www.iitp.ac.in/placement/images/iitp2.png"
                alt="logo"
              /> */}
              Your Profile
            </a>
            <div className="w-[100%] bg-white rounded-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  View/Edit your account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div className="flex flex-col justify-between space-y-2 md:space-y-0 md:flex-row md:space-x-4">
                  <div className='w-[38%]'>
                    <label
                      htmlFor="firstname"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Rohit Kumar"
                      required={true}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </div>
                  <div className='w-[38%]'>
                    <label
                      htmlFor="lastname"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Rohit Kumar"
                      required={true}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                  <div className='w-[24%]'>
                    <label
                      htmlFor="roll"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Roll No.
                    </label>
                    <input
                      type="text"
                      name="roll"
                      id="roll"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="2101AI01"
                      required={true}
                      onChange={(e) => setRoll(e.target.value)}
                    />
                  </div>
                  </div>
                  <div className="flex flex-col justify-between space-y-2 md:space-y-0 md:flex-row md:space-x-4">
                  <div className='w-[75%]'>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="firstName_roll@iitp.ac.in"
                      required={true}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required={true}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  </div>
                  <div className="flex flex-col justify-between space-y-2 md:space-y-0 md:flex-row md:space-x-4">
                  <div className='w-[20%]'>
                    <label
                      htmlFor="gender"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Gender
                    </label>
                    <input
                      type="text"
                      name="gender"
                      id="gender"
                      placeholder="Male/Female/Other"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required={true}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </div>
                  <div className='w-[60%]'>
                    <label
                      htmlFor="department"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Department
                    </label>
                    <input
                      type="text"
                      name="department"
                      id="department"
                      placeholder="Computer Science and Engineering"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required={true}
                      onChange={(e) => setDepartment(e.target.value)}
                    />
                  </div>
                  <div className='w-[20%]'>
                    <label
                      htmlFor="CPI"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      CPI
                    </label>
                    <input
                      type="text"
                      name="CPI"
                      id="CPI"
                      placeholder="8.75"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required={true}
                      onChange={(e) => setCpi(e.target.value)}
                    />
                  </div>
                  </div>
                  {/* <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-purple-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-purple-600 dark:ring-offset-gray-800" required={true} />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-purple-600 hover:underline dark:text-purple-500" href="#">Terms and Conditions</a></label>
                        </div>
                    </div> */}
                  <button
                    type="submit"
                    className="w-[75%] text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 h-12"
                  >
                    Update Profile
                  </button>
                  
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <h3 className="text-4xl font-semibold text-center">Applied Jobs</h3>
      <div className="flex flex-col lg:flex-row justify-center items-center my-10 gap-20 flex-wrap">
        <OfferCard name={"Google"} location={"Banglore"} role={"SDE"} skills={"Problem Solving"} amount={"15-25"} hide={true}/>
        <OfferCard name={"Apple"} location={"Banglore"} role={"SDE"} skills={"Problem Solving"} amount={"15-25"} hide={true}/>
      </div>
    </>
  )
}

export default profile
