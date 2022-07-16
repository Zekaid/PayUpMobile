import  React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, SafeAreaView } from 'react-native';
import Item from "./Item";
import Modal from "react-native-modal";

const styles = StyleSheet.create({
    input: {
        borderStyle: "solid",
        borderWidth: 1,
        marginRight: 10,
        marginLeft: 10,
        width:"45%",
        paddingLeft: 5,
    },

    button: {
        width: 50,
    },

    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    containerList: {
        width: 250,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    people: {
        flexDirection: "row",
    },

    title: {
        fontSize: 30,
        margin: 10,
    }
})

const Assign = ({ navigation, route }) => {
    const [people,setPeople] = useState ({});
    const [count,setCount] = useState (0);
    const [curr, setCurr] = useState (-1);
    const [name,setName] = useState ("");
    const [modal,setModal] = useState (false);
    const [totalPrice, setTotalPrice] = useState("");

    const addPerson = () => {
        let copy = Object.assign({},people);
        copy[count] = [name,{},0,true];
        setPeople(copy);

        setCount(count+1);
    }

    const removePerson = (ct) => {
        let copy = Object.assign({},people);
        delete copy[ct];
        Object.keys(people[ct][1]).map((k) => {
            route.params.itemList[++route.params.itemCount] = people[ct][1][parseInt(k)];
        });
        setCurr(-1);
        setPeople(copy);
    }

    const removeFromCollected = (ct) => {
        route.params.itemList[++route.params.itemCount] = people[curr][1][ct];
        let copy = Object.assign({},people);
        delete copy[curr][1][ct];
        setPeople(copy);
    }

    const addToCollected = (nameAndPrice,itemListCt) => {
        delete route.params.itemList[parseInt(itemListCt)];
        let copy = Object.assign({},people);
        let ct = copy[curr][2];
        copy[curr][1][ct] = nameAndPrice;
        copy[curr][2] += 1;
        setPeople(copy);
    }

    const checkName = () => {
        if (curr === -1){
            return;
        }

        return <Text>{people[curr][0]}</Text>

    }

    const dropdown = (ct) => {
        if (people[ct][3]){
            return (Object.keys(people[ct][1]).map((k) => {
                return (
                    <View style={{flexDirection:"row", marginLeft: 40, justifyContent: "flex-start"}}>
                        <Text>{people[ct][1][parseInt(k)][0]}:  </Text>
                        <Text>${people[ct][1][parseInt(k)][1]}</Text>
                    </View>
                )
            }))
        }
        return;
    }

    const changeDropdown = (ct) => {
        let copy = Object.assign({},people);
        copy[ct][3] = !copy[ct][3];
        setPeople(copy);
    }

    const checkDropdown = (ct) => {
        return (people[ct][3]) ? "-" : "+";
    }

    const check = () => {
        if (curr === -1){
            return;
        }

        return (
            Object.keys(people[curr][1]).map((ct) => {
                return (
                    <View style={styles.containerList}>
                        <Text style={{marginTop:10}}>{people[curr][1][parseInt(ct)][0]}</Text>
                        <Text style={{marginTop:10}}>{people[curr][1][parseInt(ct)][1]}</Text>
                        <Button title={"Remove"} onPress={()=>removeFromCollected(parseInt(ct))}/>
                    </View>

                )
            })
        )
    }

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
            <View style={styles.container}>
                <TextInput style={styles.input} placeholder={"Person's name"} onChangeText={setName} clearTextOnFocus={true}/>
                <View style={{marginRight:50}}>
                    <Button title={"Add Person"} onPress={addPerson}/>
                </View>
            </View>

            <Modal isVisible={modal}>
                <View style={{ backgroundColor: "white", display:"flex", margin: 10, padding: 20, borderRadius: 10,
                    maxHeight: 700, alignItems: "center",
                }}>
                    <Text style={{fontSize:30}}>{checkName()}</Text>
                    <Text style={{fontSize:20}}> Unassigned Items</Text>
                    <ScrollView>
                    {
                        Object.keys(route.params.itemList).map((ct) => {
                            return (
                                <View style={styles.containerList}>
                                    <Text style={{margin:10}}> {route.params.itemList[parseInt(ct)][0]}</Text>
                                    <Text style={{margin:10}}> {route.params.itemList[parseInt(ct)][1]}</Text>
                                    <Button title={"Add"} onPress = {()=>addToCollected(route.params.itemList[parseInt(ct)],ct)}/>
                                </View>

                            )
                        })

                    }
                    </ScrollView>

                    <Text style={{fontSize:20}}>Assigned Items</Text>
                    <ScrollView>
                    {check()}
                    </ScrollView>
                    <Button title={"Confirm"} onPress={()=>setModal(false)}/>
                </View>
            </Modal>

            <ScrollView style={{height: 550}}>
            {
                Object.keys(people).map((ct) => {
                        return (
                            <View>
                                <View style={styles.people}>
                                    <Button title={checkDropdown(parseInt(ct))} onPress={()=>changeDropdown(parseInt(ct))}/>
                                    <Text style={{marginTop:10, minWidth: 150, maxWidth: 150}}> {people[ct][0]}</Text>
                                    <Button title={"Assign"} onPress={()=> {
                                        setModal(true);
                                        setCurr(parseInt(ct));
                                        }
                                    } />

                                    <Button title={"Remove Person"} onPress={()=>removePerson(parseInt(ct))}/>
                                </View>
                                {dropdown(parseInt(ct))}
                            </View>

                        )
                    }
                )
            }
            </ScrollView>
            <View style={{alignItems: "center", flexDirection: "column", justifyContent:"space-evenly", height: 120,}}>
                <Text>Number of Unassigned Items: {Object.keys(route.params.itemList).length}</Text>
                <View style={{flexDirection: "row"}}>
                    <Text>Total Price:</Text>
                    <TextInput style={styles.input} onChangeText={setTotalPrice} placeholder={"including tax and tip"}/>
                </View>
                <Button title={"Calculate"} onPress={() => navigation.navigate('Calculate', { peopleList: people, factor: parseFloat(totalPrice)/route.params.totalPrice })}/>
            </View>

        </SafeAreaView>
    )
}
export default Assign;