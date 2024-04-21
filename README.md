# Interactive Proof System

This application is used for interactive proving of logical formulas. It supports propositional, intuitionist and predicate logic. It proves using natural deduction or sequent calculus. The proof is displayed as Gentzen or Fitch notation.

> The application is available at [https://malstan.github.io/Interactive-Proof-System/](https://malstan.github.io/Interactive-Proof-System/)

## Setup instructions

To set up this application locally, you need to have the npm package manager, which comes with a Node.js installation.

Once installed, use the following command to install the required packages.

```bash
npm install
```

### Running the application locally

After you've installed the required packages, you can run the application locally by following these steps:

1. Navigate to the project directory.
2. Run server typing `npm run dev` into the command line.
3. Once the server starts, you can find the specific address and port in the console output.

### Build instructions

The application can be built for deployment running the following command:

```bash
npm run build
```

Output files will be located inside `dist` folder.
