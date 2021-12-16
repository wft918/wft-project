
var Fs = require('fs')
var Path = require('path')

var modulePath = Path.join(__dirname, 'node_modules/@easydarwin/easyplayer/dist')
var distPath = Path.join(__dirname, 'easyPlayer/dist')

Fs.rmdirSync(modulePath, {
  recursive: true,
  force: true
})

var dirs = [{
  absolutePath: distPath,
  realtivePath: ''
}]

for (let dir of dirs) {
  console.log(dir,'dir--->>>')
  Fs.mkdirSync(Path.join(modulePath, dir.realtivePath))
  var names = Fs.readdirSync(dir.absolutePath)
  for (let name of names) {
    var stats = Fs.statSync(Path.join(dir.absolutePath, name))
    if (stats.isDirectory()) {
      dirs.push({
        absolutePath: Path.join(dir.absolutePath, name),
        realtivePath: Path.join(dir.realtivePath, name)
      })
    } else if (stats.isFile()) {
      Fs.writeFileSync(Path.join(modulePath, dir.realtivePath, name),
        Fs.readFileSync(Path.join(dir.absolutePath, name)))
    }
  }
}
