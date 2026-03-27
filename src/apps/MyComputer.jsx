import { useState } from 'react'

const sections = {
  skills: {
    label: 'Skills',
    groups: [
      {
        category: 'Backend Development',
        color: '#2563eb',
        skills: [
          { name: 'JavaScript & NodeJS', years: '6+' },
          { name: 'Java', years: '5+' },
          { name: 'Python', years: '4+' },
          { name: 'Spring', years: '3+' },
          { name: 'PHP', years: '2+' },
          { name: 'GoLang', years: '1+' },
          { name: 'C/C++', years: '2+' },
          { name: 'Flask', years: '2+' },
          { name: 'Django', years: '2+' },
        ],
      },
      {
        category: 'Frontend Development',
        color: '#7c3aed',
        skills: [
          { name: 'React', years: '4+' },
          { name: 'VueJS', years: '2+' },
          { name: 'TypeScript', years: '3+' },
          { name: 'Laravel', years: '1+' },
        ],
      },
      {
        category: 'Databases',
        color: '#059669',
        skills: [
          { name: 'MongoDB', years: '6+' },
          { name: 'MySQL', years: '8+' },
          { name: 'PostgreSQL', years: '4+' },
          { name: 'Greenplum', years: '2+' },
          { name: 'ArangoDB', years: '1+' },
          { name: 'Neo4J', years: '1+' },
          { name: 'GraphQL', years: '3+' },
        ],
      },
      {
        category: 'DevOps & Cloud',
        color: '#dc2626',
        skills: [
          { name: 'Docker', years: '8+' },
          { name: 'Kubernetes', years: '6+' },
          { name: 'AWS', years: '4+' },
          { name: 'GCP', years: '3+' },
          { name: 'Jenkins', years: '4+' },
          { name: 'GitHub Actions', years: '3+' },
          { name: 'Spinnaker', years: '2+' },
          { name: 'Airflow', years: '2+' },
        ],
      },
      {
        category: 'Monitoring & Observability',
        color: '#ea580c',
        skills: [
          { name: 'Elasticsearch', years: '4+' },
          { name: 'Logstash', years: '3+' },
          { name: 'Kibana', years: '3+' },
          { name: 'Prometheus', years: '3+' },
          { name: 'Grafana', years: '3+' },
        ],
      },
      {
        category: 'Blockchain & Web3',
        color: '#7c3aed',
        skills: [
          { name: 'Web3', years: '3+' },
          { name: 'Geth', years: '2+' },
          { name: 'Truffle', years: '2+' },
          { name: 'DApps', years: '2+' },
          { name: 'ERC-20/721', years: '2+' },
          { name: 'Rust', years: '1+' },
        ],
      },
    ],
  },
  experience: {
    label: 'Experience',
    items: [
      {
        title: 'Software Engineer',
        company: 'Qatar Computing Research Institute',
        location: 'Doha, Qatar',
        period: 'January 2022 – Present',
        description: [
          'Experience in large-scale commercial software development with expertise across the agile-driven design, development, testing and deployment lifecycle.',
          'Working with NodeJS, Java, and Python for robust backend and ReactJS for polished front-end development.',
          'Manage Kubernetes production clusters, Docker deployments, CI/CD pipelines, ELK based monitoring systems.',
        ],
      },
      {
        title: 'Senior Software Engineer',
        company: 'WSO2 Inc',
        location: 'Colombo, Sri Lanka',
        period: 'August 2017 – December 2021',
        description: [
          'Core engineer excelling in NodeJS and Java microservice development, code reviewing and promoting teamwork.',
          'Designed and implemented VM and Kubernetes-based CI/CD pipelines for Integrator runtime.',
          'Held Release Manager position for product releases, conducted demonstrations, training and PoCs for customers.',
          'Collaborated with customer support to troubleshoot issues and reduce turnaround time for fixes.',
        ],
      },
      {
        title: 'Full Stack Developer',
        company: 'Nexusitpro (Pvt) Ltd',
        location: 'Colombo, Sri Lanka',
        period: 'February 2016 – March 2017',
        description: [
          'Played a key role in agile development, ensuring successful system deployment for clients.',
          'Developed web applications in JavaScript and PHP to create impactful and efficient solutions.',
        ],
      },
      {
        title: 'Software Engineer (Intern)',
        company: 'SoftVESSEL',
        location: 'Colombo, Sri Lanka',
        period: 'August 2014 – February 2015',
        description: [
          'Worked in an agile development team to design, develop and deploy systems for clients.',
          'Engaged in code review and debugging sessions to enhance software quality.',
        ],
      },
    ],
  },
  tools: {
    label: 'Tools & Technologies',
    items: [
      { category: 'Backend', tools: ['NodeJS', 'Java', 'Python', 'Spring', 'Flask', 'Django', 'GoLang', 'PHP', 'C/C++'] },
      { category: 'Frontend', tools: ['React', 'VueJS', 'TypeScript', 'Laravel'] },
      { category: 'Database', tools: ['MongoDB', 'MySQL', 'PostgreSQL', 'Greenplum', 'ArangoDB', 'Neo4J', 'GraphQL'] },
      { category: 'Container & DevOps', tools: ['Docker', 'Kubernetes', 'Kubeadm', 'Jenkins', 'GitHub Actions', 'Spinnaker', 'Airflow', 'CircleCI'] },
      { category: 'Cloud', tools: ['AWS EC2', 'AWS Lambda', 'AWS Cognito', 'CloudFront', 'S3', 'CloudWatch', 'Route 53', 'GCP GKE', 'GCP Storage'] },
      { category: 'Monitoring', tools: ['Elasticsearch', 'Logstash', 'Kibana', 'Prometheus', 'Grafana', 'Filebeat', 'Metricbeat'] },
      { category: 'Blockchain', tools: ['Web3', 'Bitcoin Client', 'Geth', 'Blockchain ETL', 'ERC-20', 'ERC-721', 'Truffle', 'Rust', 'DApps'] },
      { category: 'Other', tools: ['Microservices', 'Firebase', 'gRPC', 'Redis', 'Kafka', 'RabbitMQ', 'Scrapy', 'Swagger', 'Postman'] },
    ],
  },
  education: {
    label: 'Education',
    items: [
      {
        degree: 'BSc Honours in Computer Science',
        institution: 'University of Colombo',
        period: 'Feb 2015 - Dec 2018',
        grade: 'First Class Honours: 3.75 GPA',
      },
      {
        degree: 'GCE Advance Level Examination',
        institution: 'Nalanda College Colombo 10',
        period: '2000 - 2013',
        grade: 'Combined Mathematics, Physics and Chemistry',
      },
    ],
  },
}

export default function MyComputer() {
  const [activeSection, setActiveSection] = useState('skills')

  return (
    <div className="flex h-full" style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '12px' }}>
      {/* Sidebar */}
      <div className="w-48 shrink-0 p-2 border-r border-gray-300" style={{ background: 'linear-gradient(180deg, #7ba2e7 0%, #6375d6 100%)' }}>
        <div className="text-white text-xs font-bold mb-2 px-2">System Folders</div>
        {Object.entries(sections).map(([key, section]) => (
          <button
            key={key}
            className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-left text-sm cursor-pointer border-none ${
              activeSection === key
                ? 'bg-white/30 text-white font-bold'
                : 'text-white/90 hover:bg-white/15 bg-transparent'
            }`}
            onClick={() => setActiveSection(key)}
          >
            <span>📁</span>
            {section.label}
          </button>
        ))}

        <div className="mt-4 text-white text-xs font-bold mb-2 px-2">Details</div>
        <div className="text-white/70 text-[10px] px-2 leading-relaxed">
          <p>Local Disk (C:)</p>
          <p>Type: Portfolio Drive</p>
          <p>Engineer: Sajitha Liyanage</p>
          <p>Location: Dubai, UAE</p>
          <p>Exp: 10+ years</p>
        </div>

        <div className="mt-4 text-white text-xs font-bold mb-2 px-2">Social Links</div>
        <div className="flex flex-col gap-1 px-1">
          <a
            href="https://linkedin.com/in/sajithaliyanage"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2 py-1 rounded text-white/90 text-[10px] hover:bg-white/15 no-underline"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a
            href="https://github.com/sajithaliyanage"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2 py-1 rounded text-white/90 text-[10px] hover:bg-white/15 no-underline"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
          <a
            href="https://instagram.com/sajithaliyanage"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2 py-1 rounded text-white/90 text-[10px] hover:bg-white/15 no-underline"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            Instagram
          </a>
          <a
            href="https://facebook.com/sajithaliyanage"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2 py-1 rounded text-white/90 text-[10px] hover:bg-white/15 no-underline"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Facebook
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto bg-white">
        {/* Address bar */}
        <div className="flex items-center gap-2 mb-4 p-1.5 bg-white border border-gray-300 rounded-sm">
          <span className="text-gray-500 text-[11px]">📁 Address</span>
          <div className="flex-1 bg-white border border-gray-300 px-2 py-0.5 text-[11px]">
            C:\My Computer\{sections[activeSection].label}
          </div>
        </div>

        {/* Skills Section — grouped chips with years */}
        {activeSection === 'skills' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-1">Technical Skills</h3>
            {sections.skills.groups.map((group) => (
              <div key={group.category}>
                <div className="text-[11px] font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: group.color }} />
                  {group.category}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-1 rounded-md border px-2 py-1 transition-colors hover:shadow-sm"
                      style={{
                        borderColor: `${group.color}40`,
                        background: `${group.color}08`,
                      }}
                    >
                      <span className="text-[11px] font-medium text-gray-800">{skill.name}</span>
                      <span
                        className="text-[9px] font-bold rounded-full px-1.5 py-0.5"
                        style={{
                          background: `${group.color}18`,
                          color: group.color,
                        }}
                      >
                        {skill.years}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experience Section */}
        {activeSection === 'experience' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-1">Professional Experience</h3>
            {sections.experience.items.map((exp, i) => (
              <div key={i} className="p-3 bg-gray-50 border border-gray-200 rounded">
                <div className="font-bold text-[12px] text-gray-800">{exp.title}</div>
                <div className="text-[11px] text-blue-600 font-medium">{exp.company}</div>
                <div className="text-[10px] text-gray-500 mb-2">{exp.period} | {exp.location}</div>
                <ul className="space-y-1 ml-3">
                  {exp.description.map((d, j) => (
                    <li key={j} className="text-[11px] text-gray-600 list-disc">{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Tools Section */}
        {activeSection === 'tools' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-1">Tools & Technologies</h3>
            {sections.tools.items.map((cat) => (
              <div key={cat.category}>
                <div className="text-[11px] font-bold text-gray-700 mb-1">{cat.category}</div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 text-[10px] rounded-sm border border-blue-300 bg-blue-50 text-blue-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Education Section */}
        {activeSection === 'education' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-1">Education</h3>
            {sections.education.items.map((edu, i) => (
              <div key={i} className="p-3 bg-gray-50 border border-gray-200 rounded">
                <div className="font-bold text-[12px] text-gray-800">{edu.degree}</div>
                <div className="text-[11px] text-blue-600 font-medium">{edu.institution}</div>
                <div className="text-[10px] text-gray-500">{edu.period}</div>
                <div className="text-[11px] text-green-700 font-medium mt-1">{edu.grade}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
