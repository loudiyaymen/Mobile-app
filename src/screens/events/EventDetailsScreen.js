// Event details screen

import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Image, Pressable, } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { styles } from '../../themes/styles';
import { typography } from '../../themes/typography';
import { colors } from "../../themes/color";
import { CalendarIcon, MapPinSimpleIcon, UserIcon } from 'phosphor-react-native';
import { useNavigation } from "@react-navigation/native";

export default function EventDetailsScreen() {
  const route = useRoute();
  const { event } = route.params ?? {};
  const imageUri = event?.image;
  const navigation = useNavigation();

  const DetailSection = ({ title, content, icon: Icon }) => (
    <View style={{ marginTop: 16 }}>
      <Text style={[typography.secondaryBody, { marginBottom: 8 }]}>{title}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {Icon && <Icon size={20} color={colors.Primary_Charcoal} weight="bold" />}
          <Text style={typography.body}>{content}</Text>
        </View>
    </View>
  );

  return (
    <View style={[styles.container]}>
      {imageUri ? <Image source={{ uri: imageUri }} style={styles.eventImage} /> : null}
      <ScrollView style={styles.detailsContent}>
        
        {/* Main Header Container */}
        <View style={styles.headerContainer}>
          
          {/* Top Row: Title and Organizer */}
          <View style={styles.infoRow}>
            <Text style={[typography.h5, { flex: 1 }]}>{event?.title ?? 'Event'}</Text>
            <View style={styles.iconTextGroup}>
              <UserIcon size={20} color={colors.Primary_Charcoal} />
              <Text style={typography.body}>{event?.organizer ?? 'Algonquin College'}</Text>
            </View>
          </View>

          {/* Bottom Row: Date and Time (or Location) */}
          <View style={styles.infoRow}>
            <View style={styles.iconTextGroup}>
              <CalendarIcon size={20} color={colors.Primary_Charcoal} />
              <Text style={typography.body}>{event?.date ?? '17th March 2026'}</Text>
            </View>
            <View style={styles.iconTextGroup}>
              <MapPinSimpleIcon size={20} color={colors.Primary_Charcoal} />
              <Text style={typography.body}>{event?.location ?? '4:00 PM'}</Text>
            </View>
          </View>
          
        </View>

        <View>
          <DetailSection 
            title="Event details" 
            content={event?.description ?? 'No description available.'} 
          />
          <DetailSection 
            title="Location" 
            icon={MapPinSimpleIcon}
            content={event?.location ?? 'No location specified.'} 
          />
          <DetailSection 
            title="Registration Deadline" 
            icon={CalendarIcon} 
            content={event?.registrationDeadline ?? 'No deadline specified.'} 
          />
        </View>

      </ScrollView>

      <Pressable style={styles.registerButton} key={event.id} onPress={() => navigation.navigate("EventRegister", { event })}>
        <Text style={[typography.body, { color: colors.primary_White }]}>Register</Text>
      </Pressable>

    </View>
  );
}