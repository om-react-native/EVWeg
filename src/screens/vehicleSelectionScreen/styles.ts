import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 24,
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 16,
  },
  brandTabsContainer: {
    marginBottom: 4,
    paddingVertical: 0,
  },
  brandTabsScroll: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  brandTab: {
    paddingHorizontal: 16,
    paddingVertical: 0,
    marginRight: 20,
  },
  brandTabText: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 18,
    paddingBottom: 6,
  },
  brandTabActive: {
    borderBottomWidth: 3,
    paddingBottom: 0,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  vehicleGrid: {
    paddingHorizontal: 24,
    paddingBottom: 130,
  },
  vehicleCard: {
    width: '48%', // ensure two equal-width columns
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  vehicleCardSelected: {
    borderWidth: 2,
  },
  vehicleImage: {
    width: '100%',
    height: 110,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#F0F0F0',
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  addVehicleButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
    borderTopWidth: 1,
  },
  addVehicleButtonContent: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addVehicleButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  addVehicleButtonDisabled: {
    opacity: 0.5,
  },
});

