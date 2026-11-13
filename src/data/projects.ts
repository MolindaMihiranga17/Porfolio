export type Project = {
  slug: string;
  number: string;
  title: string;
  eyebrow: string;
  summary: string;
  category: string;
  tags: string[];
  github?: string;
  live?: string;
  accent: string;
  visual: 'nimbus' | 'vettly' | 'hydro' | 'spendwise';
  status?: string;
  highlights: string[];
  screenshots?: {
    src: string;
    alt: string;
    caption: string;
    kind: 'desktop' | 'phone' | 'photo';
  }[];
};

export const projects: Project[] = [
  {
    slug: 'nimbus', number: '01', title: 'Nimbus', eyebrow: 'AI-powered project management',
    summary: 'A project management platform for projects, issues, boards and sprints, with AI that turns meeting notes into issues and catches duplicates before they are filed.',
    category: 'Web, desktop + mobile', status: 'Ongoing',
    tags: ["Java 21", "Spring Boot", "Spring Modulith", "PostgreSQL", "pgvector", "React", "TypeScript", "Electron", "React Native", "Expo", "Turborepo"],
    accent: '#9fc5ff', visual: 'nimbus',
    highlights: [
      "Building a full-stack project management platform (projects, issues, boards, sprints) as a team of three, on a Spring Modulith modular monolith where modules communicate only through public APIs and domain events.",
      "Implementing AI features that turn meeting notes into issues and detect duplicate issues before they are filed, using vector similarity search with PostgreSQL pgvector.",
      "Developing server-enforced, per-project roles that admins can change at runtime, OAuth2 sign-in with linked identity providers, mandatory two-step verification, and assignment notifications.",
      "Developing the React web app (Mantine, TanStack Query, dnd-kit drag-and-drop), an Electron desktop app, and an Expo mobile app in a Turborepo monorepo sharing API types, design tokens, and UI components.",
      "Managing the schema with versioned Flyway migrations, writing integration tests with Testcontainers, and running GitHub Actions CI with Cloudflare R2 file storage and a spec-driven, pull-request-based workflow.",
    ],
    screenshots: [
      { src: 'projects/nimbus/board.webp', alt: 'Nimbus issues board with To do, In progress, In review and Done columns', caption: 'Issues board, columns are the project’s statuses', kind: 'desktop' },
      { src: 'projects/nimbus/issue-page.webp', alt: 'Nimbus issue page with description, acceptance criteria and history', caption: 'Issue page with history and side panel', kind: 'desktop' },
      { src: 'projects/nimbus/home.webp', alt: 'Nimbus home page with assigned issues and project list', caption: 'Home: my work and projects', kind: 'desktop' },
      { src: 'projects/nimbus/notifications.webp', alt: 'Nimbus notifications panel open over the issues list', caption: 'Notifications panel', kind: 'desktop' },
      { src: 'projects/nimbus/projects.webp', alt: 'Nimbus projects list', caption: 'Projects list', kind: 'desktop' },
    ],
  },
  {
    slug: 'vettly', number: '02', title: 'Vettly', eyebrow: 'AI-powered recruitment',
    summary: 'A recruitment platform that brings candidate ranking, screening, messaging, and offer management into one workflow.',
    category: 'Web platform',
    tags: ["React", "TypeScript", "ASP.NET Core", "Go", "FastAPI", "PostgreSQL", "Redis", "SignalR", "Cloudflare R2", "Docker", "GitHub Actions"],
    github: 'https://github.com/Vettly/vettly-platform', live: 'https://vettly-platform.pages.dev',
    accent: '#ffc16f', visual: 'vettly',
    highlights: [
      "Architected a polyglot microservices monorepo with seven ASP.NET Core services, two Python/FastAPI AI services, and two Go services, sharing PostgreSQL and Redis for caching and asynchronous events.",
      "Built a Go API gateway as the single public entry point, with JWT validation, rate limiting, CORS, reverse proxying, and WebSocket passthrough.",
      "Developed the React recruiter dashboard with TanStack Query and Zustand: a drag-and-drop Kanban pipeline, candidate deep dives, AI match scores, skill-gap breakdowns, and a bias detection interface.",
      "Built semantic candidate ranking with sentence-transformer embeddings and asynchronous resume screening for AI fit scores and bias flags.",
      "Implemented SignalR messaging and an e-signature offer workflow with PDF generation, Cloudflare R2 storage, and a SHA-256-hashed audit trail.",
      "Deployed the frontend to Cloudflare Pages and 11 containerized backend services to Render, using Neon PostgreSQL, Upstash Redis, and GitHub Container Registry. GitHub Actions detects changed paths to rebuild and redeploy only modified services."
],
    screenshots: [
      { src: 'projects/vettly/dashboard.png', alt: 'Vettly recruiter dashboard with candidate table and hiring pipeline', caption: 'Recruiter dashboard and candidate pipeline', kind: 'desktop' },
      { src: 'projects/vettly/job-search.png', alt: 'Vettly job search screen with job listings and filters', caption: 'Job discovery and applications', kind: 'desktop' },
      { src: 'projects/vettly/offer-flow.png', alt: 'Vettly offer document and signature screen', caption: 'Offer document and signing flow', kind: 'desktop' },
      { src: 'projects/vettly/profile.png', alt: 'Vettly profile management screen', caption: 'Candidate profile management', kind: 'desktop' },
    ],
  },
  {
    slug: 'hydroguardian', number: '03', title: 'HydroGuardian', eyebrow: 'Connected agriculture',
    summary: 'A smart hydroponic system combining live sensor monitoring, device control, and AI-assisted crop insights.',
    category: 'Mobile + IoT',
    tags: ["React Native", "Expo", "FastAPI", "TensorFlow", "CNN + LSTM", "ESP32", "WebSockets", "PyJWT"],
    github: 'https://github.com/25-26J-285/hydro-grow-main',
    accent: '#81d6c2', visual: 'hydro',
    highlights: [
      "Built an automated hydroponic fodder system for Sri Lankan farmers, integrating ESP32 devices for temperature, humidity, pH, EC, and TDS monitoring and actuator control.",
      "Developed an Expo React Native app with more than 15 screens and eight reusable UI components, covering onboarding, a setup wizard, live monitoring, and energy tracking.",
      "Built a FastAPI backend with JWT authentication, Swagger/Redoc documentation, and a WebSocket gateway for device discovery, health monitoring, and real-time sensor broadcasting, including ESP32-CAM streaming.",
      "Implemented multimodal plant disease detection with CNN + LSTM, seed quality identification, and reinforcement-learning-based energy consumption optimization."
],
    screenshots: [
      { src: 'projects/hydroguardian/actuators.png', alt: 'HydroGrow actuator and tray slot screen', caption: 'Actuator and tray controls', kind: 'phone' },
      { src: 'projects/hydroguardian/growth-stage.png', alt: 'HydroGrow plant growth stage and sensor overview screen', caption: 'Plant stage and sensor overview', kind: 'phone' },
      { src: 'projects/hydroguardian/prototype.jpg', alt: 'Physical hydroponic rack and electronics prototype', caption: 'Physical hydroponic prototype', kind: 'photo' },
      { src: 'projects/hydroguardian/sensor-unit.jpg', alt: 'Sensor and controller unit inside the hydroponic prototype', caption: 'Sensor and controller unit', kind: 'photo' },
    ],
  },
  {
    slug: 'spendwise', number: '04', title: 'SpendWise', eyebrow: 'Personal finance, made clearer',
    summary: 'An offline-first finance and vehicle expense tracker with spending insights, reminders, and connected services.',
    category: 'Mobile + systems',
    tags: ["React Native", "Expo", "Go", "Spring Boot", "FastAPI", "Apache Kafka", "PostgreSQL", "Redis", "Kong", "AWS", "SQLite"],
    github: 'https://github.com/VoidLabs-org/SpendWise---Frontend',
    accent: '#ffb48f', visual: 'spendwise',
    highlights: [
      "Designed event-driven microservices for authentication in Go, finance in Spring Boot, vehicles in Go/Gin, and notifications and AI in FastAPI, behind a Kong gateway with Kafka-based inter-service communication.",
      "Built vehicle fuel logs with automatic efficiency and cost-per-kilometre calculations, maintenance history, and Sri Lanka-specific reminders. Vehicle events post costs to the Finance service without duplicate entry.",
      "Implemented spending insights and fuel anomaly diagnostics using the Anthropic Claude API, streamed to the mobile app through server-sent events.",
      "Built reminders and push notifications with APScheduler and Expo Push API, including deep links. Designed an offline-first app using Expo SQLite, Zustand, and TanStack Query, with a freemium paywall."
],
    screenshots: [
      { src: 'projects/spendwise/dashboard.png', alt: 'SpendWise personal finance dashboard showing budget and expenses', caption: 'Personal finance overview', kind: 'phone' },
      { src: 'projects/spendwise/vehicle.png', alt: 'SpendWise vehicle expense overview for a Toyota Aqua', caption: 'Vehicle cost and efficiency overview', kind: 'phone' },
      { src: 'projects/spendwise/vehicle-detail.jpg', alt: 'SpendWise vehicle detail screen', caption: 'Vehicle detail view', kind: 'phone' },
    ],
  },
];
