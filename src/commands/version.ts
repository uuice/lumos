
import packageJson from '../../package.json'
export const versionCommand = () => {
  console.log(`Lumos CLI v${packageJson.version}`)
}
