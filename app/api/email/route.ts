import { sendEmail } from 'components/utils/email'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { name, email, company, message } = await request.json()
    const to = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@omniant.studio'

    await sendEmail({
      to,
      from: email,
      subject: `Contact Form Submission from ${name}${company ? ` (${company})` : ''}`,
      message: `Name: ${name}\nEmail: ${email}\nCompany: ${company || 'Not provided'}\n\nMessage:\n${message}`
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
