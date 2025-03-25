# CS50x Answer Checker

This project is a React application built with TypeScript and Vite, designed for a mini CS50x puzzle day. It allows teams to submit answers to questions, view the leaderboard, and track their progress.

## Features

- **Authentication:** Secure user authentication using Supabase.
- **Question Display:** Displays questions fetched from an external API.
- **Answer Submission:** Allows teams to submit answers and receive immediate feedback.
- **Real-time Leaderboard:** Shows the current ranking of teams, updated in real-time.
- **Team Management:** Allows teams to register their team name.
- **Confetti Celebrations:** Celebratory confetti animation upon submitting a correct answer.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **TypeScript:** A superset of JavaScript that adds static typing.
- **Vite:** A fast build tool for modern web development.
- **MUI (Material UI):** A React UI framework providing pre-designed components.
- **Supabase:** An open-source Firebase alternative for authentication and data storage.
- **React Query:** A library for fetching, caching, and updating asynchronous data in React.
- **React Flip Toolkit:** A library for creating smooth animations when elements change position.
- **React Confetti Boom:** A library for rendering confetti animations.
- **ESLint:** A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

## Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/definitelyna/Mini_CS50x_Answer_Frontend
    cd Mini_CS50x_Answer_Frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Variables:**

    Create a `.env` file in the root directory and add the following environment variables:

    ```
    VITE_SUPABASE_URL=<your_supabase_url>
    VITE_SUPABASE_ANON_KEY=<your_supabase_anon_key>
    ```

    Replace `<your_supabase_url>` and `<your_supabase_anon_key>` with your Supabase project URL and anonymous key, respectively.

4.  **Run the application:**

    ```bash
    npm run dev
    ```

    This will start the development server. Open your browser and navigate to the address provided (usually `http://localhost:5173`).

## Project Structure

- `src/`: Contains the main application code.
  - `App.tsx`: The main application component.
  - `index.css`: Global CSS styles.
  - `main.tsx`: Entry point for the React application.
  - `vite-env.d.ts`: TypeScript environment declaration file.
  - `hooks/`: Contains custom React hooks for fetching data.
  - `pages/`: Contains React components for different pages/sections of the application.
    - `InputTeam/`: Components related to team name input.
    - `QuestionCheck/`: Components related to the question answering section.
    - `SignIn/`: Components related to the sign-in page.
  - `type/`: Contains TypeScript type definitions.
  - `utils/`: Contains utility functions.
- `public/`: Contains static assets, such as images.
- `eslint.config.js`: ESLint configuration file.
- `package.json`: Contains project metadata and dependencies.
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: TypeScript configuration files.
- `vite.config.ts`: Vite configuration file.
- `vercel.json`: Vercel configuration file (for deployment).

## ESLint Configuration

The project uses ESLint for code linting with the following plugins:

- `@eslint/js`: Provides recommended JavaScript rules.
- `eslint-plugin-react-hooks`: Enforces rules of React Hooks.
- `eslint-plugin-react-refresh`: Ensures Fast Refresh works correctly in React components.
- `typescript-eslint`: Provides TypeScript-specific linting rules.
- `globals`: Provides standard global variables.

To run the linter:

```bash
npm run lint
```

Refer to the `eslint.config.js` file for the specific linting rules configured for this project.

## Deployment

The project is configured for deployment on Vercel. Simply connect your Vercel account to the repository. The `vercel.json` file contains the necessary configuration for routing.

## API Endpoints

The application fetches data from the following API endpoints:

- `https://isph-mini-cs50x-api.vercel.app/questions`: Fetches the list of questions.
- `https://isph-mini-cs50x-api.vercel.app/get-team-name`: Fetches the team name for a given email.
- `https://isph-mini-cs50x-api.vercel.app/team/:teamNameId/questions`: Fetches the questions answered by a specific team.
- `https://isph-mini-cs50x-api.vercel.app/ranking`: Fetches the leaderboard rankings.
- `https://isph-mini-cs50x-api.vercel.app/answer`: Submits an answer to a question.
- `https://isph-mini-cs50x-api.vercel.app/update-team-name`: Updates the team name.

## Contributing

Contributions are welcome! Please submit a pull request with your changes.
