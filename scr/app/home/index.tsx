import {View, Text, TouchableOpacity, Alert, SectionList} from "react-native"
import {styles} from "./styles"
import { useState, useEffect, useId, useRef } from "react"

import { theme } from "@/theme"
import * as Contacts from "expo-contacts"
import {useBottomSheet} from "@gorhom/bottom-sheet"

import {Feather} from "@expo/vector-icons"
import {Input} from "@/components/input"
import { Contact, ContactProps } from "@/components/contact"
import bottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet"


type SectionListDataProps ={
    title: string
    data: ContactProps[]
}

export function Home(){
    const [contacts, setContacts] = useState<SectionListDataProps[]>([])
    const [name, setName]= useState("")

    const usebottomsheet= useRef(null)

    async function fetchContacts(){
        try{
           const {status} = await Contacts.requestPermissionsAsync()

           if(status === Contacts.PermissionStatus.GRANTED){
            const{data} = await Contacts.getContactsAsync({
                name,
                sort: "firstName",
            })
            const list= data.map((contact)=>({
               id: contact.id ?? useId(),
               name: contact.name,
               image: contact.image,

            })).reduce<SectionListDataProps[]>((acc: any, item)=>{
                const firstLetter = item.name[0].toUpperCase()

                const existingEntry = acc.find(
                    (entry: SectionListDataProps) => entry.title === firstLetter
                )

                if(existingEntry){
                    existingEntry.data.push(item)
                }else{
                    acc.push({title: firstLetter, data: [item] })
                }
                

                return acc
            },[])

            setContacts(list)
           }


        }catch(erro){
          console.log(erro)
          Alert.alert("Contatos","Não foi possivel carregar os contatos.")
        }
    }

    useEffect(()=>{
        fetchContacts()
    },[name])


     return(
        <View style={styles.container}>    
            <View style={styles.header}>
             <Input style={styles.input}>
               <Feather name="search" size={16} color={"gray"}/>
                 <Input.Field 
                    placeholder="Pesquisar pelo nome..."
                    onChangeText={setName}
                    value={name}
            />
        <TouchableOpacity onPress={()=> setName("")}>
            <Feather name="x" size={16} color={"gray"}
               
            />
        </TouchableOpacity>    

        </Input>

            </View> 

        <SectionList sections={[{title: "L", data: [{ id:"1", name:"Lara"}] }]}
            keyExtractor={(item)=>item.id}
            renderItem={({item})=>(
            <Contact contact={item}/>

            )}
            renderSectionHeader={({section}) =>(
                 <Text style={styles.section}> {section.title} </Text>
            )}
            contentContainerStyle={styles.contentList}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={()=> <View style={styles.separator}/>}
            />

        
    
        </View>
     )

}
