import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_SITE_URL));
  }

  // PayHere Credentials (Should be in .env)
  const merchantId = process.env.PAYHERE_MERCHANT_ID || '1211149'; // Default Sandbox ID
  const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET || '4MTY0MTYyMjI2MDI2MjE3MjU3MTczMzYxMzAzMjE2MjY4MDI='; // Sandbox Secret
  const orderId = `SUBS-${user.id}-${Date.now()}`;
  const amount = 1000.00;
  const currency = 'LKR';

  // Hashing logic for PayHere
  const hash = crypto
    .createHash('md5')
    .update(
      merchantId +
      orderId +
      amount.toFixed(2) +
      currency +
      crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase()
    )
    .digest('hex')
    .toUpperCase();

  // Redirect to PayHere Checkout (This would normally be a form POST, 
  // but for a smooth UX we can use the PayHere Checkout API or a hosted link)
  // For now, we'll return the payment parameters so the frontend can submit the form.
  
  return NextResponse.json({
    merchantId,
    orderId,
    amount,
    currency,
    hash,
    items: 'Devneko Academy - Explorer Lab Subscription',
    firstName: user.email?.split('@')[0] || 'Student',
    lastName: 'Academy',
    email: user.email,
    returnUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?status=success`,
    cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/subscribe?status=cancelled`,
    notifyUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payments/payhere-notify`,
  });
}
