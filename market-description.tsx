import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ViewStyle, TextStyle } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { useMarketCreation } from '@/context/MarketCreationContext';

interface StyleProps {
  container: ViewStyle;
  scrollView: ViewStyle;
  progressContainer: ViewStyle;
  stepContainer: ViewStyle;
  stepText: TextStyle;
  purpleText: TextStyle;
  progressBarContainer: ViewStyle;
  progressBarBackground: ViewStyle;
  progressBarFill: ViewStyle;
  heading: TextStyle;
  description: TextStyle;
  inputContainer: ViewStyle;
  label: TextStyle;
  required: TextStyle;
  input: ViewStyle & TextStyle;
  validationContainer: ViewStyle;
  validationText: TextStyle;
  validText: TextStyle;
  characterCount: TextStyle;
  tipsCard: ViewStyle;
  tipsTitle: TextStyle;
  tipItem: ViewStyle;
  tipText: TextStyle;
  uploadContainer: ViewStyle;
  uploadArea: ViewStyle;
  uploadText: TextStyle;
  chooseFileButton: ViewStyle;
  chooseFileText: TextStyle;
  bottomButtons: ViewStyle;
  backButton: ViewStyle;
  continueButton: ViewStyle;
  continueButtonDisabled: ViewStyle;
  backButtonText: TextStyle;
  continueButtonText: TextStyle;
  continueButtonTextDisabled: TextStyle;
}

/**
 * MarketDescriptionScreen component handles the market description input page.
 * It allows users to enter a description for their market listing and upload images.
 * The description must be between 50 and 1000 characters.
 */
export default function MarketDescriptionScreen() {
  const [description, setDescription] = useState<string>('');
  const router = useRouter();
  const { updateMarketData, marketData } = useMarketCreation();
  const isValidLength = description.length >= 50 && description.length <= 1000;

  useEffect(() => {
    if (marketData?.description) {
      setDescription(marketData.description);
    }
  }, []);

  const handleBack = (): void => {
    router.back();
  };

  const handleContinue = (): void => {
    if (isValidLength) {
      updateMarketData({ description });
      router.push('/market-outcomes');
    }
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
        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 24 }}
        >
          {/* Progress Section */}
          <View style={styles.progressContainer}>
            <View style={styles.stepContainer}>
              <Text style={styles.stepText}>
                <Text style={styles.purpleText}>Step 2 of 4</Text> • Market Description
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
          <Text style={styles.heading}>Market Description</Text>
          <Text style={styles.description}>
            Provide context or background for the prediction to help traders make informed decisions.
          </Text>

          {/* Input Section */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description<Text style={styles.required}> Required</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Enter market description"
              placeholderTextColor="#71717A"
              value={description}
              onChangeText={setDescription}
              multiline={true}
              numberOfLines={6}
              textAlignVertical="top"
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
              <Text style={styles.characterCount}>{description.length}/1000</Text>
            </View>
          </View>

          {/* Image Upload Section */}
          <View style={styles.uploadContainer}>
            <TouchableOpacity style={styles.uploadArea}>
              <Text style={styles.uploadText}>Drag and drop or click to upload images</Text>
              <TouchableOpacity style={styles.chooseFileButton}>
                <Text style={styles.chooseFileText}>Choose File</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          
          {/* Tips Section */}
          <View style={styles.tipsCard}>
            <Text style={styles.tipsTitle}>Tips for a great description:</Text>
            <View style={styles.tipItem}>
              <FontAwesome5 name="check" size={12} color="#10B981" />
              <Text style={styles.tipText}>Include relevant data sources</Text>
            </View>
            <View style={styles.tipItem}>
              <FontAwesome5 name="check" size={12} color="#10B981" />
              <Text style={styles.tipText}>Explain market resolution criteria</Text>
            </View>
            <View style={styles.tipItem}>
              <FontAwesome5 name="check" size={12} color="#10B981" />
              <Text style={styles.tipText}>Add supporting images or links</Text>
            </View>
          </View>

          {/* Bottom Buttons */}
          <View style={styles.bottomButtons}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Text style={styles.backButtonText}>Back</Text>
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
    width: '50%', // 2/4 steps completed
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
    height: 120,
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
  tipsCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 12,
    fontWeight: '500',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  uploadContainer: {
    flex: 1,
    marginBottom: 24,
  },
  uploadArea: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#3F3F46',
    borderStyle: 'dashed',
  },
  uploadText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  chooseFileButton: {
    backgroundColor: '#3F3F46',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  chooseFileText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: 12,
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
  continueButtonDisabled: {
    backgroundColor: '#3F3F46',
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
  continueButtonTextDisabled: {
    color: '#71717A',
  },
}); 