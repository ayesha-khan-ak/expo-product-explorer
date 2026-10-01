import * as Device from 'expo-device';
import { useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

const featuredProducts = [
 
  { id: 'headphones', name: 'Wireless Headphones', price: '$49.99', emoji: '🎧' },
  { id: 'backpack', name: 'Everyday Backpack', price: '$34.50', emoji: '🎒' },
  { id: 'mug', name: 'Ceramic Coffee Mug', price: '$12.00', emoji: '☕' },
];

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <ThemedView style={styles.heroSection}>
            <AnimatedIcon />
            <ThemedText type="title" style={styles.title}>
              Welcome to&nbsp;Expo
            </ThemedText>
          </ThemedView>

          <ThemedText type="code" style={styles.code}>
            get started
          </ThemedText>
          <ThemedText type="subtitle" style={styles.studentInfo}>
            Name: Ayesha Khan{'\n'}
            Roll No: i233037
          </ThemedText>

          <ThemedView style={styles.productsSection}>
            <ThemedView style={styles.productsHeading}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>
                Featured Products
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Cart: {cartCount}
              </ThemedText>
            </ThemedView>
            {featuredProducts.map((product) => (
              <ThemedView
                key={product.id}
                type="backgroundElement"
                style={styles.productCard}
              >
                <ThemedText accessibilityLabel={product.name} style={styles.productEmoji}>
                  {product.emoji}
                </ThemedText>
                <ThemedView style={styles.productDetails}>
                  <ThemedText type="smallBold">{product.name}</ThemedText>
                  <ThemedText themeColor="textSecondary">{product.price}</ThemedText>
                </ThemedView>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Add ${product.name} to cart`}
                  onPress={() => setCartCount((count) => count + 1)}
                  style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
                >
                  <ThemedText style={styles.addButtonText}>Add to Cart</ThemedText>
                </Pressable>
              </ThemedView>
            ))}
          </ThemedView>

          <ThemedView type="backgroundElement" style={styles.stepContainer}>
            <HintRow
              title="Try editing"
              hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
            />
            <HintRow title="Dev tools" hint={getDevMenuHint()} />
            <HintRow
              title="Fresh start"
              hint={<ThemedText type="code">npm run reset-project</ThemedText>}
            />
          </ThemedView>

          {Platform.OS === 'web' && <WebBadge />}
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'stretch',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  content: {
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: Spacing.four,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
    paddingVertical: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  studentInfo: {
  textAlign: 'center',
},
  code: {
    textTransform: 'uppercase',
  },
  productsSection: {
    alignSelf: 'stretch',
    gap: Spacing.two,
  },
  productsHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.one,
  },
  sectionTitle: {
    fontSize: 24,
    lineHeight: 30,
  },
  productCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Spacing.two,
  },
  productEmoji: {
    fontSize: 30,
  },
  productDetails: {
    flex: 1,
    gap: Spacing.one,
  },
  addButton: {
    backgroundColor: '#208AEF',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
  },
  addButtonPressed: {
    opacity: 0.75,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
