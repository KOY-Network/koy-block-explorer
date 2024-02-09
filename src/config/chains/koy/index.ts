/*
# MAINNET VALUES
# NETWORK_CHAIN_ID=4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11
# NETWORK_HOST=mainnet.telos.net
# NETWORK_PORT=443
# NETWORK_PROTOCOL=https
# NETWORK_EVM_RPC=https://mainnet.telos.net/evm
# NETWORK_EVM_ENDPOINT=https://mainnet.telos.net
# NETWORK_EVM_CONTRACT=eosio.evm
# NETWORK_EVM_CHAIN_ID=40
# HYPERION_ENDPOINT=https://mainnet.telos.net
# TELOS_API_ENDPOINT=https://api.telos.net/v1

 */

import BaseChain from 'src/config/BaseChain';
import { RpcEndpoint } from 'universal-authenticator-library';
import {
    getCoingeckoPriceChartData,
    getCoingeckoUsdPrice,
} from 'src/api/price';
import { PriceChartData } from 'src/types/PriceChartData';
import { Theme } from 'src/types/Theme';
import { Token } from 'src/types';
import { FooterLink } from 'src/types/UiCustomization';

const CHAIN_ID =
  '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11';
const NAME = 'koy';
const DISPLAY = 'KOY';
const TOKEN = {
    symbol: 'TLOS',
    precision: 4,
    amount: 0,
    contract: 'eosio.token',
} as Token;

const HYPERION_ENDPOINT = 'https://mainnet.telos.net';

const RPC_ENDPOINT = {
    protocol: 'https',
    host: 'mainnet.telos.net',
    port: 443,
};
const FUEL_RPC_ENDPOINT = {
    protocol: 'https',
    host: 'telos.greymass.com',
    port: 443,
};
const API_ENDPOINT = 'https://api.telos.net/v1';
const S3_PRODUCER_BUCKET = 'https://telos-producer-validation.s3.amazonaws.com';
const DISPLAY_MAP = true;
const THEME = {
    primary: '#ce1c61',
    secondary: '#001DFF',
    accent: '#00FF0E',
    dark: '#F1FF00',
    positive: '#00FFB2',
    negative: '#FF9200',
    info: '#9B00FF',
    warning: '#71DDFF',
    'color-map': '#ce1c61',
    'color-primary-gradient': 'linear-gradient(90deg, #ce1c61 0%, #071A5F 100%)',
    'color-secondary-gradient':
    'linear-gradient(180deg, #071A5F 0%, #571aff 147.34%)',
    'color-tertiary-gradient':
    'linear-gradient(90deg, #CBCAF5 0%, #A9CAF3 56.77%, #63C9EF 100%)',
    'color-progress-gradient': '#ce1c61',
    'color-producer-card-background': '#f5f4fe',
    'color-select-box-background': '#e0dffb',
    'color-header-background': '#171717',
    'color-header-border': '#8a65d41a',
    'color-header-support-background': 'linear-gradient(180deg, #171717 0%, #ee05f2 147.34%)',
    'color-graph-shadow': '#BEA8B0',
    'color-footer-background': '#171717',
};

export default class Telos extends BaseChain {
    getName(): string {
        return NAME;
    }

    getChainId(): string {
        return CHAIN_ID;
    }

    getDisplay(): string {
        return DISPLAY;
    }

    getHyperionEndpoint(): string {
        return HYPERION_ENDPOINT;
    }

    getRPCEndpoint(): RpcEndpoint {
        return RPC_ENDPOINT;
    }

    getFuelRPCEndpoint(): RpcEndpoint | null {
        return FUEL_RPC_ENDPOINT;
    }

    getApiEndpoint(): string {
        return API_ENDPOINT;
    }

    getS3ProducerBucket(): string {
        return S3_PRODUCER_BUCKET;
    }

    getPriceData(): Promise<PriceChartData> {
        return getCoingeckoPriceChartData('telos');
    }

    getSystemToken(): Token {
        return TOKEN;
    }

    getUsdPrice(): Promise<number> {
        return getCoingeckoUsdPrice('telos');
    }

    getLargeLogoPath(): string {
        return 'chains/koy/KOY_Logo.png';
    }

    getSmallLogoPath(): string {
        return 'chains/koy/KOY_Logo.png';
    }

    getMapDisplay(): boolean {
        return DISPLAY_MAP;
    }

    getTheme(): Theme {
        return THEME;
    }

    getFiltersSupported(prop: string): boolean {
        if (prop === 'notified') {
            return true;
        }
        return true;
    }

    getFooterLinks(): FooterLink[] {
        return [
            { label: 'LEGAL', url: 'https://telos.net/legal' },
            { label: 'PRIVACY', url: 'https://telos.net/privacy-policy' },
            { label: 'REPOSITORY', url: 'https://github.com/telosnetwork/open-block-explorer' },
        ];
    }
}
