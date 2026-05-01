import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  const formData = await req.formData();
  const merchantId = formData.get('merchant_id');
  const orderId = formData.get('order_id') as string;
  const payhereAmount = formData.get('payhere_amount');
  const payhereCurrency = formData.get('payhere_currency');
  const statusCode = formData.get('status_code');
  const md5sig = formData.get('md5sig');

  // Verify the signature
  const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET || '4MTY0MTYyMjI2MDI2MjE3MjU3MTczMzYxMzAzMjE2MjY4MDI=';
  const hashedSecret = crypto.createHash('md5').update(merchantSecret).digest('hex').toUpperCase();
  
  const expectedHash = crypto
    .createHash('md5')
    .update(
      merchantId +
      orderId +
      payhereAmount +
      payhereCurrency +
      statusCode +
      hashedSecret
    )
    .digest('hex')
    .toUpperCase();

  if (md5sig === expectedHash && statusCode === '2') {
    // Payment Successful!
    // Order ID format: SUBS-USERID-TIMESTAMP
    const userId = orderId.split('-')[1];
    
    const supabase = await createClient();
    const { error } = await supabase
      .from('profiles')
      .update({ subscription_status: 'active' })
      .eq('id', userId);

    if (error) {
      console.error('Error updating subscription:', error);
      return new Response('Database Error', { status: 500 });
    }

    return new Response('OK', { status: 200 });
  }

  return new Response('Invalid Signature', { status: 400 });
}
