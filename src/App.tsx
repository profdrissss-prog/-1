import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Globe, Phone, Info, ShieldCheck, LayoutDashboard, Trash2, PlusCircle, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Order, Language, Settings } from './types';

// --- Components ---

const Navbar = ({ lang, setLang, toggleAdmin, settings }: { lang: Language, setLang: (l: Language) => void, toggleAdmin: () => void, settings: Settings }) => {
  const isAr = lang === 'ar';
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: settings.primary_color }}
            >E</div>
            <span className="text-2xl font-bold tracking-tight" style={{ color: settings.secondary_color }}>
              {isAr ? 'الكترواوكازيون' : 'ElectroOccasion'}
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            <a href="#" className="text-blue-900 hover:text-blue-600 font-medium">{isAr ? 'الرئيسية' : 'Accueil'}</a>
            <a href="#products" className="text-blue-900 hover:text-blue-600 font-medium">{isAr ? 'المنتجات' : 'Produits'}</a>
            <a href="#about" className="text-blue-900 hover:text-blue-600 font-medium">{isAr ? 'من نحن' : 'À propos'}</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setLang(isAr ? 'fr' : 'ar')}
              className="flex items-center gap-1 px-3 py-1 rounded-full border border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors text-sm font-medium"
            >
              <Globe size={16} />
              {isAr ? 'Français' : 'العربية'}
            </button>
            <button 
              onClick={toggleAdmin}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title={isAr ? 'لوحة التحكم' : 'Tableau de bord'}
            >
              <LayoutDashboard size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ lang, settings }: { lang: Language, settings: Settings }) => {
  const isAr = lang === 'ar';
  return (
    <div className="relative overflow-hidden py-16 sm:py-24" style={{ backgroundColor: settings.secondary_color }}>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: settings.primary_color }}></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: settings.primary_color }}></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-extrabold text-white mb-6"
          >
            {isAr ? 'عالم الإلكترونيات بين يديك' : 'Le monde de l\'électronique entre vos mains'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto"
          >
            {isAr ? 'اكتشف أحدث الهواتف والإكسسوارات بأفضل الأسعار. عرض خاص: خصم 20% على أول طلب!' : 'Découvrez les derniers téléphones et accessoires aux meilleurs prix. Offre spéciale : 20% de réduction sur votre première commande !'}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <a href="#products" className="inline-block bg-white text-blue-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl">
              {isAr ? 'تسوق الآن' : 'Achetez maintenant'}
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, lang, onOrder, settings }: { product: Product, lang: Language, onOrder: (p: Product) => void, settings: Settings, key?: any }) => {
  const isAr = lang === 'ar';
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl border border-blue-50 shadow-sm overflow-hidden flex flex-col h-full"
    >
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img 
          src={product.image_url} 
          alt={isAr ? product.name_ar : product.name_fr} 
          className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
          referrerPolicy="no-referrer"
        />
        {product.is_best_seller === 1 && (
          <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {isAr ? 'الأكثر مبيعاً' : 'Best Seller'}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-xs font-semibold text-blue-600 mb-2 uppercase tracking-wider">
          {isAr ? product.category_ar : product.category_fr}
        </div>
        <h3 className="text-xl font-bold text-blue-900 mb-2">
          {isAr ? product.name_ar : product.name_fr}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">
          {isAr ? product.description_ar : product.description_fr}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-black" style={{ color: settings.primary_color }}>
            {product.price} {isAr ? settings.currency_ar : settings.currency_fr}
          </span>
          <button 
            onClick={() => onOrder(product)}
            style={{ backgroundColor: settings.primary_color }}
            className="text-white px-4 py-2 rounded-lg font-bold hover:opacity-90 transition-colors shadow-md flex items-center gap-2"
          >
            <ShoppingCart size={18} />
            {isAr ? 'اطلب الآن' : 'Commander'}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const OrderModal = ({ product, lang, onClose, onSuccess, settings }: { product: Product, lang: Language, onClose: () => void, onSuccess: () => void, settings: Settings }) => {
  const isAr = lang === 'ar';
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    address: '',
    quantity: 1
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: product.id,
          ...formData
        })
      });
      if (res.ok) {
        onSuccess();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-xl font-bold text-blue-900">
            {isAr ? 'إتمام الطلب' : 'Finaliser la commande'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl mb-4">
            <img src={product.image_url} className="w-16 h-16 rounded-lg object-cover" referrerPolicy="no-referrer" />
            <div>
              <h4 className="font-bold text-blue-900">{isAr ? product.name_ar : product.name_fr}</h4>
              <p className="font-bold" style={{ color: settings.primary_color }}>
                {product.price} {isAr ? settings.currency_ar : settings.currency_fr}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isAr ? 'الكمية' : 'Quantité'}</label>
            <input 
              type="number" 
              min="1" 
              value={formData.quantity}
              onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isAr ? 'الاسم الكامل' : 'Nom complet'}</label>
            <input 
              type="text" 
              value={formData.full_name}
              onChange={e => setFormData({...formData, full_name: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder={isAr ? 'أدخل اسمك بالكامل' : 'Entrez votre nom complet'}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isAr ? 'رقم الهاتف' : 'Numéro de téléphone'}</label>
            <input 
              type="tel" 
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="06XXXXXXXX"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{isAr ? 'العنوان' : 'Adresse'}</label>
            <textarea 
              value={formData.address}
              onChange={e => setFormData({...formData, address: e.target.value})}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none h-24"
              placeholder={isAr ? 'أدخل عنوان التوصيل' : 'Entrez l\'adresse de livraison'}
              required
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={loading}
              style={{ backgroundColor: settings.primary_color }}
              className="w-full text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-lg disabled:opacity-50"
            >
              {loading ? (isAr ? 'جاري الإرسال...' : 'Envoi...') : (isAr ? 'تأكيد الطلب (الدفع عند الاستلام)' : 'Confirmer (Paiement à la livraison)')}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const AdminPanel = ({ lang, onClose, settings, onSettingsUpdate }: { lang: Language, onClose: () => void, settings: Settings, onSettingsUpdate: (s: Settings) => void }) => {
  const isAr = lang === 'ar';
  const [token, setToken] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'settings'>('products');
  const [newProduct, setNewProduct] = useState({
    name_ar: '', name_fr: '', description_ar: '', description_fr: '', price: 0, image_url: '', category_ar: '', category_fr: '', is_best_seller: false
  });
  const [editSettings, setEditSettings] = useState<Settings>(settings);

  const fetchAdminData = async () => {
    try {
      const pRes = await fetch('/api/products');
      const pData = await pRes.json();
      setProducts(pData);

      const oRes = await fetch(`/api/orders?admin_token=${token}`);
      if (oRes.ok) {
        const oData = await oRes.json();
        setOrders(oData);
        setIsAuth(true);
      } else {
        alert(isAr ? 'رمز الدخول غير صحيح' : 'Token incorrect');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: editSettings, admin_token: token })
      });
      if (res.ok) {
        onSettingsUpdate(editSettings);
        alert(isAr ? 'تم حفظ الإعدادات' : 'Paramètres enregistrés');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newProduct, admin_token: token })
      });
      if (res.ok) {
        fetchAdminData();
        setNewProduct({ name_ar: '', name_fr: '', description_ar: '', description_fr: '', price: 0, image_url: '', category_ar: '', category_fr: '', is_best_seller: false });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm(isAr ? 'هل أنت متأكد؟' : 'Êtes-vous sûr ?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ admin_token: token })
      });
      if (res.ok) fetchAdminData();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuth) {
    return (
      <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <ShieldCheck size={64} className="mx-auto text-blue-600 mb-4" />
            <h2 className="text-3xl font-bold text-blue-900">{isAr ? 'منطقة الإدارة' : 'Zone Admin'}</h2>
            <p className="text-gray-500 mt-2">{isAr ? 'يرجى إدخال رمز الحماية للوصول' : 'Veuillez entrer le token de sécurité'}</p>
          </div>
          <div className="space-y-4">
            <input 
              type="password" 
              value={token}
              onChange={e => setToken(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
            />
            <button 
              onClick={fetchAdminData}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all"
            >
              {isAr ? 'دخول' : 'Connexion'}
            </button>
            <button onClick={onClose} className="w-full text-gray-500 font-medium">{isAr ? 'إلغاء' : 'Annuler'}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] bg-gray-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900">{isAr ? 'لوحة التحكم' : 'Tableau de bord'}</h1>
          <button onClick={onClose} className="bg-white p-2 rounded-full shadow-sm hover:bg-gray-100"><X /></button>
        </div>

        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'products' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-100'}`}
          >
            {isAr ? 'المنتجات' : 'Produits'}
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'orders' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-100'}`}
          >
            {isAr ? 'الطلبات' : 'Commandes'}
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${activeTab === 'settings' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border border-blue-100'}`}
          >
            {isAr ? 'الإعدادات' : 'Paramètres'}
          </button>
        </div>

        {activeTab === 'products' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-blue-50">
              <h2 className="text-xl font-bold text-blue-900 mb-6 flex items-center gap-2">
                <PlusCircle size={20} />
                {isAr ? 'إضافة منتج جديد' : 'Ajouter un produit'}
              </h2>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <input type="text" placeholder={isAr ? 'الاسم (عربي)' : 'Nom (Ar)'} className="w-full p-2 border rounded-lg" value={newProduct.name_ar} onChange={e => setNewProduct({...newProduct, name_ar: e.target.value})} required />
                <input type="text" placeholder={isAr ? 'الاسم (فرنسي)' : 'Nom (Fr)'} className="w-full p-2 border rounded-lg" value={newProduct.name_fr} onChange={e => setNewProduct({...newProduct, name_fr: e.target.value})} required />
                <textarea placeholder={isAr ? 'الوصف (عربي)' : 'Description (Ar)'} className="w-full p-2 border rounded-lg" value={newProduct.description_ar} onChange={e => setNewProduct({...newProduct, description_ar: e.target.value})} />
                <textarea placeholder={isAr ? 'الوصف (فرنسي)' : 'Description (Fr)'} className="w-full p-2 border rounded-lg" value={newProduct.description_fr} onChange={e => setNewProduct({...newProduct, description_fr: e.target.value})} />
                <input type="number" placeholder={isAr ? 'السعر' : 'Prix'} className="w-full p-2 border rounded-lg" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} required />
                <input type="text" placeholder={isAr ? 'رابط الصورة' : 'URL Image'} className="w-full p-2 border rounded-lg" value={newProduct.image_url} onChange={e => setNewProduct({...newProduct, image_url: e.target.value})} />
                <input type="text" placeholder={isAr ? 'التصنيف (عربي)' : 'Catégorie (Ar)'} className="w-full p-2 border rounded-lg" value={newProduct.category_ar} onChange={e => setNewProduct({...newProduct, category_ar: e.target.value})} />
                <input type="text" placeholder={isAr ? 'التصنيف (فرنسي)' : 'Catégorie (Fr)'} className="w-full p-2 border rounded-lg" value={newProduct.category_fr} onChange={e => setNewProduct({...newProduct, category_fr: e.target.value})} />
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={newProduct.is_best_seller} onChange={e => setNewProduct({...newProduct, is_best_seller: e.target.checked})} />
                  {isAr ? 'الأكثر مبيعاً' : 'Best Seller'}
                </label>
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">{isAr ? 'إضافة' : 'Ajouter'}</button>
              </form>
            </div>
            <div className="lg:col-span-2 space-y-4">
              {products.map(p => (
                <div key={p.id} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-blue-50">
                  <div className="flex items-center gap-4">
                    <img src={p.image_url} className="w-12 h-12 rounded object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="font-bold">{isAr ? p.name_ar : p.name_fr}</h4>
                      <p className="text-sm text-gray-500">{p.price} $</p>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteProduct(p.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-full"><Trash2 size={20} /></button>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'orders' ? (
          <div className="space-y-4">
            {orders.map(o => (
              <div key={o.id} className="bg-white p-6 rounded-3xl shadow-sm border border-blue-50">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-blue-900">{o.full_name}</h3>
                    <p className="text-blue-600 font-medium">{o.phone}</p>
                  </div>
                  <div className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-sm font-bold">
                    {new Date(o.created_at).toLocaleDateString(isAr ? 'ar-EG' : 'fr-FR')}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 block mb-1">{isAr ? 'المنتج' : 'Produit'}</span>
                    <span className="font-bold">{isAr ? o.name_ar : o.name_fr} (x{o.quantity})</span>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 block mb-1">{isAr ? 'العنوان' : 'Adresse'}</span>
                    <span className="font-bold">{o.address}</span>
                  </div>
                </div>
              </div>
            ))}
            {orders.length === 0 && <div className="text-center py-12 text-gray-500">{isAr ? 'لا توجد طلبات بعد' : 'Aucune commande pour le moment'}</div>}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-blue-50 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">{isAr ? 'إعدادات المتجر' : 'Paramètres du magasin'}</h2>
            <form onSubmit={handleUpdateSettings} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{isAr ? 'العملة (عربي)' : 'Devise (Ar)'}</label>
                  <input type="text" value={editSettings.currency_ar} onChange={e => setEditSettings({...editSettings, currency_ar: e.target.value})} className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{isAr ? 'العملة (فرنسي)' : 'Devise (Fr)'}</label>
                  <input type="text" value={editSettings.currency_fr} onChange={e => setEditSettings({...editSettings, currency_fr: e.target.value})} className="w-full p-2 border rounded-lg" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{isAr ? 'اللون الأساسي' : 'Couleur Primaire'}</label>
                  <input type="color" value={editSettings.primary_color} onChange={e => setEditSettings({...editSettings, primary_color: e.target.value})} className="w-full h-12 p-1 border rounded-lg cursor-pointer" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{isAr ? 'اللون الثانوي' : 'Couleur Secondaire'}</label>
                  <input type="color" value={editSettings.secondary_color} onChange={e => setEditSettings({...editSettings, secondary_color: e.target.value})} className="w-full h-12 p-1 border rounded-lg cursor-pointer" />
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">{isAr ? 'حفظ التغييرات' : 'Sauvegarder'}</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    currency_ar: 'د.م.',
    currency_fr: 'DH',
    primary_color: '#2563eb',
    secondary_color: '#1e3a8a'
  });

  const isAr = lang === 'ar';

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));

    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data && data.primary_color) setSettings(data);
      });
  }, []);

  useEffect(() => {
    document.dir = isAr ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div className={`min-h-screen bg-gray-50 font-sans ${isAr ? 'font-arabic' : ''}`}>
      <Navbar lang={lang} setLang={setLang} toggleAdmin={() => setShowAdmin(true)} settings={settings} />
      
      <Hero lang={lang} settings={settings} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Categories Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            {isAr ? 'تصنيفاتنا' : 'Nos Catégories'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['هواتف', 'سماعات', 'شواحن', 'أجهزة ألعاب'].map((cat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-blue-50 text-center hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                  <ChevronRight size={24} className={isAr ? 'rotate-0' : 'rotate-180'} />
                </div>
                <span className="font-bold text-blue-900">{isAr ? cat : (cat === 'هواتف' ? 'Téléphones' : cat === 'سماعات' ? 'Écouteurs' : cat === 'شواحن' ? 'Chargeurs' : 'Consoles')}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="mb-20">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-blue-900 mb-2">
                {isAr ? 'أحدث المنتجات' : 'Nouveaux Produits'}
              </h2>
              <p className="text-gray-500">{isAr ? 'اختر من بين مجموعتنا المختارة بعناية' : 'Choisissez parmi notre sélection soignée'}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                lang={lang} 
                onOrder={setSelectedProduct} 
                settings={settings}
              />
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="rounded-3xl p-8 md:p-16 text-white mb-20" style={{ backgroundColor: settings.primary_color }}>
          <h2 className="text-3xl font-bold mb-12 text-center">{isAr ? 'آراء عملائنا' : 'Avis de nos clients'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                <div className="flex gap-1 text-orange-400 mb-4">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
                </div>
                <p className="mb-4 italic">
                  {isAr ? 'خدمة ممتازة وتوصيل سريع جداً. المنتج وصل في حالة ممتازة.' : 'Excellent service et livraison très rapide. Le produit est arrivé en excellent état.'}
                </p>
                <div className="font-bold">{isAr ? 'محمد أحمد' : 'Ahmed Mohamed'}</div>
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-6">{isAr ? 'من نحن' : 'À propos de nous'}</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {isAr 
                ? 'الكترواوكازيون هو وجهتكم الأولى لأحدث التقنيات والإلكترونيات. نحن نسعى لتقديم أفضل المنتجات بأسعار تنافسية مع خدمة عملاء استثنائية.' 
                : 'ElectroOccasion est votre destination numéro un pour les dernières technologies et l\'électronique. Nous nous efforçons de fournir les meilleurs produits à des prix compétitifs avec un service client exceptionnel.'}
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 font-bold" style={{ color: settings.primary_color }}>
                <ShieldCheck size={24} />
                <span>{isAr ? 'ضمان الجودة' : 'Garantie de qualité'}</span>
              </div>
              <div className="flex items-center gap-3 font-bold" style={{ color: settings.primary_color }}>
                <Phone size={24} />
                <span>{isAr ? 'دعم فني 24/7' : 'Support technique 24/7'}</span>
              </div>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=800" alt="About" referrerPolicy="no-referrer" />
          </div>
        </section>
      </main>

      <footer className="text-white py-12" style={{ backgroundColor: settings.secondary_color }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-blue-900 font-bold">E</div>
                <span className="text-2xl font-bold tracking-tight">{isAr ? 'الكترواوكازيون' : 'ElectroOccasion'}</span>
              </div>
              <p className="text-blue-200 max-w-sm">
                {isAr ? 'متجرك الموثوق لكل ما هو جديد في عالم الإلكترونيات.' : 'Votre magasin de confiance pour tout ce qui est nouveau dans le monde de l\'électronique.'}
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">{isAr ? 'روابط سريعة' : 'Liens rapides'}</h4>
              <ul className="space-y-4 text-blue-200">
                <li><a href="#" className="hover:text-white transition-colors">{isAr ? 'الرئيسية' : 'Accueil'}</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">{isAr ? 'المنتجات' : 'Produits'}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{isAr ? 'سياسة الخصوصية' : 'Confidentialité'}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">{isAr ? 'تواصل معنا' : 'Contact'}</h4>
              <ul className="space-y-4 text-blue-200">
                <li className="flex items-center gap-2"><Phone size={18} /> 0600000000</li>
                <li className="flex items-center gap-2"><Globe size={18} /> contact@electro.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800 pt-8 text-center text-blue-400 text-sm">
            © {new Date().getFullYear()} {isAr ? 'الكترواوكازيون. جميع الحقوق محفوظة.' : 'ElectroOccasion. Tous droits réservés.'}
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {selectedProduct && (
          <OrderModal 
            product={selectedProduct} 
            lang={lang} 
            onClose={() => setSelectedProduct(null)} 
            onSuccess={() => {
              setSelectedProduct(null);
              setShowSuccess(true);
              setTimeout(() => setShowSuccess(false), 3000);
            }}
            settings={settings}
          />
        )}
        {showAdmin && <AdminPanel lang={lang} onClose={() => setShowAdmin(false)} settings={settings} onSettingsUpdate={setSettings} />}
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl font-bold flex items-center gap-3"
          >
            <ShieldCheck size={24} />
            {isAr ? 'تم استلام طلبك بنجاح! سنتصل بك قريباً.' : 'Votre commande a été reçue avec succès ! Nous vous contacterons bientôt.'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
