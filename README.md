# FITLOG

> **Train with intent. Log every set.**

FITLOG is a responsive workout library and personal workout-planning web application built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It allows users to explore workouts, view detailed exercise information, add exercises to today’s plan, save workouts for later, and manage their workout plan from a dedicated dashboard.

## ✨ Features

* **Workout Library** — Browse workouts covering different muscle groups with duration, calories, rating, equipment, and difficulty information.
* **Workout Details** — View complete exercise information including description, muscle groups, equipment, difficulty, sets, reps, duration, calories, rating, and step-by-step instructions.
* **Today’s Plan** — Add workouts to a personal plan and manage them from the My Plan page.
* **Save for Later** — Save workouts for quick access without adding them to today’s plan.
* **Live Plan Metrics** — Track the number of exercises, total workout minutes, and estimated calories in the current plan.
* **Workout Completion** — Mark planned workouts as completed and receive feedback through toast notifications.
* **Remove Workouts** — Remove exercises from Today’s Plan or Saved workouts.
* **Responsive Design** — Optimized for desktop, tablet, and mobile screen sizes.
* **Workout Sorting** — Sort the current workout list by duration, calories, or rating.
* **Persistent Data** — Workout plan and saved workouts are persisted using browser local storage.
* **Loading & Error States** — Includes workout loading feedback, invalid-route handling, and relevant user feedback.
* **API Integration** — Workout data is fetched from the provided FitLog workout API.

## 🛠️ Technologies

* **Next.js 16**
* **React**
* **TypeScript**
* **Tailwind CSS**
* **Next.js App Router**
* **Lucide React** — Icons
* **React Toastify** — Toast notifications
* **REST API** — Workout data
* **LocalStorage** — Client-side plan and saved-workout persistence
* **pnpm** — Package manager

## 📁 Project Structure

```text
fit-log/
├── public/
│   └── images/
│       ├── hero/
│       │   └── banner.png
│       └── icons/
│           └── logo.png
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── workouts/
│   │   │       ├── [id]/
│   │   │       │   └── route.ts
│   │   │       └── route.ts
│   │   │
│   │   ├── my-plan/
│   │   │   └── page.tsx
│   │   │
│   │   ├── workout/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── footer/
│   │   │   └── Footer.tsx
│   │   ├── hero/
│   │   │   └── Hero.tsx
│   │   ├── navbar/
│   │   │   └── Navbar.tsx
│   │   ├── workout-card/
│   │   │   └── WorkoutCard.tsx
│   │   └── workout-details/
│   │       ├── WorkoutActions.tsx
│   │       └── WorkoutDetails.tsx
│   │
│   ├── context/
│   │   └── FitLogContext.tsx
│   │
│   ├── data/
│   │   └── workout.ts
│   │
│   ├── lib/
│   │   └── api.ts
│   │
│   └── types/
│       └── workout.ts
│
├── .gitignore
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* pnpm

### Clone the repository

```bash
git clone https://github.com/afiaafia/b14-a6-fit-log.git
```

### Go to the project directory

```bash
cd b14-a6-fit-log
```

### Install dependencies

```bash
pnpm install
```

### Run the development server

```bash
pnpm dev
```

The application will be available at:

```text
http://localhost:3000
```

### Build for production

```bash
pnpm build
```

### Start the production server

```bash
pnpm start
```

### Run lint

```bash
pnpm lint
```

## 🔄 Application Flow

```text
Workout Library
      │
      ├── Browse workouts
      │
      └── Select a workout
              │
              ▼
       Workout Details
              │
        ┌─────┴─────┐
        │           │
        ▼           ▼
 Add to Plan   Save for Later
        │           │
        └─────┬─────┘
              ▼
           My Plan
              │
        ┌─────┴─────┐
        │           │
        ▼           ▼
   Mark as Done   Remove
```

## 📱 Pages

### Home

The home page contains:

* Navigation bar
* Hero section
* Workout library
* Workout sorting
* Responsive workout cards
* Footer

### Workout Details

Each workout has a dedicated dynamic route:

```text
/workout/[id]
```

The page provides complete workout information and actions for adding or saving the workout.

### My Plan

The workout management dashboard is available at:

```text
/my-plan
```

It contains:

* Today's Plan
* Saved workouts
* Exercise count
* Total duration
* Estimated calories
* Workout completion
* Remove actions
* Empty states

### 404 Page

Invalid routes are handled with a custom not-found page.

## 🔌 API

FITLOG retrieves workout information from the provided workout API.

The application uses API functions for:

```text
GET /api/fitlog
GET /api/fitlog/:id
```

Workout data includes information such as:

* Name
* Description
* Image
* Muscle groups
* Equipment
* Difficulty
* Duration
* Calories
* Rating
* Sets
* Reps
* Rest
* Instructions

## 💾 Data Persistence

FITLOG uses **localStorage** to preserve:

* Today's Plan
* Saved workouts
* Workout completion state

This allows the user's selected workouts to remain available after refreshing the page.

## 📊 Workout Management

Users can:

1. Browse available workouts.
2. Sort workouts by duration, calories, or rating.
3. Open a workout's details.
4. Add a workout to Today's Plan.
5. Save a workout for later.
6. View selected workouts from My Plan.
7. Mark a workout as completed.
8. Remove workouts from the plan.
9. View live workout metrics.

## 📐 Responsive Design

The interface is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

The workout library and My Plan layout adapt to different viewport sizes while maintaining usability.

## 📦 Available Scripts

| Command      | Description                   |
| ------------ | ----------------------------- |
| `pnpm dev`   | Starts the development server |
| `pnpm build` | Creates a production build    |
| `pnpm start` | Starts the production server  |
| `pnpm lint`  | Runs ESLint                   |

## 🌐 Deployment

The application can be deployed using platforms that support Next.js, such as Vercel.

Before deployment, verify:

```bash
pnpm lint
pnpm build
```

Then test the deployed application by:

* Opening the home page
* Opening a workout details page
* Opening `/my-plan`
* Testing Add to Plan
* Testing Save for Later
* Testing Mark as Done
* Testing Remove
* Refreshing different routes
* Checking invalid routes

## 📌 Project Information

**Project:** FITLOG
**Type:** Workout Library & Workout Planner
**Framework:** Next.js
**Language:** TypeScript
**Styling:** Tailwind CSS
**Package Manager:** pnpm

## 👤 Submission

**Live Website:**
*Add your deployed Vercel/Netlify URL here*

**GitHub Repository:**
[FITLOG GitHub Repository](https://github.com/afiaafia/b14-a6-fit-log?utm_source=chatgpt.com)

---

> **FITLOG — Train with intent. Log every set.**
