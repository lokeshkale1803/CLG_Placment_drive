
# Import FastAPI
from fastapi import FastAPI
from database import supabase
from fastapi.middleware.cors import CORSMiddleware



# Create FastAPI application
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)




placement_drives = [
    {
        "id": 1,
        "company_name": "TCS",
        "job_role": "Software Engineer",
        "package": 5.5,
        "location": "Pune",
        "minimum_cgpa": 7.0,
        "drive_date": "2026-09-20"
    },
    {
        "id": 2,
        "company_name": "Infosys",
        "job_role": "System Engineer",
        "package": 4.5,
        "location": "Mumbai",
        "minimum_cgpa": 6.5,
        "drive_date": "2026-09-25"
    }
]


@app.get("/drives")
def get_drives():

    response = (
        supabase
        .table("placement_drives")
        .select("*")
        .execute()
    )

    return response.data


# GET ONE DRIVE
@app.get("/drives/{drive_id}")
def get_drive(drive_id: int):

    response = (
        supabase
        .table("placement_drives")
        .select("*")
        .eq("id", drive_id)
        .execute()
    )

    if response.data:
        return response.data[0]

    return {
        "message": "Placement drive not found"
    }


# POST - ADD DRIVE
@app.post("/drives")
def add_drive(
    company_name: str,
    job_role: str,
    package: float,
    location: str,
    minimum_cgpa: float,
    drive_date: str
):

    new_drive = {
        "company_name": company_name,
        "job_role": job_role,
        "package": package,
        "location": location,
        "minimum_cgpa": minimum_cgpa,
        "drive_date": drive_date
    }

    response = (
        supabase
        .table("placement_drives")
        .insert(new_drive)
        .execute()
    )

    return response.data


# PUT - UPDATE DRIVE
@app.put("/drives/{drive_id}")
def update_drive(
    drive_id: int,
    package: float,
    minimum_cgpa: float
):

    updated_data = {
        "package": package,
        "minimum_cgpa": minimum_cgpa
    }

    response = (
        supabase
        .table("placement_drives")
        .update(updated_data)
        .eq("id", drive_id)
        .execute()
    )

    if response.data:
        return response.data

    return {
        "message": "Placement drive not found"
    }


# DELETE DRIVE
@app.delete("/drives/{drive_id}")
def delete_drive(drive_id: int):

    response = (
        supabase
        .table("placement_drives")
        .delete()
        .eq("id", drive_id)
        .execute()
    )

    return {
        "message": "Placement drive deleted successfully",
        "data": response.data
    }