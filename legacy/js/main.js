// ===== MOBILESHOP E-COMMERCE - MAIN JS =====

const MobileShop = {
  cart: [],
  whatsappEnabled: true,

  init() {
    this.loadCart();
    this.initLoader();
    this.initHeader();
    this.initBannerSlider();
    this.initProductFilters();
    this.initCart();
    this.initDeliveryPayment();
    this.initFlashTimer();
    this.initWhatsapp();
    this.initBackTop();
    this.initNewsletterForm();
    this.initMobileMenu();
  },

  // ===== PAGE LOADER =====
  initLoader() {
    const loader = document.querySelector('.page-loader');
    if (!loader) return;
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 600);
    }, 1600);
  },

  // ===== HEADER SCROLL =====
  initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  },

  // ===== BANNER SLIDER =====
  initBannerSlider() {
    const slider = document.querySelector('.banner-slider');
    if (!slider) return;
    const track = slider.querySelector('.banner-track');
    const slides = slider.querySelectorAll('.banner-slide');
    const dots = slider.querySelectorAll('.banner-dot');
    const prevBtn = slider.querySelector('.banner-btn-prev');
    const nextBtn = slider.querySelector('.banner-btn-next');
    let current = 0;
    let autoTimer;

    const go = (i) => {
      current = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, j) => d.classList.toggle('active', j === current));
    };

    const startAuto = () => { autoTimer = setInterval(() => go(current + 1), 4500); };
    const stopAuto = () => clearInterval(autoTimer);

    if (prevBtn) prevBtn.addEventListener('click', () => { stopAuto(); go(current - 1); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { stopAuto(); go(current + 1); startAuto(); });
    dots.forEach((d, i) => d.addEventListener('click', () => { stopAuto(); go(i); startAuto(); }));

    startAuto();

    let touchStart = 0;
    slider.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; stopAuto(); }, { passive: true });
    slider.addEventListener('touchend', e => {
      const diff = touchStart - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) go(diff > 0 ? current + 1 : current - 1);
      startAuto();
    });
  },

  // ===== PRODUCT FILTERS =====
  initProductFilters() {
    const btns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.product-card');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        cards.forEach(card => {
          const show = filter === 'all' || card.dataset.category === filter;
          card.style.display = show ? '' : 'none';
          if (show) {
            card.style.animation = 'none';
            requestAnimationFrame(() => {
              card.style.animation = '';
              card.style.animationDuration = '0.4s';
            });
          }
        });
      });
    });
  },

  // ===== CART =====
  loadCart() {
    try {
      const saved = localStorage.getItem('mobileshop_cart');
      this.cart = saved ? JSON.parse(saved) : [];
    } catch { this.cart = []; }
    this.updateCartUI();
  },

  saveCart() {
    try { localStorage.setItem('mobileshop_cart', JSON.stringify(this.cart)); } catch {}
  },

  addToCart(id, name, price, emoji, category) {
    const existing = this.cart.find(i => i.id === id);
    if (existing) {
      existing.qty++;
    } else {
      this.cart.push({ id, name, price, emoji, category, qty: 1 });
    }
    this.saveCart();
    this.updateCartUI();
    this.showToast(`${name} added to cart!`, 'success');
  },

  removeFromCart(id) {
    this.cart = this.cart.filter(i => i.id !== id);
    this.saveCart();
    this.updateCartUI();
    this.renderCartItems();
  },

  updateQty(id, delta) {
    const item = this.cart.find(i => i.id === id);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    this.saveCart();
    this.updateCartUI();
    this.renderCartItems();
  },

  updateCartUI() {
    const count = this.cart.reduce((s, i) => s + i.qty, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = count;
      el.style.display = count ? '' : 'none';
    });
  },

  getCartTotal() {
    return this.cart.reduce((s, i) => s + i.price * i.qty, 0);
  },

  renderCartItems() {
    const container = document.querySelector('.cart-items');
    if (!container) return;

    if (!this.cart.length) {
      container.innerHTML = `<div class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <p>Your cart is empty</p>
        <button class="btn btn-primary btn-sm" onclick="MobileShop.closeCart()">Shop Now</button>
      </div>`;
      this.updateCartFooter();
      return;
    }

    container.innerHTML = this.cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-img">${item.emoji}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">₹${(item.price * item.qty).toLocaleString()}</div>
          <div class="cart-qty">
            <button class="qty-btn" onclick="MobileShop.updateQty('${item.id}', -1)">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn" onclick="MobileShop.updateQty('${item.id}', 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="MobileShop.removeFromCart('${item.id}')">✕</button>
      </div>
    `).join('');

    this.updateCartFooter();
  },

  updateCartFooter() {
    const footer = document.querySelector('.cart-footer');
    if (!footer) return;
    const subtotal = this.getCartTotal();
    const delivery = subtotal > 499 ? 0 : 49;
    const total = subtotal + delivery;

    footer.innerHTML = `
      <div class="cart-total-row"><span class="label">Subtotal</span><span class="value">₹${subtotal.toLocaleString()}</span></div>
      <div class="cart-total-row"><span class="label">Delivery</span><span class="value">${delivery === 0 ? '<span style="color:#43E97B">FREE</span>' : '₹' + delivery}</span></div>
      <div class="cart-total-row grand"><span class="label">Total</span><span class="value">₹${total.toLocaleString()}</span></div>
      <button class="checkout-btn" onclick="MobileShop.checkout()">
        Proceed to Checkout →
      </button>
      <div style="text-align:center;margin-top:0.75rem;">
        <a href="pages/checkout.html" style="font-size:0.78rem;color:var(--text-muted);">or continue to full checkout</a>
      </div>
    `;
  },

  initCart() {
    document.querySelectorAll('[data-add-cart]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('[data-product-id]');
        if (!card) return;
        const id = card.dataset.productId;
        const name = card.dataset.productName;
        const price = parseInt(card.dataset.productPrice);
        const emoji = card.dataset.productEmoji;
        const category = card.dataset.productCategory;
        MobileShop.addToCart(id, name, price, emoji, category);
      });
    });

    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) cartBtn.addEventListener('click', () => this.openCart());

    const overlay = document.querySelector('.cart-overlay');
    if (overlay) overlay.addEventListener('click', () => this.closeCart());

    document.querySelector('.close-cart')?.addEventListener('click', () => this.closeCart());

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.closeCart();
    });
  },

  openCart() {
    this.renderCartItems();
    document.querySelector('.cart-overlay')?.classList.add('open');
    document.querySelector('.cart-sidebar')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeCart() {
    document.querySelector('.cart-overlay')?.classList.remove('open');
    document.querySelector('.cart-sidebar')?.classList.remove('open');
    document.body.style.overflow = '';
  },

  checkout() {
    if (!this.cart.length) {
      this.showToast('Your cart is empty!', 'info');
      return;
    }
    window.location.href = 'pages/checkout.html';
  },

  // ===== DELIVERY & PAYMENT =====
  initDeliveryPayment() {
    document.querySelectorAll('.delivery-option').forEach(opt => {
      opt.addEventListener('click', () => {
        document.querySelectorAll('.delivery-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        const radio = opt.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
      });
    });

    document.querySelectorAll('.payment-option').forEach(opt => {
      opt.addEventListener('click', () => {
        document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        const radio = opt.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
      });
    });
  },

  // ===== FLASH SALE TIMER =====
  initFlashTimer() {
    const timerEl = document.querySelector('.flash-countdown');
    if (!timerEl) return;

    const endTime = new Date();
    endTime.setHours(23, 59, 59, 0);

    const tick = () => {
      const now = new Date();
      let diff = Math.max(0, endTime - now);
      const h = Math.floor(diff / 3600000);
      diff -= h * 3600000;
      const m = Math.floor(diff / 60000);
      diff -= m * 60000;
      const s = Math.floor(diff / 1000);
      timerEl.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    };

    tick();
    setInterval(tick, 1000);

    const countdownEls = document.querySelectorAll('.timer-value');
    if (countdownEls.length) {
      const tick2 = () => {
        const now = new Date();
        let diff = Math.max(0, endTime - now);
        const h = Math.floor(diff / 3600000);
        diff -= h * 3600000;
        const m = Math.floor(diff / 60000);
        diff -= m * 60000;
        const s = Math.floor(diff / 1000);
        const vals = [h, m, s];
        countdownEls.forEach((el, i) => { if (vals[i] !== undefined) el.textContent = String(vals[i]).padStart(2,'0'); });
      };
      tick2();
      setInterval(tick2, 1000);
    }
  },

  // ===== WHATSAPP =====
  initWhatsapp() {
    const toggle = document.querySelector('.whatsapp-toggle-input');
    if (toggle) {
      toggle.checked = this.whatsappEnabled;
      toggle.addEventListener('change', () => {
        this.whatsappEnabled = toggle.checked;
        const btn = document.querySelector('.whatsapp-float-btn');
        if (btn) btn.style.display = this.whatsappEnabled ? '' : 'none';
        this.showToast(this.whatsappEnabled ? 'WhatsApp chat enabled' : 'WhatsApp chat disabled', 'info');
      });
    }

    const floatBtn = document.querySelector('.whatsapp-float-btn');
    if (floatBtn) {
      floatBtn.addEventListener('click', () => {
        const number = '919876543210';
        const message = encodeURIComponent('Hi! I found your store and I\'m interested in your products. 😊');
        window.open(`https://wa.me/${number}?text=${message}`, '_blank');
      });
    }

    const connectBtn = document.querySelector('.whatsapp-connect-btn');
    if (connectBtn) {
      connectBtn.addEventListener('click', () => {
        const number = '919876543210';
        const message = encodeURIComponent('Hello! I want to know more about your products and offers.');
        window.open(`https://wa.me/${number}?text=${message}`, '_blank');
      });
    }
  },

  // ===== BACK TO TOP =====
  initBackTop() {
    const btn = document.querySelector('.back-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  },

  // ===== NEWSLETTER =====
  initNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (!input.value) return;
      this.showToast('🎉 Subscribed! Check your email for a 15% off coupon.', 'success');
      input.value = '';
    });
  },

  // ===== MOBILE MENU =====
  initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav-links');
    if (!toggle || !nav) return;

    let open = false;
    toggle.addEventListener('click', () => {
      open = !open;
      nav.style.display = open ? 'flex' : '';
      if (open) {
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.top = '70px';
        nav.style.left = '0';
        nav.style.right = '0';
        nav.style.background = 'rgba(15,15,26,0.98)';
        nav.style.padding = '1rem';
        nav.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
        nav.style.backdropFilter = 'blur(20px)';
        nav.style.zIndex = '999';
      } else {
        nav.removeAttribute('style');
      }
    });
  },

  // ===== TOAST =====
  showToast(message, type = 'info') {
    const container = document.querySelector('.toast-container') || (() => {
      const c = document.createElement('div');
      c.className = 'toast-container';
      document.body.appendChild(c);
      return c;
    })();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: '✓', info: 'ℹ', warning: '⚠' };
    toast.innerHTML = `<span class="toast-icon">${icons[type] || 'ℹ'}</span>${message}`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toast-in 0.3s reverse';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  },

  // ===== CATEGORY SELECTION =====
  selectCategory(name) {
    document.querySelectorAll('.category-card').forEach(c => {
      c.classList.toggle('active', c.dataset.category === name);
    });

    const filterBtn = document.querySelector(`.filter-btn[data-filter="${name.toLowerCase()}"]`);
    if (filterBtn) filterBtn.click();

    const section = document.querySelector('.products-section');
    if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

document.addEventListener('DOMContentLoaded', () => MobileShop.init());
