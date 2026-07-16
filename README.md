# ✅ LineCheck

A mobile-first food-safety and kitchen-management platform built for restaurant teams.

LineCheck replaces paper clipboard logs with digital checklists that managers can create once and employees can complete from any phone, tablet, or computer.

> **Project Status:** In active development

## Overview

Restaurants rely on regular line checks to verify food temperatures, equipment conditions, cleanliness, and operational readiness.

Paper-based checks can be difficult to manage because they are easy to lose, hard to audit, and time-consuming to review. LineCheck creates a structured digital workflow for completing, tracking, and reviewing food-safety checks.

The platform is being designed as a real SaaS application with authentication, persistent cloud data, responsive interfaces, automated validation, reporting, and deployment.

## The Problem

Traditional paper line checks can lead to:

* Missing or incomplete records
* Illegible handwriting
* Incorrect food-temperature entries
* Delayed corrective action
* Difficulty identifying recurring problems
* Limited visibility across restaurant shifts
* Time-consuming preparation for inspections

## The Solution

LineCheck gives restaurant managers and employees a centralized platform for creating, running, and reviewing operational checklists.

Managers can define checklist requirements and acceptable temperature ranges. Employees can then complete those checks using a streamlined mobile interface.

When a value falls outside an acceptable range, LineCheck flags the item and requires the employee to document the corrective action before submission.

## Core Features

### Dashboard

The dashboard provides a quick overview of restaurant operations, including:

* Today’s scheduled checks
* Completed and incomplete checks
* Flagged checklist items
* Recent activity
* Completion streaks
* Overall food-safety status

### Checklist Builder

Managers can create reusable restaurant checklists with:

* Custom checklist names
* Scheduled completion windows
* Pass-or-fail items
* Temperature-entry items
* Minimum acceptable temperatures
* Maximum acceptable temperatures
* Required and optional fields
* Custom item instructions

### Run Check

Employees can complete assigned checks from a phone or tablet.

The check-running experience includes:

* Mobile-first layout
* Large touch-friendly controls
* Numeric temperature input
* Pass-or-fail selections
* Real-time validation
* Visual warnings for failed items
* Required corrective-action notes
* Submission blocking when required information is missing

### History

Completed checks are stored in a searchable history.

Each record can include:

* Checklist name
* Completion date and time
* Employee who completed the check
* Recorded temperatures
* Passed and failed items
* Corrective-action notes
* Flagged equipment or food items

Planned history tools include:

* Date filtering
* Employee filtering
* Checklist filtering
* CSV export

### Reports

The reporting area will help managers recognize food-safety and operational trends.

Planned reporting includes:

* Checklist completion rates
* Most frequently flagged items
* Temperature history
* Corrective-action frequency
* Repeated equipment issues
* Visual charts and performance trends

## Smart Validation

Temperature-based checklist items include acceptable minimum and maximum values.

When an employee enters a temperature outside the approved range, LineCheck will:

1. Mark the item as failed
2. Display a clear visual warning
3. Require a corrective-action note
4. Prevent incomplete submission
5. Save the incident for future reporting

This workflow helps teams respond to food-safety problems immediately instead of discovering them later during a record review.

## Planned Advanced Features

### Equipment Watch

LineCheck will identify items that have been flagged multiple times within a short period.

For example, equipment flagged twice within seven days may be added to an equipment-watch list so managers can investigate recurring problems.

### Inspector View

Managers will be able to generate a secure, read-only link that displays recent food-safety records.

The inspector view is planned to include:

* The previous 30 days of completed checks
* Completion timestamps
* Recorded temperatures
* Corrective actions
* Flagged checklist items

This view will not allow inspectors or external users to edit restaurant data.

## Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Recharts

### Backend and Data

* Firebase Authentication
* Cloud Firestore

### Testing and Automation

* Jest
* React Testing Library
* GitHub Actions

### Deployment

* Vercel

## Why These Technologies?

### Next.js

Next.js provides routing, rendering, performance optimization, and a scalable structure for building a production-ready SaaS application.

### TypeScript

TypeScript improves reliability by providing type safety for users, restaurants, checklists, checklist items, and completed records.

### Firebase

Firebase Authentication and Firestore provide user management and real-time cloud data without requiring a separate custom backend during the initial development stage.

### Tailwind CSS

Tailwind CSS supports rapid development of a consistent, responsive, and mobile-first interface.

### Recharts

Recharts will be used to visualize completion rates, temperature trends, and recurring food-safety issues.

## Application Roles

### Manager

Managers will be able to:

* Create and edit checklists
* Define acceptable temperature ranges
* Schedule checklist windows
* Review completed checks
* View flagged items
* Read corrective-action notes
* Access reports
* Export records

### Employee

Employees will be able to:

* View assigned checks
* Complete checklists
* Enter temperatures
* Mark pass-or-fail items
* Document corrective actions
* Submit completed checks

## Planned Application Routes

```text
/                   Marketing or sign-in page
/login              User authentication
/dashboard          Restaurant overview
/checklists         Checklist management
/checklists/new     Create a checklist
/checklists/[id]    View or edit a checklist
/run/[id]           Complete a scheduled check
/history            Completed check records
/reports            Trends and reporting
/settings           Account and restaurant settings
/inspect/[token]    Secure read-only inspector view
```

## Data Model

LineCheck is being structured around several primary data types.

### User

```typescript
type User = {
  id: string;
  name: string;
  email: string;
  role: "manager" | "employee";
  restaurantId: string;
};
```

### Checklist

```typescript
type Checklist = {
  id: string;
  restaurantId: string;
  name: string;
  startTime: string;
  endTime: string;
  items: ChecklistItem[];
  createdBy: string;
  createdAt: Date;
};
```

### Checklist Item

```typescript
type ChecklistItem = {
  id: string;
  label: string;
  type: "passFail" | "temperature";
  required: boolean;
  minimumTemperature?: number;
  maximumTemperature?: number;
};
```

### Completed Check

```typescript
type CompletedCheck = {
  id: string;
  checklistId: string;
  restaurantId: string;
  completedBy: string;
  completedAt: Date;
  responses: CheckResponse[];
  hasFlaggedItems: boolean;
};
```

## Getting Started

### Prerequisites

Make sure the following tools are installed:

* Node.js
* npm
* Git
* A Firebase account

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Open the Project

```bash
cd linecheck
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root of the project:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Do not commit `.env.local` to GitHub.

### 5. Start the Development Server

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Next.js development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Production Server

```bash
npm start
```

Runs the optimized production build locally.

### Testing

```bash
npm test
```

Runs the automated test suite.

### Linting

```bash
npm run lint
```

Checks the project for code-quality and formatting issues.

## MVP Requirements

The initial LineCheck release will include:

* User authentication
* Manager and employee roles
* Checklist creation
* Pass-or-fail checklist items
* Temperature checklist items
* Mobile checklist completion
* Required corrective-action notes
* Submission validation
* Completed-check history
* Dashboard status overview
* Firestore data persistence
* Automated testing
* Vercel deployment

## Development Roadmap

### Phase 1 — Foundation

* Set up Next.js and TypeScript
* Configure Tailwind CSS
* Create the application layout
* Define TypeScript data models
* Configure Firebase

### Phase 2 — Authentication and Checklists

* Add user authentication
* Implement manager and employee roles
* Build the checklist dashboard
* Create the checklist builder
* Store checklists in Firestore

### Phase 3 — Check Execution

* Build the mobile-first check workflow
* Add pass-or-fail controls
* Add temperature inputs
* Validate acceptable ranges
* Require corrective-action notes
* Save completed checks

### Phase 4 — History and Dashboard

* Build completed-check history
* Add filtering
* Display status summaries
* Show recent activity
* Complete the MVP deployment

### Phase 5 — Testing and Automation

* Add component tests
* Add workflow tests
* Configure GitHub Actions
* Test validation and submission behavior

### Phase 6 — Reporting and Launch

* Add reporting charts
* Add CSV export
* Improve accessibility
* Polish responsive layouts
* Complete project documentation
* Launch the production version

## Accessibility Goals

LineCheck is being designed for fast use in active restaurant environments.

Accessibility goals include:

* Large touch-friendly controls
* Clear labels
* Strong visual contrast
* Keyboard navigation
* Visible focus states
* Screen-reader-friendly forms
* Error messages that do not rely on color alone
* Responsive support for phones and tablets

## What I Am Learning

This project is strengthening my understanding of:

* Planning and building a full SaaS application
* Developing with Next.js and TypeScript
* Designing mobile-first workflows
* Managing authentication and user roles
* Structuring Firestore collections
* Building dynamic forms
* Validating operational data
* Creating reusable React components
* Writing component and integration tests
* Configuring continuous integration
* Visualizing data with charts
* Deploying production applications with Vercel

## Future Improvements

After the MVP is complete, possible improvements include:

* Multiple restaurant locations
* Corporate and district-manager dashboards
* Push and email notifications
* Missed-check alerts
* Custom checklist scheduling
* Equipment maintenance records
* Photo attachments
* Employee signatures
* Offline checklist support
* PDF report generation
* Inspection-ready audit reports
* Subscription plans and billing
* Restaurant performance comparisons

## Food-Safety Disclaimer

LineCheck is an operational recordkeeping and checklist-management tool.

It does not replace employee training, local health-code requirements, certified food-safety procedures, or professional regulatory guidance. Restaurant operators are responsible for configuring checklist requirements and temperature ranges according to applicable laws and company policies.

## Author

**Joshua Blair**

Frontend Developer

* [GitHub](https://github.com/jdblair78)
* [LinkedIn](https://www.linkedin.com/in/joshua-blair-4310a183)

## License

This project is being developed for educational and portfolio purposes. Licensing information will be added before public production use.


 
 
