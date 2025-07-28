"use client";
import { Audiowide } from 'next/font/google';

const audiowide = Audiowide({
  subsets: ['latin'],
  weight: '400',
});

import React, { useState, useEffect } from "react";
import Link from "next/link";


function MainComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("outreach");
  const [showRecruitmentPopup, setShowRecruitmentPopup] = useState(false);
  const [showInternalPopup, setShowInternalPopup] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeRecruitmentPopup = () => {
    setShowRecruitmentPopup(false);
  };

  const closeInternalPopup = () => {
    setShowInternalPopup(false);
  };

  const scrollToSection = (sectionId) => {
    console.log("Scrolling to section:", sectionId); // Debug log
    const section = document.getElementById(sectionId);
    console.log("Found section:", section); // Debug log
    if (section) {
      // Close mobile menu first
      setIsMenuOpen(false);
      // Add a small delay to ensure the menu closes first
      setTimeout(() => {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 100);
    } else {
      console.error("Section not found:", sectionId);
    }
  };

  const whatWeDoSections = [
    {
      id: "outreach",
      title: "Outreach",
      icon: "fa-bullhorn",
      description:
        "We connect with industry leaders, alumni, and distinguished guests to bring valuable insights and opportunities to our community.",
      details: [
        "Industry partnerships and collaborations",
        "Guest speaker invitations and coordination",
        "Alumni engagement and networking",
        "Corporate relationship management",
      ],
    },
    {
      id: "hospitality",
      title: "Hospitality",
      icon: "fa-concierge-bell",
      description:
        "We ensure every guest feels welcomed and comfortable during their visit to IIT Madras, creating memorable experiences.",
      details: [
        "Accommodation arrangements and management",
        "Transportation coordination",
        "Dining and refreshment services",
        "Event logistics and support",
      ],
    },
    {
      id: "experience",
      title: "Guest Experience",
      icon: "fa-star",
      description:
        "We craft exceptional experiences that leave lasting impressions on our guests and strengthen institutional relationships.",
      details: [
        "Personalized guest journey planning",
        "Cultural and campus tours",
        "Special event coordination",
        "Feedback collection and improvement",
      ],
    },
  ];

  const uniqueFeatures = [
    {
      icon: "fa-users",
      title: "Collaborative Team",
      description:
        "Work with diverse, talented individuals who share your passion for excellence",
    },
    {
      icon: "fa-lightbulb",
      title: "Innovation Focus",
      description:
        "Implement creative solutions and cutting-edge approaches to hospitality",
    },
    {
      icon: "fa-network-wired",
      title: "Industry Connections",
      description:
        "Build valuable networks with industry leaders and distinguished professionals",
    },
    {
      icon: "fa-trophy",
      title: "Excellence Standards",
      description:
        "Maintain the highest standards of service and professionalism",
    },
  ];

  const perks = [
    {
      icon: "fa-graduation-cap",
      title: "Skill Development",
      description:
        "Enhance communication, leadership, and project management skills",
    },
    {
      icon: "fa-handshake",
      title: "Networking",
      description:
        "Connect with industry professionals and build lasting relationships",
    },
    {
      icon: "fa-certificate",
      title: "Recognition",
      description:
        "Receive certificates and recognition for your contributions",
    },
    {
      icon: "fa-rocket",
      title: "Growth Opportunities",
      description: "Take on leadership roles and drive impactful initiatives",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f1a] flex flex-col">
      {/* Navigation */}
      <nav className="bg-[#0f0f1a] border-b-2 border-[#00ffc3] py-4 px-6 sticky top-0 z-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <a
              href="/"
              className="text-[#00ffc3] text-2xl font-['audiowide'] flex items-center"
            >
              <i className="fas fa-robot mr-2"></i>
              Outreach & Hospitality
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
  <a
    href="/"
    className="text-[#00ffc3] hover:text-[#00d4a3] transition-colors font-['audiowide']"
  >
    <i className="fas fa-home mr-2"></i>Home
  </a>

  <button
    onClick={() => scrollToSection("apply-section")}
    className="text-[#00ffc3] hover:text-[#00d4a3] transition-colors font-['audiowide']"
  >
    <i className="fas fa-user-plus mr-2"></i>Apply to Join
  </button>

  <button
    onClick={() => scrollToSection("wizardsPanel")}
    className="text-[#00ffc3] hover:text-[#00d4a3] transition-colors font-['audiowide']"
  >
    <i className="fas fa-wand-magic-sparkles mr-2"></i>Wizards Panel
  </button>

  <Link
    href="/about"
    className="text-[#00ffc3] hover:text-[#00d4a3] transition-colors font-['audiowide']"
  >
    <i className="fas fa-info-circle mr-2"></i>About
  </Link>
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
                    className="text-[#00ffc3] hover:text-[#00d4a3] transition-colors font-['audiowide'] flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <i className="fas fa-home mr-2"></i>
                    Home
                  </a>
                  <button
                    onClick={() => scrollToSection("recruitment")}
                    className="text-[#00ffc3] hover:text-[#00d4a3] transition-colors font-['audiowide'] flex items-center text-left"
                  >
                    <i className="fas fa-users mr-2"></i>
                    Join Our Team
                  </button>
                  <a
                    href="/about"
                    className="text-[#00ffc3] hover:text-[#00d4a3] transition-colors font-['audiowide'] flex items-center"
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
        {/* Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[#0f0f1a] opacity-90"></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center">
              <h1 className="text-3xl md:text-6xl font-bold mb-8 text-[#00ffc3] font-['audiowide'] animate-fadeIn">
                Welcome to Unified
              </h1>
              <p className="text-xl md:text-3xl mb-6 text-[#a9adc1] font-['audiowide'] animate-fadeIn delay-200">
                The Central App for Department of
              </p>
              <p className="text-2xl md:text-4xl mb-12 text-[#00ffc3] font-['audiowide'] animate-fadeIn delay-400">
                Outreach & Hospitality, IIT Madras Paradox
              </p>
              <div className="flex flex-col md:flex-row gap-6 justify-center animate-fadeIn delay-600">
                <button
                  onClick={() => scrollToSection("recruitment")}
                  className="bg-[#00ffc3] text-[#0f0f1a] px-8 py-4 rounded-lg font-bold hover:bg-[#00d4a3] transition-colors font-['audiowide'] transform hover:scale-105"
                >
                  <i className="fas fa-users mr-2"></i>
                  Join Our Team
                </button>
                <button
                  onClick={() => setShowInternalPopup(true)}
                  className="border-2 border-[#ff0000] text-[#ff0000] px-8 py-4 rounded-lg font-bold hover:bg-[#ff0000] hover:text-[#0f0f1a] transition-colors font-['audiowide'] transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,0,0,0.5)]"
                >
                  <i className="fas fa-skull mr-2"></i>
                  Unified Internal
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 bg-[#1a1b26]">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-[#00ffc3] font-['audiowide'] animate-fadeIn">
                <i className="fas fa-heart mr-3"></i>
                Our Mission
              </h2>
              <p className="text-xl md:text-2xl text-[#a9adc1] mb-8 font-crimson-text animate-fadeIn delay-200">
                We make sure every guest at <strong>Paradox</strong> feels
                welcome, comfortable, and valued.
              </p>
              <p className="text-lg text-[#a9adc1] font-crimson-text animate-fadeIn delay-400 mb-6">
                From inviting speakers and special guests to ensuring their stay
                and experience are smooth, we handle it all – with a friendly
                smile and a spirit of teamwork.
              </p>
              <p className="text-lg text-[#a9adc1] font-crimson-text animate-fadeIn delay-400">
                At the end of the day, our goal is simple:{" "}
                <strong>
                  help our guests enjoy Paradox and leave with great memories.
                </strong>
              </p>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section id="what-we-do" className="py-16 bg-[#0f0f1a]">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center text-[#00ffc3] font-['audiowide'] animate-fadeIn">
              <i className="fas fa-cogs mr-3"></i>
              What We Do
            </h2>
            <p className="text-xl text-[#a9adc1] text-center mb-16 font-crimson-text animate-fadeIn delay-200">
              Three pillars that define our excellence
            </p>

            {/* Section Tabs */}
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-12">
              {whatWeDoSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-6 py-3 rounded-lg border-2 transition-all duration-300 font-['audiowide'] ${activeSection === section.id
                      ? "border-[#00ffc3] text-[#00ffc3] bg-[#1a1b26] shadow-[0_0_15px_rgba(0,255,195,0.3)]"
                      : "border-[#a9adc1] text-[#a9adc1] hover:border-[#00ffc3] hover:text-[#00ffc3]"
                    }`}
                >
                  <i className={`fas ${section.icon} mr-2`}></i>
                  {section.title}
                </button>
              ))}
            </div>

            {/* Active Section Content */}
            {whatWeDoSections.map(
              (section) =>
                activeSection === section.id && (
                  <div key={section.id} className="animate-fadeIn">
                    <div className="max-w-4xl mx-auto bg-[#1a1b26] p-8 rounded-xl border-2 border-[#00ffc3]">
                      <div className="text-center mb-8">
                        <i
                          className={`fas ${section.icon} text-6xl text-[#00ffc3] mb-4`}
                        ></i>
                        <h3 className="text-3xl font-bold text-[#00ffc3] font-['audiowide'] mb-4">
                          {section.title}
                        </h3>
                        <p className="text-xl text-[#a9adc1] font-crimson-text">
                          {section.description}
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {section.details.map((detail, index) => (
                          <div
                            key={index}
                            className="flex items-center bg-[#0f0f1a] p-4 rounded-lg border border-[#00ffc3]"
                          >
                            <i className="fas fa-check-circle text-[#00ffc3] mr-3"></i>
                            <span className="text-[#a9adc1]">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </section>

        {/* Why We Matter Section */}
        <section className="py-16 bg-[#1a1b26]">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center text-[#00ffc3] font-['audiowide'] animate-fadeIn">
              <i className="fas fa-star mr-3"></i>
              Why We Matter
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#0f0f1a] p-6 rounded-xl border-2 border-[#00ffc3] hover:shadow-[0_0_20px_rgba(0,255,195,0.2)] transition-all duration-300">
                  <i className="fas fa-hand-wave text-4xl text-[#00ffc3] mb-4"></i>
                  <h3 className="text-xl font-bold text-[#00ffc3] mb-4 font-['audiowide']">
                    We're the First Hello
                  </h3>
                  <p className="text-[#a9adc1] font-crimson-text">
                    When guests arrive at Paradox, we're the ones making them
                    feel welcome and at home.
                  </p>
                </div>
                <div className="bg-[#0f0f1a] p-6 rounded-xl border-2 border-[#00ffc3] hover:shadow-[0_0_20px_rgba(0,255,195,0.2)] transition-all duration-300">
                  <i className="fas fa-magic text-4xl text-[#00ffc3] mb-4"></i>
                  <h3 className="text-xl font-bold text-[#00ffc3] mb-4 font-['audiowide']">
                    We Make Things Easy
                  </h3>
                  <p className="text-[#a9adc1] font-crimson-text">
                    From travel and accommodation to event-day support, we
                    handle it all so our guests can just enjoy the experience.
                  </p>
                </div>
                <div className="bg-[#0f0f1a] p-6 rounded-xl border-2 border-[#00ffc3] hover:shadow-[0_0_20px_rgba(0,255,195,0.2)] transition-all duration-300">
                  <i className="fas fa-users text-4xl text-[#00ffc3] mb-4"></i>
                  <h3 className="text-xl font-bold text-[#00ffc3] mb-4 font-['audiowide']">
                    We Connect People
                  </h3>
                  <p className="text-[#a9adc1] font-crimson-text">
                    Whether it's artists, speakers, or special invitees, we help
                    create opportunities for amazing conversations and
                    collaborations.
                  </p>
                </div>
                <div className="bg-[#0f0f1a] p-6 rounded-xl border-2 border-[#00ffc3] hover:shadow-[0_0_20px_rgba(0,255,195,0.2)] transition-all duration-300">
                  <i className="fas fa-heart text-4xl text-[#00ffc3] mb-4"></i>
                  <h3 className="text-xl font-bold text-[#00ffc3] mb-4 font-['audiowide']">
                    We Create Memories
                  </h3>
                  <p className="text-[#a9adc1] font-crimson-text">
                    Every smile, every warm welcome, and every smooth experience
                    is something guests remember long after Paradox ends.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Makes Us Unique Section */}
        <section className="py-16 bg-[#0f0f1a]">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-center text-[#00ffc3] font-['audiowide'] animate-fadeIn">
              <i className="fas fa-gem mr-3"></i>
              What Makes Us Unique
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {uniqueFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-[#1a1b26] p-6 rounded-xl border-2 border-[#00ffc3] hover:border-[#00d4a3] transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,255,195,0.2)]"
                >
                  <div className="w-16 h-16 bg-[#0f0f1a] rounded-full flex items-center justify-center border-2 border-[#00ffc3] group-hover:scale-110 transition-all duration-300 mb-6">
                    <i
                      className={`fas ${feature.icon} text-[#00ffc3] text-2xl group-hover:rotate-12 transition-transform duration-300`}
                    ></i>
                  </div>
                  <h3 className="text-[#00ffc3] text-xl font-bold mb-4 font-['audiowide'] group-hover:text-[#00d4a3] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-[#a9adc1] font-crimson-text">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Large Recruitment Section */}
        <section id="recruitment" className="py-20 bg-[#0f0f1a]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 text-[#00ffc3] font-['audiowide'] animate-fadeIn">
                <i className="fas fa-users mr-3"></i>
                Join Our Amazing Team!
              </h2>
              <p className="text-xl md:text-2xl text-[#a9adc1] mb-8 font-crimson-text animate-fadeIn delay-200">
                Be part of the magic that makes every guest experience
                unforgettable
              </p>
            </div>

            {/* What You'll Do */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold mb-8 text-center text-[#00ffc3] font-['audiowide']">
                <i className="fas fa-tasks mr-3"></i>
                What You'll Do
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-[#1a1b26] p-6 rounded-xl border-2 border-[#00ffc3] hover:shadow-[0_0_20px_rgba(0,255,195,0.2)] transition-all duration-300">
                  <i className="fas fa-phone text-4xl text-[#00ffc3] mb-4"></i>
                  <h4 className="text-xl font-bold text-[#00ffc3] mb-4 font-['audiowide']">
                    Guest Coordination
                  </h4>
                  <p className="text-[#a9adc1] font-crimson-text">
                    Reach out to industry leaders, coordinate their visits, and
                    ensure seamless communication throughout their journey.
                  </p>
                </div>
                <div className="bg-[#1a1b26] p-6 rounded-xl border-2 border-[#00ffc3] hover:shadow-[0_0_20px_rgba(0,255,195,0.2)] transition-all duration-300">
                  <i className="fas fa-calendar-alt text-4xl text-[#00ffc3] mb-4"></i>
                  <h4 className="text-xl font-bold text-[#00ffc3] mb-4 font-['audiowide']">
                    Event Planning
                  </h4>
                  <p className="text-[#a9adc1] font-crimson-text">
                    Collaborate with event teams and Execute memorable events,
                    from diverse domains of tech , sports and cultural programs.
                  </p>
                </div>
                <div className="bg-[#1a1b26] p-6 rounded-xl border-2 border-[#00ffc3] hover:shadow-[0_0_20px_rgba(0,255,195,0.2)] transition-all duration-300">
                  <i className="fas fa-bed text-4xl text-[#00ffc3] mb-4"></i>
                  <h4 className="text-xl font-bold text-[#00ffc3] mb-4 font-['audiowide']">
                    Hospitality Management
                  </h4>
                  <p className="text-[#a9adc1] font-crimson-text">
                    Manage accommodations, logistics arrangements, and ensure
                    every guest feels the best during their stay.
                  </p>
                </div>
              </div>
            </div>

            {/* Perks and Benefits */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold mb-8 text-center text-[#00ffc3] font-['audiowide']">
                <i className="fas fa-gift mr-3"></i>
                Amazing Perks & Benefits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {perks.map((perk, index) => (
                  <div
                    key={index}
                    className="group bg-[#1a1b26] p-6 rounded-xl border-2 border-[#00ffc3] hover:border-[#00d4a3] transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,255,195,0.2)]"
                  >
                    <div className="w-16 h-16 bg-[#0f0f1a] rounded-full flex items-center justify-center border-2 border-[#00ffc3] group-hover:scale-110 transition-all duration-300 mb-6">
                      <i
                        className={`fas ${perk.icon} text-[#00ffc3] text-2xl group-hover:rotate-12 transition-transform duration-300`}
                      ></i>
                    </div>
                    <h4 className="text-[#00ffc3] text-xl font-bold mb-4 font-['audiowide'] group-hover:text-[#00d4a3] transition-colors">
                      {perk.title}
                    </h4>
                    <p className="text-[#a9adc1] font-crimson-text">
                      {perk.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Who We're Looking For */}
            <div className="mb-16">
              <h3 className="text-3xl font-bold mb-8 text-center text-[#00ffc3] font-['audiowide']">
                <i className="fas fa-search mr-3"></i>
                Who We're Looking For
              </h3>
              <div className="max-w-4xl mx-auto bg-[#1a1b26] p-8 rounded-xl border-2 border-[#00ffc3]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold text-[#00ffc3] mb-4 font-['audiowide']">
                      <i className="fas fa-heart mr-2"></i>
                      Personality Traits
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-center text-[#a9adc1]">
                        <i className="fas fa-check text-[#00ffc3] mr-3"></i>
                        Enthusiastic and energetic
                      </li>
                      <li className="flex items-center text-[#a9adc1]">
                        <i className="fas fa-check text-[#00ffc3] mr-3"></i>
                        Excellent communication skills
                      </li>
                      <li className="flex items-center text-[#a9adc1]">
                        <i className="fas fa-check text-[#00ffc3] mr-3"></i>
                        Detail-oriented and organized
                      </li>
                      <li className="flex items-center text-[#a9adc1]">
                        <i className="fas fa-check text-[#00ffc3] mr-3"></i>
                        Team player with leadership potential
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-[#00ffc3] mb-4 font-['audiowide']">
                      <i className="fas fa-cog mr-2"></i>
                      Skills & Interests
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-center text-[#a9adc1]">
                        <i className="fas fa-check text-[#00ffc3] mr-3"></i>
                        Interest in event management
                      </li>
                      <li className="flex items-center text-[#a9adc1]">
                        <i className="fas fa-check text-[#00ffc3] mr-3"></i>
                        Problem-solving abilities
                      </li>
                      <li className="flex items-center text-[#a9adc1]">
                        <i className="fas fa-check text-[#00ffc3] mr-3"></i>
                        Cultural awareness and sensitivity
                      </li>
                      <li className="flex items-center text-[#a9adc1]">
                        <i className="fas fa-check text-[#00ffc3] mr-3"></i>
                        Passion for creating great experiences
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
           </section>

           <section id="wizardsPanel" className="py-16">
  <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center text-[#00ffc3] font-audiowide">
    <i className="fas fa-wand-magic-sparkles mr-3"></i>
    The Wizards Panel
  </h2>
  <p className="text-xl text-[#a9adc1] text-center mb-16 font-crimson-text">
    Meet the Outreach crew , Set your craziness limitless to join the Panel
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
                <i className="fas fa-user text-[#00ffc3] text-2xl group-hover:rotate-12 transition-transform duration-300"></i>
              )}
            </div>
            <span className="text-[#00ffc3] font-bold truncate w-full">
              {member.name}
            </span>
            <span className="text-[#a9adc1] text-sm">{member.role}</span>
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
                <i className="fas fa-user text-[#00ffc3] text-4xl"></i>
              )}
            </div>
            <h4 className="text-[#00ffc3] text-xl font-bold mb-2">{member.name}</h4>
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
</section>

        {/* New Recruitment Application Section */}
        <section id="apply-section" className="py-16 bg-[#1a1b26]">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-8 text-[#00ffc3] font-['audiowide'] animate-fadeIn">
                <i className="fas fa-user-plus mr-3"></i>
                Recruitment
              </h2>
            </div>
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-3xl font-bold mb-8 text-[#00ffc3] font-['audiowide']">
                <i className="fas fa-paper-plane mr-3"></i>
                Ready to Apply?
              </h3>
              <p className="text-xl text-[#a9adc1] mb-8 font-crimson-text">
                Take the first step towards joining our incredible team. Fill
                out our application form and let's start this amazing journey
                together!
              </p>
              <div className="bg-[#0f0f1a] p-8 rounded-xl border-2 border-[#00ffc3] hover:shadow-[0_0_30px_rgba(0,255,195,0.3)] transition-all duration-300">
                <i className="fas fa-rocket text-6xl text-[#00ffc3] mb-6"></i>
                <h4 className="text-2xl font-bold text-[#00ffc3] mb-6 font-['audiowide']">
                  Join the Department of Outreach & Hospitality
                </h4>
                <p className="text-[#a9adc1] mb-8 font-crimson-text">
                  Click the button below to access our recruitment form. We
                  can't wait to meet you and learn about your passion for
                  creating exceptional experiences!
                </p>
                <button
                  onClick={() => setShowRecruitmentPopup(true)}
                  className="inline-block bg-[#00ffc3] text-[#0f0f1a] px-12 py-4 rounded-lg font-bold hover:bg-[#00d4a3] transition-all duration-300 font-['audiowide'] transform hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,195,0.5)]"
                >
                  <i className="fas fa-users mr-2"></i>
                  Apply Now - Join Our Team!
                </button>
                <p className="text-sm text-[#a9adc1] mt-4">
                  <i className="fas fa-info-circle mr-2"></i>
                  Applications are reviewed on a rolling basis. Apply early for
                  the best chance!
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Recruitment Popup */}
      {showRecruitmentPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          {/* Animated Squares Entrance */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
            <div className="absolute animate-square-entrance-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 border-2 border-[#00ffc3] rotate-45"></div>
            </div>
            <div className="absolute animate-square-entrance-2">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 border-2 border-[#00ffc3] rotate-45"></div>
            </div>
            <div className="absolute animate-square-entrance-3">
              <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 border-2 border-[#00ffc3] rotate-45"></div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-[#0f0f1a] to-[#1a1b26] p-8 rounded-2xl border-2 border-[#00ffc3] max-w-md w-full mx-4 shadow-[0_0_50px_rgba(0,255,195,0.3)] animate-popup-appear overflow-hidden">
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#00ffc3] rounded-full animate-pulse"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#00ffc3] rounded-full animate-pulse delay-100"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#00ffc3] rounded-full animate-pulse delay-200"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#00ffc3] rounded-full animate-pulse delay-300"></div>

            <button
              onClick={closeRecruitmentPopup}
              className="absolute top-3 right-3 w-8 h-8 bg-[#00ffc3] rounded-full flex items-center justify-center hover:bg-[#00d4a3] transition-all duration-300 transform hover:scale-110 hover:rotate-90 z-10"
            >
              <i className="fas fa-times text-[#0f0f1a]"></i>
            </button>

            {/* Xerox Scanning Effect Background */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[#00ffc3] opacity-0 animate-xerox-scan"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ffc3] to-transparent opacity-0 animate-xerox-sweep"></div>
            </div>

            <h3 className="text-2xl font-bold mb-8 text-[#00ffc3] font-['audiowide'] text-center relative z-10 flex items-center justify-center gap-3">
              <i className="fas fa-users text-lg animate-float"></i>
              Join Our Team
              <i className="fas fa-rocket text-lg animate-float delay-100"></i>
            </h3>

            <div className="space-y-6 relative z-10">
              <a
                href="https://forms.gle/JVM9afHav1kGExwB6"
                target="_blank"
                rel="noopener noreferrer"
                className="group block w-full relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00ffc3] to-[#00d4a3] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                <div className="relative bg-[#1a1b26] p-6 rounded-xl border border-[#00ffc3] hover:border-[#00d4a3] transition-all duration-300 transform group-hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(0,255,195,0.2)]">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[#0f0f1a] rounded-lg flex items-center justify-center border border-[#00ffc3] group-hover:scale-110 transition-transform duration-300">
                      <i className="fas fa-paper-plane text-[#00ffc3] text-xl group-hover:rotate-12 transition-transform duration-300"></i>
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="text-[#00ffc3] font-['audiowide'] text-lg mb-1 group-hover:text-[#00d4a3] transition-colors duration-300">
                        Recruitment Application Form
                      </h4>
                      <p className="text-[#a9adc1] text-sm">
                        Fill out our recruitment form to join the team
                      </p>
                    </div>
                    <i className="fas fa-chevron-right text-[#00ffc3] opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-4 transition-all duration-300"></i>
                  </div>
                </div>
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-[#1a1b26] text-center relative z-10">
              <p className="text-[#a9adc1] text-sm">
                <i className="fas fa-info-circle mr-2 text-[#00ffc3]"></i>
                Applications are reviewed on a rolling basis
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Scary Internal Popup */}
      {showInternalPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50 animate-horror-entrance">
          {/* Scary animated elements */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute animate-skull-float-1">
              <i className="fas fa-skull text-6xl text-[#ff0000] opacity-20"></i>
            </div>
            <div className="absolute animate-skull-float-2">
              <i className="fas fa-ghost text-5xl text-[#ff0000] opacity-15"></i>
            </div>
            <div className="absolute animate-skull-float-3">
              <i className="fas fa-spider text-4xl text-[#ff0000] opacity-25"></i>
            </div>
            <div className="absolute animate-glitch-1">
              <div className="w-32 h-32 border-2 border-[#ff0000] rotate-45 opacity-10"></div>
            </div>
            <div className="absolute animate-glitch-2">
              <div className="w-24 h-24 border-2 border-[#ff0000] rotate-12 opacity-15"></div>
            </div>
          </div>

          {/* Blood drip effect */}
          <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-[#ff0000] to-transparent opacity-30 animate-blood-drip"></div>
          <div className="absolute top-0 right-1/3 w-1 h-full bg-gradient-to-b from-[#ff0000] to-transparent opacity-20 animate-blood-drip-2"></div>

          <div className="relative bg-gradient-to-br from-[#0f0f0f] via-[#1a0000] to-[#0f0f0f] 
p-8 rounded-2xl border-2 border-[#ff0000] max-w-md w-full mx-4 
shadow-[0_0_50px_rgba(255,0,0,0.5)] animate-horror-popup 
overflow-y-auto max-h-[90vh]">

            {/* Glitch overlay */}
            <div className="absolute inset-0 bg-[#ff0000] opacity-0 animate-glitch-overlay"></div>

            {/* Scary corner elements */}
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#ff0000] rounded-full animate-pulse-horror"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#ff0000] rounded-full animate-pulse-horror delay-100"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-[#ff0000] rounded-full animate-pulse-horror delay-200"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-[#ff0000] rounded-full animate-pulse-horror delay-300"></div>

            <button
              onClick={closeInternalPopup}
              className="absolute top-3 right-3 w-8 h-8 bg-[#ff0000] rounded-full flex items-center justify-center hover:bg-[#cc0000] transition-all duration-300 transform hover:scale-110 hover:rotate-180 z-10 animate-pulse-horror"
            >
              <i className="fas fa-times text-[#0f0f0f]"></i>
            </button>

            {/* Flickering text effect */}
            <div className="text-center relative z-10">
              <h3 className="text-3xl font-bold mb-8 text-[#ff0000] font-['audiowide'] animate-flicker-text flex items-center justify-center gap-3">
                <i className="fas fa-exclamation-triangle text-lg animate-shake"></i>
                WARNING
                <i className="fas fa-skull text-lg animate-shake delay-100"></i>
              </h3>

              <div className="space-y-6 mb-8">
                <div className="bg-[#1a0000] p-6 rounded-xl border border-[#ff0000] animate-horror-glow">
                  <i className="fas fa-user-secret text-4xl text-[#ff0000] mb-4 animate-float-scary"></i>
                  <h4 className="text-[#ff0000] font-['audiowide'] text-xl mb-4 animate-flicker-text">
                    RESTRICTED ACCESS
                  </h4>
                  <p className="text-[#ffaaaa] text-sm mb-4 animate-typewriter">
                    This will redirect to internal app management and only for
                    organisers
                  </p>
                  <p className="text-[#ff0000] font-bold animate-pulse-horror">
                    If you are organiser then continue...
                  </p>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={closeInternalPopup}
                  className="bg-[#333] text-[#fff] px-6 py-3 rounded-lg font-bold hover:bg-[#555] transition-all duration-300 font-['audiowide'] transform hover:scale-105"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Escape
                </button>
                <button
                  onClick={() => {
                    window.open("/Internal", "_blank"); // Opens Internal page in new tab
                    closeInternalPopup();
                  }}
                  className="bg-[#ff0000] text-[#fff] px-6 py-3 rounded-lg font-bold hover:bg-[#cc0000] transition-all duration-300 font-['audiowide'] transform hover:scale-105 animate-pulse-horror hover:shadow-[0_0_30px_rgba(255,0,0,0.7)]"
                >
                  <i className="fas fa-door-open mr-2 animate-shake"></i>
                  PROCEED
                </button>
              </div>

              <div className="mt-6 pt-4 border-t border-[#ff0000] opacity-50">
                <p className="text-[#ffaaaa] text-xs animate-flicker-text">
                  <i className="fas fa-skull-crossbones mr-2 text-[#ff0000]"></i>
                  Enter at your own risk...
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#0f0f1a] border-t-2 border-[#00ffc3] py-8 font-['audiowide']">
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
  <p className="text-[#a9adc1] text-sm">
    © 2025 Department of Outreach and Hospitality, IIT Madras Paradox.
    All rights reserved.
  </p>
  <p className="text-[#a9adc1] text-sm font-['Audiowide'] mt-3">
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

        @keyframes square-entrance-1 {
          0% {
            opacity: 0;
            transform: rotate(45deg) scale(0);
          }
          15% {
            opacity: 0.8;
            transform: rotate(45deg) scale(1);
          }
          30% {
            transform: rotate(180deg) scale(1);
          }
          45% {
            transform: rotate(315deg) scale(1);
          }
          60% {
            transform: rotate(450deg) scale(1);
          }
          75% {
            transform: rotate(585deg) scale(1);
          }
          85% {
            transform: rotate(675deg) scale(0.9);
            opacity: 0.6;
          }
          95% {
            transform: rotate(720deg) scale(0.3);
            opacity: 0.2;
          }
          100% {
            transform: rotate(765deg) scale(0);
            opacity: 0;
          }
        }

        @keyframes square-entrance-2 {
          0% {
            opacity: 0;
            transform: rotate(45deg) scale(0);
          }
          10% {
            opacity: 0;
          }
          20% {
            opacity: 0.7;
            transform: rotate(45deg) scale(1);
          }
          35% {
            transform: rotate(-90deg) scale(1);
          }
          50% {
            transform: rotate(-225deg) scale(1);
          }
          65% {
            transform: rotate(-360deg) scale(1);
          }
          80% {
            transform: rotate(-495deg) scale(1);
          }
          90% {
            transform: rotate(-585deg) scale(0.8);
            opacity: 0.4;
          }
          97% {
            transform: rotate(-630deg) scale(0.2);
            opacity: 0.1;
          }
          100% {
            transform: rotate(-675deg) scale(0);
            opacity: 0;
          }
        }

        @keyframes square-entrance-3 {
          0% {
            opacity: 0;
            transform: rotate(45deg) scale(0);
          }
          25% {
            opacity: 0;
          }
          35% {
            opacity: 0.6;
            transform: rotate(45deg) scale(1);
          }
          50% {
            transform: rotate(225deg) scale(1);
          }
          65% {
            transform: rotate(405deg) scale(1);
          }
          80% {
            transform: rotate(585deg) scale(1);
          }
          90% {
            transform: rotate(720deg) scale(0.9);
            opacity: 0.3;
          }
          96% {
            transform: rotate(810deg) scale(0.4);
            opacity: 0.1;
          }
          100% {
            transform: rotate(900deg) scale(0);
            opacity: 0;
          }
        }

        @keyframes popup-appear {
          0% {
            opacity: 0;
            transform: scale(0.1) rotate(360deg);
          }
          80% {
            opacity: 0;
          }
          90% {
            opacity: 0.8;
            transform: scale(1.02) rotate(0deg);
          }
          95% {
            opacity: 1;
            transform: scale(0.98) rotate(0deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes xerox-scan {
          0% {
            opacity: 0;
          }
          5% {
            opacity: 0.15;
          }
          15% {
            opacity: 0.15;
          }
          20% {
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes xerox-sweep {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }

        @keyframes motivational-text {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          20% {
            opacity: 0;
          }
          40% {
            opacity: 0.8;
            transform: translateY(0) scale(1);
          }
          70% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          85% {
            opacity: 0.8;
            transform: translateY(-5px) scale(1.02);
          }
          95% {
            opacity: 0.4;
            transform: translateY(-10px) scale(0.95);
          }
          100% {
            opacity: 0;
            transform: translateY(-20px) scale(0.8);
          }
        }

        .animate-motivational-text {
          animation: motivational-text 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
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

        .animate-square-entrance-1 {
          animation: square-entrance-1 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-square-entrance-2 {
          animation: square-entrance-2 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-square-entrance-3 {
          animation: square-entrance-3 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-popup-appear {
          animation: popup-appear 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-xerox-scan {
          animation: xerox-scan 4s ease-in-out infinite;
        }

        .animate-xerox-sweep {
          animation: xerox-sweep 4s ease-in-out infinite 0.5s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-600 {
          animation-delay: 0.6s;
        }

        @keyframes horror-entrance {
          0% {
            opacity: 0;
            background-color: rgba(0, 0, 0, 0);
          }
          20% {
            opacity: 0.3;
            background-color: rgba(0, 0, 0, 0.3);
          }
          50% {
            opacity: 0.7;
            background-color: rgba(0, 0, 0, 0.7);
          }
          100% {
            opacity: 1;
            background-color: rgba(0, 0, 0, 0.9);
          }
        }

        @keyframes horror-popup {
          0% {
            opacity: 0;
            transform: scale(0.1) rotate(720deg);
            filter: blur(10px);
          }
          30% {
            opacity: 0.3;
            transform: scale(0.8) rotate(360deg);
            filter: blur(5px);
          }
          60% {
            opacity: 0.7;
            transform: scale(1.1) rotate(180deg);
            filter: blur(2px);
          }
          80% {
            opacity: 0.9;
            transform: scale(0.95) rotate(0deg);
            filter: blur(1px);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
            filter: blur(0px);
          }
        }

        @keyframes skull-float-1 {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(90deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-10px) translateX(-15px) rotate(180deg);
            opacity: 0.1;
          }
          75% {
            transform: translateY(-30px) translateX(5px) rotate(270deg);
            opacity: 0.25;
          }
        }

        @keyframes skull-float-2 {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.15;
          }
          33% {
            transform: translateY(-25px) translateX(-20px) rotate(120deg);
            opacity: 0.25;
          }
          66% {
            transform: translateY(-5px) translateX(25px) rotate(240deg);
            opacity: 0.1;
          }
        }

        @keyframes skull-float-3 {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.25;
          }
          50% {
            transform: translateY(-15px) translateX(-10px) rotate(180deg);
            opacity: 0.35;
          }
        }

        @keyframes glitch-1 {
          0%, 100% {
            transform: rotate(45deg) scale(1);
            opacity: 0.1;
          }
          10% {
            transform: rotate(50deg) scale(1.1);
            opacity: 0.2;
          }
          20% {
            transform: rotate(40deg) scale(0.9);
            opacity: 0.05;
          }
          30% {
            transform: rotate(55deg) scale(1.2);
            opacity: 0.15;
          }
        }

        @keyframes glitch-2 {
          0%, 100% {
            transform: rotate(12deg) scale(1);
            opacity: 0.15;
          }
          15% {
            transform: rotate(20deg) scale(0.8);
            opacity: 0.25;
          }
          35% {
            transform: rotate(5deg) scale(1.3);
            opacity: 0.1;
          }
          60% {
            transform: rotate(25deg) scale(0.7);
            opacity: 0.2;
          }
        }

        @keyframes blood-drip {
          0% {
            height: 0%;
            opacity: 0.3;
          }
          50% {
            height: 100%;
            opacity: 0.5;
          }
          100% {
            height: 100%;
            opacity: 0.3;
          }
        }

        @keyframes blood-drip-2 {
          0% {
            height: 0%;
            opacity: 0.2;
          }
          30% {
            height: 60%;
            opacity: 0.4;
          }
          100% {
            height: 100%;
            opacity: 0.2;
          }
        }

        @keyframes glitch-overlay {
          0%, 90%, 100% {
            opacity: 0;
          }
          2%, 4%, 6% {
            opacity: 0.1;
          }
          8%, 10% {
            opacity: 0.05;
          }
        }

        @keyframes pulse-horror {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
            box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.2);
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.8);
          }
        }

        @keyframes flicker-text {
          0%, 100% {
            opacity: 1;
            text-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
          }
          2%, 8%, 12%, 18% {
            opacity: 0.1;
            text-shadow: 0 0 10px rgba(255, 0, 0, 0.8);
          }
          4%, 10%, 16% {
            opacity: 1;
            text-shadow: 0 0 15px rgba(255, 0, 0, 1);
          }
        }

        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-2px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(2px);
          }
        }

        @keyframes horror-glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(255, 0, 0, 0.2);
          }
          50% {
            box-shadow: 0 0 25px rgba(255, 0, 0, 0.6);
          }
        }

        @keyframes float-scary {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-5px) rotate(2deg);
          }
          50% {
            transform: translateY(-10px) rotate(0deg);
          }
          75% {
            transform: translateY(-5px) rotate(-2deg);
          }
        }

        @keyframes typewriter {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 0.7;
          }
          100% {
            opacity: 1;
          }
        }

        .animate-horror-entrance {
          animation: horror-entrance 2s ease-out forwards;
        }

        .animate-horror-popup {
          animation: horror-popup 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-skull-float-1 {
          animation: skull-float-1 4s ease-in-out infinite;
        }

        .animate-skull-float-2 {
          animation: skull-float-2 5s ease-in-out infinite;
        }

        .animate-skull-float-3 {
          animation: skull-float-3 3s ease-in-out infinite;
        }

        .animate-glitch-1 {
          animation: glitch-1 2s ease-in-out infinite;
        }

        .animate-glitch-2 {
          animation: glitch-2 1.5s ease-in-out infinite;
        }

        .animate-blood-drip {
          animation: blood-drip 3s ease-in-out infinite;
        }

        .animate-blood-drip-2 {
          animation: blood-drip-2 4s ease-in-out infinite 1s;
        }

        .animate-glitch-overlay {
          animation: glitch-overlay 3s ease-in-out infinite;
        }

        .animate-pulse-horror {
          animation: pulse-horror 1.5s ease-in-out infinite;
        }

        .animate-flicker-text {
          animation: flicker-text 2s ease-in-out infinite;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out infinite;
        }

        .animate-horror-glow {
          animation: horror-glow 2s ease-in-out infinite;
        }

        .animate-float-scary {
          animation: float-scary 3s ease-in-out infinite;
        }

        .animate-typewriter {
          animation: typewriter 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}


export default MainComponent;