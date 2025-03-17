/**
 * Types for SafeQuery SDK
 */

// Common configuration type
export interface Config {
  baseUrl?: string;
  timeout?: number;
}

// Pool Data Types
export interface PoolResponse {
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

// Market Cap Types
export interface MarketCapResponse {
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

// Token Holders Types
export interface TokenHoldersResponse {
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

// Top Traders Types
export interface TopTradersResponse {
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

// Trade Data Types
export interface TradeResponse {
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

// Error Response
export interface ErrorResponse {
  error: string;
  details?: string;
} 