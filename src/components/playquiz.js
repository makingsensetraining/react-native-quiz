import React, { Component } from 'react';
import {
  StatusBar,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Quiz from './quiz';
import { playQuizStyles } from '../styles/general';

export default class Playquiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quizFinish : false,
      score: 0
    }
  }
  _onPressBack() {
    this.setState({
      quizFinish : false,
      score: 0
    });
  }

  _quizFinish(score) {
    this.setState({ quizFinish: true, score : score });
  }

  _scoreMessage(score) {
    if(score <= 30) {
      return (
        <View style={playQuizStyles.innerContainer} >
          <View style={{ flexDirection: "row"}} >
            <Icon name="trophy" size={30} color="white" />
          </View>
          <Text style={playQuizStyles.score}>You need to work hard</Text>
          <Text style={playQuizStyles.score}>You scored {score}%</Text>
        </View>)
    } else if(score > 30 && score < 60) {
      return (
        <View style={playQuizStyles.innerContainer} >
          <View style={{ flexDirection: "row"}} >
            <Icon name="trophy" size={30} color="white" />
            <Icon name="trophy" size={30} color="white" />
          </View>
          <Text style={playQuizStyles.score}>You are good</Text>
          <Text style={playQuizStyles.score}>Congrats you scored {score}% </Text>
        </View>)
    } else if(score >= 60) {
      return (
        <View style={playQuizStyles.innerContainer}>
          <View style={{ flexDirection: "row"}} >
            <Icon name="trophy" size={30} color="white" />
            <Icon name="trophy" size={30} color="white" />
            <Icon name="trophy" size={30} color="white" />
          </View>
          <Text style={playQuizStyles.score}>You are the master</Text>
          <Text style={playQuizStyles.score}>Congrats you scored {score}% </Text>
        </View>)
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <StatusBar barStyle="light-content"/>
        <View style={playQuizStyles.toolbar}>
          <TouchableOpacity onPress={() => this._onPressBack() }>
            <Text style={playQuizStyles.toolbarButton}>Back</Text>
          </TouchableOpacity>
          <Text style={playQuizStyles.toolbarTitle}></Text>
          <Text style={playQuizStyles.toolbarButton}></Text>
        </View>
        { this.state.quizFinish ?
          <View style={playQuizStyles.container}>
            <View style={playQuizStyles.circle}>
              { this._scoreMessage(this.state.score) }
            </View>
          </View> : <Quiz quizFinish={(score) => this._quizFinish(score)} />
        }
      </View>
    );
  }
}
