import { Link } from 'react-router-dom';
import { Phone, MapPin, ArrowRight } from 'lucide-react';
import styles from './Footer.module.css';

const FOOTER_LINKS = {
  boutique: [
    { label: 'Femmes', to: '/femmes' },
    { label: 'Hommes', to: '/hommes' },
    { label: 'Beauté & Parfums', to: '/beaute' },
    { label: 'Électronique', to: '/electronique' },
    { label: 'Accessoires Islamiques', to: '/accessoires' },
    { label: 'Promotions', to: '/promotions' },
    { label: 'Nouveautés', to: '/nouveautes' },
  ],
  aide: [
    { label: 'FAQ', to: '/faq' },
    { label: 'Politique de retour', to: '/retours' },
    { label: 'Livraison', to: '/livraison' },
    { label: 'Contact', to: '/contact' },
  ],
  legal: [
    { label: 'À propos de nous', to: '/a-propos' },
    { label: 'Conditions générales', to: '/cgv' },
    { label: 'Politique de confidentialité', to: '/confidentialite' },
    { label: 'Mentions légales', to: '/mentions-legales' },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Main Footer */}
      <div className={styles.main}>
        <div className="container">
          <div className={styles.grid}>
            {/* Brand */}
            <div className={styles.brand}>
              <div className={styles.logo}>
                <div className={styles.logoIcon}>🌙</div>
                <div>
                  <div className={styles.logoName}>Dar Al Hayaa</div>
                  <div className={styles.logoTagline}>Mode Islamique Premium</div>
                </div>
              </div>
              <p className={styles.brandDesc}>
                Dar Al Hayaa est votre destination haut de gamme pour la mode islamique : 
                vêtements pudiques, accessoires, beauté halal et électronique de qualité.
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className={styles.colTitle}>Boutique</h3>
              {FOOTER_LINKS.boutique.map((l) => (
                <Link key={l.label} to={l.to} className={styles.link}>{l.label}</Link>
              ))}
            </div>

            <div>
              <h3 className={styles.colTitle}>Aide & Services</h3>
              {FOOTER_LINKS.aide.map((l) => (
                <Link key={l.label} to={l.to} className={styles.link}>{l.label}</Link>
              ))}
            </div>

            <div>
              <h3 className={styles.colTitle}>Informations</h3>
              {FOOTER_LINKS.legal.map((l) => (
                <Link key={l.label} to={l.to} className={styles.link}>{l.label}</Link>
              ))}

              <div className={styles.contact}>
                <h3 className={styles.colTitle} style={{ marginTop: '1.5rem' }}>Contact</h3>
                <div className={styles.contactItem}><Phone size={13} /> 05 03 74 43 36</div>
                <div className={styles.contactItem}><Mail size={13} /> contact@daralhayaa.com</div>
                <div className={styles.contactItem}><MapPin size={13} /> Abidjan, Côte d'Ivoire</div>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className={styles.payments}>
            <div className={styles.paymentBadges}>
              <span className={styles.payBadge}>💵 Livraison</span>
              <span className={styles.payBadge}>🔒 SSL Sécurisé</span>
              <span className={styles.payBadge}>✅ Halal Certifié</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <span>© 2025 Dar Al Hayaa. Tous droits réservés.</span>
            <span>Fait avec ❤️ pour la communauté musulmane</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
