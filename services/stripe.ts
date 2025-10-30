import { loadStripe } from '@stripe/stripe-js';

// Get Stripe publishable key from environment variables
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_demo_key';

export const stripePromise = loadStripe(stripePublishableKey);

export interface CheckoutItem {
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export const redirectToCheckout = async (items: CheckoutItem[], onSuccess?: () => void) => {
  try {
    const stripe = await stripePromise;
    
    if (!stripe) {
      throw new Error('Stripe failed to load');
    }

    // Create line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'eur', // or 'usd' depending on your needs
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : undefined,
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // For demo purposes, we'll simulate a checkout process
    // In a real app, you'd call your backend API to create the session
    const isDemoMode = stripePublishableKey === 'pk_test_demo_key';
    
    if (isDemoMode) {
      // Demo mode - simulate checkout process
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      const totalAmount = lineItems.reduce((sum, item) => 
        sum + (item.price_data.unit_amount * item.quantity), 0
      ) / 100;
      
      const confirmed = window.confirm(
        `Demo Checkout\n\nTotal: €${totalAmount.toFixed(2)}\n\nClick OK to simulate successful payment, or Cancel to abort.`
      );
      
      if (confirmed) {
        alert('🎉 Payment successful! (Demo mode)\n\nIn production, this would redirect to Stripe Checkout.');
        // Clear cart and trigger success callback
        if (onSuccess) {
          onSuccess();
        }
        // In a real app, you'd redirect to success page
        // window.location.href = '/success';
      }
      return;
    }
    
    // In a real implementation, you would do this:
    /*
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lineItems }),
    });
    
    const session = await response.json();
    
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    
    if (result.error) {
      throw new Error(result.error.message);
    }
    */
  } catch (error) {
    console.error('Error redirecting to checkout:', error);
    alert('There was an error processing your checkout. Please try again.');
  }
};
