import  React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import Modal from "react-native-modal";
import Item from "./Item";

const styles = StyleSheet.create({
    input: {
        borderStyle: "solid",
        borderWidth: 1,
        width:"25%",
        borderRadius: 10
    },

    container: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },

    button: {
        borderStyle: "solid",
    },

    title: {
        fontSize: 30,
        margin: 10,
    }
})

const Home = ({ navigation }) => {
    const [items,setItems] = useState({});
    const [count,setCount] = useState(0);
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [modal, setModal] = useState(false);
    const [splitFactor,setSplitFactor] = useState (1);

    const addItem = () => {
        let copy = Object.assign({},items);

        for (let i = 0; i < splitFactor; i++){
            copy[count+i] = [name,Math.round(price/splitFactor*100)/100];
        }
        setCount(count+splitFactor);
        setSplitFactor(1);
        setItems(copy);
    }

    const removeItem = (ct) => {
        let copy = Object.assign({},items);
        delete copy[ct];
        setItems(copy);
    }

    const decrement = () => {
        if (splitFactor === 1){
            return;
        }
        else {
            setSplitFactor(splitFactor-1);
        }
    }

    const calculateTotal = () => {
        let temp = 0;
        Object.keys(items).map((ct)=>{
            temp+=items[parseInt(ct)][1];
        });
        return temp;
    }

    return (
        <SafeAreaView>
            <StatusBar
                animated={true}
                backgroundColor="black"
                barStyle={"dark-content"}
            />
            <View style={{justifyContent: "space-between", flexDirection: "row"}}>
                <Text style={styles.title}>
                    <Text style={{fontFamily: "Futura", fontWeight: "bold"}}>Pay</Text>
                    <Text style={{fontFamily: "Futura", fontWeight: "bold", color:"blue"}}>Up</Text>
                </Text>
                <View style={{margin: 10}}>
                    <Button title={"Assign"} onPress={() => {
                        navigation.navigate('Assign', { itemList: items, itemCount: count, totalPrice: calculateTotal() })
                        }
                            }/>
                </View>

            </View>

            <View style={styles.container}>
                <TextInput clearTextOnFocus={true} style={styles.input} keyboardType={"default"} onChangeText={setName} placeholder={"item name"} placeholderTextColor={"gray"}/>
                <TextInput clearTextOnFocus={true} style={styles.input} keyboardType={"numeric"} onChangeText={setPrice} placeholder={"item price"} placeholderTextColor={"gray"}/>
                <Button style={styles.button} title={"Add"} onPress={addItem}/>
                <Button style={styles.button} title={"Split"} onPress={()=>setModal(true)}/>
                <Modal isVisible={modal}>
                    <View style={{ backgroundColor: "white", flex: 1, margin: 50, padding: 20, borderRadius: 10,
                        maxHeight: 160, alignItems: "center",
                    }}>
                        <Text>How many ways do you want to split the item price?</Text>
                        <View style ={{flexDirection: "row",}}>
                            <Button title={"-"} onPress={decrement}/>
                            <Text style ={{marginTop: 10, fontSize: 15}}>{splitFactor}</Text>
                            <Button title={"+"} onPress={()=>setSplitFactor(splitFactor+1)}/>
                        </View>
                        <Button title={"Confirm"} onPress={()=>setModal(false)}/>
                    </View>
                </Modal>
                <Text style={{marginTop: 11}}>{splitFactor} ways</Text>
            </View>
            <ScrollView>


                {
                    Object.keys(items).map((ct) => {
                            return (
                                    <Item remove={removeItem} key={ct} c={parseInt(ct)} n={items[parseInt(ct)][0]}
                                          p={items[parseInt(ct)][1]} />
                            )
                        }
                    )
                }

                <Text style={{marginBottom:90,}}></Text>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Home;