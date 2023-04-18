import React, { useState, useEffect } from "react";
import Navbar from "@/components/recruiterNavbar";
import Link from "next/link";
import Lottie from "@/components/lottie";
import OfferCard from "@/components/offerCard2/OfferCard2";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DriveUploady from "drive-uploady";
import UploadButton from "@rpldy/upload-button";

const profile = ({ folderLinks }) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [hrEmail, setHrEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [id, setId] = useState("");
  const [logo, setLogo] = useState("");
  const [students, setStudents] = useState();
  const [error, setError] = useState("");
  const [createdOffers, setCreatedOffers] = useState();
  const fetchCreated = async () => {
    const res = await fetch("/api/company/viewoffers", {
      method: "POST",
      body: JSON.stringify({
        company_id: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.error) {
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
      setCreatedOffers(data);
    }
  };
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("profile"));
    setId(data.id);
    setHrEmail(data.Hr_contacts);
    setCompanyName(data.name);
    let imglink = "";
    for (let i = 0; i < folderLinks.length; i++) {
      if (folderLinks[i].name.includes(data.name)) {
        imglink = folderLinks[i].link;
        break;
      }
    }
    setLogo(imglink);
  }, []);
  useEffect(() => {
    fetchCreated();
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/editprofile", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        name: companyName,
        Hr_contacts: hrEmail,
        password: password,
        logo: logo,
        type: "company",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    if (data.error) {
      setError(data.error);
      // TODO : Add an error Toast
    } else {
      localStorage.setItem("token", data.token);
      localStorage.setItem("type", data.data.type);
      localStorage.setItem("profile", JSON.stringify(data.data));
      router.push("/recruiter/main");
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
        <section className="bg-gray-50 dark:bg-gray-900 lg:w-[70%] md:w-[70%] w-[90%]">
          <div className="flex flex-col items-center justify-center  px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
              href="#"
              className="flex items-start mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              Your Profile
            </a>

            <div className="w-[100%] bg-white rounded-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  View/Edit your account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div className="flex flex-col justify-between space-y-2 md:space-y-0 md:flex-row md:space-x-4">
                    <div className="w-[60%]">
                      <label
                        htmlFor="firstname"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Google"
                        required={true}
                        value={companyName}
                        onChange={(e) => {
                          setCompanyName(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between space-y-2 md:space-y-0 md:flex-row md:space-x-4">
                    <div className="w-[60%]">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        HR's Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="firstName_roll@iitp.ac.in"
                        required={true}
                        value={hrEmail}
                        onChange={(e) => setHrEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-between space-y-2 md:space-y-0 md:flex-row md:space-x-4">
                    <div className="w-[60%]">
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
                    <div className="w-[100%]">
                      <span>
                        Upload the LOGO here in the format{" "}
                        <strong>{companyName}.pdf</strong>
                      </span>
                      <a
                        target="_blank"
                        className="w-[75%] mx-5 text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 h-12"
                        href="https://forms.gle/AZSk1nTNnUi3kvLBA"
                      >
                        Upload Logo
                      </a>
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-[55%] text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 h-12"
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <h3 className="text-4xl font-semibold text-center">Jobs Offered</h3>
      <div className="flex flex-col lg:flex-row justify-center items-center my-10 gap-20 flex-wrap">
        {createdOffers
          ? createdOffers.map((offer) => (
              <OfferCard
                companyId={offer.company_id}
                name={offer.name}
                location={offer.location}
                role={offer.role_offered}
                branches={offer.branches_allowed}
                package={offer.ctc_lakhs}
                cpi={offer.eligibility}
                hide={true}
                logo={offer.logo}
              />
            ))
          : null}
      </div>
    </>
  );
};

export default profile;

export async function getServerSideProps(context) {
  const process = require("process");
  const { google } = require("googleapis");
  const CLIENT_ID =
    "791432843458-rl3lff5j32sej1e3uu5jcr46lgdtjgcc.apps.googleusercontent.com";
  const CLIENT_SECRET = "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";
  const REDIRECT_URI = "https://developers.google.com/oauthplayground";
  const REFRESH_TOKEN =
    "1//04x49K7lH26C1CgYIARAAGAQSNwF-L9Ir_Uv-pctpKIJ2pn_jjINjtTg8334cljS62q_S6eIG0DG10EwZam2qmbafCJhBef_SAHs";

  // Authenticate using google auth client
  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );

  // Setting the refresh token
  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

  // Setting the scope to drive
  const scopes = ["https://www.googleapis.com/auth/drive"];

  // Creating an google drive object
  const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
  });

  // folderLink will contain the object of all the required information
  let folderLinks = [];
  try {
    // Getting a list of all the folders inside the folderId of gallery folder and then sorting them in descending order of createdTime.
    // The field parameter will only extract those fields from the response.
    const folder = await drive.files.list({
      q: `'${"12Ykr36VDGUOPjlCYWtNP1UEhJ0Wkoh5u3g4UxLCxSpivUXRcJpWIa1DaGRr_nHgNczLxbuB2"}' in parents and trashed = false and (mimeType='image/jpeg' or mimeType='image/png')`,
      fields: "files(id, name, description, createdTime)",
      folderId:
        "12Ykr36VDGUOPjlCYWtNP1UEhJ0Wkoh5u3g4UxLCxSpivUXRcJpWIa1DaGRr_nHgNczLxbuB2",
      orderBy: "createdTime desc",
    });

    // Creating an array out of the following object
    const folderdata = Array.from(folder.data.files);

    // Poping because the last entry is gallry folder itself
    // folderdata.pop()

    // Iterating over the folderdata array and getting the images inside each folder
    folderLinks = await Promise.all(
      folderdata.map(async (folder) => {
        // console.log(folder)
        return {
          name: folder.name,
          link: `https://drive.google.com/uc?export=view&id=${folder.id}`,
        };
      })
    );
  } catch (error) {
    throw error;
  }
  // console.log(folderLinks)
  return {
    props: { folderLinks }, // will be passed to the page component as props
  };
}
