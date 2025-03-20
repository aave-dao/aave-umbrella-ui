# Aave Umbrella UI

<img src="./public/umbrella-logo.jpg" alt="Aave Governance v3" width="100%" height="70%">

<br>

The Aave Umbrella UI is a modern web application that provides a user-friendly interface for interacting with [Aave Umbrella](https://github.com/aave-dao/aave-umbrella). It allows users to view their staked tokens, claim rewards, and manage their positions across multiple blockchain networks.

## Features

- **Staking**: basic supply, withdraw and cooldown from/to Umbrella StakeTokens
- **Claiming Rewards**: Easily claim rewards across different assets
- **Yield Analytics**: View aggregated realtime information about net yield and rewards

## Technology Stack

The application is built using the following technologies:

- **Frontend Framework**: [Next.js 15](https://nextjs.org/) with React 19
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom components
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) for global state
- **Web3 Integration**: [wagmi](https://wagmi.sh/) and [viem](https://viem.sh/) for blockchain interactions
- **UI Components**: Custom components with [Radix UI](https://www.radix-ui.com/) primitives
- **Data Fetching**: [TanStack Query](https://tanstack.com/query) for efficient data fetching and caching
- **Wallet Connection**: [RainbowKit](https://www.rainbowkit.com/) for seamless wallet integration

## Getting Started

### Installation

1. Clone the repository:

```bash
git clone https://github.com/bgd-labs/aave-umbrella-ui.git
cd aave-umbrella-ui
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Copy the `.env.example` file to `.env.local` and fill in the required RPC endpoints for each network:

```bash
cp .env.example .env.local
```

Edit the `.env.local` file to add your RPC endpoints for each supported network.

### Development

To start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## Deploy your own Vercel instance
Deploy your own instance of the application effortlessly through Vercel by simply clicking the button below and following the guided setup process:


[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbgd-labs%2Faave-umbrella-ui)

## Project Structure

```
src/
├── abis/            # Contract ABIs
├── app/             # Next.js app directory
│   ├── components/  # Page-specific components
│   ├── stake/       # Staking functionality
│   ├── withdraw/    # Withdrawal functionality
│   └── claim-*/     # Reward claiming functionality
├── components/      # Shared UI components
├── configs/         # Configuration files
├── constants/       # Application constants
├── hooks/           # Custom React hooks
├── mutations/       # TanStack Query mutations
├── providers/       # React context providers
├── queries/         # TanStack Query queries
├── store/           # Zustand store definitions
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

## License

Copyright © 2025, Aave DAO, represented by its governance smart contracts.

Created by [BGD Labs](https://bgdlabs.com/).

The default license of this repository is [BUSL1.1](./LICENSE).

**IMPORTANT**. The BUSL1.1 license of this repository allows for any usage of the software, if respecting the _Additional Use Grant_ limitations, forbidding any use case damaging anyhow the Aave DAO's interests.
