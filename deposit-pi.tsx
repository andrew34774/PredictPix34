import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function DepositPiScreen() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleCopy = () => {
    // TODO: Implement copy address to clipboard
    console.log('Copy address to clipboard');
  };

  const handleShare = () => {
    // TODO: Implement share address
    console.log('Share address');
  };

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: true,
          headerTitle: "Deposit Pi",
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
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>π 1,234.56</Text>
          <Text style={styles.balanceUsd}>≈ π 617.28 Units</Text>
        </View>

        {/* Deposit Address Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Deposit Address</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.actionButton} onPress={handleCopy}>
                <Ionicons name="copy-outline" size={20} color="#9747FF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                <Ionicons name="share-social-outline" size={20} color="#9747FF" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.addressContainer}>
            <Text style={styles.addressText}>
              pi16q2r4e9×8w7v5t3y2u1i0p9o8i7u6y5t4r3e2w1q
            </Text>
          </View>
        
          <View style={styles.qrCodeContainer}>
            <Image
                source={require('../assets/images/qr-code.png')}
                style={styles.qrCode}
            />
          </View>

          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={20} color="#9747FF" />
            <Text style={styles.infoText}>
              Send Pi via Mainnet to the address above. Deposits reflect within 1-3 minutes.
            </Text>
          </View>

          {/* Security Tips */}
          <View style={styles.securityTips}>
            <View style={styles.securityHeader}>
              <MaterialIcons name="security" size={20} color="#9747FF" />
              <Text style={styles.securityTitle}>Security Tips</Text>
            </View>
            <View style={styles.tipItem}>
              <MaterialIcons name="check-circle" size={16} color="#6B7280" />
              <Text style={styles.tipText}>Double check the address before sending</Text>
            </View>
            <View style={styles.tipItem}>
              <MaterialIcons name="check-circle" size={16} color="#6B7280" />
              <Text style={styles.tipText}>Only send Pi through Mainnet</Text>
            </View>
          </View>
        </View>

        {/* Recent Deposits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Deposits</Text>
          <View style={styles.depositItem}>
            <View style={styles.depositInfo}>
              <View style={styles.iconContainer}>
                <Ionicons name="arrow-down" size={20} color="#10B981" />
              </View>
              <View>
                <Text style={styles.depositStatus}>Received</Text>
                <Text style={styles.depositTime}>2 hours ago</Text>
              </View>
            </View>
            <Text style={styles.depositAmount}>+π 50.00</Text>
          </View>
          <View style={styles.depositItem}>
            <View style={styles.depositInfo}>
              <View style={styles.iconContainer}>
                <Ionicons name="arrow-down" size={20} color="#10B981" />
              </View>
              <View>
                <Text style={styles.depositStatus}>Received</Text>
                <Text style={styles.depositTime}>Yesterday</Text>
              </View>
            </View>
            <Text style={styles.depositAmount}>+π 100.00</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#111827',
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
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  balanceLabel: {
    color: '#9CA3AF',
    fontSize: 14,
    marginBottom: 8,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(151, 71, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  addressText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'monospace',
  },
  qrCodeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrCode: {
    width: '200px',
    height: '200px',
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 16,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(151, 71, 255, 0.1)',
    borderRadius: 12,
    padding: 12,
    gap: 12,
    marginBottom: 16,
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 14,
    flex: 1,
  },
  securityTips: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  securityTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  tipText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  depositItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  depositInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  depositStatus: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  depositTime: {
    color: '#6B7280',
    fontSize: 12,
  },
  depositAmount: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '600',
  },
}); 