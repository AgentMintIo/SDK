/**
 * Example usage of the SafeQuery SDK
 * 
 * This file demonstrates how to use the SafeQuery SDK to retrieve data about Solana tokens.
 * 
 * To run this example:
 * 1. Build the SDK: npm run build
 * 2. Run the example: npx ts-node src/example.ts
 */

import {
  getPoolData,
  getMarketCap,
  getTokenHolders,
  getTopTraders,
  getTokenTradeData
} from './index';

// Example Solana token mint address (USDC)
const mintAddress = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

// Example function to demonstrate getPoolData
async function exampleGetPoolData() {
  try {
    console.log('Fetching pool data for', mintAddress);
    const poolData = await getPoolData(mintAddress);
    console.log('Pool data:', JSON.stringify(poolData, null, 2));
  } catch (error) {
    console.error('Error fetching pool data:', error);
  }
}

// Example function to demonstrate getMarketCap
async function exampleGetMarketCap() {
  try {
    console.log('Fetching market cap for', mintAddress);
    const marketCapData = await getMarketCap(mintAddress);
    console.log('Market cap:', marketCapData.marketCap);
    console.log('Token supply:', marketCapData.tokenSupply);
  } catch (error) {
    console.error('Error fetching market cap data:', error);
  }
}

// Example function to demonstrate getTokenHolders
async function exampleGetTokenHolders() {
  try {
    console.log('Fetching token holders for', mintAddress);
    const holdersData = await getTokenHolders(mintAddress, 5); // Limit to top 5 holders
    console.log('Total holders:', holdersData.totalHolders);
    console.log('Top holders:', JSON.stringify(holdersData.topHolders, null, 2));
  } catch (error) {
    console.error('Error fetching token holders data:', error);
  }
}

// Example function to demonstrate getTopTraders
async function exampleGetTopTraders() {
  try {
    console.log('Fetching top traders for', mintAddress);
    const tradersData = await getTopTraders(mintAddress, 3); // Limit to top 3 traders
    console.log('Top traders:', JSON.stringify(tradersData.traders, null, 2));
  } catch (error) {
    console.error('Error fetching top traders data:', error);
  }
}

// Example function to demonstrate getTokenTradeData
async function exampleGetTokenTradeData() {
  try {
    console.log('Fetching trade data for', mintAddress);
    const tradeData = await getTokenTradeData(mintAddress);
    console.log('Trade data:', JSON.stringify(tradeData, null, 2));
  } catch (error) {
    console.error('Error fetching trade data:', error);
  }
}

// Run all examples
async function runAllExamples() {
  console.log('Running SafeQuery SDK examples...\n');
  
  await exampleGetPoolData();
  console.log('\n---\n');
  
  await exampleGetMarketCap();
  console.log('\n---\n');
  
  await exampleGetTokenHolders();
  console.log('\n---\n');
  
  await exampleGetTopTraders();
  console.log('\n---\n');
  
  await exampleGetTokenTradeData();
  
  console.log('\nAll examples completed.');
}

// Run the examples
runAllExamples().catch(error => {
  console.error('Error running examples:', error);
}); 