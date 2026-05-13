const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('header .nav-links');
const menuIcon = hamburger.querySelector('i');

hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    menuIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', false);
        menuIcon.className = 'fa-solid fa-bars';
    });
});

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let valid = true;

        [name, email, message].forEach(field => field.classList.remove('error'));

        if (!name.value.trim()) { name.classList.add('error'); valid = false; }
        if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            email.classList.add('error'); valid = false;
        }
        if (!message.value.trim()) { message.classList.add('error'); valid = false; }

        if (!valid) return;

        const btn = contactForm.querySelector('.btn-send');
        btn.disabled = true;
        btn.textContent = 'Sending…';

        // TODO: replace with real submission (Formspree / backend API)
        setTimeout(() => {
            contactForm.innerHTML = '<p class="form-success">Thanks! I\'ll get back to you soon.</p>';
        }, 800);
    });
}

// ─── Case Study Modal ────────────────────────────────────────────────────────
const PROJECT_DATA = {
    zeeh: {
        tag: 'API',
        title: 'Zeeh Africa',
        company: 'Open-finance API platform · Apr 2023–Feb 2024',
        summary: 'Helped build and scale an open-finance API — letting fintechs across Africa pull verified financial data from banks for fraud prevention, credit scoring, and onboarding.',
        tech: ['NestJS', 'TypeScript', 'MySQL', 'MongoDB', 'Redis', 'Docker', 'AWS'],
        problem: 'The original Express + TypeScript codebase had grown organically: scattered auth, no clear module boundaries, a single database doing every job. Onboarding a new engineer took weeks. Client integrations hit edge cases that took days to debug because almost nothing was instrumented.',
        approach: [
            'Led the migration from Express to NestJS module-by-module behind feature flags, with dual-writes proving parity before cutover.',
            'Re-modelled the data layer across three stores — MySQL for transactional records, MongoDB for unstructured institution payloads, Redis for short-lived tokens and rate-limits.',
            'Designed and built the B2B and B2C admin surfaces so non-engineers could onboard clients, manage rate-limits, and inspect failed pulls.',
            'Containerised every service with Docker and wired up AWS CodeDeploy so any engineer could ship a backend change end-to-end.',
            'Wrote the user-facing API documentation and ran integration support sessions directly with client engineering teams.',
        ],
        outcome: [
            'Backend cleanly split across B2B and B2C — engineers can now own a vertical slice end-to-end.',
            'Migration completed across the estate with zero public outages.',
            'Engineer onboarding time dropped from ~2 weeks to under 3 days.',
            "Client-integration support moved off the leadership team's plate — engineering owns it.",
        ],
    },
    konectin: {
        tag: 'Web App',
        title: 'Konectin',
        company: 'AI resume & cover letter generator · Jun 2023–Aug 2024',
        summary: 'Built the backend for an AI-powered career tool that generates tailored CVs and cover letters from user input — plus the deployment pipeline that got the team out of hand-rolled releases.',
        tech: ['Node.js', 'Express', 'MongoDB', 'Stripe', 'Puppeteer', 'Azure', 'GitHub Actions'],
        problem: 'Deployments to Azure were manual and took 15–30 minutes per push. The AI integration was inline business logic with no retries, no rate-limiting, and a flaky HTML-to-PDF step that produced inconsistent output. The codebase had grown without structure and tests were sparse.',
        approach: [
            'Wrote GitHub Actions workflows for both frontend and backend with build, test, and deploy stages on every merge.',
            'Extracted the AI integration into a clean service layer with retry-with-jitter, prompt versioning, and per-user rate-limits.',
            'Replaced the brittle PDF step with Puppeteer rendered server-side, producing pixel-accurate PDF and DOCX downloads.',
            'Integrated Stripe for paid plans and Google OAuth alongside the email/password flow.',
            'Restructured the codebase around feature folders and added endpoint tests so the next engineer was not flying blind.',
        ],
        outcome: [
            'Deploy time: 15–30 min → 3–6 min (−50–80%).',
            'CV generation went from "occasionally broken" to a reliable paid product feature.',
            'Test coverage on critical endpoints went from near-zero to the team\'s baseline.',
        ],
    },
    a1school: {
        tag: 'DevOps',
        title: 'A1School',
        company: 'Online courses marketplace · Feb 2025–Apr 2025',
        summary: 'Shipped the backend and the entire release pipeline for an Udemy-style courses marketplace built in Nigeria — including the admin tools the moderation team needed from day one.',
        tech: ['FastAPI', 'Python', 'PostgreSQL', 'Docker', 'AWS ECR', 'GitHub Actions'],
        problem: 'The team had a hard launch date and no pipeline, no release process, and no admin tooling. Anything not built on time would have to be hand-tended forever after.',
        approach: [
            'Dockerised the application with cache-friendly multi-stage builds and pushed images to AWS ECR.',
            'Built GitHub Actions pipelines for build, release, and tagging — every merge to main produces a versioned image via python-semantic-release.',
            'Designed the database ERD and built admin routes: approve/reject/ban instructors, audit trails, and a content-moderation queue.',
            'Built the email service for OTP, password reset, and transactional notifications.',
            'Implemented authentication and role-based authorization across all admin and instructor flows.',
        ],
        outcome: [
            'Releases went from ad-hoc to fully automated with semantic versioning on every merge.',
            'The moderation team had self-serve tooling from launch — no engineering escalations to handle approvals.',
            'Platform launched on schedule.',
        ],
    },
    motoz: {
        tag: 'Backend',
        title: 'Moto Zero',
        company: 'Carbon emissions routing · Nov 2023–Feb 2024',
        summary: 'Built the optimisation engine for a global carbon-emissions routing tool: given any two points and a set of transport modes, it returns the route with the lowest projected emissions.',
        tech: ['FastAPI', 'Python', 'PostgreSQL', 'DigitalOcean'],
        problem: 'The original optimiser was correct but slow — a single multi-leg route could take seconds to compute, and every UI change triggered another pass. The lag was visible on every interaction.',
        approach: [
            'Wrote ingestion endpoints to parse CSV emissions data for race circuits and other reference datasets, normalising everything into a single graph.',
            'Built the core path-finding logic that treats projected emissions as the edge weight instead of time or distance.',
            'Profiled the optimiser, replaced naive iteration with pre-computed lookups, and cached intermediate sub-paths.',
            'Tightened the API contract so the front-end only re-computes when inputs that actually affect the result change.',
        ],
        outcome: [
            'Optimisation time cut by ~50%.',
            'Route picker feels instant on typical multi-leg queries.',
            'CSV ingestion pipeline made adding new emissions datasets a one-PR task.',
        ],
    },
    housepal: {
        tag: 'Backend',
        title: 'Housepal',
        company: 'Property listing platform · Feb 2023–present',
        summary: 'Joined as a founding engineer to build the backend of a property listing platform from scratch — designed the core architecture, cloud infrastructure, and payment integrations the product runs on today.',
        tech: ['FastAPI', 'Python', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'GitHub Actions', 'Paystack'],
        problem: 'No backend existed. As a founding hire, every architectural decision would shape the platform\'s scalability and maintainability for years — with no existing codebase to inherit and no room to redesign later.',
        approach: [
            'Designed the core backend architecture and database models — PostgreSQL for relational data, MongoDB for flexible property listings.',
            'Set up AWS cloud infrastructure and GitHub Actions CI/CD so the team could deploy safely from day one.',
            'Built authentication and role-based authorisation covering landlords, tenants, and admin users.',
            'Integrated Paystack for payment processing — subscription fees, rent collection, and transaction tracking.',
            'Implemented core business logic for property listings, search, and moderation flows.',
        ],
        outcome: [
            'Platform has been live and growing since 2023 — running on the original architecture.',
            'CI/CD pipeline eliminated manual deployments from day one.',
            'Payment integration handles real transactions with no production incidents since launch.',
        ],
    },
    pilkings: {
        tag: 'Backend',
        title: 'Pilkings',
        company: 'Gaming web app · Dec 2022–Apr 2023',
        summary: 'Built the backend for a multiplayer gaming platform — secure video delivery via AWS, real-time multiplayer via WebSockets, and serverless media processing with Lambda.',
        tech: ['Node.js', 'Express', 'AWS Lambda', 'S3', 'CloudFront', 'WebSockets', 'DigitalOcean'],
        problem: 'The platform needed to serve game videos securely at scale, support real-time multiplayer sessions, and process video uploads — without managing dedicated media servers.',
        approach: [
            'Implemented AWS CloudFront and S3 signed URLs so only authenticated users could access game content — no direct S3 exposure.',
            'Built AWS Lambda functions to automatically convert and compress uploaded videos on ingestion.',
            'Developed the real-time multiplayer layer using WebSockets — game state sync, player sessions, and live notifications.',
            'Deployed on DigitalOcean with Sequelize-managed database migrations for clean schema evolution.',
        ],
        outcome: [
            'Secure video delivery enforced at the CDN layer — zero direct S3 access for end users.',
            'Video processing offloaded to Lambda — encoding runs asynchronously without blocking the main server.',
            'Real-time multiplayer shipped and stable for the platform launch.',
        ],
    },
    autodocify: {
        tag: 'Open Source',
        title: 'Autodocify',
        company: 'Open-source AI tool · Jan 2025–present',
        summary: 'Co-built an open-source tool that uses OpenAI and Gemini to automatically generate Swagger documentation, READMEs, and unit tests from a codebase — cutting the documentation burden for backend teams.',
        tech: ['Python', 'OpenAI API', 'Gemini API'],
        problem: 'Backend developers routinely defer documentation — Swagger specs, READMEs, and unit test stubs are time-consuming to write and often skipped under deadline pressure, leaving codebases hard to onboard and maintain.',
        approach: [
            'Integrated OpenAI and Gemini APIs as the generation backend, with model selection based on task type.',
            'Built a codebase parser that extracts route definitions, function signatures, and docstrings as structured context for the LLM prompts.',
            'Designed prompt templates for three output types: Swagger/OpenAPI specs, project READMEs, and unit test scaffolds.',
            'Published as open source to enable community contributions and real-world usage feedback.',
        ],
        outcome: [
            'Generates production-ready Swagger docs, READMEs, and unit test stubs in seconds from a live codebase.',
            'Open source — available for the backend community to use and contribute to.',
            'Actively maintained with new model integrations ongoing.',
        ],
    },
};

const modal = document.getElementById('caseStudyModal');
const modalClose = document.getElementById('modalClose');

function openModal(key) {
    const d = PROJECT_DATA[key];
    if (!d) return;

    document.getElementById('modalTag').textContent = d.tag;
    document.getElementById('modalTitle').textContent = d.title;
    document.getElementById('modalCompany').textContent = d.company;
    document.getElementById('modalSummary').textContent = d.summary;
    document.getElementById('modalProblem').textContent = d.problem;
    document.getElementById('modalTechList').innerHTML = d.tech
        .map(t => `<span class="modal-tech-chip">${t}</span>`)
        .join('');
    document.getElementById('modalApproach').innerHTML = d.approach
        .map(item => `<li>${item}</li>`)
        .join('');
    document.getElementById('modalOutcome').innerHTML = d.outcome
        .map(item => `<li>${item}</li>`)
        .join('');

    // Force animation replay on reopen
    const dialog = modal.querySelector('.modal-dialog');
    dialog.style.animation = 'none';
    dialog.offsetHeight; // trigger reflow
    dialog.style.animation = '';

    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
}

function closeModal() {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
}

document.querySelectorAll('[data-project]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.project));
});

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
});
