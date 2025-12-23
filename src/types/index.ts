export type WalletType = 'SimCash' | 'PaySim' | 'UltraWallet' | 'CryptoSim' | 'BankSim';

export interface Wallet {
    id: WalletType;
    name: string;
    balance: number;
    incomeMultiplier: number;
    description: string;
    color: string;
    icon: string;
    unlocked: boolean;
    unlockCost: number;
}

export interface Product {
    id: string;
    name: string;
    cost: number;
    baseCost: number;
    incomePerSecond: number;
    owned: number;
    shopId: string;
    description: string;
    multiplier: number; // Cost multiplier per purchase (e.g., 1.15)
}

export interface Shop {
    id: string;
    name: string;
    description: string;
    theme: string;
    icon: string;
    currency: WalletType;
    unlocked: boolean;
    unlockCost: number;
    products: Product[];
}

export interface GameState {
    netWorth: number;
    incomePerSecond: number;
    wallets: Record<WalletType, Wallet>;
    shops: Shop[];
    lastSaveTime: number;
    rank: string;
}

export interface GameContextType {
    state: GameState;
    buyProduct: (shopId: string, productId: string) => void;
    unlockWallet: (walletId: WalletType) => void;
    unlockShop: (shopId: string) => void;
    transferFunds: (from: WalletType, to: WalletType, amount: number) => void;
    resetGame: () => void;
}
