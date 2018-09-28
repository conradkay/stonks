import { defaultState, itemBetweenIndexes } from '../exports';
import { selectReducer } from './selection';
export const rootReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'CHANGE_STONK_AMOUNT_IN_INVENTORY':
            if (action.amount >= 1) {
                return Object.assign({}, state, { inventory: [...itemBetweenIndexes(state.inventory, action.index, Object.assign({}, state.inventory[action.index], { sellAmount: action.amount }))] });
            }
            return Object.assign({}, state);
        case 'SET_VALUE_IN_SHOP':
            return Object.assign({}, state, { amountStonksShop: [...itemBetweenIndexes(state.amountStonksShop, action.index, action.number)] });
        case 'CHANGE_AMOUNT':
            if (action.amount >= 0) {
                return Object.assign({}, state, { cart: [...itemBetweenIndexes(state.cart, action.index, Object.assign({}, state.cart[action.index], { amount: action.amount }))] });
            }
            else {
                return Object.assign({}, state);
            }
        case 'SELECT_ALL_CART':
            return selectReducer(state, action, true);
        case 'UNSELECT_ALL_CART':
            return selectReducer(state, action, false);
        case 'SELECT_STONK_IN_INVENTORY':
        case 'SELECT_STONK_IN_CART':
            return selectReducer(state, action, false);
        case 'SELECT_ALL_INVENTORY':
            return selectReducer(state, action, true);
        case 'UNSELECT_ALL_INVENTORY':
            return selectReducer(state, action, false);
        case 'OPEN_SNACKBAR':
            return Object.assign({}, state, { snackbar: Object.assign({}, state.snackbar, { open: true, message: action.message, variant: action.variant }) });
        case 'CLOSE_SNACKBAR':
            return Object.assign({}, state, { snackbar: Object.assign({}, state.snackbar, { open: false }) });
        case 'REMOVE_STONK':
            return Object.assign({}, state, { cart: [
                    ...state.cart.slice(0, action.index),
                    ...state.cart.slice(action.index + 1, state.cart.length)
                ] });
        case 'ADD_TO_CART':
            let newerCart = [];
            let indexOfMatch = 0;
            if (state.cart.length === 0) {
                newerCart = [Object.assign({}, action.stonk, { id: action.id })];
            }
            else {
                const newerCartWithMatch = state.cart.filter((stonk, times) => {
                    if (stonk.name === action.stonk.name) {
                        indexOfMatch = times;
                    }
                    return stonk.name === action.stonk.name;
                });
                if (newerCartWithMatch.length >= 1) {
                    newerCart = [
                        ...state.cart.slice(0, indexOfMatch),
                        Object.assign({}, newerCartWithMatch[0], { amount: newerCartWithMatch[0].amount + action.amount }),
                        ...state.cart.slice(indexOfMatch + 1)
                    ];
                }
                else if (newerCartWithMatch.length <= 0) {
                    newerCart = [
                        ...state.cart,
                        Object.assign({}, action.stonk, { id: action.id })
                    ];
                }
            }
            return Object.assign({}, state, { cart: [...newerCart], snackbar: { open: true, message: 'stonk added to cart', variant: 'success' } });
        case 'BUY_STONKS':
            let newInventory = state.inventory;
            let newMoney = state.money;
            const errorSnack = { open: true, message: 'unable to afford some/all stonks', variant: 'error' };
            let newSnack = { open: true, message: 'stonks bought successfully', variant: 'success' };
            const newCart = state.cart.filter((stonk) => {
                if (stonk.selected && (stonk.price * stonk.amount) > newMoney) {
                    newSnack = errorSnack;
                    return true;
                }
                else if (stonk.selected) {
                    let index = 0;
                    newMoney -= (stonk.price * stonk.amount);
                    if (state.inventory.filter((newStonk) => {
                        if (newStonk.name === stonk.name) {
                            index = state.inventory.indexOf(newStonk);
                            return true;
                        }
                        return false;
                    }).length > 0) {
                        const invStonk = state.inventory[index];
                        newInventory = [
                            ...newInventory.slice(0, index),
                            Object.assign({}, stonk, { selected: invStonk.selected, sellAmount: stonk.amount + invStonk.amount, amount: invStonk.amount + stonk.amount }),
                            ...newInventory.slice(index + 1)
                        ];
                    }
                    else {
                        newInventory.push(stonk);
                    }
                }
                return stonk.selected === false;
            });
            if (newCart.length === state.cart.length) {
                newSnack = Object.assign({}, errorSnack, { message: 'no stonk selected' });
            }
            return Object.assign({}, state, { cart: newCart, inventory: newInventory, money: newMoney, snackbar: newSnack });
        case 'SELL_STONKS':
            let newMon = state.money;
            let newSnackbar = Object.assign({}, state.snackbar, { open: true, message: 'sold stonks successfully', variant: 'success' });
            let newInv = state.inventory.filter((stonk, times) => {
                return !stonk.selected || stonk.sellAmount < stonk.amount;
            });
            newInv = newInv.map((stonk) => {
                if (stonk.sellAmount < stonk.amount) {
                    return Object.assign({}, stonk, { amount: stonk.amount - stonk.sellAmount, sellAmount: 1 });
                }
                return stonk;
            });
            const betterInv = state.inventory.filter((stonk) => {
                return stonk.selected;
            });
            if (betterInv.length < 1) {
                newSnackbar = Object.assign({}, newSnackbar, { message: 'no stonks selected', variant: 'error' });
            }
            betterInv.map((stonk) => {
                if (stonk.selected && stonk.sellAmount && stonk.sellAmount > 0 && stonk.sellAmount <= stonk.amount) {
                    newSnackbar = Object.assign({}, newSnackbar, { message: 'sold stonks successfully', variant: 'success' });
                    newMon += stonk.price * stonk.sellAmount;
                }
                else {
                    newInv.push(stonk);
                    newSnackbar = Object.assign({}, newSnackbar, { message: 'not enough stonks to sell', variant: 'error' });
                }
            });
            return Object.assign({}, state, { snackbar: newSnackbar, money: newMon, inventory: newInv });
        default:
            return state;
    }
};
//# sourceMappingURL=reducer.js.map