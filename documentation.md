## College placment Driver Website

step : firstly we have downloaded or install the packages of the FASTAPI by this --> python -m pip install fastapi uvicorn

step : Then i have verifed by this -->python -m pip show fastapi

step : After this all installation we have started the project on the backend in that main.py file which was available in the backend folder 

step : in this we main.py we have used all the endpoint GET,PUT,POST,DELETE this all operation 

step : For running the FastAPI project i have enter the commands python -m uvicorn main:app --reload



AFTER COMPLETING THE BACKEND FILE AND WORKING OF CRUDE OPERATION WE MOVE TO THE 
##                                 ** SUPABASE DATABASE **

1.we went to supabase website and there we have login with our account 
2.After login we have click on new project on the oragnization then 
3.GO to table editior and kept the table name as placement_drives

## table paramerter 
| Column       | Type        | Setting               |
| ------------ | ----------- | --------------------- |
| id           | int8        | Primary Key, Identity |
| company_name | text        | required              |
| job_role     | text        | required              |
| package      | float8      | required              |
| location     | text        | required              |
| minimum_cgpa | float8      | required              |
| drive_date   | date        | required              |
| created_at   | timestamptz | default `now()`       |




4.After creating the table in supabase run this commands to install the supabase python -m pip install supabase python-dotenv
5.create a .env file in this .env file we are entering the supabase url and key 
6.Then create a Backend/database/py file with this code 
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



7.IMP then add this impport package in the main.py file 
            ** from database import supabase **

8. i will change hte 
@app.get("/drives")
def get_drives():

    response = (
        supabase
        .table("placement_drives")
        .select("*")
        .execute()
    )

    return response.data

9. This is how our project flow will look like this 

                                GET /drives
                                    ↓
                                FastAPI
                                    ↓
                                Supabase placement_drives table
                                    ↓
                                Database records
                                    ↓
                                Swagger

10. Clg driver placment project/
│
└── Backend/
    ├── main.py
    ├── database.py
    └── .env


11. Then after compeltiion of this code run the project on the FastAPI swagger by this command 
        python -m uvicorn main:app --reload --port 8001









##         Frontend

## Frontend Development

The frontend of the College Placement Drive Portal was developed using HTML, CSS, and JavaScript. A clean, responsive, and professional user interface was created for students.

The frontend currently includes the following pages:

index.html – Public home page
login.html – Student login page
signup.html – Student registration page
dashboard.html – Logged-in student dashboard
drives.html – Placement drive listing
applications.html – Student application status
profile.html – Student profile management

CSS files are organized separately for the main UI, authentication pages, and dashboard. JavaScript files are also separated based on functionality such as authentication, placement drives, dashboard, profile, and applications.

The frontend is designed with the following flow:

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

The frontend is also prepared to communicate with the FastAPI backend using JavaScript fetch() requests.

Current architecture:

Frontend
HTML + CSS + JavaScript
        ↓
FastAPI Backend
        ↓
Supabase Database

The frontend UI and page structure are completed. Backend API integration, Supabase authentication, login/signup functionality, and application submission are the next implementation steps.





















## Backend Deployment on Railway

After completing the FastAPI backend and connecting it with Supabase, the backend was deployed on Railway so that it could be accessed through a public URL.

1. GitHub Repository Connection

The project was first uploaded to the GitHub repository:

lokeshkale1803/CLG_Placment_drive

The project structure contained separate frontend and backend folders:

CLG_Placment_drive/
│
├── Backend/
│   ├── main.py
│   ├── database.py
│   ├── requirements.txt
│
├── Frontend/
│
├── database/
├── README.md
├── documentation.md
└── .gitignore

The Railway service was connected directly to this GitHub repository so that new GitHub commits could be deployed automatically.

2. Backend Dependencies

A requirements.txt file was added inside the Backend folder.

fastapi
uvicorn[standard]
python-dotenv
supabase

These packages are required for running the FastAPI application and connecting it with Supabase.

3. Initial Railway Build Error

During the first deployment, Railway showed a build error:

Railpack could not determine how to build the app.

Railway was analyzing the complete project root:

./
├── Backend/
├── Frontend/
├── database/
├── README.md
└── documentation.md

Because the FastAPI application was located inside the Backend folder, Railway could not automatically identify the Python application from the project root.

4. Setting the Railway Root Directory

To solve this issue, the Railway service root directory was changed to:

Backend

This allowed Railway to directly detect:

main.py
database.py
requirements.txt

inside the backend application.

5. Build Command Configuration

The following build command was configured in Railway:

pip install fastapi uvicorn supabase python-dotenv

This command installs all required Python dependencies during deployment.

6. Start Command Configuration

The FastAPI application was configured to start using Uvicorn with the following command:

uvicorn main:app --host 0.0.0.0 --port $PORT

Here:

main

represents the main.py file.

app

represents the FastAPI application object:

app = FastAPI()

0.0.0.0 allows Railway to expose the application publicly, while $PORT uses the port automatically provided by Railway.

7. Adding Supabase Environment Variables

The backend requires Supabase credentials to connect with the database.

The following environment variables were added in:

Railway
→ CLG_Placment_drive
→ Variables

Variables:

SUPABASE_URL
SUPABASE_KEY

The actual Supabase values were stored only inside Railway environment variables and were not uploaded directly to GitHub.

The backend reads these variables using:

import os

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

This keeps sensitive credentials secure.

8. Successful Railway Deployment

After configuring the root directory, build command, start command, and Supabase variables, the project was deployed again.

The deployment completed successfully.

Railway logs showed:

Application startup complete.
Uvicorn running on http://0.0.0.0:8080

This confirmed that the FastAPI backend was running successfully on Railway.

9. Generating the Public Backend URL

A public Railway domain was generated for the backend:

https://clgplacmentdrive-production.up.railway.app

The backend API could then be tested using:

https://clgplacmentdrive-production.up.railway.app/

The Swagger API documentation is available at:

https://clgplacmentdrive-production.up.railway.app/docs

The placement drives API can be accessed using:

https://clgplacmentdrive-production.up.railway.app/drives
10. Connecting the Frontend with the Railway Backend

Before deployment, the frontend was using the local FastAPI server:

const API_BASE_URL = "http://127.0.0.1:8001";

After the backend was successfully deployed on Railway, the local URL was replaced with the Railway public URL inside:

Frontend/js/config.js

Updated configuration:

const API_BASE_URL =
    "https://clgplacmentdrive-production.up.railway.app";

Now the frontend can send requests directly to the live Railway backend.

For example:

fetch(`${API_BASE_URL}/drives`)

will request placement drive data from:

Frontend
   ↓
Railway FastAPI Backend
   ↓
Supabase Database
11. Final Deployment Architecture

The final application architecture is:

Student Browser
       ↓
HTML + CSS + JavaScript Frontend
       ↓
Railway FastAPI Backend
       ↓
Supabase Database

The backend is now successfully hosted on Railway and connected with Supabase. The frontend has also been updated to use the live Railway API instead of the local FastAPI development server.