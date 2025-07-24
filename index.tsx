import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ConnectPiDialog from '@/components/ConnectPiDialog';
import ConnectWalletDialog from '@/components/ConnectWalletDialog';
import WalletConnectStatus from '@/components/WalletConnectStatus';
import WalletConnectionFailed from '@/components/WalletConnectionFailed';
import { useAuth } from '@/context/AuthContext';
import PiAuthWebView from '@/components/ui/PiAuthWebView';
import { logger } from '@/utils';

export default function LandingScreen() {
  const router = useRouter();
  const [showPiDialog, setShowPiDialog] = useState(false);
  const [showWalletDialog, setShowWalletDialog] = useState(false);
  const [showWalletConfirm, setShowWalletConfirm] = useState(false);
  const [showWalletConnectionFailed, setShowWalletConnectionFailed] = useState(false);

  // auth with pi block
  const [showPiAuth, setShowPiAuth] = useState(false);
  const { loginWithPi } = useAuth();

  const handlePiAuthSuccess = async (userInfo: { uid: string; accessToken: string; username: string; wallet_address: string }) => {
    try {
      logger('handlePiAuthSuccess', userInfo);
      await loginWithPi(userInfo.accessToken);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Failed to authenticate with Pi Wallet');
    }
  };


  const handlePiNetworkSignIn = () => {
    setShowPiDialog(true);
  };

  const handleConnectPi = () => {
    setShowPiDialog(false);
    // setShowWalletConfirm(true)
    setShowPiAuth(true);
  };

  const handleWalletConfirm = () => {
    setShowWalletDialog(false);
    // setShowWalletConfirm(true);
    setShowPiAuth(true);
  };

  const handleConfirm = (isContinue: boolean) => {
    setShowWalletConfirm(false);
    if (isContinue) {
      // router.push('/markets');
      setShowWalletConnectionFailed(true);
    }
  };

  const handleEmailSignIn = () => {
    router.push('/sign-in');
  };

  const handlePreviewMarkets = () => {
    router.push('/markets');
  };

  const handleHelp = () => {
    setShowWalletDialog(true);
  };

  const handleRetry = () => {
    setShowWalletConnectionFailed(false);
    setShowPiDialog(true);
  };

  const handleCancel = () => {
    setShowWalletConnectionFailed(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Welcome To Predict</Text><Text style={styles.highlight}>PiX</Text>
          
          <LinearGradient
            colors={['#8B5CF6', '#EC4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logoContainer}
          >
            <Ionicons name="trending-up" size={40} color="#FFFFFF" />
          </LinearGradient>

          <Text style={styles.subtitle}>Predict Smarter</Text>

          <View style={styles.chartContainer}>
            <Image
              source={require('../assets/images/chart.png')}
              style={styles.chartImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.description}>
            Get started by signing in or take a look at today's hottest markets.
          </Text>

          <TouchableOpacity
            style={styles.piNetworkButton}
            onPress={handlePiNetworkSignIn}
          >
            <Image
              source={require('../assets/images/pi-icon.png')}
              style={styles.piIcon}
              resizeMode="contain"
            />
            <Text style={styles.buttonText}>Sign In With Pi Network</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>Or Continue With</Text>

          <TouchableOpacity
            style={styles.emailButton}
            onPress={handleEmailSignIn}
          >
            <Text style={styles.buttonText}>Sign In With Email</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.previewButton}
            onPress={handlePreviewMarkets}
          >
            <Text style={styles.previewButtonText}>Preview Markets</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

       {/*connect pi wallet 1 */}
      {showPiDialog && (<ConnectPiDialog
        visible={showPiDialog}
        onClose={() => setShowPiDialog(false)}
        onConnect={handleConnectPi}
        onHelp={handleHelp}
      />)}

      {/*help dialog from on help*/}
      {showWalletDialog && (<ConnectWalletDialog
        visible={showWalletDialog}
        onClose={() => setShowWalletDialog(false)}
        onOpenWallet={handleWalletConfirm}
      />)}

      {/*wallet connection status approval -> onsuccess 2*/}
      {showWalletConfirm && (<WalletConnectStatus
        visible={showWalletConfirm}
        onContinue={handleConfirm}
      />)}

      {/*failed to connect wallet 3*/}
      {showWalletConnectionFailed && (<WalletConnectionFailed
        visible={showWalletConnectionFailed}
        onRetry={handleRetry}
        onCancel={handleCancel}
      />)}

      {showPiAuth && <PiAuthWebView
        visible={showPiAuth}
        onClose={() => setShowPiAuth(false)}
        onSuccess={handlePiAuthSuccess}
      />}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  highlight: {
    color: '#8B5CF6',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 32,
  },
  chartContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#111827',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    overflow: 'hidden',
  },
  chartImage: {
    width: '100%',
    height: '100%',
  },
  description: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 24,
  },
  piNetworkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    marginBottom: 16,
    gap: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginVertical: 16,
  },
  emailButton: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  previewButton: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
  },
  previewButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  piIcon: {
    width: 24,
    height: 24,
  },
});