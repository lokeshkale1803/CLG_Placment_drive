
# Import FastAPI
from fastapi import FastAPI
from database import supabase




# Create FastAPI application
app = FastAPI()






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


#GET

@app.get("/")
def home():

    return {
        "message": "College Placement Drive API is running"
    }


# -----------------------------------------
# 1. GET - GET ALL PLACEMENT DRIVES
# -----------------------------------------

@app.get("/drives")
def get_drives():

    response = (
        supabase
        .table("placement_drives")
        .select("*")
        .execute()
    )

    return response.data

# -----------------------------------------
# 2. GET - GET ONE PLACEMENT DRIVE
# -----------------------------------------

@app.get("/drives/{drive_id}")
def get_drive(drive_id: int):

    # Search placement drive
    for drive in placement_drives:

        # Check drive ID
        if drive["id"] == drive_id:

            return drive

    # If drive is not found
    return {
        "message": "Placement drive not found"
    }


# -----------------------------------------
# 3. POST - ADD NEW PLACEMENT DRIVE
# -----------------------------------------

@app.post("/drives")
def add_drive(
    company_name: str,
    job_role: str,
    package: float,
    location: str,
    minimum_cgpa: float,
    drive_date: str
):

    # Create new placement drive
    new_drive = {
        "id": len(placement_drives) + 1,
        "company_name": company_name,
        "job_role": job_role,
        "package": package,
        "location": location,
        "minimum_cgpa": minimum_cgpa,
        "drive_date": drive_date
    }

    # Add drive to list
    placement_drives.append(new_drive)

    # Return newly created drive
    return new_drive


# -----------------------------------------
# 4. PUT - UPDATE PLACEMENT DRIVE
# -----------------------------------------

@app.put("/drives/{drive_id}")
def update_drive(
    drive_id: int,
    package: float,
    minimum_cgpa: float
):

    # Search placement drive
    for drive in placement_drives:

        # Check drive ID
        if drive["id"] == drive_id:

            # Update values
            drive["package"] = package
            drive["minimum_cgpa"] = minimum_cgpa

            return drive

    return {
        "message": "Placement drive not found"
    }


# -----------------------------------------
# 5. DELETE - DELETE PLACEMENT DRIVE
# -----------------------------------------

@app.delete("/drives/{drive_id}")
def delete_drive(drive_id: int):

    # Search placement drive
    for drive in placement_drives:

        # Check drive ID
        if drive["id"] == drive_id:

            # Remove drive
            placement_drives.remove(drive)

            return {
                "message": "Placement drive deleted successfully"
            }

    return {
        "message": "Placement drive not found"
    }