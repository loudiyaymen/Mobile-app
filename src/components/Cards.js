import { View, Text, Image, useWindowDimensions } from "react-native";
import { styles } from "../themes/Card.styles";
import { typography } from "../themes/typography";

export default function Card(props) {
    const { width } = useWindowDimensions();
    const cardWidth = width * 0.6;

    return(
        <View style={[styles.cardContainer, {width: cardWidth}]}>
            <View style={styles.innerContainer}>
                <Image style={styles.cardImage} source={{ uri: props.image }} alt={props.title} />
                <View style={styles.textContainer}>
                    <Text style={[styles.cardTitle, typography.h4]} numberOfLines={1}>{props.title}</Text>
                    <Text style={[styles.cardDescription, typography.body]} numberOfLines={2}>
                        {props.description}
                    </Text>
                </View>
            </View>
        </View>
    );
}