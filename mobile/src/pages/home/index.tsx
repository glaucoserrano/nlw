import React, {useEffect,useState} from 'react';
import { StyleSheet, View, Image,Text, ImageBackground} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {Feather as Icon} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import RNPickerSelect  from 'react-native-picker-select';
import axios from 'axios';

if(__DEV__) {
   require('react-devtools')
}

<script src="http://169.254.238.132:8097"></script>
const Home = () => {
   
   interface IBGEUFResponse{
      sigla: string;
   }
   interface IBGECityResponse{
      nome: string;
   }
   const navigation = useNavigation();
   const [uf,setUF] = useState('');
   const [city,setCity] = useState('');
   const[ufs, setUfs] = useState<string[]>([]);
   const[cities,setCities] = useState<string[]>([]);
   
   function handleNavigatetoPoints(){
      navigation.navigate('Point',{
         uf:'SP',
         city:'Bauru',
      });
   }
   useEffect(()=> {
      axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response=>{
         const ufInitials = response.data.map(uf=> uf.sigla);
         setUfs(ufInitials);

      });
   });
    /* CArregar Cidades*/
    useEffect(() => {
      if (uf===null){
         return;
      }

      axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?orderBy=nome`).then(response=>{
         const cityNames = response.data.map(city=> city.nome);
         setCities(cityNames);
      });
   });

   function handleSelectUF(uf:string){
      setUF(uf);
      
   }
   function handleSelectCity(city : string){
      setCity(city);
   }
   return(       
   
      <ImageBackground 
      source={require('../../assets/home-background.png')} 
      style={styles.container}
      imageStyle={{width: 274 , height: 368}}
      >
         <View style={styles.main}>
            <Image source={require('../../assets/logo.png')} />
            <View>
               <Text  style={styles.title}>Seu MarketPlace de coleta de Resíduos</Text >
               <Text  style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text >
            </View>
         </View>
         <View style={styles.footer}>
            <RNPickerSelect
               onValueChange={(value) => handleSelectUF(value)}
               value={uf}
               items={ufs.map((uf) => ({ key: uf, label: uf, value: uf }))}
            />
            <RNPickerSelect
               onValueChange={(value) => handleSelectCity(value)}
               value={city}
               items={cities.map((city) => ({ key: city, label: city, value: city }))}
            />
            <RectButton style={styles.button} onPress={handleNavigatetoPoints}> 
               <View style={styles.buttonIcon}>
                  <Text> 
                     <Icon name="arrow-right" color="#FFF" size={24} /> 
                  </Text>
               </View> 
               <Text style={styles.buttonText} >Entrar </Text>
            </RectButton>
         </View>
      </ImageBackground>
   
   );
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     padding: 32,
   },
 
   main: {
     flex: 1,
     justifyContent: 'center',
   },
 
   title: {
     color: '#322153',
     fontSize: 32,
     fontFamily: 'Ubuntu_700Bold',
     maxWidth: 260,
     marginTop: 64,
   },
 
   description: {
     color: '#6C6C80',
     fontSize: 16,
     marginTop: 16,
     fontFamily: 'Roboto_400Regular',
     maxWidth: 260,
     lineHeight: 24,
   },
 
   footer: {},
 
   select: {},
 
   input: {
     height: 60,
     backgroundColor: '#FFF',
     borderRadius: 10,
     marginBottom: 8,
     paddingHorizontal: 24,
     fontSize: 16,
   },
 
   button: {
     backgroundColor: '#34CB79',
     height: 60,
     flexDirection: 'row',
     borderRadius: 10,
     overflow: 'hidden',
     alignItems: 'center',
     marginTop: 8,
   },
 
   buttonIcon: {
     height: 60,
     width: 60,
     backgroundColor: 'rgba(0, 0, 0, 0.1)',
     justifyContent: 'center',
     alignItems: 'center'
   },
 
   buttonText: {
     flex: 1,
     justifyContent: 'center',
     textAlign: 'center',
     color: '#FFF',
     fontFamily: 'Roboto_500Medium',
     fontSize: 16,
   }
 });

export default Home;