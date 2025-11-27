import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { useTheme } from '@/theme/useTheme';
import { EVWegLogo } from '@/assets/svg';
import { carImage, petrolImage, cashImage } from '@/assets/images';
import { styles } from './styles';

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Onboarding'
>;

type Slide = {
  key: string;
  title: string;
  description: string;
  image: any;
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const AUTO_SCROLL_DURATION = 5000; // ms per slide

const SLIDES: Slide[] = [
  {
    key: 'discover',
    title: 'Discover',
    description:
      'Find nearby charging stations on the map and pick the one that fits your route and needs.',
    image: carImage,
  },
  {
    key: 'charge',
    title: 'Charge',
    description:
      'Reach the charger and start charging your EV. Monitor your charging session in real time.',
    image: petrolImage,
  },
  {
    key: 'pay',
    title: 'Pay',
    description:
      'Add money to your EVWeg wallet and pay for charging quickly and securely, without any hassle.',
    image: cashImage,
  },
];

export const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<Slide>>(null);
  const progress = useRef(new Animated.Value(0)).current;
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  const markOnboardingSeen = useCallback(async () => {
    try {
      await AsyncStorage.setItem('@evwegapp:has_seen_onboarding', 'true');
    } catch (error) {
      console.warn('Failed to save onboarding state', error);
    }
  }, []);

  const handleCompleteOnboarding = useCallback(async () => {
    await markOnboardingSeen();
    navigation.replace('Login');
  }, [markOnboardingSeen, navigation]);

  const handleSkip = useCallback(async () => {
    await handleCompleteOnboarding();
  }, [handleCompleteOnboarding]);

  const handleUserInteractionStart = useCallback(() => {
    if (isPaused) {
      return;
    }
    setIsPaused(true);
    if (animationRef.current) {
      animationRef.current.stop();
    }
  }, [isPaused]);

  const handleUserInteractionEnd = useCallback(() => {
    if (!isPaused) {
      return;
    }
    setIsPaused(false);
  }, [isPaused]);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, layoutMeasurement } = event.nativeEvent;
      const newIndex = Math.round(contentOffset.x / layoutMeasurement.width);
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    },
    [currentIndex],
  );

  const handlePrimaryButtonPress = useCallback(() => {
    // User chose to continue to the app; finish onboarding and go to Login
    handleCompleteOnboarding();
  }, [handleCompleteOnboarding]);

  // Auto advance with progress indicator (only between slides, not into Login)
  useEffect(() => {
    if (isPaused) {
      // Don't advance while user is interacting
      return;
    }

    // On the last slide, keep the bar filled and don't auto-navigate
    if (currentIndex === SLIDES.length - 1) {
      progress.setValue(1);
      return;
    }

    progress.setValue(0);
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: AUTO_SCROLL_DURATION,
      useNativeDriver: false,
    });
    animationRef.current = animation;

    animation.start(({ finished }) => {
      if (finished && !isPaused && currentIndex < SLIDES.length - 1) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
      }
    });

    return () => {
      animation.stop();
    };
  }, [currentIndex, isPaused, progress]);

  const renderItem = ({ item }: { item: Slide }) => (
    <View style={[styles.slide, { width: SCREEN_WIDTH }]}>
      <View style={[styles.illustrationContainer]}>
        <Image
          source={item.image}
          style={styles.illustrationImage}
          resizeMode="contain"
        />
      </View>
      <Text style={[styles.slideTitle, { color: theme.colors.text.primary }]}>
        {item.title}
      </Text>
      <Text
        style={[
          styles.slideDescription,
          { color: theme.colors.text.secondary },
        ]}
      >
        {item.description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: theme.colors.backgrounds.primary },
      ]}
    >
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipPill}>
          <Text
            style={[
              styles.skipPillText,
              { color: theme.colors.text.secondary },
            ]}
          >
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <EVWegLogo width={180} height={54} variant="light" />
      </View>

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={item => item.key}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onScrollBeginDrag={handleUserInteractionStart}
        onScrollEndDrag={handleUserInteractionEnd}
        onMomentumScrollEnd={handleUserInteractionEnd}
        onTouchStart={handleUserInteractionStart}
        onTouchEnd={handleUserInteractionEnd}
        scrollEventThrottle={16}
        bounces={false}
      />

      <View style={styles.footer}>
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
                backgroundColor: theme.colors.primary[400],
              },
            ]}
          />
        </View>
        <View style={styles.dotsContainer}>
          {SLIDES.map((slide, index) => {
            const isActive = index === currentIndex;
            return (
              <View
                key={slide.key}
                style={[
                  styles.dot,
                  {
                    backgroundColor: isActive
                      ? theme.colors.primary[400]
                      : theme.colors.borders.light,
                  },
                ]}
              />
            );
          })}
        </View>

        <TouchableOpacity
          style={[
            styles.primaryButton,
            { backgroundColor: theme.colors.buttons.primary.background },
          ]}
          onPress={handlePrimaryButtonPress}
        >
          <Text
            style={[
              styles.primaryButtonText,
              { color: theme.colors.buttons.primary.text },
            ]}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
