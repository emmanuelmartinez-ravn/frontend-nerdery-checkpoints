import { useCart } from "./CartContext";
import "./Cart.css";

// Sample products the demo can add to the cart. Integer prices keep the
// displayed total easy to read and assert against.
const SAMPLE_PRODUCTS = [
  { id: "coffee", name: "Coffee", price: 10 },
  { id: "bagel", name: "Bagel", price: 5 },
] as const;

export function Cart() {
  const { state, total, add, remove, setQty, clear } = useCart();

  return (
    <section aria-label="Shopping cart">
      <div className="controls">
        <h2 className="subtitle">Cart</h2>

        <div>
          {SAMPLE_PRODUCTS.map((product) => (
            <button
              className="add-button"
              key={product.id}
              type="button"
              onClick={() => add(product)}
            >
              Add {product.name} (${product.price})
            </button>
          ))}
        </div>
      </div>

      {state.items.length === 0 ? (
        <p className="empty">Your cart is empty.</p>
      ) : (
        <ul className="cart-items">
          {state.items.map((item) => (
            <li key={item.id} className="cart-item">
              <span>
                {item.name} — ${item.price} × {item.qty}
              </span>
              <div className="qty">
                <label>
                  Qty for {item.name}
                  <input
                    type="number"
                    min={0}
                    value={item.qty}
                    onChange={(e) => setQty(item.id, Number(e.target.value))}
                  />
                </label>
                <button type="button" onClick={() => remove(item.id)}>
                  Remove {item.name}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="total">
        <p data-testid="cart-total">Total: ${total}</p>

        <button type="button" onClick={clear}>
          Clear cart
        </button>
      </div>
    </section>
  );
}
