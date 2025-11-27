import { applyAsCreatorTemplate } from './apply-as-creator'
import { creatorsFinishUpLinkTemplate } from './creators-finish-up-link'
import { waitlistConfirmationTemplate } from './waitlist-confirmation'

export const templates: Record<string, string> = {
  ['waitlist-confirmation']: waitlistConfirmationTemplate,
  ['apply-as-creator']: applyAsCreatorTemplate,
  ['creators-finish-up-link']: creatorsFinishUpLinkTemplate
}
