import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { useMarketCreation } from '@/context/MarketCreationContext';

export type TierType = 'basic' | 'trusted' | 'partner';

export default function CreateMarketScreen() {
  const router = useRouter();
  const { updateMarketData } = useMarketCreation();
  const [selectedTier, setSelectedTier] = useState<TierType | null>(null);

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    if (selectedTier) {
      updateMarketData({ tier: selectedTier });
      router.push('/market-title');
    }
  };

  const handleSelectTier = (tier: TierType) => {
    setSelectedTier(tier);
    console.log('Selected tier:', tier);
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: "Choose Your Market Tier",
          headerShown: true,
        }} 
      />
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <Text style={styles.description}>
          Select a tier to create your market. Higher tiers earn you more from market fees and attract greater visibility.
        </Text>
          {/* Basic Tier */}
          <View style={[
            styles.tierCard,
            selectedTier === 'basic' && styles.tierCardSelected
          ]}>
            <View style={styles.tierHeader}>
              <Text style={styles.tierTitle}>Basic Tier</Text>
              <View style={styles.pointsContainer}>
                <Text style={styles.pointsText}>5</Text>
              </View>
            </View>
            <Text style={styles.tierDescription}>Good for quick predictions</Text>
            <TouchableOpacity 
              style={styles.selectButton}
              onPress={() => handleSelectTier('basic')}
            >
              <Text style={styles.selectButtonText}>Select Basic</Text>
            </TouchableOpacity>
          </View>

          {/* Trusted Tier */}
          <View style={[
            styles.tierCard,
            selectedTier === 'trusted' && styles.tierCardSelected
          ]}>
            <View style={styles.tierHeader}>
              <Text style={styles.tierTitle}>Trusted Tier</Text>
              <View style={styles.pointsContainer}>
                <Text style={styles.pointsText}>20</Text>
              </View>
            </View>
            <Text style={styles.tierDescription}>Maximum exposure and earnings</Text>
            <View style={styles.profitShareContainer}>
              <FontAwesome5 name="chart-line" size={14} color="#8B5CF6" />
              <Text style={styles.profitShareText}>18% Creator Reward Share</Text>
            </View>
            <TouchableOpacity 
              style={styles.selectButton}
              onPress={() => handleSelectTier('trusted')}
            >
              <Text style={styles.selectButtonText}>Select Trusted</Text>
            </TouchableOpacity>
          </View>

          {/* Partner Tier */}
          <View style={[
            styles.tierCard,
            selectedTier === 'partner' && styles.tierCardSelected
          ]}>
            <View style={styles.tierHeader}>
              <Text style={styles.tierTitle}>Partner Tier</Text>
              <View style={styles.pointsContainer}>
                <Text style={styles.pointsText}>50</Text>
              </View>
            </View>
            <Text style={styles.tierDescription}>Maximum exposure and earnings</Text>
            <View style={styles.profitShareContainer}>
              <FontAwesome5 name="chart-line" size={14} color="#8B5CF6" />
              <Text style={styles.profitShareText}>26.5% Creator Reward Share</Text>
            </View>
            <TouchableOpacity 
              style={styles.selectButton}
              onPress={() => handleSelectTier('partner')}
            >
              <Text style={styles.selectButtonText}>Select Partner</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom Buttons */}
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleBack}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.continueButton,
              !selectedTier && styles.continueButtonDisabled
            ]} 
            onPress={handleContinue}
            disabled={!selectedTier}
          >
            <Text style={[
              styles.continueButtonText,
              !selectedTier && styles.continueButtonTextDisabled
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
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  description: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 24,
    textAlign: 'center',
  },
  tierCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  tierCardSelected: {
    borderColor: '#8B5CF6',
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tierTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  pointsContainer: {
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    borderRadius: 12,
    padding: 4,
    minWidth: 28,
    alignItems: 'center',
  },
  pointsText: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '600',
  },
  tierDescription: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  profitShareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  profitShareText: {
    color: '#8B5CF6',
    fontSize: 14,
    fontWeight: '500',
  },
  selectButton: {
    backgroundColor: '#374151',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  bottomButtons: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
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
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  continueButtonTextDisabled: {
    color: '#71717A',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
}); 