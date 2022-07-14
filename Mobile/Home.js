import  React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, SafeAreaView } from 'react-native';
import Modal from "react-native-modal";
import Item from "./Item";

const styles = StyleSheet.create({
    input: {
        borderStyle: "solid",
        borderWidth: 1,
        marginRight: 10,
        marginLeft: 10,
        width:"25%",
        paddingLeft: 5,
    },

    button: {
        width: 50,
    },

    container: {
        flexDirection: "row",
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


    return (
        <SafeAreaView>
            <View style={{justifyContent: "space-between", flexDirection: "row"}}>
                <Text style={styles.title}>
                    <Text>Pay</Text>
                    <Text>Up</Text>
                </Text>
                <View style={{margin: 10}}>
                    <Button title={"Assign"} onPress={() => navigation.navigate('Assign', { itemList: items, itemCount: count })
                            }/>
                </View>

            </View>

            <View style={styles.container}>
                <TextInput clearTextOnFocus={true} style={styles.input} keyboardType={"default"} onChangeText={setName} placeholder={"item name"}/>
                <TextInput clearTextOnFocus={true} style={styles.input} keyboardType={"numeric"} onChangeText={setPrice} placeholder={"item price"}/>
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

// const App = () => {
//     const [people, setPeople] = useState({});
//     const [actualTotal, setActualTotal] = useState(0);
//     const [total, setTotal] = useState(0);
//     const [count, setCount] = useState(0);
//
//     const factor = useRef(1);
//     const inputMap = useRef({});
//
//     let c = 1;
//
//     const changeMap = (id,key,val,bool) => {
//         if (bool){
//             delete inputMap.current[id][key];
//         }
//         else {
//             inputMap.current[id][key] = val;
//         }
//     }
//
//     const calculate = () => {
//         if (actualTotal < total) {
//             alert("The total with tip and tax has to be larger than subtotal!");
//             return;
//         }
//         let temp = 0;
//         for (const k in people){
//             temp+=parseFloat(people[k]);
//         }
//         setTotal(total);
//         factor.current = actualTotal/temp;
//         update();
//     }
//
//     const update = () => {
//         var copy = JSON.parse(JSON.stringify(people));
//         setPeople(copy);
//     }
//
//     const add = () => {
//         let copy = Object.assign({},people);
//         copy[count] = JSON.stringify(0);
//         setPeople(copy);
//         inputMap.current[count] = ({count: 0});
//         setCount(count+1);
//     }
//
//     const del = (key) => {
//         let copy = Object.assign({},people)
//         delete copy[key];
//         setPeople(copy);
//         delete inputMap.current[key];
//     }
//
//     const totalWithTipTax = (event) => {
//         setActualTotal(event);
//     }
//
//     const calcTotal = (key,subtotal) => {
//         let copy = JSON.parse(JSON.stringify(people));
//         copy[key] = subtotal;
//         setPeople(copy);
//     }
export default Home;