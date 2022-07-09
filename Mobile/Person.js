import Price from "./Price";
import  React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

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

function Person(props) {
    const [prices, setPrices] = useState({});
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(()=>calculate(),[prices,total]);

    const update = (id,res) => {
        var copy = JSON.parse(JSON.stringify(prices));
        copy[id] = res;
        setPrices(copy);
        props.changeInput(props.id,id,res,false);
    }

    const add = () => {
        var copy = Object.assign({},prices);
        copy[count] = 0;
        setPrices(copy);
        setCount(count+1);
        props.input[props.id].count = count+1;
    }

    const calculate = () => {
        let tmp = 0;
        for (const k in prices){
            tmp+=prices[k];
        }
        setTotal(tmp);
        props.calcTotal(props.id,tmp);
    }

    const del = (key) => {
        var copy = JSON.parse(JSON.stringify(prices));
        delete copy[key];
        setPrices(copy);
        props.changeInput(props.id,key,-1,true);
    }

    const check = () => {
        if (Object.keys(prices).length === 0 && Object.keys(props.input[props.id]).length !== 1){
            let copy = Object.assign({},props.input[props.id]);
            delete copy.count;
            setPrices(copy);
            setCount(props.input[props.id].count);
        }
        return "";
    }

    return (
        <View>

            <Button onPress={add} title="Add"/>
            <Button onPress={()=>props.del(props.id)} title="Remove"/>
            {check()}
            <View>{Object.keys(prices).map((k) => {
                return (<View>
                        <Price key={k} id={k} update={update} del={del} value={props.input[props.id][k]}/>
                        </View>)
            }
            )}</View>
        </View>
    );
}

export default Person;