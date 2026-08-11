// Store Panier — Zustand
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      couponCode: '',
      discount: 0,

      // Ouvrir / Fermer le drawer panier
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      // Ajouter un produit
      addItem: (product, quantity = 1, color = null, size = null) => {
        const items = get().items;
        const key = `${product.id}-${color}-${size}`;
        const existing = items.find((i) => i.key === key);

        if (existing) {
          set({
            items: items.map((i) =>
              i.key === key ? { ...i, quantity: i.quantity + quantity } : i
            ),
          });
        } else {
          set({
            items: [...items, { ...product, key, quantity, selectedColor: color, selectedSize: size }],
          });
        }
      },

      // Supprimer un produit
      removeItem: (key) => {
        set({ items: get().items.filter((i) => i.key !== key) });
      },

      // Modifier la quantité
      updateQuantity: (key, quantity) => {
        if (quantity <= 0) {
          get().removeItem(key);
          return;
        }
        set({
          items: get().items.map((i) => (i.key === key ? { ...i, quantity } : i)),
        });
      },

      // Vider le panier
      clearCart: () => set({ items: [], couponCode: '', discount: 0 }),

      // Appliquer un coupon (simplifié sans backend)
      applyCoupon: (code) => {
        // Coupons simplifiés pour la démo
        const coupons = {
          'DARAL10': 10,
          'DARAL20': 20,
          'LAISSA15': 15
        };
        
        const upperCode = code.trim().toUpperCase();
        if (coupons[upperCode]) {
          set({ couponCode: upperCode, discount: coupons[upperCode] });
          return { success: true, message: `Code ${upperCode} appliqué : ${coupons[upperCode]}% de réduction` };
        }
        return { success: false, message: 'Code promo invalide' };
      },

      // Retirer le coupon applique
      removeCoupon: () => set({ couponCode: '', discount: 0 }),

      // Totaux calculés
      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
      getDiscount: () => {
        const subtotal = get().getSubtotal();
        return (subtotal * get().discount) / 100;
      },
      getShipping: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= 50000 ? 0 : 3000;
      },
      getTotal: () => {
        return get().getSubtotal() - get().getDiscount() + get().getShipping();
      },
      getCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    { name: 'daralhayaa-cart' }
  )
);
