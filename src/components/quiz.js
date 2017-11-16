import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animbutton from './animbutton'
import { quizStyles } from '../styles/general';
import { data } from '../data/quiz';

let arrnew = [];

export default class Quiz extends Component {
  constructor(props){
    super(props);
    this.qno = 0;
    this.score = 0;

    const jdata = data.quiz.quiz1;
    arrnew = Object.keys(jdata).map( function(k) { return jdata[k] });
    this.state = {
      question : arrnew[this.qno].question,
      options : arrnew[this.qno].options,
      correctoption : arrnew[this.qno].correctoption,
      countCheck : 0
    }
  }

  prev(){
    if(this.qno > 0){
      this.qno--;
      this.setState({ question: arrnew[this.qno].question, options: arrnew[this.qno].options, correctoption : arrnew[this.qno].correctoption});
    }
  }

  next(){
    if(this.qno < arrnew.length-1) {
      this.qno++;
      this.setState({ countCheck: 0, question: arrnew[this.qno].question, options: arrnew[this.qno].options, correctoption : arrnew[this.qno].correctoption});
    }else {
      this.props.quizFinish(this.score*100/5);
    }
  }

  _answer(status,ans){
    if(status == true){
      const count = this.state.countCheck + 1;
      this.setState({ countCheck: count });
      if(ans == this.state.correctoption ){
        this.score += 1;
      }
    }else{
      const count = this.state.countCheck - 1;
      this.setState({ countCheck: count });
      if(this.state.countCheck < 1 || ans == this.state.correctoption){
        this.score -= 1;
      }
    }
  }

  render() {
    let _this = this;
    const currentOptions = this.state.options;
    const options = Object.keys(currentOptions).map( function(k) {
        return (
          <View key={k} style={{margin:10}}>
            <Animbutton onColor={"green"} effect={"tada"} _onPress={(status) => _this._answer(status,k)} text={currentOptions[k]} />
          </View>
        )
    });

    return (
      <ScrollView style={{backgroundColor: '#F5FCFF',paddingTop: 10}}>
        <View style={quizStyles.container}>
          <View style={{ flex: 1, flexDirection: 'column', justifyContent: "space-between", alignItems: 'center' }}>
            <View style={quizStyles.oval} >
              <Text style={quizStyles.welcome}>
              {this.state.question}
              </Text>
            </View>
            <View>
              { options }
            </View>
            <View style={{flexDirection:"row"}}>
              <TouchableOpacity onPress={() => this.next()} >
                <View style={{paddingTop: 5,paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius:10, backgroundColor:"green"}}>
                  <Icon name="md-arrow-round-forward" size={30} color="white" />
                </View>
              </TouchableOpacity >
            </View>
          </View>
        </View>
      </ScrollView>
      );
    }
  }