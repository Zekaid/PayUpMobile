import  React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Person from "./Person";

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        flex: 1,
        paddingTop: 40,
        paddingLeft: 20,

    },
    title: {
        marginTop: 0,
        fontSize: 30,
    },
    input: {
        borderStyle: "solid",
        borderWidth: 1,
    }

})

const App = () => {
    const [people, setPeople] = useState({});
    const [actualTotal, setActualTotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(0);

    const factor = useRef(1);
    const inputMap = useRef({});

    const changeMap = (id,key,val,bool) => {
        if (bool){
            delete inputMap.current[id][key];
        }
        else {
            inputMap.current[id][key] = val;
        }
    }

    const calculate = () => {
        if (actualTotal < total) {
            alert("The total with tip and tax has to be larger than subtotal!");
            return;
        }
        let temp = 0;
        for (const k in people){
            temp+=parseFloat(people[k]);
        }
        setTotal(total);
        factor.current = actualTotal/temp;
        update();
    }

    const update = () => {
        var copy = JSON.parse(JSON.stringify(people));
        setPeople(copy);
    }

    const add = () => {
        let copy = Object.assign({},people);
        copy[count] = JSON.stringify(0);
        setPeople(copy);
        inputMap.current[count] = ({count: 0});
        setCount(count+1);
    }

    const del = (key) => {
        let copy = Object.assign({},people)
        delete copy[key];
        setPeople(copy);
        delete inputMap.current[key];
    }

    const totalWithTipTax = (event) => {
        setActualTotal(event);
    }

    const calcTotal = (key,subtotal) => {
        let copy = JSON.parse(JSON.stringify(people));
        copy[key] = subtotal;
        setPeople(copy);
    }

    return (
        <View>
            <View>
                <Text>
                    <Text style={styles.title}>Pay</Text>
                    <Text style={styles.title}>Up</Text>
                </Text>
            </View>
            <View>
                <Button onPress={add} title="Add New Person"/>
            </View>
            <View>
                {Object.keys(people).map((k) => {
                    return (
                        <View className={"Input"}>
                            <Text>Person {k}</Text>
                            <Person key={k} id={k} del={del} input={inputMap.current} changeInput={changeMap}
                                    calcTotal={calcTotal}/>
                            <Text>Amount Due: {Math.round(parseFloat(people[k]) * (factor.current) * 1000) / 1000}</Text>
                        </View>
                    )
                    }
                )}
            </View>

            <View>
                <Text>Total: </Text>
                <TextInput onChangeText={totalWithTipTax} style={styles.input} />
            </View>
            <View>
                <Button onPress={calculate} title="Calculate"/>
            </View>
        </View>
    );
}

export default App;