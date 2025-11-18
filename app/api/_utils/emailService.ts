import { parseTemplate, TemplatePlaceholders } from './templateParser'
import dotenv from 'dotenv'
import { Resend } from 'resend'

dotenv.config()

const fromName = 'Nigeria Creators'

export const sendEmail = async (
  to: string,
  subject: string,
  templateName: string,
  placeholders: TemplatePlaceholders
) => {
  try {
    const htmlContent = parseTemplate(templateName, placeholders)

    const apiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.EMAIL_FROM

    if (!apiKey) {
      throw new Error('Missing RESEND_API_KEY')
    }

    if (!fromEmail) {
      throw new Error('Missing EMAIL_FROM')
    }

    if (!fromEmail.includes('@')) {
      throw new Error('Invalid EMAIL_FROM value: expected an email address')
    }

    const resend = new Resend(apiKey)

    const { data, error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [to],
      subject,
      html: htmlContent
    })

    if (error) {
      throw new Error(`Resend API error: ${error.message}`)
    }

    console.log('Email sent:', data?.id)
    return data
  } catch (error) {
    console.error('Error sending email:', {
      error: error
    })
    return undefined
  }
}
