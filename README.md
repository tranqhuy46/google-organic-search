# NIMBLE technical test
    Google organic scraper manager web app
## What's inside?

Monorepo with 2 apps:
    - client (Reactjs)
    - server (Nodejs)

### Apps and Packages

- `server`: a [Node.js] app
- `client`: a [React.js] app
- `ui`: common types
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Local setup
#### Prerequisites
    - Docker
    - Node.js v16 or above

#### Install
    - At the root dir, run `yarn` or `npm install` to install all needed dependencies.
    - Fill all the env variables into:
        - apps/client/.env (see env-example)
        - apps/server/.env (see env-example)

#### Development
    - At the root dir, run `yarn dev:server`, open another terminal tab then run `yarn dev:client`

#### Install `pgAdmin4`
    - Navigate to `apps/server`, make script `setup-pg-admin.sh` executable then run it.
    - Now open up the browser, then navigate to `localhost`.
    - Login to pgAdmin4 using those credentials provided in script `setup-pg-admin.sh`.

#### I would do some extra stuffs if I have more time.
For example: push all the heavy task in the BE side to task queue, plus using long-polling on FE side to fetch report status. See [Nodejs-task-queue-bull](https://github.com/OptimalBits/bull#bull-features). Redis needed to be setup first in order to run this. Luckily, I found a free Redis service provider (https://dev.to/ramko9999/host-and-use-redis-for-free-51if).
# Thank you

