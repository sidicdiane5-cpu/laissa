import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { FAQ_ITEMS } from '../data/products';
import { useState } from 'react';
import styles from './Pages.module.css';

// ── Contact Page ──
export function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <>
      <Helmet><title>Contact — Dar Al Hayaa</title></Helmet>
      <div className={styles.pageHero}>
        <div className="container">
          <span className="section-tag">Nous contacter</span>
          <h1 className={styles.heroTitle}>Parlons-en !</h1>
          <p className={styles.heroDesc}>Notre équipe est disponible 7j/7 pour vous aider.</p>
        </div>
      </div>

      <div className="container section-sm">
        <div className={styles.contactLayout}>
          <div className={styles.contactInfo}>
            {[
              { icon: <Phone size={20} />, label: 'Téléphone', value: '05 03 74 43 36', sub: 'Lun-Sam 9h-19h' },
              { icon: <Mail size={20} />, label: 'Email', value: 'contact@daralhayaa.com', sub: 'Réponse sous 24h' },
              { icon: <MapPin size={20} />, label: 'Adresse', value: 'Abidjan, Côte d\'Ivoire', sub: 'Côte d\'Ivoire' },
              { icon: <Clock size={20} />, label: 'Horaires', value: 'Lun-Sam 9h-19h', sub: 'Dimanche fermé' },
            ].map((item, i) => (
              <div key={i} className={styles.infoCard}>
                <div className={styles.infoIcon}>{item.icon}</div>
                <div>
                  <div className={styles.infoLabel}>{item.label}</div>
                  <div className={styles.infoValue}>{item.value}</div>
                  <div className={styles.infoSub}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <h2 className={styles.formTitle}>Envoyer un message</h2>
            <div className={styles.formRow}>
              <div className={styles.field}>
                <label className={styles.label}>Prénom</label>
                <input type="text" className={styles.input} placeholder="Votre prénom" required />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Nom</label>
                <input type="text" className={styles.input} placeholder="Votre nom" required />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input type="email" className={styles.input} placeholder="votre@email.com" required />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Sujet</label>
              <select className={styles.input}>
                <option>Commande & Livraison</option>
                <option>Retour & Remboursement</option>
                <option>Produit & Stock</option>
                <option>Autre</option>
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Message</label>
              <textarea
                className={`${styles.input} ${styles.textarea}`}
                placeholder="Décrivez votre demande..."
                rows={5}
                required
              />
            </div>
            <button type="submit" className={styles.submitBtn}>
              {sent ? '✅ Message envoyé !' : <><Send size={16} /> Envoyer le message</>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

// ── FAQ Page ──
export function FAQPage() {
  const [open, setOpen] = useState(null);

  return (
    <>
      <Helmet><title>FAQ — Dar Al Hayaa</title></Helmet>
      <div className={styles.pageHero}>
        <div className="container">
          <span className="section-tag">Questions fréquentes</span>
          <h1 className={styles.heroTitle}>FAQ</h1>
          <p className={styles.heroDesc}>Toutes les réponses à vos questions les plus fréquentes.</p>
        </div>
      </div>

      <div className="container-sm section">
        {FAQ_ITEMS.map((item, i) => (
          <motion.div
            key={i}
            className={`${styles.faqItem} ${open === i ? styles.faqOpen : ''}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
          >
            <button className={styles.faqQuestion} onClick={() => setOpen(open === i ? null : i)}>
              {item.question}
              <span className={styles.faqToggle}>{open === i ? '−' : '+'}</span>
            </button>
            {open === i && (
              <motion.div
                className={styles.faqAnswer}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                {item.answer}
              </motion.div>
            )}
          </motion.div>
        ))}

        <div className={styles.faqCta}>
          <p>Vous n'avez pas trouvé votre réponse ?</p>
          <Link to="/contact" className={styles.faqCtaBtn}>Contacter notre équipe</Link>
        </div>
      </div>
    </>
  );
}

// ── About Page ──
export function AboutPage() {
  return (
    <>
      <Helmet><title>À Propos — Dar Al Hayaa</title></Helmet>
      <div className={styles.pageHero}>
        <div className="container">
          <span className="section-tag">Notre Histoire</span>
          <h1 className={styles.heroTitle}>À Propos de Dar Al Hayaa</h1>
          <p className={styles.heroDesc}>Une passion pour la mode islamique, une mission de qualité.</p>
        </div>
      </div>

      <div className="container-sm section">
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <h2 className={styles.aboutTitle}>Notre Mission</h2>
            <p>
              Dar Al Hayaa est née d'une conviction simple : chaque femme et chaque homme mérite de s'habiller 
              avec élégance, qualité et dans le respect de ses valeurs islamiques. 
            </p>
            <p>
              Notre boutique propose une sélection rigoureuse de vêtements pudiques, 
              accessoires islamiques, parfums halal et équipements électroniques, le tout 
              dans un cadre de confiance et de qualité certifiée.
            </p>
            <h2 className={styles.aboutTitle} style={{ marginTop: 32 }}>Nos Valeurs</h2>
            <div className={styles.values}>
              {[
                { emoji: '✦', title: 'Qualité', desc: 'Chaque article est sélectionné avec soin pour sa durabilité et son authenticité.' },
                { emoji: '🌙', title: 'Confiance', desc: 'Certifications halal, paiement sécurisé et service client transparent.' },
                { emoji: '💛', title: 'Communauté', desc: '+15 000 familles nous font confiance à travers toute la Côte d\'Ivoire.' },
                { emoji: '🌿', title: 'Éthique', desc: 'Partenariats avec des fournisseurs respectueux des normes de qualité.' },
              ].map((v, i) => (
                <div key={i} className={styles.valueCard}>
                  <div className={styles.valueEmoji}>{v.emoji}</div>
                  <div>
                    <div className={styles.valueTitle}>{v.title}</div>
                    <div className={styles.valueDesc}>{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Legal Pages ──
export function PrivacyPage() {
  return (
    <>
      <Helmet><title>Politique de Confidentialité — Dar Al Hayaa</title></Helmet>
      <div className={styles.pageHero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Politique de Confidentialité</h1>
        </div>
      </div>
      <div className="container-sm section">
        <div className={styles.legalContent}>
          <h2>1. Données collectées</h2>
          <p>Nous collectons uniquement les données nécessaires à votre commande : nom complet, numéro de téléphone, adresse de livraison et ville. Ces données sont utilisées exclusivement pour préparer votre commande via WhatsApp et organiser la livraison.</p>
          
          <h2>2. Utilisation des données</h2>
          <p>Vos données personnelles sont utilisées exclusivement pour :</p>
          <ul>
            <li>Préparer et envoyer votre commande via WhatsApp</li>
            <li>Organiser la livraison de vos articles</li>
            <li>Vous contacter si nécessaire concernant votre commande</li>
          </ul>
          <p><strong>Vos données ne sont jamais vendues à des tiers.</strong></p>
          
          <h2>3. Protection des données</h2>
          <p>Nous utilisons des protocoles de sécurité standard pour protéger vos données. Les informations de commande sont transmises directement via WhatsApp et ne sont stockées dans nos serveurs.</p>
          
          <h2>4. Vos droits</h2>
          <p>Conformément à la législation, vous disposez des droits suivants :</p>
          <ul>
            <li><strong>Droit d'accès :</strong> Consulter vos données personnelles</li>
            <li><strong>Droit de rectification :</strong> Modifier vos données inexactes</li>
            <li><strong>Droit à l'effacement :</strong> Demander la suppression de vos données</li>
          </ul>
          <p>Pour exercer ces droits, contactez-nous à contact@daralhayaa.com</p>
          
          <h2>5. Conservation des données</h2>
          <p>Vos données de commande sont conservées uniquement le temps nécessaire au traitement de votre commande et à des fins de livraison.</p>
          
          <h2>6. Contact</h2>
          <p>Pour toute question concernant votre confidentialité : contact@daralhayaa.com ou 05 03 74 43 36</p>
        </div>
      </div>
    </>
  );
}

export function TermsPage() {
  return (
    <>
      <Helmet><title>Conditions Générales de Vente — Dar Al Hayaa</title></Helmet>
      <div className={styles.pageHero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Conditions Générales de Vente</h1>
        </div>
      </div>
      <div className="container-sm section">
        <div className={styles.legalContent}>
          <h2>1. Objet</h2>
          <p>Les présentes Conditions Générales de Vente (CGV) régissent toutes les ventes de produits effectuées sur le site internet Dar Al Hayaa entre la société Dar Al Hayaa et tout acheteur.</p>
          
          <h2>2. Acceptation des conditions</h2>
          <p>Le fait de passer commande sur notre site implique l'acceptation pleine et entière des présentes CGV.</p>
          
          <h2>3. Produits</h2>
          <p>Les produits proposés à la vente sont décrits et présentés avec la plus grande précision possible.</p>
          
          <h2>4. Commandes</h2>
          <p>Toute commande est validée via WhatsApp. Après avoir rempli le formulaire de commande, WhatsApp s'ouvre automatiquement avec un message pré-rempli contenant tous les détails de votre commande. Vous devez appuyer sur "Envoyer" pour confirmer votre commande.</p>
          
          <h2>5. Prix</h2>
          <p>Les prix sont indiqués en FCFA. Dar Al Hayaa se réserve le droit de modifier ses prix à tout moment mais le produit sera facturé sur la base du tarif en vigueur au moment de la validation de la commande.</p>
          
          <h2>6. Paiement</h2>
          <p>Le paiement s'effectue à la livraison en espèces uniquement. Le client paie au livreur lors de la remise du colis.</p>
          
          <h2>7. Livraison</h2>
          <p>Les produits sont livrés à l'adresse indiquée par le client lors de la commande. Les délais de livraison sont de 2 jours à Abidjan et 3 à 5 jours à l'intérieur de la Côte d'Ivoire.</p>
          
          <h2>8. Droit de rétractation</h2>
          <p>Conformément à la législation en vigueur, vous disposez d'un délai de 30 jours à compter de la réception de votre commande pour exercer votre droit de rétractation.</p>
          
          <h2>9. Retours et remboursements</h2>
          <p>Les articles retournés doivent être neufs, non portés, dans leur emballage d'origine. Les frais de retour sont à la charge du client sauf si le produit est défectueux.</p>
          
          <h2>10. Garantie</h2>
          <p>Tous nos produits bénéficient de la garantie légale de conformité. En cas de défaut, vous pouvez demander le remplacement ou le remboursement du produit.</p>
          
          <h2>11. Contact</h2>
          <p>Pour toute question relative aux CGV : contact@daralhayaa.com ou 05 03 74 43 36</p>
        </div>
      </div>
    </>
  );
}

export function ShippingPage() {
  return (
    <>
      <Helmet><title>Politique de Livraison — Dar Al Hayaa</title></Helmet>
      <div className={styles.pageHero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Politique de Livraison</h1>
        </div>
      </div>
      <div className="container-sm section">
        <div className={styles.legalContent}>
          <h2>1. Zones de livraison</h2>
          <p>Nous livrons dans toute la Côte d'Ivoire (Abidjan, Bouaké, Yamoussoukro, Korhogo, San-Pédro, etc.).</p>
          
          <h2>2. Délais de livraison</h2>
          <ul>
            <li><strong>Abidjan :</strong> 2 jours</li>
            <li><strong>Intérieur de la Côte d'Ivoire :</strong> 3 à 5 jours</li>
          </ul>
          
          <h2>3. Frais de livraison</h2>
          <ul>
            <li><strong>Gratuite</strong> dès 50 000 FCFA d'achat en Côte d'Ivoire</li>
            <li><strong>3 000 FCFA</strong> pour les commandes inférieures à 50 000 FCFA</li>
          </ul>
          
          <h2>4. Modes de livraison</h2>
          <p>Nous proposons la livraison à domicile avec paiement à la livraison.</p>
          
          <h2>5. Confirmation de commande</h2>
          <p>Toutes les commandes sont confirmées via WhatsApp. Vous recevrez un message avec les détails de votre commande et nous confirmerons la livraison.</p>
          
          <h2>6. Réception de la commande</h2>
          <p>À la réception de votre colis, nous vous recommandons de :</p>
          <ul>
            <li>Vérifier l'intégrité de l'emballage</li>
            <li>Contrôler la conformité des produits</li>
            <li>Payer à la livraison</li>
          </ul>
          
          <h2>7. Retours et échanges</h2>
          <p>En cas de produit non conforme ou défectueux, contactez-nous dans les 48h suivant la réception via WhatsApp. Nous organiserons le retour et l'échange.</p>
          
          <h2>8. Contact</h2>
          <p>Pour toute question relative à la livraison : contact@daralhayaa.com ou 05 03 74 43 36</p>
        </div>
      </div>
    </>
  );
}
