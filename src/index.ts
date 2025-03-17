/**
 * SafeQuery - A secure Node.js library for accessing Solana blockchain data
 * 
 * This package provides easy-to-use functions for retrieving data about Solana tokens,
 * pools, trades, and more without requiring you to provide your own API key.
 */

// Export API functions
export { 
  getPoolData,
  getMarketCap,
  getTokenHolders,
  getTopTraders,
  getTokenTradeData
} from './api';

// Export types
export {
  Config,
  PoolResponse,
  MarketCapResponse,
  TokenHoldersResponse,
  TopTradersResponse,
  TradeResponse
} from './types';

// Export client for advanced usage
export { SafeQueryClient } from './client'; 