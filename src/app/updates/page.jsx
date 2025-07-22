/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
"use client";
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "@/utilities/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function UpdatesPage() {
  /* ---------- STATE ---------- */
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const loginAttemptsRef = React.useRef(0);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(() => {
    // Only run in the browser
    if (typeof window === "undefined") return null;
    const savedLockout = localStorage.getItem('lockoutTime');
    return savedLockout ? parseInt(savedLockout) : null;
  });
  /* FORM STATE */
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [formType, setFormType] = useState("general");
  const [editingUpdate, setEditingUpdate] = useState(null);
  const [generalMessage, setGeneralMessage] = useState("");
  const [guestForm, setGuestForm] = useState({
    eventName: "",
    guestName: "",
    department: "Technicals",
    status: "Started Approach",
    message: "",
  });
  const [eventForm, setEventForm] = useState({
    eventName: "",
    department: "Technicals",
    message: "",
  });
  const [departmentForm, setDepartmentForm] = useState({
    department: "Technicals",
    message: "",
  });

  /* MODALS */
  const [updates, setUpdates] = useState([]);
  const [historyModal, setHistoryModal] = useState([]);
  const [adminControlModal, setAdminControlModal] = useState(false);
  const [singleUpdateDetail, setSingleUpdateDetail] = useState(null);

  /* ---------- FIREBASE ---------- */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setDisplayName(user?.email?.split("@")[0] || "");
    });
    return unsub;
  }, []);

  useEffect(() => {
    const q = query(collection(db, "updates"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setUpdates(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  useEffect(() => {
    // Cleanup expired lockout
    if (lockoutTime && Date.now() > lockoutTime) {
      localStorage.removeItem('lockoutTime'); // Clear from browser
      setLockoutTime(null);
      loginAttemptsRef.current = 0; // Reset attempts
    }
  }, [lockoutTime]);

  useEffect(() => {
    if (!auth.currentUser) return;
    auth.currentUser.getIdToken().then(async (token) => {
      const r = await fetch("/api/isAdmin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await r.json();
      setIsSuperAdmin(data.admin);
    });
  }, [auth.currentUser]);

  /* ---------- LOGIN / LOCKOUT ---------- */
  const triggerAccessDenied = (attempts) =>
    new Promise((res) => {
      const left = 3 - attempts;
      const div = document.createElement("div");
      div.className =
        "fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[9999] font-horror";

      if (left > 0) {
        // Show regular access denied with typing animation
        div.innerHTML = `
        <div class="flex flex-col items-center text-center">
          <h1 id="deniedText" class="text-red-600 text-8xl md:text-9xl mb-4"></h1>
          <p id="attemptText" class="text-red-400 text-3xl md:text-4xl"></p>
        </div>`;

        document.body.appendChild(div);

        const deniedTxt = "ACCESS DENIED";
        const attemptsTxt = `${left} attempt${left === 1 ? "" : "s"} remaining`;

        let d = 0, a = 0;
        const typeDenied = () => {
          div.querySelector("#deniedText").textContent += deniedTxt[d++];
          if (d < deniedTxt.length) setTimeout(typeDenied, 60);
          else typeAttempts();
        };

        const typeAttempts = () => {
          div.querySelector("#attemptText").textContent += attemptsTxt[a++];
          if (a < attemptsTxt.length) setTimeout(typeAttempts, 60);
          else setTimeout(() => {
            div.style.opacity = "0";
            setTimeout(() => {
              div.remove();
              res();
            }, 500);
          }, 2000);
        };

        typeDenied();
      } else {
        // Show SYSTEM LOCKED with countdown on third attempt
        div.innerHTML = `
        <div class="flex flex-col items-center text-center">
          <h1 class="text-red-600 text-8xl md:text-9xl mb-4">SYSTEM LOCKED</h1>
          <p id="countdown" class="text-red-400 text-4xl md:text-5xl">30</p>
          <p class="text-red-300 text-xl mt-4">Seconds until reactivation</p>
        </div>`;

        document.body.appendChild(div);

        // Start 30 second countdown
        let seconds = 30;
        const countdownEl = div.querySelector("#countdown");
        const timer = setInterval(() => {
          seconds--;
          countdownEl.textContent = seconds;

          if (seconds <= 0) {
            clearInterval(timer);
            div.style.opacity = "0";
            setTimeout(() => {
              div.remove();
              res();
              // Automatically reopen login after countdown
              openDragonLogin();
            }, 500);
          }
        }, 1000);
      }
    });


  const triggerHackerGranted = () => {
    const div = document.createElement("div");
    div.className =
      "fixed inset-0 bg-black flex items-center justify-center z-[9999] font-['Audiowide']";
    div.innerHTML = `
      <div class="relative w-full h-full flex items-center justify-center overflow-hidden">
        <div class="matrix-green absolute inset-0"></div>
        <div class="hacker-circle border-[#00ff00]"></div>
        <div class="hacker-circle border-[#00ff00] delay-500"></div>
        <div class="hacker-circle border-[#00ff00] delay-1000"></div>
        <div class="relative z-10 text-center">
          <h1 id="grantedText" class="text-[#00ff00] text-7xl md:text-9xl drop-shadow-[0_0_10px_#00ff00]"></h1>
          <p id="typeText"   class="text-[#00ff00] text-2xl md:text-4xl mt-4 tracking-widest"></p>
        </div>
      </div>`;
    const css = document.createElement("style");
    css.textContent = `
.matrix-green{position:fixed;inset:0;background:linear-gradient(180deg,rgba(0,255,0,.15) 0%,rgba(0,255,0,.05) 50%,transparent 100%);animation:matrix-rain 1.5s linear infinite;background-size:100% 100vh;}
@keyframes matrix-rain{0%{background-position:0 0}100%{background-position:0 100vh}}
.hacker-circle{position:absolute;width:120vmin;height:120vmin;border:3px solid #00ff00;border-radius:50%;animation:hacker-pulse 3s ease-out infinite}
.hacker-circle.delay-500{animation-delay:.5s}.hacker-circle.delay-1000{animation-delay:1s}
@keyframes hacker-pulse{0%{transform:scale(.1);opacity:1}100%{transform:scale(2);opacity:0}}`;
    document.head.appendChild(css);
    document.body.appendChild(div);
    const grantedTxt = "ACCESS GRANTED";
    const typeTxt = "Welcome to the dark side...";
    const gEl = div.querySelector("#grantedText");
    const tEl = div.querySelector("#typeText");
    let gi = 0, ti = 0;
    const typeGranted = () => {
      gEl.textContent += grantedTxt[gi++];
      if (gi < grantedTxt.length) setTimeout(typeGranted, 50);
      else setTimeout(typeType, 200);
    };
    const typeType = () => {
      tEl.textContent += typeTxt[ti++];
      if (ti < typeTxt.length) setTimeout(typeType, 40);
    };
    typeGranted();
    setTimeout(() => {
      div.style.opacity = "0";
      setTimeout(() => {
        div.remove()
        css.remove();
      }, 600);
    }, 5000);
  };

  /* ---------- DRAGON LOGIN ---------- */
  /* ---------- DRAGON LOGIN (patch) ---------- */
  const openDragonLogin = () => {

    let loginMinimized = false;   // true = compact bar
    let loginVisible = true;    // false = closed
    /* ---------- lockout check (unchanged) ---------- */
    const savedLockout = localStorage.getItem('lockoutTime');
    if (savedLockout && Date.now() < parseInt(savedLockout)) {
      const rem = Math.ceil((parseInt(savedLockout) - Date.now()) / 1000);
      alert(`System locked. Wait ${rem}s`);
      return;
    }
    if (lockoutTime && Date.now() < lockoutTime) {
      const rem = Math.ceil((lockoutTime - Date.now()) / 1000);
      alert(`System locked. Wait ${rem}s`);
      return;
    }

    /* ---------- dragon intro overlay (original) ---------- */
    /* ---------- build overlay ---------- */
    const portal = document.createElement("div");
    portal.id = "dragonPortalRoot";
    portal.className = "fixed inset-0 z-[9999] bg-black flex items-center justify-center";
    portal.innerHTML = /*html*/`
  <div id="morphStage"
       class="relative w-[95vw] max-w-4xl aspect-[16/9] flex items-center justify-center
              sm:w-[90vw] sm:max-w-2xl md:max-w-3xl">

    <!-- dragon icon -->
    <i id="dragonCore"
       class="fas fa-dragon text-6xl sm:text-7xl md:text-8xl text-red-500 absolute">
    </i>

    <!-- rings that scale down on small screens -->
    ${[...Array(3)].map((_, i) => `
        <div class="magic-ring absolute rounded-full border-2 border-red-500/50"
             style="--delay:${i * 0.4}s; --size:${300 + i * 100}px;
                    width:var(--size); height:var(--size);
                    animation:spin 3s var(--delay) linear infinite;">
        </div>`).join('')}
  </div>
`;

    /* ========  ADD ONLY THESE TWO LINES  ======== */
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Audiowide&display=swap';
    document.head.appendChild(fontLink);
    /* ============================================= */

    const style = document.createElement("style");
    style.textContent = `
      @keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}

      @keyframes bg-grid-red {
        0% { background-position: 0 0; }
        100% { background-position: 50px 50px; }
      }
      
      
      /* ---------- mobile mini styles ---------- */
      @media (max-width: 640px) {
        .cyber-grid,.cyber-scan,.cyber-particles,.cyber-input-border{display:none!important}
        .fa-dragon{font-size:3rem!important}
        .cyber-text,.cyber-subtext{font-size:1.25rem!important}
        #dragonEmail,#dragonPassword,.cyber-button{font-size:1rem!important;padding-top:.5rem!important;padding-bottom:.5rem!important}
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(portal);





    /* ---------- after dragon intro, show cyber login ---------- */
    setTimeout(() => {
      const morph = portal.querySelector("#morphStage");
      morph.style.transition = "transform .7s ease-in-out";
      morph.style.transform = "scale(0)";
      setTimeout(() => {
        morph.innerHTML = `
        <div class="bg-[#1a0000] p-2 rounded-lg border-2 border-red-600
           w-[92vw] max-w-[280px] mx-auto
           max-h-[60vh] overflow-y-auto
           sm:p-4 sm:max-w-sm sm:max-h-[75vh]
           md:p-12 md:max-w-4xl md:max-h-none md:border-4
           relative shadow-[0_0_50px_#ff0000]">



  
            <!-- close -->
            <button id="portalBackBtn" class="absolute top-6 right-6 text-red-600 hover:text-red-400 cursor-pointer z-20 text-2xl transform hover:rotate-90 transition-transform duration-300">
              <i class="fas fa-times"></i>
            </button>
  
            <!-- content -->
            <div class="relative z-10 text-center">
              <div class="mb-12">
                <i class="fas fa-dragon text-red-600 text-8xl mb-8 block cyber-glow"></i>
                <h3 class="text-red-600 text-5xl font-bold font-['Audiowide'] cyber-text mb-4">
  DARK REALM ACCESS
</h3>
                <p class="text-red-400 text-xl font-audiowide mb-8 cyber-subtext">
                  Welcome To Forbidden Gateway
                </p>
              </div>
  
              <form id="dragonLoginForm" class="max-w-lg mx-auto space-y-8">
                <div class="relative">
                  <div class="cyber-input-border"></div>
                  <input type="email" id="dragonEmail" placeholder="ENTER DEATH ID..." required
                         class="w-full bg-[#0f0000] text-red-600 border-2 border-red-600 rounded-lg py-4 px-6 focus:outline-none focus:ring-4 focus:ring-red-600 placeholder-red-900 text-2xl font-['Audiowide'] tracking-wider"/>
                </div>

                <div class="relative">
                  <div class="cyber-input-border"></div>
                  <input type="password" id="dragonPassword" placeholder="SPEAK THE FORBIDDEN WORDS..." required
                         class="w-full bg-[#0f0000] text-red-600 border-2 border-red-600 rounded-lg py-4 px-6 focus:outline-none focus:ring-4 focus:ring-red-600 placeholder-red-900 text-2xl font-['Audiowide'] tracking-wider"/>
                </div>

                <button type="submit"
                class="w-full relative
                       bg-[#1a0000] border-2 border-red-600
                       rounded-none
                       font-['Audiowide'] font-bold uppercase
                       text-xl sm:text-2xl text-red-400 tracking-widest
                       py-4 px-6
                       transition-all duration-200
                       hover:bg-red-900/30 hover:border-red-400 hover:text-red-200
                       active:scale-[0.98] active:bg-red-800/40">
          <span class="flex items-center justify-center">
            <i class="fas fa-skull-crossbones mr-2"></i>
            ENTER THE MORTAL GATE
          </span>
        </button>
              </form>
            </div>
          </div>
        `;
        morph.style.transform = "scale(1)";

        

        /* events */
        portal.querySelector("#portalBackBtn").onclick = () => {
          portal.remove();
          style.remove();
        };

        portal.querySelector("#dragonLoginForm").addEventListener("submit", async (e) => {
          e.preventDefault();
          const email = document.getElementById("dragonEmail").value.trim();
          const pass = document.getElementById("dragonPassword").value.trim();

          try {
            await signInWithEmailAndPassword(auth, email, pass);
            portal.remove();
            style.remove();
            triggerHackerGranted();
            loginAttemptsRef.current = 0;
            setLockoutTime(null);
          } catch {
            const newAttempts = loginAttemptsRef.current + 1;
            loginAttemptsRef.current = newAttempts;

            if (newAttempts >= 3) {
              const lockoutEndTime = Date.now() + 30000;
              setLockoutTime(lockoutEndTime);
              localStorage.setItem('lockoutTime', lockoutEndTime.toString());
            }
            await triggerAccessDenied(newAttempts);
          }
        });
      }, 700);
    }, 1200);
  };

  /* ---------- CRUD ---------- */
  const buildPayload = () => {
    const base = {
      type: formType,
      department:
        formType === "department"
          ? departmentForm.department === "Others"
            ? departmentForm.customDepartment || "Others"
            : departmentForm.department
          : formType === "general"
            ? "All Departments"
            : formType === "guest"
              ? guestForm.department
              : eventForm.department,
      date: new Date().toISOString().split("T")[0],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      addedBy: displayName,
    };
    let snapshot = {};
    if (formType === "department") snapshot = { type: "department", ...departmentForm };
    else if (formType === "general") snapshot = { type: "general", message: generalMessage };
    else if (formType === "guest") snapshot = { type: "guest", ...guestForm };
    else snapshot = { type: "event", ...eventForm };
    return {
      ...base,
      ...snapshot,
      history: [{ changedAt: new Date().toISOString(), changedBy: displayName, snapshot }],
    };
  };

  const handleAddUpdate = async () => {
    await addDoc(collection(db, "updates"), buildPayload());
    resetForms();
  };

  const handleEditUpdate = (u) => {
    setEditingUpdate(u);
    setFormType(u.type);
    if (u.type === "general") setGeneralMessage(u.message);
    else if (u.type === "guest") setGuestForm(u);
    else if (u.type === "event") setEventForm(u);
    else if (u.type === "department") setDepartmentForm(u);
    setShowAdminForm(true);
  };

  const handleSaveEdit = async () => {
    const ref = doc(db, "updates", editingUpdate.id);
    let snapshot = {};
    if (formType === "department") snapshot = { type: "department", ...departmentForm };
    else if (formType === "general") snapshot = { type: "general", message: generalMessage };
    else if (formType === "guest") snapshot = { type: "guest", ...guestForm };
    else snapshot = { type: "event", ...eventForm };
    const newEntry = {
      changedAt: new Date().toISOString(),
      changedBy: displayName,
      snapshot,
    };
    await updateDoc(ref, {
      ...snapshot,
      updatedAt: serverTimestamp(),
      history: [newEntry, ...(editingUpdate.history || [])],
    });
    resetForms();
  };

  const handleDeleteUpdate = async (id) => {
    if (confirm("Delete this update?")) await deleteDoc(doc(db, "updates", id));
  };

  const resetForms = () => {
    setGeneralMessage("");
    setGuestForm({
      eventName: "",
      guestName: "",
      department: "Technicals",
      status: "Started Approach",
      message: "",
    });
    setEventForm({ eventName: "", department: "Technicals", message: "" });
    setDepartmentForm({ department: "Technicals", message: "" });
    setEditingUpdate(null);
    setShowAdminForm(false);
  };

  /* ---------- RENDER ---------- */
  const filteredUpdates = updates.filter((u) => {
    const keyword = searchTerm.toLowerCase();
    return (
      (selectedDepartment === "All" || u.department === selectedDepartment) &&
      (keyword === "" ||
        u.eventName?.toLowerCase().includes(keyword) ||
        u.guestName?.toLowerCase().includes(keyword) ||
        u.message?.toLowerCase().includes(keyword) ||
        u.department?.toLowerCase().includes(keyword))
    );
  });

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white font-audiowide flex flex-col">
      {/* NAV */}
      <nav className="bg-[#0f0f1a] border-b-2 border-[#00ffc3] py-4 px-6 sticky top-0 z-40">
        <div className="container mx-auto flex items-center justify-between">
          <a href="/" className="text-[#00ffc3] text-2xl flex items-center">
            <i className="fas fa-robot mr-2" /> Outreach & Hospitality
          </a>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="/" className="text-[#00ffc3] hover:text-[#00ffc3]/80">
              Home
            </a>
            <a href="/about" className="text-[#00ffc3] hover:text-[#00ffc3]/80">
              About
            </a>
          </div>
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden text-[#00ffc3] text-xl"
          >
            <i className={`fas ${mobileMenu ? "fa-times" : "fa-bars"}`} />
          </button>
        </div>
        {mobileMenu && (
          <div className="md:hidden bg-[#1a1b26] border-t border-[#00ffc3]/20">
            <div className="flex flex-col items-center gap-4 py-4 text-sm">
              <a
                href="/"
                onClick={() => setMobileMenu(false)}
                className="text-[#00ffc3]"
              >
                Home
              </a>
              <a
                href="/about"
                onClick={() => setMobileMenu(false)}
                className="text-[#00ffc3]"
              >
                About
              </a>
            </div>
          </div>
        )}

        {/* logged-in badge */}
        {isLoggedIn && (
          <span className="absolute top-20 right-4 bg-[#1a1b26]/70 border border-[#00ffc3] text-[#00ffc3] text-xs font-mono px-3 py-1 rounded-md shadow-[0_0_8px_#00ffc3]">
            Logged in as {displayName}
          </span>
        )}

        {/* LOGIN BUTTON */}
        {!isLoggedIn && (
          <button
            onClick={openDragonLogin}
            className="fixed bottom-6 right-6 bg-[#1a1b26] border-2 border-red-600 text-red-600 w-12 h-12 rounded-full flex items-center justify-center hover:shadow-[0_0_20px_#ff0000] transition-all duration-300 transform hover:scale-110"
            title="Login"
          >
            <i className="fas fa-dragon" />
          </button>
        )}
      </nav>

      <main className="container mx-auto px-6 py-10 flex-grow">
        {isLoggedIn ? (
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-bold text-[#00ffc3]">
              welcome {" "}
              <span className="text-red-500 capitalize">{displayName}</span>
            </h1>
            <p className="text-lg font-semibold text-[#00ffc3] mt-4 drop-shadow-[0_0_4px_#00ffc3]">
              Update Requests Here
            </p>
          </div>
        ) : (
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-bold text-[#00ffc3]">
              Track Your Requests
            </h1>
          </div>
        )}

        {/* SEARCH + DEPARTMENT FILTER */}
        <div className="max-w-xl mx-auto mb-10 space-y-4">
          <input
            type="text"
            placeholder="Search updates (keyword)…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full appearance-none bg-[#1a1b26]/60 border border-[#00ffc3]/60 rounded-lg px-4 py-3 text-[#00ffc3] focus:outline-none focus:ring-2 focus:ring-[#00ffc3] placeholder-[#00ffc3]/50"
          />
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full appearance-none bg-[#1a1b26]/60 border border-[#00ffc3]/60 rounded-lg px-4 py-3 pr-10 text-[#00ffc3] focus:outline-none focus:ring-2 focus:ring-[#00ffc3]"
          >
            <option>All</option>
            <option>Technicals</option>
            <option>Culturals</option>
            <option>Sports</option>
            <option>Sponsors</option>
            <option>Others</option>
          </select>
        </div>

        {isLoggedIn && (
          <section className="flex flex-col items-center gap-6 mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              {["General", "Guest", "Event", "Department"].map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    setFormType(l.toLowerCase());
                    setShowAdminForm(true);
                  }}
                  className="border-2 border-[#00ffc3] text-[#00ffc3] px-6 py-3 rounded-lg hover:bg-[#00ffc3] hover:text-[#0f0f1a] transition"
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Admin Controls */}
            <button
              onClick={() => {
                if (isSuperAdmin) {
                  setAdminControlModal(true);
                } else {
                  alert("You do not have permission to view this.");
                }
              }}
              className={`px-6 py-3 rounded-lg transition ${isSuperAdmin
                ? "bg-red-700 text-white hover:bg-red-600"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              title={isSuperAdmin ? "Open full change log" : "Super-admin only"}
            >
              Admin Controls
            </button>

            {/* ADD / EDIT FORM */}
            {showAdminForm && (
              <div className="w-full max-w-lg bg-[#1a1b26] border border-[#00ffc3] rounded-lg p-6">
                <h2 className="text-xl mb-4">{editingUpdate ? "Edit" : "Add"} Update</h2>
                {formType === "general" && (
                  <textarea
                    value={generalMessage}
                    onChange={(e) => setGeneralMessage(e.target.value)}
                    placeholder="Message..."
                    className="w-full bg-[#0f0f1a] border border-[#00ffc3] rounded p-2 mb-4"
                  />
                )}
                {formType === "guest" && (
                  <>
                    <input
                      value={guestForm.eventName}
                      onChange={(e) => setGuestForm({ ...guestForm, eventName: e.target.value })}
                      placeholder="Event"
                      className="w-full bg-[#0f0f1a] border border-[#00ffc3] rounded p-2 mb-2"
                    />
                    <input
                      value={guestForm.guestName}
                      onChange={(e) => setGuestForm({ ...guestForm, guestName: e.target.value })}
                      placeholder="Guest"
                      className="w-full bg-[#0f0f1a] border border-[#00ffc3] rounded p-2 mb-2"
                    />
                    <select
                      value={guestForm.department}
                      onChange={(e) => setGuestForm({ ...guestForm, department: e.target.value })}
                      className="w-full bg-[#0f0f1a] border border-[#00ffc3] rounded p-2 mb-2"
                    >
                      <option>Technicals</option>
                      <option>Culturals</option>
                      <option>Sports</option>
                      <option>Sponsors</option>
                      <option>Others</option>
                    </select>
                    <select
                      value={guestForm.status}
                      onChange={(e) => setGuestForm({ ...guestForm, status: e.target.value })}
                      className="w-full bg-[#0f0f1a] border border-[#00ffc3] rounded p-2 mb-2"
                    >
                      <option>Started Approach</option>
                      <option>Initial Contact Done</option>
                      <option>In Talks</option>
                      <option>Denied</option>
                      <option>Confirmed</option>
                    </select>
                    <textarea
                      value={guestForm.message}
                      onChange={(e) => setGuestForm({ ...guestForm, message: e.target.value })}
                      placeholder="Message..."
                      className="w-full bg-[#0f0f1a] border border-[#00ffc3] rounded p-2 mb-4"
                    />
                  </>
                )}
                {formType === "event" && (
                  <>
                    <input
                      value={eventForm.eventName}
                      onChange={(e) => setEventForm({ ...eventForm, eventName: e.target.value })}
                      placeholder="Event"
                      className="w-full bg-[#0f0f1a] border border-[#00ffc3] rounded p-2 mb-2"
                    />
                    <select
                      value={eventForm.department}
                      onChange={(e) => setEventForm({ ...eventForm, department: e.target.value })}
                      className="w-full bg-[#0f0f1a] border border-[#00ffc3] rounded p-2 mb-4"
                    >
                      <option>Technicals</option>
                      <option>Culturals</option>
                      <option>Sports</option>
                      <option>Sponsors</option>
                      <option>Others</option>
                    </select>
                    <textarea
                      value={eventForm.message}
                      onChange={(e) => setEventForm({ ...eventForm, message: e.target.value })}
                      placeholder="Message..."
                      className="w-full bg-[#0f0f1a] border border-[#00ffc3] rounded p-2 mb-4"
                    />
                  </>
                )}
                {formType === "department" && (
                  <>
                    <select
                      value={departmentForm.department}
                      onChange={(e) => setDepartmentForm({ ...departmentForm, department: e.target.value })}
                      className="w-full bg-[#0f0f1a] border border-[#00ffc3] rounded p-2 mb-4"
                    >
                      <option>Technicals</option>
                      <option>Culturals</option>
                      <option>Sports</option>
                      <option>Sponsors</option>
                      <option value="Others">Others (type below)</option>
                    </select>
                    {departmentForm.department === "Others" && (
                      <input
                        value={departmentForm.customDepartment || ""}
                        onChange={(e) =>
                          setDepartmentForm({ ...departmentForm, customDepartment: e.target.value })
                        }
                        placeholder="Enter department"
                        className="w-full bg-[#0f0f1a] border border-[#00ffc3] rounded p-2 mb-4"
                      />
                    )}
                    <textarea
                      value={departmentForm.message}
                      onChange={(e) => setDepartmentForm({ ...departmentForm, message: e.target.value })}
                      placeholder="Message..."
                      className="w-full bg-[#0f0f1a] border border-[#00ffc3] rounded p-2 mb-4"
                    />
                  </>
                )}
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowAdminForm(false)}
                    className="border border-[#00ffc3] text-[#00ffc3] px-4 py-1 rounded hover:bg-[#00ffc3] hover:text-[#0f0f1a]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingUpdate ? handleSaveEdit : handleAddUpdate}
                    className="bg-[#00ffc3] text-[#0f0f1a] px-4 py-1 rounded"
                  >
                    {editingUpdate ? "Save" : "Add"}
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* CARDS */}
        {/* -------- FAST GLOW CARDS + TIMESTAMP -------- */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredUpdates.map((u) => (
            <article
              key={u.id}
              className="relative bg-[#1a1b26]/40 border border-[#00ffc3]/20 rounded-2xl p-5 pb-12
                         transition-shadow duration-300
                         hover:shadow-[0_0_12px_#00ffc3]"
            >
              {/* Department badge */}
              <div className="mb-3 flex justify-end">
                <span className="text-xs font-mono uppercase tracking-wider bg-[#00ffc3]/10 text-[#00ffc3] px-3 py-1 rounded-full">
                  {u.department}
                </span>
              </div>

              {/* Title */}
              <h3 className="card-title text-xl mb-2 leading-tight">
                {u.eventName || "Department Update"}
              </h3>

              {/* Guest / Status */}
              {u.type === "guest" && (
                <p className="card-subtitle text-sm mb-3">
                  Guest: {u.guestName} – <span className="text-[#00ffc3]">{u.status}</span>
                </p>
              )}

              {/* Message */}
              <p className="card-body text-sm mb-4">
                {u.message}
              </p>

              {/* FIXED bottom bar (always visible) */}
              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs">
                {/* Timestamp */}
                <time className="font-mono text-gray-400">
                  Last updated on{" "}
                  {new Date(
                    u.updatedAt?.toDate ? u.updatedAt.toDate() : u.updatedAt
                  ).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </time>

                {/* Icons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setHistoryModal(u.history || [])}
                    className="text-[#00ffc3] hover:text-white transition"
                    title="History"
                  >
                    <i className="fas fa-history" />
                  </button>

                  <a
                    href={`mailto:publicrelations@iitmparadox.org?subject=${encodeURIComponent(
                      u.eventName || "Update"
                    )}`}
                    className="text-[#00ffc3] hover:text-white transition"
                    title="Mail"
                  >
                    <i className="fas fa-envelope" />
                  </a>

                  {isLoggedIn && (
                    <>
                      <button
                        onClick={() => handleEditUpdate(u)}
                        className="text-[#00ffc3] hover:text-white transition"
                        title="Edit"
                      >
                        <i className="fas fa-edit" />
                      </button>

                      <button
                        onClick={() => {
                          if (isSuperAdmin) {
                            if (confirm("Delete this update?"))
                              handleDeleteUpdate(u.id);
                          } else {
                            alert("You do not have permission to delete.");
                          }
                        }}
                        className={`transition ${isSuperAdmin
                          ? "text-red-500 hover:text-red-400"
                          : "text-gray-500 cursor-not-allowed"
                          }`}
                        title="Delete"
                      >
                        <i className="fas fa-trash" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* HISTORY MODAL */}
      {historyModal.length > 0 && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
    {/* Darkened overlay */}
    <div className="absolute inset-0 bg-black/80 backdrop-blur-lg">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,195,0.1)_0%,transparent_70%)] opacity-30"></div>
    </div>
    
    {/* Main container */}
    <div className="relative bg-gradient-to-br from-[#0f0f1a] to-[#0a1a1f] border-2 border-[#00ffc3]/50 rounded-xl w-full max-w-4xl max-h-[90vh] min-h-[300px] overflow-hidden shadow-[0_0_40px_#00ffc3/30]">
      {/* Glowing top bar */}
      <div className="bg-[#00ffc3]/10 border-b border-[#00ffc3]/30 p-4 flex justify-between items-center">
        <h2 className="font-orbitron text-2xl text-[#00ffc3] tracking-widest flex items-center gap-2">
          <i className="fas fa-history text-[#00ffc3]"></i>
          UPDATE CHRONOLOGY
        </h2>
        <button 
          onClick={() => setHistoryModal([])} 
          className="text-[#ff5555] hover:text-[#ff0000] text-2xl transition-all duration-300"
        >
          <i className="fas fa-times-circle"></i>
        </button>
      </div>
      
      {/* Timeline content */}
      <div className="overflow-y-auto h-full p-6 custom-scrollbar" style={{ maxHeight: 'calc(90vh - 72px)' }}>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#00ffc3]/30"></div>
          
          {historyModal.map((h, idx) => {
            const data = h.snapshot || h.old || {};
            const isCurrent = idx === 0; // First item is now current
            
            return (
              <div key={idx} className="relative pl-12 pb-8 group">
                {/* Enhanced timeline dot */}
                <div className="absolute left-0 flex flex-col items-center" style={{ height: 'calc(100% - 28px)' }}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isCurrent ? "bg-[#00ffc3] ring-4 ring-[#00ffc3]/30 animate-pulse" : "bg-[#00ffc3]/70"} z-10`}>
                    {!isCurrent && <div className="w-2 h-2 bg-[#0a1a1f] rounded-full"></div>}
                  </div>
                  {idx !== historyModal.length - 1 && (
                    <div className="flex-1 w-0.5 bg-[#00ffc3]/50 mt-1"></div>
                  )}
                </div>
                
                {/* Header */}
                <div className={`flex flex-wrap items-center gap-3 mb-2 ${isCurrent ? "text-[#00ffc3]" : "text-[#00ffc3]/80"}`}>
                  <span className="font-orbitron text-lg tracking-wider">
                    {new Date(h.changedAt?.toDate ? h.changedAt.toDate() : h.changedAt).toLocaleString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <span className="font-audiowide bg-[#00ffc3]/10 px-3 py-1 rounded-full text-sm">
                    {h.changedBy}
                  </span>
                  {isCurrent && (
                    <span className="font-horror bg-[#00ffc3]/20 px-3 py-1 rounded-full text-[#00ffc3] text-sm">
                      CURRENT VERSION
                    </span>
                  )}
                </div>
                
                {/* Content - FULLY INTACT MESSAGE DISPLAY */}
                <div className="bg-[#0a1215]/80 border border-[#00ffc3]/20 rounded-lg p-5 backdrop-blur-sm">
                  {data.type === "general" && (
                    <div>
                      <h3 className="font-audiowide text-[#00ffc3]/80 mb-2">GENERAL UPDATE</h3>
                      <p className="text-[#a9adc1] font-sans text-lg">{data.message}</p>
                    </div>
                  )}
                  
                  {data.type === "guest" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-audiowide text-[#00ffc3]/80 mb-2">GUEST DETAILS</h3>
                        <div className="space-y-2">
                          <p className="text-[#a9adc1]"><span className="text-[#00ffc3]/70">Event:</span> {data.eventName}</p>
                          <p className="text-[#a9adc1]"><span className="text-[#00ffc3]/70">Guest:</span> {data.guestName}</p>
                          <p className="text-[#a9adc1]"><span className="text-[#00ffc3]/70">Status:</span> {data.status}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-audiowide text-[#00ffc3]/80 mb-2">MESSAGE</h3>
                        <p className="text-[#a9adc1] font-sans">{data.message}</p>
                      </div>
                    </div>
                  )}
                  
                  {data.type === "event" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-audiowide text-[#00ffc3]/80 mb-2">EVENT DETAILS</h3>
                        <div className="space-y-2">
                          <p className="text-[#a9adc1]"><span className="text-[#00ffc3]/70">Name:</span> {data.eventName}</p>
                          <p className="text-[#a9adc1]"><span className="text-[#00ffc3]/70">Department:</span> {data.department}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-audiowide text-[#00ffc3]/80 mb-2">MESSAGE</h3>
                        <p className="text-[#a9adc1] font-sans">{data.message}</p>
                      </div>
                    </div>
                  )}
                  
                  {data.type === "department" && (
                    <div>
                      <h3 className="font-audiowide text-[#00ffc3]/80 mb-2">DEPARTMENT UPDATE</h3>
                      <div className="space-y-3">
                        <p className="text-[#a9adc1]">
                          <span className="text-[#00ffc3]/70">Department:</span>{" "}
                          {data.department === "Others" ? data.customDepartment || "Others" : data.department}
                        </p>
                        <div>
                          <h4 className="font-audiowide text-[#00ffc3]/80 mb-1">MESSAGE</h4>
                          <p className="text-[#a9adc1] font-sans">{data.message}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
)}

      {/* LOGOUT BUTTON */}
      {isLoggedIn && (
        <button
          onClick={async () => {
            const overlay = document.createElement("div");
            overlay.className = "logout-overlay";
            overlay.innerHTML = `
        <div class="logout-bg"></div>
        <div class="relative text-center">
          <i class="fas fa-skull logout-skull"></i>
          <h2 class="logout-glitch">SYSTEM</h2>
          <h2 class="logout-glitch">SHUTDOWN</h2>
          <p class="logout-type">RETURNING TO MORTAL REALM...</p>
        </div>`;
            document.body.appendChild(overlay);
            await new Promise((r) => setTimeout(r, 3000));
            await signOut(auth);
            overlay.remove();
          }}
          className="fixed bottom-6 right-6 bg-[#1a1b26] border-2 border-red-600 text-red-600 px-3 py-2 rounded-lg flex items-center gap-2 hover:shadow-[0_0_20px_#ff0000] transition"
          title="Logout"
        >
          <i className="fas fa-skull" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      )}


      {/* // FOOTER  */}
      <footer className="bg-[#0f0f1a] border-t-2 border-[#00ffc3] py-16 font-audiowide">
        <div className="container mx-auto px-6">
          {/* Developer Info Section */}
          <div className="text-center">
            <div className="mb-8">
              <i className="fas fa-code text-[#00ffc3] text-4xl mb-4" />
              <h3 className="text-[#00ffc3] text-xl mb-2">Developed By</h3>
              <p className="text-[#a9adc1] text-sm font-['Audiowide']">
                Aman Chandra
              </p>
            </div>

            <div className="flex justify-center items-center space-x-6">
              <a
                href="mailto:amanchandrah895@gmail.com"
                className="text-[#00ffc3] hover:text-[#00d4a3] transition-colors social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-envelope text-2xl" />
              </a>
              <a
                href="https://instagram.com/amanchandrah"
                className="text-[#00ffc3] hover:text-[#00d4a3] transition-colors social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram text-2xl" />
              </a>
              <a
                href="https://www.linkedin.com/in/aman-chandra-h/"
                className="text-[#00ffc3] hover:text-[#00d4a3] transition-colors social-icon"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin text-2xl" />
              </a>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-[#a9adc1] text-sm font-['Audiowide']">
              © 2025 Outreach and Hospitality IITM Paradox. All rights reserved.
            </p>
          </div>
        </div>

        <style jsx>{`
    .social-icon {
      transition: all 0.3s ease;
    }
    .social-icon:hover {
      transform: translateY(-3px);
      filter: drop-shadow(0 0 10px #00ffc3);
    }
  `}</style>
      </footer>
    </div>
  );
}