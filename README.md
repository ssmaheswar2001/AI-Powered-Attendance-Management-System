# AI-Powered Attendance Management System

This application aims to build an AI-powered facial recognition attendance system using Python, AWS, FastAPI, React, and MongoDB. It allows seamless and secure attendance tracking with facial recognition, user authentication, and real-time email notifications.

## Table of Contents

- [Problem Statement](#problem-statement)
- [Requirements](#requirements)
- [Methodology](#methodology)
- [System Architecture](#system-architecture)
- [API Endpoints](#api-endpoints)
- [Implementation](#implementation)
- [Gathering Results](#gathering-results)
---

## Problem Statement

Attendance tracking is critical for businesses, educational institutions, and organizations to effectively monitor employee and student presence. Traditional methods such as manual logs or punch cards are prone to errors and misuse. This application builds an AI-powered facial recognition system to streamline attendance tracking using modern technologies.

---

## Requirements

### Functional Requirements

- **Scan Page**:
  - Capture user face and verify it against registered profiles.
  - Prompt for Punch In and Punch Out options.
  - User ID and password authentication before face scanning.

- **Register Page**:
  - Allow users to register with their name, password, and 5 photos.
  - Automatically assign unique Employee/Student ID.
  - Send assigned ID to the user's email via AWS SES.
  - Store face data for future recognition.

- **Admin Page**:
  - Admin login with secure authentication.
  - CRUD operations for managing users.
  - View attendance records (Punch In & Punch Out times).

- **Notifications**:
  - After Punch Out, email the user with their attendance record.

### Non-Functional Requirements

- Role-based access control for security.
- Multi-device accessibility via cloud deployment.
- Future mobile app support.

---

## Methodology

### AI Model Selection

The following models will be evaluated for facial recognition:

- **OpenCV (Haar Cascades & DNN)**: Lightweight and fast.
- **Dlib (HOG & CNN)**: Accurate but computationally expensive.
- **FaceNet**: Deep learning-based, highly accurate.
- **DeepFace**: High accuracy with multiple model support.
- **YOLO**: Fast face detection with object recognition.

The evaluation criteria will include accuracy, processing speed, and scalability.

### AI Model Design

We will design a custom facial recognition model using **TensorFlow** and **YOLO**. The design will include:

- **Data Collection**: 5 images per user for training, with augmentation for generalization.
- **Preprocessing**: Resize and normalize images.
- **Model Architecture**: Use CNNs and pre-trained models like MobileNetV2 and ResNet50 for better accuracy.
- **Training & Evaluation**: Split the data into training and validation sets, use Categorical Cross Entropy loss, and Adam Optimizer.
- **Face Recognition**: Use YOLO for face detection, extract embeddings with TensorFlow, and verify identities with Cosine Similarity.
- **Integration with FastAPI** : Expose a REST API endpoint to accept face images and return identification results. Store embeddins in MongoDB for quick comparisons.

---

## System Architecture

The system will follow a **microservices-based architecture** with the following components:

1. **Frontend (React.js)**: UI for users and admin.
2. **Backend (FastAPI)**: Handles user authentication, attendance logging, and API endpoints.
3. **Facial Recognition Service (TensorFlow + YOLO)**: Processes face images, detects faces, and verifies identities.
4. **Database (MongoDB)**: Stores user data, attendance records, and embeddings.
5. **Email Services (AWS SES)**: Sends attendance notifications.
6. **ETL Pipeline (AWS Glue + Redshift)**: Extract, transform, and load attendance data for reporting.
7. **Deployment**

---

## API Endpoints

- **Authentication**:
  - POST /register : Register new user and assign user ID.
  - POST /login : Autheticate user with email and password.

- **Attendance**:
  - POST /Scan : Capture face, verify identif, and log attendance.
  - GET /attendance/{user_id} : Fetch attednace records for an user.

- **Admin**:
  - GET /admin /users : Fetch all registered users
  - DELETE /admin /users /{user_id} : Delete a user
  - POST /admin/email : Send email notifications manually.

---

## Implementation

1. **Setup Environment**
  - Install necessary dependencies for Python, FastAPI, React, TensorFlow, YOLO, and MongoDB. 
  - Configure AWS SES for email notifications.
  - Setup AWS Glue and Redshift for ETL processing.

2. **Develop Database Models**
  - Implement MongoDB schemas for users and attendance records.
  - Define schema for Redshift tables to store aggregated attendance data.

3. **Build API Endpoints**
  - Implement authentication, face scanning, registration, and admin functionalities.

4. **Train AI model**
  - Train TensorFlow and YOLO-based models using collected datasets
  - Evaluate accuracy and optimize performance.

5. **Frontend Development**
  - Design and implement UI components for Register, Scan and Admin pages.

6. **Integrate AI with Backend**
  - Connect the trained AI model with FastAPI endpoints.

7. **ETL Pipeline Implementation**
  - Extract attendance data from MongoDB
  - Transform data using AWS Glue (cleaning, aggregation, analytics preparation)
  - Load transformed data into AWS Redshift for reporting.

6. **Testing & Debugging**

7. **Deployment**
  - Deploy the system on AWS using containerization or serverless architecture.

---

## Gathering Results

  - Monitor system performance and AI model accuracy.
  - Gather user feedback to refine functionalities. 
  - Ensure emails and attendance logs are accurately recorded.
  - Generate attendance reports from AWS Redshift using ETL pipeline outputs.
