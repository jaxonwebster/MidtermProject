1. Express: `server.js` creates the Express app and mounts the routers.
2. POST request: The forms send POST requests to create, update, or delete records. For example, the assignment form sends a POST request to `/assignments`.
3. GET request: The browser uses GET routes to load the dashboard and the list pages.
4. Three routers: `src/routes/` contains routers for the dashboard, courses, assignments, and study sessions.
5. Dynamic route: Assignment routes include paths such as `/assignments/:id` and `/assignments/:id/edit`.
6. Dynamic pages: EJS templates in `src/views/` render data passed from the controllers.
7. Reusable views: Files in `src/views/partials/` are included in more than one page.
8. Three controllers: `src/controllers/` contains dashboard, course, assignment, and study-session controllers.
9. Three models: `src/models/` defines the Course, Assignment, and StudySession models.
10. ORM: The controllers use TypeORM repositories to find and save records instead of writing SQL queries directly.
11. Relational database: TypeORM connects to SQLite through the `sql.js` driver.
12. Three tables: The models create `courses`, `assignments`, and `study_sessions` tables. Assignments are related to courses, and study sessions can be related to assignments.
13. Professional appearance: `public/styles.css` provides a consistent layout for the dashboard, lists, forms, and smaller screens.
14. New library: `express-validator` checks form values. Confirm that it meets the requirement to use a library you have not used before.
15. This explanation: This file is in the project root and maps the requirements to the code.
16. Architectural decision: Routes, controllers, models, database setup, and views are in separate folders. This makes it easier to find the code responsible for each part of the app.