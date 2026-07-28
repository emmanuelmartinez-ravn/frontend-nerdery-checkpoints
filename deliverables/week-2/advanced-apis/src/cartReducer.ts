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
  | { type: "clear" }
  | { type: "newOperation" };

export const initialCart: CartState = { items: [] };

function handleAdd(
  items: CartItem[],
  item: { id: string; name: string; price: number },
) {
  return items.some((cartItem) => cartItem.id === item.id)
    ? items.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, qty: cartItem.qty + 1 }
          : cartItem,
      )
    : [
        ...items,
        {
          ...item,
          qty: 1,
        },
      ];
}

function handleQty(items: CartItem[], id: string, qty: number) {
  return qty > 0
    ? items.map((cartItem) =>
        cartItem.id === id ? { ...cartItem, qty: qty } : cartItem,
      )
    : items.filter((cartItem) => cartItem.id !== id);
}

export function cartReducer(state: CartState, _action: CartAction): CartState {
  switch (_action.type) {
    case "add":
      return {
        ...state,
        items: handleAdd(state.items, _action.item),
      };

    case "remove":
      return {
        ...state,
        items: state.items.filter((cartItem) => cartItem.id !== _action.id),
      };

    case "setQty":
      return {
        ...state,
        items: handleQty(state.items, _action.id, _action.qty),
      };

    case "clear":
      return {
        ...state,
        items: [],
      };
    case "newOperation":
      return {
        ...state,
      };
    default:
      const _e: never = _action;
      return _e;
  }
}

export function selectTotal(_state: CartState): number {
  return _state.items.reduce(
    (accumulator, cartItem) => accumulator + cartItem.price * cartItem.qty,
    0,
  );
}
