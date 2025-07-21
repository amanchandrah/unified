"use client";
import { useState } from "react";
import "./about.css";   // 👈  NEW: plain CSS file next to this page

export default function MainComponent() {
  const [activeSection, setActiveSection] = useState("about");
  const goBack = () => window.history.back();

  const features = [
    { icon: "fa-robot", title: "Automated Processing", description: "Smart request handling system that streamlines guest management workflow" },
    { icon: "fa-clock", title: "Timely Updates", description: "Track guest request status with instant notifications and updates" },
    { icon: "fa-hotel", title: "Hospitality Management", description: "Comprehensive system for managing guest accommodations and requirements" },
  ];

  const process = [
    { icon: "fa-paper-plane", title: "Submit Request", description: "Fill out the guest request form with event and guest details" },
    { icon: "fa-cogs", title: "Processing", description: "Our team reviews and processes the request" },
    { icon: "fa-check-circle", title: "Confirmation", description: "Receive updates on request status and next steps" },
    { icon: "fa-calendar-check", title: "Execution", description: "Coordinated guest hospitality and event management" },
  ];

  const team = [
    {
      name: "Aman Chandra",
      role: "Member",
      email: "aman@iitmparadox.org",
      img: "/images/Aman.JPG",   
      line: "Thinks he's chill, but rage quits faster than a Netflix login. Lazy until obsession hits — then suddenly CEO energy."
    },
    {
      name: "Stuti Shivhare",
      role: "Member",
      email: "stuti@iitmparadox.org",
      img: "/images/Stuti.png",  
      line: "Will proofread your soul — don't breathe near her with a missing full stop unless you want a lecture and a breakdown."
    },
    {
      name: "Srishti Sinha",
      role: "Member",
      email: "srishti@iitmparadox.org",
      img: "/images/Srishti.jpg",  
      line: "Looks like a pocket-sized human, comes with full-sized opinions and surprise chaos. Approach with height jokes — at your own risk."
    },
    {
      name: "Kulsoom Fatima",
      role: "Member",
      email: "kulsoom@iitmparadox.org",
      img: "/images/Kulsoom.jpg", 
      line: "You never know if she'll help with tasks or scream in the middle of a street. Unstable Wi-Fi has more consistency."
    },
    {
      name: "Pranav Pathak",
      role: "Member",
      email: "pranav@iitmparadox.org",
      img: "/images/Pranav.jpg",
      line: "So chill we sometimes check his pulse — hiding more secrets than a CIA vault. His family's still on version 1.0 of him."
    },
    {
      name: "Arushi",
      role: "Member",
      email: "arushi@iitmparadox.org",
      img: "/images/Arushi.jpg",
      line: "You won't hear from her all day — but at 3AM, suddenly has ideas, opinions, and 45 messages on the group chat."
    },
    {
      name: "Sourav",
      role: "Member",
      email: "sourav@iitmparadox.org",
      img: "/images/Sourav.jpg",
      line: "Physically present, mentally on airplane mode. Might be in a meeting or meditating — we'll never know."
    },
    {
      name: "Ann Mariya",
      role: "Member",
      email: "ann@iitmparadox.org",
      img: "/images/Ann.jpg",
      line: "The vibe is strong, the mimicry stronger. Basically the HR department for sarcasm and roasts."
    },
    {
      name: "Ishani Shree",
      role: "Member",
      email: "ishani@iitmparadox.org",
      img: "/images/Ishani.jpg",
      line: "Cracks 10 jokes a minute — 8 are mid, 2 are fire, and all come with sound effects."
    },
    {
      name: "Yuvraj",
      role: "Member",
      email: "yuvraj@iitmparadox.org",
      img: "/images/Yuvraj.jpg",
      line: "Acts innocent but is mentally married. Probably writing poetry in his head while everyone else is working."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white font-audiowide flex flex-col">
      {/* NAV */}
      <nav className="bg-[#0f0f1a] border-b-2 border-[#00ffc3] py-4 px-6 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <button onClick={goBack} className="text-[#00ffc3] hover:text-[#00d4a3] transition-colors flex items-center">
            <i className="fas fa-arrow-left mr-2" /> Go Back
          </button>
         
          <div className="w-20" />
        </div>
      </nav>

      {/* MAIN */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <header className="text-center mb-16 animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#00ffc3]">About Unified</h1>
          <p className="text-xl md:text-2xl text-[#a9adc1]">Next-Gen Guest Request Management System</p>
        </header>

        {/* TABS */}
        <div className="flex flex-col md:flex-row gap-8 mb-16 justify-center">
          {["about", "features", "process"].map(sec => (
            <button key={sec} onClick={() => setActiveSection(sec)}
              className={`px-6 py-3 rounded-lg border-2 transition-all duration-300 ${activeSection === sec
                  ? "border-[#00ffc3] text-[#00ffc3] shadow-[0_0_15px_#00ffc3]"
                  : "border-[#ff0059] text-[#ff0059] hover:shadow-[0_0_15px_#ff0059]"
                }`}
            >
              <i className={`fas fa-${sec === "about" ? "info-circle" : sec === "features" ? "star" : "tasks"} mr-2`}></i>
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </button>
          ))}
        </div>

        {/* SECTIONS */}
        {activeSection === "about" && (
          <section className="max-w-4xl mx-auto text-center animate-fadeIn">
            <div className="bg-[#1a1b26] p-8 rounded-lg border-2 border-[#00ffc3]">
              <h2 className="text-2xl md:text-3xl mb-6 text-[#00ffc3]"><i className="fas fa-microchip mr-2"></i>System Overview</h2>
              <p className="text-lg text-[#a9adc1] mb-6">
                Unified is a central app for guest-request management and hospitality services designed specifically for Paradox, IIT Madras.
              </p>
              <p className="text-lg text-[#a9adc1]">
                Built with all requirements and user experience in mind, Unified streamlines the entire process from initial guest requests to final event execution.
              </p>
            </div>
          </section>
        )}

        {activeSection === "features" && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
            {features.map((f, i) => (
              <div key={i} className="bg-[#1a1b26] p-6 rounded-lg border-2 border-[#00ffc3] hover:shadow-[0_0_15px_#00ffc3] transition-all">
                <i className={`fas ${f.icon} text-4xl text-[#00ffc3] mb-4`}></i>
                <h3 className="text-xl font-bold mb-2 text-[#00ffc3]">{f.title}</h3>
                <p className="text-[#a9adc1]">{f.description}</p>
              </div>
            ))}
          </section>
        )}

        {activeSection === "process" && (
          <section className="grid grid-cols-1 md:grid-cols-4 gap-8 animate-fadeIn">
            {process.map((p, i) => (
              <div key={i} className="bg-[#1a1b26] p-6 rounded-lg border-2 border-[#00ffc3] hover:shadow-[0_0_15px_#00ffc3] transition-all">
                <div className="text-3xl text-[#00ffc3] mb-4">{i + 1}</div>
                <i className={`fas ${p.icon} text-4xl text-[#00ffc3] mb-4`}></i>
                <h3 className="text-xl font-bold mb-2 text-[#00ffc3]">{p.title}</h3>
                <p className="text-[#a9adc1] text-sm">{p.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* TEAM */}
        <section className="my-16">
          <h2 className="text-3xl font-bold text-[#00ffc3] text-center mb-12">Meet the Wizards behind the magic</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {team.map(m => (
              <div key={m.name} className="group relative">
                <div className="bg-[#1a1b26] p-4 rounded-lg cursor-pointer hover:bg-[#252632] transition-all border border-transparent hover:border-[#00ffc3] transform hover:-translate-y-2">
                  <div className="w-16 h-16 bg-[#0f0f1a] rounded-full flex items-center justify-center border-2 border-[#00ffc3] group-hover:scale-110 overflow-hidden">
                    <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[#00ffc3] font-bold truncate w-full block mt-2">{m.name}</span>
                  <span className="text-[#a9adc1] text-sm">{m.role}</span>
                </div>
                <div className="absolute z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 bg-gradient-to-br from-[#1a1b26] to-[#252632] p-6 rounded-lg shadow-[0_0_30px_rgba(0,255,195,0.3)] border-2 border-[#00ffc3]">
                  <img src={m.img} alt={m.name} className="w-24 h-24 mx-auto rounded-full mb-4 border-2 border-[#00ffc3]" />
                  <h4 className="text-[#00ffc3] text-xl font-bold mb-2">{m.name}</h4>
                  <p className="text-[#a9adc1] text-sm mb-2 flex items-center justify-center"><i className="fas fa-user-ninja mr-2"></i>{m.role}</p>
                  <p
                    className="text-[#a9adc1] text-sm mb-4"
                    style={{ fontFamily: 'Inter, Roboto, "Helvetica Neue", Arial, sans-serif' }}
                  >
                    "{m.line}"
                  </p>
                  <a href={`mailto:${m.email}`} className="text-sm text-[#00ffc3] flex items-center justify-center border border-[#00ffc3] rounded-lg px-4 py-2 hover:bg-[#00ffc3]/10">
                    <i className="fas fa-paper-plane mr-2"></i>{m.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t-2 border-[#00ffc3] pt-12 text-center">
          <i className="fas fa-code text-[#00ffc3] text-4xl mb-4"></i>
          <h3 className="text-[#00ffc3] text-xl mb-2">Developed by</h3>
          <p className="text-[#00ffc3] text-2xl font-bold mb-4">Aman Chandra</p>
          <div className="flex justify-center items-center space-x-6 mb-6">
            <a href="mailto:amanchandrah895@gmail.com" className="text-[#00ffc3] hover:text-[#00d4a3] social-icon"><i className="fas fa-envelope text-2xl"></i></a>
            <a href="https://instagram.com/amanchandrah" target="_blank" rel="noreferrer" className="text-[#00ffc3] hover:text-[#00d4a3] social-icon"><i className="fab fa-instagram text-2xl"></i></a>
            <a href="https://www.linkedin.com/in/aman-chandra-h/" target="_blank" rel="noreferrer" className="text-[#00ffc3] hover:text-[#00d4a3] social-icon"><i className="fab fa-linkedin text-2xl"></i></a>
          </div>
          <p className="text-[#a9adc1] text-sm">© 2025 Paradox, IIT Madras. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}