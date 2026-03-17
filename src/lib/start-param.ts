export interface StartConfig {
  flowType?: 'buy' | 'sell';
  crypto?: string;
  network?: string;
}

/**
 * Parses the Telegram startParam into flow configuration.
 *
 * Format: `{flowType}_{crypto}_{network}`
 * Examples: `buy_BTC_bitcoin`, `sell_USDT_ethereum`, `buy_ETH`
 */
export function parseStartParam(startParam: string | undefined): StartConfig {
  if (!startParam) return {};

  const [flow, crypto, network] = startParam.split('_');
  const config: StartConfig = {};

  if (flow === 'buy' || flow === 'sell') {
    config.flowType = flow;
  }
  if (crypto) config.crypto = crypto;
  if (network) config.network = network;

  return config;
}
