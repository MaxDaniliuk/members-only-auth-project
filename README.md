# Members Only Authentication Project

A full-stack web application that demonstrates user authentication, access control, and message posting. Logged-in users can post messages, but only authorized users can view post details like post author and date of post creation, creating a "members-only" experience.

🌐 Check out the live project here: [Visit CyberClub](http://cyber-club.daniliuk.com) 

---
<br>

## 🚀 Features

- 🔐 User authentication using **Passport.js** (passport-local strategy)
- 🧾 Role-based access control for members and non-members
- 💬 Logged-in users can create posts
- ⭐ Members can see post details like who created a post and when
- 🛡️ Admin functionality for deleting posts 
- 🧰 Full-stack architecture (React + Express + PostgreSQL)
- 🔄 Persistent sessions and protected routes
<br>

## 🛠️ Tech Stack

**Frontend:**
- React v19
- React Router DOM v6
- CSS3

**Backend:**
- Node.js (Express)
- PostgreSQL
- Passport.js for authentication
- bcryptjs for password hashing

**Deployment:**
- Coolify (self-hosted on VPS)
<br>

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/MaxDaniliuk/members-only-auth-project.git
cd members-only-auth-project
```

### 2️⃣ Backend setup
1. Go to the `/server` folder:
   
   ```bash
   cd server
   ```
2. Install dependencies:
   
   ```bash
   npm install
   ```
3. Create a `.env` file in the `/server` directory:
   
   ```env
   PORT=3000
   DATABASE_URI="postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME?connection_limit=5"
   COOKIE_SECRET="SECRET"
   ORIGIN="frontend URL" # "http://localhost:5173/"
   PASSCODE="PASSCODE"
   ```
   > ⚠️ **Important:**
   >
   > Install PostgreSQL via PostgresApp. Visit [Postgres.app](https://postgresapp.com/) and follow the instructions outlined. Configure your **$PATH** to use the included command line tools. Then, create a database and include its name in the connection string. 

4. Run Prisma migrations:

   ```bash
   npx prisma migrate dev --name init
   ```
5. Start the server:

   ```bash
   npm run dev
   ```
   Server runs on http://localhost:3000/ (or your configured port).

6. Create an admin (optional)

   The project supports admin functionality for deleting posts, but admin must be created manually.
   
   1. Connect to your PostgreSQL database using `psql`:

      ```bash
      psql -U your_db_user -d your_database_name
      ```
   2. Find the user you want to make an admin:

      ```sql
        SELECT * FROM users;
      ```
   3. Update the user's role to admin:

       ```sql
        UPDATE users
        SET isadmin = true
        WHERE user_id = 1; -- replace 1 with the user's ID
      ```
      ✅ After this, the user will have admin privileges.

### 2️⃣ Frontend setup
1. Open a new terminal and navigate to the `/client` folder:

   ```bash
   cd client
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file in the `/client` directory:

   ```env
   VITE_API_URL='Backend URL' # "http://localhost:3000"
   ```

4. Start the server in development mode:
   
   ```bash
   npm run dev
   ```
   Frontend runs on http://localhost:5173/
<br>

## 🤝 Contributing

Contributions are welcome!
If you’d like to improve features or fix bugs:

1. Fork the repository
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:

   ```bash
   git commit -m "[Change description]"
   ```
4. Push to your branch:

   ```bash
   git push origin feature/your-feature
   ```
5. Open a Pull Request
   
<br>

## ☁️ Deployment

This project is **self-hosted** on a **Virtual Private Server (VPS)** and deployed using [**Coolify**](https://coolify.io/) — an open-source, self-hostable platform for managing full-stack applications.
 - **Frontend (React)**, **Backend (Express API)** and **PostgreSQL Database** are deployed through Coolify.

🌐 **Live Project:** [Visit CyberClub](http://cyber-club.daniliuk.com) 

<br>

## 🧾 License

This project is licensed under the [ISC License](LICENSE) © 2025 Maksim Daniliuk.

<br>

## 📬 Contact

Created by [Max Daniliuk](https://github.com/MaxDaniliuk)

Email: maksim.daniliuk@gmail.com

<br>

## 🌟 Acknowledgments

This project was inspired by “Members Only” authentication exercise from The Odin Project / full-stack path. 
Special thanks to the amazing open-source community and the developers behind **Express**, **React**, **Prisma**, and **Passport.js** for making this project possible.


