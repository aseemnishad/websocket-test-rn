import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import io from "socket.io-client";
import Button from './src/common/Button';


export default class App extends Component {
    state = {
      connect_status: false,
      messages:[],
      room: 'Aseem',
      socketUrl : 'https://websocket-challenge.herokuapp.com/chat'
    }

  componentDidMount() {
    const { room, socketUrl } = this.state
    this.socket = io(socketUrl, {
      transports: ['websocket']
    });
    // Socket Connection Event
    this.socket.on('connect', () => {
      this.setState({connect_status: true})
      this.socket.emit('join', { room })
    })
    // Socket Disconnection Event
    this.socket.on('disconnect', () => {
      this.setState({connect_status: false})
    })
    // Socket new_message Event
    this.socket.on('new_message',(msg)=>{
      let { messages } = this.state;
      messages = [...messages, msg]
      this.setState({messages})
    })
  }

  componentWillUnmount() {
    // Disconnecting Socket
    if(this.socket)
    {
      this.socket.disconnect()
    }
  }
  

  onEmit=(event)=>{
    const { room } = this.state
    // Socket Button Click Emit Event 
    this.socket.emit(event, { room })
  }

  render() {
    const { connect_status, messages } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Status:
          <Text style={styles.statusText}>
            {connect_status ? 'Connected' : 'Not Connected'}
          </Text>
        </Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}
         showsVerticalScrollIndicator={false}
         ref="scrollView"
         onContentSizeChange={()=>{        
             this.refs.scrollView.scrollToEnd({animated: true});
         }}>
          {messages.map((msg,index)=>
            <View key={index} style={[styles.msgContainer,
              msg.message==='Hello World!' &&  styles.helloMsg ]}>
              <Text key={index}>{msg.message}</Text>
           </View>
          )}
        </ScrollView>
        <View style={styles.subContainer}>
            <View style={styles.buttonParent}>
              <Button disabled={!connect_status} style={styles.helloButton} title="Hello World" onPress={()=>this.onEmit('hello_world')}/>
              <Button disabled={!connect_status} title="Random Number" onPress={()=>this.onEmit('random_number')}/>
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 35,
    paddingBottom: '10%'
  },
  scrollContainer: {
    paddingBottom: 20
  },
  helloButton: {
    backgroundColor: '#4f9171'
  },
  helloMsg: {
    borderColor: '#4f9171',
    alignSelf: 'flex-start'
  },
  statusText: {
    fontWeight: 'bold',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  subContainer: {
    justifyContent: 'flex-end',
  },
  buttonParent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  msgContainer: {
    borderWidth: 1,
    borderColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginVertical: 5
  }
});