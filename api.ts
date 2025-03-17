import { SafeQueryClient } from './client';
import { 
  Config, 
  PoolResponse, 
  MarketCapResponse, 
  TokenHoldersResponse, 
  TopTradersResponse,
  TradeResponse
} from './types';

/**
 * Get pool data for a Solana token
 * @param mintAddress The Solana token mint address
 * @param config Optional configuration
 * @returns Promise with pool data
 */
export async function getPoolData(mintAddress: string, config?: Config): Promise<PoolResponse> {
  const client = new SafeQueryClient(config);
  return client.get<PoolResponse>('/api/solana/pool-data', { mintAddress });
}

/**
 * Get market cap data for a Solana token
 * @param mintAddress The Solana token mint address
 * @param config Optional configuration
 * @returns Promise with market cap data
 */
export async function getMarketCap(mintAddress: string, config?: Config): Promise<MarketCapResponse> {
  const client = new SafeQueryClient(config);
  return client.get<MarketCapResponse>('/api/solana/market-cap', { mintAddress });
}

/**
 * Get token holders data for a Solana token
 * @param mintAddress The Solana token mint address
 * @param limit Maximum number of holders to return (default: 100)
 * @param config Optional configuration
 * @returns Promise with token holders data
 */
export async function getTokenHolders(
  mintAddress: string, 
  limit: number = 100, 
  config?: Config
): Promise<TokenHoldersResponse> {
  const client = new SafeQueryClient(config);
  return client.get<TokenHoldersResponse>('/api/solana/token-holders', { mintAddress, limit });
}

/**
 * Get top traders data for a Solana token
 * @param mintAddress The Solana token mint address
 * @param limit Maximum number of traders to return (default: 20)
 * @param config Optional configuration
 * @returns Promise with top traders data
 */
export async function getTopTraders(
  mintAddress: string, 
  limit: number = 20, 
  config?: Config
): Promise<TopTradersResponse> {
  const client = new SafeQueryClient(config);
  return client.get<TopTradersResponse>('/api/solana/top-traders', { mintAddress, limit });
}

/**
 * Get trade data for a Solana token
 * @param mintAddress The Solana token mint address
 * @param config Optional configuration
 * @returns Promise with trade data
 */
export async function getTokenTradeData(mintAddress: string, config?: Config): Promise<TradeResponse> {
  const client = new SafeQueryClient(config);
  return client.get<TradeResponse>('/api/solana/token-trade', { mintAddress });
} 