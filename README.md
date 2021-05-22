# pta-app

This app digitises the assessment of post traumatic amnesia (PTA) in patients who have suffered a traumatic brain injury (TBI).

Our app can be used to administer the Westmead PTA Scale (WPTAS) and Agitated Behaviour Scale (ABS). The results to these tests are stored and can be viewed in our app.

## Getting Started

Follow these instructions to run the app locally.

### Install Dependencies

Install server dependencies

```
npm i
```

Install client dependencies

```
npm run client-install
```

### Run Build

The following command runs both the server and React app in development mode.

```
npm run dev
```

Open http://localhost:3000 to view it in the browser.

## Project Structure

All files outside of the `client` folder is used by the express server.

- `server.ts` is the entry script for the server.
- The directory `routes\api` contains the actual server functions and logic.
- The `models` directory contains our database schemas.

Everything within the `client` folder is related to the React client.

- The `components` directory contain `.tsx` component files.
- The `data` directory contains static application information including the WPTAS and ABS test questions.
- The `services` directory contains services which facilitate communication between the React frontend and Express server.

## Testing

To run client side tests: only

```
npm run client-test
```

To run the entire test suite:

```
npm test
```

## Deploying

A Heroku account is required and the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line) should be installed. Please contact one of the authors to be added as a collaborator.

If you have not done so already, clone the repository.

```
heroku git:clone -a cryptic-journey-73026
```

In the repository's root directory run the following to deploy changes.

```
git add .
git commit -am "<message>"
git push heroku main
```

Your changes will be deployed to https://cryptic-journey-73026.herokuapp.com/.

## Authors

- Erica Son
- Ash Henson
- Tiến Nguyễn
