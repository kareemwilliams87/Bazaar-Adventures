# 🏺 Bazaar Finds
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat&logo=javascript&logoColor=%23F7DF1E)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=flat&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-5433FF?style=flat&logo=stripe&logoColor=white)

Bazaar Finds is a specialized e-commerce platform designed to connect global artisans with a modern audience. It provides a curated marketplace for rare, unique products, featuring a seamless end-to-end shopping experience from product discovery to secure checkout.

---

## 📖 Table of Contents
* [Features](#-features)
* [Technologies Used](#-technologies-used)
* [Installation](#-installation)
* [Usage](#-usage)
* [Architecture](#-file-structure)
* [License](#-license)

---

## 🚀 Features

- **Responsive Design:** A mobile-first UI built to scale across all device sizes.
- **Dynamic Shopping Cart:** Real-time cost calculation and persistent item storage.
- **Secure Checkout:** Integrated with the **Stripe API** for encrypted, industry-standard payment processing.
- **Interactive Previews:** Enhanced UX with hover-states and dynamic product details.
- **User Management:** Full Auth system (Sign-up/Login) with saved order histories.
- **Search & Filter:** Advanced querying to browse through diverse global categories.

---

## 🛠️ Technologies Used

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | HTML5, CSS3, JS | Modern, interactive UI/UX |
| **Backend** | Node.js, Express | RESTful API and server-side logic |
| **Database** | MongoDB | NoSQL storage for flexible product schemas |
| **Payments** | Stripe API | PCI-compliant secure transaction handling |



---

## 💻 Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/kareemwilliams87/bazaar-finds.git](https://github.com/kareemwilliams87/bazaar-finds.git)
   cd bazaar-finds
Install Dependencies:

Bash
npm install
Configure Environment:

Create a .env file in the root.

Add your STRIPE_SECRET_KEY and MONGODB_URI.

Start the Development Server:

Bash
npm start
📂 File Structure
The project follows a modular architecture to separate concerns between data, logic, and presentation:

Plaintext
bazaar-finds/
│
├── models/             # MongoDB Schemas (User, Product, Order)
├── routes/             # API Endpoints (Auth, Payments, Products)
├── public/             # Static assets (CSS, Images, Client-side JS)
├── views/              # Frontend Templates
├── server.js           # Main application entry point
└── .env                # Sensitive environment variables
🧠 Learning Outcomes (Portfolio Highlights)
API Integration: Successfully implemented the Stripe API to handle complex financial workflows.

NoSQL Schema Design: Designed flexible document structures in MongoDB to handle diverse product attributes (jewelry vs. home décor).

Asynchronous JS: Leveraged modern JavaScript for non-blocking UI updates and dynamic data fetching.

Modular Backend: Built a scalable server environment using Express.js middleware for routing and security.

🤝 Contributing
Fork the repository.

Create your feature branch (git checkout -b feature/AmazingFeature).

Commit your changes (git commit -m 'Add some AmazingFeature').

Push to the branch (git push origin feature/AmazingFeature).

Open a Pull Request.

📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

Author: Kareem Williams Computer Information Sciences Candidate GitHub Profile
