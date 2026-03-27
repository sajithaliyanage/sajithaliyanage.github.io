import { useState } from 'react'

const projects = [
  {
    title: 'Blockstead',
    description: 'Distributed smart contract security auditing platform that provides smart contract security intelligence detecting 14+ vulnerabilities across 12 supported blockchains.',
    tech: ['NodeJS', 'ReactJS', 'MongoDB', 'Kubernetes', 'Python', 'Ethereum ETL', 'Web3', 'GoGeth', 'Airflow', 'Prometheus', 'Grafana', 'ELK'],
    github: 'https://github.com/sajithaliyanage',
    demo: '#',
    color: '#7c3aed',
  },
  {
    title: 'Dizzy - Darkweb Search Engine',
    description: 'ML-powered, scalable, context-aware dark web search engine and intelligence analytics platform. Crawled and analyzed 60M dark web pages to detect illicit content.',
    tech: ['NodeJS', 'ReactJS', 'Scrapy', 'Tor', 'Python', 'Kubernetes', 'Elasticsearch'],
    github: 'https://github.com/sajithaliyanage',
    demo: '#',
    color: '#dc2626',
  },
  {
    title: 'Toshi - Blockchain Security Analytics',
    description: 'ML-powered, distributed blockchain security analytics platform supporting transaction risk scoring, wallet estimation, and deanonymization of cryptocurrency users.',
    tech: ['NodeJS', 'ReactJS', 'Kubernetes', 'Blockchain ETL', 'Python', 'Redis', 'Scrapy', 'Elasticsearch', 'ArangoDB', 'Greenplum'],
    github: 'https://github.com/sajithaliyanage',
    demo: '#',
    color: '#059669',
  },
  {
    title: 'SOFFLIX HR Platform',
    description: 'All-in-one customizable HR platform for small to enterprise-level businesses. Manages human resources throughout the employee lifecycle.',
    tech: ['ReactJS', 'NodeJS', 'Java', 'AWS', 'Microservices', 'MongoDB', 'Lambda', 'S3', 'Cognito'],
    github: 'https://github.com/sajithaliyanage',
    demo: '#',
    color: '#2563eb',
  },
  {
    title: 'WSO2 Micro Integrator',
    description: 'Open source, cloud-native integration framework with a configuration runtime optimized for container-native deployments based on Docker & Kubernetes.',
    tech: ['Java', 'JavaScript', 'Apache Synapse', 'Apache Axis2'],
    github: 'https://github.com/wso2/micro-integrator',
    demo: '#',
    color: '#ea580c',
  },
  {
    title: 'MoneroSci - Blockchain Analyzer',
    description: 'Research focusing on privacy guarantees of Monero Blockchain, developing optimized environments to explore and analyze patterns for linkability and traceability.',
    tech: ['C++', 'Python', 'Monero ETL', 'RocksDB', 'SQLite'],
    github: 'https://github.com/sajithaliyanage',
    demo: '#',
    color: '#ca8a04',
  },
  {
    title: 'CrawlerX - Distributed Crawling',
    description: 'Web platform for crawling web URLs in different protocols in a distributed and scalable way.',
    tech: ['VueJS', 'Django', 'Celery', 'Scrapy', 'MongoDB', 'RabbitMQ', 'Kubernetes', 'Elasticsearch'],
    github: 'https://github.com/sajithaliyanage/crawlerx',
    demo: '#',
    color: '#0891b2',
  },
  {
    title: 'K8s EI Operator',
    description: 'Kubernetes Native Operator for deploying WSO2 integration solutions on Kubernetes with multiple automated functionalities.',
    tech: ['Go', 'Docker', 'Kubernetes', 'Operator SDK'],
    github: 'https://github.com/wso2/k8s-ei-operator',
    demo: '#',
    color: '#6366f1',
  },
  {
    title: 'Portfolio OS (This Site!)',
    description: 'Windows SL-themed portfolio website built as a fully interactive browser-based operating system simulation.',
    tech: ['React', 'Zustand', 'Framer Motion', 'Tailwind CSS'],
    github: 'https://github.com/sajithaliyanage',
    demo: '#',
    color: '#16a34a',
  },
]

export default function MyProjects() {
  const [hoveredIdx, setHoveredIdx] = useState(null)

  return (
    <div className="h-full overflow-auto bg-white p-4" style={{ fontFamily: 'Tahoma, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
        <span className="text-lg">📁</span>
        <h2 className="text-sm font-bold text-gray-800">My Projects</h2>
        <span className="text-[10px] text-gray-400 ml-auto">{projects.length} project(s)</span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-2 gap-3">
        {projects.map((project, i) => (
          <div
            key={i}
            className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 cursor-default"
            style={{
              transform: hoveredIdx === i ? 'translateY(-2px)' : 'none',
              boxShadow: hoveredIdx === i ? '0 4px 12px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.08)',
            }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Color header bar */}
            <div className="h-2" style={{ background: project.color }} />

            <div className="p-3">
              <h3 className="text-[13px] font-bold text-gray-800 mb-1">{project.title}</h3>
              <p className="text-[11px] text-gray-600 mb-2 leading-relaxed">{project.description}</p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tech.slice(0, 6).map((t) => (
                  <span
                    key={t}
                    className="px-1.5 py-0.5 text-[9px] rounded-sm font-medium"
                    style={{
                      background: `${project.color}15`,
                      color: project.color,
                      border: `1px solid ${project.color}30`,
                    }}
                  >
                    {t}
                  </span>
                ))}
                {project.tech.length > 6 && (
                  <span
                    className="px-1.5 py-0.5 text-[9px] rounded-sm font-medium text-gray-500 bg-gray-100 border border-gray-200"
                  >
                    +{project.tech.length - 6} more
                  </span>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2 py-1 text-[10px] rounded-sm border border-gray-300 hover:bg-gray-100 text-gray-700 no-underline"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                {project.demo !== '#' && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 text-[10px] rounded-sm text-white no-underline"
                    style={{ background: project.color }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
