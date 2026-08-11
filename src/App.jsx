import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

// Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CartDrawer from './components/cart/CartDrawer';
import WhatsAppButton from './components/common/WhatsAppButton';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import CheckoutPage from './pages/Checkout';
import { 
  ContactPage, FAQPage, AboutPage, 
  PrivacyPage, TermsPage, ShippingPage 
} from './pages/Pages';
import { 
  WomenPage, MenPage, BeautyPage, 
  ElectronicsPage, AccessoriesPage, 
  PromotionsPage, NewArrivalsPage,
  AbayasPage, HijabsPage, JilbabsPage, RobesPage, KhimarsPage, AccessoiresFemmePage, ChaussuresFemmePage,
  QamisPage, SarouelsPage, ChaussuresHommePage,
  CheveuxPage, ParfumsPage, SacsPage, SoinVisagePage,
  CuisinePage, AudioPage, MontresPage,
  IslamPage, ChaussettesPage, GantsPage
} from './pages/CategoryPages';


// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};


// Layout component
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main style={{ minHeight: '80vh' }}>
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
    </>
  );
};

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Toaster position="top-right" />
        <Layout>
          <Routes>
            {/* Core */}
            <Route path="/" element={<Home />} />
            <Route path="/boutique" element={<Shop />} />
            <Route path="/produit/:id" element={<ProductDetail />} />
            <Route path="/paiement" element={<CheckoutPage />} />
            
            {/* Categories */}
            <Route path="/femmes" element={<WomenPage />} />
            <Route path="/hommes" element={<MenPage />} />
            <Route path="/beaute" element={<BeautyPage />} />
            <Route path="/electronique" element={<ElectronicsPage />} />
            <Route path="/accessoires" element={<AccessoriesPage />} />
            <Route path="/promotions" element={<PromotionsPage />} />
            <Route path="/nouveautes" element={<NewArrivalsPage />} />

            {/* Subcategories - Femmes */}
            <Route path="/femmes/abayas" element={<AbayasPage />} />
            <Route path="/femmes/hijabs" element={<HijabsPage />} />
            <Route path="/femmes/jilbabs" element={<JilbabsPage />} />
            <Route path="/femmes/robes" element={<RobesPage />} />
            <Route path="/femmes/khimars" element={<KhimarsPage />} />
            <Route path="/femmes/accessoires" element={<AccessoiresFemmePage />} />
            <Route path="/femmes/chaussures" element={<ChaussuresFemmePage />} />

            {/* Subcategories - Hommes */}
            <Route path="/hommes/qamis" element={<QamisPage />} />
            <Route path="/hommes/sarouels" element={<SarouelsPage />} />
            <Route path="/hommes/chaussures" element={<ChaussuresHommePage />} />

            {/* Subcategories - Beauté */}
            <Route path="/beaute/cheveux" element={<CheveuxPage />} />
            <Route path="/beaute/parfums" element={<ParfumsPage />} />
            <Route path="/beaute/sacs" element={<SacsPage />} />
            <Route path="/beaute/soin_visage" element={<SoinVisagePage />} />

            {/* Subcategories - Électronique */}
            <Route path="/electronique/cuisine" element={<CuisinePage />} />
            <Route path="/electronique/audio" element={<AudioPage />} />
            <Route path="/electronique/montres" element={<MontresPage />} />

            {/* Subcategories - Accessoires */}
            <Route path="/accessoires/islam" element={<IslamPage />} />
            <Route path="/accessoires/chaussettes" element={<ChaussettesPage />} />
            <Route path="/accessoires/gants" element={<GantsPage />} />
            
            {/* Utility Pages */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/confidentialite" element={<PrivacyPage />} />
            <Route path="/cgv" element={<TermsPage />} />
            <Route path="/mentions-legales" element={<TermsPage />} />
            <Route path="/livraison" element={<ShippingPage />} />
            <Route path="/retours" element={<ShippingPage />} />
            
            {/* 404 */}
            <Route path="*" element={
              <div style={{ textAlign: 'center', padding: '120px 20px', minHeight: '60vh' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', color: 'var(--navy)' }}>404</h1>
                <p style={{ color: 'var(--gray-500)', marginBottom: '24px' }}>Page introuvable</p>
                <a href="/" style={{ background: 'var(--navy)', color: 'white', padding: '12px 24px', borderRadius: 'var(--radius-full)', textDecoration: 'none' }}>
                  Retour à l'accueil
                </a>
              </div>
            } />
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}
