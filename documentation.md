# College Placement Drive Website

## Project Overview

The **College Placement Drive Portal** is a web-based application developed for students to view placement drives, register/login, manage their profiles, apply for placement opportunities, and track their applications.

The project uses the following technologies:

- HTML
- CSS
- JavaScript
- Python
- FastAPI
- Supabase
- Railway
- Vercel
- GitHub

The overall architecture of the project is:

```text
Student Browser
      ↓
HTML + CSS + JavaScript
      ↓
FastAPI Backend
      ↓
Supabase Database
```

---

# 1. Backend Development Using FastAPI

## 1.1 Installing FastAPI

Firstly, we installed the required FastAPI and Uvicorn packages using:

```bash
python -m pip install fastapi uvicorn
```

After installation, we verified FastAPI using:

```bash
python -m pip show fastapi
```

This command displays the installed FastAPI version and package details.

---

## 1.2 Creating the Backend Folder

The backend code of the project was organized inside the `Backend` folder.

Initial structure:

```text
Clg driver placment project/
│
└── Backend/
    └── main.py
```

The main FastAPI application was created inside:

```text
Backend/main.py
```

---

## 1.3 Creating FastAPI Application

Inside `main.py`, FastAPI was imported and the application object was created.

```python
from fastapi import FastAPI

app = FastAPI()
```

---

## 1.4 CRUD Operations

The backend was designed using REST API endpoints.

The following CRUD operations were implemented:

| HTTP Method | Operation | Purpose |
|---|---|---|
| GET | Read | Get placement drives |
| POST | Create | Add a new placement drive |
| PUT | Update | Update placement drive details |
| DELETE | Delete | Delete a placement drive |

Example endpoints:

```text
GET     /drives
GET     /drives/{drive_id}
POST    /drives
PUT     /drives/{drive_id}
DELETE  /drives/{drive_id}
```

---

## 1.5 Running the FastAPI Project

To run the FastAPI application, the following command was used:

```bash
python -m uvicorn main:app --reload
```

Later, port `8001` was used:

```bash
python -m uvicorn main:app --reload --port 8001
```

The backend could then be accessed at:

```text
http://127.0.0.1:8001
```

Swagger UI was available at:

```text
http://127.0.0.1:8001/docs
```

Swagger UI was used to test the different API endpoints.

---

# 2. Supabase Database Integration

After completing the initial FastAPI backend and CRUD operations, the next step was connecting the project to Supabase.

## 2.1 Creating a Supabase Project

The following steps were performed:

1. Opened the Supabase website.
2. Logged in with the Supabase account.
3. Selected an organization.
4. Clicked **New Project**.
5. Created the Supabase project.
6. Opened **Table Editor**.

---

## 2.2 Creating the `placement_drives` Table

A table named:

```text
placement_drives
```

was created.

### Table Structure

| Column | Type | Setting |
|---|---|---|
| id | int8 | Primary Key, Identity |
| company_name | text | Required |
| job_role | text | Required |
| package | float8 | Required |
| location | text | Required |
| minimum_cgpa | float8 | Required |
| drive_date | date | Required |
| created_at | timestamptz | Default `now()` |

This table stores all information related to placement drives.

---

## 2.3 Installing Supabase Python Package

The Supabase Python package and dotenv package were installed using:

```bash
python -m pip install supabase python-dotenv
```

The `python-dotenv` package is used to securely load environment variables.

---

## 2.4 Creating the `.env` File

A `.env` file was created inside the backend folder.

Example:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

The actual Supabase credentials should never be uploaded to GitHub.

Therefore `.env` was added to `.gitignore`.

Example:

```gitignore
.env
.venv/
__pycache__/
*.pyc
.DS_Store
```

---

## 2.5 Creating `database.py`

A separate file named:

```text
Backend/database.py
```

was created.

Code:

```python
from supabase import create_client
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Get Supabase credentials
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Connect to Supabase
supabase = create_client(
    SUPABASE_URL,
    SUPABASE_KEY
)
```

This file creates the connection between Python and Supabase.

---

## 2.6 Importing Supabase in `main.py`

Inside `main.py`, the following import was added:

```python
from database import supabase
```

This allowed the FastAPI routes to access the Supabase database.

---

## 2.7 Fetching Placement Drives from Supabase

The `GET /drives` endpoint was changed to retrieve data directly from Supabase.

```python
@app.get("/drives")
def get_drives():

    response = (
        supabase
        .table("placement_drives")
        .select("*")
        .execute()
    )

    return response.data
```

The flow became:

```text
GET /drives
      ↓
FastAPI
      ↓
Supabase placement_drives table
      ↓
Database Records
      ↓
JSON Response
```

Swagger UI was used to test this API.

---

## 2.8 Backend Folder Structure

The backend structure became:

```text
Clg driver placment project/
│
└── Backend/
    ├── main.py
    ├── database.py
    ├── requirements.txt
    └── .env
```

---

# 3. Frontend Development

The frontend of the College Placement Drive Portal was developed using:

- HTML
- CSS
- JavaScript

The goal was to create a clean, responsive, and professional interface for students.

---

## 3.1 Frontend Pages

The frontend contains the following pages:

```text
index.html
login.html
signup.html
dashboard.html
drives.html
applications.html
profile.html
```

### Page Purpose

| Page | Purpose |
|---|---|
| `index.html` | Public home page |
| `login.html` | Student login |
| `signup.html` | Student registration |
| `dashboard.html` | Student dashboard |
| `drives.html` | Display placement drives |
| `applications.html` | Display student applications |
| `profile.html` | Manage student profile |

---

## 3.2 Frontend Folder Structure

```text
Frontend/
│
├── index.html
├── login.html
├── signup.html
├── dashboard.html
├── drives.html
├── applications.html
├── profile.html
│
├── css/
│   ├── style.css
│   ├── auth.css
│   └── dashboard.css
│
├── js/
│   ├── config.js
│   ├── auth.js
│   ├── home.js
│   ├── dashboard.js
│   ├── drives.js
│   ├── applications.js
│   └── profile.js
│
└── assets/
```

---

## 3.3 Frontend Flow

```text
Home Page
    ↓
Login / Sign Up
    ↓
Student Dashboard
    ↓
Placement Drives
    ↓
My Applications
    ↓
Profile
```

---

# 4. Connecting Frontend and Backend

JavaScript `fetch()` is used to communicate with FastAPI.

Initially, the backend was running locally.

The configuration was:

```javascript
const API_BASE_URL = "http://127.0.0.1:8001";
```

Example API request:

```javascript
fetch(`${API_BASE_URL}/drives`)
```

The flow was:

```text
Frontend
    ↓
JavaScript fetch()
    ↓
FastAPI
    ↓
Supabase
```

---

# 5. GitHub Repository

The complete project was uploaded to GitHub.

Repository:

```text
lokeshkale1803/CLG_Placment_drive
```

Project structure:

```text
CLG_Placment_drive/
│
├── Backend/
│   ├── main.py
│   ├── database.py
│   └── requirements.txt
│
├── Frontend/
│
├── database/
│
├── README.md
├── documentation.md
└── .gitignore
```

GitHub is used for:

- Source code management
- Version control
- Railway deployment
- Vercel deployment

---

# 6. Backend Deployment on Railway

After completing the FastAPI backend and connecting it with Supabase, the backend was deployed on Railway.

---

## 6.1 Connecting GitHub with Railway

The GitHub repository was connected to Railway.

Repository:

```text
lokeshkale1803/CLG_Placment_drive
```

Railway can automatically create a new deployment whenever new changes are pushed to GitHub.

---

## 6.2 Backend Dependencies

A `requirements.txt` file was created inside the Backend folder.

```text
fastapi
uvicorn[standard]
python-dotenv
supabase
```

These packages are required by the deployed FastAPI backend.

---

## 6.3 Initial Railway Error

During the first deployment Railway showed an error because it could not automatically identify the Python backend.

The project contained:

```text
./
├── Backend/
├── Frontend/
├── database/
├── README.md
└── documentation.md
```

Since `main.py` was inside the Backend directory, Railway was initially checking the wrong directory.

---

## 6.4 Setting Railway Root Directory

The Railway root directory was changed to:

```text
Backend
```

Now Railway could correctly detect:

```text
main.py
database.py
requirements.txt
```

---

## 6.5 Railway Build Command

The build command was configured as:

```bash
pip install fastapi uvicorn supabase python-dotenv
```

---

## 6.6 Railway Start Command

The application was started using:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

Explanation:

```text
main
```

refers to:

```text
main.py
```

and:

```text
app
```

refers to:

```python
app = FastAPI()
```

Railway automatically provides the `$PORT` environment variable.

---

## 6.7 Railway Environment Variables

The following environment variables were configured inside Railway:

```text
SUPABASE_URL
SUPABASE_KEY
```

The actual values were stored securely inside Railway.

They were not uploaded to GitHub.

---

## 6.8 Successful Railway Deployment

After configuring the required settings, the Railway deployment completed successfully.

Logs showed:

```text
Application startup complete.
Uvicorn running on http://0.0.0.0:8080
```

This confirmed that FastAPI was running successfully.

---

## 6.9 Public Railway URL

The backend was given the following public URL:

```text
https://clgplacmentdrive-production.up.railway.app
```

Main API:

```text
https://clgplacmentdrive-production.up.railway.app/
```

Swagger:

```text
https://clgplacmentdrive-production.up.railway.app/docs
```

Placement Drives:

```text
https://clgplacmentdrive-production.up.railway.app/drives
```

---

# 7. Updating Frontend API URL

After Railway deployment, the local backend URL was replaced.

Old:

```javascript
const API_BASE_URL = "http://127.0.0.1:8001";
```

New:

```javascript
const API_BASE_URL =
    "https://clgplacmentdrive-production.up.railway.app";
```

This code is stored inside:

```text
Frontend/js/config.js
```

Now the frontend communicates with the deployed Railway backend.

---

# 8. Frontend Deployment on Vercel

After deploying the backend, the frontend was deployed using Vercel.

The GitHub repository was connected with Vercel.

The frontend root directory was configured as:

```text
Frontend
```

Since the frontend uses plain:

```text
HTML
CSS
JavaScript
```

no complex build process was required.

The framework preset was kept as:

```text
Other
```

The deployment flow became:

```text
GitHub
   ↓
Vercel
   ↓
Frontend Website
```

---

# 9. Fetching Real Placement Drives

Initially, `drives.js` contained mock/sample data.

Example:

```javascript
const drives = await simulateFetchDrives();
```

This was replaced with a real API request.

```javascript
const response = await fetch(
    `${API_BASE_URL}/drives`
);

const data = await response.json();
```

---

## 9.1 Mapping Backend Data

Supabase returns fields such as:

```text
company_name
job_role
package
location
minimum_cgpa
drive_date
```

The frontend required fields such as:

```text
company
role
package
location
minCgpa
deadline
```

Therefore the data was mapped inside `drives.js`.

Example:

```javascript
const drives = data.map(drive => ({
    id: drive.id,
    company: drive.company_name,
    role: drive.job_role,
    package: `${drive.package} LPA`,
    location: drive.location,
    minCgpa: drive.minimum_cgpa,
    deadline: drive.drive_date
}));
```

The application can now display database records dynamically.

---

# 10. CORS Problem

After connecting the Vercel frontend with Railway, the frontend initially showed:

```text
Unable to load placement drives.
Please try again later.
```

The Railway `/drives` API was working correctly, but the browser was blocking requests because CORS was not enabled.

---

## 10.1 Adding CORS Middleware

The following import was added to `main.py`:

```python
from fastapi.middleware.cors import CORSMiddleware
```

CORS middleware was then added:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

The top of `main.py` became:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import supabase

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

After pushing the change to GitHub, Railway automatically redeployed the backend.

---

# 11. Current Deployment Architecture

The current project architecture is:

```text
Student
   ↓
Vercel
   ↓
HTML + CSS + JavaScript
   ↓
JavaScript fetch()
   ↓
Railway
   ↓
FastAPI
   ↓
Supabase
   ↓
PostgreSQL Database
```

A placement drive request currently works as:

```text
Student Opens drives.html
          ↓
drives.js
          ↓
GET /drives
          ↓
Railway FastAPI
          ↓
Supabase
          ↓
placement_drives
          ↓
JSON Response
          ↓
Placement Drive Cards
```

---

# 12. Current Placement Drive Database

The `placement_drives` table stores placement information such as:

```text
TCS
Infosys
Accenture
Capgemini
Cognizant
```

Each record contains:

```text
Company Name
Job Role
Package
Location
Minimum CGPA
Drive Date
```

These records can be retrieved using:

```http
GET /drives
```

---

# 13. Current Project Status

Completed features:

- FastAPI setup
- FastAPI backend
- REST API endpoints
- Swagger API testing
- Supabase connection
- `placement_drives` database table
- Railway backend deployment
- GitHub integration
- Frontend development
- Vercel frontend deployment
- Railway API connection
- JavaScript API fetch
- Placement Drive dynamic data
- CORS configuration

The project currently follows:

```text
Frontend
   ↓
Railway FastAPI
   ↓
Supabase
```

---

# 14. Next Step - Supabase Authentication

The next major implementation is real student authentication.

Currently the Login and Signup UI exists, but it needs to be connected with Supabase Auth.

The required signup flow will be:

```text
Student Signup Form
        ↓
Supabase Auth
        ↓
New User Created
        ↓
Unique UUID Generated
        ↓
Student Profile Saved
        ↓
Login
        ↓
Dashboard
```

---

# 15. Student Signup

When a student enters:

```text
Full Name
Email
Password
Phone
Branch
Graduation Year
CGPA
```

the email and password will be sent to Supabase Authentication.

Example:

```javascript
supabase.auth.signUp({
    email: email,
    password: password
});
```

Supabase automatically creates a unique user ID.

Example:

```text
User ID:
8f7c0fe5-xxxx-xxxx-xxxx
```

The password will NOT be manually stored inside the students table.

Supabase Auth will securely manage the password.

---

# 16. Students Table

A `students` table will be used to store student profile information.

Recommended structure:

| Column | Type | Purpose |
|---|---|---|
| id | uuid | Supabase Auth User ID |
| full_name | text | Student Name |
| email | text | Student Email |
| phone | text | Phone Number |
| branch | text | Student Branch |
| cgpa | float8 | Student CGPA |
| graduation_year | int4 | Passing Year |
| backlogs | int4 | Active Backlogs |
| skills | text | Student Skills |
| resume_url | text | Resume |
| created_at | timestamptz | Account Creation Time |

The `id` will be connected with:

```text
auth.users.id
```

---

# 17. Login Flow

After signup, the student will be able to login using the same email and password.

Flow:

```text
Login Page
    ↓
Email + Password
    ↓
Supabase Auth
    ↓
Authentication Check
    ↓
Valid User
    ↓
Dashboard
```

Example:

```javascript
supabase.auth.signInWithPassword({
    email: email,
    password: password
});
```

---

# 18. Student Session

After successful login, Supabase will provide a session.

The application can use the session to determine whether the user is logged in.

Protected pages will include:

```text
dashboard.html
profile.html
applications.html
```

If the user is not logged in, the application will redirect the student to:

```text
login.html
```

---

# 19. Application System

After authentication is completed, the next feature will be placement drive applications.

When a logged-in student clicks:

```text
Apply Now
```

the application information will be stored inside an `applications` table.

---

## 19.1 Applications Table

Recommended table structure:

| Column | Type | Purpose |
|---|---|---|
| id | int8 | Application ID |
| student_id | uuid | Student User ID |
| drive_id | int8 | Placement Drive ID |
| status | text | Application Status |
| applied_at | timestamptz | Application Date |

Example:

```text
Student
    ↓
Apply Now
    ↓
Applications API
    ↓
Supabase
    ↓
applications table
```

---

# 20. My Applications Page

After applying for a company, the student will be able to view application details inside:

```text
applications.html
```

Example:

```text
TCS
Software Engineer
Status: Applied

Infosys
System Engineer
Status: Shortlisted
```

Possible application statuses:

```text
Applied
Shortlisted
Selected
Rejected
```

---

# 21. Student Profile

The `profile.html` page will display student information.

Example:

```text
Name
Email
Phone
Branch
CGPA
Graduation Year
Skills
Resume
```

The data will be retrieved from the Supabase `students` table.

---

# 22. Final Planned System Architecture

After completing authentication and applications, the complete architecture will be:

```text
                    STUDENT
                       ↓
                    VERCEL
                       ↓
          HTML + CSS + JavaScript
                       ↓
              Supabase Auth
                       ↓
                FastAPI API
                       ↓
                    Railway
                       ↓
                   Supabase
                       ↓
              PostgreSQL Database
```

Main database entities:

```text
auth.users
     ↓
students
     ↓
applications
     ↓
placement_drives
```

---

# 23. Complete Student Flow

The final student workflow will be:

```text
Home Page
    ↓
Sign Up
    ↓
Supabase Authentication
    ↓
Student Account Created
    ↓
Login
    ↓
Dashboard
    ↓
View Placement Drives
    ↓
Select Company
    ↓
Apply Now
    ↓
Application Stored
    ↓
My Applications
    ↓
Track Application Status
```

---

# 24. Technologies Used

## Frontend

```text
HTML
CSS
JavaScript
Font Awesome
```

## Backend

```text
Python
FastAPI
Uvicorn
```

## Database

```text
Supabase
PostgreSQL
```

## Authentication

```text
Supabase Auth
```

## Deployment

```text
Railway - Backend
Vercel - Frontend
```

## Version Control

```text
Git
GitHub
```

---

# 25. Project Summary

The College Placement Drive Portal has been developed using a modern frontend-backend architecture.

The frontend is built using HTML, CSS, and JavaScript.

FastAPI is responsible for backend API communication.

Supabase is used for the PostgreSQL database and will also be used for student authentication.

Railway hosts the FastAPI backend while Vercel hosts the frontend.

GitHub is used for source code management and automatic deployment.

Current working architecture:

```text
Vercel Frontend
      ↓
Railway FastAPI
      ↓
Supabase Database
```

The next development stage is:

```text
Supabase Signup
       ↓
Supabase Login
       ↓
Student Profile
       ↓
Apply for Drive
       ↓
Applications Table
       ↓
Application Tracking
```

After completing these modules, the College Placement Drive Portal will provide a complete student placement management workflow.