import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

export default function MarketSubmittedScreen() {
  const router = useRouter();

  const handleCreateAnother = () => {
    router.push('/create-market');
  };

  const handleViewMarkets = () => {
    // Navigate to markets list
    console.log('Navigate to markets list');
    router.navigate('/markets');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Market Submitted</Text>

        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <FontAwesome5 name="check" size={32} color="#FFFFFF" />
        </View>

        {/* Status Message */}
        <Text style={styles.message}>
          Your prediction market is now pending review or activation.
        </Text>
        <Text style={styles.submessage}>
          Thanks for contributing to the PredictPIX marketplace. You'll start earning from trades once the market goes live.
        </Text>
        <Text style={styles.notification}>
          We'll notify you when it's active.
        </Text>

        {/* Status Info */}
        <View style={styles.statusContainer}>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Status</Text>
            <Text style={styles.statusValue}>Pending Review</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Submitted</Text>
            <Text style={styles.statusValue}>{new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleCreateAnother}
          >
            <Text style={styles.buttonText}>Create Another Market</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={handleViewMarkets}
          >
            <Text style={styles.buttonText}>View My Markets</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 400,
    alignSelf: 'center',
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 24,
    textAlign: 'center',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  message: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  submessage: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 20,
  },
  notification: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 32,
  },
  statusContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    marginBottom: 32,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  statusLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  statusValue: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    backgroundColor: '#8B5CF6',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
  },
  secondaryButton: {
    backgroundColor: '#8B5CF6',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
}); 