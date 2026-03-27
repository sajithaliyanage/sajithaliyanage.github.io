import { useState } from 'react'

const tabs = ['Profile', 'Timeline', 'Skills', 'Awards']

const timeline = [
  { year: '2014', title: 'Software Engineer Intern — SoftVESSEL', desc: 'Started professional career in an agile team designing, developing and deploying systems for clients in Colombo, Sri Lanka.' },
  { year: '2015', title: 'BSc Computer Science — University of Colombo', desc: 'Enrolled in BSc Honours in Computer Science. Later graduated with First Class Honours (3.75 GPA).' },
  { year: '2016', title: 'Full Stack Developer — Nexusitpro', desc: 'Key role in agile development, building web applications in JavaScript and PHP for commercial clients.' },
  { year: '2016', title: 'Microsoft Imagine Cup & Appathon Winner', desc: 'Won All Island Appathon Challenge, 1st Runners Up in Imagine Cup Gaming, 2nd Runners Up in Innovation category.' },
  { year: '2017', title: 'Senior Software Engineer — WSO2 Inc', desc: 'Joined WSO2 as core engineer for NodeJS and Java microservice development. Became Release Manager for product releases.' },
  { year: '2018', title: 'Google Summer of Code Contributor', desc: 'GSoC 2018 contributor for Sustainable Computing Research Lab. Later mentored in seasons 2019-2022.' },
  { year: '2020', title: 'WSO2 Outstanding Contribution Award', desc: 'Recognized as best-performing employee and Rock Star in the Enterprise Integrator team.' },
  { year: '2022', title: 'Software Engineer — QCRI, Qatar', desc: 'Joined Qatar Computing Research Institute for large-scale commercial software development with Kubernetes, Docker, and CI/CD.' },
]

const skillCategories = [
  {
    label: 'Backend Development',
    skills: [
      { name: 'JavaScript & NodeJS', level: 90 },
      { name: 'Java / Spring', level: 85 },
      { name: 'Python / Flask / Django', level: 80 },
      { name: 'GoLang', level: 55 },
      { name: 'C/C++', level: 60 },
    ],
  },
  {
    label: 'Frontend Development',
    skills: [
      { name: 'React', level: 85 },
      { name: 'VueJS', level: 70 },
      { name: 'TypeScript', level: 80 },
      { name: 'Laravel', level: 60 },
    ],
  },
  {
    label: 'Databases',
    skills: [
      { name: 'MongoDB', level: 90 },
      { name: 'MySQL', level: 92 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'Elasticsearch', level: 78 },
      { name: 'ArangoDB / Neo4J', level: 65 },
    ],
  },
  {
    label: 'DevOps & Cloud',
    skills: [
      { name: 'Docker', level: 92 },
      { name: 'Kubernetes', level: 88 },
      { name: 'AWS', level: 80 },
      { name: 'CI/CD (Jenkins, GitActions)', level: 85 },
      { name: 'Monitoring (ELK, Prometheus)', level: 82 },
    ],
  },
  {
    label: 'Blockchain',
    skills: [
      { name: 'Web3 / DApps', level: 78 },
      { name: 'Ethereum / Geth', level: 75 },
      { name: 'Smart Contracts / Truffle', level: 72 },
    ],
  },
]

const awards = [
  { title: 'Outstanding Contribution', org: 'WSO2 Inc', year: '2020-2021', desc: 'Best-performing employee recognition — Team: Enterprise Integrator' },
  { title: 'Google Summer of Code', org: 'Google', year: '2018', desc: 'GSoC contributor for Sustainable Computing Research Lab organization' },
  { title: 'All Island Appathon Challenge', org: 'Winner', year: '2016', desc: 'Team WhileLOOP — Project: Take Me There' },
  { title: 'Microsoft Imagine Cup Sri Lanka', org: '1st Runners Up', year: '2016', desc: 'Team WhileLOOP — Project: Drowning Bunny (Gaming Category)' },
  { title: 'Microsoft Imagine Cup Sri Lanka', org: '2nd Runners Up', year: '2016', desc: 'Team WhileLOOP — Project: Walk Mode (Innovation Category)' },
  { title: 'Microsoft Imagine Cup Sri Lanka', org: 'National Finalist', year: '2015', desc: 'Team WhileLOOP — Project: iMetYou (World Citizenship Category)' },
  { title: 'WSO2 Rock Star', org: 'Enterprise Integrator', year: '2020', desc: 'Recognized for open source community services' },
]

export default function AboutMe() {
  const [activeTab, setActiveTab] = useState('Profile')

  return (
    <div className="h-full flex flex-col bg-white" style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '12px' }}>
      {/* Tabs */}
      <div className="flex border-b border-gray-300 bg-[#ece9d8] px-2 pt-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-1.5 text-[11px] rounded-t border cursor-pointer ${
              activeTab === tab
                ? 'bg-white border-gray-300 border-b-white font-bold text-gray-800 -mb-px'
                : 'bg-[#d4d0c8] border-transparent text-gray-600 hover:bg-[#e4e0d8]'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-auto p-4">
        {/* Profile Tab */}
        {activeTab === 'Profile' && (
          <div className="flex gap-6">
            {/* Avatar section */}
            <div className="shrink-0 flex flex-col items-center gap-2">
              <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-gray-300 shadow-md">
                <img src="/profile.jpeg" alt="Sajitha Liyanage" className="w-full h-full" style={{ objectFit: 'cover' }} draggable={false} />
              </div>
              <div className="text-center">
                <div className="font-bold text-[13px] text-gray-800">Sajitha Liyanage</div>
                <div className="text-[10px] text-blue-600">Full-Stack Software Engineer</div>
                <div className="text-[10px] text-gray-500 mt-0.5">Dubai, UAE</div>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="font-bold text-[13px] text-gray-800 mb-1">About</h3>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Experienced full-stack software engineer with over 10 years of software design and development expertise.
                  Proficient across a wide array of software technologies and cloud platforms. Established a track record of
                  successfully delivering mission-critical applications and systems while maintaining the highest standards.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[13px] text-gray-800 mb-1">What I Do</h3>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  I specialize in building large-scale distributed systems using NodeJS, Java, and Python on the backend,
                  with React for polished frontend experiences. I manage Kubernetes production clusters, design CI/CD pipelines,
                  and architect monitoring solutions. Deeply passionate about blockchain security, dark web intelligence, and open source.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[13px] text-gray-800 mb-1">Volunteering & Mentoring</h3>
                <p className="text-[11px] text-gray-600 leading-relaxed">
                  Mentor at Google Summer of Code (2019-2022) and Google Code-In (2016-2019).
                  Open source contributor to WSO2, Apache, SCoRe, and CIBR.
                  President of ISACA Student Group. Conduct tech talks and workshops at universities.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-[13px] text-gray-800 mb-1">Get in Touch</h3>
                <div className="space-y-1 text-[11px]">
                  <p className="text-gray-600">Email: sajithaliyanage@gmail.com</p>
                  <p className="text-gray-600">Phone: +971 505628400</p>
                  <p className="text-gray-600">LinkedIn: linkedin.com/in/sajithaliyanage</p>
                  <p className="text-gray-600">GitHub: github.com/sajithaliyanage</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Timeline Tab */}
        {activeTab === 'Timeline' && (
          <div className="space-y-0">
            <h3 className="text-sm font-bold text-gray-800 mb-3">My Journey</h3>
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-3 pb-4">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-blue-200 shrink-0" />
                  {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-blue-200" />}
                </div>
                {/* Content */}
                <div className="pb-2">
                  <div className="text-[10px] text-blue-600 font-bold">{item.year}</div>
                  <div className="text-[12px] font-bold text-gray-800">{item.title}</div>
                  <div className="text-[11px] text-gray-600">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'Skills' && (
          <div className="space-y-4">
            {skillCategories.map((cat) => (
              <div key={cat.label}>
                <h3 className="text-[12px] font-bold text-gray-800 mb-2 border-b border-gray-200 pb-1">
                  {cat.label}
                </h3>
                <div className="space-y-2">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="space-y-0.5">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-gray-700">{skill.name}</span>
                        <span className="text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${skill.level}%`,
                            background: `linear-gradient(90deg, #3b82f6 0%, ${skill.level > 85 ? '#22c55e' : '#60a5fa'} 100%)`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Awards Tab */}
        {activeTab === 'Awards' && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-1">Awards & Recognition</h3>
            {awards.map((award, i) => (
              <div key={i} className="flex items-start gap-3 p-2.5 bg-gray-50 border border-gray-200 rounded">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-lg" style={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                }}>
                  🏆
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[12px] text-gray-800">{award.title}</div>
                  <div className="text-[11px] text-blue-600">{award.org} — {award.year}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{award.desc}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
