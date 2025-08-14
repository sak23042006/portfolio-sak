import { motion } from "framer-motion"

const profiles = [
  {
    name: "Upwork",
    url: "https://www.upwork.com/freelancers/~0143bf47b74e34b6fb",
    icon: "/upwork.png",
    color: "bg-green-100 text-green-700",
  },
  {
    name: "GitHub",
    url: "https://github.com/sak23042006",
    icon: "github.png",
    color: "bg-gray-100 text-gray-800",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/arun-kumar23040912",
    icon: "linkedin.png",
    color: "bg-blue-100 text-blue-800",
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/vQPBhL4go7/",
    icon: "leetcode.png",
    color: "bg-orange-100 text-orange-700",
  },
  {
    name: "Credly",
    url: "https://www.credly.com/users/arun-kumar-s.7a75114f/badges#credly",
    icon: "credly.png",
    color: "bg-orange-100 text-orange-800",
  },
  {
    name: "Wellfound",
    url: "https://wellfound.com/u/arun-kumar-s-60",
    icon: "wellfound.png",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "GoLance",
    url: "https://golance.com/freelancer/a-kumar-s",
    icon: "golance.png",
    color: "bg-cyan-100 text-cyan-700",
  },
  {
    name: "Devfolio",
    url: "https://devfolio.co/@Sak23",
    icon: "devfolio.png",
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "Forage",
    url: "https://www.theforage.com/profile/A5BzLb5qRL88M8A2R",
    icon: "forage.png",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Fiverr",
    url: "https://www.fiverr.com/sak2304?public_mode=true",
    icon: "fiverr.png",
    color: "bg-green-100 text-green-700",
  },
  {
    name: "Portfolio",
    url: "https://dp9plo9wq0xua.cloudfront.net",
    icon: "portfolio.png",
    color: "bg-yellow-100 text-yellow-800",
  },
  
  {
    name: "Kalvium Portfolio",
    url: "https://app.kalvium.community/showcase/arunkumar9526",
    icon: "kalvium.png",
    color: "bg-red-100 text-red-800",
  },
]

const container = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 },
}

const TechProfiles = () => (
  <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br px-4">
    <div className="max-w-3xl w-full mx-auto text-center mb-5">
      <h1 className="text-4xl font-bold mb-3 text-white">My Tech Profiles</h1>
      <p className="text-white mb-6 text-lg">
        Explore my presence across top tech platforms
      </p>
    </div>
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl"
    >
      {profiles.map((profile, idx) => (
        <motion.a
          key={profile.name}
          variants={item}
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex flex-col items-center justify-center rounded-xl shadow-lg p-6 transition-transform hover:scale-105 hover:shadow-xl ${profile.color}`}
        >
          {/* Replace with your SVGs or use emoji for quick demo */}
          <div className="mb-3 text-4xl">
            <img src={profile.icon} alt={profile.name} className="w-12 h-12" />
          </div>
          <span className="font-semibold text-lg">{profile.name}</span>
        </motion.a>
      ))}
    </motion.div>
  </section>
)

export default TechProfiles
