# Agent Mint SDK

A secure Node.js library for accessing Solana blockchain data. This package provides easy-to-use functions for retrieving data about Solana tokens, pools, trades, and more without requiring you to provide your own API key.

## Key Features

- **Built-in API Key**: No need to register for an API key - we've included one for you
- **Simple Interface**: Easy-to-use functions for common Solana token data queries
- **TypeScript Support**: Full TypeScript definitions for all functions and responses
- **Error Handling**: Comprehensive error handling and fallbacks
- **Next.js Compatible**: Works seamlessly with Next.js API routes

## Installation

```bash
npm install agent-mint-sdk
# or
yarn add agent-mint-sdk
```

## Configuration

The SDK can be configured using environment variables or through the client configuration:

### Environment Variables

Create a `.env` file in your project root:

```env
SAFEQUERY_API_URL=https://biquery-api.vercel.app
```

### Client Configuration

You can also configure the client when initializing:

```typescript
import { SafeQueryClient } from 'agent-mint-sdk';

const client = new SafeQueryClient({
  baseUrl: 'https://your-custom-api-url.com',
  timeout: 5000 // 5 seconds
});
```

## Requirements

- Node.js 14 or higher

## Usage

### Basic Usage

```typescript
import {
  getPoolData,
  getMarketCap,
  getTokenHolders,
  getTopTraders,
} from "agent-mint-sdk";

// Example: Get pool data for a Solana token
async function fetchPoolData(mintAddress) {
  try {
    const poolData = await getPoolData(mintAddress);
    console.log("Pool data:", poolData);
  } catch (error) {
    console.error("Error fetching pool data:", error);
  }
}

// Example: Get market cap for a Solana token
async function fetchMarketCap(mintAddress) {
  try {
    const marketCapData = await getMarketCap(mintAddress);
    console.log("Market cap:", marketCapData.marketCap);
    console.log("Token supply:", marketCapData.tokenSupply);
  } catch (error) {
    console.error("Error fetching market cap data:", error);
  }
}

// Example: Get token holders for a Solana token
async function fetchTokenHolders(mintAddress) {
  try {
    const holdersData = await getTokenHolders(mintAddress, 10); // Limit to top 10 holders
    console.log("Total holders:", holdersData.totalHolders);
    console.log("Top holders:", holdersData.topHolders);
  } catch (error) {
    console.error("Error fetching token holders data:", error);
  }
}

// Example: Get top traders for a Solana token
async function fetchTopTraders(mintAddress) {
  try {
    const tradersData = await getTopTraders(mintAddress, 5); // Limit to top 5 traders
    console.log("Top traders:", tradersData.traders);
  } catch (error) {
    console.error("Error fetching top traders data:", error);
  }
}

// Example usage with dynamic mint addresses
const mintAddress = getUserProvidedMintAddress(); // Get from user input, URL params, etc.
fetchPoolData(mintAddress);
fetchMarketCap(mintAddress);
fetchTokenHolders(mintAddress);
fetchTopTraders(mintAddress);
```

### With Next.js API Routes

```typescript
// pages/api/solana/pool-data.ts
import { getPoolData } from "agent-mint-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { mintAddress } = req.query;

  if (!mintAddress || typeof mintAddress !== "string") {
    return res
      .status(400)
      .json({ error: "Mint address parameter is required" });
  }

  try {
    // Pass the mint address from the request query
    const poolData = await getPoolData(mintAddress);

    return res.status(200).json(poolData);
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({
      error: "An error occurred while fetching pool data",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
```

## API Reference

### Functions

#### getPoolData(mintAddress, config?)

Retrieves pool data for a Solana token.

**Parameters:**

- `mintAddress` (string): The Solana token mint address
- `config` (optional): Advanced configuration object (not typically needed)

**Returns:** Promise<PoolResponse>

```typescript
interface PoolResponse {
  token: {
    address: string;
    symbol: string;
    name: string;
  };
  pool: {
    marketAddress: string;
    baseCurrency: {
      address: string;
      symbol: string;
      name: string;
    };
    quoteCurrency: {
      address: string;
      symbol: string;
      name: string;
    };
    dex: {
      protocolFamily: string;
      protocolName: string;
    };
    liquidity: {
      baseAmount: string;
      quoteAmount: string;
      quoteAmountUsd: string;
    };
  } | null;
  price: number | null;
  poolFound: boolean;
  timestamp: string;
  queryParams: {
    mintAddress: string;
  };
}
```

#### getMarketCap(mintAddress, config?)

Retrieves market cap data for a Solana token.

**Parameters:**

- `mintAddress` (string): The Solana token mint address
- `config` (optional): Advanced configuration object (not typically needed)

**Returns:** Promise<MarketCapResponse>

```typescript
interface MarketCapResponse {
  token: {
    address: string;
    name: string;
    symbol: string;
  };
  marketCap: string;
  tokenSupply: string;
  timestamp: string;
  queryParams: {
    mintAddress: string;
  };
}
```

#### getTokenHolders(mintAddress, limit?, config?)

Retrieves token holders data for a Solana token.

**Parameters:**

- `mintAddress` (string): The Solana token mint address
- `limit` (number, optional): Maximum number of holders to return (default: 100)
- `config` (optional): Advanced configuration object (not typically needed)

**Returns:** Promise<TokenHoldersResponse>

```typescript
interface TokenHoldersResponse {
  token: {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
  };
  topHolders: Array<{
    address: string;
    balance: string;
    percentage: string;
  }>;
  totalHolders: number;
  topCount: number;
  totalSupply: string;
  timestamp: string;
  queryParams: {
    mintAddress: string;
  };
}
```

#### getTopTraders(mintAddress, limit?, config?)

Retrieves top traders data for a Solana token.

**Parameters:**

- `mintAddress` (string): The Solana token mint address
- `limit` (number, optional): Maximum number of traders to return (default: 20)
- `config` (optional): Advanced configuration object (not typically needed)

**Returns:** Promise<TopTradersResponse>

```typescript
interface TopTradersResponse {
  token: {
    address: string;
    name: string;
    symbol: string;
  };
  traders: Array<{
    address: string;
    bought: string;
    sold: string;
    volume: string;
    volumeUsd: string;
    netVolume: string;
    profitability: string;
    dex: {
      programAddress: string;
      protocolFamily: string;
      protocolName: string;
    };
  }>;
  traderCount: number;
  timestamp: string;
  queryParams: {
    mintAddress: string;
    limit?: number;
  };
}
```

#### getTokenTradeData(mintAddress, config?)

Retrieves trade data for a Solana token.

**Parameters:**

- `mintAddress` (string): The Solana token mint address
- `config` (optional): Advanced configuration object (not typically needed)

**Returns:** Promise<TradeResponse>

```typescript
interface TradeResponse {
  trade: {
    time: string;
    price: string;
    amount: string;
    volume: string;
    token: {
      address: string;
      symbol: string;
      name: string;
    };
  } | null;
  tradeFound: boolean;
  timestamp: string;
  queryParams: {
    mintAddress: string;
  };
}
```

## Important Note

Always pass mint addresses dynamically in your application. Do not hardcode mint addresses in your code, as they should be provided by the user or retrieved from a database/API.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request to our [GitHub repository](https://github.com/AgentMintIO/agent-mint-sdk). 