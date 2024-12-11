# selfcare-dashboard-frontend users pages 
Micro-frontend developed as an extension of the [selfcare-dashboard-frontend](https://github.com/pagopa/selfcare-dashboard-frontend) using WebPack 5's module federation, in order to serve all the pages related to selfcare users (list, detail, add, delete and edit).

It shares some common model with the container app: see [selfcare-dashboard-frontend](https://github.com/pagopa/selfcare-dashboard-frontend#data-and-modeltypes-shared-with-remotes-micro-frontend) for details

## Remotes components
This micro-frontend serve the micro-components listed in this section.

### RoutingUsers
It will configure the routing to serve all the pages related to the selfcare users entities

This component requires the props described into [selfcare-dashboard-frontend](https://github.com/pagopa/selfcare-dashboard-frontend#props-to-configure-dashboard-micro-frontends-pages)

### RoutingProductUsers
It will configure the routing to serve all the pages related to the selfcare selected product users entities

This component requires the props described into [selfcare-dashboard-frontend](https://github.com/pagopa/selfcare-dashboard-frontend#props-to-configure-dashboard-micro-frontends-pages)

## To configure the workspace execute the following commands
- yarn install
- yarn generate

## To execute locally a configured workspace execute the following command
Inside this micro-frontend has been developed a mock of the layout in order to allow to run and develop without the need to execute the container app (see [selfcare-dashboard-frontend](https://github.com/pagopa/selfcare-dashboard-frontend))
Run the following command allow to serve the remote components locally and to run the mocked layout for local development
- yarn start

## To execute locally mocking REST invocation, modify the file .env.development.local setting
- REACT_APP_API_MOCK_PARTY_USERS=true

## To build a configured workspace execute the following command
- yarn build

## Setup Playwright for Testing

Ensure you have **Yarn** and **Node.js** installed on your machine. You can check their installation by running:
- node -v
- yarn -v
## Install Dependencies
- cd e2e
- yarn install

## Run Playwright Tests Locally
- yarn playwright test  --ui or --headed or --project