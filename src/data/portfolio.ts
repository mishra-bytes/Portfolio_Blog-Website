export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/resume" },
] as const;

export const contactItems = [
  {
    label: "Email",
    value: "aditya_mishra@outlook.in",
    href: "mailto:aditya_mishra@outlook.in",
  },
  {
    label: "Phone",
    value: "+91-8826490096",
    href: "tel:+918826490096",
  },
  {
    label: "LinkedIn",
    value: "LinkedIn",
    href: undefined,
  },
  {
    label: "GitHub",
    value: "GitHub",
    href: undefined,
  },
] as const;

export const heroContent = {
  name: "Aditya Mishra",
  location: "New Delhi, India",
  summary:
    "B. Tech, Instrumentation & Control Engineering at Netaji Subhas University of Technology (2023-2027), focused on machine learning, computer vision, and real-time inference systems.",
} as const;

export const heroHighlights = [
  {
    title: "Languages",
    description: "Python, SQL, MATLAB, Java",
  },
  {
    title: "Machine Learning",
    description: "TensorFlow, Keras, scikit-learn, XGBoost, SHAP, OpenCV",
  },
  {
    title: "Deployment & IoT",
    description: "FastAPI, Streamlit, Raspberry Pi, MQTT",
  },
] as const;

export const profileImage = {
  src: "/imagery/aditya-headshot-placeholder.svg",
  alt: "Portrait placeholder for Aditya Mishra professional headshot",
} as const;

export const education = [
  {
    title: "B. Tech, Instrumentation & Control Engineering",
    organization: "Netaji Subhas University of Technology",
    period: "2023-2027",
    detail: "CGPA: 7.4",
  },
  {
    title: "Senior Secondary (CBSE)",
    organization: "The Mother's International School",
    period: "Graduated 2022",
    detail: undefined,
  },
] as const;

export const experience = [
  {
    title: "ML Engineer Intern",
    organization: "DUSQ (formerly InnerGize)",
    period: "Nov 2025-Present",
    bullets: [
      "Cut end-to-end inference latency by 88.9% (7.7 s to 0.86 s) and 9x throughput via parallel and async execution.",
      "Built a 27-keypoint placement API with visibility-aware training for robust side-view guidance at sub-second speeds.",
      "Optimised preprocessing to 26 ms mean latency (64% faster; P99 37 ms, -66%), then packaged low-latency pipelines for production.",
    ],
  },
  {
    title: "ML-IoT Intern",
    organization: "Indian Meteorological Department",
    period: "Jun 2025 - Jul 2025",
    bullets: [
      "Automated thermometer readings using a Raspberry Pi vision system and OpenCV pipeline.",
      "Trained models on a custom dataset of 1000+ images captured across diverse weather conditions.",
      "Implemented MQTT-based real-time transmission enabling low-latency environmental monitoring.",
    ],
  },
] as const;

export const skillGroups = [
  {
    category: "Languages",
    items: ["Python", "SQL", "MATLAB", "Java"],
  },
  {
    category: "Machine Learning",
    items: [
      "TensorFlow",
      "Keras",
      "scikit-learn",
      "XGBoost",
      "SHAP",
      "OpenCV",
    ],
  },
  {
    category: "CV & Deployment",
    items: [
      "FastAPI",
      "Streamlit",
      "Time-Series Forecasting",
      "Computer Vision",
    ],
  },
  {
    category: "Hardware & IoT",
    items: ["Raspberry Pi", "MQTT"],
  },
  {
    category: "Tools",
    items: ["Git", "VS Code", "Jupyter"],
  },
] as const;

export const lifeLeadershipSlides = [
  {
    src: "/imagery/ieee-chairperson-moment.svg",
    alt: "Chairperson responsibilities at IEEE NSUT Student Branch",
    caption:
      "Leading IEEE NSUT Student Branch initiatives as Chairperson from Jun 2025-Present.",
  },
  {
    src: "/imagery/imd-vision-work.svg",
    alt: "ML-IoT internship work at the Indian Meteorological Department",
    caption:
      "Building Raspberry Pi and OpenCV workflows during my ML-IoT internship at IMD.",
  },
  {
    src: "/imagery/recommendation-engine-session.svg",
    alt: "Work session on the StockVision forecasting platform",
    caption:
      "Developing StockVision, an end-to-end stock forecasting platform with FastAPI, Streamlit, and SHAP.",
  },
  {
    src: "/imagery/ev-battery-research-presentation.svg",
    alt: "Presenting EV battery state-of-charge forecasting research",
    caption:
      "Presenting the Bayesian-tuned LSTM work accepted at IEEE SEFET 2025.",
  },
] as const;

export const projects = [
  {
    title: "EV Battery State-of-Charge Forecasting & Real-Time Inference",
    period: "May 2024 - Present",
    bullets: [
      "Developed a Bayesian-optimized LSTM model for EV battery SoC prediction using 70 real-world driving sessions.",
      "Achieved MAE of 3.66, outperforming prior research benchmarks (4.28-6.5).",
      "Engineered a real-time inference pipeline using pre-trained Keras models for continuous SoC monitoring.",
      "Integrated SHAP-based explainability to analyze feature contributions in battery behavior.",
    ],
    tags: ["LSTM", "Keras", "Bayesian Optimization", "SHAP"],
  },
  {
    title: "StockVision: Real-Time Stock Forecasting Platform",
    period: undefined,
    bullets: [
      "Built end-to-end LSTM forecasting system using technical candlestick features.",
      "Deployed Streamlit + FastAPI dashboard with SHAP-based model explainability.",
    ],
    tags: ["LSTM", "FastAPI", "Streamlit", "SHAP"],
  },
] as const;

export const leadership = {
  title: "Chairperson",
  organization: "IEEE NSUT Student Branch",
  period: "Jun 2025- Present",
  bullets: [
    "Convened 2 national-level hackathons with 6,000+ total participants and 1,200+ offline attendees.",
    "Led cross-functional teams across technical, logistics, sponsorship, and outreach verticals.",
    "Coordinated with senior government stakeholders including Deputy CM's office and MCD officials.",
  ],
} as const;

export const publication = {
  title:
    "A Bayesian-Tuned LSTM Approach to State of Charge Forecasting in Electric Vehicle Batteries",
  venue: "IEEE SEFET 2025",
  summary: "Accepted.",
} as const;

export const awards = [
  "IBM Data Science Professional Certificate",
  "Lala Ram Kishan Das Jain Memorial Award for Initiative (2022)",
] as const;

export const resumePoints = [
  "New Delhi, India",
  "B. Tech, Instrumentation & Control Engineering at Netaji Subhas University of Technology (2023-2027) | CGPA: 7.4",
  "ML Engineer Intern at DUSQ (formerly InnerGize) | Nov 2025-Present",
  "Chairperson, IEEE NSUT Student Branch | Jun 2025- Present",
] as const;
