export const statesInNIgeriaOptions = [
  { name: 'Abia', value: 'abia' },
  { name: 'Adamawa', value: 'adamawa' },
  { name: 'Akwa Ibom', value: 'akwa-ibom' },
  { name: 'Anambra', value: 'anambra' },
  { name: 'Bauchi', value: 'bauchi' },
  { name: 'Bayelsa', value: 'bayelsa' },
  { name: 'Benue', value: 'benue' },
  { name: 'Borno', value: 'borno' },
  { name: 'Cross River', value: 'cross-river' },
  { name: 'Delta', value: 'delta' },
  { name: 'Ebonyi', value: 'ebonyi' },
  { name: 'Edo', value: 'edo' },
  { name: 'Ekiti', value: 'ekiti' },
  { name: 'Enugu', value: 'enugu' },
  { name: 'Gombe', value: 'gombe' },
  { name: 'Imo', value: 'imo' },
  { name: 'Jigawa', value: 'jigawa' },
  { name: 'Kaduna', value: 'kaduna' },
  { name: 'Kano', value: 'kano' },
  { name: 'Katsina', value: 'katsina' },
  { name: 'Kebbi', value: 'kebbi' },
  { name: 'Kogi', value: 'kogi' },
  { name: 'Kwara', value: 'kwara' },
  { name: 'Lagos', value: 'lagos' },
  { name: 'Nasarawa', value: 'nasarawa' },
  { name: 'Niger', value: 'niger' },
  { name: 'Ogun', value: 'ogun' },
  { name: 'Ondo', value: 'ondo' },
  { name: 'Osun', value: 'osun' },
  { name: 'Oyo', value: 'oyo' },
  { name: 'Plateau', value: 'plateau' },
  { name: 'Rivers', value: 'rivers' },
  { name: 'Sokoto', value: 'sokoto' },
  { name: 'Taraba', value: 'taraba' },
  { name: 'Yobe', value: 'yobe' },
  { name: 'Zamfara', value: 'zamfara' },
  { name: 'Federal Capital Territory (FCT)', value: 'fct' }
]

export const citiesInNigeriaByState: Record<
  string,
  { name: string; value: string }[]
> = {
  abia: [
    { name: 'Aba', value: 'aba' },
    { name: 'Umuahia', value: 'umuahia' },
    { name: 'Ohafia', value: 'ohafia' }
  ],
  adamawa: [
    { name: 'Yola', value: 'yola' },
    { name: 'Mubi', value: 'mubi' },
    { name: 'Jimeta', value: 'jimeta' }
  ],
  'akwa-ibom': [
    { name: 'Uyo', value: 'uyo' },
    { name: 'Ikot Ekpene', value: 'ikot-ekpene' },
    { name: 'Eket', value: 'eket' }
  ],
  anambra: [
    { name: 'Awka', value: 'awka' },
    { name: 'Onitsha', value: 'onitsha' },
    { name: 'Nnewi', value: 'nnewi' }
  ],
  bauchi: [
    { name: 'Bauchi', value: 'bauchi' },
    { name: 'Azare', value: 'azare' },
    { name: 'Darazo', value: 'darazo' }
  ],
  bayelsa: [
    { name: 'Yenagoa', value: 'yenagoa' },
    { name: 'Ogbia', value: 'ogbia' },
    { name: 'Sagbama', value: 'sagbama' }
  ],
  benue: [
    { name: 'Makurdi', value: 'makurdi' },
    { name: 'Gboko', value: 'gboko' },
    { name: 'Otukpo', value: 'otukpo' }
  ],
  borno: [
    { name: 'Maiduguri', value: 'maiduguri' },
    { name: 'Biu', value: 'biu' },
    { name: 'Ngala', value: 'ngala' }
  ],
  'cross-river': [
    { name: 'Calabar', value: 'calabar' },
    { name: 'Ikom', value: 'ikom' },
    { name: 'Ogoja', value: 'ogoja' }
  ],
  delta: [
    { name: 'Asaba', value: 'asaba' },
    { name: 'Warri', value: 'warri' },
    { name: 'Ughelli', value: 'ughelli' }
  ],
  ebonyi: [
    { name: 'Abakaliki', value: 'abakaliki' },
    { name: 'Afikpo', value: 'afikpo' },
    { name: 'Onueke', value: 'onueke' }
  ],
  edo: [
    { name: 'Benin City', value: 'benin-city' },
    { name: 'Ekpoma', value: 'ekpoma' },
    { name: 'Auchi', value: 'auchi' }
  ],
  ekiti: [
    { name: 'Ado Ekiti', value: 'ado-ekiti' },
    { name: 'Ikere', value: 'ikere' },
    { name: 'Ijero', value: 'ijero' }
  ],
  enugu: [
    { name: 'Enugu', value: 'enugu' },
    { name: 'Nsukka', value: 'nsukka' },
    { name: 'Oji River', value: 'oji-river' }
  ],
  gombe: [
    { name: 'Gombe', value: 'gombe' },
    { name: 'Kaltungo', value: 'kaltungo' },
    { name: 'Billiri', value: 'billiri' }
  ],
  imo: [
    { name: 'Owerri', value: 'owerri' },
    { name: 'Orlu', value: 'orlu' },
    { name: 'Okigwe', value: 'okigwe' }
  ],
  jigawa: [
    { name: 'Dutse', value: 'dutse' },
    { name: 'Hadejia', value: 'hadejia' },
    { name: 'Gumel', value: 'gumel' }
  ],
  kaduna: [
    { name: 'Kaduna', value: 'kaduna' },
    { name: 'Zaria', value: 'zaria' },
    { name: 'Kafanchan', value: 'kafanchan' }
  ],
  kano: [
    { name: 'Kano', value: 'kano' },
    { name: 'Wudil', value: 'wudil' },
    { name: 'Bichi', value: 'bichi' }
  ],
  katsina: [
    { name: 'Katsina', value: 'katsina' },
    { name: 'Daura', value: 'daura' },
    { name: 'Funtua', value: 'funtua' }
  ],
  kebbi: [
    { name: 'Birnin Kebbi', value: 'birnin-kebbi' },
    { name: 'Argungu', value: 'argungu' },
    { name: 'Zuru', value: 'zuru' }
  ],
  kogi: [
    { name: 'Lokoja', value: 'lokoja' },
    { name: 'Okene', value: 'okene' },
    { name: 'Ankpa', value: 'ankpa' }
  ],
  kwara: [
    { name: 'Ilorin', value: 'ilorin' },
    { name: 'Offa', value: 'offa' },
    { name: 'Jebba', value: 'jebba' }
  ],
  lagos: [
    { name: 'Ikeja', value: 'ikeja' },
    { name: 'Lagos Island', value: 'lagos-island' },
    { name: 'Badagry', value: 'badagry' },
    { name: 'Ikorodu', value: 'ikorodu' }
  ],
  nasarawa: [
    { name: 'Lafia', value: 'lafia' },
    { name: 'Keffi', value: 'keffi' },
    { name: 'Akwanga', value: 'akwanga' }
  ],
  niger: [
    { name: 'Minna', value: 'minna' },
    { name: 'Bida', value: 'bida' },
    { name: 'Suleja', value: 'suleja' }
  ],
  ogun: [
    { name: 'Abeokuta', value: 'abeokuta' },
    { name: 'Ijebu Ode', value: 'ijebu-ode' },
    { name: 'Sagamu', value: 'sagamu' }
  ],
  ondo: [
    { name: 'Akure', value: 'akure' },
    { name: 'Owo', value: 'owo' },
    { name: 'Ondo', value: 'ondo-city' }
  ],
  osun: [
    { name: 'Osogbo', value: 'osogbo' },
    { name: 'Ile-Ife', value: 'ile-ife' },
    { name: 'Ilesa', value: 'ilesa' }
  ],
  oyo: [
    { name: 'Ibadan', value: 'ibadan' },
    { name: 'Ogbomosho', value: 'ogbomosho' },
    { name: 'Iseyin', value: 'iseyin' }
  ],
  plateau: [
    { name: 'Jos', value: 'jos' },
    { name: 'Pankshin', value: 'pankshin' },
    { name: 'Barkin Ladi', value: 'barkin-ladi' }
  ],
  rivers: [
    { name: 'Port Harcourt', value: 'port-harcourt' },
    { name: 'Bonny', value: 'bonny' },
    { name: 'Omoku', value: 'omoku' }
  ],
  sokoto: [
    { name: 'Sokoto', value: 'sokoto-city' },
    { name: 'Tambuwal', value: 'tambuwal' },
    { name: 'Wamakko', value: 'wamakko' }
  ],
  taraba: [
    { name: 'Jalingo', value: 'jalingo' },
    { name: 'Wukari', value: 'wukari' },
    { name: 'Serti', value: 'serti' }
  ],
  yobe: [
    { name: 'Damaturu', value: 'damaturu' },
    { name: 'Potiskum', value: 'potiskum' },
    { name: 'Gashua', value: 'gashua' }
  ],
  zamfara: [
    { name: 'Gusau', value: 'gusau' },
    { name: 'Kaura Namoda', value: 'kaura-namoda' },
    { name: 'Anka', value: 'anka' }
  ],
  fct: [
    { name: 'Abuja', value: 'abuja' },
    { name: 'Gwagwalada', value: 'gwagwalada' },
    { name: 'Kuje', value: 'kuje' }
  ]
}

export const categories = [
  'Tech',
  'Cooking',
  'Family',
  'Day in a life',
  'Fashion & Beauty',
  'UGC',
  'Health & Wellness',
  'Travel',
  'Women’s Health',
  'Faith & Motivation',
  'Art & Creativity',
  'Business & Finance',
  'Travel & Culture',
  'Others'
]

export const categoriesOptions: Record<string, { name: string; value: string; tag: string }> = {
  ["Tech"]: {
    name: 'Tech',
    value: 'tech',
    tag: 'TH'
  },
  ["Cooking"]: {
    name: 'Cooking',
    value: 'cooking',
    tag: 'CK'
  },
  ["Family"]: {
    name: 'Family',
    value: 'family',
    tag: 'FA'
  },
  ["Day in a life"]: {
    name: 'Day in a life',
    value: 'day-in-a-life',
    tag: 'DL'
  },
  ["Fashion & Beauty"]: {
    name: 'Fashion & Beauty',
    value: 'fashion-beauty',
    tag: 'FB'
  },
  ["UGC"]: {
    name: 'UGC',
    value: 'ugc',
    tag: 'UG'
  },
  ["Health & Wellness"]: {
    name: 'Health & Wellness',
    value: 'health-wellness',
    tag: 'HW'
  },
  ["Travel"]: {
    name: 'Travel',
    value: 'travel',
    tag: 'TR'
  },
  ["Women’s Health"]: {
    name: 'Women’s Health',
    value: 'womens-health',
    tag: 'WH'
  },
  ["Faith & Motivation"]: {
    name: 'Faith & Motivation',
    value: 'faith-motivation',
    tag: 'FM'
  },
  ["Art & Creativity"]: {
    name: 'Art & Creativity',
    value: 'art-creativity',
    tag: 'AC'
  },
  ["Business & Finance"]: {
    name: 'Business & Finance',
    value: 'business-finance',
    tag: 'BF'
  },
  ["Travel & Culture"]: {
    name: 'Travel & Culture',
    value: 'travel-culture',
    tag: 'TC'
  },
  ["Others"]: {
    name: 'Others',
    value: 'others',
    tag: 'OT'
  }
}
