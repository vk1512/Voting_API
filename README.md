# Realtime Polling / Voting API

A simple **Node.js + Express + PostgreSQL** project for realtime polling/voting.  
This API allows users to fetch polls, vote for options, and see updated poll results.

---

## Features

- Fetch all polls
- Fetch a single poll
- Vote for poll options
- Store poll data in PostgreSQL
- Supports multiple options per poll
- Ready for frontend integration

---

## Project Structure

realtime-polling/
├─ src/
│ └─ server.js # Main server file
├─ prisma/ # Prisma schema and migrations
├─ package.json
├─ package-lock.json
├─ .gitignore
├─ README.md
└─ .env.example # Template for environment variables


## Prerequisites

- Node.js >= 18
- PostgreSQL installed and running
- npm (Node Package Manager)

---

## Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Voting_API.git
cd Voting_API

2. **Install dependencies**

npm install

3. **Create your .env file**

cp .env.example .env
Edit .env and set your PostgreSQL password.

4. **Run the server**

npm run dev
Server will start at:
http://localhost:4000
