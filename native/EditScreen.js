import React from 'react';
import { View, Text, TextInput, Button, AsyncStorage } from 'react-native';

export default class EditScreen extends React.Component {
  constructor() {
    super();
    this.save = this.save.bind(this);
    this.state = {
      text: 'text',
    };
  }
  save() {
    AsyncStorage.setItem('text', this.state.text);
  }
  componentWillMount() {
    AsyncStorage.getItem('text').then(text => {
      this.setState({ text });
    });
  }
  render() {
    return (
      <View>
        <TextInput
          multiline
          style={{
            height: 500,
            borderColor: 'black',
          }}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <Button title="Save" onPress={this.save} />
      </View>
    );
  }
}
