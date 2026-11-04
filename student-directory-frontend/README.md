# Student Directory Frontend (banana)

React frontend connecting to Lesson 5 JWT backend.

## Environment & Run Instructions
1. Make sure backend (`student-directory-api`) is running on `http://localhost:3000`.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open `http://localhost:5173` in browser.

## Reflection Answers

1. **Why do we store the token in localStorage? What is one security risk of doing so, and what is a more secure alternative?**
   We store the token in `localStorage` so that user authentication state persists across page refreshes without forcing re-login. The main security risk is vulnerability to Cross-Site Scripting (XSS), where malicious injected scripts can read `localStorage` and steal the token. A more secure alternative is storing tokens in `HttpOnly` cookies set by the server.

2. **What is the purpose of the AuthContext? Why not just pass the token as a prop to each component?**
   `AuthContext` provides global authentication state accessible anywhere in the component tree. Passing tokens via props (prop drilling) down through multiple nested components creates bloated, redundant code. `AuthContext` allows any component to access user state directly via `useAuth()`.

3. **What happens on the frontend when the JWT expires? Describe the user experience you would want to implement.**
   When the JWT expires, API requests return `401 Unauthorized`. The ideal user experience is detecting 401 responses globally, clearing stored auth data, showing a session expiration alert to the user, and automatically redirecting them to `/login`.

4. **What is the difference between the backend's requireAuth middleware (from Lesson 5) and the frontend's ProtectedRoute component? Why do we need both?**
   The backend `requireAuth` middleware securely verifies tokens and blocks unauthorized database access at the API layer. The frontend `ProtectedRoute` manages UI navigation by redirecting unauthenticated users away from private views. We need both because frontend routes only affect UI display, while backend middleware ensures strict data security.