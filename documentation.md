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