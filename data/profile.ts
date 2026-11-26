export const profile = {
  name: "Shashank Kumar Singh",
  location: "Bangalore, India",
  institution: "Dayananda Sagar Institutions",
  degree: "B.Tech in Computer Science and Engineering",
  specialization: "Artificial Intelligence and Machine Learning",
  introduction:
    "I’m a computer science student exploring how AI and full-stack development can make everyday tools more useful.",
  links: {
    LinkedIn: "https://www.linkedin.com/in/shashank-kumar-singh-291a30441/",
    GitHub: "https://github.com/shashank-sgh",
    Instagram: "https://www.instagram.com/shashank.sgh/",
    YouTube: "https://www.youtube.com/@shashanksingh165",
  },
  skills: [
    {
      stage: "Hands-on",
      items: ["React.js", "Tailwind CSS", "C programming"],
      description:
        "From control flow in C to building interfaces for workers and employers.",
    },
    {
      stage: "Learning",
      items: ["Algorithms", "Full-stack development", "Machine learning"],
      description:
        "Connecting what I study in class with the decisions I make in a project.",
    },
    {
      stage: "Exploring",
      items: ["Supabase", "Gemini API", "OpenStreetMap", "ElevenLabs"],
      description:
        "Investigating the backend, maps and voice services proposed for Workora.",
    },
  ],
  achievements: [] as { title: string; url: string }[],
};
export const projects = [
  {
    slug: "workora",
    name: "Workora",
    categories: ["Web development", "Hackathon"],
    status: "MVP in development",
    summary:
      "Helping informal and semi-skilled workers discover jobs closer to home.",
    image: "/assets/workora.svg",
    stack: ["React.js", "Tailwind CSS"],
    sections: [
      [
        "The question",
        "How can a worker find a nearby opening when conventional job boards depend on typing the right keywords?",
      ],
      [
        "The prototype",
        "Our team has been building a responsive frontend with separate worker and employer experiences. The design puts local job discovery at the center of the application.",
      ],
      [
        "My project experience",
        "I have been working with the team on Workora and exploring how verification, mapping and regional-language voice services could fit the existing frontend.",
      ],
      [
        "What comes next",
        "The proposed next steps include regional-language voice search, intelligent job matching, location-based discovery and worker verification. Supabase, Gemini, ElevenLabs and OpenStreetMap are planned integrations.",
      ],
    ],
  },
];
export const origin =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://shashank-kumar-singh-portfolio.lilacgecko256.chatgpt.site";
