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
  visual: 'vettly' | 'hydro' | 'spendwise' | 'gymora' | 'lms';
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
    slug: 'vettly', number: '01', title: 'Vettly', eyebrow: 'AI-powered recruitment',
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
    slug: 'hydroguardian', number: '02', title: 'HydroGuardian', eyebrow: 'Connected agriculture',
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
    slug: 'spendwise', number: '03', title: 'SpendWise', eyebrow: 'Personal finance, made clearer',
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
  {
    slug: 'gymora', number: '04', title: 'Gymora', eyebrow: 'Gym operations at scale',
    summary: 'A multi-tenant gym management platform spanning memberships, coaching, payments, inventory, and reporting.',
    category: 'SaaS platform',
    tags: ["React", "Vite", "Node.js", "Express.js", "MongoDB", "Mongoose", "Socket.IO", "JWT", "PayHere", "Google Gemini API", "Zod"],
    accent: '#b5b8ff', visual: 'gymora',
    highlights: [
      "Designed and built a full-stack, multi-tenant SaaS platform during my Raxwo internship, with dedicated dashboards, permissions, and JWT access control for Super Admin, Gym Owner, Coach, and Member roles.",
      "Developed member and coach lifecycle management, subscriptions, workout and meal plan assignments, attendance, and automatic account updates when memberships expire.",
      "Implemented POS and inventory workflows for member and walk-in sales, stock updates, returns, printable bills, email receipts, and low-stock monitoring.",
      "Integrated PayHere subscription payments, SMSLenz and Nodemailer notifications, and Google Gemini API features.",
      "Built notifications and audit logs for expiring memberships, payment issues, low stock, trials, and owner/coach activity, with real-time updates through Socket.IO.",
      "Created client-side PDF and Excel reports for finance, attendance, members, and inventory using jsPDF, jspdf-autotable, and XLSX."
],
  },
  {
    slug: 'raxwolms', number: '05', title: 'RaxwoLMS', eyebrow: 'Learning, organized',
    summary: 'A multi-tenant learning and institute management system for academics, administration, and finance.',
    category: 'SaaS platform',
    tags: ["Next.js", "React", "TypeScript", "MongoDB", "Mongoose", "Tailwind CSS", "AWS S3", "JWT", "Zod", "ExcelJS", "Recharts"],
    accent: '#f3d58b', visual: 'lms',
    highlights: [
      "Architected a multi-tenant platform during my Raxwo internship, serving multiple tuition institutes from one codebase with strict server-side tenant isolation and role-based access for platform admins, institute admins, staff/teachers, and students.",
      "Developed courses, modules, lessons, quizzes, assignments, grading, examinations, attendance, class scheduling, and student progress tracking.",
      "Built fee management, concessions, payments, expenses, and bank ledgers for institutes, alongside platform subscriptions, invoicing, finance, and bank reconciliation.",
      "Integrated AWS S3 presigned URLs for secure file storage, PDF and Excel reporting, audit logs, announcements, privacy request handling, and administrative tools.",
      "Used Server Actions with dedicated data-access and mutation layers, custom JWT authentication, Zod validation, and reusable UI components for maintainable, type-safe development."
],
  },
];
