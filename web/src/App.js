import React, { Component } from 'react';
import './App.css';

import regex from './regex';

const defaultText = `
Ein ganz neues Design aus Glas. Die beliebteste Kamera der Welt, jetzt noch besser. Der leistungsstärkste und intelligenteste Chip, den es je in einem Smartphone gab. Kabelloses Laden – ganz einfach. Und Augmented Reality, so beeindruckend wie noch nie. iPhone 8. Eine neue iPhone Generation.
`;

class App extends Component {
  state = {
    highlight: false,
    text: '',
    percent: 0.2,
  };
  indexes = [];
  setIndexes = (text, percent) => {
    const matches = text.match(regex);
    this.indexes = matches.map(() => Math.random() > percent);
  };
  getReplacedText = () => {
    let i = -1;
    const className = this.state.highlight ? 'highlight' : 'mask';
    return this.state.text.replace(regex, match => {
      ++i;
      return this.indexes[i]
        ? match
        : `<span class="${className}">${match}</span>`;
    });
  };
  toggle = () => {
    this.setState({
      highlight: !this.state.highlight,
    });
  };
  setPercent = value => {
    this.setIndexes(this.state.text, value);
    this.setState({
      percent: value,
    });
  };
  componentWillMount() {
    let text = window.localStorage.getItem('text');
    if (!text) {
      text = defaultText;
      window.localStorage.setItem('text', text);
    }
    this.setIndexes(text, this.state.percent);
    this.setState({ text });
  }
  render() {
    const replacedText = this.getReplacedText();
    return (
      <div className="container">
        <div>
          <button onClick={this.toggle}>Highlight</button>
        </div>
        <div dangerouslySetInnerHTML={{ __html: replacedText }} />
      </div>
    );
  }
}

export default App;
