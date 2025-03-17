import { SafeQueryClient } from './client';
import { 
  getPoolData, 
  getMarketCap, 
  getTokenHolders, 
  getTopTraders, 
  getTokenTradeData 
} from './api';

// Add Jest type definitions
declare const jest: {
  mock: (path: string) => void;
  fn: () => any;
  resetAllMocks: () => void;
  Mock: any;
};
declare const describe: (name: string, fn: () => void) => void;
declare const beforeEach: (fn: () => void) => void;
declare const test: (name: string, fn: () => Promise<void>) => void;
declare const expect: any;

// Mock the SafeQueryClient
jest.mock('./client');

describe('SafeQuery API', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.resetAllMocks();
  });

  // Sample mint address for testing
  const mintAddress = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

  // Mock response data
  const mockPoolData = {
    token: {
      address: mintAddress,
      symbol: 'USDC',
      name: 'USD Coin'
    },
    pool: {
      marketAddress: 'market123',
      baseCurrency: {
        address: mintAddress,
        symbol: 'USDC',
        name: 'USD Coin'
      },
      quoteCurrency: {
        address: 'sol123',
        symbol: 'SOL',
        name: 'Solana'
      },
      dex: {
        protocolFamily: 'Raydium',
        protocolName: 'Raydium AMM'
      },
      liquidity: {
        baseAmount: '1000000',
        quoteAmount: '10000',
        quoteAmountUsd: '10000'
      }
    },
    price: 1.0,
    poolFound: true,
    timestamp: '2023-01-01T00:00:00Z',
    queryParams: {
      mintAddress
    }
  };

  // Test getPoolData function
  test('getPoolData should fetch pool data correctly', async () => {
    // Setup mock implementation
    const getMock = jest.fn().mockResolvedValue(mockPoolData);
    (SafeQueryClient as any).mockImplementation(() => ({
      get: getMock
    }));

    // Call the function
    const result = await getPoolData(mintAddress);

    // Verify the result
    expect(result).toEqual(mockPoolData);
    expect(SafeQueryClient).toHaveBeenCalledWith(undefined);
    expect(getMock).toHaveBeenCalledWith('/solana/pool-data', { mintAddress });
  });

  // Test getPoolData with custom config
  test('getPoolData should use custom config when provided', async () => {
    // Setup mock implementation
    const getMock = jest.fn().mockResolvedValue(mockPoolData);
    (SafeQueryClient as any).mockImplementation(() => ({
      get: getMock
    }));

    // Custom config
    const config = { apiKey: 'custom-api-key', timeout: 5000 };

    // Call the function with custom config
    await getPoolData(mintAddress, config);

    // Verify the config was passed to the client
    expect(SafeQueryClient).toHaveBeenCalledWith(config);
  });

  // Add similar tests for other API functions
  // These are simplified examples - in a real test suite, you would test each function thoroughly
  
  test('getMarketCap should fetch market cap data correctly', async () => {
    const mockData = { 
      token: { address: mintAddress, name: 'USD Coin', symbol: 'USDC' },
      marketCap: '1000000',
      tokenSupply: '1000000',
      timestamp: '2023-01-01T00:00:00Z',
      queryParams: { mintAddress }
    };
    
    const getMock = jest.fn().mockResolvedValue(mockData);
    (SafeQueryClient as any).mockImplementation(() => ({
      get: getMock
    }));

    const result = await getMarketCap(mintAddress);
    
    expect(result).toEqual(mockData);
    expect(getMock).toHaveBeenCalledWith('/solana/market-cap', { mintAddress });
  });
  
  test('getTokenHolders should fetch token holders data correctly', async () => {
    const mockData = { 
      token: { address: mintAddress, name: 'USD Coin', symbol: 'USDC', decimals: 6 },
      topHolders: [{ address: 'holder1', balance: '1000', percentage: '10' }],
      totalHolders: 100,
      topCount: 1,
      totalSupply: '10000',
      timestamp: '2023-01-01T00:00:00Z',
      queryParams: { mintAddress }
    };
    
    const getMock = jest.fn().mockResolvedValue(mockData);
    (SafeQueryClient as any).mockImplementation(() => ({
      get: getMock
    }));

    const result = await getTokenHolders(mintAddress, 10);
    
    expect(result).toEqual(mockData);
    expect(getMock).toHaveBeenCalledWith('/solana/token-holders', { mintAddress, limit: 10 });
  });
}); 