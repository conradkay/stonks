import { itemBetweenIndexes } from '../exports';
export const selectReducer = (state, action, bool) => {
    switch (action.type) {
        case 'SELECT_ALL_INVENTORY':
        case 'UNSELECT_ALL_INVENTORY':
            return Object.assign({}, state, { inventory: state.inventory.map((stonk) => {
                    return Object.assign({}, stonk, { selected: bool });
                }) });
        case 'SELECT_ALL_CART':
        case 'UNSELECT_ALL_CART':
            return Object.assign({}, state, { cart: state.cart.map((stonk) => {
                    return Object.assign({}, stonk, { selected: bool });
                }) });
        case 'SELECT_STONK_IN_INVENTORY':
            return Object.assign({}, state, { inventory: itemBetweenIndexes(state.inventory, action.index, Object.assign({}, state.inventory[action.index], { selected: !state.inventory[action.index].selected })) });
        case 'SELECT_STONK_IN_CART':
            return Object.assign({}, state, { cart: itemBetweenIndexes(state.cart, action.index, Object.assign({}, state.cart[action.index], { selected: !state.cart[action.index].selected })) });
        default: return state;
    }
};
//# sourceMappingURL=selection.js.map