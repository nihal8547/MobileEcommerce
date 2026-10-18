import { useCartStore } from "@/store/cartStore";
import { formatQar } from "@/lib/utils";
import type { CartItem } from "@/types";
import toast from "react-hot-toast";

export function useCart() {
  const store = useCartStore();

  const totalItems = store.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotalQar = store.items.reduce((sum, i) => sum + i.priceQar * i.quantity, 0);

  function addToCart(item: CartItem) {
    store.addItem(item);
    toast.success(`${item.name} added to cart`);
  }

  function removeFromCart(productId: string, variant?: string) {
    store.removeItem(productId, variant);
  }

  function updateQty(productId: string, quantity: number, variant?: string) {
    store.updateQuantity(productId, quantity, variant);
  }

  function clearCart() {
    store.clearCart();
  }

  return {
    items: store.items,
    totalItems,
    subtotalQar,
    subtotalFormatted: formatQar(subtotalQar),
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
  };
}
