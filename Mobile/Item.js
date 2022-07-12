import {View, Button, Text, StyleSheet} from "react-native";
import React from "react";

const styles = StyleSheet.create({
    text: {
        marginRight: 10,
        marginLeft: 10,
        width:"25%",
        marginTop: 10,
    },

    button: {
        width: 50,
    },

    container: {

        flexDirection: "row",

    }
})

const Item = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.n}</Text>
            <Text style={styles.text}>{props.p}</Text>
            <Button title={"Remove"} onPress={()=>props.remove(props.c)}/>
        </View>

    )
}

export default Item;