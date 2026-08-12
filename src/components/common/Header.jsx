import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Search, ShoppingBag, Menu, X, ChevronDown,
  Phone, Mail, MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/cartStore';
import { PRODUCTS } from '../../data/products';
import s from './Header.module.css';
import logoImg from '../../assets/logo-dh.png';

const NAV_ITEMS = [
  { label: 'Accueil', to: '/' },
  { label: 'Boutique', to: '/boutique' },
  {
    label: 'Femmes', to: '/femmes',
    sub: [
      { label: 'Abayas', to: '/femmes/abayas' },
      { label: 'Hijabs', to: '/femmes/hijabs' },
      { label: 'Jilbabs', to: '/femmes/jilbabs' },
      { label: 'Robes', to: '/femmes/robes' },
      { label: 'Khimars', to: '/femmes/khimars' },
      { label: 'Accessoires', to: '/femmes/accessoires' },
      { label: 'Chaussures', to: '/femmes/chaussures' },
    ],
  },
  {
    label: 'Hommes', to: '/hommes',
    sub: [
      { label: 'Qamis', to: '/hommes/qamis' },
      { label: 'Sarouels', to: '/hommes/sarouels' },
      { label: 'Chaussures', to: '/hommes/chaussures' },
    ],
  },
  {
    label: 'Beauté', to: '/beaute',
    sub: [
      { label: 'Cheveux', to: '/beaute/cheveux' },
      { label: 'Parfums', to: '/beaute/parfums' },
      { label: 'Sacs', to: '/beaute/sacs' },
      { label: 'Soin Visage', to: '/beaute/soin_visage' },
    ],
  },
  {
    label: 'Électronique', to: '/electronique',
    sub: [
      { label: 'Cuisine', to: '/electronique/cuisine' },
      { label: 'Audio', to: '/electronique/audio' },
      { label: 'Montres', to: '/electronique/montres' },
    ],
  },
  {
    label: 'Accessoires', to: '/accessoires',
    sub: [
      { label: 'Islam', to: '/accessoires/islam' },
      { label: 'Chaussettes', to: '/accessoires/chaussettes' },
      { label: 'Gants', to: '/accessoires/gants' },
    ],
  },
  { label: 'Promotions', to: '/promotions' },
  { label: 'Nouveautés', to: '/nouveautes' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMega, setOpenMega] = useState(null);
  const [openMobileAccordion, setOpenMobileAccordion] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const cartCount = useCartStore((s) => s.getCount());
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fermer le menu si on resize vers desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1100) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Bloquer le scroll body quand menu mobile ouvert
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    if (searchQuery.length > 1) {
      const results = PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 6);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/boutique?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchResults([]);
      setShowSearch(false);
    }
  };

  const toggleMobileAccordion = (label) => {
    setOpenMobileAccordion(prev => prev === label ? null : label);
  };

  return (
    <>
      <header className={`${s.header} ${scrolled ? s.scrolled : s.transparent}`}>
        {/* Top Bar */}
        <div className={s.topBar}>
          <div className={`${s.topBarContent} container`}>
            <div className={s.topBarLeft}>
              <span><Phone size={11} /> 05 03 74 43 36</span>
              <span><Mail size={11} /> contact@daralhayaa.com</span>
              <span><MapPin size={11} /> Livraison partout en Côte d'Ivoire</span>
            </div>
            <div className={s.topBarRight}>
              <Link to="/contact">Contact</Link>
              <Link to="/faq">FAQ</Link>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className={s.mainNav}>
          <div className={`${s.navContent} container`}>
            {/* Logo */}
            <Link to="/" className={s.logo}>
              <img
                src={logoImg}
                alt="Dar Al-Hayaa Modest Fashion"
                className={s.logoImg}
                onError={(e) => {
                  // Fallback si l'image ne charge pas
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback text logo */}
              <div className={s.logoFallback} style={{ display: 'none' }}>
                <div className={s.logoIcon}>🌙</div>
                <div className={s.logoText}>
                  <span className={s.logoName}>Dar Al-Hayaa</span>
                  <span className={s.logoTagline}>Modest Fashion</span>
                </div>
              </div>
            </Link>

            {/* Nav Links (desktop) */}
            <div className={s.navLinks}>
              {NAV_ITEMS.map((item) => (
                item.sub ? (
                  <div
                    key={item.label}
                    className={s.megaMenuWrapper}
                    onMouseEnter={() => setOpenMega(item.label)}
                    onMouseLeave={() => setOpenMega(null)}
                  >
                    <button className={s.navLink}>
                      {item.label}
                      <ChevronDown size={13} />
                    </button>
                    <AnimatePresence>
                      {openMega === item.label && (
                        <motion.div
                          className={s.megaMenu}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                        >
                          <div className={s.megaMenuTitle}>{item.label}</div>
                          {item.sub.map((sub) => (
                            <Link
                              key={sub.label}
                              to={sub.to}
                              className={s.megaMenuLink}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    className={({ isActive }) => `${s.navLink} ${isActive ? s.active : ''}`}
                  >
                    {item.label}
                  </NavLink>
                )
              ))}
            </div>

            {/* Search Bar */}
            <div className={s.searchBar} ref={searchRef}>
              <form onSubmit={handleSearch}>
                <Search size={16} className={s.searchIcon} />
                <input
                  type="text"
                  className={s.searchInput}
                  placeholder="Rechercher hijab, abaya, qamis..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSearch(true)}
                  onBlur={() => setTimeout(() => setShowSearch(false), 200)}
                />
              </form>
              <AnimatePresence>
                {showSearch && searchResults.length > 0 && (
                  <motion.div
                    className={s.searchSuggestions}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                  >
                    {searchResults.map((p) => (
                      <Link
                        key={p.id}
                        to={`/produit/${p.id}`}
                        className={s.searchSuggestionItem}
                        onClick={() => { setSearchQuery(''); setSearchResults([]); }}
                      >
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          style={{ width: 36, height: 36, borderRadius: 6, objectFit: 'cover' }}
                        />
                        <div>
                          <div>{p.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--gold)' }}>
                            {p.price.toLocaleString()} FCFA
                          </div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Nav Actions */}
            <div className={s.navActions}>
              {/* Cart */}
              <button className={s.navAction} aria-label="Panier" onClick={openCart}>
                <ShoppingBag size={20} />
                {cartCount > 0 && <span className={s.badge}>{cartCount}</span>}
              </button>

              {/* Mobile Menu Toggle (hamburger) */}
              <button className={s.menuToggle} onClick={() => setMobileOpen(true)} aria-label="Menu">
                <Menu size={22} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <div className={s.mobileMenu}>
            <motion.div
              className={s.mobileOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className={s.mobileDrawer}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* Drawer Header */}
              <div className={s.mobileMenuHeader}>
                <Link to="/" className={s.logo} onClick={() => setMobileOpen(false)}>
                  <img
                    src={logoImg}
                    alt="Dar Al-Hayaa"
                    className={s.logoImg}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className={s.logoFallback} style={{ display: 'none' }}>
                    <div className={s.logoIcon}>🌙</div>
                    <div className={s.logoText}>
                      <span className={s.logoName}>Dar Al-Hayaa</span>
                    </div>
                  </div>
                </Link>
                <button className={s.menuToggle} style={{ display: 'flex' }} onClick={() => setMobileOpen(false)}>
                  <X size={22} />
                </button>
              </div>

              {/* Mobile Search */}
              <div className={s.mobileSearch}>
                <form onSubmit={(e) => { handleSearch(e); setMobileOpen(false); }} style={{ position: 'relative' }}>
                  <Search size={16} className={s.searchIcon} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(250,250,247,0.4)', pointerEvents: 'none' }} />
                  <input
                    type="text"
                    className={s.searchInput}
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </form>
              </div>

              {/* Nav Items with accordion for sub-menus */}
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  {item.sub ? (
                    <>
                      <button
                        className={s.mobileAccordionToggle}
                        onClick={() => toggleMobileAccordion(item.label)}
                      >
                        <span>{item.label}</span>
                        <motion.span
                          animate={{ rotate: openMobileAccordion === item.label ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={16} />
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {openMobileAccordion === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ overflow: 'hidden' }}
                          >
                            {item.sub.map((sub) => (
                              <Link
                                key={sub.label}
                                to={sub.to}
                                className={s.mobileSubLink}
                                onClick={() => setMobileOpen(false)}
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <NavLink
                      to={item.to}
                      className={({ isActive }) => `${s.mobileNavLink} ${isActive ? s.active : ''}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </NavLink>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
