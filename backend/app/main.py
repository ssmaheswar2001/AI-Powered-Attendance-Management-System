from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from typing import List
import boto3
from dotenv import load_dotenv
import os
from app.database import user_collection
from app.schemas import UserResponse
from fastapi.middleware.cors import CORSMiddleware


load_dotenv()

app = FastAPI(title="AI Attendance Management System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# AWS S3 Client Setup  
s3_client = boto3.client(
    's3',
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION")
)

BUCKET_NAME = os.getenv("S3_BUCKET_NAME")

@app.get("/")
async def root():
    return {"message": "AI Attendance Management API is running!"}

@app.post("/register", response_model=UserResponse)
async def register_user(
    user_id: str = Form(...),
    name: str = Form(...),
    email_id: str = Form(...),
    phone: str = Form(...),
    images: List[UploadFile] = File(...)
):
    # Check if user already exists
    if user_collection.find_one({"user_id": user_id}):
        raise HTTPException(status_code=400, detail="User ID already exists")

    folder_path = f"user_data/{user_id}_{name}/"
    image_paths = []

    # Upload images to AWS S3
    for image in images:
        file_path = folder_path + image.filename

        try:
            s3_client.upload_fileobj(
                image.file,
                BUCKET_NAME,
                file_path,
                ExtraArgs={"ContentType": image.content_type}
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error uploading to S3: {str(e)}")

        # Construct URL
        image_url = f"https://{BUCKET_NAME}.s3.{os.getenv('AWS_REGION')}.amazonaws.com/{file_path}"
        image_paths.append(image_url)

    # Save metadata in MongoDB
    user_data = {
        "user_id": user_id,
        "name": name,
        "email_id": email_id,
        "phone": phone,
        "image_paths": image_paths
    }

    user_collection.insert_one(user_data)

    return user_data
