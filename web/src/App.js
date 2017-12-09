import React, { Component } from 'react';
import { Affix, Button, Slider, Modal } from 'antd';
import showdown from 'showdown';

import './App.css';

import regex from './regex';

const defaultText = `
Ein ganz neues Design aus Glas. Die beliebteste Kamera der Welt, jetzt noch besser. Der leistungsstärkste und intelligenteste Chip, den es je in einem Smartphone gab. Kabelloses Laden – ganz einfach. Und Augmented Reality, so beeindruckend wie noch nie. iPhone 8. Eine neue iPhone Generation.
`;

const converter = new showdown.Converter();

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
  edit = () => {
    this.setState({ modal: !this.state.modal });
  };
  save = () => {
    const text = this.textarea.value;
    window.localStorage.setItem('text', text);
    this.setIndexes(text, this.state.percent);
    this.setState({
      modal: false,
      text,
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
    const replacedText = converter.makeHtml(this.getReplacedText());
    return (
      <div className="container">
        <Affix>
          <div>
            <Button type="primary" onClick={this.toggle}>
              Highlight
            </Button>
            <Button type="primary" onClick={this.edit}>
              Edit
            </Button>
            <Slider
              max={1}
              step={0.1}
              defaultValue={this.state.percent}
              onChange={this.setPercent}
            />
          </div>
        </Affix>
        <div
          onClick={this.toggle}
          dangerouslySetInnerHTML={{ __html: replacedText }}
        />
        <div>
          <Modal
            title="Text"
            visible={this.state.modal}
            onOk={this.save}
            onCancel={this.edit}
          >
            <textarea
              style={textareaStyle}
              ref={textarea => {
                this.textarea = textarea;
              }}
              defaultValue={this.state.text}
            />
          </Modal>
        </div>
      </div>
    );
  }
}

export default App;

const textareaStyle = {
  width: '100%',
  height: '300px',
  fontSize: '16px',
};
