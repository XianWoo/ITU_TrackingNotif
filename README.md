# ITU_TrackingNotif
## Technical Proposal for the Web-Based Tracking Application
**Core Strategy:** To leverage the Windows VM environment to build a robust, scalable web application. The solution focuses on a robust data synchronization script to handle the distributed nature of the .mdb files, ensuring a seamless transition to a centralized database.


### **Solution Components:**
Operating System: Windows Server (provided VM)

Database: PostgreSQL / SQL server

Backend: Python with the Flask framework

Frontend: Standard HTML, CSS, and native JavaScript

Web Server: Nginx (or IIS, if required by IT)

Automation: A Python script scheduled to run using Windows Task Scheduler.

### **Technical Implementation Plan**

#### Database: PostgreSQL Setup
Installation: Install PostgreSQL on the Windows VM using the official installer. This will provide a robust database and the pgAdmin tool for management. 

Schema Design: Design a new database schema to consolidate data from the hundreds of .mdb files into a few, well-structured tables. This is a critical step to ensure data integrity and query efficiency.

#### Backend: Python/Flask API
Technology Stack: The backend will be built with Python and the Flask framework. Flask is an excellent choice for its simplicity and ability to quickly create a RESTful API.

Core Functionality: The backend will serve as a bridge between the frontend and the database, providing API endpoints to:
Query the tracking data from the PostgreSQL database.

Filter and sort data based on various criteria (e.g., date, status).

Deployment: The Python application will be run using a WSGI server (like Gunicorn) or a process manager (like PM2 for Node.js, though a similar tool can be used with Python), and Nginx will be configured as a reverse proxy to handle incoming web traffic.

#### Frontend: Web Application
Technology Stack: The frontend will be built using standard web technologies: HTML, CSS, and native JavaScript. This approach is efficient and avoids the added complexity of modern JavaScript frameworks for this initial MVP.

**Core Functionality:**

A user-friendly interface to display the tracking data in a clear, organized format (e.g., a table, a timeline).
Basic search and filtering capabilities to allow users to find specific tasks.

The frontend will communicate with the backend API to fetch and display the data.

#### Data Synchronization Script
Technology Stack: This critical component will be a Python script using libraries like pyodbc to connect to and read from the .mdb files.

**Core Logic:**
The script will be configured to scan the shared network drive for .mdb files.

It will read new or updated records from each file.

It will then upsert (insert or update) this data into the centralized PostgreSQL database.

Automation: The script will be scheduled to run automatically at regular intervals (e.g., every 15 minutes) using the Windows Task Scheduler. This ensures that the web application's data is always up-to-date with minimal manual intervention.

### 3-Month Project Timeline (MVP)
This timeline outlines a phased approach, focusing on delivering a functional "read-only" web portal within the three-month deadline.

Month 1: Foundation & Synchronization

Week 1-2: Set up the Windows VM. Install PostgreSQL and other necessary software (Python, Nginx).

Week 3: Design the new database schema in PostgreSQL.

Week 4: Develop and test the core logic of the data synchronization script. Ensure it can successfully read data from the .mdb files and write it to the central PostgreSQL database.

Month 2: Backend & Frontend Development

Week 5-6: Build the Python/Flask backend API. Implement the endpoints required to query the synchronized data from the PostgreSQL database.

Week 7-8: Develop the basic frontend web interface using HTML, CSS, and JavaScript. The goal is to display the data and provide basic filtering.

Month 3: Deployment & Refinement (require Beiting’s help)

Week 9-10: Deploy the backend and frontend applications to the VM. Configure Nginx to serve the website and route API requests.

Week 11: Configure the Windows Task Scheduler to automate the synchronization script.

Week 12: Perform final testing and bug fixes. The deliverable is a fully functional, read-only web portal that provides an up-to-date view of the tracking data.





