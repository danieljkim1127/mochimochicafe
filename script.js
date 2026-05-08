// ── Carousel ──────────────────────────────────────────────
let cur = 0;
const slides = document.querySelectorAll('.carousel-image');
const dots   = document.querySelectorAll('.dot');

function goSlide(n) {
  slides[cur].classList.remove('active');
  dots[cur].classList.remove('active');
  cur = n % slides.length;
  slides[cur].classList.add('active');
  dots[cur].classList.add('active');
}
setInterval(() => goSlide(cur + 1), 4000);


// ── Bubble Canvas ─────────────────────────────────────────
const canvas = document.getElementById('bubbleCanvas');
const ctx    = canvas.getContext('2d');
const colors = ['#C8813A','#C2506A','#4A7C59','#E8A0BF','#7BA7BC','#F4C262','#A67DB8'];
let bubbles  = [];

function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function mkBubble() {
  return {
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * 200,
    r: 8 + Math.random() * 28,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: 0.4 + Math.random() * 0.8,
    drift: (Math.random() - 0.5) * 0.4,
    alpha: 0.15 + Math.random() * 0.25,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.01 + Math.random() * 0.02,
  };
}

for (let i = 0; i < 28; i++) { const b = mkBubble(); b.y = Math.random() * canvas.height; bubbles.push(b); }

function animBubbles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bubbles.forEach(b => {
    b.y -= b.speed;
    b.wobble += b.wobbleSpeed;
    b.x += Math.sin(b.wobble) * b.drift;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = b.color + Math.round(b.alpha * 255).toString(16).padStart(2, '0');
    ctx.fill();
    ctx.beginPath();
    ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.25, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.fill();
    if (b.y < -b.r * 2) Object.assign(b, mkBubble());
  });
  requestAnimationFrame(animBubbles);
}
animBubbles();


// ── Menu Data ─────────────────────────────────────────────
const cats = [
  {
    id: 'coffee', label: 'Coffee', items: [
      { name: 'Iced Caramel Macchiato', price: '$6.75', desc: 'Rich and creamy espresso drink with a caramel twist.',             img: 'images/iced_caramel_macchiato.webp' },
      { name: 'Caramel Macchiato',      price: '$6.25', desc: 'Rich espresso shot topped with a velvety caramel drizzle.',        img: 'images/coffee_placeholder.webp' },
      { name: 'Iced Americano',         price: '$6.00', desc: 'Rich and smooth coffee served over ice.',                          img: 'images/coffee_placeholder.webp' },
      { name: 'Iced Cafe Latte',        price: '$6.50', desc: 'Rich and creamy espresso-style coffee served over ice.',           img: 'images/coffee_placeholder.webp' },
      { name: 'Americano',              price: '$5.25', desc: 'Rich and smooth coffee blend.',                                    img: 'images/coffee_placeholder.webp' },
      { name: 'Cafe Latte',             price: '$6.00', desc: 'Rich and smooth espresso-style coffee with steamed milk.',         img: 'images/coffee_placeholder.webp' },
      { name: 'Cappuccino',             price: '$6.00', desc: 'Rich and smooth espresso-style coffee drink.',                     img: 'images/coffee_placeholder.webp' },
      { name: 'Iced Decaf Americano',   price: '$6.00', desc: 'Rich and smooth decaf coffee served over ice.',                    img: 'images/coffee_placeholder.webp' },
      { name: 'Iced Coffee',            price: '$5.00', desc: 'Brewed coffee served over ice.',                                   img: 'images/coffee_placeholder.webp' },
      { name: 'Iced Cafe Mocha',        price: '$6.75', desc: 'Rich and creamy coffee drink with a mocha flavor.',                img: 'images/coffee_placeholder.webp' },
      { name: 'Hot Coffee',             price: '$4.00', desc: 'Rich and bold coffee to start your day.',                          img: 'images/coffee_placeholder.webp' },
      { name: 'Cafe Mocha',             price: '$6.25', desc: 'Rich and smooth coffee drink with a mocha flavor.',                img: 'images/coffee_placeholder.webp' },
      { name: 'Decaf Americano',        price: '$5.25', desc: 'Rich and smooth decaf coffee.',                                    img: 'images/coffee_placeholder.webp' },
      { name: 'Espresso (2 shots)',      price: '$4.00', desc: 'Strong and rich coffee made with two shots of espresso.',          img: 'images/coffee_placeholder.webp' },
    ]
  },
  {
    id: 'other', label: 'Other Drinks', items: [
      { name: 'Iced Green Tea Latte', price: '$6.50', desc: 'Refreshing green tea blended with creamy milk, served over ice.', img: 'images/hot_tea_placeholder.webp' },
      { name: 'Green Tea Latte',      price: '$5.75', desc: 'A soothing and refreshing beverage made with green tea.',          img: 'images/hot_tea_placeholder.webp' },
      { name: 'Hot Chocolate',        price: '$5.00', desc: 'Rich and creamy drink to warm your day.',                          img: 'images/hot_tea_placeholder.webp' },
    ]
  },
  {
    id: 'hottea', label: 'Hot Tea', items: [
      { name: 'Hot Chamomile Tea', price: '$4.50', desc: 'Soothing herbal tea with a calming aroma.',                                   img: 'images/hot_tea_placeholder.webp' },
      { name: 'Hot Ginger Tea',    price: '$5.00', desc: 'Soothing and spicy, a warm cup to comfort your senses.',                      img: 'images/hot_tea_placeholder.webp' },
      { name: 'Hot Earl Grey Tea', price: '$4.50', desc: 'Soothing black tea infused with bergamot oil for a citrusy twist.',           img: 'images/hot_tea_placeholder.webp' },
      { name: 'Hot Jujube Tea',    price: '$5.50', desc: 'Traditional tea made with jujube fruit, offering a sweet and soothing brew.', img: 'images/hot_tea_placeholder.webp' },
      { name: 'Hot Green Tea',     price: '$4.00', desc: 'Steaming hot green tea, perfect for a soothing moment.',                      img: 'images/hot_tea_placeholder.webp' },
      { name: 'Hot Black Tea',     price: '$4.00', desc: 'Strong and rich black tea.',                                                   img: 'images/hot_tea_placeholder.webp' },
      { name: 'Hot Citron Tea',    price: '$5.00', desc: 'Citron-infused hot tea for a soothing drink.',                                 img: 'images/hot_tea_placeholder.webp' },
    ]
  },
  {
    id: 'icedtea', label: 'Iced Tea', items: [
      { name: 'Iced Ginger Tea',    price: '$6.00', desc: 'Refreshing and soothing, perfect for warm days.',             img: 'images/iced_tea_placeholder.webp' },
      { name: 'Iced Citron Tea',    price: '$6.00', desc: 'Refreshing citrus tea perfect for warm days.',                img: 'images/iced_tea_placeholder.webp' },
      { name: 'Iced Green Tea',     price: '$5.00', desc: 'Refreshing and thirst-quenching green tea served over ice.',  img: 'images/iced_tea_placeholder.webp' },
      { name: 'Iced Earl Grey Tea', price: '$5.50', desc: 'Refreshing black tea infused with bergamot oil.',             img: 'images/iced_tea_placeholder.webp' },
      { name: 'Iced Black Tea',     price: '$5.00', desc: 'Refreshing black tea served over ice.',                       img: 'images/iced_tea_placeholder.webp' },
      { name: 'Iced Chamomile Tea', price: '$5.50', desc: 'Soothing herbal tea infused with calming chamomile.',         img: 'images/iced_tea_placeholder.webp' },
      { name: 'Iced Jujube Tea',    price: '$6.00', desc: 'Sweet and refreshing tea infused with jujube fruit.',         img: 'images/iced_tea_placeholder.webp' },
    ]
  },
  {
    id: 'special', label: 'Special Iced Drinks', items: [
      { name: 'Grapefruit Ade',          price: '$6.50', desc: 'Refreshing grapefruit drink.',                              img: 'images/grapefruit_ade.webp' },
      { name: 'Mango Ade',               price: '$6.50', desc: 'Refreshing mango drink.',                                   img: 'images/mango_ade.webp' },
      { name: 'Mango Passion Fruit Ade', price: '$6.50', desc: 'Refreshing blend of mango and passion fruit flavors.',      img: 'images/iced_tea_placeholder.webp' },
      { name: 'Strawberry Ade',          price: '$6.50', desc: 'Sweet and refreshing strawberry flavored drink.',           img: 'images/iced_tea_placeholder.webp' },
      { name: 'Peach Ade',               price: '$6.50', desc: 'Refreshing peach flavored drink.',                          img: 'images/iced_tea_placeholder.webp' },
      { name: 'Peach Black Tea',         price: '$6.50', desc: 'Peach black tea with lychee popping boba.',                 img: 'images/iced_tea_placeholder.webp' },
      { name: 'Iced Peach Tea',          price: '$5.25', desc: 'Refreshing peach tea, perfect for warm days.',              img: 'images/iced_tea_placeholder.webp' },
      { name: 'Iced Lemon Tea',          price: '$5.25', desc: 'Refreshing and tangy lemon flavor in every sip.',           img: 'images/iced_tea_placeholder.webp' },
      { name: 'Passion Fruit Ade',       price: '$6.50', desc: 'Refreshing passion fruit drink.',                           img: 'images/iced_tea_placeholder.webp' },
    ]
  },
  {
    id: 'bubble', label: 'Bubble Tea', items: [
      { name: 'Strawberry',      price: '$7.00', desc: 'Boba option available after 10am.', img: 'images/strawberry_bbt.webp' },
      { name: 'Taro I',          price: '$7.00', desc: 'Boba option available after 10am.', img: 'images/taro_bbt.webp' },
      { name: 'Honeydew',        price: '$7.00', desc: 'Boba option available after 10am.', img: 'images/honeydew_bbt.webp' },
      { name: 'Taro II',         price: '$7.00', desc: 'Boba option available after 10am.', img: 'images/bubble_tea_placeholder.webp' },
      { name: 'Black Milk Tea',  price: '$7.00', desc: 'Boba option available after 10am.', img: 'images/bubble_tea_placeholder.webp' },
      { name: 'Thai Tea',        price: '$7.00', desc: 'Boba option available after 10am.', img: 'images/bubble_tea_placeholder.webp' },
      { name: 'Yogurt',          price: '$7.00', desc: 'Boba option available after 10am.', img: 'images/bubble_tea_placeholder.webp' },
      { name: 'Mango',           price: '$7.00', desc: 'Boba option available after 10am.', img: 'images/bubble_tea_placeholder.webp' },
      { name: 'Lychee',          price: '$7.00', desc: 'Boba option available after 10am.', img: 'images/bubble_tea_placeholder.webp' },
      { name: 'Coffee',          price: '$7.00', desc: 'Boba option available after 10am.', img: 'images/bubble_tea_placeholder.webp' },
      { name: 'Misutgaru',       price: '$7.00', desc: 'Boba option available after 10am.', img: 'images/bubble_tea_placeholder.webp' },
      { name: 'Peach',           price: '$7.00', desc: 'Boba option available after 10am.', img: 'images/bubble_tea_placeholder.webp' },
      { name: 'Passion Fruit',   price: '$7.00', desc: 'Boba option available after 10am.', img: 'images/bubble_tea_placeholder.webp' },
      { name: 'Chocolate',       price: '$7.00', desc: 'Boba option available after 10am.', img: 'images/bubble_tea_placeholder.webp' },
      { name: 'Oreo Brown Sugar',price: '$7.50', desc: 'Rich brown sugar flavor infused with Oreo.', img: 'images/bubble_tea_placeholder.webp' },
      { name: 'Brown Sugar',     price: '$7.00', desc: 'Boba option available after 10am.', img: 'images/bubble_tea_placeholder.webp' },
      { name: 'Vanilla Latte',   price: '$7.00', desc: 'Boba option available after 10am.', img: 'images/bubble_tea_placeholder.webp' },
    ]
  },
  {
    id: 'croffle', label: 'Croffle', items: [
      { name: 'Banana Nutella Croffle', price: '$8.00', desc: 'Sweet banana and Nutella filled croffle.',               img: 'images/banana_nutella_croffle.webp' },
      { name: 'Strawberry Croffle',     price: '$8.00', desc: 'Sweet and flaky pastry filled with fresh strawberries.', img: 'images/strawberry_croffle.webp' },
      { name: 'Oreo Croffle',           price: '$8.00', desc: 'Crispy, flaky pastry filled with Oreo cookies.',         img: 'images/oreo_croffle.webp' },
      { name: 'Fruity Pebbles Croffle', price: '$8.00', desc: 'Sweet and crunchy cereal-inspired treat.',               img: 'images/cookie_placeholder.webp' },
      { name: 'Lotus Croffle',          price: '$8.00', desc: 'Crispy, flaky pastry filled with lotus.',                img: 'images/cookie_placeholder.webp' },
    ]
  },
  {
    id: 'pudding', label: 'Pudding', items: [
      { name: 'Banana Pudding',         price: '$8.50', desc: 'Creamy dessert made with banana.',                  img: 'images/banana_pudding.webp' },
      { name: 'Chocolate Oreo Pudding', price: '$8.50', desc: 'Rich and creamy pudding infused with Oreo flavor.', img: 'images/choco_oreo_pudding.webp' },
    ]
  },
  {
    id: 'bingsu', label: 'Bingsu', items: [
      { name: 'Fruit Bingsu',                 price: '$21.00', desc: 'Shaved milk ice dessert topped with fresh mixed fruits.',                          img: 'images/fruit_bingsu.webp' },
      { name: 'Injeolmi Bingsu',              price: '$21.00', desc: 'Shaved milk ice with sweet rice cakes, soy bean powder, and red bean toppings.',  img: 'images/bingsoo_placeholder.webp' },
      { name: 'Mango Cheesecake Bingsu',      price: '$21.00', desc: 'Sweet shaved milk ice dessert with fresh mango and creamy cheesecake.',           img: 'images/bingsoo_placeholder.webp' },
      { name: 'Strawberry Cheesecake Bingsu', price: '$21.00', desc: 'Sweet shaved milk ice dessert with strawberry and cheesecake flavors.',           img: 'images/bingsoo_placeholder.webp' },
    ]
  },
  {
    id: 'cupbingsu', label: 'Cup Bingsu', items: [
      { name: 'Mango Cheesecake Cup Bingsu',      price: '$13.00', desc: 'Sweet and creamy cheesecake topped with fresh mango, served over shaved milk ice.',   img: 'images/bingsoo_placeholder.webp' },
      { name: 'Injeolmi Cup Bingsu',              price: '$13.00', desc: 'Korean-style shaved milk ice with soy bean powder, injeolmi rice cakes, and red bean.', img: 'images/bingsoo_placeholder.webp' },
      { name: 'Fruit Cup Bingsu',                 price: '$13.00', desc: 'Sweet and refreshing shaved milk ice dessert topped with mixed fruit.',               img: 'images/bingsoo_placeholder.webp' },
      { name: 'Strawberry Cheesecake Cup Bingsu', price: '$13.00', desc: 'Sweet and creamy cheesecake topped with fresh strawberries.',                         img: 'images/bingsoo_placeholder.webp' },
    ]
  },
  {
    id: 'cookies', label: 'Cookies', items: [
      { name: 'Chocolate Chip Cookie', price: '$3.50', desc: 'Soft-baked cookie filled with dark chocolate chips.', img: 'images/cookie_placeholder.webp' },
    ]
  },
].filter(c => c.items.length > 0);


// ── Render tabs (desktop inline + mobile bottom bar) ───────
const menuNav     = document.getElementById('menuNav');
const menuContent = document.getElementById('menuContent');
const bottomBar   = document.getElementById('bottomTabBar');
const barWrap     = document.getElementById('bottomTabBarWrap');
const scrollHint  = document.getElementById('scrollHint');
const menuSection = document.getElementById('menu');

function isMobile() { return window.innerWidth < 768; }

function setBottomBarVisibility(visible) {
  if (isMobile()) {
    barWrap.style.display = visible ? 'block' : 'none';
  } else {
    barWrap.style.display = 'none';
  }
}

// Hide scroll hint once user scrolls the bar
bottomBar.addEventListener('scroll', () => {
  const atEnd = bottomBar.scrollLeft + bottomBar.clientWidth >= bottomBar.scrollWidth - 8;
  scrollHint.classList.toggle('hidden', atEnd || bottomBar.scrollLeft > 10);
}, { passive: true });

cats.forEach((cat, idx) => {
  // Desktop inline tab
  const btn = document.createElement('button');
  btn.className = 'mtab' + (idx === 0 ? ' active' : '');
  btn.textContent = cat.label;

  // Mobile bottom tab
  const btab = document.createElement('button');
  btab.className = 'btab' + (idx === 0 ? ' active' : '');
  btab.textContent = cat.label;

  const activate = (fromBtab) => {
    document.querySelectorAll('.mtab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.btab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    btab.classList.add('active');
    renderMenu(cat);
    menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Auto-scroll the tapped btab to center of the bar
    if (fromBtab) {
      const barWidth = bottomBar.clientWidth;
      const btnLeft  = btab.offsetLeft;
      const btnWidth = btab.offsetWidth;
      bottomBar.scrollTo({
        left: btnLeft - (barWidth / 2) + (btnWidth / 2),
        behavior: 'smooth'
      });
    }
  };

  btn.onclick  = () => activate(false);
  btab.onclick = () => activate(true);

  menuNav.appendChild(btn);
  bottomBar.appendChild(btab);
});

function checkBarVisibility() {
  if (!isMobile()) { barWrap.style.display = 'none'; return; }
  const rect = menuSection.getBoundingClientRect();
  const inView = rect.top < window.innerHeight && rect.bottom > 0;
  barWrap.style.display = inView ? 'block' : 'none';
}

// Run on scroll, resize, and immediately on load
window.addEventListener('scroll', checkBarVisibility, { passive: true });
window.addEventListener('resize', checkBarVisibility);
checkBarVisibility();


// ── Render menu content ────────────────────────────────────
function renderMenu(cat) {
  menuContent.innerHTML = '';
  const list = document.createElement('div');
  list.className = 'menu-list';

  cat.items.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'menu-card';
    card.style.animationDelay = `${i * 50}ms`;
    card.innerHTML = `
      <div class="menu-card-body">
        <div class="menu-card-name">${item.name}</div>
        <div class="menu-card-price">${item.price}</div>
        ${item.desc ? `<div class="menu-card-desc">${item.desc}</div>` : ''}
      </div>
      <img class="menu-card-img" src="${item.img}" alt="${item.name}" loading="lazy"/>`;
    list.appendChild(card);
  });

  menuContent.appendChild(list);
}

renderMenu(cats[0]);


// ── Smooth scroll ──────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});