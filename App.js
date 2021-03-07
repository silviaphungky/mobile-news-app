import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { 
  StyleSheet,
  SafeAreaView, 
  View,
  Text, 
  Image,
  ScrollView,
  Button,
  Linking
} from 'react-native';
import NewsApi from './src/services/news-api';

export default function App() {

  const [articles, setArticles] = useState([])

  useEffect(() => {
    console.log('masuk 2')
    NewsApi.get()
    .then((response) => {
      console.log(response.data.response.docs)
      const data = response.data.response.docs
      setArticles(data)
    })
    .catch((error) => console.log(error))
  }, [])


  const handlePress = (url) => {
    const supported = Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }

  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

     <ScrollView 
       showsVerticalScrollIndicator={false}
       showsHorizontalScrollIndicator={false}
     >
     <Text>News Apps</Text>
 {
  articles.map((article) => {
    let image = article.multimedia.find((element) => element.subtype==='superJumbo')
    return(
    <View 
      key={`news-${article.headline.main}`}
      style={{marginTop: 15}}
    >
      <Text 
        style={{
          marginBottom: 0, 
          marginTop: 10,
          fontWeight: 'bold',
          textAlign: 'center'
        }}
      >
        {article.headline.main}
      </Text>

      <Text 
        style={{
          marginBottom: 10, 
          marginTop: 10
        }}
      >
        {article.abstract}
      </Text>

         <Image 
          source={{
            uri: `https://www.nytimes.com/${image?.url}`,
            width: '100%',
            height: 200
          }} 
          style={{
            marginBottom: 20
          }}
        /> 

      <View>
        <Button
          title='View More'
          color="#841584"
          onPress={() => handlePress(article.web_url)}
        />
      </View>
    </View>
  )}
  )
}
     </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    overflow: 'hidden'
  },

  image: {
    alignItems: 'center'
  }
})

