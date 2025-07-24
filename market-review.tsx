import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useMarketCreation } from '@/context/MarketCreationContext';
import marketsApi from '@/api/markets';

export default function MarketReviewScreen() {
  const router = useRouter();
  const { marketData } = useMarketCreation();
  const [loading, setLoading] = React.useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleSubmit = () => {
    setLoading(true);
    marketsApi.createMarket(marketData)
      .then((response) => {
        setLoading(false);
        console.log(response);
        router.push('/market-submitted');
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert('Error', error.message);
        console.log(error);
      });
  };

  return (
      <>
        <Stack.Screen 
          options={{
            title: "Review Market",
            headerShown: true,
          }} 
        />
        <View style={styles.container}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Progress Section */}
          <View style={styles.progressContainer}>
            <View style={styles.stepContainer}>
              <Text style={styles.purpleText}>Step 4 of 4</Text>
              <Text style={styles.stepTitle}>Final Review</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: '100%' }]} />
              </View>
            </View>
          </View>

          {/* Review Sections */}
          <View style={styles.reviewSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Market Title</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => router.push('/market-title')}>
                <FontAwesome5 name="pen" size={14} color="#8B5CF6" />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.contentText}>{marketData.title}</Text>
          </View>

          <View style={styles.reviewSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Description</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => router.push('/market-description')}>
                <FontAwesome5 name="pen" size={14} color="#8B5CF6" />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.contentText}>
              {marketData.description}
            </Text>
          </View>

          <View style={styles.reviewSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Outcomes</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => router.push('/market-outcomes')}>
                <FontAwesome5 name="pen" size={14} color="#8B5CF6" />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.outcomeItem}>
              <View style={styles.yesTag}>
                <Text style={styles.tagText}>Yes</Text>
              </View>
              <Text style={styles.contentText}>{marketData.metadata.yesDescription}</Text>
            </View>
            <View style={styles.outcomeItem}>
              <View style={styles.noTag}>
                <Text style={styles.tagText}>No</Text>
              </View>
              <Text style={styles.contentText}>{marketData.metadata.noDescription}</Text>
            </View>
            <Text style={styles.sourceText}>{marketData.metadata.source}</Text>
          </View>

          {/* Ready to Launch Card */}
          <View style={styles.launchCard}>
            <View style={styles.launchIconContainer}>
              <FontAwesome5 name="rocket" size={20} color="#8B5CF6" />
            </View>
            <Text style={styles.launchTitle}>Ready to Launch?</Text>
            <Text style={styles.launchDescription}>
              Once submitted, your market will be reviewed by our team before going live.
            </Text>
          </View>

          {/* Bottom Buttons */}
          <View style={styles.bottomButtons}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack} disabled={loading}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            {loading ? (
              <ActivityIndicator size="large" color="#8B5CF6" style={{ marginVertical: 16 }} />
            ) : (
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit Market</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  progressContainer: {
    marginBottom: 24,
  },
  stepContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepText: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap: 4,
  },
  purpleText: {
    color: '#8B5CF6',
  },
  stepTitle: {
    color: '#FFFFFF',
  },
  progressBarContainer: {
    width: '100%',
    height: 4,
  },
  progressBarBackground: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1F2937',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 2,
  },
  reviewSection: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  editText: {
    color: '#8B5CF6',
    fontSize: 14,
  },
  contentText: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 20,
  },
  sourceText: {
    fontSize: 14,
    color: '#5C535F',
    lineHeight: 20,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    marginTop: 8,
  },
  outcomeItem: {
    marginTop: 8,
  },
  yesTag: {
    backgroundColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  noTag: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  launchCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  launchIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  launchTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  launchDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#8B5CF6',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
}); 