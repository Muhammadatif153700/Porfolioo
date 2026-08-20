export const TECH_STACK = [
  {
    category: "Languages & Runtimes",
    color: "#b45309",
    tools: [
      { name: "TypeScript / JS", level: "Expert", experience: "6 yrs", icon: "Code2" },
      { name: "C# / .NET 8", level: "Expert", experience: "5 yrs", icon: "Cpu" },
      { name: "Golang", level: "Advanced", experience: "3 yrs", icon: "Zap" },
      { name: "Python", level: "Advanced", experience: "4 yrs", icon: "Terminal" },
      { name: "GLSL / Shaders", level: "Intermediate", experience: "2 yrs", icon: "Sparkles" }
    ]
  },
  {
    category: "Frontend & WebGL",
    color: "#c2410c",
    tools: [
      { name: "React / Next.js", level: "Expert", experience: "6 yrs", icon: "Layout" },
      { name: "Three.js / R3F", level: "Advanced", experience: "3 yrs", icon: "Box" },
      { name: "Tailwind CSS", level: "Expert", experience: "5 yrs", icon: "Palette" },
      { name: "GSAP / Animations", level: "Advanced", experience: "4 yrs", icon: "Move" },
      { name: "State (Zustand/Redux)", level: "Expert", experience: "6 yrs", icon: "Layers" }
    ]
  },
  {
    category: "Backend & Microservices",
    color: "#362319",
    tools: [
      { name: "ASP.NET Core WebAPI", level: "Expert", experience: "5 yrs", icon: "Server" },
      { name: "Node.js / Express / Nest", level: "Expert", experience: "6 yrs", icon: "Server" },
      { name: "GraphQL & gRPC", level: "Advanced", experience: "4 yrs", icon: "Network" },
      { name: "Kafka & NATS", level: "Advanced", experience: "3 yrs", icon: "Radio" },
      { name: "REST & WebSockets", level: "Expert", experience: "6 yrs", icon: "Activity" }
    ]
  },
  {
    category: "Databases & Storage",
    color: "#d97706",
    tools: [
      { name: "PostgreSQL", level: "Expert", experience: "6 yrs", icon: "Database" },
      { name: "Redis / Memcached", level: "Expert", experience: "5 yrs", icon: "HardDrive" },
      { name: "TimescaleDB / Influx", level: "Advanced", experience: "3 yrs", icon: "Clock" },
      { name: "MongoDB / DynamoDB", level: "Advanced", experience: "4 yrs", icon: "FileCode" },
      { name: "Elasticsearch", level: "Intermediate", experience: "3 yrs", icon: "Search" }
    ]
  },
  {
    category: "Cloud, DevOps & Infra",
    color: "#7c2d12",
    tools: [
      { name: "Docker & Kubernetes", level: "Expert", experience: "5 yrs", icon: "Container" },
      { name: "AWS (EKS, EC2, S3, RDS)", level: "Advanced", experience: "5 yrs", icon: "Cloud" },
      { name: "Terraform / IaC", level: "Advanced", experience: "3 yrs", icon: "Settings" },
      { name: "GitHub Actions / CI/CD", level: "Expert", experience: "6 yrs", icon: "Workflow" },
      { name: "Cloudflare & Edge", level: "Advanced", experience: "4 yrs", icon: "Globe" }
    ]
  }
];

export const SYSTEM_METRICS = [
  { label: "Production Uptime", value: "99.999%", detail: "Across 14 Kubernetes clusters" },
  { label: "P99 API Latency", value: "< 12ms", detail: "Global edge CDN & Redis caches" },
  { label: "WebGL FPS Target", value: "60 FPS", detail: "Hardware accelerated 3D canvas" },
  { label: "Code Test Coverage", value: "96.4%", detail: "Automated Jest, xUnit & Cypress" }
];
