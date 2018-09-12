import { stonks } from './exports';
export const categories = [
    'food', 'realEstate', 'office', 'service'
];
export const itemBetweenIndexes = (parent, index, newItem) => {
    return [...parent.slice(0, index), newItem, ...parent.slice(index + 1)];
};
export const getClassSnackbarVariant = (variant, classes) => {
    if (variant === 'success') {
        return classes.success;
    }
    else if (variant === 'warning') {
        return classes.warning;
    }
    else if (variant === 'error') {
        return classes.error;
    }
    else {
        return classes.error;
    }
};
export const defaultState = {
    amountStonksShop: [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
    ],
    allSelected: false,
    cart: stonks,
    inventory: [...stonks],
    activeFilters: [],
    money: 1000,
    snackbar: { open: false, message: 'dont show', variant: 'success' },
};
//# sourceMappingURL=utils.js.map