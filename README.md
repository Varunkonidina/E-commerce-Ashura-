# 🛍️ ASHURA – Full Stack E-Commerce Fashion Store

ASHURA is a modern full-stack e-commerce web application focused on men’s fashion, watches, shoes, and accessories.
The platform provides a seamless shopping experience with product browsing, category filtering, authentication, OTP verification, cart management, favorites, and admin product management.

---

# 🚀 Features

## 👤 User Features

* User Registration & Login
* JWT Authentication
* OTP Email Verification
* Product Search with Suggestions
* Category & Type Filtering
* Product Details Page
* Add to Cart
* Favorites/Wishlist
* Order Management
* Responsive UI

---

## 🛠️ Admin Features

* Add Products
* Manage Orders
* Upload Product Images
* Category-wise Product Management

---

# 🧰 Tech Stack

## Frontend

* React.js
* React Router DOM
* Axios
* Bootstrap
* CSS3

---

## Backend

* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate
* MySQL
* Java Mail Sender

---

# 📂 Project Structure

```bash
ASHURA/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── assets/
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── entity/
│   ├── configuration/
│   └── security/
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/ashura.git
```

---

# 🖥️ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# ☕ Backend Setup

## Configure MySQL Database

Create database:

```sql
CREATE DATABASE ashura;
```

---

## Configure `application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ashura
spring.datasource.username=root
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update

jwt.secret=yourSecretKey

spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=yourgmail@gmail.com
spring.mail.password=your_app_password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

---

## Run Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on:

```bash
http://localhost:8080
```

---

# 🔐 OTP Verification Setup

ASHURA uses Gmail SMTP for OTP verification.

## Steps

1. Enable 2-Step Verification on Gmail
2. Generate App Password
3. Add App Password in `application.properties`

Google App Passwords:

https://myaccount.google.com/apppasswords

---

# 📸 Screenshots

## Home Page

* Trending Products
* Latest Collections
* Category Navigation

## Authentication

* Login
* Signup
* OTP Verification

## Product Section

* Product Cards
* Offers & Discounts
* Search Suggestions

---

# 🌟 Future Improvements

* Razorpay Payment Gateway
* Product Reviews & Ratings
* Admin Dashboard Analytics
* AI-based Product Recommendations
* Order Tracking
* Dark Mode

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create your feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Developer

Developed by **Varun Konidina**

---
