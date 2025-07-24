import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function WithdrawPiScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState('0.00');
  const [address, setAddress] = useState('');
  const depositAddress = 'pi16q2r4e9×8w7v5t3y2u1i...';

  const handleBack = () => {
    router.back();
  };

  const handleMax = () => {
    setAmount('1234.56');
  };

  const handleCopy = () => {
    // Implement copy functionality
  };

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: true,
          headerTitle: "Withdraw Pi",
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => (
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#111827',
          },
        }} 
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>π 1,234.56</Text>
          <Text style={styles.balanceUsd}>≈ π 617.28 Units</Text>
        </View>

        {/* Deposit Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deposit Pi</Text>
          <View style={styles.depositAddressContainer}>
            <Text style={styles.inputLabel}>Your Deposit Address</Text>
            <View style={styles.addressRow}>
              <Text style={styles.addressText}>{depositAddress}</Text>
              <TouchableOpacity onPress={handleCopy} style={styles.copyButton}>
                <MaterialIcons name="content-copy" size={20} color="#9747FF" />
                <Text style={styles.copyText}>Copy</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.qrContainer}>
            {/* QR Code placeholder */}
            <View style={styles.qrCode} />
          </View>
          <Text style={styles.depositNote}>
            Send Pi via Mainnet to the address above. Deposits reflect within 1-3 minutes.
          </Text>
        </View>

        {/* Withdraw Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Withdraw Pi</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Destination Pi Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Pi address"
              placeholderTextColor="#6B7280"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Amount</Text>
            <View style={styles.amountInputContainer}>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor="#6B7280"
                value={amount}
                onChangeText={setAmount}
                keyboardType="decimal-pad"
              />
              <TouchableOpacity style={styles.maxButton} onPress={handleMax}>
                <Text style={styles.maxButtonText}>MAX</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.availableText}>Available: π 1,234.56</Text>
          </View>

          {/* Info Messages */}
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Ionicons name="information-circle-outline" size={20} color="#9747FF" />
              <Text style={styles.infoText}>No withdrawal fees</Text>
            </View>
            <View style={styles.infoItem}>
              <MaterialIcons name="warning" size={20} color="#F59E0B" />
              <Text style={styles.infoText}>Withdrawals are non-reversible</Text>
            </View>
          </View>

          {/* Confirm Button */}
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirm Withdrawal</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 16,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    marginLeft: 8,
  },
  balanceCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  balanceLabel: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 4,
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 4,
  },
  balanceUsd: {
    color: '#9747FF',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  depositAddressContainer: {
    marginBottom: 16,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 12,
  },
  addressText: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  copyText: {
    color: '#9747FF',
    fontSize: 14,
    fontWeight: '500',
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  qrCode: {
    width: 200,
    height: 200,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  depositNote: {
    color: '#9747FF',
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: 'rgba(151, 71, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 16,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 12,
  },
  amountInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
    padding: 0,
  },
  maxButton: {
    backgroundColor: 'rgba(151, 71, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  maxButtonText: {
    color: '#9747FF',
    fontSize: 12,
    fontWeight: '600',
  },
  availableText: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 4,
  },
  infoContainer: {
    gap: 8,
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1F2937',
    padding: 12,
    borderRadius: 8,
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  confirmButton: {
    backgroundColor: '#9747FF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 