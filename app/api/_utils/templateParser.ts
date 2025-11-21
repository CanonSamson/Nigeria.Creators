import { templates } from './_email-templates'

export type TemplatePlaceholders = Record<string, string | number | boolean>

export const parseTemplate = (
  templateName: string,
  placeholders: TemplatePlaceholders
): string => {
  let template = templates[templateName]

  if (!template) {
    throw new Error(`Template ${templateName} not found`)
  }
  Object.keys(placeholders).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g')
    template = template.replace(regex, String(placeholders[key]))
  })

  return template
}
