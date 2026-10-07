import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { google } from 'googleapis'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_DIR = join(__dirname, '..', 'public', 'data')

const SPREADSHEET_ID = process.env.SPREADSHEET_ID?.trim()
const SA_JSON = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
const SA_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS

const TABS = {
  experienceWork: 'Experience_Work',
  experienceSkills: 'Experience_Skills',
  homeBio: 'Home_Bio',
  homeGif: 'Home_Gif',
  verticalPics: 'Vertical_pics',
  horizontalPics: 'Horizontal_Pics',
  allPics: 'All_Pics',
  zine: 'Zine',
  aboutBackground: 'About_Me_Background',
  aboutBio: 'About_Me_Bio',
  aboutHeadshot: 'About_Me_Headshot',
  aboutHover: 'About_Me_Hover',
}

function headerToKey(h) {
  if (h == null || String(h).trim() === '') return null
  return String(h)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
}

function rowsToRecords(rows) {
  if (!rows?.length) return []
  const rawHeaders = rows[0].map((c) => headerToKey(c))
  const headers = []
  const used = new Set()
  for (let i = 0; i < rawHeaders.length; i++) {
    let key = rawHeaders[i]
    if (!key) {
      key = `column_${i + 1}`
      while (used.has(key)) key = `column_${i + 1}_${used.size}`
    }
    while (used.has(key)) key = `${key}_2`
    used.add(key)
    headers.push(key)
  }

  const out = []
  for (let r = 1; r < rows.length; r++) {
    const line = rows[r] || []
    if (!line.some((c) => c != null && String(c).trim() !== '')) continue
    const obj = {}
    for (let c = 0; c < headers.length; c++) {
      const v = line[c]
      obj[headers[c]] = v == null ? '' : String(v)
    }
    out.push(obj)
  }
  return out
}

async function getAuth() {
  if (SA_JSON) {
    const credentials = JSON.parse(SA_JSON)
    return new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })
  }
  if (SA_PATH) {
    return new google.auth.GoogleAuth({
      keyFile: SA_PATH,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })
  }
  throw new Error(
    'Set GOOGLE_SERVICE_ACCOUNT_JSON (JSON string) or GOOGLE_APPLICATION_CREDENTIALS (path to key file).',
  )
}

async function writeJson(name, value) {
  await writeFile(join(OUT_DIR, name), `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

async function main() {
  if (!SPREADSHEET_ID) {
    throw new Error('Set SPREADSHEET_ID to your Google Sheet document ID.')
  }
  const auth = await getAuth()
  const sheets = google.sheets({ version: 'v4', auth })

  const rangeKeys = [
    'experienceWork',
    'experienceSkills',
    'homeBio',
    'homeGif',
    'verticalPics',
    'horizontalPics',
    'allPics',
    'zine',
    'aboutBackground',
    'aboutBio',
    'aboutHeadshot',
    'aboutHover',
  ]
  const ranges = rangeKeys.map((key) => `${TABS[key]}!A:ZZ`)

  const { data } = await sheets.spreadsheets.values.batchGet({
    spreadsheetId: SPREADSHEET_ID,
    ranges,
  })

  const vr = data.valueRanges || []
  const records = Object.fromEntries(
    rangeKeys.map((key, i) => [key, rowsToRecords(vr[i]?.values || [])]),
  )

  const experience = {
    work: records.experienceWork,
    skills: records.experienceSkills,
  }
  const home = {
    bio: records.homeBio,
    gif: records.homeGif,
  }
  const photography = {
    vertical: records.verticalPics,
    horizontal: records.horizontalPics,
    all: records.allPics,
  }
  const about = {
    background: records.aboutBackground,
    bio: records.aboutBio,
    headshot: records.aboutHeadshot,
    hover: records.aboutHover,
  }
  const zine = records.zine

  await mkdir(OUT_DIR, { recursive: true })
  await writeJson('experience.json', experience)
  await writeJson('home.json', home)
  await writeJson('photography.json', photography)
  await writeJson('zine.json', zine)
  await writeJson('about.json', about)

  console.log(
    `Wrote public/data: experience (${experience.work.length} work, ${experience.skills.length} skills), home (${home.bio.length} bio, ${home.gif.length} gif), photography (${photography.vertical.length} vertical, ${photography.horizontal.length} horizontal, ${photography.all.length} all), zine (${zine.length}), about (${about.background.length} background, ${about.bio.length} bio, ${about.headshot.length} headshot, ${about.hover.length} hover).`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
