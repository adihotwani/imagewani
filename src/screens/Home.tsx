 import React,{useState, useEffect} from "react";
 import { FlatList, SafeAreaView, View, Image, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
 import page1 from "../API/CONTENTLISTINGPAGE-PAGE1.json"
 import page2 from "../API/CONTENTLISTINGPAGE-PAGE2.json"
 import page3 from "../API/CONTENTLISTINGPAGE-PAGE3.json"

 import filter from 'lodash.filter'

 const Home = ( ) => {
    const [walldata, setwalldata] = useState<any>(page1.page["content-items"].content);
    const [query, setquery] = useState('')
    const [fullData, setFullData] = useState<any>(page1.page["content-items"].content);
    const [num, setnum] = useState(1)
    const renderItem = (item: any) => {
         let pos = item.item["poster-image"]
        // if(item.item["poster-image"] == "poster1.jpg"){
        //     pos = require("../data/poster1.jpg")
        // }
        // else if(item.item["poster-image"] == "poster2.jpg"){
        //     pos = require("../data/poster2.jpg")
        // }
        // else if(item.item["poster-image"] == "poster3.jpg"){
        //     pos = require("../data/poster3.jpg")
        // }
        // else{
        //     pos = require("../assets/placeholder_for_missing_posters.png")
        // }
        return(
            <View style={styles.itemcontainer}>
                <Image style={styles.img} source= {require(`../data/${pos}`)} />  
                <Text style={styles.text}>{item.item.name}</Text>
            </View>
        )
    }
    const renderHeader = () => {
        const handleSearch = (text) => {
            const formattedQuery = text.toLowerCase();
            const filteredData = filter(fullData, element => {
                console.log(element.name)
              return contains(element.name, formattedQuery);
            });
            setwalldata(filteredData);
            setquery(text);
        }
        const contains = (name, query) => {
            if(name.includes(query)){
                return true
            }

            return false
        }
        return(
            <View style={{padding: 10, borderWidth: 1, elevation: 20, flexDirection: 'row' }}>
                <TextInput style={{ borderWidth: 1, backgroundColor: '#fff', borderRadius: 10, margin: 5, width: '74%' }} 
                            placeholder="Search Here"
                            value={query}
                            onChangeText={text => handleSearch(text)} />
                <TouchableOpacity onPress={handleSearch} >
                 <Image style={{width: 30, height: 30, alignSelf: 'flex-end', margin: 15}} source={require("../assets/search.png")} />
                </TouchableOpacity>
            </View>
        )
    }
    const renderMore = () => {
        setnum(num+1)
        if(num == 2){
            let arrNext = page2.page['content-items'].content
        setFullData(fullData.push(...arrNext))
        }
        
    }
    return(
        <SafeAreaView style={styles.main} >
            <FlatList
                data={walldata}
                renderItem={renderItem}
                numColumns={3}
                ListHeaderComponent={renderHeader}
                onEndReachedThreshold={0.3}
                onEndReached={renderMore}
                />

        </SafeAreaView>
    )
 }

 const styles = StyleSheet.create({
    main: {width: '100%', height: '100%', alignItems: 'center', backgroundColor: '#000'},
    itemcontainer: {margin: 10},
    img: {width: 100, height: 100},
    text: {color: '#fff', alignSelf: 'center'}
 });

 export default Home


