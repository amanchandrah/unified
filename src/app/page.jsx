"use client";
import React, { useState, useEffect } from "react";

function MainComponent() {
  const [showGuestRequestPopup, setShowGuestRequestPopup] = useState(false);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [showSponsorPopup, setShowSponsorPopup] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closePopups = () => {
    setShowGuestRequestPopup(false);
    setShowEventPopup(false);
    setShowSponsorPopup(false);
  };

  const closeMemberPopup = () => {
    setSelectedMember(null);
  };

  // Toggle menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex flex-col">
      <nav className="bg-[#0f0f1a] border-b-2 border-[#00ffc3] py-4 px-6 sticky top-0 z-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <a
              href="/"
              className="text-[#00ffc3] text-2xl font-audiowide flex items-center"
            >
              <i className="fas fa-robot mr-2"></i>
              Outreach and Hospitality
            </a>


            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a
                href="/"
                className="text-[#00ffc3] hover:text-[#00d4a3] transition-colors font-audiowide"
              >
                <i className="fas fa-home mr-2"></i>Home
              </a>
              <button
                onClick={() => scrollToSection('requestSection')}
                className="text-[#00ffc3] hover:text-[#00d4a3] transition-colors font-audiowide cursor-pointer"
              >
                <i className="fas fa-paper-plane mr-2"></i>Drop Request
              </button>
              <button
                onClick={() => scrollToSection('wizardsPanel')}
                className="text-[#00ffc3] hover:text-[#00d4a3] transition-colors font-audiowide cursor-pointer"
              >
                <i className="fas fa-wand-magic-sparkles mr-2"></i>Wizards Panel
              </button>
              <a
                href="/updates"
                className="text-[#00ffc3] hover:text-[#00d4a3] transition-colors font-audiowide"
              >
                <i className="fas fa-tasks mr-2"></i>Track Requests
              </a>
              <a
                href="/about"
                className="text-[#00ffc3] hover:text-[#00d4a3] transition-colors font-audiowide"
              >
                <i className="fas fa-info-circle mr-2"></i>About
              </a>
            </div>

            {/* Hamburger Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-[#00ffc3] hover:text-[#00d4a3] transition-colors focus:outline-none"
            >
              <i
                className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"
                  } text-2xl`}
              ></i>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute left-0 right-0 top-[72px] bg-[#0f0f1a] border-b-2 border-[#00ffc3] animate-fadeIn">
              <div className="container mx-auto px-6 py-4">
                <div className="flex flex-col space-y-4">
                  <a
                    href="/"
                    className="text-[#00ffc3] hover:text-[#00d4a3] transition-colors font-audiowide flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className="fas fa-home mr-2"></i>
                    Home
                  </a>
                  <a
                    href="#requestSection"
                    className="text-[#00ffc3] hover:text-[#00d4a3] transition-colors font-audiowide flex items-center"
                    onClick={() => {
                      setIsMenuOpen(false);
                      document
                        .getElementById("requestSection")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <i className="fas fa-paper-plane mr-2"></i>
                    Drop a Request
                  </a>
                  <a
                    href="#wizardsPanel"
                    className="text-[#00ffc3] hover:text-[#00d4a3] transition-colors font-audiowide flex items-center"
                    onClick={() => {
                      setIsMenuOpen(false);
                      document
                        .getElementById("wizardsPanel")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <i className="fas fa-wand-magic-sparkles mr-2"></i>
                    Wizards Panel
                  </a>
                  <a
                    href="/updates"
                    className="text-[#00ffc3] hover:text-[#00d4a3] transition-colors font-audiowide flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className="fas fa-tasks mr-2"></i>
                    Track Requests
                  </a>
                  <a
                    href="/about"
                    className="text-[#00ffc3] hover:text-[#00d4a3] transition-colors font-audiowide flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className="fas fa-info-circle mr-2"></i>
                    About
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Add overlay when menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      <main className="flex-grow">
        <section className="relative min-h-screen flex flex-col bg-[#0f0f1a]">
          {/* background overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* centered content */}
          <div className="flex-grow flex items-center justify-center relative z-10 px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-7xl font-bold mb-8 text-[#00ffc3] font-audiowide animate-fadeIn">
                Welcome to Unified
              </h1>
              <p className="text-xl md:text-2xl mb-12 text-[#a9adc1] font-audiowide animate-fadeIn delay-200">
                Central App for Outreach and Hospitality Requests for IITM Paradox
              </p>
              <div className="flex flex-col md:flex-row gap-6 justify-center animate-fadeIn delay-400">
                <a
                  href="/updates"
                  className="bg-[#00ffc3] text-[#0f0f1a] px-8 py-4 rounded-lg font-bold hover:bg-[#00d4a3] transition-colors font-audiowide"
                >
                  <i className="fas fa-tasks mr-2" />Track Requests
                </a>
                <a
                  href="/about"
                  className="border-2 border-[#00ffc3] text-[#00ffc3] px-8 py-4 rounded-lg font-bold hover:bg-[#00ffc3] hover:text-[#0f0f1a] transition-colors font-audiowide"
                >
                  <i className="fas fa-info-circle mr-2" />Learn More
                </a>
              </div>
            </div>
          </div>

          {/* ↓↓↓  SCROLL INDICATOR  ↓↓↓ */}
          <div
            className="absolute bottom-20 right-6 md:bottom-20 md:right-8 z-20 group cursor-pointer"
            onClick={() =>
              document.getElementById('requestSection')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#00ffc3] flex items-center justify-center
                  shadow-[0_0_8px_#00ffc3] group-hover:shadow-[0_0_12px_#00ffc3] transition-all">
              <i className="fas fa-angle-double-down text-xl md:text-2xl text-[#0f0f1a]" />
            </div>
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-[#a9adc1] opacity-0 group-hover:opacity-100 transition">
              scroll
            </span>
          </div>
        </section>

        {/* spacer for scroll offset */}
        <div id="requestSection" className="h-28" />
        <section className="py-16 bg-[#0f0f1a]">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center text-[#00ffc3] font-audiowide animate-fadeIn">
              <i className="fas fa-paper-plane mr-3"></i>
              Drop your Request Here
            </h2>
            <p className="text-xl text-[#a9adc1] text-center mb-16 font-crimson-text animate-fadeIn delay-200">
              Click on the boxes accordingly, will redirect to google form
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              <div
                onClick={() => setShowGuestRequestPopup(true)}
                className="group cursor-pointer bg-[#1a1b26] p-8 rounded-xl border-2 border-[#00ffc3] hover:border-[#00d4a3] transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,255,195,0.2)]"
              >
                <div className="w-16 h-16 bg-[#0f0f1a] rounded-full flex items-center justify-center border-2 border-[#00ffc3] group-hover:scale-110 transition-all duration-300 mb-6">
                  <i className="fas fa-user-plus text-[#00ffc3] text-2xl group-hover:rotate-12 transition-transform duration-300"></i>
                </div>
                <h3 className="text-[#00ffc3] text-xl font-bold mb-4 font-audiowide group-hover:text-[#00d4a3] transition-colors">
                  Guest Request
                </h3>
                <p className="text-[#a9adc1] mb-6">
                  Submit your request for guest outreach and coordination
                </p>
                <span className="text-[#00ffc3] flex items-center text-sm group-hover:text-[#00d4a3]">
                  Fill Form
                  <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-2 transition-transform"></i>
                </span>
              </div>

              <div
                onClick={() => setShowEventPopup(true)}
                className="group cursor-pointer bg-[#1a1b26] p-8 rounded-xl border-2 border-[#00ffc3] hover:border-[#00d4a3] transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,255,195,0.2)]"
              >
                <div className="w-16 h-16 bg-[#0f0f1a] rounded-full flex items-center justify-center border-2 border-[#00ffc3] group-hover:scale-110 transition-all duration-300 mb-6">
                  <i className="fas fa-calendar-check text-[#00ffc3] text-2xl group-hover:rotate-12 transition-transform duration-300"></i>
                </div>
                <h3 className="text-[#00ffc3] text-xl font-bold mb-4 font-audiowide group-hover:text-[#00d4a3] transition-colors">
                  Event Guest Hospitality
                </h3>
                <p className="text-[#a9adc1] mb-6">
                  Arrange accommodation and refreshments for event guests
                </p>
                <span className="text-[#00ffc3] flex items-center text-sm group-hover:text-[#00d4a3]">
                  Fill Form
                  <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-2 transition-transform"></i>
                </span>
              </div>

              <div
                onClick={() => setShowSponsorPopup(true)}
                className="group cursor-pointer bg-[#1a1b26] p-8 rounded-xl border-2 border-[#00ffc3] hover:border-[#00d4a3] transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,255,195,0.2)]"
              >
                <div className="w-16 h-16 bg-[#0f0f1a] rounded-full flex items-center justify-center border-2 border-[#00ffc3] group-hover:scale-110 transition-all duration-300 mb-6">
                  <i className="fas fa-handshake text-[#00ffc3] text-2xl group-hover:rotate-12 transition-transform duration-300"></i>
                </div>
                <h3 className="text-[#00ffc3] text-xl font-bold mb-4 font-audiowide group-hover:text-[#00d4a3] transition-colors">
                  Sponsor Hospitality
                </h3>
                <p className="text-[#a9adc1] mb-6">
                  Manage accommodation and amenities for sponsors
                </p>
                <span className="text-[#00ffc3] flex items-center text-sm group-hover:text-[#00d4a3]">
                  Fill Form
                  <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-2 transition-transform"></i>
                </span>
              </div>
            </div>
            {/* spacer for scroll offset */}
            <div id="wizardsPanel" className="h-28" />
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center text-[#00ffc3] font-audiowide">
              <i className="fas fa-wand-magic-sparkles mr-3"></i>
              The Wizards Panel
            </h2>
            <p className="text-xl text-[#a9adc1] text-center mb-16 font-crimson-text">
              Meet the Outreach crew , Set your craziness limitless to join the
              Panel
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {[
                {
                  name: "Aman Chandra",
                  role: "Member",
                  email: "aman@iitmparadox.org",
                  icon: "fa-chair",
                  img: "/images/Aman.jpg",
                  funnyLine:
                    "Thinks he's chill, but rage quits faster than a Netflix login. Lazy until obsession hits — then suddenly CEO energy.",
                },
                {
                  name: "Stuti Shivhare",
                  role: "Member",
                  email: "stuti@iitmparadox.org",
                  icon: "fa-chair",
                  img: "/images/Stuti.png",
                  funnyLine:
                    "Will proofread your soul — don't breathe near her with a missing full stop unless you want a lecture and a breakdown.",
                },
                {
                  name: "Srishti Sinha",
                  role: "Member",
                  email: "srishti@iitmparadox.org",
                  icon: "fa-chair",
                  img: "/images/Srishti.jpg",
                  funnyLine:
                    "Looks like a pocket-sized human, comes with full-sized opinions and surprise chaos. Approach with height jokes — at your own risk.",
                },
                {
                  name: "Kulsoom Fatima",
                  role: "Member",
                  email: "kulsoom@iitmparadox.org",
                  icon: "fa-chair",
                  img: "/images/Kulsoom.jpg",
                  funnyLine:
                    "You never know if she'll help with tasks or scream in the middle of a street. Unstable Wi-Fi has more consistency.",
                },
                {
                  name: "Pranav Pathak",
                  role: "Member",
                  email: "pranav@iitmparadox.org",
                  img: "/images/Pranav.jpg",
                  funnyLine:
                    "So chill we sometimes check his pulse — hiding more secrets than a CIA vault. His family's still on version 1.0 of him.",
                },
                {
                  name: "Arushi",
                  role: "Member",
                  email: "arushi@iitmparadox.org",
                  img: "/images/Arushi.jpg",
                  funnyLine:
                    "You won't hear from her all day — but at 3AM, suddenly has ideas, opinions, and 45 messages on the group chat.",
                },
                {
                  name: "Sourav",
                  role: "Member",
                  email: "sourav@iitmparadox.org",
                  img: "/images/Sourav.jpg",
                  funnyLine:
                    "Physically present, mentally on airplane mode. Might be in a meeting or meditating — we'll never know.",
                },
                {
                  name: "Ann Mariya",
                  role: "Member",
                  email: "ann@iitmparadox.org",
                  img: "/images/Ann.jpg",
                  funnyLine:
                    "The vibe is strong, the mimicry stronger. Basically the HR department for sarcasm and roasts.",
                },
                {
                  name: "Ishani Shree",
                  role: "Member",
                  email: "ishani@iitmparadox.org",
                  img: "/images/Ishani.jpg",
                  funnyLine:
                    "Cracks 10 jokes a minute — 8 are mid, 2 are fire, and all come with sound effects.",
                },
                {
                  name: "Yuvraj",
                  role: "Member",
                  email: "yuvraj@iitmparadox.org",
                  img: "/images/Yuvraj.jpg",
                  funnyLine:
                    "Acts innocent but is mentally married. Probably writing poetry in his head while everyone else is working.",
                },
              ].map((member, index) => (
                <div key={index} className="group relative">
                  {/* Mobile View - Clickable Card */}
                  <div
                    className="bg-[#1a1b26] p-4 rounded-lg cursor-pointer hover:bg-[#252632] transition-all duration-300 border border-transparent hover:border-[#00ffc3] transform hover:-translate-y-2"
                    onClick={() => setSelectedMember(member)}
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <div className="w-16 h-16 bg-[#0f0f1a] rounded-full flex items-center justify-center border-2 border-[#00ffc3] group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(0,255,195,0.3)] overflow-hidden">
                        {member.img ? (
                          <img
                            src={member.img}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <i
                            className={`fas fa-user text-[#00ffc3] text-2xl group-hover:rotate-12 transition-transform duration-300`}
                          ></i>
                        )}
                      </div>
                      <span className="text-[#00ffc3] font-bold truncate w-full">
                        {member.name}
                      </span>
                      <span className="text-[#a9adc1] text-sm">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  {/* Desktop View - Hover Popup */}
                  <div className="hidden md:block absolute z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 bg-gradient-to-br from-[#1a1b26] to-[#252632] p-6 rounded-lg shadow-[0_0_30px_rgba(0,255,195,0.3)] border-2 border-[#00ffc3] backdrop-blur-sm">
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#1a1b26] border-r-2 border-b-2 border-[#00ffc3] transform rotate-45"></div>
                    <div className="text-center transform scale-100 group-hover:scale-105 transition-transform duration-300">
                      <div className="w-24 h-24 mx-auto bg-[#0f0f1a] rounded-full flex items-center justify-center border-2 border-[#00ffc3] mb-4 shadow-[0_0_15px_rgba(0,255,195,0.5)] overflow-hidden">
                        {member.img ? (
                          <img
                            src={member.img}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <i className={`fas fa-user text-[#00ffc3] text-4xl`}></i>
                        )}
                      </div>
                      <h4 className="text-[#00ffc3] text-xl font-bold mb-2">
                        {member.name}
                      </h4>
                      <div className="text-[#a9adc1] text-sm mb-3 flex items-center justify-center">
                        <i className="fas fa-user-ninja mr-2"></i>
                        {member.role}
                      </div>
                      <p className="text-[#00ffc3] text-sm italic mb-4 px-4 py-2 bg-[#0f0f1a] rounded-lg border border-[#00ffc3] shadow-inner">
                        "{member.funnyLine}"
                      </p>
                      <a
                        href={`mailto:${member.email}`}
                        className="text-sm text-[#00ffc3] hover:text-[#00d4a3] flex items-center justify-center group relative overflow-hidden rounded-lg px-4 py-2 border border-[#00ffc3] hover:border-[#00d4a3] transition-all duration-300 bg-[#0f0f1a]"
                      >
                        <i className="fas fa-paper-plane mr-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                        {member.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {showGuestRequestPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
            <div className="relative bg-gradient-to-br from-[#0f0f1a] to-[#1a1b26] p-8 rounded-2xl border-2 border-[#00ffc3] max-w-md w-full mx-4 shadow-[0_0_50px_rgba(0,255,195,0.3)] animate-scaleIn">
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#00ffc3] rounded-full animate-pulse"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#00ffc3] rounded-full animate-pulse delay-100"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#00ffc3] rounded-full animate-pulse delay-200"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#00ffc3] rounded-full animate-pulse delay-300"></div>

              <button
                onClick={closePopups}
                className="absolute -top-3 -right-3 w-8 h-8 bg-[#00ffc3] rounded-full flex items-center justify-center hover:bg-[#00d4a3] transition-all duration-300 transform hover:scale-110 hover:rotate-90 z-10"
              >
                <i className="fas fa-times text-[#0f0f1a]"></i>
              </button>

              <div className="absolute inset-0 bg-[#00ffc3] opacity-5 rounded-2xl animate-glow"></div>

              <h3 className="text-2xl font-bold mb-8 text-[#00ffc3] font-audiowide text-center relative">
                <i className="fas fa-calendar-alt absolute -left-6 top-1 text-lg animate-float"></i>
                Guest Request Form
                <i className="fas fa-paper-plane absolute -right-6 top-1 text-lg animate-float delay-100"></i>
              </h3>

              <div className="space-y-6">
                <a
                  href="https://forms.gle/eigqyWEbu4vRtmsq7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block w-full relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00ffc3] to-[#00d4a3] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                  <div className="relative bg-[#1a1b26] p-6 rounded-xl border border-[#00ffc3] hover:border-[#00d4a3] transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(0,255,195,0.2)]">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-[#0f0f1a] rounded-lg flex items-center justify-center border border-[#00ffc3] group-hover:scale-110 transition-transform duration-300">
                        <i className="fas fa-user-plus text-[#00ffc3] text-xl group-hover:rotate-12 transition-transform duration-300"></i>
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-[#00ffc3] font-audiowide text-lg mb-1 group-hover:text-[#00d4a3] transition-colors duration-300">
                          Request for Guest Outreach
                        </h4>
                        <p className="text-[#a9adc1] text-sm">
                          Fill form 1 for guest outreach request
                        </p>
                      </div>
                      <i className="fas fa-chevron-right text-[#00ffc3] opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-4 transition-all duration-300"></i>
                    </div>
                  </div>
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-[#1a1b26] text-center">
                <p className="text-[#a9adc1] text-sm">
                  <i className="fas fa-info-circle mr-2 text-[#00ffc3]"></i>
                  Your request will be processed within 24 hours
                </p>
              </div>
            </div>
          </div>
        )}

        {showEventPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
            <div className="relative bg-gradient-to-br from-[#0f0f1a] to-[#1a1b26] p-8 rounded-2xl border-2 border-[#00ffc3] max-w-md w-full mx-4 shadow-[0_0_50px_rgba(0,255,195,0.3)] animate-scaleIn">
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#00ffc3] rounded-full animate-pulse"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#00ffc3] rounded-full animate-pulse delay-100"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#00ffc3] rounded-full animate-pulse delay-200"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#00ffc3] rounded-full animate-pulse delay-300"></div>

              <button
                onClick={closePopups}
                className="absolute -top-3 -right-3 w-8 h-8 bg-[#00ffc3] rounded-full flex items-center justify-center hover:bg-[#00d4a3] transition-all duration-300 transform hover:scale-110 hover:rotate-90 z-10"
              >
                <i className="fas fa-times text-[#0f0f1a]"></i>
              </button>

              <div className="absolute inset-0 bg-[#00ffc3] opacity-5 rounded-2xl animate-glow"></div>

              <h3 className="text-2xl font-bold mb-8 text-[#00ffc3] font-audiowide text-center relative">
                <i className="fas fa-users absolute -left-6 top-1 text-lg animate-float"></i>
                Event Guest Hospitality
                <i className="fas fa-concierge-bell absolute -right-6 top-1 text-lg animate-float delay-100"></i>
              </h3>

              <div className="space-y-6">
                <a
                  href="https://forms.gle/fEjx9nEYmNxsSbZH9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block w-full relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00ffc3] to-[#00d4a3] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                  <div className="relative bg-[#1a1b26] p-6 rounded-xl border border-[#00ffc3] hover:border-[#00d4a3] transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(0,255,195,0.2)]">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-[#0f0f1a] rounded-lg flex items-center justify-center border border-[#00ffc3] group-hover:scale-110 transition-transform duration-300">
                        <i className="fas fa-bed text-[#00ffc3] text-xl group-hover:rotate-12 transition-transform duration-300"></i>
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-[#00ffc3] font-audiowide text-lg mb-1 group-hover:text-[#00d4a3] transition-colors duration-300">
                          Event Guest Accommodation
                        </h4>
                        <p className="text-[#a9adc1] text-sm">
                          Fill form 2A for guest stay arrangements
                        </p>
                      </div>
                      <i className="fas fa-chevron-right text-[#00ffc3] opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-4 transition-all duration-300"></i>
                    </div>
                  </div>
                </a>

                <a
                  href="https://forms.gle/d6wJ25uMymehMwDG9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block w-full relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00ffc3] to-[#00d4a3] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                  <div className="relative bg-[#1a1b26] p-6 rounded-xl border border-[#00ffc3] hover:border-[#00d4a3] transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(0,255,195,0.2)]">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-[#0f0f1a] rounded-lg flex items-center justify-center border border-[#00ffc3] group-hover:scale-110 transition-transform duration-300">
                        <i className="fas fa-gift text-[#00ffc3] text-xl group-hover:rotate-12 transition-transform duration-300"></i>
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-[#00ffc3] font-audiowide text-lg mb-1 group-hover:text-[#00d4a3] transition-colors duration-300">
                          Refreshments & Hampers
                        </h4>
                        <p className="text-[#a9adc1] text-sm">
                          Fill form 2B for guest refreshments
                        </p>
                      </div>
                      <i className="fas fa-chevron-right text-[#00ffc3] opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-4 transition-all duration-300"></i>
                    </div>
                  </div>
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-[#1a1b26] text-center">
                <p className="text-[#a9adc1] text-sm">
                  <i className="fas fa-info-circle mr-2 text-[#00ffc3]"></i>
                  Your request will be processed within 24 hours
                </p>
              </div>
            </div>
          </div>
        )}

        {showSponsorPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
            <div className="relative bg-gradient-to-br from-[#0f0f1a] to-[#1a1b26] p-8 rounded-2xl border-2 border-[#00ffc3] max-w-md w-full mx-4 shadow-[0_0_50px_rgba(0,255,195,0.3)] animate-scaleIn">
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#00ffc3] rounded-full animate-pulse"></div>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#00ffc3] rounded-full animate-pulse delay-100"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#00ffc3] rounded-full animate-pulse delay-200"></div>
              <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#00ffc3] rounded-full animate-pulse delay-300"></div>

              <button
                onClick={closePopups}
                className="absolute -top-3 -right-3 w-8 h-8 bg-[#00ffc3] rounded-full flex items-center justify-center hover:bg-[#00d4a3] transition-all duration-300 transform hover:scale-110 hover:rotate-90 z-10"
              >
                <i className="fas fa-times text-[#0f0f1a]"></i>
              </button>

              <div className="absolute inset-0 bg-[#00ffc3] opacity-5 rounded-2xl animate-glow"></div>

              <h3 className="text-2xl font-bold mb-8 text-[#00ffc3] font-audiowide text-center relative">
                <i className="fas fa-handshake absolute -left-6 top-1 text-lg animate-float"></i>
                Sponsor Hospitality
                <i className="fas fa-star absolute -right-6 top-1 text-lg animate-float delay-100"></i>
              </h3>

              <div className="space-y-6">
                <a
                  href="https://forms.gle/mTqWf7bmZ8D2Wd4T7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block w-full relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00ffc3] to-[#00d4a3] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                  <div className="relative bg-[#1a1b26] p-6 rounded-xl border border-[#00ffc3] hover:border-[#00d4a3] transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(0,255,195,0.2)]">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-[#0f0f1a] rounded-lg flex items-center justify-center border border-[#00ffc3] group-hover:scale-110 transition-transform duration-300">
                        <i className="fas fa-bed text-[#00ffc3] text-xl group-hover:rotate-12 transition-transform duration-300"></i>
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-[#00ffc3] font-audiowide text-lg mb-1 group-hover:text-[#00d4a3] transition-colors duration-300">
                          Guests Accommodation
                        </h4>
                        <p className="text-[#a9adc1] text-sm">
                          Fill form 3A for sponsor stay arrangements
                        </p>
                      </div>
                      <i className="fas fa-chevron-right text-[#00ffc3] opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-4 transition-all duration-300"></i>
                    </div>
                  </div>
                </a>

                <a
                  href="https://forms.gle/EoCYVHJNoepqgdhf7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block w-full relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00ffc3] to-[#00d4a3] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                  <div className="relative bg-[#1a1b26] p-6 rounded-xl border border-[#00ffc3] hover:border-[#00d4a3] transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(0,255,195,0.2)]">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-[#0f0f1a] rounded-lg flex items-center justify-center border border-[#00ffc3] group-hover:scale-110 transition-transform duration-300">
                        <i className="fas fa-gift text-[#00ffc3] text-xl group-hover:rotate-12 transition-transform duration-300"></i>
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-[#00ffc3] font-audiowide text-lg mb-1 group-hover:text-[#00d4a3] transition-colors duration-300">
                          Refreshments and Amenities
                        </h4>
                        <p className="text-[#a9adc1] text-sm">
                          Fill form 3B for sponsor refreshments
                        </p>
                      </div>
                      <i className="fas fa-chevron-right text-[#00ffc3] opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-4 transition-all duration-300"></i>
                    </div>
                  </div>
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-[#1a1b26] text-center">
                <p className="text-[#a9adc1] text-sm">
                  <i className="fas fa-info-circle mr-2 text-[#00ffc3]"></i>
                  Your request will be processed by the team soon
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedMember && (
          <div
            className="md:hidden fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn"
            onClick={closeMemberPopup}
          >
            <div
              className="relative bg-gradient-to-br from-[#1a1b26] to-[#252632] p-6 rounded-lg m-4 shadow-[0_0_30px_rgba(0,255,195,0.3)] border-2 border-[#00ffc3] animate-scaleIn"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeMemberPopup}
                className="absolute -top-3 -right-3 w-8 h-8 bg-[#00ffc3] rounded-full flex items-center justify-center hover:bg-[#00d4a3] transition-all duration-300 transform hover:scale-110 hover:rotate-90"
              >
                <i className="fas fa-times text-[#0f0f1a]"></i>
              </button>

              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-[#0f0f1a] rounded-full flex items-center justify-center border-2 border-[#00ffc3] mb-4 shadow-[0_0_15px_rgba(0,255,195,0.5)] overflow-hidden">
                  {selectedMember.image ? (
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <i className={`fas fa-user text-[#00ffc3] text-4xl`}></i>
                  )}
                </div>
                <h4 className="text-[#00ffc3] text-xl font-bold mb-2">
                  {selectedMember.name}
                </h4>
                <div className="text-[#a9adc1] text-sm mb-3 flex items-center justify-center">
                  <i className="fas fa-user-ninja mr-2"></i>
                  {selectedMember.role}
                </div>
                <p className="text-[#00ffc3] text-sm italic mb-4 px-4 py-2 bg-[#0f0f1a] rounded-lg border border-[#00ffc3] shadow-inner">
                  "{selectedMember.funnyLine}"
                </p>
                <a
                  href={`mailto:${selectedMember.email}`}
                  className="text-sm text-[#00ffc3] hover:text-[#00d4a3] flex items-center justify-center group relative overflow-hidden rounded-lg px-4 py-2 border border-[#00ffc3] hover:border-[#00d4a3] transition-all duration-300 bg-[#0f0f1a]"
                >
                  <i className="fas fa-paper-plane mr-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                  {selectedMember.email}
                </a>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-[#0f0f1a] border-t-2 border-[#00ffc3] py-8 font-audiowide">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="mb-8">
              <h3 className="text-[#00ffc3] text-xl mb-6 flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i>
                Location
              </h3>
              <p className="text-[#a9adc1]">IIT Madras, Chennai 600036</p>
            </div>

            <div>
              <h3 className="text-[#00ffc3] text-xl mb-6 flex items-center">
                <i className="fas fa-link mr-2"></i>
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/"
                    className="text-[#a9adc1] hover:text-[#00ffc3] transition-colors flex items-center"
                  >
                    <i className="fas fa-chevron-right mr-2 text-sm"></i>
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/updates"
                    className="text-[#a9adc1] hover:text-[#00ffc3] transition-colors flex items-center"
                  >
                    <i className="fas fa-chevron-right mr-2 text-sm"></i>
                    Track Requests
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-[#a9adc1] hover:text-[#00ffc3] transition-colors flex items-center"
                  >
                    <i className="fas fa-chevron-right mr-2 text-sm"></i>
                    About Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-[#1a1b26] text-center">
            <p className="text-[#a9adc1] text-sm font-['Audiowide'] mb-2">
              © 2025 Outreach and Hospitality IITM Paradox. All rights reserved.
            </p>
            <p className="text-[#a9adc1] text-sm font-['Audiowide']">
              <i className="fas fa-code text-[#00ffc3] mr-2" />
              Developed by{" "}
              <span className="text-[#00ffc3] hover:text-[#00d4a3] transition-colors">
                Aman Chandra
              </span>
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(0, 255, 195, 0.2);
          }
          50% {
            box-shadow: 0 0 20px rgba(0, 255, 195, 0.6);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes glow {
          0%, 100% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.15;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;