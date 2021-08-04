import React, { Component } from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity} from 'react-native';
import {Header} from 'react-native-elements';

export default class HomeScreen extends React.Component{
constructor(){
    super();
    this.state={
        text:" "
    }
}
getWord=()=>{
    var searchKeyword=word.toLowerCase()
    var url="https://rupinwhitehatjr.github.io/dictionary/%22+searchKeyword+%22.json"+searchKeyword+".json"
    return fetch(url)
    .then((response)=>{
        var responseObject=response

        if(responseObject){
            var wordData=responseObject.definitions[0]
            var definition=wordData.description
            var lexicalCategory=wordData.wordType
            this.setState({
                "word":this.state.text,
                "definition":definition,
                "lexicalCategory":lexicalCategory
            })
        }
        else
        {
            this.setState({
                "word":this.state.text,
                "definition":"Not Found"
            })
        }
    })
}
render(){
    return(
        <View>
            <View style={styles.container}>
                <Text style={styles.detailsContainer}>
                    Word:{""}
                </Text>
                <Text style={{fontSize:18}}>
                    {this.state.word}
                </Text>
            </View>
            <View style={{flex:1}}>
                <Text style={styles.detailsContainer}>
                    Type:{""}
                </Text>
                <Text style={{fontSize:18}}>
                    {this.state.lexicalCategory}
                </Text>
            </View>
            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                <Text style={styles.detailsContainer}>
                    Definition:{""}
                </Text>
                <Text style={{fontSize:18}}>
                    {this.state.definition}
                </Text>
            </View>
            <TextInput
            style={styles.inputBox}
            onChangeText={text=>{
                this.setState({
                    text:text,
                    isSearchPressed:false,
                    word:"Loading...",
                    lexicalCategory:'',
                    examples:[],
                    definition:""
                })
            }}
            value={this.state.text}
            />
            
            <TouchableOpacity
            style={styles.searchButton}
            onPress={()=>{
                this.setState({isSearchPressed:true})
                this.getWord(this.state.text)
            }}
            >
             <Text>Search</Text>
            </TouchableOpacity>
        </View>
    )
}
}
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    inputBoxContainer:{
        flex:0.3,
        alignItems:'center',
        justifyContent:'center'
    },
    searchButton:{
        width:"20%", 
        height:35, 
        justifyContent:'center', 
        alignItems:'center', 
        alignSelf:'center',
        borderRadius:10,
        borderWidth:1,
        padding:10,
         backgroundColor:"#add8e6",  
          marginTop:20 
       }, 
    inputBox:{
        width:"60%",
        height:35,
        alignSelf:'center',
        borderColor:'#00008b',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10,
    },
    detailsContainer:{
            fontSize:25,
            fontWeight:"bold",
            color:"#fff"
    }
})