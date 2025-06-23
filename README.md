Travlr App - Full Stack Web Application

Overview
This is a full stack travel booking web application featuring both customer-facing pages and a secure administrative interface. It was developed using the MEAN stack (MongoDB, Express, Angular, Node.js). The project showcases CRUD functionality, RESTful APIs, secure authentication, and component-based front-end architecture.

Architecture
Frontend Approaches Used:
This project used a combination of Express HTML templates (Handlebars) and a single-page application (SPA) built with Angular. Express/Handlebars provided basic server-rendered pages early in the project, which helped scaffold and test the backend. Angular was used later for the admin SPA, offering a reactive user interface with reusable components and a better user experience.

Backend Architecture & NoSQL Choice:
The backend is built with Node.js and Express, connected to a MongoDB database. MongoDB was chosen for its flexibility with schema design and scalability. It works well with JSON-based APIs and supports quick iteration during development, making it ideal for modern web applications.

Functionality
JSON vs. JavaScript:
JSON (JavaScript Object Notation) is a lightweight data format used to exchange data between frontend and backend systems. While it’s based on JavaScript syntax, it’s purely a data format with no logic. It plays a crucial role in tying together the frontend and backend: for example, API responses and requests are structured in JSON, allowing Angular to receive data from Express and MongoDB seamlessly.

Refactoring for Efficiency:
Throughout the project, code was refactored to improve readability and reduce duplication. For instance, form validation logic and UI components in Angular were modularized into reusable components. This not only cut down on repeated code but also made the app more maintainable and scalable.

Testing
Understanding Methods, Endpoints & Security:
In the API layer, we used REST principles to define methods like GET, POST, PUT, and DELETE for trip-related data. Endpoints were tested using Postman, both with and without authentication headers. The addition of JWT-based admin authentication introduced extra complexity, requiring tests to ensure secure access to protected routes. Security layers were verified by attempting both authenticated and unauthenticated requests.

Reflection
This course has helped me connect all the pieces of full stack development—database design, RESTful APIs, front-end frameworks, and backend logic. I’ve learned how each component communicates and how to build something from scratch that actually works end-to-end. The ability to secure parts of the application using authentication was a huge milestone.

Skills I’ve gained include:

Working with the MEAN stack
Designing and consuming REST APIs
Using Angular to build SPAs with reusable components
Writing secure login functionality with JWT
Testing APIs and handling error responses

These skills are directly applicable to real-world development jobs and have made me a more confident and marketable candidate.
