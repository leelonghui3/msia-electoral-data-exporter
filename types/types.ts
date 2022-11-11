export type StatsType = {
  b: number
  a: number
  p: number
  m: number[]
  f: number[]
}

export type ConstituencyType = {
  id: string
  kno: string
  sid: string
  pid: string
  t: string
  pb: number
  stats?: StatsType
}

export type OutputType = {
  state: string
  category: 'parliament' | 'dun'
  parCode: string
  parliament: string
  dunCode?: string
  dun?: string
  totalVoter: number
  regularVoter: number
  earlyVoter: number
  overseasVoter: number
  male_18_20: number
  female_18_20: number
  male_21_29: number
  female_21_29: number
  male_30_39: number
  female_30_39: number
  male_40_49: number
  female_40_49: number
  male_50_59: number
  female_50_59: number
  male_60_69: number
  female_60_69: number
  male_70_79: number
  female_70_79: number
  male_80_89: number
  female_80_89: number
  'male_90+': number
  'female_90+': number
}
