import { NextRequest, NextResponse } from 'next/server'

// POST /api/payments/initiate — initiate a payment (JazzCash/Easypaisa/Card)
// This is a demo/sandbox flow that simulates payment gateway redirect.
// In production, this would integrate with real JazzCash/Easypaisa APIs.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      vendorSlug,
      vendorName,
      packageId,
      packageName,
      amount,
      method, // 'jazzcash' | 'easypaisa' | 'card'
      customerName,
      customerPhone,
      customerEmail,
      eventDate,
    } = body

    // Validation
    if (!vendorSlug || !amount || !method || !customerName || !customerPhone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (amount < 1000) {
      return NextResponse.json(
        { error: 'Minimum advance payment is PKR 1,000' },
        { status: 400 }
      )
    }

    // Generate a transaction ID
    const txnId = `TXN${Date.now()}${Math.floor(Math.random() * 1000)}`
    const orderId = `ORD${Date.now()}`

    // Simulate payment initiation
    // In production: redirect to JazzCash/Easypaisa payment gateway
    // For demo: return a success response with simulated redirect URL
    const gatewayData = {
      txnId,
      orderId,
      amount,
      currency: 'PKR',
      method,
      vendorSlug,
      vendorName,
      packageName: packageName || 'Custom',
      customerName,
      customerPhone,
      customerEmail: customerEmail || null,
      eventDate: eventDate || null,
      status: 'initiated',
      // Simulated gateway redirect URL (in production, this would be real)
      redirectUrl: null, // Demo: we skip redirect and auto-confirm
      initiatedAt: new Date().toISOString(),
      // Demo: auto-confirm after 2 seconds (simulate async processing)
      demo: true,
    }

    return NextResponse.json({
      success: true,
      message: 'Payment initiated successfully',
      payment: gatewayData,
    })
  } catch (error) {
    console.error('POST /api/payments error:', error)
    return NextResponse.json({ error: 'Payment initiation failed' }, { status: 500 })
  }
}

// GET /api/payments/methods — available payment methods
export async function GET() {
  return NextResponse.json({
    methods: [
      {
        id: 'jazzcash',
        name: 'JazzCash',
        iconName: 'Smartphone',
        desc: 'Pay via JazzCash mobile account or card',
        color: '#ED1C24',
        processingFee: 0,
        popular: true,
      },
      {
        id: 'easypaisa',
        name: 'Easypaisa',
        iconName: 'Wallet',
        desc: 'Pay via Easypaisa mobile account',
        color: '#00A651',
        processingFee: 0,
        popular: true,
      },
      {
        id: 'card',
        name: 'Debit/Credit Card',
        iconName: 'CreditCard',
        desc: 'Visa, Mastercard, UnionPay',
        color: '#6C092A',
        processingFee: 25, // 2.5% processing fee
        popular: false,
      },
    ],
  })
}
