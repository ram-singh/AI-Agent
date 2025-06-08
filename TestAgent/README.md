# AI TestAgent – Angular Jest Coverage Analyzer

## Overview

This tool analyzes Jest test coverage in your Angular 18 project and identifies files with less than 90% line coverage.

## Tech Stack

- Node.js (Express)
- ReactJS with Vite
- Azure OpenAI GPT-4o (Optional for advanced test suggestion/auto-fix)
- Jest (Angular 18)

## Prerequisites

- Node.js v18+
- Angular project using Jest with `npm run coverage`
- Angular project must exist under `nglcp/` or provide full path

## Setup

### 1. Backend
cd backend
npm install
node server.js

### 2. Frontend React + Vite
cd frontend
npm install
npm run dev

### 3. Prod ready app that will use single server to run frontend and backend
http://localhost:5000 — should load the React app
http://localhost:5000/api/hello — should return the backend JSON

#### Fix Jest.config.js for angular app
coverageDirectory: 'coverage/'
coverageReporters: ['html', 'json', 'text-summary']

#### In development, you can still run Vite separately using npm run dev inside frontend