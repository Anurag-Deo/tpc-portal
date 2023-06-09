import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Lottie from "@/components/lottie";
import Navbar from "@/components/navbar";
const signup = () => {
  const router = useRouter();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [roll, setRoll] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6 || confirmPassword.length < 6) {
      setError("Password must be atleast 6 characters long");
      return;
    }
    if (
      firstname.length < 3 ||
      lastname.length < 3 ||
      roll.length < 8 ||
      email.length < 10
    ) {
      setError("Please enter valid details");
      return;
    }
    // Make a email regex to check if email is valid with email like name_rollno@iitp.ac.in where rollno is same as that of the roll in the useState
    if (!email.match(/^[a-zA-Z0-9]+_[a-z0-9]+@iitp.ac.in$/)) {
      setError("Please enter valid email");
      return;
    }
    console.log("here");
    const res = await fetch("/api/student/signin", {
      method: "POST",
      body: JSON.stringify({
        first_name: firstname,
        last_name: lastname,
        rollno: roll,
        email: email,
        gender: "Male",
        gpa: 0,
        department: "",
        roles: "",
        password: password,
        confirmPassword: confirmPassword,
        cv: "",
        image: "",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log(data);
    if (data.error) {
      setError(data.error);
    } else {
      router.push("/student/signin");
    }
  };
  return (
    <>
      <Navbar />
      <Head>
        <title>TPC Student Portal | Sign In</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex md:flex-row flex-col">
        <section className="bg-gray-50 dark:bg-gray-900 md:w-[50%] w-full flex align-middle justify-center items-center">
          <Lottie
            animationPath={
              "https://assets8.lottiefiles.com/packages/lf20_mrjjdbp9.json"
            }
          ></Lottie>
        </section>
        <section className="bg-gray-50 dark:bg-gray-900 md:w-[50%] w-full">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img
                className="w-10 h-10 mr-2"
                src="https://www.iitp.ac.in/placement/images/iitp2.png"
                alt="logo"
              />
              TPC Student's Portal
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div className="flex flex-col justify-between space-y-2 md:space-y-0 md:flex-row md:space-x-4">
                    <div className="w-[50%]">
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
                        placeholder="Rohit"
                        required={true}
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                    </div>
                    <div className="w-[50%]">
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
                        placeholder="Kumar"
                        required={true}
                        onChange={(e) => setLastname(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
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
                  <div>
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
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required={true}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                  >
                    Create an account
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      href="/student/signin"
                      className="font-medium text-purple-600 hover:underline dark:text-purple-500"
                    >
                      Login here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default signup;
