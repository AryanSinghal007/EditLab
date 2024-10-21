# EditLab - Real-Time Code Editor

EditLab is a real-time collaborative code editor that allows users to write, edit, and share code seamlessly across devices. Currently, the project implements real-time collaboration using WebSockets. It is open for contributions, and anyone is welcome to add new features.

https://github.com/user-attachments/assets/76a6f553-eb88-4e79-8eae-50f03036913f

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (version 12 or higher)
- npm (version 6 or higher) or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AryanSinghal007/EditLab.git
   cd edit-lab
3. Install the dependencies:
   ```bash
   npm install
4. Start the development server:
   ```bash
   npm run start:front
Open http://localhost:3000 in your browser to view the app.

## Available Scripts

In the project directory, you can run:
- npm run start:front: Runs the front-end app in development mode.
- npm run server:dev: Starts the back-end server using nodemon in development mode.
- npm run server:prod: Starts the production server.
- npm run build: Builds the app for production, optimizing the output for the best performance.
- npm test: Launches the test runner in interactive watch mode.
- npm run eject: Removes the single build dependency and gives you full control over the app configuration.

## Tech Stack
- React: Front-end library for building user interfaces.
- Express: Back-end framework for handling server requests.
- Socket.io: Enables real-time, bidirectional communication between the client and server.

## Deployment
To deploy the application for production:

- Build the app:
  ```bash
  npm run build
- The optimized files will be in the build/ folder, ready to be deployed to any web server.


## Learn More
- [React Documentation](https://reactjs.org/) - Learn the basics of React.
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started) - Dive deeper into the Create React App.

## Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request for any bugs or features.
