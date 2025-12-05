import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HelpCircle } from 'lucide-react-native';
import { useTheme, useThemeContext } from '@/theme/useTheme';
import { EVWegIcon } from '@/assets/svg/EVWegIcon';
import { noPaymentHistoryImage } from '@/assets/images';
import { styles } from './styles';

interface PaymentHistoryItem {
  id: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  date: string;
}

export const WalletScreen: React.FC = () => {
  const theme = useTheme();
  const { isDark } = useThemeContext();
  const scrollY = useRef(new Animated.Value(0)).current;

  // Mock data - replace with actual data from your API
  const [balance] = useState(0.0);
  const [paymentHistory] = useState<PaymentHistoryItem[]>([]);

  // Calculate safe header height including status bar
  const safeHeaderHeight = 80;

  // Animated header that sticks to top when scrolling
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, safeHeaderHeight],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp',
  });

  const balanceCardScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.85],
    extrapolate: 'clamp',
  });

  const balanceCardOpacity = scrollY.interpolate({
    inputRange: [0, 50, 100],
    outputRange: [1, 0.7, 0],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgrounds.card },
      ]}
      edges={['top']}
    >
      {/* Status Bar */}
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.backgrounds.card}
        translucent={false}
      />

      {/* Animated Sticky Header */}
      <Animated.View
        style={[
          styles.stickyHeader,
          {
            backgroundColor: theme.colors.backgrounds.card,
            borderBottomColor: theme.colors.borders.light,
            height: headerHeight,
            opacity: headerOpacity,
            ...theme.shadows.sm,
          },
        ]}
      >
        <View style={styles.stickyHeaderContent}>
          <View style={styles.stickyHeaderLeft}>
            <View style={styles.stickyLogoContainer}>
              <EVWegIcon width={30} height={30} />
            </View>
            <View style={styles.stickyBalanceInfo}>
              <Text
                style={[
                  styles.stickyBalanceLabel,
                  { color: theme.colors.text.tertiary },
                ]}
              >
                Balance
              </Text>
              <Text
                style={[
                  styles.stickyBalanceAmount,
                  { color: theme.colors.text.primary },
                ]}
              >
                ₹ {balance.toFixed(2)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.stickyAddButton,
              { backgroundColor: theme.colors.buttons.primary.background },
            ]}
          >
            <Text
              style={[
                styles.stickyAddButtonText,
                { color: theme.colors.buttons.primary.text },
              ]}
            >
              Add Credits
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Scrollable Content */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text
            style={[styles.headerTitle, { color: theme.colors.text.primary }]}
          >
            Wallet
          </Text>
          <TouchableOpacity style={styles.faqButton}>
            <HelpCircle size={24} color={theme.colors.primary[400]} />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <Animated.View
          style={[
            styles.balanceCard,
            {
              backgroundColor: theme.colors.backgrounds.primary,
              transform: [{ scale: balanceCardScale }],
              opacity: balanceCardOpacity,
              ...theme.shadows.md,
            },
          ]}
        >
          <View style={styles.balanceCardContent}>
            <View style={styles.balanceLeft}>
              <View style={[styles.logoContainer]}>
                <EVWegIcon width={50} height={50} />
              </View>
              <View style={styles.balanceInfo}>
                <Text
                  style={[
                    styles.balanceAmount,
                    { color: theme.colors.text.primary },
                  ]}
                >
                  ₹ {balance.toFixed(2)}
                </Text>
                <Text
                  style={[
                    styles.balanceLabel,
                    { color: theme.colors.text.secondary },
                  ]}
                >
                  Total Balance
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[
                styles.addCreditsButton,
                { backgroundColor: theme.colors.buttons.primary.background },
              ]}
            >
              <Text
                style={[
                  styles.addCreditsText,
                  { color: theme.colors.buttons.primary.text },
                ]}
              >
                Add Credits
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Promotional Cards */}
        <View style={styles.promotionalSection}>
          {/* Miles Promo Card */}
          <View
            style={[
              styles.promoCard,
              {
                backgroundColor: theme.colors.secondary[400],
                ...theme.shadows.md,
              },
            ]}
          >
            <View style={styles.promoContent}>
              <View style={styles.promoTextContainer}>
                <Text
                  style={[
                    styles.promoTitle,
                    { color: theme.colors.text.inverse },
                  ]}
                >
                  🚀 Buy EVWeg Miles to save more just at ₹149
                </Text>
                <Text
                  style={[
                    styles.promoSubtitle,
                    { color: theme.colors.text.inverse, opacity: 0.8 },
                  ]}
                >
                  Unlimited 10% Off On all charging sessions
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.promoButton,
                  {
                    backgroundColor: theme.colors.backgrounds.card,
                    borderColor: theme.colors.primary[400],
                  },
                ]}
              >
                <Text
                  style={[
                    styles.promoButtonText,
                    { color: theme.colors.text.primary },
                  ]}
                >
                  Buy Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Cashback Promo Card */}
          <View
            style={[
              styles.promoCard,
              styles.cashbackCard,
              {
                backgroundColor: theme.colors.primary[400],
                ...theme.shadows.md,
              },
            ]}
          >
            <View style={styles.cashbackContent}>
              <View style={styles.cashbackLeft}>
                <Text
                  style={[
                    styles.cashbackBrand,
                    { color: theme.colors.text.inverse },
                  ]}
                >
                  EVWeg × Partner
                </Text>
                <Text
                  style={[
                    styles.cashbackTitle,
                    { color: theme.colors.text.inverse },
                  ]}
                >
                  Get Upto ₹100 Cashback!
                </Text>
                <Text
                  style={[
                    styles.cashbackDescription,
                    { color: theme.colors.text.inverse },
                  ]}
                >
                  Recharge your EVWeg wallet with ₹499 or more & earn cashback
                  on your 1st, 3rd & 5th transaction each month.
                </Text>
              </View>
              <View style={styles.cashbackRight}>
                <View style={styles.cashbackIllustration}>
                  <Text style={styles.cashbackEmoji}>💰</Text>
                  <Text style={styles.cashbackEmoji}>✓</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Payment History Section */}
        <View style={styles.historySection}>
          <Text
            style={[
              styles.historySectionTitle,
              { color: theme.colors.text.primary },
            ]}
          >
            Payment History
          </Text>

          {paymentHistory.length === 0 ? (
            <View style={styles.emptyState}>
              <Image
                source={noPaymentHistoryImage}
                style={styles.emptyStateImage}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.emptyStateText,
                  { color: theme.colors.text.primary },
                ]}
              >
                No payment history found
              </Text>
            </View>
          ) : (
            <View style={styles.historyList}>
              {paymentHistory.map(item => (
                <View
                  key={item.id}
                  style={[
                    styles.historyItem,
                    {
                      backgroundColor: theme.colors.backgrounds.card,
                      borderBottomColor: theme.colors.borders.light,
                    },
                  ]}
                >
                  <View style={styles.historyItemLeft}>
                    <Text
                      style={[
                        styles.historyItemDescription,
                        { color: theme.colors.text.primary },
                      ]}
                    >
                      {item.description}
                    </Text>
                    <Text
                      style={[
                        styles.historyItemDate,
                        { color: theme.colors.text.tertiary },
                      ]}
                    >
                      {item.date}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.historyItemAmount,
                      {
                        color:
                          item.type === 'credit'
                            ? theme.colors.accent[800]
                            : theme.colors.text.primary,
                      },
                    ]}
                  >
                    {item.type === 'credit' ? '+' : '-'}₹
                    {item.amount.toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Bottom Padding */}
        <View style={styles.bottomPadding} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};
