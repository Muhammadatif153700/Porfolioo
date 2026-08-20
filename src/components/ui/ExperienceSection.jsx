import React from 'react';
import {
  Briefcase, MapPin, Calendar, Award, TrendingUp, Users, Star, ArrowUpRight, ExternalLink
} from 'lucide-react';

const EXPERIENCE = [
  {
    id: 'cloudcore',
    role: 'Lead Systems Architect',
    company: 'CloudCore Technologies',
    period: '2022 – Present',
    location: 'Remote · Global',
    type: 'Full-Time',
    color: '#b45309',
    tagline: 'Scaling distributed SaaS infrastructure for 250k+ active users.',
    highlights: [
      'Designed multi-region Kubernetes clusters with zero-downtime blue/green deployments',
      'Reduced AWS cloud costs by 42% via reserved instance planning & right-sizing',
      'Architected Kafka-based event streaming ingesting 100k events/sec',
      'Grew and mentored an engineering team from 4 to 18 full-stack developers',
      'Elevated platform uptime from 99.5% to 99.999% through SRE practices',
    ],
    metrics: [
      { label: 'Users Served', value: '250k+' },
      { label: 'Cost Savings', value: '42%' },
      { label: 'Events/sec', value: '100k' },
    ],
  },
  {
    id: 'veloce',
    role: 'Senior Full Stack Engineer',
    company: 'Veloce Systems',
    period: '2020 – 2022',
    location: 'Hybrid · London, UK',
    type: 'Full-Time',
    color: '#c2410c',
    tagline: 'Built WebGL financial analytics SaaS from the ground up.',
    highlights: [
      'Pioneered a WebGL 60 FPS real-time trading dashboard with React Three Fiber',
      'Engineered a Python/FastAPI Monte Carlo risk simulation engine processing $1.2B in simulated volume',
      'Integrated C# .NET Core microservices with Redis caching for <8ms API responses',
      'Led migration from monolithic Rails app to domain-driven microservices architecture',
    ],
    metrics: [
      { label: 'Simulated Volume', value: '$1.2B' },
      { label: 'Render Target', value: '60 FPS' },
      { label: 'API Latency', value: '<8ms' },
    ],
  },
  {
    id: 'techfoundry',
    role: 'Software Engineer',
    company: 'TechFoundry Labs',
    period: '2018 – 2020',
    location: 'On-site · Karachi, PK',
    type: 'Full-Time',
    color: '#362319',
    tagline: 'Delivered core microservices and CI/CD automation infrastructure.',
    highlights: [
      'Built and maintained 12+ RESTful .NET Core microservices serving 500k+ requests/day',
      'Implemented automated CI/CD pipelines with GitHub Actions, Docker, and Terraform',
      'Designed PostgreSQL schema migrations and query optimizations reducing load times by 65%',
      'Contributed to React front-end component library adopted across 5 company products',
    ],
    metrics: [
      { label: 'Daily Requests', value: '500k+' },
      { label: 'Load Reduction', value: '65%' },
      { label: 'Services Built', value: '12+' },
    ],
  },
];

const ACHIEVEMENTS = [
  { icon: Star, label: 'GitHub Stars', value: '3.2k+', detail: 'Open source contributions' },
  { icon: Users, label: 'Devs Mentored', value: '18+', detail: 'Junior → senior growth' },
  { icon: TrendingUp, label: 'Uptime Improved', value: '99.999%', detail: 'SRE-grade reliability' },
  { icon: Award, label: 'Projects Shipped', value: '24+', detail: 'Production systems' },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="relative z-20 w-full py-24 px-6 bg-[#faf8f5]">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#b45309]/10 border border-[#b45309]/30 text-[#b45309] font-mono text-xs mb-3 font-bold">
              <Briefcase className="w-3.5 h-3.5" />
              <span>PROFESSIONAL EXPERIENCE</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-serif text-[#1c120c] tracking-tight">
              Career <span className="text-gradient-amber">Milestones</span>
            </h2>
          </div>
          <p className="max-w-md text-sm text-[#4a3225] font-sans font-medium mt-3 md:mt-0">
            6+ years of high-impact engineering across scale-ups and enterprise platforms — from code to cloud architecture leadership.
          </p>
        </div>

        {/* Achievement Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {ACHIEVEMENTS.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl glass-panel bg-white/90 border border-[#362319]/15 hover:border-[#b45309]/40 transition-all group shadow-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs text-[#5c3d2e] uppercase tracking-wider font-bold">{item.label}</span>
                <item.icon className="w-4 h-4 text-[#b45309] group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-2xl md:text-3xl font-bold font-mono text-[#1c120c] mb-1">
                {item.value}
              </div>
              <p className="text-[11px] text-[#5c3d2e] font-sans font-medium">{item.detail}</p>
            </div>
          ))}
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-5 md:left-9 top-0 bottom-0 w-px bg-gradient-to-b from-[#b45309]/60 via-[#c2410c]/40 to-transparent hidden md:block" />

          <div className="space-y-8">
            {EXPERIENCE.map((exp, idx) => (
              <div key={exp.id} className="relative flex gap-6 md:gap-10">

                {/* Timeline dot */}
                <div
                  className="relative z-10 w-10 h-10 rounded-2xl border-2 flex items-center justify-center shrink-0 shadow-md mt-1 hidden md:flex"
                  style={{ borderColor: exp.color, backgroundColor: `${exp.color}18` }}
                >
                  <span className="font-mono text-xs font-black" style={{ color: exp.color }}>
                    0{idx + 1}
                  </span>
                </div>

                {/* Card */}
                <div className="flex-1 glass-panel bg-white/90 rounded-3xl border border-[#362319]/15 hover:border-[#b45309]/40 transition-all p-6 md:p-8 shadow-xs group">

                  {/* Card Top Row */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border"
                          style={{ color: exp.color, borderColor: `${exp.color}50`, backgroundColor: `${exp.color}12` }}
                        >
                          {exp.type}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] font-mono text-[#5c3d2e]">
                          <Calendar className="w-3 h-3" /> {exp.period}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] font-mono text-[#5c3d2e]">
                          <MapPin className="w-3 h-3" /> {exp.location}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold font-serif text-[#1c120c] group-hover:text-[#b45309] transition-colors">
                        {exp.role}
                      </h3>
                      <p className="font-mono text-sm font-bold" style={{ color: exp.color }}>
                        {exp.company}
                      </p>
                      <p className="text-xs text-[#4a3225] font-sans mt-1 font-medium">
                        {exp.tagline}
                      </p>
                    </div>

                    {/* Mini Metrics */}
                    <div className="flex flex-wrap gap-2">
                      {exp.metrics.map((m, i) => (
                        <div key={i} className="text-center px-3 py-2 rounded-xl bg-[#faf8f5] border border-[#362319]/15 font-mono">
                          <div className="text-sm font-black text-[#1c120c]">{m.value}</div>
                          <div className="text-[9px] text-[#5c3d2e] uppercase tracking-wider font-semibold">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2">
                    {exp.highlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-[#2e1c14] font-sans font-medium">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0 mt-2"
                          style={{ backgroundColor: exp.color }}
                        />
                        {hl}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-14 p-8 rounded-3xl glass-panel bg-white/90 border border-[#362319]/15 text-center shadow-xs">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#b45309]/10 border border-[#b45309]/30 text-[#b45309] font-mono text-xs mb-3 font-bold">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>FULL CAREER PROFILE</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold font-serif text-[#1c120c] mb-2">
            View the Complete Track Record
          </h3>
          <p className="text-sm text-[#4a3225] font-sans font-medium max-w-md mx-auto mb-6">
            Explore the full LinkedIn profile for endorsements, certifications, and full-length project case studies.
          </p>
          <a
            href="https://linkedin.com/in/muhammadatif"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center space-x-2 px-8 py-3 rounded-xl bg-[#1c120c] hover:bg-[#362319] text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
          >
            <ExternalLink className="w-4 h-4 text-amber-400" />
            <span>LinkedIn Profile</span>
          </a>
        </div>

      </div>
    </section>
  );
}
