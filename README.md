# AI Course Generator

## Project Overview
A Next.js platform that generates personalized educational content across diverse categories using advanced AI technologies and dynamic multimedia integration.

---

## Features
- **AI-Powered Course Generation**: Connected to the Google Gemini API to generate detailed, topic-relevant course content.
- **Dynamic Video Integration**: Integrated YouTube API to embed relevant videos within courses.
- **Customizable Learning Experience**: Users can adjust course difficulty, duration, chapters, multimedia, and metadata through an interactive dashboard.
- **Secure Authentication**: Implemented Clerk authentication for user sign-up, login, and access management.
- **Robust Data Handling**: Leveraged Drizzle ORM with PostgreSQL for secure, scalable storage of course data and user information.
- **Next.js Frontend**: Responsive, dynamic, and user-friendly interface.

---

## Technologies Used
- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Drizzle ORM, PostgreSQL
- **Authentication**: Clerk
- **APIs**: Google Gemini API, YouTube API
- **Deployment**: Vercel (recommended for Next.js)

---
## Installation & Setup

### Step 1: Clone the repository

git clone https://github.com/YourUsername/AI-Course-Generator.git
### step2: Navigate to the project directory

cd AI-Course-Generator
### step3: Install dependencies

npm install
### step4:Set up environment variables

Create a .env.local file in the root directory and add:

NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key,
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key,
CLERK_FRONTEND_API=your_clerk_frontend_api,
DATABASE_URL=your_postgres_connection_string

### step5: Run the development server

npm run dev
### Step 6: Open the app in your browser

Go to http://localhost:3000
