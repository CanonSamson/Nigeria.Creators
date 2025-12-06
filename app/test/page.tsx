'use client'
import React, { useMemo, useState } from 'react'
import {
  BarChart3,
  Bell,
  CheckCircle,
  Hand,
  MapPin,
  Search,
  Send,
  Settings,
  Star,
  Upload,
  User,
  UserPlus,
  XCircle
} from 'lucide-react'

type View =
  | 'LANDING'
  | 'BRAND_REG'
  | 'BRAND_SUBSCRIPTION'
  | 'BRAND_DASH'
  | 'CREATOR_REG'
  | 'CREATOR_REVIEW'
  | 'CREATOR_DASH'
  | 'CREATOR_DECLINED'

type UserType = 'BRAND' | 'CREATOR' | null

type Creator = {
  id: string
  name: string
  niche: string
  location: string
  engagementRate: number
  followers: number
  socials: { platform: string; url: string }[]
}

type Notification = {
  id: string
  type: 'interest' | 'message'
  title: string
  body: string
  creatorId?: string
}

export default function Page () {
  const [view, setView] = useState<View>('LANDING')
  const [userType, setUserType] = useState<UserType>(null)

  const [brandRegStep, setBrandRegStep] = useState(0)
  const [brandBasicInfo, setBrandBasicInfo] = useState({ name: '', email: '' })
  const [brandCompany, setBrandCompany] = useState({
    company: '',
    size: '1-10'
  })
  const [brandLocation, setBrandLocation] = useState({ city: '', country: '' })
  const [brandNiche, setBrandNiche] = useState<string[]>([])
  const [brandPaid, setBrandPaid] = useState(false)

  const [creatorBasic, setCreatorBasic] = useState({ name: '', email: '' })
  const [creatorLinks, setCreatorLinks] = useState({
    instagram: '',
    tiktok: '',
    youtube: ''
  })
  const [creatorPortfolio, setCreatorPortfolio] = useState<string[]>([])
  const [creatorReviewStatus, setCreatorReviewStatus] = useState<
    'PENDING' | 'APPROVED' | 'DECLINED'
  >('PENDING')
  const [creatorAvailability, setCreatorAvailability] = useState<
    'AVAILABLE' | 'BUSY'
  >('AVAILABLE')
  const [showDevToggle, setShowDevToggle] = useState(false)

  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedCreatorForStats, setSelectedCreatorForStats] =
    useState<Creator | null>(null)
  const [selectedCreatorForLinks, setSelectedCreatorForLinks] =
    useState<Creator | null>(null)
  const [ratingTarget, setRatingTarget] = useState<Creator | null>(null)
  const [ratingValue, setRatingValue] = useState(0)
  const [ratingNotes, setRatingNotes] = useState('')
  const [ratings, setRatings] = useState<
    Record<string, { value: number; notes: string }>
  >({})

  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filters, setFilters] = useState({
    location: '',
    niche: '',
    minEngagement: 0
  })

  const creators: Creator[] = useMemo(
    () => [
      {
        id: 'c1',
        name: 'Ava Martinez',
        niche: 'Beauty',
        location: 'Los Angeles, USA',
        engagementRate: 7.8,
        followers: 210000,
        socials: [
          { platform: 'Instagram', url: 'https://instagram.com/ava' },
          { platform: 'TikTok', url: 'https://tiktok.com/@ava' }
        ]
      },
      {
        id: 'c2',
        name: 'Leo Kim',
        niche: 'Tech',
        location: 'Seoul, Korea',
        engagementRate: 5.1,
        followers: 120000,
        socials: [
          { platform: 'YouTube', url: 'https://youtube.com/leokim' },
          { platform: 'Twitter', url: 'https://x.com/leokim' }
        ]
      },
      {
        id: 'c3',
        name: 'Maya Singh',
        niche: 'Fitness',
        location: 'Mumbai, India',
        engagementRate: 6.4,
        followers: 98000,
        socials: [
          { platform: 'Instagram', url: 'https://instagram.com/maya.fit' },
          { platform: 'TikTok', url: 'https://tiktok.com/@maya.fit' }
        ]
      },
      {
        id: 'c4',
        name: 'Noah Chen',
        niche: 'Gaming',
        location: 'Toronto, Canada',
        engagementRate: 8.9,
        followers: 340000,
        socials: [
          { platform: 'YouTube', url: 'https://youtube.com/noahchen' },
          { platform: 'Twitch', url: 'https://twitch.tv/noahchen' }
        ]
      }
    ],
    []
  )

  function resetToLanding () {
    setView('LANDING')
    setUserType(null)
    setBrandRegStep(0)
    setBrandBasicInfo({ name: '', email: '' })
    setBrandCompany({ company: '', size: '1-10' })
    setBrandLocation({ city: '', country: '' })
    setBrandNiche([])
    setBrandPaid(false)
    setCreatorBasic({ name: '', email: '' })
    setCreatorLinks({ instagram: '', tiktok: '', youtube: '' })
    setCreatorPortfolio([])
    setCreatorReviewStatus('PENDING')
    setCreatorAvailability('AVAILABLE')
    setShowDevToggle(false)
    setFavorites([])
    setSelectedCreatorForStats(null)
    setSelectedCreatorForLinks(null)
    setRatingTarget(null)
    setRatingValue(0)
    setRatingNotes('')
    setRatings({})
    setNotifications([])
    setFilters({ location: '', niche: '', minEngagement: 0 })
  }

  function Header () {
    return (
      <div className='flex items-center justify-between p-4 border-b border-slate-200 bg-white sticky top-0 z-30'>
        <div className='flex items-center gap-2'>
          <Hand className='w-6 h-6 text-indigo-600' />
          <span className='font-semibold text-slate-800'>LinkUp</span>
        </div>
        <div className='flex items-center gap-2'>
          <Bell className='w-5 h-5 text-slate-600' />
          <button
            onClick={resetToLanding}
            className='px-3 py-1.5 text-sm rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700'
          >
            Home
          </button>
        </div>
      </div>
    )
  }

  function Landing () {
    return (
      <div className='min-h-screen bg-gradient-to-b from-slate-50 to-white'>
        <Header />
        <div className='max-w-4xl mx-auto px-4 py-12'>
          <div className='text-center mb-10'>
            <h1 className='text-3xl font-bold text-slate-900'>
              Connect Brands and Creators
            </h1>
            <p className='text-slate-600 mt-2'>
              Discover, collaborate, and grow with a streamlined marketplace.
            </p>
          </div>
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='rounded-xl border bg-white p-6 shadow-sm'>
              <div className='flex items-center gap-2'>
                <User className='w-5 h-5 text-blue-600' />
                <h2 className='text-xl font-semibold text-slate-900'>
                  I am a Brand
                </h2>
              </div>
              <p className='text-slate-600 mt-2'>
                Find creators by niche, location, and engagement. Manage
                connections and performance.
              </p>
              <button
                onClick={() => {
                  setUserType('BRAND')
                  setView('BRAND_REG')
                }}
                className='mt-4 w-full md:w-auto px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white'
              >
                Get Started
              </button>
            </div>
            <div className='rounded-xl border bg-white p-6 shadow-sm'>
              <div className='flex items-center gap-2'>
                <User className='w-5 h-5 text-indigo-600' />
                <h2 className='text-xl font-semibold text-slate-900'>
                  I am a Creator
                </h2>
              </div>
              <p className='text-slate-600 mt-2'>
                Showcase your work, get discovered, track analytics, and manage
                availability.
              </p>
              <button
                onClick={() => {
                  setUserType('CREATOR')
                  setView('CREATOR_REG')
                }}
                className='mt-4 w-full md:w-auto px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white'
              >
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function BrandRegistration () {
    const steps = ['Basic Info', 'Company Details', 'Location', 'Choose Niche']
    function next () {
      if (brandRegStep < steps.length - 1) setBrandRegStep(brandRegStep + 1)
      else setView('BRAND_SUBSCRIPTION')
    }
    function prev () {
      if (brandRegStep > 0) setBrandRegStep(brandRegStep - 1)
    }
    return (
      <div className='min-h-screen bg-slate-50'>
        <Header />
        <div className='max-w-3xl mx-auto px-4 py-8'>
          <div className='flex items-center gap-2 mb-6'>
            <Settings className='w-5 h-5 text-blue-600' />
            <h2 className='text-xl font-semibold text-slate-900'>
              Brand Registration
            </h2>
          </div>
          <div className='flex items-center gap-2 text-sm mb-4'>
            {steps.map((s, i) => (
              <div
                key={s}
                className={`px-3 py-1 rounded-full ${
                  i === brandRegStep
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {s}
              </div>
            ))}
          </div>
          <div className='rounded-lg border bg-white p-6 shadow-sm'>
            {brandRegStep === 0 && (
              <div className='grid gap-4'>
                <input
                  value={brandBasicInfo.name}
                  onChange={e =>
                    setBrandBasicInfo({
                      ...brandBasicInfo,
                      name: e.target.value
                    })
                  }
                  placeholder='Brand name'
                  className='w-full rounded-md border px-3 py-2'
                />
                <input
                  value={brandBasicInfo.email}
                  onChange={e =>
                    setBrandBasicInfo({
                      ...brandBasicInfo,
                      email: e.target.value
                    })
                  }
                  placeholder='Work email'
                  className='w-full rounded-md border px-3 py-2'
                />
              </div>
            )}
            {brandRegStep === 1 && (
              <div className='grid gap-4'>
                <input
                  value={brandCompany.company}
                  onChange={e =>
                    setBrandCompany({
                      ...brandCompany,
                      company: e.target.value
                    })
                  }
                  placeholder='Company name'
                  className='w-full rounded-md border px-3 py-2'
                />
                <select
                  value={brandCompany.size}
                  onChange={e =>
                    setBrandCompany({ ...brandCompany, size: e.target.value })
                  }
                  className='w-full rounded-md border px-3 py-2'
                >
                  <option>1-10</option>
                  <option>11-50</option>
                  <option>51-200</option>
                  <option>200+</option>
                </select>
              </div>
            )}
            {brandRegStep === 2 && (
              <div className='grid gap-4'>
                <div className='flex items-center gap-2'>
                  <MapPin className='w-4 h-4 text-slate-500' />
                  <input
                    value={brandLocation.city}
                    onChange={e =>
                      setBrandLocation({
                        ...brandLocation,
                        city: e.target.value
                      })
                    }
                    placeholder='City'
                    className='w-full rounded-md border px-3 py-2'
                  />
                </div>
                <input
                  value={brandLocation.country}
                  onChange={e =>
                    setBrandLocation({
                      ...brandLocation,
                      country: e.target.value
                    })
                  }
                  placeholder='Country'
                  className='w-full rounded-md border px-3 py-2'
                />
              </div>
            )}
            {brandRegStep === 3 && (
              <div className='grid gap-3'>
                {['Beauty', 'Tech', 'Fitness', 'Gaming', 'Travel', 'Food'].map(
                  n => (
                    <label key={n} className='flex items-center gap-2'>
                      <input
                        type='checkbox'
                        checked={brandNiche.includes(n)}
                        onChange={e => {
                          if (e.target.checked)
                            setBrandNiche([...brandNiche, n])
                          else setBrandNiche(brandNiche.filter(x => x !== n))
                        }}
                      />
                      <span>{n}</span>
                    </label>
                  )
                )}
              </div>
            )}
            <div className='flex justify-between mt-6'>
              <button
                onClick={prev}
                className='px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800'
              >
                Back
              </button>
              <button
                onClick={next}
                className='px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white'
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function SubscriptionWall () {
    return (
      <div className='min-h-screen bg-slate-50'>
        <Header />
        <div className='max-w-3xl mx-auto px-4 py-12'>
          <div className='rounded-lg border bg-white p-6 shadow-sm'>
            <h2 className='text-xl font-semibold text-slate-900'>
              Choose Your Plan
            </h2>
            <p className='text-slate-600 mt-2'>
              Pay to unlock full access or continue with limited features.
            </p>
            <div className='grid md:grid-cols-2 gap-4 mt-6'>
              <div className='border rounded-lg p-4'>
                <h3 className='font-semibold text-slate-900'>Pro Access</h3>
                <p className='text-slate-600 text-sm mt-1'>
                  Unlimited search, advanced filters, and priority support.
                </p>
                <button
                  onClick={() => {
                    setBrandPaid(true)
                    setView('BRAND_DASH')
                  }}
                  className='mt-4 w-full px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white'
                >
                  Pay Now
                </button>
              </div>
              <div className='border rounded-lg p-4'>
                <h3 className='font-semibold text-slate-900'>Free Access</h3>
                <p className='text-slate-600 text-sm mt-1'>
                  Limited search and contact options.
                </p>
                <button
                  onClick={() => {
                    setBrandPaid(false)
                    setView('BRAND_DASH')
                  }}
                  className='mt-4 w-full px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800'
                >
                  Continue Free
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function BrandDashboard () {
    const filtered = creators.filter(c => {
      const loc = filters.location
        ? c.location.toLowerCase().includes(filters.location.toLowerCase())
        : true
      const niche = filters.niche
        ? c.niche.toLowerCase().includes(filters.niche.toLowerCase())
        : true
      const eng = c.engagementRate >= filters.minEngagement
      return loc && niche && eng
    })
    function proposeDeal (c: Creator) {
      setNotifications(prev => [
        ...prev,
        {
          id: 'n' + Date.now(),
          type: 'interest',
          title: 'Brand Interest',
          body: `${
            brandBasicInfo.name || 'A Brand'
          } proposed a collaboration to ${c.name}.`,
          creatorId: c.id
        }
      ])
    }
    const limited = !brandPaid
    return (
      <div className='min-h-screen bg-slate-50'>
        <Header />
        <div className='max-w-6xl mx-auto px-4 py-8'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-2'>
              <Search className='w-5 h-5 text-blue-600' />
              <h2 className='text-xl font-semibold text-slate-900'>
                Discover Creators
              </h2>
              {limited && (
                <span className='ml-3 text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700'>
                  Limited Access
                </span>
              )}
            </div>
            <button
              onClick={() => setView('BRAND_SUBSCRIPTION')}
              className='text-sm text-blue-700'
            >
              Upgrade
            </button>
          </div>
          <div className='grid md:grid-cols-4 gap-3 rounded-lg border bg-white p-4 shadow-sm'>
            <input
              value={filters.location}
              onChange={e =>
                setFilters({ ...filters, location: e.target.value })
              }
              placeholder='Filter by location'
              className='rounded-md border px-3 py-2'
            />
            <input
              value={filters.niche}
              onChange={e => setFilters({ ...filters, niche: e.target.value })}
              placeholder='Filter by niche'
              className='rounded-md border px-3 py-2'
            />
            <input
              type='number'
              value={filters.minEngagement}
              onChange={e =>
                setFilters({
                  ...filters,
                  minEngagement: Number(e.target.value)
                })
              }
              placeholder='Min engagement %'
              className='rounded-md border px-3 py-2'
            />
            <button
              onClick={() =>
                setFilters({ location: '', niche: '', minEngagement: 0 })
              }
              className='px-3 py-2 rounded-md bg-slate-100 hover:bg-slate-200'
            >
              Reset
            </button>
          </div>
          <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6'>
            {filtered.map(c => (
              <div
                key={c.id}
                className='rounded-lg border bg-white p-5 shadow-sm'
              >
                <div className='flex items-center justify-between'>
                  <div>
                    <div className='font-semibold text-slate-900'>{c.name}</div>
                    <div className='text-sm text-slate-600'>
                      {c.niche} • {c.followers.toLocaleString()} followers
                    </div>
                    <div className='text-xs text-slate-500 flex items-center gap-1'>
                      <MapPin className='w-3 h-3' />
                      {c.location}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setFavorites(prev =>
                        prev.includes(c.id)
                          ? prev.filter(id => id !== c.id)
                          : [...prev, c.id]
                      )
                    }
                    className={`p-2 rounded-full ${
                      favorites.includes(c.id)
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    <Star className='w-4 h-4' />
                  </button>
                </div>
                <div className='mt-3 text-sm text-slate-700'>
                  Engagement: {c.engagementRate}%
                </div>
                <div className='mt-4 grid grid-cols-2 gap-2'>
                  <button
                    onClick={() => setSelectedCreatorForStats(c)}
                    className='px-3 py-2 rounded-md bg-blue-50 text-blue-700'
                  >
                    View Stats
                  </button>
                  <button
                    onClick={() => setSelectedCreatorForLinks(c)}
                    className='px-3 py-2 rounded-md bg-slate-100'
                  >
                    Social Links
                  </button>
                  <button
                    onClick={() => proposeDeal(c)}
                    className='px-3 py-2 rounded-md bg-blue-600 text-white flex items-center gap-1'
                  >
                    <UserPlus className='w-4 h-4' />
                    Propose Deal
                  </button>
                  <button
                    onClick={() => setRatingTarget(c)}
                    className='px-3 py-2 rounded-md bg-slate-100'
                  >
                    Mark Complete
                  </button>
                </div>
                <div className='mt-3 grid grid-cols-4 gap-2'>
                  <button className='px-2 py-1 text-xs rounded-md bg-slate-100'>
                    Direct Contact
                  </button>
                  <button className='px-2 py-1 text-xs rounded-md bg-slate-100'>
                    Instagram DM
                  </button>
                  <button className='px-2 py-1 text-xs rounded-md bg-slate-100'>
                    TikTok Message
                  </button>
                  <button className='px-2 py-1 text-xs rounded-md bg-slate-100'>
                    WhatsApp
                  </button>
                </div>
                {ratings[c.id] && (
                  <div className='mt-3 text-xs text-slate-600'>
                    Rated {ratings[c.id].value}/5
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {selectedCreatorForStats && (
          <div className='fixed inset-0 bg-black/40 flex items-center justify-center p-4'>
            <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-xl'>
              <div className='flex items-center gap-2 mb-4'>
                <BarChart3 className='w-5 h-5 text-blue-600' />
                <h3 className='font-semibold'>
                  {selectedCreatorForStats.name} Stats
                </h3>
              </div>
              <div className='grid grid-cols-5 gap-2 h-32 items-end'>
                {[20, 40, 60, 35, 55].map((v, i) => (
                  <div
                    key={i}
                    className='bg-blue-500 rounded'
                    style={{ height: v }}
                  />
                ))}
              </div>
              <div className='mt-4 text-sm text-slate-600'>
                Weekly reach trend.
              </div>
              <div className='mt-6 flex justify-end'>
                <button
                  onClick={() => setSelectedCreatorForStats(null)}
                  className='px-4 py-2 rounded-md bg-slate-100'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {selectedCreatorForLinks && (
          <div className='fixed inset-0 bg-black/40 flex items-center justify-center p-4'>
            <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-xl'>
              <h3 className='font-semibold mb-3'>
                {selectedCreatorForLinks.name} Social Links
              </h3>
              <div className='grid gap-2'>
                {selectedCreatorForLinks.socials.map(s => (
                  <a
                    key={s.url}
                    href={s.url}
                    className='text-blue-700 underline'
                    target='_blank'
                    rel='noreferrer'
                  >
                    {s.platform}
                  </a>
                ))}
              </div>
              <div className='mt-6 flex justify-end'>
                <button
                  onClick={() => setSelectedCreatorForLinks(null)}
                  className='px-4 py-2 rounded-md bg-slate-100'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {ratingTarget && (
          <div className='fixed inset-0 bg-black/40 flex items-center justify-center p-4'>
            <div className='w-full max-w-md rounded-lg bg-white p-6 shadow-xl'>
              <h3 className='font-semibold mb-3'>
                Rate {ratingTarget.name}'s Performance
              </h3>
              <div className='flex items-center gap-1 mb-3'>
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => setRatingValue(n)}
                    className={`p-2 rounded ${
                      ratingValue >= n ? 'text-yellow-500' : 'text-slate-300'
                    }`}
                  >
                    <Star className='w-5 h-5' />
                  </button>
                ))}
              </div>
              <textarea
                value={ratingNotes}
                onChange={e => setRatingNotes(e.target.value)}
                placeholder='Notes'
                className='w-full rounded-md border px-3 py-2'
              />
              <div className='mt-6 flex justify-end gap-2'>
                <button
                  onClick={() => {
                    setRatingTarget(null)
                    setRatingValue(0)
                    setRatingNotes('')
                  }}
                  className='px-4 py-2 rounded-md bg-slate-100'
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setRatings({
                      ...ratings,
                      [ratingTarget.id]: {
                        value: ratingValue,
                        notes: ratingNotes
                      }
                    })
                    setRatingTarget(null)
                    setRatingValue(0)
                    setRatingNotes('')
                  }}
                  className='px-4 py-2 rounded-md bg-blue-600 text-white'
                >
                  Save Rating
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  function CreatorRegistration () {
    const [step, setStep] = useState(0)
    function next () {
      if (step < 2) setStep(step + 1)
      else {
        setView('CREATOR_REVIEW')
        setCreatorReviewStatus('PENDING')
      }
    }
    function prev () {
      if (step > 0) setStep(step - 1)
    }
    return (
      <div className='min-h-screen bg-indigo-50'>
        <Header />
        <div className='max-w-3xl mx-auto px-4 py-8'>
          <div className='flex items-center gap-2 mb-6'>
            <Upload className='w-5 h-5 text-indigo-600' />
            <h2 className='text-xl font-semibold text-slate-900'>
              Creator Registration
            </h2>
          </div>
          <div className='rounded-lg border bg-white p-6 shadow-sm'>
            {step === 0 && (
              <div className='grid gap-4'>
                <input
                  value={creatorBasic.name}
                  onChange={e =>
                    setCreatorBasic({ ...creatorBasic, name: e.target.value })
                  }
                  placeholder='Your name'
                  className='w-full rounded-md border px-3 py-2'
                />
                <input
                  value={creatorBasic.email}
                  onChange={e =>
                    setCreatorBasic({ ...creatorBasic, email: e.target.value })
                  }
                  placeholder='Email'
                  className='w-full rounded-md border px-3 py-2'
                />
              </div>
            )}
            {step === 1 && (
              <div className='grid gap-4'>
                <input
                  value={creatorLinks.instagram}
                  onChange={e =>
                    setCreatorLinks({
                      ...creatorLinks,
                      instagram: e.target.value
                    })
                  }
                  placeholder='Instagram URL'
                  className='w-full rounded-md border px-3 py-2'
                />
                <input
                  value={creatorLinks.tiktok}
                  onChange={e =>
                    setCreatorLinks({ ...creatorLinks, tiktok: e.target.value })
                  }
                  placeholder='TikTok URL'
                  className='w-full rounded-md border px-3 py-2'
                />
                <input
                  value={creatorLinks.youtube}
                  onChange={e =>
                    setCreatorLinks({
                      ...creatorLinks,
                      youtube: e.target.value
                    })
                  }
                  placeholder='YouTube URL'
                  className='w-full rounded-md border px-3 py-2'
                />
              </div>
            )}
            {step === 2 && (
              <div>
                <div className='flex items-center justify-between'>
                  <div className='font-semibold'>Portfolio Upload</div>
                  <button
                    onClick={() =>
                      setCreatorPortfolio([
                        ...creatorPortfolio,
                        'Sample ' + (creatorPortfolio.length + 1)
                      ])
                    }
                    className='px-3 py-1.5 rounded-md bg-indigo-600 text-white'
                  >
                    Add Sample
                  </button>
                </div>
                <div className='grid gap-2 mt-3'>
                  {creatorPortfolio.length === 0 && (
                    <div className='text-sm text-slate-600'>
                      No samples yet.
                    </div>
                  )}
                  {creatorPortfolio.map((p, i) => (
                    <div key={i} className='rounded-md border px-3 py-2'>
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className='flex justify-between mt-6'>
              <button
                onClick={prev}
                className='px-4 py-2 rounded-md bg-slate-100'
              >
                Back
              </button>
              <button
                onClick={next}
                className='px-4 py-2 rounded-md bg-indigo-600 text-white'
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function CreatorReview () {
    return (
      <div className='min-h-screen bg-indigo-50'>
        <Header />
        <div className='max-w-xl mx-auto px-4 py-16'>
          <div className='rounded-lg border bg-white p-8 shadow-sm text-center'>
            <div className='mx-auto w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center'>
              <Bell className='w-6 h-6 text-indigo-600' />
            </div>
            <h2 className='text-xl font-semibold mt-4'>Pending Review</h2>
            <p className='text-slate-600 mt-2'>
              Your profile is under review. You will be notified once approved.
            </p>
            <div className='mt-8 opacity-0 hover:opacity-100 transition'>
              <button
                onClick={() => setShowDevToggle(!showDevToggle)}
                className='text-xs px-2 py-1 rounded bg-slate-100'
              >
                Dev Toggle
              </button>
            </div>
            {showDevToggle && (
              <div className='mt-4 flex items-center justify-center gap-2'>
                <button
                  onClick={() => {
                    setCreatorReviewStatus('APPROVED')
                    setView('CREATOR_DASH')
                  }}
                  className='px-3 py-1.5 rounded-md bg-green-600 text-white flex items-center gap-1'
                >
                  <CheckCircle className='w-4 h-4' />
                  Approve
                </button>
                <button
                  onClick={() => {
                    setCreatorReviewStatus('DECLINED')
                    setView('CREATOR_DECLINED')
                  }}
                  className='px-3 py-1.5 rounded-md bg-red-600 text-white flex items-center gap-1'
                >
                  <XCircle className='w-4 h-4' />
                  Decline
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  function CreatorDeclined () {
    return (
      <div className='min-h-screen bg-indigo-50'>
        <Header />
        <div className='max-w-xl mx-auto px-4 py-16'>
          <div className='rounded-lg border bg-white p-8 shadow-sm text-center'>
            <XCircle className='w-8 h-8 text-red-600 mx-auto' />
            <h2 className='text-xl font-semibold mt-4'>
              Registration Declined
            </h2>
            <p className='text-slate-600 mt-2'>
              Your submission did not meet the criteria. You may try again.
            </p>
            <button
              onClick={resetToLanding}
              className='mt-6 px-4 py-2 rounded-md bg-slate-100'
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  function CreatorDashboard () {
    const [editing, setEditing] = useState(false)
    const [profile, setProfile] = useState({
      name: creatorBasic.name,
      bio: '',
      links: creatorLinks
    })
    function acceptNotification (n: Notification) {
      setNotifications(prev => prev.filter(x => x.id !== n.id))
    }
    const chartValues = [12, 34, 18, 28, 40, 36]
    return (
      <div className='min-h-screen bg-indigo-50'>
        <Header />
        <div className='max-w-6xl mx-auto px-4 py-8'>
          <div className='grid md:grid-cols-3 gap-6'>
            <div className='md:col-span-2'>
              <div className='rounded-lg border bg-white p-6 shadow-sm'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <User className='w-5 h-5 text-indigo-600' />
                    <h3 className='font-semibold'>Profile</h3>
                  </div>
                  <button
                    onClick={() => setEditing(!editing)}
                    className='px-3 py-1.5 rounded-md bg-slate-100'
                  >
                    {editing ? 'Done' : 'Edit'}
                  </button>
                </div>
                <div className='mt-4 grid gap-3'>
                  <input
                    disabled={!editing}
                    value={profile.name}
                    onChange={e =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className='rounded-md border px-3 py-2'
                  />
                  <textarea
                    disabled={!editing}
                    value={profile.bio}
                    onChange={e =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    placeholder='Bio'
                    className='rounded-md border px-3 py-2'
                  />
                  <div className='grid gap-2'>
                    <input
                      disabled={!editing}
                      value={profile.links.instagram}
                      onChange={e =>
                        setProfile({
                          ...profile,
                          links: { ...profile.links, instagram: e.target.value }
                        })
                      }
                      placeholder='Instagram'
                      className='rounded-md border px-3 py-2'
                    />
                    <input
                      disabled={!editing}
                      value={profile.links.tiktok}
                      onChange={e =>
                        setProfile({
                          ...profile,
                          links: { ...profile.links, tiktok: e.target.value }
                        })
                      }
                      placeholder='TikTok'
                      className='rounded-md border px-3 py-2'
                    />
                    <input
                      disabled={!editing}
                      value={profile.links.youtube}
                      onChange={e =>
                        setProfile({
                          ...profile,
                          links: { ...profile.links, youtube: e.target.value }
                        })
                      }
                      placeholder='YouTube'
                      className='rounded-md border px-3 py-2'
                    />
                  </div>
                </div>
              </div>
              <div className='rounded-lg border bg-white p-6 shadow-sm mt-6'>
                <div className='flex items-center gap-2'>
                  <BarChart3 className='w-5 h-5 text-indigo-600' />
                  <h3 className='font-semibold'>Total Reach Analytics</h3>
                </div>
                <div className='mt-4 h-40 flex items-end gap-2'>
                  {chartValues.map((v, i) => (
                    <div
                      key={i}
                      className='flex-1 bg-indigo-500 rounded'
                      style={{ height: 8 + v }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className='md:col-span-1'>
              <div className='rounded-lg border bg-white p-6 shadow-sm'>
                <div className='flex items-center justify-between'>
                  <div className='font-semibold'>Availability</div>
                  <button
                    onClick={() =>
                      setCreatorAvailability(
                        creatorAvailability === 'AVAILABLE'
                          ? 'BUSY'
                          : 'AVAILABLE'
                      )
                    }
                    className={`px-3 py-1.5 rounded-md ${
                      creatorAvailability === 'AVAILABLE'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {creatorAvailability}
                  </button>
                </div>
              </div>
              <div className='rounded-lg border bg-white p-6 shadow-sm mt-6'>
                <div className='flex items-center gap-2'>
                  <Bell className='w-5 h-5 text-indigo-600' />
                  <h3 className='font-semibold'>Notifications</h3>
                </div>
                <div className='mt-3 grid gap-3'>
                  {notifications.length === 0 && (
                    <div className='text-sm text-slate-600'>
                      No notifications
                    </div>
                  )}
                  {notifications.map(n => (
                    <div key={n.id} className='rounded-md border p-3'>
                      <div className='font-medium'>{n.title}</div>
                      <div className='text-sm text-slate-600'>{n.body}</div>
                      {n.type === 'interest' && (
                        <div className='mt-2 flex items-center gap-2'>
                          <button
                            onClick={() => acceptNotification(n)}
                            className='px-3 py-1.5 rounded-md bg-indigo-600 text-white flex items-center gap-1'
                          >
                            <CheckCircle className='w-4 h-4' />
                            Accept Contact
                          </button>
                          <button
                            onClick={() => acceptNotification(n)}
                            className='px-3 py-1.5 rounded-md bg-slate-100 flex items-center gap-1'
                          >
                            <XCircle className='w-4 h-4' />
                            Dismiss
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className='rounded-lg border bg-white p-6 shadow-sm mt-6'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <Upload className='w-5 h-5 text-indigo-600' />
                    <h3 className='font-semibold'>Content Samples</h3>
                  </div>
                  <button
                    onClick={() =>
                      setCreatorPortfolio([
                        ...creatorPortfolio,
                        'New Sample ' + (creatorPortfolio.length + 1)
                      ])
                    }
                    className='px-3 py-1.5 rounded-md bg-indigo-600 text-white'
                  >
                    Upload
                  </button>
                </div>
                <div className='mt-3 grid gap-2'>
                  {creatorPortfolio.length === 0 && (
                    <div className='text-sm text-slate-600'>
                      No samples uploaded
                    </div>
                  )}
                  {creatorPortfolio.map((p, i) => (
                    <div
                      key={i}
                      className='rounded-md border px-3 py-2 text-sm'
                    >
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='font-sans'>
      {view === 'LANDING' && <Landing />}
      {view === 'BRAND_REG' && <BrandRegistration />}
      {view === 'BRAND_SUBSCRIPTION' && <SubscriptionWall />}
      {view === 'BRAND_DASH' && <BrandDashboard />}
      {view === 'CREATOR_REG' && <CreatorRegistration />}
      {view === 'CREATOR_REVIEW' && <CreatorReview />}
      {view === 'CREATOR_DECLINED' && <CreatorDeclined />}
      {view === 'CREATOR_DASH' && <CreatorDashboard />}
    </div>
  )
}
