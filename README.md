# MNEE Service

**MNEE Service** is a Node.js backend that handles all functionalities related to the **MNEE SDK**, including:

- Balance fetching
- Transfer operations
- Transaction fetching
- Transaction status checking

This service acts as the core backend powering interactions with the MNEE platform.

## Documentation

For full details on the MNEE SDK, refer to the official docs: [https://docs.mnee.io/](https://docs.mnee.io/)

## Prerequisites

- **Node.js** installed on your machine (v16+ recommended)
- Internet connection to access the MNEE API

## Installation

1. Clone the repository:

```bash
git clone https://github.com/rapyd-mnee-payment-gateway/mnee-service.git
cd mnee-service
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The server will start in development mode and will be ready to handle requests related to MNEE operations.

## Usage

Once running, the service provides endpoints to:

- Fetch balances
- Initiate transfers
- Retrieve transaction histories
- Check transaction statuses

> You can explore the code to see all available functions and endpoints.
