import React, { useState } from 'react';

interface PaymentModalProps {
    onClose: () => void;
    onConfirm: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ onClose, onConfirm }) => {
    const [paymentMethod, setPaymentMethod] = useState<'mobile' | 'card'>('mobile');
    const [processing, setProcessing] = useState(false);

    const handleConfirm = () => {
        setProcessing(true);
        // Simulate API call
        setTimeout(() => {
            onConfirm();
            setProcessing(false);
        }, 2000);
    }
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-brand-gray rounded-lg shadow-xl w-11/12 md:w-1/2 lg:w-1/3" onClick={e => e.stopPropagation()}>
                <div className="p-6">
                    <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
                        <h2 className="text-2xl font-bold text-brand-red">Paiement de la Cotisation</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">&times;</button>
                    </div>
                    
                    <div className="space-y-4">
                        <p className="text-gray-300">Montant : <span className="font-bold text-white">25 000 FCFA</span></p>
                        <p className="text-gray-400 text-sm">Veuillez sélectionner votre méthode de paiement pour finaliser votre adhésion pour l'année en cours.</p>
                        
                        {/* Payment method selection */}
                        <div className="flex space-x-4">
                            <button 
                                onClick={() => setPaymentMethod('mobile')}
                                className={`flex-1 p-3 rounded-md border-2 transition-colors ${paymentMethod === 'mobile' ? 'bg-brand-red border-brand-red' : 'border-gray-600 hover:bg-gray-800'}`}
                            >
                                Mobile Money
                            </button>
                             <button 
                                onClick={() => setPaymentMethod('card')}
                                className={`flex-1 p-3 rounded-md border-2 transition-colors ${paymentMethod === 'card' ? 'bg-brand-red border-brand-red' : 'border-gray-600 hover:bg-gray-800'}`}
                            >
                                Carte Bancaire
                            </button>
                        </div>

                        {/* Form fields */}
                        {paymentMethod === 'mobile' && (
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Numéro de téléphone</label>
                                <input type="tel" id="phone" placeholder="+225 01 02 03 04 05" className="w-full bg-brand-dark border-gray-600 rounded-md shadow-sm p-3 focus:ring-brand-red focus:border-brand-red" />
                            </div>
                        )}

                        {paymentMethod === 'card' && (
                           <div className="space-y-3">
                                <div>
                                    <label htmlFor="card_number" className="block text-sm font-medium text-gray-300 mb-1">Numéro de carte</label>
                                    <input type="text" id="card_number" placeholder="**** **** **** ****" className="w-full bg-brand-dark border-gray-600 rounded-md shadow-sm p-3 focus:ring-brand-red focus:border-brand-red" />
                                </div>
                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                         <label htmlFor="expiry_date" className="block text-sm font-medium text-gray-300 mb-1">Date d'expiration</label>
                                         <input type="text" id="expiry_date" placeholder="MM/AA" className="w-full bg-brand-dark border-gray-600 rounded-md shadow-sm p-3 focus:ring-brand-red focus:border-brand-red" />
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="cvc" className="block text-sm font-medium text-gray-300 mb-1">CVC</label>
                                         <input type="text" id="cvc" placeholder="***" className="w-full bg-brand-dark border-gray-600 rounded-md shadow-sm p-3 focus:ring-brand-red focus:border-brand-red" />
                                    </div>
                                </div>
                           </div>
                        )}
                        
                         <button 
                            onClick={handleConfirm}
                            disabled={processing}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Traitement...' : 'Confirmer le Paiement'}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
