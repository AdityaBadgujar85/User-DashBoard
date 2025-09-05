# Assignment-6 React User Management Application

This project is a **React application** that implements **CRUD operations** for managing users. It interacts with the public API **[JSONPlaceholder](https://jsonplaceholder.typicode.com/)** and demonstrates how to use **Axios** for HTTP requests, along with form validation, error handling, and UI updates.

---

## 🚀 Live Demo  
You can check the deployed project here:  
🔗 [User DashBoard - Netlify Link](https://user-dashboard-project-sub.netlify.app/)

---

## 📌 Features
- **Fetch & Display Users:**  
  - On component mount, fetches user data from the API.  
  - Displays users in a **table/card layout** with **Name, Email, Username**.  

- **Add User:**  
  - Form with fields for **Name, Email, Username**.  
  - Sends a **POST request** to API on submission.  
  - Updates UI with the new user.  

- **Update User:**  
  - Each user has an **Edit button**.  
  - Clicking Edit populates the form with user details.  
  - Sends a **PUT/PATCH request** on save.  
  - Reflects changes in UI.  

- **Delete User:**  
  - Each user has a **Delete button**.  
  - Shows confirmation before deletion.  
  - Sends a **DELETE request** and removes user from UI.  

- **Validation & Error Handling:**  
  - Validates **non-empty fields & valid email format**.  
  - Displays error messages if API requests fail.  

- **Loading State:**  
  - Shows a loading spinner/indicator while fetching users.  

---

## 🛠️ Tech Stack
- **React.js** (Functional Components + Hooks)  
- **Axios** (for HTTP requests)  
- **CSS / Flexbox / Grid** (for layout and UI styling)  

---
