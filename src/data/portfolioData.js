import snitchImg from '../assets/snitch.png';
import honestImg from '../assets/Honesthome.png';
import thorneImg from '../assets/Thorne.png';
import lenskartImg from '../assets/Lenskart.png';
import jetblueImg from '../assets/Jetblue.png';
import campusImg from '../assets/campus.png';

export const PERSONAL = {
  name: 'Vishv Patel',
  role: 'Full-Stack Developer',
  email: 'vishv90ptl@gmail.com',
  available: true,
  bio1: "I'm a passionate Full-Stack Developer from India with hands-on experience building modern web applications from the ground up. I thrive at the intersection of clean code and intuitive design.",
  bio2: "With deep expertise in both front-end polish and back-end architecture, I bring ideas to life using React, Node.js, and modern cloud tooling — always with a relentless focus on performance and user experience.",
  socials: {
    github:   'https://github.com/vishvpatel210',
    linkedin: 'https://www.linkedin.com/in/vishv-patel-976712394/',
    leetcode: 'https://leetcode.com/u/vishvpatel0210/',
    twitter:  'https://x.com/Vishv_Patel0210',
    youtube:  'https://www.youtube.com/@VishvPatel-k2x',
  },
};

export const EMAILJS = {
  serviceID:  'service_73hecqd',
  templateID: 'template_3tffvck',
  publicKey:  'ZLDicazH-JaUECDZF',
};

export const SKILLS = [
  {
    category: 'Frontend', icon: '⚡', color: '#64ffda',
    items: [
      { name: 'React',        pct: 90 },
      { name: 'JavaScript',   pct: 92 },
      { name: 'Next.js',      pct: 80 },
      { name: 'HTML5',        pct: 95 },
      { name: 'CSS3',         pct: 92 },
      { name: 'Tailwind CSS', pct: 88 },
    ],
  },
  {
    category: 'Backend', icon: '🛠', color: '#00f5ff',
    items: [
      { name: 'Node.js',    pct: 85 },
      { name: 'Express',    pct: 83 },
      { name: 'MongoDB',    pct: 80 },
      { name: 'PostgreSQL', pct: 75 },
      { name: 'REST APIs',  pct: 88 },
    ],
  },
  {
    category: 'Tools & DevOps', icon: '🚀', color: '#ccd6f6',
    items: [
      { name: 'Git & GitHub', pct: 87 },
      { name: 'Figma',        pct: 80 },
      { name: 'Docker',       pct: 60 },
      { name: 'Vite',         pct: 85 },
    ],
  },
];

export const PROJECTS = [
  { id:1, name:'Snitch — FrontEnd Clone',     featured:true,
    desc:'A pixel-perfect frontend clone replicating the core UI with responsive layouts and smooth interactions.',
    gradient:'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)',
    image: snitchImg,
    tags:['HTML','CSS','Responsive'],
    links:{ demo:'https://bespoke-blancmange-5a58b8.netlify.app/snitch/snitch', github:'https://github.com/vishvpatel210/Diwali-assignment/tree/main/snitch', yt:'https://www.youtube.com/watch?v=2nEUhG8XD5w&t=2s' } },
  { id:2, name:'HonestHome — FrontEnd Clone', featured:true,
    desc:'Responsive real-estate platform clone featuring property listings, filters, and a clean modern UI.',
    gradient:'linear-gradient(135deg,#8b5cf6,#ec4899,#f97316)',
    image: honestImg,
    tags:['HTML','CSS','UI/UX'],
    links:{ demo:'https://bespoke-blancmange-5a58b8.netlify.app/honesthome/honest', github:'https://github.com/vishvpatel210/Diwali-assignment/tree/main/honesthome', yt:'https://www.youtube.com/watch?v=pcn0vFIhCtQ' } },
  { id:3, name:'Thorne — FrontEnd Clone',     featured:false,
    desc:'Health & wellness e-commerce frontend clone with product pages and immersive visual design.',
    gradient:'linear-gradient(135deg,#f59e0b,#ea580c,#dc2626)',
    image: thorneImg,
    tags:['HTML','CSS','E-Commerce'],
    links:{ demo:'https://bespoke-blancmange-5a58b8.netlify.app/thorne/thorne', github:'https://github.com/vishvpatel210/Diwali-assignment/tree/main/thorne', yt:'https://www.youtube.com/watch?v=nfHW3f2uX0A' } },
  { id:4, name:'Lenskart — FrontEnd Clone',   featured:false,
    desc:"Feature-rich clone of India's leading eyewear brand with product showcase and responsive design.",
    gradient:'linear-gradient(135deg,#3b82f6,#06b6d4,#0ea5e9)',
    image: lenskartImg,
    tags:['HTML','CSS','Responsive'],
    links:{ demo:'https://bespoke-blancmange-5a58b8.netlify.app/lenskart/lenskart', github:'https://github.com/vishvpatel210/Diwali-assignment/tree/main/lenskart', yt:'https://www.youtube.com/watch?v=xDOeYFnTD90&t=55s' } },
  { id:5, name:'JetBlue — FrontEnd Clone',    featured:false,
    desc:'Complete airline website frontend with flight booking UI, destinations and polished travel interface.',
    gradient:'linear-gradient(135deg,#0ea5e9,#4f46e5,#7c3aed)',
    image: jetblueImg,
    tags:['HTML','CSS','Travel'],
    links:{ demo:'https://bespoke-blancmange-5a58b8.netlify.app/jet%20blue/jetblue.html', github:'https://github.com/vishvpatel210/Diwali-assignment/tree/main/jet%20blue', yt:'https://www.youtube.com/watch?v=8O8jn-qCytg' } },
  { id:6, name:'Campus — Website',            featured:false,
    desc:'University website with modern layout, course listings, events section and full responsive design.',
    gradient:'linear-gradient(135deg,#10b981,#0d9488,#0891b2)',
    image: campusImg,
    tags:['HTML','CSS','Education'],
    links:{ demo:'https://bespoke-blancmange-5a58b8.netlify.app/campus/campus', github:'https://github.com/vishvpatel210/Diwali-assignment/tree/main/campus', yt:'https://www.youtube.com/watch?v=IUIFLRPD1k4' } },
];

export const CERTS = [
  { id:1, title:'Full-Stack Web Development',              issuer:'Masai School',       year:'2024', color:'#64ffda', icon:'🎓' },
  { id:2, title:'React — The Complete Guide',              issuer:'Udemy',              year:'2024', color:'#00f5ff', icon:'⚛️' },
  { id:3, title:'JavaScript Algorithms & Data Structures', issuer:'freeCodeCamp',       year:'2023', color:'#f7df1e', icon:'📜' },
];

export const STATS = [
  { val:10, sfx:'+', label:'Projects Built',  icon:'🚀' },
  { val:10, sfx:'+', label:'Technologies',    icon:'⚡' },
  { val:3,  sfx:'',  label:'Certificates',    icon:'🏆' },
];

export const TIMELINE = [
  { year:'2024 — Present', title:'Full-Stack Developer',       org:'Freelance & Projects', type:'work',
    desc:'Building full-stack web applications with React, Node.js, and modern cloud services. Pixel-perfect UIs and robust backend APIs.',
    tags:['React','Node.js','MongoDB','AWS'] },
  { year:'2023 — 2024',   title:'Full-Stack Web Development',  org:'Masai School',         type:'edu',
    desc:'Intensive bootcamp covering JavaScript, React, Node.js, databases, and software engineering fundamentals. Built 15+ projects.',
    tags:['JavaScript','React','Node.js','SQL'] },
  { year:'2022 — 2023',   title:'Self-Taught Developer',       org:'Online Platforms',     type:'edu',
    desc:'Started coding journey through freeCodeCamp, Udemy, and YouTube. Built first HTML/CSS projects.',
    tags:['HTML','CSS','JavaScript'] },
  { year:'2021 — 2022',   title:'B.Sc. / Higher Education',    org:'University',           type:'edu',
    desc:'Pursued higher education while discovering a deep passion for technology and problem-solving.',
    tags:['Mathematics','Logic','Problem Solving'] },
];

export const CHATBOT_KB = {
  greetings: "Hey! 👋 I'm Vishv's AI assistant. Ask me anything about him!",
  about:     "Vishv Patel is a passionate Full-Stack Developer from India specializing in React, Node.js, and modern web tech. Currently available for opportunities! 🚀",
  skills:    "Top skills:\n⚛️ React (90%) & JavaScript (92%)\n🔷 Next.js (80%)\n🟢 Node.js (85%) & Express\n🍃 MongoDB & PostgreSQL\n🌊 Tailwind CSS (88%)",
  projects:  "Featured projects:\n🔹 Snitch — FrontEnd Clone\n🔹 HonestHome — Real Estate UI\n🔹 Thorne — E-Commerce Clone\n🔹 Lenskart, JetBlue, Campus\n\nAll have live demos + GitHub links!",
  certs:     "3 Certificates:\n🎓 Full-Stack — Masai School\n⚛️ React Guide — Udemy\n📜 JS Algorithms — freeCodeCamp",
  contact:   "Reach Vishv:\n📧 vishv90ptl@gmail.com\n💼 linkedin.com/in/vishv-patel-976712394\n🐙 github.com/vishvpatel210\n💻 leetcode.com/u/vishvpatel0210",
  available: "✅ Yes! Vishv is open to freelance projects, collaborations & full-time roles. Use the contact form or email directly!",
};
