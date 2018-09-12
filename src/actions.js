export const selectStonkInInventory = (index) => ({
    type: 'SELECT_STONK_IN_INVENTORY',
    index: index
});
export const setShopValue = (index, amount) => ({
    type: 'SET_VALUE_IN_SHOP', index, number: amount
});
export const sellStonks = () => ({
    type: 'SELL_STONKS'
});
export const unSelectAllInventory = () => ({
    type: 'UNSELECT_ALL_INVENTORY'
});
export const selectAllInventory = () => ({
    type: 'SELECT_ALL_INVENTORY'
});
export const addToCart = (stonk, amount) => {
    const largestId = Math.floor((Math.random() * 10000000));
    return {
        type: 'ADD_TO_CART',
        stonk,
        id: largestId,
        amount
    };
};
export const changeStonkAmountInInventory = (amount, index) => ({
    type: 'CHANGE_STONK_AMOUNT_IN_INVENTORY', index, amount
});
export const changeAmount = (amount, index) => ({
    type: 'CHANGE_AMOUNT', amount, index
});
export const removeStonk = (index) => ({ type: 'REMOVE_STONK', index: index });
export const selectAllCart = () => ({ type: 'SELECT_ALL_CART' });
export const unSelectAllCart = () => ({ type: 'UNSELECT_ALL_CART' });
export const buyStonks = () => ({ type: 'BUY_STONKS' });
export const selectStonkInCart = (index) => ({
    type: 'SELECT_STONK_IN_CART',
    index: index
});
export const changeFilter = (newFilter) => ({ type: 'CHANGE_FILTERS', newFilter });
export const openSnackbar = (message, variant) => ({
    type: 'OPEN_SNACKBAR',
    message,
    variant
});
export const closeSnackbar = () => ({ type: 'CLOSE_SNACKBAR' });
export const sellStonk = () => ({ type: 'SELL_STONKS' });
//# sourceMappingURL=actions.js.map