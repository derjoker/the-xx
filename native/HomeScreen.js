import React from 'react';
import { WebView } from 'react-native';
import showdown from 'showdown';

function template(body) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <style type="text/css">
      body {
        color: black;
      }
      .mask {
        background: black;
      }
      .highlight {
        background: yellow;
      }
    </style>
  </head>
  
  <body>
    ${body}
  </body>
  
  </html>
  `;
}

const text = `
Ein ganz **neues** Design aus Glas. Die beliebteste Kamera der Welt, jetzt noch besser. Der leistungs­stärkste und intelligenteste Chip, den es je in einem Smartphone gab. Kabelloses Laden – ganz einfach. Und Augmented Reality, so beeindruckend wie noch nie. iPhone 8. Eine neue iPhone Generation.
`;

const converter = new showdown.Converter();

export default class HomeScreen extends React.Component {
  render() {
    return <WebView source={{ html: template(converter.makeHtml(text)) }} />;
  }
}
