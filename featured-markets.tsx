import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import MarketCard from '../components/MarketCard';
import { Market } from '@/types/models';
import marketsApi from '@/api/markets';
import BuyPosition from '@/components/BuyPosition';
import ConfirmPosition from '@/components/ConfirmPosition';
import predictionsApi from '@/api/predictions';
import { Colors } from '@/constants/Colors';

export default function FeaturedMarketsScreen(): JSX.Element {
  const router = useRouter();
  const [markets, setMarkets] = useState<Market[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [market, setMarket] = useState<Market | null>(null);

  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [isYesPosition, setIsYesPosition] = useState(true);

  const [amount, setAmount] = useState<string>('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [creatingPrediction, setCreatingPrediction] = useState(false);
  const transactionFee = 2.0;
  const potentialReturn = amount ? Number(amount) * 1.25 : 0;
  const totalCost = amount ? Number(amount) + transactionFee : 0;
  const currentProbability = ((market?.yes_pool || 0) / (market?.total_pool || 0)) * 100;

  useEffect(() => {
    fetchMarkets();
  }, []);

  const fetchMarkets = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await marketsApi.getMarkets({ status: 'active' });
      setMarkets(response);
    } catch (err) {
      setError('Failed to load markets. Please try again.');
      console.error('Error fetching markets:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyYes = (market: Market) => {
    if(market?.status != 'active') {
      Alert.alert('Error', 'Market is not active');
      return;
    }
    console.log('Buy Yes action triggered with amount:', amount);
    // TODO: Implement buy yes logic
    setMarket(market)
    setIsYesPosition(true);
    setShowBuyDialog(true);
  };

  const handleBuyNo = (market: Market) => {
    console.log('Buy No action triggered with amount:', amount, market);

    if(market?.status != 'active') {
      Alert.alert('Error', 'Market is not active');
      return;
    }
    // TODO: Implement buy no logic
    setMarket(market)
    setIsYesPosition(false);
    setShowBuyDialog(true);
  };

  const handleConfirm = (amount: number) => {
    setAmount(amount.toString());
    setShowBuyDialog(false);
    setShowConfirmDialog(true);
  };

  const handleConfirmPosition = () => {
    setShowConfirmDialog(false);
    setShowBuyDialog(false);

    if(!market?.id) {
      Alert.alert('Error', 'Market not found');
      return;
    }
    // TODO: Implement API call to buy position
    setCreatingPrediction(true);
    predictionsApi.placePrediction({
      market_id: market?.id || 0,
      amount: Number(amount),
      predicted_outcome: isYesPosition
    }).then((prediction) => {
      console.log('Prediction created:', prediction);
      setCreatingPrediction(false);
      router.push({
        pathname: '/purchase-status',
        params: {
          market: market.title,
          position: isYesPosition ? 'yes' : 'no',
          stakeAmount: Number(amount)?.toFixed(2),
          transactionFee: transactionFee?.toFixed(2),
          potentialProfit: potentialReturn?.toFixed(2),
        }
      });
    }).catch((error) => {
      console.error('Error creating prediction:', error);
      setCreatingPrediction(false);
      Alert.alert('Error', error.message || 'Failed to create prediction');
    });
  };  

  const handleHome = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.marketsContainer}>
          {markets?.map((market) => (
            <MarketCard
              key={market.id}
              market={market}
              onBuyYes={handleBuyYes}
              onBuyNo={handleBuyNo}
            />
          ))}
        </View>

        {creatingPrediction && (
          <View style={[styles.loadingOverlay, styles.centered]}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>Creating Prediction...</Text>
          </View>
        )}
        {showBuyDialog && market && <BuyPosition
          visible={showBuyDialog}
          onClose={() => setShowBuyDialog(false)}
          onConfirm={handleConfirm}
          isYesPosition={isYesPosition}
          market={market}
        />}

        {showConfirmDialog && market && <ConfirmPosition
          visible={showConfirmDialog}
          onClose={() => setShowConfirmDialog(false)}
          onConfirm={handleConfirmPosition}
          stake={Number(amount)}
          position={isYesPosition ? 'yes' : 'no'}
          potentialReturn={potentialReturn}
          transactionFee={transactionFee}
          totalCost={totalCost}
          market={market}
          isYesPosition={isYesPosition}
        />}
        
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.homeButton}
          onPress={handleHome}
        >
          <Text style={styles.homeButtonText}>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  marketsContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  bottomContainer: {
    padding: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#111827', 
  },
  homeButton: {
    backgroundColor: '#10B981',
    padding: 12,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingOverlay: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: 'bold',
  },
});
