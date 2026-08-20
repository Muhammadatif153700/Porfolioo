export const PROJECTS = [
  {
    id: "nexus-cloud-dashboard",
    categoryId: "full-stack-projects",
    title: "Nexus Cloud Observability Suite",
    tagline: "Real-time WebGL Telemetry & Microservice Topology Visualizer",
    description: "An enterprise-grade cloud monitoring portal authored by Muhammad Atif. Features interactive 3D WebGL node graphs, live log stream analysis, and instant alerting triggers for Kubernetes clusters.",
    longDescription: "Engineered with React, Three.js, C# .NET Core, and WebSockets. Handles over 50,000 telemetry events/sec with hardware-accelerated 3D node graphs rendered at a steady 60 FPS.",
    tags: ["React", "Three.js", "C# .NET Core", "WebSockets", "Tailwind CSS", "Docker", "TimescaleDB"],
    stats: {
      throughput: "50k events/sec",
      latency: "8ms websocket ping",
      fps: "60 FPS WebGL"
    },
    demoUrl: "https://nexus-cloud.demo.dev",
    githubUrl: "https://github.com/muhammadatif/nexus-observability-suite",
    type: "Full Stack WebGL Platform",
    featured: true,
    visualType: "dashboard",
    architecture: {
      overview: "Multi-tenant distributed architecture using event-driven microservices designed by Muhammad Atif.",
      components: [
        { name: "Frontend Visualizer", tech: "React, Three.js / R3F, Canvas Shaders" },
        { name: "Ingestion Gateway", tech: "Golang, gRPC, NATS JetStream" },
        { name: "Analytics Engine", tech: "C# .NET 8, Redis, TimescaleDB" },
        { name: "Cloud Deploy", tech: "AWS EKS, Helm, Terraform, Cloudflare Workers" }
      ]
    }
  },
  {
    id: "hyper-forge-cad",
    categoryId: "full-stack-projects",
    title: "HyperForge 3D Asset Studio",
    tagline: "Collaborative Browser-Based 3D Canvas & Shader Editor",
    description: "Figma-like real-time collaborative 3D editor with node-based procedural material graph, glTF exporter, and WebGPU shadow maps.",
    longDescription: "Pioneered multiplayer WebGL editing using Conflict-free Replicated Data Types (CRDTs) over WebSockets and WebRTC data channels.",
    tags: ["React", "React Three Fiber", "WebGPU", "Yjs (CRDT)", "Node.js", "Tailwind CSS"],
    stats: {
      collaboration: "50+ Concurrent Users",
      exportFormats: "glTF, GLB, OBJ, USDZ",
      rendering: "Ray-traced Preview"
    },
    demoUrl: "https://hyperforge-3d.demo.dev",
    githubUrl: "https://github.com/muhammadatif/hyperforge-3d-studio",
    type: "WebGL & WebGPU Editor",
    featured: true,
    visualType: "canvas3d",
    architecture: {
      overview: "Client-side WebGL canvas driven by WebAssembly C++ kernel and Node.js sync server.",
      components: [
        { name: "Shader Engine", tech: "Custom GLSL Shaders, WebGPU pipeline" },
        { name: "CRDT Sync Server", tech: "Node.js, Yjs, WebSocket Clusters" },
        { name: "Asset Pipeline", tech: "Draco Compression, WASM glTF Optimizer" }
      ]
    }
  },
  {
    id: "aegis-mesh-api",
    categoryId: "api-backend",
    title: "Aegis Zero-Trust API Mesh",
    tagline: "Sub-millisecond Security Gateway & Rate-Limiting Engine",
    description: "High-throughput API gateway with OAuth2/mTLS authentication, dynamic rate limiting using sliding window Redis memory buckets, and GraphQL federation.",
    longDescription: "Built by Muhammad Atif to replace legacy reverse proxies. Processes 15 Million daily API requests with P99 latency lower than 2.4ms.",
    tags: ["Go", "Node.js", "GraphQL", "Redis Cluster", "PostgreSQL", "Docker", "Kubernetes"],
    stats: {
      requests: "15M+ Requests/Day",
      p99Latency: "2.4ms",
      uptime: "99.999%"
    },
    demoUrl: "https://aegis-mesh.demo.dev",
    githubUrl: "https://github.com/muhammadatif/aegis-zero-trust-mesh",
    type: "High-Throughput Backend Service",
    featured: true,
    visualType: "terminal",
    architecture: {
      overview: "Zero-allocation Go proxy layer with distributed Redis cache and Postgres storage.",
      components: [
        { name: "Core Gateway", tech: "Go (Golang), eBPF, Envoy Filters" },
        { name: "State Caching", tech: "Redis Sentinel Cluster with RAM replication" },
        { name: "Auth Provider", tech: "JWT / mTLS / OAuth2 PKCE Flows" }
      ]
    }
  },
  {
    id: "quantum-flow-db",
    categoryId: "system-architecture",
    title: "QuantumFlow Event Sourcing Engine",
    tagline: "Distributed Immutable Ledger & Realtime Analytics Pipeline",
    description: "Event-driven system architecture designed for multi-region financial transaction logs with guaranteed idempotency and instant point-in-time replay.",
    longDescription: "Architected end-to-end Kafka streams and PostgreSQL append-only event stores with CQRS pattern separation.",
    tags: ["Kafka", "Apache Flink", "C# .NET 8", "PostgreSQL", "Terraform", "AWS Lambda"],
    stats: {
      eventIngest: "100k events/sec",
      durability: "99.999999999%",
      replaySpeed: "1M records/sec"
    },
    demoUrl: "https://quantumflow.demo.dev",
    githubUrl: "https://github.com/muhammadatif/quantumflow-event-engine",
    type: "Distributed Cloud Architecture",
    featured: true,
    visualType: "architecture",
    architecture: {
      overview: "CQRS & Event Sourcing blueprint with Kafka topic partitioning and Flink stream aggregation.",
      components: [
        { name: "Event Bus", tech: "Apache Kafka Multi-AZ Cluster" },
        { name: "Command Side (Write)", tech: "C# .NET 8 WebAPI & Immutable Log" },
        { name: "Query Side (Read)", tech: "Elasticsearch + PostgreSQL Materialized Views" }
      ]
    }
  },
  {
    id: "velo-stack-saas",
    categoryId: "full-stack-projects",
    title: "Veloce Financial Analytics Portal",
    tagline: "Institutional Portfolio Management & Risk Simulation SaaS",
    description: "Real-time algorithmic trading dashboard with interactive charts, Monte Carlo risk simulations, and automated PDF compliance export.",
    longDescription: "Combines React Next.js with C# WebAPI backend and Python quantitative risk libraries.",
    tags: ["Next.js", "React", "Python (FastAPI)", ".NET Core", "Tailwind CSS", "Chart.js"],
    stats: {
      processedVolume: "$1.2B Simulated",
      chartRender: "60 FPS Live Ticker",
      userRating: "4.9/5"
    },
    demoUrl: "https://veloce-analytics.demo.dev",
    githubUrl: "https://github.com/muhammadatif/veloce-saas-portal",
    type: "SaaS Enterprise Portal",
    featured: false,
    visualType: "dashboard",
    architecture: {
      overview: "Next.js SSR frontend connected to async Celery task queues and Python quant engines.",
      components: [
        { name: "Frontend Portal", tech: "Next.js 14 App Router, Tailwind, Framer Motion" },
        { name: "Risk Worker", tech: "Python NumPy / SciPy, Celery, Redis" },
        { name: "Core API", tech: "C# .NET Core Entity Framework" }
      ]
    }
  },
  {
    id: "career-evolution-milestones",
    categoryId: "engineering-journey",
    title: "Muhammad Atif - Architectural Leadership",
    tagline: "Key Engineering Milestones & Scaled Platforms",
    description: "Proven track record scaling cloud infrastructure, leading engineering teams, and migrating legacy monoliths into cloud-native microservices.",
    longDescription: "Spearheaded technical vision across scale-ups. Reduced cloud infrastructure costs by 42% while improving platform uptime from 99.5% to 99.999%.",
    tags: ["Technical Leadership", "System Design", "Cloud Optimization", "Mentorship", "CI/CD Automation"],
    stats: {
      costReduction: "42% AWS Savings",
      uptimeImprovement: "99.5% -> 99.999%",
      engineersMentored: "18+ Devs"
    },
    demoUrl: "https://linkedin.com/in/muhammadatif",
    githubUrl: "https://github.com/muhammadatif",
    type: "Career Timeline & Metrics",
    featured: true,
    visualType: "timeline",
    architecture: {
      overview: "Strategic engineering roadmap focused on scalability, resilience, and developer velocity.",
      components: [
        { name: "2022 - Present", tech: "Lead Systems Architect @ CloudCore - Scaled to 250k Active Users" },
        { name: "2020 - 2022", tech: "Senior Full Stack Engineer @ Veloce - Built 60 FPS WebGL Engine" },
        { name: "2018 - 2020", tech: "Software Engineer @ TechFoundry - Microservices Migration" }
      ]
    }
  }
];
