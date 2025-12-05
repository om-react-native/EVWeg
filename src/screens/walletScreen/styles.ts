import { verticalScale } from '@/theme/metrics';
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  
  // Sticky Header Styles
  stickyHeader: {
    position: 'absolute',
    top: verticalScale(30),
    left: 0,
    right: 0,
    zIndex: 1000,
    borderBottomWidth: 1,
    overflow: 'hidden',
  },
  stickyHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flex: 1,
  },
  stickyHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stickyLogoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stickyBalanceInfo: {
    flexDirection: 'column',
  },
  stickyBalanceLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  stickyBalanceAmount: {
    fontSize: 18,
    fontWeight: '700',
  },
  stickyAddButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  stickyAddButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  faqButton: {
    padding: 4,
  },

  // Balance Card Styles
  balanceCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
  },
  balanceCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoContainer: {
    
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  balanceInfo: {
    flexDirection: 'column',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  balanceLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  addCreditsButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  addCreditsText: {
    fontSize: 15,
    fontWeight: '600',
  },

  // Promotional Section Styles
  promotionalSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  promoCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  promoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  promoTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  promoTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  promoSubtitle: {
    fontSize: 13,
    fontWeight: '400',
  },
  promoButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  promoButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // Cashback Card Styles
  cashbackCard: {
    padding: 20,
  },
  cashbackContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cashbackLeft: {
    flex: 1,
    marginRight: 16,
  },
  cashbackBrand: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    opacity: 0.9,
  },
  cashbackTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  cashbackDescription: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
    opacity: 0.95,
  },
  cashbackRight: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cashbackIllustration: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cashbackEmoji: {
    fontSize: 28,
    position: 'absolute',
  },

  // History Section Styles
  historySection: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  historySectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },

  // Empty State Styles
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateImage: {
    width: width * 0.6,
    height: width * 0.6,
    marginBottom: 24,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
  },

  // History List Styles
  historyList: {
    marginTop: 8,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderBottomWidth: 1,
  },
  historyItemLeft: {
    flex: 1,
    marginRight: 12,
  },
  historyItemDescription: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  historyItemDate: {
    fontSize: 13,
    fontWeight: '400',
  },
  historyItemAmount: {
    fontSize: 16,
    fontWeight: '700',
  },

  // Bottom Padding
  bottomPadding: {
    height: 40,
  },
});

