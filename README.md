# React Data Table Assessment

A responsive, professional-looking data table built with **React**, **TypeScript**, and **TailwindCSS**. The table fetches a large dataset, supports filtering, pagination, and allows users to choose how many items to display per page (25, 50, 100).  

---

## **Features**

- Fetches large dataset (500+ items) from API
- Filter products by **title, brand, or category**
- Pagination with **Prev / Next** buttons
- Page size selection (25, 50, 100 items per page)
- Sticky table header
- Fully responsive layout

---

## **Decisions & Assumptions**

- **API Choice:** Used a mock/fake products API with enough items to support pagination and testing.  
- **Table Design:** `table-fixed` used to prevent column shifting when changing pages.  
- **Filtering:** Client-side filtering applied to all columns (title, brand, category).  
- **Pagination:** Simple "Prev / Next" buttons with page size selection.  
- **Colors:** Applied your requested palette consistently.  
- **Responsiveness:** Search box and dropdown stack on mobile screens for better UX. 

---

## **Assumptions:**

- Dataset is small enough to fetch all at once (for demo/testing purposes).  
- No server-side filtering/pagination required.  

---

## **Technologies Used**

- **React 18+** (functional components)
- **TypeScript** (static typing)
- **Axios** (API requests)
- **Tailwind CSS** (utility-first styling)
- **React Router DOM** (for navigation between pages/components)

---

## **Styling**
- CSS is managed using **Tailwind CSS**.  

---

## **How to Run the App**

## Navigate to the project folder:
cd react-data-table-assessment

## Install dependencies:
npm install

## Start the development server:
npm run dev

## Open the app in the browser at:
http://localhost:5173

---