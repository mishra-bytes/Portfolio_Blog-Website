export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Resume", href: "/resume" },
] as const;

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Email", href: "mailto:adityamishra@example.com" },
] as const;

export const highlights = [
  "Predictive modeling",
  "Computer vision",
  "Process dynamics",
] as const;

export const experience = [
  {
    title: "ML Engineer Intern",
    organization: "InnerGize",
    description:
      "Built model workflows and experimentation pipelines focused on production-minded machine learning delivery.",
  },
  {
    title: "Computer Vision for IoT Systems",
    organization: "Indian Meteorological Department",
    description:
      "Worked on sensor-linked vision systems to digitize physical readings and support applied monitoring workflows.",
  },
  {
    title: "Chairperson",
    organization: "IEEE NSUT Student Branch",
    description:
      "Led student initiatives, technical events, and cross-functional collaboration around emerging engineering topics.",
  },
] as const;

export const skills = [
  "Python",
  "C++",
  "MATLAB",
  "Computer Vision",
  "Deep Learning",
  "Process Control",
] as const;

export const projects = [
  {
    title: "Medical Computer Vision",
    summary:
      "Designed a facial analysis pipeline around 27 keypoints and intelligent patch placement for precise clinical imaging workflows.",
    tags: ["Keypoint Detection", "Image Geometry", "Clinical AI"],
  },
  {
    title: "Zomato Recommendation Engine",
    summary:
      "Built ranking models optimized for NDCG and recall with a stronger focus on retrieval quality and practical recommendation behavior.",
    tags: ["Ranking Systems", "NDCG", "Recall Optimization"],
  },
  {
    title: "CAPTCHArd",
    summary:
      "Automated captcha solving with a robust recognition pipeline tuned for consistency across noisy challenge variations.",
    tags: ["OCR", "Automation", "Model Serving"],
  },
  {
    title: "Crop Health Monitoring",
    summary:
      "Explored multispectral and hyperspectral imaging signals to identify stress patterns and improve agricultural monitoring decisions.",
    tags: ["Remote Sensing", "Spectral Analysis", "Agritech"],
  },
  {
    title: "IoT Thermometer Digitizer",
    summary:
      "Used Raspberry Pi, OpenCV, and MQTT to convert analog thermometer readings into machine-readable telemetry.",
    tags: ["Raspberry Pi", "OpenCV", "MQTT"],
  },
] as const;

export const publication = {
  title: "Bayesian-Tuned LSTM for EV Battery SoC Prediction",
  venue: "IEEE SEFET",
  summary:
    "Publication-focused work combining sequence modeling and Bayesian optimization to improve state-of-charge estimation for EV batteries.",
} as const;

export const resumePoints = [
  "B.Tech in Instrumentation and Control Engineering at NSUT",
  "Chairperson of the IEEE NSUT Student Branch",
  "ML Engineer Intern at InnerGize",
  "Computer vision and IoT experience with IMD",
] as const;
