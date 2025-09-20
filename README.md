# HabitTrack

HabitTrack is a web application designed to help you track your habits and create tasks to stay organized and productive.

## ✨ Features

*   **Habit Tracking**: Easily add, manage, and track your daily habits.
*   **Task Management**: Create and organize your tasks to keep up with your goals.
*   **Authentication**: Secure user authentication using Google OAuth with Firebase.
*   **Responsive Design**: A clean and modern user interface that works on all devices.

## 🚀 Technologies Used

*   **Framework**: [Next.js](https://nextjs.org/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
*   **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
*   **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react)

## 📦 Getting Started

### Prerequisites

*   Node.js (v20 or higher)
*   npm, yarn, or pnpm

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/habittrack.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd habittrack
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Set up your Firebase project and add your Firebase configuration to a `.env.local` file in the root of the project. See `src/lib/firebase/client.ts` for the required environment variables.

    ```.env.local
    NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
    NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
    ```

### Running the Development Server

To run the development server, use the following command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

The project follows a standard Next.js App Router structure:

```
habittrack/
├── public/                 # Static assets
├── src/
│   ├── app/                # Application pages and layouts
│   ├── components/         # Reusable components
│   │   ├── ui/             # shadcn/ui components
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utility functions and libraries
│       ├── firebase/       # Firebase configuration and authentication
│       └── ...
├── .gitignore
├── next.config.ts
├── package.json
├── README.md
└── tsconfig.json
```

## 📜 Available Scripts

In the project directory, you can run the following scripts:

*   `npm run dev`: Runs the app in development mode.
*   `npm run build`: Builds the app for production.
*   `npm run start`: Starts the production server.
*   `npm run lint`: Lints the code using ESLint.