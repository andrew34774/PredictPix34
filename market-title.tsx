import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Stack, router } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useMarketCreation } from '@/context/MarketCreationContext';

export default function MarketTitleScreen() {
  const [title, setTitle] = useState('');
  const { updateMarketData, marketData } = useMarketCreation();

  useEffect(() => {
    if (marketData?.title) {
      setTitle(marketData.title);
    }
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    if (title.length < 10 || title.length > 100) {
      Alert.alert('Invalid Title', 'Title must be between 10 and 100 characters');
      return;
    }
    updateMarketData({ title });
    // Navigate to the market description screen
    router.push('/market-description');
  };

  const isValidLength = title.length >= 10 && title.length <= 100;

  return (
    <>
      <Stack.Screen 
        options={{
          title: "Create Market",
          headerShown: true,
        }} 
      />
      <View style={styles.container}>
        {/* Progress Section */}
        <View style={styles.progressContainer}>
          <View style={styles.stepContainer}>
            <Text style={styles.stepText}>
              <Text style={styles.purpleText}>Step 1 of 4</Text> • Market Title
            </Text>
            <TouchableOpacity>
              <FontAwesome5 name="question-circle" size={16} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <View style={styles.progressBarFill} />
            </View>
          </View>
        </View>

        {/* Title Section */}
        <Text style={styles.heading}>Market Title</Text>
        <Text style={styles.description}>
          Create a clear and specific title for your prediction market. Make it easy to understand and verify.
        </Text>

        {/* Input Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Market Title<Text style={styles.required}> Required</Text></Text>
          <TextInput
            style={styles.input}
            placeholder="Enter market title"
            placeholderTextColor="#71717A"
            value={title}
            onChangeText={setTitle}
          />
          <View style={styles.validationContainer}>
            <FontAwesome5 
              name={isValidLength ? "check-circle" : "exclamation-circle"} 
              size={14} 
              color={isValidLength ? "#10B981" : "#9CA3AF"} 
            />
            <Text style={[
              styles.validationText,
              isValidLength && styles.validText
            ]}>Valid length</Text>
            <Text style={styles.characterCount}>{title.length}/100</Text>
          </View>
        </View>

        {/* Requirements Section */}
        <View style={styles.requirementsCard}>
          <Text style={styles.requirementsTitle}>Title Requirements:</Text>
          <View style={styles.requirementItem}>
            <FontAwesome5 name="check" size={12} color="#10B981" />
            <Text style={styles.requirementText}>Minimum 10 characters</Text>
          </View>
          <View style={styles.requirementItem}>
            <FontAwesome5 name="check" size={12} color="#10B981" />
            <Text style={styles.requirementText}>Maximum 100 characters</Text>
          </View>
          <View style={styles.requirementItem}>
            <FontAwesome5 name="check" size={12} color="#10B981" />
            <Text style={styles.requirementText}>Clear and specific</Text>
          </View>
        </View>

        {/* Example Section */}
        <View style={styles.examplesCard}>
          <View style={styles.exampleHeader}>
            <Text style={styles.examplesTitle}>Example Titles:</Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreText}>See More</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.exampleItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.exampleText}>Will Bitcoin reach $100k by end of 2025?</Text>
          </View>
          <View style={styles.exampleItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.exampleText}>Will SpaceX launch Starship successfully in 2025?</Text>
          </View>
          <View style={styles.exampleItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.exampleText}>Will Tesla release a sub-$30k EV in 2025?</Text>
          </View>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleBack}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.continueButton,
              !isValidLength && styles.continueButtonDisabled
            ]} 
            onPress={handleContinue}
            disabled={!isValidLength}
          >
            <Text style={[
              styles.continueButtonText,
              !isValidLength && styles.continueButtonTextDisabled
            ]}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
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
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  required: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  input: {
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 8,
  },
  validationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  validationText: {
    fontSize: 12,
    color: '#9CA3AF',
    flex: 1,
  },
  validText: {
    color: '#10B981',
  },
  characterCount: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  requirementsCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  requirementsTitle: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 12,
    fontWeight: '500',
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  examplesCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    flex: 1,
  },
  exampleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  examplesTitle: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  seeMoreText: {
    fontSize: 14,
    color: '#8B5CF6',
  },
  exampleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8B5CF6',
  },
  exampleText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  cancelButton: {
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
  continueButtonDisabled: {
    backgroundColor: '#3F3F46',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  continueButtonTextDisabled: {
    color: '#71717A',
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
    width: '25%', // 1/4 steps completed
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 2,
  },
}); 