import React from 'react';
import { WebView, View, Button } from 'react-native';
import showdown from 'showdown';

import regex from './regex';

function template(body, background = 'black') {
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
      .word {
        background: ${background};
      }
    </style>
  </head>
  
  <body>
    ${body}
  </body>
  
  </html>
  `;
}

function replace(text = '', percent = 0.5) {
  return text.replace(regex, match => {
    return Math.random() > percent
      ? match
      : `<span class="word">${match}</span>`;
  });
}

const text = `
Ein ganz **neues** Design aus Glas. Die beliebteste Kamera der Welt, jetzt noch besser. Der leistungs­stärkste und intelligenteste Chip, den es je in einem Smartphone gab. Kabelloses Laden – ganz einfach. Und Augmented Reality, so beeindruckend wie noch nie. iPhone 8. Eine neue iPhone Generation.
`;

const converter = new showdown.Converter();

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {
      highlight: false,
      text: converter.makeHtml(replace(text, 0.2)),
    };
  }
  toggle() {
    this.setState({
      highlight: !this.state.highlight,
    });
  }
  render() {
    const html = template(
      this.state.text,
      this.state.highlight ? 'yellow' : 'black'
    );
    // TODO: Flip
    return (
      <View style={{ flex: 1 }}>
        <WebView source={{ html }} />
        <Button title={'Highlight'} onPress={this.toggle} />
      </View>
    );
  }
}
