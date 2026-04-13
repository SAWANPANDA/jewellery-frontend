# 💎 Jewellery E-Commerce Frontend (Angular)

## 📌 Overview

This is the frontend application for the Jewellery E-Commerce SPA built using Angular.
It provides a user interface to manage jewellery items with CRUD operations, filtering, sorting, and dynamic price calculation.

---

## 🛠 Tech Stack

* Angular 21
* TypeScript
* HTML & CSS
* REST API integration

---

## 🚀 Features

### 🧾 Item Management

* Add new jewellery items
* Update existing items
* Delete items
* View all items in a grid layout

### 🔍 Filtering & Sorting

* Filter items by metal type (Gold, Silver, Diamond)
* Sort items by:

  * Name
  * Weight

### 💰 Price Calculation

Final price is calculated dynamically using:

* Metal price per gram
* Weight
* Making charges
* Shipping charges
* Tax percentage

### ✅ Validation

* Name field accepts only letters
* Required field validation
* Numeric validation for weight, tax, and charges
* Error and success messages displayed

### 🎨 UI

* Responsive grid layout
* Clean and simple design
* User-friendly interface

---

## ▶️ How to Run

1. Clone the repository:

```
git clone https://github.com/SAWANPANDA/jewellery-frontend.git
```

2. Navigate to project folder:

```
cd jewellery-frontend
```

3. Install dependencies:

```
npm install
```

4. Run the application:

```
ng serve
```

5. Open browser:

```
http://localhost:4200
```

---

## 🔗 Backend API

This frontend connects to backend APIs running at:

```
http://localhost:8080
```

---

## 📂 Project Structure

```
src/
 ├── app/
 │   ├── components/
 │   │   └── item-list/
 │   ├── services/
 │   └── app.ts
 ├── index.html
 └── styles.css
```

---

## 📌 Notes

* Backend must be running before using frontend
* Metal price and shipping charges are entered manually
* Designed for demonstration and assignment purposes

---

## 🔮 Future Improvements

* Add user authentication (login/signup)
* Improve UI with Tailwind CSS
* Add advanced filters (price range)
* Integrate live metal price API

---

## 👨‍💻 Author

Sawan Panda
