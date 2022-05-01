import axios from 'axios'
import fs from 'fs/promises'
import path from 'path'
import mkdirp from 'mkdirp'

const writeFile = async (pathToFile, fileName, content) => {
    await mkdirp(pathToFile)
    await fs.writeFile(path.join(pathToFile, fileName), content)
}

export default async function pageLoaderCore(urlString, dir = './') {
    const url = new URL(urlString)
    const fileName = urlString
        .slice(`${url.protocol}//`.length)
        .replace(/[^0-9A-Za-z]+/g, '-')
        .concat('.html')

    const result = await axios.get(urlString).then((res) => res.data)
    await writeFile(dir, fileName, result)
    console.log(
        `page was successfully downloaded to ${path.join(dir, fileName)}`
    )
}
