<div align="center">

# 📚 StudyNotion

### A Full-Stack EdTech Platform to Create, Sell & Learn Courses

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://study-notion-hosting-ip775hty8-vasudev-gupta-s-projects.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/VasudevGupta73/STUDYNOTION-APP)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)

---

## 🌟 Overview

**StudyNotion** is a production-ready, full-stack ed-tech web application that enables instructors to create and publish courses, and students to browse, purchase, and learn from them — all in one platform.

The platform supports three distinct user roles — **Student**, **Instructor**, and **Admin** — each with their own dashboard, permissions, and workflows. It features OTP-based email verification, Razorpay payment integration, Cloudinary media management, and real-time course-progress tracking.

> 🔗 **Live:** [studynotion on Vercel](https://study-notion-hosting-ip775hty8-vasudev-gupta-s-projects.vercel.app/)

---

## ✨ Features

### 👨‍🎓 Student
- Browse and search courses by category, tags, or keyword
- View course details, ratings, reviews, and what-you-will-learn sections
- Purchase courses via **Razorpay** payment gateway
- Track learning progress with a **visual progress bar** per course
- Resume courses mid-way — progress is saved per sub-section
- Rate and review enrolled courses
- Manage profile, avatar, and account settings

### 👨‍🏫 Instructor
- Create, edit, and delete courses with a rich course builder
- Add **Sections** and **Sub-sections** (video lectures, descriptions, timeDuration)
- Upload lecture videos and course thumbnails to **Cloudinary**
- View enrolled student count and revenue analytics on an **Instructor Dashboard** (Chart.js)
- Publish / keep courses in Draft mode
- Manage all created courses from a dedicated panel

### 🛡️ Admin
- Manage course categories
- View platform-wide data

### 🔐 Authentication & Security
- OTP-based email verification on signup via **Nodemailer**
- JWT-based stateless authentication with protected routes
- Passwords hashed using **bcrypt**
- Password reset via secure email token link

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React.js | UI library |
| Redux Toolkit | Global state management |
| React Router DOM v6 | Client-side routing |
| Tailwind CSS | Utility-first styling |
| React Hook Form | Form handling & validation |
| Chart.js + react-chartjs-2 | Instructor revenue analytics |
| Axios | HTTP client |
| React Hot Toast | Notifications |
| Video React | Lecture video player |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express.js | Server & REST API |
| MongoDB + Mongoose | Database & ODM |
| JWT | Authentication tokens |
| bcrypt | Password hashing |
| Nodemailer | OTP & transactional emails |
| Razorpay SDK | Payment gateway |
| Cloudinary | Media storage (videos, images) |
| express-fileupload | File upload handling |
| otp-generator | OTP creation |
| node-schedule | Scheduled tasks |

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────┐
│                   CLIENT (React)                │
│  ┌──────────┐  ┌────────────┐  ┌─────────────┐ │
│  │  Student │  │ Instructor │  │    Admin    │ │
│  │ Dashboard│  │  Dashboard │  │   Panel     │ │
│  └────┬─────┘  └─────┬──────┘  └──────┬──────┘ │
└───────┼──────────────┼────────────────┼─────────┘
        │              │                │
        └──────────────▼────────────────┘
                  REST API (Axios)
                       │
┌──────────────────────▼──────────────────────────┐
│              SERVER (Express.js)                │
│  ┌──────────┐  ┌──────────┐  ┌───────────────┐ │
│  │   Auth   │  │  Course  │  │   Payments    │ │
│  │  Routes  │  │  Routes  │  │    Routes     │ │
│  └────┬─────┘  └────┬─────┘  └──────┬────────┘ │
│       │             │               │           │
│  ┌────▼─────────────▼───────────────▼────────┐  │
│  │           Middleware (JWT Auth)           │  │
│  └────────────────────┬──────────────────────┘  │
└───────────────────────┼─────────────────────────┘
                        │
        ┌───────────────┼──────────────┐
        ▼               ▼              ▼
   ┌─────────┐    ┌──────────┐   ┌──────────┐
   │ MongoDB │    │Cloudinary│   │ Razorpay │
   │  Atlas  │    │  (media) │   │(payments)│
   └─────────┘    └──────────┘   └──────────┘
```

---

## 🗄 Database Schema

```
User
 ├── firstName, lastName, email, password (hashed)
 ├── accountType: "Student" | "Instructor" | "Admin"
 ├── courses: [Course]        ← enrolled / created
 └── courseProgress: [CourseProgress]

Course
 ├── courseName, courseDescription, price, thumbnail
 ├── instructor: User
 ├── courseContent: [Section]
 │    └── Section
 │         └── subSection: [SubSection]
 │              └── title, description, videoUrl, timeDuration
 ├── studentsEnroled: [User]
 ├── ratingAndReviews: [RatingAndReview]
 ├── category: Category
 └── status: "Draft" | "Published"

CourseProgress
 ├── courseID: Course
 ├── userId: User
 └── completedVideos: [SubSection]
```

---

## 📡 API Endpoints

### Auth Routes — `/api/v1/auth`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/sendotp` | Send OTP to email | Public |
| POST | `/signup` | Register new user | Public |
| POST | `/login` | Login & get JWT | Public |
| POST | `/changepassword` | Change password | Private |
| POST | `/reset-password-token` | Send reset link | Public |
| POST | `/reset-password` | Reset password | Public |

### Course Routes — `/api/v1/course`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/createCourse` | Create a new course | Instructor |
| PUT | `/editCourse` | Edit course details | Instructor |
| DELETE | `/deleteCourse` | Delete a course | Instructor |
| GET | `/getAllCourses` | Get all published courses | Public |
| POST | `/getCourseDetails` | Get full course details | Public |
| POST | `/getFullCourseDetails` | Get details + progress | Student |
| GET | `/getInstructorCourses` | Get instructor's courses | Instructor |
| POST | `/createSection` | Add section to course | Instructor |
| PUT | `/updateSection` | Edit section | Instructor |
| DELETE | `/deleteSection` | Remove section | Instructor |
| POST | `/addSubSection` | Add video lecture | Instructor |
| POST | `/updateCourseProgress` | Mark sub-section complete | Student |

### Payment Routes — `/api/v1/payment`
| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/capturePayment` | Initiate Razorpay order | Student |
| POST | `/verifyPayment` | Verify & enroll student | Student |
| POST | `/sendPaymentSuccessEmail` | Send confirmation email | Student |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (Atlas or local)
- Razorpay account
- Cloudinary account
- A Gmail account (for Nodemailer)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/VasudevGupta73/STUDYNOTION-APP.git
cd STUDYNOTION-APP

# 2. Install root dependencies (React client)
npm install

# 3. Install server dependencies
cd server
npm install
cd ..

# 4. Set up environment variables (see below)
# Create .env inside /server

# 5. Run both client and server concurrently
npm run dev
```

The app runs at `http://localhost:3000` (client) and `http://localhost:4000` (server).

---

## 🔑 Environment Variables

Create a `.env` file inside the `/server` directory:

```env
# Server
PORT=4000
MONGODB_URL=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret

# Nodemailer (Gmail)
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password

# Cloudinary
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FOLDER_NAME=StudyNotion

# Razorpay
RAZORPAY_KEY=your_razorpay_key_id
RAZORPAY_SECRET=your_razorpay_secret
```

---

## 📁 Project Structure

```
STUDYNOTION-APP/
├── src/                        # React frontend
│   ├── components/
│   │   ├── core/
│   │   │   ├── Auth/           # Login, Signup forms
│   │   │   ├── Dashboard/      # Student & Instructor dashboards
│   │   │   │   ├── AddCourse/  # Course builder
│   │   │   │   ├── Cart/       # Course cart
│   │   │   │   └── InstructorDashboard/  # Analytics
│   │   │   ├── Catalog/        # Course browsing
│   │   │   ├── Course/         # Course detail view
│   │   │   └── ViewCourse/     # Lecture player
│   │   └── Common/             # Navbar, Footer, etc.
│   ├── pages/                  # Route-level page components
│   ├── services/               # Axios API calls
│   ├── slices/                 # Redux slices
│   └── utils/                  # Helper functions
│
└── server/                     # Express backend
    ├── controllers/            # Business logic
    ├── models/                 # Mongoose schemas
    ├── routes/                 # API route definitions
    ├── middleware/             # JWT auth middleware
    ├── utils/                  # mailSender, uploadImage
    ├── mail/templates/         # HTML email templates
    └── config/                 # DB, Cloudinary, Razorpay config
```

---

## 👨‍💻 Author

**Vasudev Gupta**
- GitHub: [@VasudevGupta73](https://github.com/VasudevGupta73)
- LinkedIn: [vasudev-gupta](https://www.linkedin.com/in/vasudev-gupta-350a012a2/)
- LeetCode: [Vasudev_gupta73](https://leetcode.com/u/Vasudev_gupta73/)

---

<div align="center">
  <sub>Built with ❤️ by Vasudev Gupta</sub>
</div>
