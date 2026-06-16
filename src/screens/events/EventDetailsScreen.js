// Event details screen

import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { styles } from '../../themes/styles';
import { typography } from '../../themes/typography';

export default function EventDetailsScreen() {
  const route = useRoute();
  const { event } = route.params ?? {};
  const imageUri = event?.image;

  return (
    <View style={[styles.container]}>
      {imageUri ? <Image source={{ uri: imageUri }} style={styles.eventImage} /> : null}
      <ScrollView style={styles.detailsContent}>
        <View style={styles.sectionHeader}>
          <Text style={typography.h5}>{event?.title ?? 'Event'}</Text>
          <Text style={typography.caption}>{event?.date ?? 'No date available.'}</Text>
          <Text style={typography.caption}>{event?.location ?? 'No location available.'}</Text>
        </View>
        <View>
          <Text style={typography.body}>{event?.description ?? 'No description available.'}</Text>
        </View>
      </ScrollView>
    </View>
  );
}