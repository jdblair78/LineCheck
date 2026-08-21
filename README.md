# LineCheck

**A modern restaurant food-safety and operations platform built with Next.js, TypeScript, Supabase, and Tailwind CSS.**

LineCheck replaces paper-based restaurant line checks with a responsive digital workflow for creating checklists, completing food-safety tasks, documenting corrective actions, and monitoring operational compliance.

> **Status:** 🚧 Active Development
> **Focus:** Full-stack SaaS architecture • Responsive UI • Authentication • Restaurant operations

## 🚀 Live Demo

**Live Application:** [View LineCheck]
https://line-check-two.vercel.app/dashboard
Use the **Explore Live Demo** option on the login page to explore LineCheck without creating an account.

---

## 📸 Application Preview

*Add screenshots or GIFs here as the application develops.*

Recommended screenshots:

* Dashboard
* Checklist management
* Checklist builder
* Task editor
* Mobile checklist experience

---

## About the Project

Restaurant teams perform routine line checks throughout the day to verify food temperatures, sanitation, equipment condition, cleanliness, and operational readiness.

Traditional paper logs create several problems:

* Records can be lost or incomplete
* Temperature violations may not receive immediate attention
* Managers have limited visibility across shifts
* Corrective actions are difficult to track
* Historical records are difficult to search
* Preparing documentation for inspections takes additional time

**LineCheck turns those workflows into a structured digital system.**

Managers can create reusable operational checklists, configure different task types, monitor completion, and review restaurant performance from a centralized dashboard.

Employees will be able to complete assigned checks from a phone, tablet, or desktop while LineCheck validates required information and identifies potential food-safety issues.

---

## ✨ Current Features

### Authentication & Security

* User signup and login
* Supabase authentication
* Protected dashboard routes
* Automatic user profile creation
* Session management
* Secure logout flow
* Environment-based configuration

### Operations Dashboard

* Restaurant operations overview
* Compliance metrics
* Weekly compliance visualization
* Operational reminders
* Equipment alerts
* Team overview
* Responsive navigation
* User profile menu
* Dark-mode support

### Checklist Management

Managers can create and manage operational checklists with:

* Checklist name
* Restaurant location
* Category
* Shift
* Estimated completion time
* Active/inactive status
* Dynamic task counts

### Checklist Builder

LineCheck includes a reusable task-building system supporting multiple operational task types.

Current task types include:

* ✅ Checkbox tasks
* 🌡️ Temperature checks
* 📷 Photo verification
* 📝 Notes
* 🔢 Numeric entries
* 🕐 Time entries
* ⚠️ Corrective actions

Tasks can contain:

* Custom instructions
* Required/optional status
* Minimum values
* Maximum values
* Measurement units
* Corrective-action requirements

The task editor dynamically changes based on the selected task type.

### Demo Experience

LineCheck includes a demo workflow so recruiters and visitors can explore the application without creating a permanent account.

Demo checklist data and tasks can be persisted locally in the browser while the production database integration continues to be developed.

---

## 🧠 Smart Food-Safety Validation

One of LineCheck's primary goals is to make operational problems visible immediately.

For example, temperature-based tasks can define an acceptable range:

```text
Walk-In Cooler Temperature

Minimum: 34°F
Maximum: 41°F
```

The completed employee workflow is being designed to detect values outside the configured range and:

1. Flag the task
2. Display a visual warning
3. Require corrective-action documentation
4. Prevent incomplete submissions
5. Preserve the incident for historical reporting

This creates accountability at the moment a food-safety issue occurs rather than discovering the problem later during a record review.

---

## 🛠️ Tech Stack

### Frontend

* **Next.js 16** — App Router and application architecture
* **React** — Component-based UI
* **TypeScript** — Type-safe application models
* **Tailwind CSS v4** — Responsive design system
* **Base UI** — Accessible UI primitives
* **Lucide React** — Interface icons
* **Recharts** — Dashboard data visualization

### Backend & Authentication

* **Supabase**
* Supabase Authentication
* PostgreSQL database
* Server-side session handling
* Database triggers for profile creation

### Deployment

* **Vercel**
* Environment-based production configuration
* GitHub-based deployment workflow

---

## 🏗️ Application Architecture

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   │
│   └── (dashboard)/
│       ├── dashboard/
│       ├── checklists/
│       ├── equipment/
│       ├── history/
│       ├── reports/
│       └── settings/
│
├── components/
│   ├── auth/
│   ├── checklists/
│   ├── dashboard/
│   ├── layout/
│   └── ui/
│
└── lib/
    ├── supabase/
    ├── checklist-task.ts
    └── checklist-task-types.ts
```

The project uses reusable UI and domain components rather than styling each screen independently.

---

## 🎨 Design System

LineCheck includes a reusable application design system covering:

* Brand colors
* Semantic success, warning, danger, and information states
* Typography hierarchy
* Consistent spacing
* Border radius
* Shadows and elevation
* Buttons and variants
* Inputs
* Cards
* Badges
* Form states
* Responsive layouts

This allows new features to share the same visual language without recreating styles for every page.

---

## 👥 Application Roles

LineCheck is being designed around a role-based restaurant hierarchy.

### Managers

Managers will be able to:

* Create and edit checklists
* Configure checklist tasks
* Define operational standards
* Manage restaurant employees
* Review completed checks
* Review equipment alerts
* Document corrective actions
* Access reports and history
* Configure restaurant settings

### Employees

Employees will be able to:

* View assigned checks
* Complete checklist tasks
* Record temperatures
* Submit photos and notes
* Document corrective actions
* Review equipment alerts
* Submit completed checks

---

## 🗺️ Application Routes

```text
/login                 Authentication
/signup                Account creation
/dashboard             Restaurant operations dashboard

/checklists             Checklist management
/checklists/new         Create checklist
/checklists/[id]        Checklist builder

/history                Completed check history
/reports                Compliance reporting
/equipment              Equipment alerts
/settings               Restaurant settings
/profile                User profile
```

Additional execution and inspection routes will be introduced as development continues.

---

## 💻 Running LineCheck Locally

### Prerequisites

Install:

* Node.js
* npm
* Git

You will also need a Supabase project for authentication and database functionality.

### 1. Clone the repository

```bash
git clone https://github.com/jdblair78/LineCheck.git
```

### 2. Enter the project

```bash
cd LineCheck
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create:

```text
.env.local
```

Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Never commit `.env.local` or private credentials to GitHub.

### 5. Start the development server

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

### Production Build

```bash
npm run build
```

---

## 🧩 Current Development Focus

The checklist builder is currently under active development.

### Completed

* [x] Next.js application architecture
* [x] Responsive dashboard
* [x] LineCheck design system
* [x] Supabase authentication
* [x] Signup and login
* [x] Protected dashboard routes
* [x] Logout flow
* [x] User profile creation
* [x] Checklist management interface
* [x] Checklist creation workflow
* [x] Task type selection
* [x] Dynamic task editor
* [x] Demo checklist persistence

### In Progress

* [ ] Improved task list UI
* [ ] Edit checklist tasks
* [ ] Delete tasks
* [ ] Duplicate tasks
* [ ] Drag-and-drop task ordering
* [ ] Supabase checklist persistence

### Planned

* [ ] Employee checklist execution
* [ ] Temperature validation
* [ ] Corrective-action workflows
* [ ] Restaurant management
* [ ] Employee management
* [ ] Checklist history
* [ ] Equipment tracking
* [ ] Reporting and analytics
* [ ] Inspection-ready records

---

## 🔭 Product Roadmap

### Checklist Builder

Complete the manager experience for creating, editing, organizing, and assigning operational checklists.

### Employee Execution

Build a mobile-first interface that allows restaurant employees to quickly complete assigned checks during active shifts.

### Data Persistence

Move checklist and task persistence from the demo browser workflow into the Supabase PostgreSQL database.

### Operations & Reporting

Connect completed checks to dashboard metrics, history, equipment alerts, corrective actions, and reporting.

### Multi-Restaurant Architecture

Expand LineCheck to support restaurant groups with brand-level standards and location-level management.

---

## ♿ Accessibility & UX Goals

LineCheck is designed for employees working in active restaurant environments where speed and clarity matter.

The interface prioritizes:

* Large touch-friendly controls
* Responsive mobile layouts
* Clear form labels
* Strong visual hierarchy
* Visible focus states
* Keyboard navigation
* Semantic status indicators
* Errors that do not rely solely on color
* Accessible reusable components

---

## 💡 What This Project Demonstrates

LineCheck is a portfolio project focused on demonstrating more than individual UI components.

It showcases experience with:

* Building a full SaaS-style application
* Next.js App Router architecture
* React component design
* TypeScript data modeling
* Supabase authentication
* PostgreSQL-backed application architecture
* Protected application routes
* Reusable component systems
* Responsive product design
* Dynamic forms
* Client-side state management
* Data visualization
* Production deployment with Vercel
* Git and GitHub development workflows

---

## Future Features

Future development may include:

* Multi-location restaurant management
* Brand and district-level dashboards
* Missed-check notifications
* Equipment maintenance records
* Photo attachments
* Employee signatures
* Offline checklist support
* CSV/PDF reporting
* Inspection-ready audit views
* Restaurant performance comparisons
* Subscription and billing support

---

## Food-Safety Disclaimer

LineCheck is an operational recordkeeping and checklist-management tool. It does not replace employee training, local health-code requirements, certified food-safety procedures, or professional regulatory guidance.

Restaurant operators are responsible for configuring operational requirements and temperature ranges according to applicable regulations and company policies.

---

## 👨‍💻 Developer

**Joshua Blair**
Frontend Developer

[Portfolio](https://profile-1-coral.vercel.app/) • [GitHub](https://github.com/jdblair78) • [LinkedIn](https://www.linkedin.com/in/joshua-blair-4310a183/)

---

## License

LineCheck is currently being developed as a portfolio and educational project. Licensing terms will be determined before any public commercial release.
