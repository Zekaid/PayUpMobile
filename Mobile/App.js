import  React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, SafeAreaView } from 'react-native';
import Person from "./Person";
import Item from "./Item";

const styles = StyleSheet.create({
    input: {
        borderStyle: "solid",
        borderWidth: 1,
        marginRight: 10,
        marginLeft: 10,
        width:"25%",
    },

    button: {
        width: 50,
    },

    container: {
        flexDirection: "row",
    }
})
const App = () => {
    const [items,setItems] = useState({});
    const [count,setCount] = useState(0);
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    let splitFactor = 1;

    const addItem = () => {
        let copy = Object.assign({},items);
        copy[count] = [name,price];
        setCount(count+1);
        setItems(copy);
    }

    const removeItem = (ct) => {
        let copy = Object.assign({},items);
        delete copy[ct];
        setItems(copy);
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <TextInput style={styles.input} keyboardType={"default"} onChangeText={setName}/>
                    <TextInput style={styles.input} keyboardType={"numeric"} onChangeText={setPrice}/>
                    <Button style={styles.button} title={"Add"} onPress={addItem}/>
                    <Button style={styles.button} title={"Split"} />
                    <Text style={{marginTop: 10}}>1/{splitFactor}</Text>
                </View>
                <View>
                    {
                        Object.keys(items).map((ct) => {
                                return (
                                    <View>
                                        <Item remove={removeItem} key={ct} c={parseInt(ct)} n={items[parseInt(ct)][0]}
                                              p={items[parseInt(ct)][1]} />
                                    </View>
                                )
                            }
                        )
                    }
                </View>
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
export default App;