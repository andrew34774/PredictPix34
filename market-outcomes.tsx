import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useMarketCreation } from '@/context/MarketCreationContext';

export default function MarketOutcomesScreen() {
  const router = useRouter();
  const [yesOutcome, setYesOutcome] = useState('Yes');
  const [yesDescription, setYesDescription] = useState('');
  const [noOutcome, setNoOutcome] = useState('No');
  const [noDescription, setNoDescription] = useState('');
  const [resolutionSource, setResolutionSource] = useState('');
  const { updateMarketData, marketData } = useMarketCreation();

  useEffect(() => {
    if (marketData?.metadata?.yes) {
      setYesOutcome(marketData.metadata.yes);
    }
    if (marketData?.metadata?.yesDescription) {
      setYesDescription(marketData.metadata.yesDescription); 
    }
    if (marketData?.metadata?.no) {
      setNoOutcome(marketData.metadata.no);
    }
    if (marketData?.metadata?.noDescription) {
      setNoDescription(marketData.metadata.noDescription);
    }
    if (marketData?.metadata?.source) {
      setResolutionSource(marketData.metadata.source);
    }
  }, []);


  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    const now = new Date();
    updateMarketData({ 
      metadata: 
      { yes: yesOutcome, yesDescription, no: noOutcome, noDescription, source: resolutionSource },
      end_time: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 5).toISOString(), 
      resolution_time: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7).toISOString(),
      creator_fee_percentage: 1,
      platform_fee_percentage: 2,
    });
    router.push('/market-review');
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: "Create Market",
          headerShown: true,
        }} 
      />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Progress Section */}
          <View style={styles.progressContainer}>
            <View style={styles.stepContainer}>
              <Text style={styles.stepText}>
                <Text style={styles.purpleText}>Step 3 of 4</Text> • Market Creation
              </Text>
              <TouchableOpacity>
                <FontAwesome5 name="question-circle" size={16} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: '75%' }]} />
              </View>
            </View>
          </View>

          {/* Title Section */}
          <Text style={styles.heading}>Market Outcomes</Text>
          <Text style={styles.description}>
            Define the possible outcomes for your prediction market.
          </Text>

          {/* Yes Outcome Section */}
          <View style={styles.outcomeContainer}>
            <View style={styles.outcomeHeader}>
              <Text style={styles.outcomeTitle}>Yes Outcome</Text>
              <View style={styles.yesTag}>
                <Text style={styles.tagText}>Yes</Text>
              </View>
            </View>
            <TextInput
              style={styles.outcomeInput}
              value={yesOutcome}
              onChangeText={setYesOutcome}
              placeholder="Yes"
              placeholderTextColor="#71717A"
            />
            <TextInput
              style={styles.descriptionInput}
              value={yesDescription}
              onChangeText={setYesDescription}
              placeholder="Add description (optional)"
              placeholderTextColor="#71717A"
              multiline
            />
          </View>

          {/* No Outcome Section */}
          <View style={styles.outcomeContainer}>
            <View style={styles.outcomeHeader}>
              <Text style={styles.outcomeTitle}>No Outcome</Text>
              <View style={styles.noTag}>
                <Text style={styles.tagText}>No</Text>
              </View>
            </View>
            <TextInput
              style={styles.outcomeInput}
              value={noOutcome}
              onChangeText={setNoOutcome}
              placeholder="No"
              placeholderTextColor="#71717A"
            />
            <TextInput
              style={styles.descriptionInput}
              value={noDescription}
              onChangeText={setNoDescription}
              placeholder="Add description (optional)"
              placeholderTextColor="#71717A"
              multiline
            />
          </View>

          {/* Resolution Source Section */}
          <View style={styles.resolutionContainer}>
            <View style={styles.resolutionHeader}>
              <Text style={styles.resolutionTitle}>Resolution Source</Text>
              <FontAwesome5 name="info-circle" size={16} color="#9CA3AF" />
            </View>
            <Text style={styles.resolutionDescription}>
              Specify where the outcome will be verified
            </Text>
            <TextInput
              style={styles.resolutionInput}
              value={resolutionSource}
              onChangeText={setResolutionSource}
              placeholder="Enter URL or description of resolution source"
              placeholderTextColor="#71717A"
            />
          </View>

          {/* Bottom Buttons */}
          <View style={styles.bottomButtons}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
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
    fontSize: 14,
    color: '#FFFFFF',
  },
  purpleText: {
    color: '#8B5CF6',
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
  heading: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 24,
  },
  outcomeContainer: {
    marginBottom: 24,
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
  },
  outcomeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  outcomeTitle: {
    fontSize: 14,
    color: '#FFFFFF',
    marginRight: 8,
  },
  yesTag: {
    backgroundColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  noTag: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  outcomeInput: {
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 8,
  },
  descriptionInput: {
    backgroundColor: '#111827',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 14,
    height: 80,
  },
  resolutionContainer: {
    marginBottom: 24,
  },
  resolutionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resolutionTitle: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  resolutionDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
    marginBottom: 8,
  },
  resolutionInput: {
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 14,
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#1F2937',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  continueButton: {
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
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
}); 