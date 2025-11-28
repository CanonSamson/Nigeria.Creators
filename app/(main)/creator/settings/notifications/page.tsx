'use client'
import { useState } from 'react'

export default function NotificationSettingsPage () {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [brandCollaborations, setBrandCollaborations] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(true)

  const Toggle = ({
    checked,
    onChange
  }: {
    checked: boolean
    onChange: () => void
  }) => (
    <button
      type='button'
      aria-pressed={checked}
      onClick={onChange}
      className={`relative inline-flex h-[28px] w-[52px] items-center rounded-full transition-colors duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-[#327468]/20 ${
        checked ? 'bg-[#327468]' : 'bg-[#EAEAEA]'
      }`}
    >
      <span
        className={`inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow transition-transform duration-300 ease-out ${
          checked ? 'translate-x-[24px]' : 'translate-x-[2px]'
        }`}
      />
    </button>
  )

  const Card = ({
    title,
    subtitle,
    checked,
    onChange
  }: {
    title: string
    subtitle: string
    checked: boolean
    onChange: () => void
  }) => (
    <div className='w-full rounded-[16px] border border-[#EFEFEF] bg-white px-5 py-4 flex items-center justify-between'>
      <div>
        <p className='text-[16px] md:text-[18px] font-medium text-black'>
          {title}
        </p>
        <p className='text-[12px] md:text-[14px] text-text-color-200'>
          {subtitle}
        </p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  )

  return (
    <div className='pl-22 md:pl-0 md:pr-0 pr-10 font-sans max-w-[640px] space-y-6'>
      <div>
        <h2 className='text-[18px] md:text-[22px] font-bold text-black'>
          Notification Preferences
        </h2>
        <p className='text-text-color-200 text-[14px] md:text-[16px]'>
          Control how you receive updates
        </p>
      </div>

      <Card
        title='Email Notifications'
        subtitle='Receive updates via email'
        checked={emailNotifications}
        onChange={() => setEmailNotifications(v => !v)}
      />
      <Card
        title='Brand Collaborations'
        subtitle='Get notified about partnership opportunities'
        checked={brandCollaborations}
        onChange={() => setBrandCollaborations(v => !v)}
      />
      <Card
        title='Weekly Digest'
        subtitle='Summary of your performance metrics'
        checked={weeklyDigest}
        onChange={() => setWeeklyDigest(v => !v)}
      />
    </div>
  )
}
