import { execSync } from "child_process"
import fs from "fs"

console.log("Starting deployment readiness tests...")

try {
  // Check if build script exists
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"))
  if (!packageJson.scripts || !packageJson.scripts.build) {
    throw new Error('Build script is missing in package.json. Please add "build": "next build" to your scripts.')
  }

  // 1. Local Build Test
  console.log("\nRunning build command...")
  execSync("npm run build", { stdio: "inherit" })
  console.log("Build completed successfully.")

  // 2. TypeScript Check
  console.log("\nRunning TypeScript check...")
  execSync("npx tsc --noEmit", { stdio: "inherit" })
  console.log("TypeScript check passed.")

  // 3. Lint Check
  console.log("\nRunning ESLint...")
  execSync("npx eslint .", { stdio: "inherit" })
  console.log("ESLint check passed.")

  // 4. Unit Tests
  console.log("\nRunning unit tests...")
  execSync("npm test", { stdio: "inherit" })
  console.log("Unit tests completed successfully.")

  console.log("\nAll tests passed. The project appears to be ready for deployment on Vercel.")
} catch (error) {
  console.error("\nAn error occurred during the tests:")
  console.error(error.message)
  console.log("\nPlease address the above issues before deploying.")
}

