import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/app/api/_utils/emailService'

export async function POST (request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json()
    const email = String(body?.email || '')
      .trim()
      .toLowerCase()

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email' },
        { status: 400 }
      )
    }

    await sendEmail(email, 'Waitlist Confirmation', 'waitlist-confirmation', {})

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    )
  }
}
