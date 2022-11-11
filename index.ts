import _ from 'lodash'
import fs from 'fs'
import axios from 'axios'
import { Parser } from 'json2csv'
import { parlimenJSON, dunJSON } from './data/example'
import { OutputType } from './types/types'
import { convertState } from './utils/convertState'

const titleCase = (str: string) => {
  const characters = str
    .toLowerCase()
    .split(' ')
    .map((word: string) => word.replace(word[0], word[0].toUpperCase()))

  return characters.join(' ')
}

const exportParVoters = () => {
  const output: OutputType[] = []

  parlimenJSON.forEach(par => {
    const dunInParliament = dunJSON.filter(dun => dun.pid === par.pid)

    const totalVoter = dunInParliament.reduce(
      (total, current) => total + current.pb,
      0
    )
    const regularVoter = dunInParliament.reduce(
      (total, current) => total + current.stats?.b!,
      0
    )
    const earlyVoter = dunInParliament.reduce(
      (total, current) => total + current.stats?.a!,
      0
    )
    const overseasVoter = dunInParliament.reduce(
      (total, current) => total + current.stats?.p!,
      0
    )

    const female_18_20 = dunInParliament.reduce(
      (total, current) => total + current.stats?.f[0]!,
      0
    )
    const female_21_29 = dunInParliament.reduce(
      (total, current) => total + current.stats?.f[1]!,
      0
    )
    const female_30_39 = dunInParliament.reduce(
      (total, current) => total + current.stats?.f[2]!,
      0
    )
    const female_40_49 = dunInParliament.reduce(
      (total, current) => total + current.stats?.f[3]!,
      0
    )
    const female_50_59 = dunInParliament.reduce(
      (total, current) => total + current.stats?.f[4]!,
      0
    )
    const female_60_69 = dunInParliament.reduce(
      (total, current) => total + current.stats?.f[5]!,
      0
    )
    const female_70_79 = dunInParliament.reduce(
      (total, current) => total + current.stats?.f[6]!,
      0
    )
    const female_80_89 = dunInParliament.reduce(
      (total, current) => total + current.stats?.f[7]!,
      0
    )
    const female_90 = dunInParliament.reduce(
      (total, current) => total + current.stats?.f[8]!,
      0
    )

    const male_18_20 = dunInParliament.reduce(
      (total, current) => total + current.stats?.m[0]!,
      0
    )
    const male_21_29 = dunInParliament.reduce(
      (total, current) => total + current.stats?.f[1]!,
      0
    )
    const male_30_39 = dunInParliament.reduce(
      (total, current) => total + current.stats?.f[2]!,
      0
    )
    const male_40_49 = dunInParliament.reduce(
      (total, current) => total + current.stats?.f[3]!,
      0
    )
    const male_50_59 = dunInParliament.reduce(
      (total, current) => total + current.stats?.f[4]!,
      0
    )
    const male_60_69 = dunInParliament.reduce(
      (total, current) => total + current.stats?.f[5]!,
      0
    )
    const male_70_79 = dunInParliament.reduce(
      (total, current) => total + current.stats?.f[6]!,
      0
    )
    const male_80_89 = dunInParliament.reduce(
      (total, current) => total + current.stats?.f[7]!,
      0
    )
    const male_90 = dunInParliament.reduce(
      (total, current) => total + current.stats?.f[8]!,
      0
    )

    output.push({
      state: convertState(par.sid),
      parCode: par.kno.replace('.', ''),
      parliament: titleCase(par.t),
      category: 'parliament',
      totalVoter,
      regularVoter,
      earlyVoter,
      overseasVoter,
      female_18_20,
      female_21_29,
      female_30_39,
      female_40_49,
      female_50_59,
      female_60_69,
      female_70_79,
      female_80_89,
      'female_90+': female_90,
      male_18_20,
      male_21_29,
      male_30_39,
      male_40_49,
      male_50_59,
      male_60_69,
      male_70_79,
      male_80_89,
      'male_90+': male_90
    })
  })

  const fields = Object.keys(output[0])

  try {
    const parser = new Parser({ fields })
    const csv = parser.parse(output)
    const folder = './output'

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder)
    }

    fs.writeFile(`${folder}/ge15-parliament-voters.csv`, csv, err => {
      if (err) throw err
    })
  } catch (error) {
    console.log(error)
  }
}

const exportDunVoters = () => {
  const output: any = []

  const filteredDun = dunJSON.filter(d => +d.sid < 14)

  const filteredParlimen = parlimenJSON.filter(p => +p.sid < 14)

  filteredParlimen.forEach(par => {
    const dunInParliament = filteredDun.filter(dun => dun.pid === par.pid)

    dunInParliament.forEach(d => {
      const dun: OutputType = {
        category: 'dun',
        state: convertState(d.sid),
        parCode: par.kno.replace('.', ''),
        parliament: titleCase(par.t),
        dunCode: d.kno.replace('.', ''),
        dun: titleCase(d.t),
        totalVoter: d.pb,
        regularVoter: d.stats?.b!,
        earlyVoter: d.stats?.a!,
        overseasVoter: d.stats?.p!,
        female_18_20: d.stats?.f[0]!,
        female_21_29: d.stats?.f[1]!,
        female_30_39: d.stats?.f[2]!,
        female_40_49: d.stats?.f[3]!,
        female_50_59: d.stats?.f[4]!,
        female_60_69: d.stats?.f[5]!,
        female_70_79: d.stats?.f[6]!,
        female_80_89: d.stats?.f[7]!,
        'female_90+': d.stats?.f[8]!,
        male_18_20: d.stats?.m[0]!,
        male_21_29: d.stats?.m[1]!,
        male_30_39: d.stats?.m[2]!,
        male_40_49: d.stats?.m[3]!,
        male_50_59: d.stats?.m[4]!,
        male_60_69: d.stats?.m[5]!,
        male_70_79: d.stats?.m[6]!,
        male_80_89: d.stats?.m[7]!,
        'male_90+': d.stats?.m[8]!
      }

      output.push(dun)
    })
  })

  const fields = Object.keys(output[0])

  try {
    const parser = new Parser({ fields })
    const csv = parser.parse(output)
    const folder = './output'

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder)
    }

    fs.writeFile('./output/ge15-dun-voters.csv', csv, err => {
      if (err) throw err
    })
  } catch (error) {
    console.log(error)
  }
}

exportParVoters()
exportDunVoters()
