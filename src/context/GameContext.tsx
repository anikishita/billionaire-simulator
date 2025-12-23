import React, { createContext, useEffect, useReducer } from 'react';
import type { GameContextType, GameState, WalletType } from '../types';
import { INITIAL_STATE } from '../data/initialState';

export const GameContext = createContext<GameContextType | undefined>(undefined);

type Action =
    | { type: 'LOAD_STATE'; payload: GameState }
    | { type: 'TICK'; payload: number } // payload is elapsed time in seconds (usually 1)
    | { type: 'BUY_PRODUCT'; payload: { shopId: string; productId: string } }
    | { type: 'UNLOCK_WALLET'; payload: WalletType }
    | { type: 'UNLOCK_SHOP'; payload: string }
    | { type: 'TRANSFER_FUNDS'; payload: { from: WalletType; to: WalletType; amount: number } }
    | { type: 'RESET_GAME' };

const gameReducer = (state: GameState, action: Action): GameState => {
    switch (action.type) {
        case 'LOAD_STATE':
            return action.payload;

        case 'TICK': {
            // Calculate income for each wallet based on products owned in shops of that currency
            const newWallets = { ...state.wallets };

            state.shops.forEach((shop) => {
                const shopIncome = shop.products.reduce((acc, product) => {
                    return acc + (product.incomePerSecond * product.owned);
                }, 0);

                if (shopIncome > 0) {
                    const walletId = shop.currency;
                    if (newWallets[walletId]) {
                        // Apply wallet multiplier
                        const income = shopIncome * newWallets[walletId].incomeMultiplier * action.payload;
                        newWallets[walletId] = {
                            ...newWallets[walletId],
                            balance: newWallets[walletId].balance + income,
                        };
                    }
                }
            });

            // PASSIVE INCOME: 1 Million per 10 minutes (1,000,000 / 600 seconds = 1666.66/sec)
            const PASSIVE_INCOME_PER_SEC = 1666.67;
            Object.keys(newWallets).forEach((key) => {
                const walletId = key as WalletType;
                if (newWallets[walletId].unlocked) {
                    const passiveIncome = PASSIVE_INCOME_PER_SEC * action.payload;
                    newWallets[walletId] = {
                        ...newWallets[walletId],
                        balance: newWallets[walletId].balance + passiveIncome,
                    };
                }
            });

            // Recalculate Net Worth (sum of all wallet balances)
            const netWorth = Object.values(newWallets).reduce((acc, w) => acc + w.balance, 0);

            // Recalculate Income Per Second (total)
            const incomePerSecond = state.shops.reduce((acc, shop) => {
                return acc + shop.products.reduce((pAcc, p) => pAcc + (p.incomePerSecond * p.owned), 0);
            }, 0);

            // Update Rank
            let rank = 'Hustler';
            if (netWorth >= 1000000000000) rank = 'Trillionaire';
            else if (netWorth >= 1000000000) rank = 'Billionaire';
            else if (netWorth >= 100000000) rank = 'Tycoon';
            else if (netWorth >= 1000000) rank = 'Entrepreneur';

            return {
                ...state,
                wallets: newWallets,
                netWorth,
                incomePerSecond,
                rank,
                lastSaveTime: Date.now(),
            };
        }

        case 'BUY_PRODUCT': {
            const { shopId, productId } = action.payload;
            const shopIndex = state.shops.findIndex((s) => s.id === shopId);
            if (shopIndex === -1) return state;

            const shop = state.shops[shopIndex];
            const productIndex = shop.products.findIndex((p) => p.id === productId);
            if (productIndex === -1) return state;

            const product = shop.products[productIndex];
            const walletId = shop.currency;
            const wallet = state.wallets[walletId];

            if (wallet.balance >= product.cost) {
                // Deduct cost
                const newWallet = { ...wallet, balance: wallet.balance - product.cost };

                // Update product
                const newProduct = {
                    ...product,
                    owned: product.owned + 1,
                    cost: product.cost * product.multiplier,
                };

                const newShops = [...state.shops];
                newShops[shopIndex] = {
                    ...shop,
                    products: [
                        ...shop.products.slice(0, productIndex),
                        newProduct,
                        ...shop.products.slice(productIndex + 1),
                    ],
                };

                return {
                    ...state,
                    wallets: { ...state.wallets, [walletId]: newWallet },
                    shops: newShops,
                };
            }
            return state;
        }

        case 'TRANSFER_FUNDS': {
            const { from, to, amount } = action.payload;
            if (state.wallets[from].balance >= amount) {
                const fee = amount * 0.05; // 5% fee
                const netAmount = amount - fee;

                return {
                    ...state,
                    wallets: {
                        ...state.wallets,
                        [from]: { ...state.wallets[from], balance: state.wallets[from].balance - amount },
                        [to]: { ...state.wallets[to], balance: state.wallets[to].balance + netAmount },
                    },
                };
            }
            return state;
        }

        case 'UNLOCK_WALLET': {
            const walletId = action.payload;
            const wallet = state.wallets[walletId];
            if (state.wallets.SimCash.balance >= wallet.unlockCost) {
                return {
                    ...state,
                    wallets: {
                        ...state.wallets,
                        SimCash: { ...state.wallets.SimCash, balance: state.wallets.SimCash.balance - wallet.unlockCost },
                        [walletId]: { ...wallet, unlocked: true },
                    },
                };
            }
            return state;
        }

        case 'UNLOCK_SHOP': {
            const shopId = action.payload;
            const shopIndex = state.shops.findIndex((s) => s.id === shopId);
            if (shopIndex === -1) return state;
            const shop = state.shops[shopIndex];

            if (state.wallets.SimCash.balance >= shop.unlockCost) {
                const newShops = [...state.shops];
                newShops[shopIndex] = { ...shop, unlocked: true };

                return {
                    ...state,
                    wallets: {
                        ...state.wallets,
                        SimCash: { ...state.wallets.SimCash, balance: state.wallets.SimCash.balance - shop.unlockCost },
                    },
                    shops: newShops,
                };
            }
            return state;
        }

        case 'RESET_GAME':
            return INITIAL_STATE;

        default:
            return state;
    }
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('billionaire_sim_save');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                dispatch({ type: 'LOAD_STATE', payload: { ...INITIAL_STATE, ...parsed } });
            } catch (e) {
                console.error("Failed to load save", e);
            }
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        const interval = setInterval(() => {
            localStorage.setItem('billionaire_sim_save', JSON.stringify(state));
        }, 5000);
        return () => clearInterval(interval);
    }, [state]);

    // Game Loop
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch({ type: 'TICK', payload: 1 });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const buyProduct = (shopId: string, productId: string) => {
        dispatch({ type: 'BUY_PRODUCT', payload: { shopId, productId } });
    };

    const unlockWallet = (walletId: WalletType) => {
        dispatch({ type: 'UNLOCK_WALLET', payload: walletId });
    };

    const unlockShop = (shopId: string) => {
        dispatch({ type: 'UNLOCK_SHOP', payload: shopId });
    };

    const transferFunds = (from: WalletType, to: WalletType, amount: number) => {
        dispatch({ type: 'TRANSFER_FUNDS', payload: { from, to, amount } });
    };

    const resetGame = () => {
        dispatch({ type: 'RESET_GAME' });
        localStorage.removeItem('billionaire_sim_save');
    };

    return (
        <GameContext.Provider value={{ state, buyProduct, unlockWallet, unlockShop, transferFunds, resetGame }}>
            {children}
        </GameContext.Provider>
    );
};
