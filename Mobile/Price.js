import React, { useState } from 'react';
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
        width: 150,
    },

    prices: {
        display: "flex",
        flexDirection: "row",

    }

})

function Price (props){
    const [price, setPrice] = useState(0);

    const set = (event) => {
        var tmp = (event === "") ? "" : parseFloat(event);

        setPrice(tmp);
        props.update(props.id,tmp);
    }

    const del = () => {
        props.del(props.id);
    }

    return (
        <View style = {styles.prices}>
            <Text>Price: </Text>
            {(props.value != null) ? <TextInput onChangeText={set}></TextInput> :
                <TextInput onChangeText={set} style={styles.input}/>}
            <Button onPress={del} title="x"/>
        </View>
    )
}

export default Price;