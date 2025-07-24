import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams, Stack } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

interface PurchaseStatusParams {
  market?: string;
  position?: string;
  stakeAmount?: string;
  transactionFee?: string;
  potentialProfit?: string;
  userName?: string;
}

export default function PurchaseStatusScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<PurchaseStatusParams>();
  const {
    market = "Bitcoin $100k by 2025",
    position = "Yes @ 75%",
    stakeAmount = "100.00",
    transactionFee = "2.50",
    potentialProfit = "324.50",
    userName = "Alex Thompson"
  } = params;

  const handleViewPositions = () => {
    router.push('/portfolio');
  };

  const handleBackToMarkets = () => {
    router.push('/markets');
  };

  const handleShare = () => {
    // TODO: Implement share functionality
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/40' }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userName}>{userName}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Success Icon */}
        <View style={styles.successIcon}>
          <Ionicons name="checkmark" size={48} color="#FFFFFF" />
        </View>

        <Text style={styles.title}>Purchase Successful!</Text>
        <Text style={styles.subtitle}>Your position has been confirmed</Text>

        {/* Order Details */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Market</Text>
            <Text style={styles.detailValue}>{market}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Position</Text>
            <Text style={[styles.detailValue, styles.positionValue]}>{position}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Stake Amount</Text>
            <Text style={styles.detailValue}>π{stakeAmount}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Transaction Fee</Text>
            <Text style={styles.detailValue}>π{transactionFee}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Potential Profit</Text>
            <Text style={[styles.detailValue, styles.profitValue]}>+π{potentialProfit}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={handleViewPositions}
        >
          <Text style={styles.primaryButtonText}>View My Positions</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={handleBackToMarkets}
        >
          <Text style={styles.secondaryButtonText}>Back to Markets</Text>
        </TouchableOpacity>

        {/* Share Section */}
        <View style={styles.shareSection}>
          <Text style={styles.shareTitle}>Share your position</Text>
          <View style={styles.shareButtons}>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <FontAwesome5 name="telegram" size={24} color="#0088CC" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Ionicons name="link" size={24} color="#8B5CF6" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#9CA3AF',
    marginBottom: 32,
    textAlign: 'center',
  },
  detailsCard: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  detailValue: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  positionValue: {
    color: '#10B981',
  },
  profitValue: {
    color: '#10B981',
  },
  primaryButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  secondaryButton: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  shareSection: {
    alignItems: 'center',
  },
  shareTitle: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  shareButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  shareButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 