# PLP Bookstore MongoDB Scripts

This project contains MongoDB scripts for managing and querying data in a bookstore database called **plp_bookstore**.

---

## Project Overview

The scripts demonstrate basic CRUD (Create, Read, Update, Delete) and query operations in MongoDB using Node.js.

Example operations include:
- Inserting book records
- Finding books by genre or author
- Updating book details
- Deleting books
- Running aggregation queries (optional)

---

## Prerequisites

Before running the scripts, make sure you have:

1. **Node.js** installed  
   - [Download Node.js](https://nodejs.org/)
   - Check installation:
     ```bash
     node -v
     npm -v
     ```

2. **MongoDB** installed and running locally  
   - Start MongoDB (on Linux):
     ```bash
     sudo systemctl start mongod
     ```
   - Or run it manually:
     ```bash
     mongod
     ```

3. **MongoDB Database Setup**
   - The database name is `plp_bookstore`.
   - You can create it automatically by running the insert script (MongoDB creates databases and collections on first insert).

---

## Installation & Setup

1. Clone or download this project folder  
2. Navigate into it:
   ```bash
   cd mongodb-data-layer-fundamentals-and-advanced-techniques
