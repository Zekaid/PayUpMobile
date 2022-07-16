import  React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, SafeAreaView } from 'react-native';
const subtotal = (itemList) => {
    let temp = 0;
    Object.keys(itemList).map((ct)=> {
        temp+=itemList[ct][1];
    })
    return temp;
}
const Calculate = ({ navigation, route }) => {
    return (
        <SafeAreaView>
            <View style={{justifyContent: "space-between", flexDirection: "row"}}>
                <Text style={{fontSize: 30,
                    margin: 10,}}>
                    <Text>Pay</Text>
                    <Text>Up</Text>
                </Text>
                <View style={{margin: 10}}>
                    <Button title={"Back"} onPress={() => navigation.goBack()
                    }/>
                </View>
            </View>
            {
                Object.keys(route.params.peopleList).map((ct)=>{
                    return (
                        <View style={{margin: 10,}}>
                            <Text style={{fontWeight:"bold"}}>{route.params.peopleList[ct][0]}</Text>
                            <Text>Subtotal: {subtotal(route.params.peopleList[ct][1])}</Text>
                            <Text>Amount Due: {Math.round(subtotal(route.params.peopleList[ct][1])*route.params.factor*1000)/1000}</Text>
                        </View>
                    )
                })
            }
        </SafeAreaView>
    )
}
export default Calculate;