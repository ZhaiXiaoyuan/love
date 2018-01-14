
/*自定义sprite模板，为了加快less编译速度*/
var templater = require('spritesheet-templates');

templater.addTemplate('custom_format', data => {
    var stamp = new Date().getTime();
  var spritesheetImageUrl = data.sprites[0].image;
  var sharedSelector = data.sprites
      .map(sprite => '.' + sprite.name)
      .join(', ');

  var shared = dli(`
        ${sharedSelector} {
            background-image: url(${spritesheetImageUrl});
        }
    `);

  var perImage = data.sprites
      .map(sprite => dli(`
            .${sprite.name} {
                width: ${sprite.width}px;
                height: ${sprite.height}px;
                background-position: ${sprite.offset_x}px ${sprite.offset_y}px;
            }
        `))
      .join('');

  return shared + '\n' + perImage;
});

templater.addTemplate('custom_format_retina', data => {
    var stamp = new Date().getTime();
  var spritesheetImageUrl = data.sprites[0].image;

  var sharedSelector = data.sprites
      .map(sprite => '.' + sprite.name)
      .join(', ');

  var shared = dli(`
        ${sharedSelector}: {
            background-image: url(${spritesheetImageUrl});
        }
    `);

  var perImage = data.sprites
      .map(sprite => dli(`
            .${sprite.name} {
                background-position: ${sprite.offset_x}px ${sprite.offset_y}px;
            }
        `))
      .join('');

  return shared + '\n' +
      dli(`
            @media (-webkit-min-device-pixel-ratio: 2),
                   (min-resolution: 192dpi) {
                ${sharedSelector} {
                    background-image: url(${data.retina_spritesheet.image});
                    background-size: ${data.spritesheet.width}px ${data.spritesheet.height}px;
                }
            }
        `) + '\n' + perImage;
});

function dli(s) {//drop last indentation
  const lines = s.split('\n').filter(s => s.trim().length);
  const lastIndentLength = /^\s*/.exec(lines[lines.length - 1])[0].length;
  return s
      .split('\n')
      .map(line => line.slice(lastIndentLength))
      .join('\n');
}