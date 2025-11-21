import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

export type TemplatePlaceholders = Record<string, string | number | boolean>
export const parseTemplate = (
  templateName: string,
  placeholders: TemplatePlaceholders
) => {
  let template = ''

  const candidates: string[] = [
    path.join(process.cwd(), 'public/email-templates', `${templateName}.html`)
  ]

  try {
    const compiledPath = fileURLToPath(
      new URL(`../_email-templates/${templateName}.html`, import.meta.url)
    )
    candidates.push(compiledPath)
  } catch {}

  candidates.push(
    path.join(process.cwd(), 'app/api/_email-templates', `${templateName}.html`)
  )

  for (const p of candidates) {
    try {
      template = fs.readFileSync(p, 'utf-8')
      if (template) break
    } catch {}
  }

  Object.keys(placeholders).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g')
    template = template.replace(regex, String(placeholders[key]))
  })

  return template
}
