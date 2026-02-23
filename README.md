# 🌍 Wanderlust – Full Stack Rental Listing Web Application

## 📌 Project Overview

Wanderlust is a full-stack rental listing web application where users can create, explore, and review rental properties. The platform includes secure user authentication and authorization, ensuring that only authorized users can manage their own listings and reviews.

This project was built using Node.js, Express.js, MongoDB, and EJS to demonstrate backend development skills, RESTful routing, and secure CRUD operations.

---

## 🚀 Key Features

### 🔐 Authentication & Authorization
- User Registration and Login
- Secure password hashing
- Session-based authentication
- Only logged-in users can create listings
- Only listing owners can edit/delete their listings
- Only review authors can edit/delete their reviews

---

### 🏠 Listings Management
Users can:
- Create new rental listings
- View all listings
- View individual listing details
- Edit their own listings
- Delete their own listings
- Image upload support using Cloudinary cloud storage

Each listing includes:
- Title
- Description
- Price
- Location
- Image

---

### ⭐ Review System
- Users can add reviews to listings
- Users can edit their own reviews
- Users can delete their own reviews
- Reviews are linked to both listing and author

---

### 📍 Location Integration
- Location data integrated using external API
- Helps display accurate place information
- Improves real-world usability

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js

### Frontend
- EJS (Embedded JavaScript Templates)
- HTML
- CSS
- Bootstrap

### Database
- MongoDB
- Mongoose ODM

### Authentication & Security
- Passport.js
- Passport-Local Strategy
- Express-Session
- Connect-Flash
- Method-Override

  ### Image Storage
- Cloudinary (for secure image upload and cloud storage)
- Multer and multer-storage-cloudinary (for handling file uploads)

---

## 🏗 Architecture

The application follows MVC (Model-View-Controller) architecture:

- Models → User, Listing, Review schemas
- Views → EJS templates
- Controllers → Business logic handling
- Routes → RESTful API endpoints

---

## 📂 Database Schema

### User
- username
- email
- password (hashed)

### Listing
- title
- description
- price
- location
- image
- owner (reference to User)

### Review
- comment
- rating
- author (reference to User)
- listing (reference to Listing)

---

## 🔒 Security Features

- Password hashing
- Session-based login
- Authorization middleware
- Protected routes
- Ownership verification before edit/delete

## ☁️ Cloudinary Integration

The application uses Cloudinary for storing listing images securely in the cloud. This allows efficient image management, faster loading, and prevents storing large image files on the server. Multer and multer-storage-cloudinary were used to handle file uploads and integrate Cloudinary with the Node.js backend.

---

## 📚 Learning Outcomes

Through this project, I gained hands-on experience in:

- Building RESTful web applications
- Implementing authentication and authorization
- Managing database relationships
- Designing secure CRUD systems
- Structuring scalable backend architecture
- Working with middleware in Express

---

## 🚀 Future Improvements

- JWT-based authentication
- Search and filter functionality
- User profile dashboard
- Improved UI/UX
- Image upload optimization

---

## 👨‍💻 Author

Venkata Ramana
Backend Developer  
GitHub: https://github.com/yourusername

---

## 🧪 How to Run Locally

1. Clone the repository
2. Install dependencies
   ```
   npm install
   ```
3. Start MongoDB
4. Run the application
   ```
   node app.js
   ```
5. Open browser at:
   ```
   http://localhost:3000
   ```

---

## 📌 Conclusion

Wanderlust demonstrates real-world backend development skills including authentication, authorization, RESTful routing, and database management. It showcases the ability to build secure and scalable full-stack web applications.
