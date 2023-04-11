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
    let arr2 = page2.page["content-items"].content
    let arr3 = page3.page["content-items"].content
    useEffect(()=>{
        if(num == 2){
            setFullData([...fullData,...arr2])
        }
        else if(num == 3){
            setFullData([...fullData,...arr3])
        }
    },[num])
    const renderItem = (item: any) => {
         let pos 
        if(item.item["poster-image"] == "poster1.jpg"){
            pos = require("../data/poster1.jpg")
        }
        else if(item.item["poster-image"] == "poster2.jpg"){
            pos = require("../data/poster2.jpg")
        }
        else if(item.item["poster-image"] == "poster3.jpg"){
            pos = require("../data/poster3.jpg")
        }
        else if(item.item["poster-image"] == "poster4.jpg"){
            pos = require("../data/poster4.jpg")
        }
        else if(item.item["poster-image"] == "poster5.jpg"){
            pos = require("../data/poster5.jpg")
        }
        else if(item.item["poster-image"] == "poster6.jpg"){
            pos = require("../data/poster6.jpg")
        }
        else if(item.item["poster-image"] == "poster7.jpg"){
            pos = require("../data/poster7.jpg")
        }
        else if(item.item["poster-image"] == "poster8.jpg"){
            pos = require("../data/poster8.jpg")
        }
        else if(item.item["poster-image"] == "poster9.jpg"){
            pos = require("../data/poster9.jpg")
        }
        else{
            pos = require("../assets/placeholder_for_missing_posters.png")
        }
        return(
            <View style={styles.itemcontainer}>
                <Image style={styles.img} source= {pos} />  
                <Text style={styles.text} numberOfLines={2} ellipsizeMode='tail'>{item.item.name}</Text>
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
        
    }
    return(
        <SafeAreaView style={styles.main} >
            <FlatList
                data={fullData}
                renderItem={renderItem}
                numColumns={3}
                ListHeaderComponent={renderHeader}
                onEndReachedThreshold={2}
                onEndReached={renderMore}
                />

        </SafeAreaView>
    )
 }

 const styles = StyleSheet.create({
    main: {width: '100%', height: '100%', alignItems: 'center', backgroundColor: '#000'},
    itemcontainer: {margin: 10},
    img: {width: 100, height: 100},
    text: {color: '#fff',  width: 100, flex: 1, textAlign: 'center'}
 });

 export default Home


