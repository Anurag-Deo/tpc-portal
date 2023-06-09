import React, { useEffect } from "react";
import OfferCard from "@/components/offersCard/offersCard";
import Navbar from "@/components/alumniNavbar";
import { useRouter } from "next/router";
const main = () => {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/student/signin");
    }
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "50px" }}>
        <h2 className="text-5xl font-semibold text-center my-7">
          Hello, Welcome to the TPC IITP Student's Portal
        </h2>
        <h3 className="text-4xl font-semibold text-center my-7">
          Here are some placement offers available
        </h3>
        <div className="flex flex-col lg:flex-row justify-center items-center my-10 gap-20 flex-wrap"></div>
      </div>
    </>
  );
};

export default main;
