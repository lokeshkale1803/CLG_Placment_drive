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