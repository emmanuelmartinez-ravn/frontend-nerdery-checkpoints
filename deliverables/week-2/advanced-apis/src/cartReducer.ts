export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: "add"; item: { id: string; name: string; price: number } }
  | { type: "remove"; id: string }
  | { type: "setQty"; id: string; qty: number }
  | { type: "clear" };

export const initialCart: CartState = { items: [] };

export function cartReducer(state: CartState, _action: CartAction): CartState {
  switch (_action.type) {
    case "add":
      return state.items.some((cartItem) => cartItem.id === _action.item.id)
        ? {
            ...state,
            items: state.items.map((cartItem) =>
              cartItem.id === _action.item.id
                ? { ...cartItem, qty: cartItem.qty + 1 }
                : cartItem,
            ),
          }
        : {
            ...state,
            items: [
              ...state.items,
              {
                ..._action.item,
                qty: 1,
              },
            ],
          };

    case "remove":
      return {
        ...state,
        items: state.items.filter((cartItem) => cartItem.id !== _action.id),
      };

    case "setQty":
      return _action.qty > 0
        ? {
            ...state,
            items: state.items.map((cartItem) =>
              cartItem.id === _action.id
                ? { ...cartItem, qty: _action.qty }
                : cartItem,
            ),
          }
        : {
            ...state,
            items: state.items.filter((cartItem) => cartItem.id !== _action.id),
          };

    case "clear":
      return {
        ...state,
        items: [],
      };
  }
}

export function selectTotal(_state: CartState): number {
  return _state.items.reduce(
    (accumulator, cartItem) => accumulator + cartItem.price * cartItem.qty,
    0,
  );
}
