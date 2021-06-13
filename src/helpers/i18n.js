import fs from 'fs'
import path from 'path'
import JSON5 from 'json5'

const postsDirectory = path.join(process.cwd(), 'src', 'translations')
const filenames = fs.readdirSync(postsDirectory)

export function getTranslation() {
  const base = JSON5.parse(fs.readFileSync(path.join(postsDirectory, 'strings.json'), 'utf8'))
  const i18n = filenames.reduce((accu, filename) => {
    const filePath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    accu = {...accu, ...JSON5.parse(fileContents)}
    return accu;
  }, base)
  return i18n
}