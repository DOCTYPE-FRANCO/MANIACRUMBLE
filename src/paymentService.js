import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

const useFlutterwavePayment = () => {
    const config = {
        public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
        tx_ref: Date.now().toString(),
        amount: 0,
        currency: 'USD',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: '',
            phone_number: '',
            name: '',
        },
        customizations: {
            title: 'MANIACRUMBLE',
            description: 'Payment for items in cart',
            logo: '/src/assets/LOGO.png',
        },
    };

    return { config, useFlutterwave, closePaymentModal };
};

export const processFlutterwavePayment = async (amount, customer, items) => {
    const config = {
        public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY,
        tx_ref: `MC-${Date.now()}`,
        amount: amount,
        currency: 'USD',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: customer.email,
            phone_number: customer.phone || '',
            name: customer.name,
        },
        customizations: {
            title: 'MANIACRUMBLE',
            description: `Payment for ${items.length} item(s)`,
            logo: '/src/assets/LOGO.png',
        },
    };

    return new Promise((resolve, reject) => {
        const handleFlutterPayment = useFlutterwave(config);
        
        handleFlutterPayment({
            callback: (response) => {
                if (response.status === 'successful') {
                    resolve({
                        success: true,
                        transactionId: response.transaction_id,
                        reference: response.tx_ref,
                        amount: response.amount,
                        currency: response.currency
                    });
                } else {
                    reject(new Error('Payment failed'));
                }
                closePaymentModal();
            },
            onClose: () => {
                reject(new Error('Payment cancelled'));
            },
        });
    });
};

export default useFlutterwavePayment;