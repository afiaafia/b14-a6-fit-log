# FITLOG

> **Train with intent. Log every set.**

FITLOG is a responsive workout library and personal workout-planning web application built with **Next.js, TypeScript, and Tailwind CSS**. Users can explore workouts, view detailed exercise information, add workouts to today's plan, save workouts for later, track plan metrics, mark workouts as completed, and manage their selections from a dedicated dashboard.

## 🌐 Live Website

**[FITLOG — Live Demo](https://b14-a6-fit-log-six.vercel.app/)**

## ✨ Features

- **Workout Library** — Browse workouts with exercise name, image, muscle groups, equipment, duration, calories, rating, and difficulty.
- **Workout Details** — View complete workout information including description, muscle groups, equipment, difficulty, sets, reps, rest, duration, calories, rating, and step-by-step instructions.
- **Add to Today's Plan** — Add a workout to today's plan directly from its details page.
- **Save for Later** — Save workouts separately for quick access without adding them to today's plan.
- **Live Plan Metrics** — Track exercise count, total workout minutes, and estimated calories for today's plan.
- **Workout Completion** — Mark planned workouts as completed with visual feedback and toast notifications.
- **Remove Workouts** — Remove workouts from Today's Plan or Saved workouts.
- **Workout Sorting** — Sort workouts by duration, calories, or rating, with duration as the default sorting option.
- **Persistent Data** — Today's Plan, Saved workouts, and completion state persist in browser local storage.
- **Loading & 404 States** — Provides loading feedback while workouts are fetched and handles invalid routes with a custom 404 page.
- **Toast Notifications** — Gives relevant feedback after actions such as adding, saving, completing, or removing workouts.
- **Responsive Design** — Optimized for desktop, tablet, and mobile screen sizes.
- **API Integration** — Workout data is fetched from the provided FitLog REST API.

## 🛠️ Technologies

- **Next.js 16** — React framework with App Router
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Lucide React** — Icons
- **React Toastify** — Toast notifications
- **REST API** — Workout data
- **LocalStorage** — Client-side persistence
- **pnpm** — Package manager

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
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── footer/
│   │   │   └── Footer.tsx
│   │   ├── hero/
│   │   │   └── Hero.tsx
│   │   ├── navbar/
│   │   │   ├── Navbar.tsx
│   │   │   └── NavbarWrapper.tsx
│   │   ├── sort-dropdown/
│   │   │   └── SortDropdown.tsx
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

Make sure the following are installed:

* [Node.js](https://nodejs.org/)
* [pnpm](https://pnpm.io/)

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

### Run lint

```bash
pnpm lint
```

### Build for production

```bash
pnpm build
```

### Start the production server

```bash
pnpm start
```

## 🔄 Application Flow

```text
Home / Workout Library
        │
        ├── Browse & Sort Workouts
        │
        └── Select a Workout
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
    Mark as Done    Remove
```

## 📱 Pages & Routes

### Home — `/`

The home page contains:

* Responsive navigation bar
* Hero section
* Workout library
* Workout sorting
* Responsive workout cards
* Footer

The **Browse Workouts** button scrolls to the workout library section.

### Workout Details — `/workout/[id]`

Each workout has a dedicated dynamic detail page containing:

* Workout image
* Name and description
* Muscle groups
* Equipment
* Difficulty
* Duration
* Calories
* Rating
* Sets, reps, and rest
* Step-by-step instructions
* **Add to Today's Plan**
* **Save for Later**

### My Plan — `/my-plan`

The My Plan dashboard contains:

* Today's Plan and Saved tabs
* Exercise count
* Total duration
* Estimated calories
* Workout cards
* View Details action
* Mark as Done action
* Remove action
* Empty states
* Workout sorting

The Saved tab is also accessible from the navbar.

### 404 — Invalid Routes

Invalid routes are handled with a custom not-found page.

## 🔌 API Integration

FITLOG retrieves workout information from the provided FitLog REST API.

The application uses:

```text
GET https://api.abcz.workers.dev/api/fitlog
GET https://api.abcz.workers.dev/api/fitlog/:id
```

Workout data includes:

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

The project also contains Next.js API route handlers under:

```text
src/app/api/workouts/
```

## 💾 Data Persistence

FITLOG uses **browser localStorage** to preserve:

* Today's Plan
* Saved workouts
* Workout completion state

This allows selected workouts and their completion state to remain available after refreshing the page.

Today's Plan supports a maximum of **5 workouts**.

## 📊 Workout Management

Users can:

1. Browse available workouts.
2. Sort workouts by duration, calories, or rating.
3. Open a workout's detail page.
4. Add a workout to Today's Plan.
5. Save a workout for later.
6. View Today's Plan and Saved workouts.
7. Track total exercises, minutes, and calories.
8. Mark planned workouts as completed.
9. Remove workouts from the plan or saved list.
10. View workout details again from My Plan.

## 📐 Responsive Design

The interface is designed for:

* Desktop
* Laptop
* Tablet
* Mobile

The navigation, hero section, workout library, workout cards, detail page, and My Plan dashboard adapt to different viewport sizes.

## 📦 Available Scripts

| Command      | Description                   |
| ------------ | ----------------------------- |
| `pnpm dev`   | Starts the development server |
| `pnpm lint`  | Runs ESLint                   |
| `pnpm build` | Creates a production build    |
| `pnpm start` | Starts the production server  |

## 🌐 Deployment

FITLOG is deployed on **Vercel**.

**Live Website:**
[https://b14-a6-fit-log-six.vercel.app/](https://b14-a6-fit-log-six.vercel.app/)

## 📄 Project Information

| Item                | Details                           |
| ------------------- | --------------------------------- |
| **Project**         | FITLOG                            |
| **Type**            | Workout Library & Workout Planner |
| **Framework**       | Next.js 16                        |
| **Language**        | TypeScript                        |
| **Styling**         | Tailwind CSS                      |
| **Architecture**    | Next.js App Router                |
| **Data Source**     | FitLog REST API                   |
| **Persistence**     | Browser localStorage              |
| **Package Manager** | pnpm                              |
| **Deployment**      | Vercel                            |

## 🔗 Links

* **Live Website:** [https://b14-a6-fit-log-six.vercel.app/](https://b14-a6-fit-log-six.vercel.app/)
* **GitHub Repository:** [https://github.com/afiaafia/b14-a6-fit-log](https://github.com/afiaafia/b14-a6-fit-log)

---

> **FITLOG — Train with intent. Log every set.**

````

