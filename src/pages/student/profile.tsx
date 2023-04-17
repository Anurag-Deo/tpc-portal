import React, { useState, useEffect } from "react";
import Navbar from "@/components/studentNavbar";
import { GoogleAuth } from "google-auth-library";
import { drive_v3, google } from "googleapis";
import Link from "next/link";
import Lottie from "@/components/lottie";
import OfferCard from "@/components/offerCard2/OfferCard2";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const profile = ({folderLinks,cvLinks}) => {
  // console.log(cvLinks)
  const router = useRouter();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [cpi, setCpi] = useState("");
  const [roll, setRoll] = useState("");
  const [department, setDepartment] = useState("");
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [cv, setCv] = useState("");
  const [selectedcv, setSelectedcv] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [yoj, setYoj] = useState("");
  const [skills, setSkills] = useState("")
  const [tenthMarks, setTenthMarks] = useState('')
  const [twelfthMarks, setTwelfthMarks] = useState('')
  const [error, setError] = useState("");
  const [appliedOffers, setAppliedOffers] = useState()
  // let data = {};
  const fetchApplied = async () => {
    const res = await fetch("/api/student/viewapplied", {
      method: "POST",
      body: JSON.stringify({
        student_id: roll,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.error) {
      // console.log(data.error);
      toast.error(data.error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      // router.push("/stud/main");
      // console.log(data.data);
      console.log(data);
      setAppliedOffers(data);
    }
  };
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("profile"));
    console.log(data);
    setFirstname(data.first_name);
    setLastname(data.last_name);
    setEmail(data.email);
    setRoll(data.rollno);
    setDepartment(data.department);
    setGender(data.gender);
    setCpi(data.gpa);
    const formatedDob = new Date(data.dob);
    setDob(formatedDob.toDateString());
    setMobile(data.contact_no);
    const formatedDoj = new Date(data.doj);
    setYoj(formatedDoj.toDateString());
    setSkills(data.roles);
    setTenthMarks(data.tenth_marks);
    setTwelfthMarks(data.twelvth_marks);
    // Iterate the folderLinks array and take the link of that item which has roll included in the name of the file
    let imglink = ""
    for(let i=0; i<folderLinks.length; i++){
      if(folderLinks[i].name.includes(data.rollno)){
        imglink = folderLinks[i].link
        break
      }
    }
    console.log(imglink)
    setSelectedImage(imglink);
    
    let cvlink = ""
    for(let i=0; i<cvLinks.length; i++){
      if(cvLinks[i].name.includes(data.rollno)){
        cvlink = cvLinks[i].link
        break
      }
    }
    console.log(cvlink)
    setSelectedcv(cvlink);
    fetchApplied()
  }, []);

  useEffect(() => {
    console.log(roll)
    fetchApplied();
  }, [roll])
  

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    console.log(new Date(dob).toISOString())
    const res = await fetch("/api/editprofile", {
      method: "POST",
      body: JSON.stringify({
        rollno: roll,
        first_name: firstname,
        last_name: lastname,
        email: email,
        gpa: cpi,
        department: department,
        roles: skills,
        gender: gender,
        password: password,
        dob: new Date(dob).toISOString().slice(0, 19).replace('T', ' '),
        doj: new Date(yoj).toISOString().slice(0, 19).replace('T', ' '),
        contact_no: mobile,
        tenth_marks: tenthMarks,
        twelvth_marks: twelfthMarks,
        type: "student",
        image: selectedImage,
        cv: selectedcv
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
      console.log(data.error)
    } else {
      localStorage.setItem("token", data.token);
      localStorage.setItem("type", data.data.type);
      console.log(JSON.stringify(data.data))
      localStorage.setItem("profile", JSON.stringify(data.data));
      router.push("/student/main");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row md:flex-row items-center">
        <section className="bg-gray-50 dark:bg-gray-900 lg:w-[50%] md:w-[50%] w-[80%] flex align-middle justify-center items-center">
          <Lottie
            animationPath={
              "https://assets3.lottiefiles.com/packages/lf20_lyp6fz8l.json"
            }
          ></Lottie>
        </section>
        <section className="bg-gray-50 dark:bg-gray-900 lg:w-[70%] md:w-[70%] w-[90%] my-20">
          <div className="flex flex-col items-center justify-center px-6 py-24 mx-auto md:h-screen lg:py-0">
            <a
              href="#"
              className="flex items-center mb-6 my-10 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              Your Profile
            </a>
            <label>
              
              {selectedImage ? (
                <>
                  <img
                    className="w-36 h-36 border-4 border-black object-cover rounded-full mx-auto shadow-lg"
                    src={selectedImage}
                    alt="User avatar"
                  ></img>
                </>
              ) : (
                <span className="w-36 block my-5 text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 h-12">
                  Please Add Image to see it here
                </span>
              )}
            </label>
            <div className="w-[100%] bg-white rounded-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  View/Edit your account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div className="flex flex-col justify-between space-y-2 md:space-y-0 md:flex-row md:space-x-4">
                    <div className="w-[38%]">
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
                        value={firstname}
                        onChange={(e) => {
                          setFirstname(e.target.value);
                        }}
                      />
                    </div>
                    <div className="w-[38%]">
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
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                      />
                    </div>
                    <div className="w-[24%]">
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
                        value={roll}
                        onChange={(e) => setRoll(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between space-y-2 md:space-y-0 md:flex-row md:space-x-4">
                    <div className="w-[75%]">
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
                        value={email}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between space-y-2 md:space-y-0 md:flex-row md:space-x-4">
                    <div className="w-[20%]">
                      <label
                        htmlFor="gender"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Gender
                      </label>
                      <select
                        name="gender"
                        id="gender"
                        required={true}
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Others</option>
                      </select>
                    </div>
                    <div className="w-[60%]">
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
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                      />
                    </div>
                    <div className="w-[20%]">
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
                        value={cpi}
                        onChange={(e) => setCpi(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between space-y-2 md:space-y-0 md:flex-row md:space-x-4">
                    <div className="w-[25%]">
                      <label
                        htmlFor="DOB"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        DOB
                      </label>
                      <input
                        type="text"
                        name="DOB"
                        id="DOB"
                        // placeholder="Male/Female/Other"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required={true}
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </div>
                    <div className="w-[25%]">
                      <label
                        htmlFor="yoj"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Year of Joining
                      </label>
                      <input
                        type="text"
                        name="yoj"
                        id="yoj"
                        // placeholder="Computer Science and Engineering"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required={true}
                        value={yoj}
                        onChange={(e) => setYoj(e.target.value)}
                      />
                    </div>
                    <div className="w-[50%]">
                      <label
                        htmlFor="mobile"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Mobile No.
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        id="mobile"
                        placeholder="9854213254"
                        maxLength={10}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required={true}
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between space-y-2 md:space-y-0 md:flex-row md:space-x-4">
                    <div className="w-[50%]">
                      <label
                        htmlFor="skills"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Skills
                      </label>
                      <input
                        type="text"
                        name="skills"
                        id="skills"
                        // placeholder="Male/Female/Other"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required={true}
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                      />
                    </div>
                    <div className="w-[25%]">
                      <label
                        htmlFor="tenthMarks"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Tenth Percentage
                      </label>
                      <input
                        type="text"
                        name="tenthMarks"
                        id="tenthMarks"
                        // placeholder="Male/Female/Other"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required={true}
                        value={tenthMarks}
                        onChange={(e) => setTenthMarks(e.target.value)}
                      />
                    </div>
                    <div className="w-[25%]">
                      <label
                        htmlFor="12thMarks"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Twelveth Percentage
                      </label>
                      <input
                        type="text"
                        name="12thMarks"
                        id="12tMarks"
                        // placeholder="Male/Female/Other"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required={true}
                        value={twelfthMarks}
                        onChange={(e) => setTwelfthMarks(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between space-y-2 md:space-y-0 md:flex-row md:space-x-4">
                    <div className="w-[100%]">
                      <span>Upload the CV here in the format <strong>Rollno.pdf</strong></span>
                      <a 
                      target="_blank"
                      className="w-[75%] mx-5 text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 h-12"
                      href="https://forms.gle/GmkaCKyGgYnxLp6H9">
                        Upload CV
                      </a>
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-[75%] text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 h-12"
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <h3 className="text-4xl my-16 font-semibold text-center">Applied Jobs</h3>
      <div className="flex flex-col lg:flex-row justify-center items-center my-10 gap-20 flex-wrap">
        {appliedOffers? appliedOffers.map((offer) => (
        <OfferCard
          companyId={offer.company_id}
          name={offer.name}
          location={offer.location}
          role={offer.role_offered}
          branches={offer.branches_allowed}
          package={offer.ctc_lakhs}
          cpi={offer.eligibility}
          logo={offer.logo}
          hide={true}
        />  
        )): null}
      </div>
    </>
  );
};

export default profile;


export async function getServerSideProps(context) {
  const process = require('process')
  const { google } = require('googleapis')
  const CLIENT_ID = "791432843458-rl3lff5j32sej1e3uu5jcr46lgdtjgcc.apps.googleusercontent.com"
  const CLIENT_SECRET = "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"
  const REDIRECT_URI = "https://developers.google.com/oauthplayground"
  const REFRESH_TOKEN = "1//04x49K7lH26C1CgYIARAAGAQSNwF-L9Ir_Uv-pctpKIJ2pn_jjINjtTg8334cljS62q_S6eIG0DG10EwZam2qmbafCJhBef_SAHs"

  // Authenticate using google auth client
  const oauth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
  )

  // Setting the refresh token
  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

  // Setting the scope to drive
  const scopes = ['https://www.googleapis.com/auth/drive']

  // Creating an google drive object
  const drive = google.drive({
      version: 'v3',
      auth: oauth2Client,
  })

  // folderLink will contain the object of all the required information
  let folderLinks = []
  let cvLinks = []
  try {
      // Getting a list of all the folders inside the folderId of gallery folder and then sorting them in descending order of createdTime.
      // The field parameter will only extract those fields from the response.
      const folder = await drive.files.list({
          q: `'${"1gD2X4g9K80wGBsyDAmxeXPjW2nvixQVudz2bd55TE5XchONPK5VMwYqgFR2IdX95QVs6ayIf"}' in parents and trashed = false and (mimeType='image/jpeg' or mimeType='image/png')`,
          fields: 'files(id, name, description, createdTime)',
          folderId: '1gD2X4g9K80wGBsyDAmxeXPjW2nvixQVudz2bd55TE5XchONPK5VMwYqgFR2IdX95QVs6ayIf',
          orderBy: 'createdTime desc',
      })

      const cv = await drive.files.list({
        q: `'${"1fbD8Ldt25VEJ4TELnMtQjiOXDrwFxb0LS0ub-ikWjhzyU4wGOG0ph_eCd4DVLwcccjnk0XjV"}' in parents and trashed = false and mimeType = 'application/pdf'`,
          fields: 'files(id, name, description, createdTime)',
          folderId: '1fbD8Ldt25VEJ4TELnMtQjiOXDrwFxb0LS0ub-ikWjhzyU4wGOG0ph_eCd4DVLwcccjnk0XjV',
          orderBy: 'createdTime desc',
      })

      // Creating an array out of the following object
      const folderdata = Array.from(folder.data.files)
      const cvData = Array.from(cv.data.files)

      // Poping because the last entry is gallry folder itself
      // folderdata.pop()

      // Iterating over the folderdata array and getting the images inside each folder
      folderLinks = await Promise.all(
          folderdata.map(async (folder) => {
            return {
              name: folder.name,
              link: `https://drive.google.com/uc?export=view&id=${folder.id}`,
            }
          })
      )
      cvLinks = await Promise.all(
          cvData.map(async (cv) => {
            return {
              name: cv.name,
              link: `https://drive.google.com/uc?export=view&id=${cv.id}`,
            }
          })
      )
  } catch (error) {
      throw error
  }
  console.log(cvLinks)
  return {
      props: { folderLinks,cvLinks }, // will be passed to the page component as props
  }
}