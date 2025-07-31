# Playwright: Playlist App test project

This project implements test coverage for the [Playlist App](https://vite-react-alpha-lemon.vercel.app/) functionality. 


# Implemented Test Cases

- Search Functionality
- Add Track Using "+" Button
- Verify Total Duration of the Playlist in Seconds

# How to run the tests

## Install project
```bash
npm i
npx playwright install
```
 ## Run tests in UI mode
```bash
npx playwright test --ui
```
 ## Run tests in debug mode
```bash
npx playwright test --debug
```
 ## Run tests in headless mode
```bash
npx playwright test
npm run test
```
 ## Generate report for headless run
```bash
npx playwright show-report
```
