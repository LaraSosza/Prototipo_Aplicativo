import { View,ViewProps,TextInput,TextInputProps} from "react-native";
import { styles } from "./styles";

function Input({children, style}:ViewProps){
    return <View style={[styles.container, style]}>{children}</View>
}

function Field({...rest}: TextInputProps){
    return <TextInput style={styles.input}{...rest}/>
}

Input.Field=Field
export {Input}