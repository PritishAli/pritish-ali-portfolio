// ─────────────────────────────────────────────────────────────
//  EDIT THIS FILE TO UPDATE YOUR PORTFOLIO
//  Everything on the site (text, projects, papers, jobs, links)
//  comes from here. Change a value, save, and redeploy.
//  Keep the quotes and commas as they are.
// ─────────────────────────────────────────────────────────────

export const profile = {
  firstName: "Pritish",
  lastName: "Ali",
  title: "AI & Full-Stack Developer",
  // The green pill at the top. Set available: false to hide it.
  available: true,
  availability: "Available for freelance and contract projects",
  headline: "I turn AI research into products people use.",
  intro:
    "LLM assistants, computer vision systems and full-stack web apps, built end to end by a published ML engineer.",
  meta: ["M.Tech AI & ML, NITTTR Kolkata", "SME at Chegg India", "Kolkata, working worldwide"],
  email: "alipritish777@gmail.com",
  phone: "+91 81161 36275",
  phoneHref: "tel:+918116136275",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/pritishali/" },
    { label: "GitHub", href: "https://github.com/PritishAli" },
    { label: "ResearchGate", href: "https://www.researchgate.net/profile/Pritish-Ali" },
  ],
  // Optional: put your CV file in this folder and set its name here, e.g. "PritishAli_CV.pdf".
  // Leave as "" to hide the "Download CV" button.
  cvFile: "",
};

// The live console in the hero. Each tab plays a short demo of that kind of build.
// `formType` must match one of inquiry.projectTypes below: the button pre-fills the form.
export const consoleTabs = [
  { key: "llm", label: "LLM assistant", caption: "Answers from your own documents, with sources.", formType: "LLM or chatbot app" },
  { key: "vision", label: "Vision system", caption: "Real-time detection and plate OCR, like my traffic project.", formType: "Computer vision system" },
  { key: "web", label: "Web platform", caption: "Dashboards and portals on React, Node and MongoDB.", formType: "Full-stack web app" },
  { key: "data", label: "Forecast model", caption: "Prediction models with confidence you can read.", formType: "Data analysis or ML model" },
];

export const pitch =
  "You bring the problem. I bring research-grade machine learning and the engineering to ship it as a product people can actually use.";

// Numbers count up when they scroll into view. `value` must be a number.
export const stats = [
  { value: 5, suffix: "", label: "research papers, 3 published and 2 under review" },
  { value: 95, suffix: "%+", label: "accuracy on real-time traffic violation detection" },
  { value: 4, suffix: "", label: "internships and industry roles across ML and web" },
];

export const services = [
  {
    title: "LLM and NLP apps",
    body: "Chatbots and assistants that answer from your own documents, text classification, summarisation, and multilingual support for Indian languages.",
    goodFor: "support desks, internal knowledge bases, edtech",
  },
  {
    title: "Computer vision systems",
    body: "Object detection, OCR, number-plate reading and video analytics that run in real time, built on YOLO, OpenCV and Vision Transformers.",
    goodFor: "traffic, retail, inspection, document scanning",
  },
  {
    title: "Full-stack web apps",
    body: "Dashboards, portals and SaaS products with React or Next.js on the front and Node, Express or Django behind, on MongoDB or MySQL.",
    goodFor: "startups, admin tools, MVPs",
  },
  {
    title: "Data and ML models",
    body: "Prediction models, statistical analysis and interactive dashboards that turn raw data into decisions, plus analysis support for research papers.",
    goodFor: "finance, research labs, operations",
  },
];

// Click a project on the site to expand it. Add `link` to show a "View project" button.
export const projects = [
  {
    name: "DeepBloom",
    tagline: "Classifying exam questions by how hard they make you think",
    summary:
      "A transformer model that sorts examination questions into Bloom's Taxonomy cognitive levels, from recall up to creation.",
    points: [
      "Contextual embeddings and sequence classification capture the semantics of question text",
      "Makes cognitive-level assessment of question papers automatic",
    ],
    tags: ["NLP", "Transformers", "EdTech"],
    result: "",
    link: "",
  },
  {
    name: "Bias in multilingual LLMs",
    tagline: "Context-aware fairness evaluation for Indian healthcare",
    summary:
      "A framework for detecting bias in multilingual large language models when they answer healthcare questions across Indian languages.",
    points: [
      "Fuzzy similarity metrics and quantum-inspired evaluation for fine-grained bias scores",
      "Measures linguistic, cultural and contextual fairness across languages and domains",
    ],
    tags: ["LLMs", "Fairness", "Fuzzy logic"],
    result: "",
    link: "",
  },
  {
    name: "Traffic violation detection",
    tagline: "Real-time vision pipeline, published in IJATEM",
    summary:
      "Detects vehicles, reads licence plates and flags violations from live video, then sends notifications automatically. I led the team.",
    points: [
      "YOLOv8 detection paired with EasyOCR plate recognition",
      "Tuned detection and OCR together for smart traffic management",
    ],
    tags: ["YOLOv8", "OpenCV", "EasyOCR"],
    result: "95%+ accuracy",
    link: "",
  },
  {
    name: "Fossil identification",
    tagline: "Vision Transformers for palaeobotany",
    summary:
      "Classifies fossil leaf structures from their shape and visual features, helping palaeobotanists identify specimens faster.",
    points: [
      "Vision Transformers combined with domain-specific morphological features",
      "Grew out of my statistical work on Elsevier palaeoecology papers",
    ],
    tags: ["ViT", "Computer vision", "Science"],
    result: "",
    link: "",
  },
];

export const process = [
  { title: "Tell me the problem", body: "Send the form below. I reply with questions and a first idea of the approach." },
  { title: "Agree the plan", body: "A written scope, timeline and fixed quote, so you know exactly what you're getting." },
  { title: "Build in the open", body: "Weekly demos and a shared repo. You can change direction early, not after launch." },
  { title: "Launch and hand over", body: "Deployed, documented and yours, with support after launch while you settle in." },
];

// status: "published" or "review". `doi` adds a link to the paper.
export const publications = [
  {
    title:
      "Fossil insect folivory reveals trophic interactions in a monsoon-influenced tropical rainforest of Rajasthan during the early Eocene hothouse",
    venue: "Palaeogeography, Palaeoclimatology, Palaeoecology",
    publisher: "Elsevier, March 2026",
    impact: "Impact factor 2.9",
    role: "Data analyst & statistical specialist",
    doi: "10.1016/j.palaeo.2026.113716",
    status: "published",
  },
  {
    title:
      "The oldest bona fide fossil of Swintonia Griff. (Anacardiaceae): evidence by Eocene winged fruits from India",
    venue: "Review of Palaeobotany and Palynology",
    publisher: "Elsevier, 2026",
    impact: "Impact factor 1.7",
    role: "Data analyst & statistical specialist",
    doi: "10.1016/j.revpalbo.2026.105705",
    status: "published",
  },
  {
    title: "Intelligent traffic violation detection system using deep learning",
    venue: "International Journal of Advanced Trends in Engineering and Management",
    publisher: "IJATEM, December 2024",
    impact: "",
    role: "Team lead",
    doi: "",
    doiText: "10.59544/TSCU2883/IJATEMVO3|12P3",
    status: "published",
  },
  {
    title:
      "Fossil palm stems as palaeoclimate archives: evidence for tropical seasonality during Deccan volcanism across the K/Pg of India",
    venue: "Ecological Indicators",
    publisher: "Elsevier",
    impact: "Impact factor 8.7",
    role: "Technical expert",
    doi: "",
    status: "review",
  },
  {
    title: "First aquatic alismatid fossil flowers from India",
    venue: "Alcheringa: An Australasian Journal of Palaeontology",
    publisher: "Taylor & Francis",
    impact: "Impact factor 2.6",
    role: "Technical expert",
    doi: "",
    status: "review",
  },
];

// Newest first. current: true gives the job the glowing amber dot.
export const experience = [
  {
    role: "Subject Matter Expert, AI/ML & Computer Science",
    org: "Chegg India",
    when: "2026 – present",
    where: "Remote",
    current: true,
    points: [
      "Write original AI/ML and computer science problems with step-by-step expert solutions",
      "Review expert content for technical accuracy, clarity and guideline compliance",
    ],
  },
  {
    role: "Web Development Intern",
    org: "IISPPR",
    when: "Apr – Jun 2025",
    where: "",
    points: [
      "Built full-stack MERN apps, including a field-work portal and an intern management system",
      "Designed scalable REST APIs and responsive UI components",
    ],
  },
  {
    role: "Trainee, Skill Enhancement Program",
    org: "Visvesvaraya Technological University",
    when: "Oct 2024 – Feb 2025",
    where: "",
    points: [
      "Trained in React full-stack, Android with Kotlin, Python for data science, DSA and C",
      "Scored 90%+ in every VTU-awarded certification",
    ],
  },
  {
    role: "Machine Learning Intern",
    org: "Varcons Technology",
    when: "Oct – Nov 2023",
    where: "",
    points: [
      "Built stock price prediction models with supervised learning",
      "Made interactive financial dashboards for trend analysis",
    ],
  },
];

export const skills = [
  { group: "AI and machine learning", items: ["Deep learning", "NLP", "Transformers", "LLMs", "Computer vision", "Vision Transformers", "Fuzzy logic"] },
  { group: "Vision tools", items: ["OpenCV", "YOLOv8", "EasyOCR"] },
  { group: "Languages", items: ["Python", "C", "C++", "JavaScript", "SQL", "Kotlin", "HTML", "CSS"] },
  { group: "Web", items: ["React", "Next.js", "Node.js", "Express", "Django"] },
  { group: "Data", items: ["MySQL", "MongoDB", "Big data analytics", "Statistics"] },
  { group: "Foundations", items: ["Data structures & algorithms", "Soft computing", "Networks", "Cryptography"] },
];

export const education = [
  { degree: "M.Tech, Artificial Intelligence & Machine Learning", school: "NITTTR Kolkata", score: "2025 –", note: "present" },
  { degree: "B.E., Computer Science & Engineering", school: "East Point College of Engineering & Technology, Bangalore", score: "8.39", note: "CGPA, 2021–25" },
  { degree: "Higher Secondary, WBCHSE", school: "", score: "88.2%", note: "" },
  { degree: "Secondary, WBBSE", school: "", score: "89.3%", note: "" },
];

export const honours = [
  { title: "Qualified GATE CS 2025 and CUET PG 2025", detail: "95.4 percentile in AINCAT 2025" },
  { title: "National Means-cum-Merit Scholarship", detail: "2016, plus the National Scholarship and WB Post-Matric Scholarship" },
  { title: "Student Ambassador, NEP SAARTHI", detail: "Ran outreach and mentoring sessions at NITTTR Kolkata under NEP 2020" },
  { title: "Certifications", detail: "Google Advanced Data Analytics and IBM AI Engineering (in progress), image processing, React full-stack, Kotlin, TCS iON Career Edge" },
];

// The project inquiry form. Messages go to `formEmail` through FormSubmit.co.
// The FIRST message sends you an activation email: click the link in it once.
export const inquiry = {
  formEmail: "alipritish777@gmail.com",
  projectTypes: [
    "LLM or chatbot app",
    "NLP / text classification",
    "Computer vision system",
    "Full-stack web app",
    "Data analysis or ML model",
    "Research collaboration",
    "Something else",
  ],
  budgets: [
    "Not sure yet",
    "Under ₹25,000 / $300",
    "₹25,000–75,000 / $300–900",
    "₹75,000–2,00,000 / $900–2,400",
    "Above ₹2,00,000 / $2,400",
  ],
  timelines: ["Flexible", "Within 2 weeks", "Within a month", "1–3 months", "Ongoing work"],
};
