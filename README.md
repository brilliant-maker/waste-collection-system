
# Waste Collection System

A web application designed to support waste collection planning, task assignment, coordination, and progress monitoring across wards in Lusaka.

## Overview

The Waste Collection System is a web application I developed as part of my final-year dissertation, titled *Web-Based Waste Collection System for Lusaka City Council*.

The project explores how software can support waste collection operations through a centralised system for Supervisors, Drivers, and Loaders.

The application organises waste collection tasks and allows users to access functionality based on their roles. It is designed to support communication between supervisors and field workers, improve task tracking, and make it easier to monitor collection activities.

> **Note:** This is an academic project designed for the Lusaka City Council context. It does not imply official ownership, approval, or deployment by Lusaka City Council.

## Live Demo

**Web Application:** [Try the Waste Collection System](https://brilliant-maker-waste-collection-system.vercel.app/)

You can sign in using the demonstration accounts provided below to explore the functionality available to different user roles.

## Key Features

- **User authentication:** Allows registered users to sign in.
- **Role-based access control:** Provides different functionality for Supervisors, Drivers, and Loaders.
- **Ward-based operations:** Organises waste collection activities by ward.
- **Task assignment:** Allows Supervisors to create and assign collection tasks.
- **Task monitoring:** Supports monitoring of assigned tasks and their progress.
- **Collection status tracking:** Allows collection statuses to be updated.
- **Route management:** Supports the organisation and management of collection routes.
- **Operational reporting:** Provides information about collection activities and task completion.
- **Progress updates:** Supports updates to collection activities as work progresses.

The functionality available depends on the user's role and the features implemented in the application.

## Demo Login Credentials

The following accounts are provided to help visitors explore the application.

### How to Sign In

1. Open the [Waste Collection System web application](https://brilliant-maker-waste-collection-system.vercel.app/).
2. Navigate to the sign-in page if it does not appear automatically.
3. Choose an account from one of the tables below.
4. Enter the email address and password for that account.
5. Sign in and explore the functionality available to that role.
6. Sign out before trying another account.

### Supervisor Accounts

Supervisors oversee waste collection activities within their assigned wards.

| Ward | Email | Password |
|---|---|---|
| Kapwepwe Ward | `henry-mfula.ward-supervisor@lusaka-province-waste-collection.gov.zm` | `2030#Henry` |
| Lima Ward | `thomas-zulu.ward-supervisor@lusaka-province-waste-collection.gov.zm` | `2030#Thomas` |

### Driver Accounts

Drivers access their assigned collection tasks and routes.

| Ward | Email | Password |
|---|---|---|
| Kapwepwe Ward | `moses-phiri.ward-driver@lusaka-province-waste-collection.gov.zm` | `2030#Moses` |
| Lima Ward | `joseph-banda.ward-driver@lusaka-province-waste-collection.gov.zm` | `2030#Joseph` |

### Loader Accounts

Loaders access their assigned collection and loading activities.

| Ward | Email | Password |
|---|---|---|
| Kapwepwe Ward | `simon-zulu.ward-loader@lusaka-province-waste-collection.gov.zm` | `2030#Simon` |
| Lima Ward | `john-mwale.ward-loader@lusaka-province-waste-collection.gov.zm` | `2030#John` |

> **Demo account notice:** These credentials are intended for demonstration and testing only. They should only be published while the accounts are active and authorised for public testing. The accounts must not contain sensitive information or provide access to private operational data.

## User Roles

### 1. Supervisor

The Supervisor oversees waste collection operations within an assigned ward.

Responsibilities include:

- Creating and assigning waste collection tasks.
- Monitoring collection progress.
- Reviewing operational reports.
- Tracking collection status.
- Coordinating Drivers and Loaders.

### 2. Driver

The Driver is responsible for transporting waste and completing assigned collection routes.

Responsibilities include:

- Viewing assigned collection routes.
- Accessing assigned collection tasks.
- Updating trip and collection progress.
- Recording route completion.

### 3. Loader

The Loader assists with waste collection and loading activities.

Responsibilities include:

- Viewing assigned collection tasks.
- Confirming loading activities.
- Updating task completion status.

## System Workflow

The application follows a workflow designed to support daily waste collection activities:

1. A user signs in using an assigned account.
2. The Supervisor creates and assigns collection tasks.
3. Drivers access their assigned routes and collection activities.
4. Loaders access their assigned loading tasks.
5. Drivers and Loaders update the progress of their activities.
6. The Supervisor monitors collection progress and reviews task statuses.
7. Completed activities are recorded for monitoring and reporting.

The exact workflow depends on the functionality available to each role.

## Technology Stack

The following technologies were used to build the application.

| Technology | Purpose |
|---|---|
| HTML | Structures the web pages. |
| CSS | Styles the user interface and layouts. |
| JavaScript | Handles application logic and user interactions. |
| React | Builds the user interface using reusable components. |
| Supabase | Provides backend services and connects the application to the database. |
| PostgreSQL | Stores and manages application data. |

## Architecture Overview

The application uses React for the frontend and Supabase with PostgreSQL for backend and data services.

The main components are:

- **Frontend:** React components display the application interface and handle user interactions.
- **Backend services:** Supabase provides the backend services used by the application.
- **Database:** PostgreSQL stores and manages the application's structured data.
- **Access control:** Authentication and database permissions help control access to application functionality and data.

This structure separates the user interface from backend services and data storage, helping organise the application and making it easier to maintain.

## Security and Access Control

Since different users have different responsibilities, access control is an important part of the system.

The application considers the following security requirements:

- Users should authenticate before accessing protected functionality.
- Users should only perform actions permitted for their roles.
- Database access should be restricted according to user permissions.
- User input should be validated.
- Sensitive credentials should not be exposed in frontend code.
- Private information should only be accessible to authorised users.

Supabase Row Level Security (RLS) can enforce database access rules independently of the frontend. The actual level of protection depends on the policies and permissions configured for the application.

## Project Objectives

The main objectives of the project are to explore how software can:

- Organise waste collection tasks in one system.
- Improve coordination between Supervisors and field workers.
- Support the monitoring of collection activities.
- Organise operations by ward.
- Make task progress and completion easier to track.
- Support operational reporting and reduce dependence on manual record keeping.

These are the intended benefits of the system. Measuring actual improvements in waste collection operations would require evaluation in a real operational environment.

## Future Enhancements

There are several areas where the system could be improved in the future:

- **GPS vehicle tracking:** Track waste collection vehicles during operations.
- **Mobile application:** Provide a dedicated mobile experience for field workers.
- **Resident reporting portal:** Allow residents to report missed collections and other waste management concerns.
- **SMS and email notifications:** Notify users about assignments and task updates.
- **GIS route mapping:** Display collection routes on maps and support geographic planning.
- **Analytics dashboard:** Provide more detailed statistics about collection activities.
- **QR code verification:** Help verify collection points.
- **IoT integration:** Explore the use of smart waste bins and sensor-based monitoring.

These are proposed improvements and should not be taken as features already available in the current application.

## Running the Project Locally

The following instructions provide a general guide for setting up the project locally. Some steps may need to be adjusted according to the repository's configuration.

### Prerequisites

Ensure you have the following installed or available:

- Node.js.
- npm.
- Git.
- A Supabase project or access to the configured backend.
- The environment variables required by the application.

### Installation

#### 1. Clone the Repository

Run the following command in your terminal:

```bash
git clone https://github.com/brilliant-maker/waste-collection-system.git
```

#### 2. Navigate to the Project Directory

Run:

```bash
cd waste-collection-system
```

#### 3. Install Dependencies

Run:

```bash
npm install
```

#### 4. Configure Environment Variables

Configure the Supabase project URL and publishable key using the environment variable names expected by the application.

For a Vite project, environment variables are commonly defined in a `.env.local` file in the project root. The variable names must match those used in the application code.

For example, a Vite application using these variable names may require:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Replace the example values with the appropriate values from the Supabase project configuration.

**Security reminders:**

- Never expose a Supabase secret key, service role key, or database password in frontend code.
- Do not commit environment files containing secrets.
- Use a publishable key intended for frontend applications.
- Configure appropriate database permissions and Row Level Security policies.

Supabase publishable keys can be used in frontend applications, but they must be combined with appropriate database permissions and security policies. A publishable key alone does not protect your data.

#### 5. Start the Development Server

If the project uses Vite and defines the standard development script, run:

```bash
npm run dev
```

#### 6. Open the Application

Open the local development URL displayed in the terminal.

### Database Setup

To run a separate instance, you will need to configure the required PostgreSQL tables, authentication settings, database permissions, and any initial data needed by the application.

The hosted demonstration accounts and database are separate from a local installation. You may need to create your own test accounts and data.

## Repository

Explore the source code on GitHub:

[**View the Waste Collection System source code**](https://github.com/brilliant-maker/waste-collection-system)

## Project Context

This project was developed as part of my final-year dissertation, titled *Web-Based Waste Collection System for Lusaka City Council*.

Through this project, I explored how web application development, database management, authentication, and role-based workflows can be applied to a practical public-service problem.

The system was designed for the Lusaka City Council context. It should not be interpreted as an officially adopted or operational system of the Council.

## Author

**Emmanuel Banda**

Software Engineer | Building Web and Mobile Applications That Solve Real-World Problems

- **Portfolio:** [brilliant-maker-portfolio.vercel.app](https://brilliant-maker-portfolio.vercel.app)
- **GitHub:** [brilliant-maker](https://github.com/brilliant-maker)
- **LinkedIn:** [Emmanuel Banda](https://www.linkedin.com/in/emmanuel-banda-bb683b446)
