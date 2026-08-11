import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronLeft, MessageCircle, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import styles from './Checkout.module.css';

const IVORY_COAST_CITIES = [
  'Abidjan', 'Bouaké', 'Yamoussoukro', 'Korhogo', 'San-Pédro', 
  'Daloa', 'Man', 'Abengourou', 'Grand-Bassam', 'Bingerville',
  'Gagnoa', 'Divo', 'Koumassi', 'Marcory', 'Plateau', 'Treichville',
  'Cocody', 'Yopougon', 'Attécoubé', 'Abobo', 'Songon', 'Anyama'
];

export default function CheckoutPage() {
  const { items, getTotal, getSubtotal, getShipping, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    note: ''
  });
  const [citySearch, setCitySearch] = useState('');
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);

  const total = getTotal();
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '2250503744336';

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Générer l'ID de commande
    const orderId = `#CI-${Date.now().toString().slice(-6)}`;

    // Construire le message WhatsApp
    let message = `🆕 *NOUVELLE COMMANDE*\n\n`;
    message += `📋 *ID COMMANDE:* ${orderId}\n`;
    message += `📍 *DESTINATION:* ${formData.city.toUpperCase()} / CI\n\n`;
    message += `👤 *CLIENT*\n`;
    message += `• Nom: ${formData.fullName}\n`;
    message += `• Téléphone: ${formData.phone}\n`;
    message += `• Adresse: ${formData.address}\n`;
    message += `• Ville: ${formData.city}\n`;
    message += `• Pays: Côte d'Ivoire\n\n`;
    message += `🛒 *ARTICLES*\n`;
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Quantité: ${item.quantity}\n`;
      if (item.selectedSize) message += `   Taille: ${item.selectedSize}\n`;
      if (item.selectedColor) message += `   Couleur: ${item.selectedColor}\n`;
      message += `   Prix: ${(item.price * item.quantity).toLocaleString()} FCFA\n\n`;
    });

    message += `💰 *TOTAL*\n`;
    message += `• Sous-total: ${getSubtotal().toLocaleString()} FCFA\n`;
    message += `• Livraison: ${getShipping() === 0 ? 'Gratuite' : getShipping().toLocaleString() + ' FCFA'}\n`;
    message += `• *TOTAL: ${total.toLocaleString()} FCFA*\n\n`;
    message += `💳 *PAIEMENT: À LA LIVRAISON*\n\n`;
    
    if (formData.note) {
      message += `📝 *NOTE:* ${formData.note}\n`;
    }

    // Encoder le message pour l'URL
    const encodedMessage = encodeURIComponent(message);
    
    // Ouvrir WhatsApp avec le message pré-rempli
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    // Vider le panier et afficher le succès
    clearCart();
    setLoading(false);
  };

  const filteredCities = IVORY_COAST_CITIES.filter(city =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  const handleCitySelect = (city) => {
    setFormData({ ...formData, city });
    setCitySearch(city);
    setShowCitySuggestions(false);
  };

  if (items.length === 0) {
    return (
      <div className={styles.emptyWrap}>
        <ShoppingBag size={48} style={{ marginBottom: '16px', color: 'var(--gray-400)' }} />
        <h2>Votre panier est vide</h2>
        <Link to="/boutique" className={styles.emptyBtn}>Retourner à la boutique</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet><title>Commander — Laissa</title></Helmet>
      
      <div className={styles.checkoutPage}>
        <div className="container">
          <div className={styles.header}>
            <Link to="/boutique" className={styles.backLink}><ChevronLeft size={16} /> Retour à la boutique</Link>
          </div>
          
          <div className={styles.layout}>
            {/* Formulaire */}
            <div className={styles.main}>
              <div className={styles.infoBanner}>
                <MessageCircle size={20} />
                <span>Tes informations servent uniquement à préparer le message WhatsApp. Aucun paiement n'est demandé ici.</span>
              </div>

              <form onSubmit={handleSubmit} className={styles.formCard}>
                <h2 className={styles.formTitle}>Tes coordonnées</h2>
                
                <div className={styles.field}>
                  <label className={styles.label}>Nom complet</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    className={styles.input} 
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required 
                    placeholder="Ex: Diane Sidic"
                  />
                </div>
                
                <div className={styles.field}>
                  <label className={styles.label}>Téléphone</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    className={styles.input} 
                    value={formData.phone}
                    onChange={handleInputChange}
                    required 
                    placeholder="Ex: +2250503744336"
                  />
                </div>
                
                <div className={styles.field}>
                  <label className={styles.label}>Adresse de livraison</label>
                  <input 
                    type="text" 
                    name="address" 
                    className={styles.input} 
                    value={formData.address}
                    onChange={handleInputChange}
                    required 
                    placeholder="Ex: Abidjan, Cocody, Rue 12"
                  />
                </div>
                
                <div className={styles.field}>
                  <label className={styles.label}>Ville</label>
                  <div className={styles.cityInputWrapper}>
                    <input 
                      type="text" 
                      name="city" 
                      className={styles.input} 
                      value={citySearch}
                      onChange={(e) => {
                        setCitySearch(e.target.value);
                        setFormData({ ...formData, city: e.target.value });
                        setShowCitySuggestions(true);
                      }}
                      onFocus={() => setShowCitySuggestions(true)}
                      onBlur={() => setTimeout(() => setShowCitySuggestions(false), 200)}
                      required 
                      placeholder="Rechercher ou taper votre ville..."
                      autoComplete="off"
                    />
                    {showCitySuggestions && filteredCities.length > 0 && (
                      <div className={styles.citySuggestions}>
                        {filteredCities.map((city) => (
                          <div
                            key={city}
                            className={styles.citySuggestion}
                            onClick={() => handleCitySelect(city)}
                          >
                            {city}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Note (facultatif)</label>
                  <textarea 
                    name="note" 
                    className={styles.textarea} 
                    value={formData.note}
                    onChange={handleInputChange}
                    placeholder="Précisions sur la livraison..."
                    rows={3}
                  />
                </div>
                
                <button type="submit" className={styles.whatsappBtn} disabled={loading}>
                  {loading ? 'Préparation...' : (
                    <>
                      <MessageCircle size={20} />
                      Commander sur WhatsApp
                    </>
                  )}
                </button>
                
                <p className={styles.whatsappNote}>
                  WhatsApp va s'ouvrir automatiquement. Appuie sur "Envoyer" pour valider ta commande.
                </p>
              </form>
            </div>
            
            {/* Résumé de commande */}
            <aside className={styles.summarySidebar}>
              <div className={styles.summaryCard}>
                <h3 className={styles.summaryTitle}>Résumé de la commande</h3>
                
                <div className={styles.orderItems}>
                  {items.map((item) => (
                    <div key={item.key} className={styles.orderItem}>
                      <div className={styles.itemBadge}>{item.quantity}</div>
                      <img src={item.images[0]} alt={item.name} className={styles.itemImage} />
                      <div className={styles.itemInfo}>
                        <span className={styles.itemTitle}>{item.name}</span>
                        <span className={styles.itemMeta}>{item.selectedSize || ''} {item.selectedColor ? `- ${item.selectedColor}` : ''}</span>
                      </div>
                      <span className={styles.itemPrice}>{(item.price * item.quantity).toLocaleString()} FCFA</span>
                    </div>
                  ))}
                </div>
                
                <div className={styles.totalsList}>
                  <div className={styles.totalRow}>
                    <span>Sous-total</span>
                    <span>{getSubtotal().toLocaleString()} FCFA</span>
                  </div>
                  <div className={styles.totalRow}>
                    <span>Expédition</span>
                    <span>{getShipping() === 0 ? 'Gratuite' : `${getShipping().toLocaleString()} FCFA`}</span>
                  </div>
                  <div className={`${styles.totalRow} ${styles.totalFinal}`}>
                    <span>Total à payer</span>
                    <span className={styles.finalPrice}>{total.toLocaleString()} FCFA</span>
                  </div>
                </div>

                <div className={styles.paymentInfo}>
                  <MessageCircle size={16} />
                  <span>Livraison et paiement à confirmer sur WhatsApp</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
