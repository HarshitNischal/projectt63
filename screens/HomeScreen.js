import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Header} from 'react-native-elements';

export default class HomeScreen extends Component{
    constructor(){
        super();
        this.state={
            text:'',
            isSearchPressed: false,
            isLoading: false,
            word: "Loading...",
            lexicalCatagory: '',
            definition:"",
        }
    }

    getWord=(word)=>{
        var searchKeyword=word.toLowercase()
        var url = "https://rupinwhitehatjr.github.io/dictionary/" + searchKeyword+ ".json"
        return fetch(url)
        .then((data)=>{
            if(data.staus===200){
                return data.json()
            } else{
                return null
            }
        })
        .then((response)=>{
            var responseObject=response
            if(responseObject){
                var wordData = responseObject.definitions[0]
                var definition=wordData.description
                var lexicalCatagory=wordData.wordtype
                this.setState({
                    "word" : this.state.text,
                    "definition": definition,
                    "lexicalCategory": lexicalCatagory
                })
            }
            else{
                this.setState({
                    "word" : this.state.text,
                    "definition": "Not Found",   
                })
            }
        })
    }

    render(){
        return (
            <View>
                <Header
                    background={'orange'}
                    centerComponent={{text:'Dictionary App'}}
                />
                <View>
                <TextInput
                style={styles.inputBox}
                onChangeText={text=>{
                    this.setState({
                        text:text,
                        isSearchPressed: false,
                        word: "Loading...",
                        lexicalCatagory:'',
                        examples: [],
                        definition: ""
                    });
                }}
                value={this,state.text}
                />
                <TouchableOpacity style={styles.searchButton}
                onPress={()=>{
                    this.setState({isSearchPressed: true});
                    this.getWord(this.state.text)
                }}
                >
                    <Text style={styles.searchText}>
                        Search
                    </Text>
                </TouchableOpacity>
                </View>

                <View style={styles.outputContainer}>
                    <Text>{this.state.isSearchPressed && this.state.word==="Loading..."?this.state.word:""}</Text>
                    {this.state.word!=="Loading..."?(
                        <View>
                            
                        </View>
                    )}

                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                        Word:{""}
                    </Text>
                    <Text style={{fontSize:18}}>
                        {this.state.word}
                    </Text>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsTitle}>
                        Type:{""}
                    </Text>
                    <Text style={{fontSize:18}}>
                        {this.state.lexicalCatagory}
                    </Text>
                </View>

                <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                    <Text style={styles.detailsTitle}>
                        Definition:{""}
                    </Text>
                    <Text style={{fontSize:18}}>
                        {this.state.definition}
                    </Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputBox: {
        marginTop: 50,
        width: '80%',
        alignSelf: 'center',
        height: 40,
        textAlign: 'center',
        borderWidth: 4,
        outline: 'none',
      },
    searchButton: {
        width: 50,
        height: 30,
        justifyContent:'center',
        alignItems:'center',
        margin:10,
        borderWidth: 4,
    },
    searchText: {
        fontSize:20,
        fontWeight:'bold',
    },
    detailsContainer: {
        flexDirection:'row',
        alignItems:'center'
    },
    detailsTitle: {
        color:'blue',
        fontSize:20,
        fontWeight:'bold',
    }
})