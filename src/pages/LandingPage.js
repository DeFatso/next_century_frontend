import React from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import Grades from "../components/Grades";
import HowItWorks from "../components/HowItWorks";
import SocialProof from "../components/SocialProof";
import MeetTheTeachers from "../components/MeetTheTeachers";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <div>
      <NavBar />
      <Hero />
      <Benefits />
      <Grades />
      <HowItWorks />
      <SocialProof />
      <MeetTheTeachers />
      <FAQ />
      <Footer />
    </div>
  );
}
