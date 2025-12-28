# React Native v0.82.0

React Native is a framework for building native mobile applications using React. It allows developers to write JavaScript/TypeScript code that compiles to truly native iOS and Android components, providing full access to native platform APIs while maintaining React's declarative component model. The framework uses a bridge architecture to communicate between JavaScript and native code, enabling hot reloading during development and native performance in production.

This version (0.82.0) includes comprehensive support for core UI components (View, Text, Image, ScrollView, FlatList), styling with flexbox, animations, gesture handling, platform-specific APIs, and native module integration. It targets iOS 15.1+ and Android 7.0+ (API 24), supporting development on Windows, macOS, and Linux. The package includes TypeScript definitions, integrates with Metro bundler for JavaScript packaging, and requires React 19.1+ and Node.js 22.14.0+.

## Core Components

### View Component

The fundamental container component for building UIs with flexbox layout, styling, touch handling, and accessibility support.

```jsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome</Text>
      </View>
      <View style={styles.content}>
        <Text>Content goes here</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
});

export default App;
```

### Text Component

Displays text content with styling, nested text support, and touch handling.

```jsx
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

const TextExample = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Styled Text</Text>
      <Text style={styles.body}>
        This is regular text with <Text style={styles.bold}>bold</Text> and{' '}
        <Text style={styles.italic}>italic</Text> sections.
      </Text>
      <Text
        style={styles.link}
        onPress={() => console.log('Text pressed')}
        numberOfLines={2}
        ellipsizeMode="tail">
        This is a long text that will be truncated after two lines with an
        ellipsis at the end to indicate there is more content available.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});

export default TextExample;
```

### Button Component

Platform-styled button with press handling and accessibility support.

```jsx
import React from 'react';
import {Button, View, Alert, StyleSheet} from 'react-native';

const ButtonExample = () => {
  const handlePress = () => {
    Alert.alert('Button Pressed', 'You pressed the button!');
  };

  return (
    <View style={styles.container}>
      <Button
        title="Press Me"
        onPress={handlePress}
        color="#841584"
        accessibilityLabel="Press me button"
      />
      <View style={styles.separator} />
      <Button
        title="Disabled Button"
        onPress={() => {}}
        disabled={true}
        accessibilityLabel="Disabled button example"
      />
      <View style={styles.separator} />
      <Button
        title="Primary Action"
        onPress={() => console.log('Primary action')}
        color="#007AFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  separator: {
    marginVertical: 8,
  },
});

export default ButtonExample;
```

### FlatList Component

High-performance scrollable list for rendering large datasets with item recycling.

```jsx
import React, {useState} from 'react';
import {FlatList, Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const DATA = Array.from({length: 100}, (_, i) => ({
  id: String(i),
  title: `Item ${i + 1}`,
  description: `Description for item ${i + 1}`,
}));

const FlatListExample = () => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({item, index}) => {
    const isSelected = item.id === selectedId;
    return (
      <TouchableOpacity
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => setSelectedId(item.id)}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </TouchableOpacity>
    );
  };

  const renderSeparator = () => <View style={styles.separator} />;

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>My List</Text>
    </View>
  );

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      ItemSeparatorComponent={renderSeparator}
      ListHeaderComponent={renderHeader}
      initialNumToRender={10}
      maxToRenderPerBatch={10}
      windowSize={5}
      getItemLayout={(data, index) => ({
        length: 80,
        offset: 80 * index,
        index,
      })}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
    backgroundColor: '#fff',
  },
  selectedItem: {
    backgroundColor: '#e8f4fd',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  header: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default FlatListExample;
```

### Image Component

Displays images from various sources with resizing and loading states.

```jsx
import React, {useState} from 'react';
import {Image, View, StyleSheet, Text, ActivityIndicator} from 'react-native';

const ImageExample = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <View style={styles.container}>
      {/* Local image */}
      <Image
        source={require('./assets/logo.png')}
        style={styles.localImage}
        resizeMode="contain"
      />

      {/* Remote image with loading state */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
            headers: {Authorization: 'Bearer token'},
          }}
          style={styles.remoteImage}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
          resizeMode="cover"
        />
        {loading && (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color="#007AFF"
          />
        )}
        {error && <Text style={styles.error}>Failed to load image</Text>}
      </View>

      {/* Image with custom dimensions */}
      <Image
        source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        style={{width: 100, height: 100, borderRadius: 50}}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  localImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  imageContainer: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  remoteImage: {
    width: '100%',
    height: '100%',
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
});

export default ImageExample;
```

### TextInput Component

Input field for text entry with validation and event handling.

```jsx
import React, {useState} from 'react';
import {TextInput, View, Text, StyleSheet, Platform} from 'react-native';

const TextInputExample = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [multiline, setMultiline] = useState('');
  const [focused, setFocused] = useState(false);

  const validateEmail = text => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[
          styles.input,
          !validateEmail(email) && email.length > 0 && styles.inputError,
        ]}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry={true}
        maxLength={50}
      />

      <Text style={styles.label}>Comments</Text>
      <TextInput
        style={[styles.input, styles.multiline, focused && styles.inputFocused]}
        value={multiline}
        onChangeText={setMultiline}
        placeholder="Enter your comments"
        multiline={true}
        numberOfLines={4}
        textAlignVertical="top"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onSubmitEditing={() => console.log('Submit pressed')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputFocused: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  inputError: {
    borderColor: 'red',
  },
  multiline: {
    height: 100,
    paddingTop: 12,
  },
});

export default TextInputExample;
```

### ScrollView Component

Scrollable container for content that exceeds screen dimensions.

```jsx
import React from 'react';
import {ScrollView, View, Text, StyleSheet, Image} from 'react-native';

const ScrollViewExample = () => {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={true}
      bounces={true}
      scrollEventThrottle={16}
      onScroll={event => {
        console.log('Scroll offset:', event.nativeEvent.contentOffset.y);
      }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Scrollable Content</Text>
      </View>

      {Array.from({length: 20}, (_, i) => (
        <View key={i} style={styles.section}>
          <Text style={styles.sectionTitle}>Section {i + 1}</Text>
          <Text style={styles.sectionContent}>
            This is the content for section {i + 1}. Scroll down to see more
            sections.
          </Text>
        </View>
      ))}

      <View style={styles.footer}>
        <Text>End of content</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
});

export default ScrollViewExample;
```

## Styling System

### StyleSheet API

Create optimized styles with validation and performance benefits.

```jsx
import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

const StyleSheetExample = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.boxShadow]}>
        <Text style={styles.text}>Styled Box</Text>
      </View>

      <View style={[styles.box, styles.primaryBox]}>
        <Text style={[styles.text, styles.whiteText]}>Primary Box</Text>
      </View>

      <View style={[styles.box, {backgroundColor: '#ff6b6b'}]}>
        <Text style={styles.text}>Inline Style Merge</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  box: {
    padding: 20,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  boxShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  primaryBox: {
    backgroundColor: '#007AFF',
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  whiteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

// Get absolute pixel values
const HAIRLINE_WIDTH = StyleSheet.hairlineWidth; // Thinnest line possible
const FLATTENED_STYLE = StyleSheet.flatten([styles.box, styles.primaryBox]);

export default StyleSheetExample;
```

### Flexbox Layout

Layout system for responsive component positioning.

```jsx
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const FlexboxExample = () => {
  return (
    <View style={styles.container}>
      {/* Row layout */}
      <View style={styles.row}>
        <View style={[styles.box, styles.box1]}>
          <Text>1</Text>
        </View>
        <View style={[styles.box, styles.box2]}>
          <Text>2</Text>
        </View>
        <View style={[styles.box, styles.box3]}>
          <Text>3</Text>
        </View>
      </View>

      {/* Column layout with flex */}
      <View style={styles.column}>
        <View style={[styles.flexBox, {flex: 1, backgroundColor: '#ffcccc'}]}>
          <Text>flex: 1</Text>
        </View>
        <View style={[styles.flexBox, {flex: 2, backgroundColor: '#ccffcc'}]}>
          <Text>flex: 2</Text>
        </View>
        <View style={[styles.flexBox, {flex: 1, backgroundColor: '#ccccff'}]}>
          <Text>flex: 1</Text>
        </View>
      </View>

      {/* Alignment */}
      <View style={styles.alignmentContainer}>
        <View style={[styles.smallBox, styles.centered]}>
          <Text>Centered</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  column: {
    flexDirection: 'column',
    height: 200,
    marginBottom: 10,
  },
  box: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box1: {
    backgroundColor: '#ffcccc',
  },
  box2: {
    backgroundColor: '#ccffcc',
  },
  box3: {
    backgroundColor: '#ccccff',
  },
  flexBox: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  alignmentContainer: {
    height: 100,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallBox: {
    width: 80,
    height: 80,
    backgroundColor: '#007AFF',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FlexboxExample;
```

## Animation System

### Animated API

Create smooth animations with native driver support.

```jsx
import React, {useRef, useEffect} from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Easing,
} from 'react-native';

const AnimatedExample = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Fade in on mount
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Slide in from left
    Animated.spring(slideAnim, {
      toValue: 0,
      friction: 8,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePulse = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSpin = () => {
    rotateAnim.setValue(0);
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, {opacity: fadeAnim}]}>
        <Text>Faded In</Text>
      </Animated.View>

      <Animated.View
        style={[styles.box, {transform: [{translateX: slideAnim}]}]}>
        <Text>Slid In</Text>
      </Animated.View>

      <TouchableOpacity onPress={handlePulse}>
        <Animated.View style={[styles.box, {transform: [{scale: scaleAnim}]}]}>
          <Text>Tap to Pulse</Text>
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSpin}>
        <Animated.View style={[styles.box, {transform: [{rotate: spin}]}]}>
          <Text>Tap to Spin</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default AnimatedExample;
```

### Animated Timing Functions

Control animation curves with easing functions.

```jsx
import React, {useRef} from 'react';
import {
  Animated,
  View,
  Button,
  StyleSheet,
  Easing,
  Text,
} from 'react-native';

const EasingExample = () => {
  const animations = {
    linear: useRef(new Animated.Value(0)).current,
    ease: useRef(new Animated.Value(0)).current,
    bounce: useRef(new Animated.Value(0)).current,
    elastic: useRef(new Animated.Value(0)).current,
  };

  const startAnimation = (anim, easing) => {
    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      duration: 1500,
      easing: easing,
      useNativeDriver: true,
    }).start();
  };

  const translateX = anim =>
    anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 200],
    });

  return (
    <View style={styles.container}>
      <View style={styles.animationRow}>
        <Text style={styles.label}>Linear:</Text>
        <Animated.View
          style={[
            styles.ball,
            {transform: [{translateX: translateX(animations.linear)}]},
          ]}
        />
        <Button
          title="Go"
          onPress={() => startAnimation(animations.linear, Easing.linear)}
        />
      </View>

      <View style={styles.animationRow}>
        <Text style={styles.label}>Ease:</Text>
        <Animated.View
          style={[
            styles.ball,
            {transform: [{translateX: translateX(animations.ease)}]},
          ]}
        />
        <Button
          title="Go"
          onPress={() => startAnimation(animations.ease, Easing.ease)}
        />
      </View>

      <View style={styles.animationRow}>
        <Text style={styles.label}>Bounce:</Text>
        <Animated.View
          style={[
            styles.ball,
            {transform: [{translateX: translateX(animations.bounce)}]},
          ]}
        />
        <Button
          title="Go"
          onPress={() => startAnimation(animations.bounce, Easing.bounce)}
        />
      </View>

      <View style={styles.animationRow}>
        <Text style={styles.label}>Elastic:</Text>
        <Animated.View
          style={[
            styles.ball,
            {transform: [{translateX: translateX(animations.elastic)}]},
          ]}
        />
        <Button
          title="Go"
          onPress={() => startAnimation(animations.elastic, Easing.elastic(2))}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-around',
  },
  animationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    width: 70,
    fontSize: 14,
  },
  ball: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    marginRight: 10,
  },
});

export default EasingExample;
```

## Platform APIs

### Platform Detection

Conditionally render or style based on platform.

```jsx
import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';

const PlatformExample = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current Platform: {Platform.OS}</Text>
      <Text style={styles.text}>Platform Version: {Platform.Version}</Text>

      {Platform.OS === 'ios' && (
        <Text style={styles.text}>iOS Specific Component</Text>
      )}

      {Platform.OS === 'android' && (
        <Text style={styles.text}>Android Specific Component</Text>
      )}

      <View style={styles.platformBox}>
        <Text>Platform-Specific Styling</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  platformBox: {
    padding: 20,
    marginTop: 20,
    ...Platform.select({
      ios: {
        backgroundColor: '#007AFF',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        backgroundColor: '#4CAF50',
        elevation: 5,
      },
      default: {
        backgroundColor: '#999',
      },
    }),
  },
});

export default PlatformExample;
```

### Dimensions API

Get screen and window dimensions dynamically.

```jsx
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const DimensionsExample = () => {
  const [dimensions, setDimensions] = useState({
    window: Dimensions.get('window'),
    screen: Dimensions.get('screen'),
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window, screen}) => {
      setDimensions({window, screen});
    });

    return () => subscription?.remove();
  }, []);

  const {width, height, scale, fontScale} = dimensions.window;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Window Dimensions</Text>
      <Text style={styles.text}>Width: {width.toFixed(2)}</Text>
      <Text style={styles.text}>Height: {height.toFixed(2)}</Text>
      <Text style={styles.text}>Scale: {scale}</Text>
      <Text style={styles.text}>Font Scale: {fontScale}</Text>

      <View style={[styles.box, {width: width * 0.8}]}>
        <Text>80% of screen width</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  box: {
    height: 100,
    backgroundColor: '#007AFF',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DimensionsExample;
```

### Alert API

Display native alert dialogs.

```jsx
import React from 'react';
import {View, Button, Alert, StyleSheet} from 'react-native';

const AlertExample = () => {
  const showSimpleAlert = () => {
    Alert.alert('Alert Title', 'This is a simple alert message.');
  };

  const showConfirmAlert = () => {
    Alert.alert(
      'Confirm Action',
      'Are you sure you want to proceed?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      {cancelable: false},
    );
  };

  const showThreeButtonAlert = () => {
    Alert.alert('Update Available', 'A new version is available. Update now?', [
      {
        text: 'Later',
        onPress: () => console.log('Later pressed'),
        style: 'cancel',
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel pressed'),
      },
      {
        text: 'Update',
        onPress: () => console.log('Update pressed'),
        style: 'default',
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Button title="Simple Alert" onPress={showSimpleAlert} />
      <View style={styles.separator} />
      <Button title="Confirm Alert" onPress={showConfirmAlert} />
      <View style={styles.separator} />
      <Button title="Three Button Alert" onPress={showThreeButtonAlert} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  separator: {
    marginVertical: 8,
  },
});

export default AlertExample;
```

## Application Setup

### AppRegistry

Entry point for registering and running React Native applications.

```jsx
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Register the main application component
AppRegistry.registerComponent(appName, () => App);

// Register a headless task (background task)
AppRegistry.registerHeadlessTask('BackgroundTask', () =>
  require('./BackgroundTask'),
);

// Run application programmatically
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('root'),
  initialProps: {
    theme: 'dark',
    locale: 'en-US',
  },
});

// Get registry information
const registry = AppRegistry.getRegistry();
console.log('Registered apps:', Object.keys(registry.runnables));
```

### Complete Application Example

Full application demonstrating component composition and navigation.

```jsx
// App.js
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';

const App = () => {
  const [items, setItems] = useState([
    {id: '1', title: 'Home', completed: false},
    {id: '2', title: 'Profile', completed: false},
    {id: '3', title: 'Settings', completed: true},
  ]);

  const toggleItem = id => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? {...item, completed: !item.completed} : item,
      ),
    );
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[styles.item, item.completed && styles.itemCompleted]}
      onPress={() => toggleItem(item.id)}>
      <Text style={[styles.itemText, item.completed && styles.itemTextCompleted]}>
        {item.title}
      </Text>
      <Text style={styles.checkmark}>{item.completed ? '✓' : ''}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My App</Text>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 60,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  listContent: {
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  itemCompleted: {
    backgroundColor: '#e8f5e9',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  itemTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  checkmark: {
    fontSize: 20,
    color: '#4CAF50',
  },
});

export default App;

// index.js
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

## Summary

React Native provides a comprehensive framework for building cross-platform mobile applications using React patterns. The framework excels at creating performant native mobile experiences while maintaining a single JavaScript codebase. Core components like View, Text, FlatList, and Image handle common UI needs, while the Animated API enables smooth 60fps animations. The styling system uses flexbox for layouts and provides platform-specific styling capabilities through StyleSheet.

Integration patterns typically involve composing core components into reusable custom components, managing state with React hooks or state management libraries, handling navigation with third-party libraries like React Navigation, and bridging to native modules when needed. The platform detection APIs enable conditional rendering and styling for iOS vs Android differences. Development workflow benefits from fast refresh, TypeScript support, and comprehensive debugging tools. Applications register through AppRegistry and can leverage native capabilities through the extensive API surface including camera, geolocation, push notifications, and more. Version 0.82.0 requires React 19.1+ and Node.js 22.14.0+, targets iOS 15.1+ and Android 7.0+ (API 24), and includes performance optimizations and modernized APIs.

### Installation and Setup

Source: https://docs.expo.dev/versions/v54.0.0/sdk/safe-area-context

Instructions for installing react-native-safe-area-context and initial setup. Includes npm installation command and required provider setup for proper functionality.

```APIDOC
## Installation

### NPM Installation

```bash
npx expo install react-native-safe-area-context
```

### Setup

1. Install the package using the command above.
2. For existing React Native apps, ensure you have `expo` installed in your project.
3. Add `SafeAreaProvider` to your app root:

```javascript
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return <SafeAreaProvider>...</SafeAreaProvider>;
}
```

### Available Exports

```javascript
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
```

### Supported Platforms
- Android
- iOS
- tvOS
- Web

### Bundled Version
- ~5.6.0
```

--------------------------------

### Installation and Setup

Source: https://docs.expo.dev/archive/classic-updates/updating-your-app

Setup instructions for integrating the expo-updates module into bare workflow React Native applications. Covers initial installation, boilerplate options, and hosting requirements for updates and assets on accessible servers.

```APIDOC
## Setup expo-updates Module

### Installation Options

#### Option 1: Use Boilerplate Project (Recommended)
Start with a project that has expo-updates pre-configured:
```
npx create-expo-app -t bare-minimum
```

#### Option 2: Install in Existing Bare Workflow App
Follow the official installation instructions for adding expo-updates to an existing bare workflow React Native project.

### Update Hosting Requirements

You must host your updates and assets on a server accessible to deployed client apps. Choose one of the following approaches:

#### Approach 1: expo export
- Creates prebuilt update packages
- Upload generated packages to any static hosting service (e.g., GitHub Pages)
- Manifests in `ios-index.json` and `android-index.json` satisfy expo-updates requirements

#### Approach 2: expo publish
- Packages and deploys updates to Expo's update service
- Automatically handles manifest generation and distribution
- Part of Expo's managed services

#### Approach 3: Custom Server
- Run your own update server
- Must conform to the protocol expected by expo-updates
- See manifest requirements documentation for protocol details

### Key Concepts

**Update Definition**: A single atomic update consisting of:
- JavaScript bundle
- Assets (images, fonts, etc.)
- Metadata about the update

**Benefits**:
- Deploy new JavaScript and assets to existing app builds
- No need to build and release new binaries
- Enable rapid iteration and bug fixes in production
```

--------------------------------

### Create a New Expo Module with Example Project (Terminal)

Source: https://docs.expo.dev/modules/get-started

Generate a new standalone Expo module along with an example application for testing, ideal for modules intended for reuse across multiple projects or publication to npm. The script interactively guides you through the setup process.

```shell
npx create-expo-module@latest my-module
```

--------------------------------

### Installation and Setup

Source: https://docs.expo.dev/versions/v52.0.0/sdk/brightness

Install the expo-brightness library and configure the necessary permissions for Android devices. This section covers the initial setup required to use the Brightness API in your project.

```APIDOC
## Installation and Configuration

### Installation
Install the expo-brightness package using npm:

```bash
npx expo install expo-brightness
```

If installing in an existing React Native app, also install expo:

```bash
npm install expo
```

### Android Configuration
For Android devices not using Continuous Native Generation (CNG), add the following permission to `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.WRITE_SETTINGS" />
```

### Import
```javascript
import * as Brightness from 'expo-brightness';
```
```

--------------------------------

### Installation & Setup

Source: https://docs.expo.dev/versions/v53.0.0/sdk/speech

Overview of the Speech module setup and configuration with installation instructions and basic usage patterns.

```APIDOC
## Installation & Usage

### Installation
The Speech module is available as part of the Expo SDK.

```bash
npm install expo-speech
```

### Basic Usage
```typescript
import * as Speech from 'expo-speech';

// Check available voices
const voices = await Speech.getAvailableVoicesAsync();

// Speak text
Speech.speak('Hello World', {
  language: 'en-US',
  pitch: 1.0,
  rate: 1.0
});

// Control playback
await Speech.isSpeakingAsync(); // Check if speaking
Speech.pause();                  // Pause speech
Speech.resume();                 // Resume speech
Speech.stop();                   // Stop speech
```

### Constants
- **maxSpeechInputLength** - Maximum length for text input in characters
```

--------------------------------

### Set up Local Expo Development Server with MCP

Source: https://docs.expo.dev/eas/ai/mcp

This series of commands guides you through setting up a local Expo development server with MCP capabilities. It involves navigating to your project directory, installing the `expo-mcp` package, authenticating with Expo CLI, and starting the server with the `EXPO_UNSTABLE_MCP_SERVER` environment variable set to enable MCP.

```bash
cd /path/to/your-project
# Install the expo-mcp package
npx expo install expo-mcp --dev
# Ensure you are logged in to Expo CLI with the same account as the one used to
# authenticate with the MCP server
npx expo whoami || npx expo login
# Start the dev server with MCP capabilities
EXPO_UNSTABLE_MCP_SERVER=1 npx expo start
```

--------------------------------

### Create Expo Project Setup Commands

Source: https://docs.expo.dev/eas/workflows/get-started

Initialize a new Expo project and set up EAS configuration. These commands create a new Expo app, initialize EAS, and set up the eas.json configuration file required for EAS Workflows.

```bash
npx create-expo-app@latest
```

```bash
npx eas-cli@latest init
```

```bash
touch eas.json && echo "{}" > eas.json
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/v54.0.0/sdk/sharing

Setup and installation instructions for the expo-sharing library. Install the package using npm and ensure expo is available in your project.

```APIDOC
## Installation

### Package Installation
```bash
npx expo install expo-sharing
```

### Requirements
- For existing React Native apps, ensure `expo` is installed in your project

### Import
```javascript
import * as Sharing from 'expo-sharing';
```

### Platform Support
- Android: Full support
- iOS: Full support
- Web: Limited support (requires HTTPS, built on Web Share API)

### Web-Specific Requirements
- HTTPS required for Web Share API
- Use `npx expo start --tunnel` to enable HTTPS during development
- Check availability with `Sharing.isAvailableAsync()` before use
```

--------------------------------

### Installation and Setup

Source: https://docs.expo.dev/versions/v52.0.0/sdk/clipboard

Instructions for installing and initializing the expo-clipboard module in a React Native or Expo project.

```APIDOC
## expo-clipboard Installation

### Description
Installs the Expo Clipboard library for clipboard content management across platforms.

### Installation Command
```
npx expo install expo-clipboard
```

### Requirements
- Expo CLI installed globally or locally
- Existing React Native or Expo project
- For React Native projects, ensure 'expo' is installed in the project

### Import
```
import * as Clipboard from 'expo-clipboard';
```

### Bundled Version
Version: ~7.0.1

### Platform Support
- Android
- iOS
- Web (uses AsyncClipboard API with potential browser compatibility issues)

### Web Platform Note
On Web, the module uses the AsyncClipboard API which may behave differently between browsers. WebKit has a known issue that makes this API unusable in asynchronous code contexts.
```

--------------------------------

### Build and Run Example Application on Device (Terminal)

Source: https://docs.expo.dev/modules/config-plugin-and-native-module-tutorial

This sequence of terminal commands guides the user through building and running the example application. It includes navigating to the example directory, reinstalling dependencies, and executing platform-specific commands to launch the app on Android or iOS. This step verifies the end-to-end functionality of the developed module.

```Terminal
cd example
rm -rf node_modules && npm install
npx expo run:android
npx expo run:ios
```

--------------------------------

### SETUP Installation & Import

Source: https://docs.expo.dev/versions/unversioned/sdk/netinfo

Provides instructions for installing the `@react-native-community/netinfo` library and importing it into your React Native project.

```APIDOC
## SETUP Installation & Import

### Description
This section guides you through installing the `@react-native-community/netinfo` package using `npx expo install` and demonstrates how to import the `NetInfo` module into your JavaScript or TypeScript files.

### Method
N/A (Installation/Import)

### Endpoint
N/A

### Parameters
N/A

### Request Body
N/A

### Request Example
```bash
npx expo install @react-native-community/netinfo
```

### Response
#### Success Response (200)
N/A

#### Response Example
```javascript
import NetInfo from '@react-native-community/netinfo';
```
```

--------------------------------

### Installation and Configuration

Source: https://docs.expo.dev/versions/v52.0.0/sdk/router-ui

Setup instructions for expo-router/ui including installation and app configuration with the config plugin.

```APIDOC
## Installation and Configuration

### Description
Setup expo-router/ui in your project by installing expo-router and configuring the app config.

### Prerequisites
- expo-router must be installed in your project
- Follow the Expo Router installation guide

### app.json Configuration
```json
{
  "expo": {
    "plugins": ["expo-router"]
  }
}
```

### Import Statement
```javascript
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
```

### Bundled Version
~4.0.22

### Supported Platforms
- Android
- iOS
- tvOS
- Web
```

--------------------------------

### Basic EAS Build Configuration with Gymfile Generation

Source: https://docs.expo.dev/custom-builds/schema

Example EAS Build configuration demonstrating basic usage of eas/generate_gymfile_from_template step within a build workflow. Shows minimal setup with checkout, node modules installation, prebuild, and Gymfile generation steps.

```yaml
build:
  name: Generate Gymfile template
  steps:
    - eas/checkout
    - eas/install_node_modules
    - eas/prebuild
    - eas/generate_gymfile_from_template
```

--------------------------------

### IntentLauncher Installation and Setup

Source: https://docs.expo.dev/versions/v52.0.0/sdk/intent-launcher

Installation instructions for the expo-intent-launcher package and basic setup to import the library into your React Native project.

```APIDOC
## Installation and Setup

### Installation
Install the expo-intent-launcher package using npx:
```
npx expo install expo-intent-launcher
```

### Import
```javascript
import * as IntentLauncher from 'expo-intent-launcher';
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';
```

### Requirements
- Expo SDK 52 or later
- React Native project with Expo installed
- Android platform target

### Bundled Version
~12.0.2
```

--------------------------------

### Installation and Setup

Source: https://docs.expo.dev/versions/latest/sdk/calendar

Install the expo-calendar library and configure permissions for calendar and reminders access on both Android and iOS platforms.

```APIDOC
## Installation

### Description
Install expo-calendar package and configure required permissions for calendar access.

### Installation Command
```
npx expo install expo-calendar
```

### Configuration in app.json
```json
{
  "expo": {
    "plugins": [
      [
        "expo-calendar",
        {
          "calendarPermission": "The app needs to access your calendar.",
          "remindersPermission": "The app needs to access your reminders."
        }
      ]
    ]
  }
}
```

### Android Permissions
Add to `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.READ_CALENDAR" />
<uses-permission android:name="android.permission.WRITE_CALENDAR" />
```

### iOS Permissions
Add to `ios/[app]/Info.plist`:
```xml
<key>NSCalendarsUsageDescription</key>
<string>Allow $(PRODUCT_NAME) to access your calendar</string>
<key>NSRemindersUsageDescription</key>
<string>Allow $(PRODUCT_NAME) to access your reminders</string>
```

### Configuration Properties
| Property | Default | Platform | Description |
|----------|---------|----------|-------------|
| `calendarPermission` | "Allow $(PRODUCT_NAME) to access your calendar" | iOS | NSCalendarsUsageDescription permission message |
| `remindersPermission` | "Allow $(PRODUCT_NAME) to access your reminders" | iOS | NSRemindersUsageDescription permission message |
```

--------------------------------

### Build and Run Expo Module Example

Source: https://docs.expo.dev/modules/native-view-tutorial

Compiles the TypeScript module and runs the example application on Android and iOS simulators/devices. This set of commands verifies the module's setup and allows for testing the native view integration in a real environment.

```Terminal
# Run this in the root of the project to start the TypeScript compiler
npm run build
# Navigate to the example directory
cd example
# Run the example app on Android
npx expo run:android
# Run the example app on iOS
npx expo run:ios
```

--------------------------------

### Installation and Setup

Source: https://docs.expo.dev/versions/v53.0.0/sdk/live-photo

Instructions for installing the expo-live-photo library in your React Native project. Requires the main expo package to be installed in existing React Native applications.

```APIDOC
## Installation

### Package Installation

```bash
npx expo install expo-live-photo
```

### Requirements
- iOS platform only
- Expo SDK 53 or higher
- For existing React Native apps: must have `expo` package installed

### Import

```javascript
import { LivePhotoView, LivePhotoAsset } from 'expo-live-photo';
```

### Bundled Version
- Current version: ~0.1.4
```

--------------------------------

### Installation & Setup

Source: https://docs.expo.dev/versions/latest/sdk/video-thumbnails

Instructions for installing and importing the expo-video-thumbnails library in your React Native project. This covers the npm installation command and how to properly import the module.

```APIDOC
## Installation & Setup

### Installation

#### NPM Installation
```bash
npx expo install expo-video-thumbnails
```

### Prerequisites
- Ensure `expo` is installed in your project
- For existing React Native apps, install expo separately if not already present

### Import

#### Module Import
```javascript
import * as VideoThumbnails from 'expo-video-thumbnails';
```

### Bundled Version
- **Version**: ~10.0.8

### Supported Platforms
- Android
- iOS
- tvOS
```

--------------------------------

### Installation and Setup

Source: https://docs.expo.dev/versions/unversioned/sdk/device

Install the expo-device library in your Expo project using npx and import it into your application to access device information.

```APIDOC
## Installation

### Description
Install the expo-device library in your Expo project.

### Command
```
npx expo install expo-device
```

### Import
```
import * as Device from 'expo-device';
```

### Basic Usage Example
```javascript
import { Text, View } from 'react-native';
import * as Device from 'expo-device';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        {Device.manufacturer}: {Device.modelName}
      </Text>
    </View>
  );
}
```
```

--------------------------------

### Expo: Create and Start Audio Recording with Options

Source: https://docs.expo.dev/versions/v53.0.0/sdk/audio-av

This JavaScript snippet demonstrates two equivalent methods to initialize and start an audio recording using Expo's `Audio` API. It covers using `Audio.Recording.createAsync` for a streamlined setup with configurable options for status updates, and the manual step-by-step approach of `new Audio.Recording()` followed by `prepareToRecordAsync` and `startAsync`.

```javascript
const { recording, status } = await Audio.Recording.createAsync(
  options,
  onRecordingStatusUpdate,
  progressUpdateIntervalMillis
);

// Which is equivalent to the following:
const recording = new Audio.Recording();
await recording.prepareToRecordAsync(options);
recording.setOnRecordingStatusUpdate(onRecordingStatusUpdate);
await recording.startAsync();
```

--------------------------------

### Device Installation and Setup

Source: https://docs.expo.dev/versions/v53.0.0/sdk/device

Installation instructions for the expo-device library. This library provides access to system information about the physical device across multiple platforms including Android, iOS, tvOS, and Web.

```APIDOC
## Installation

### Description
Install the expo-device library in your Expo or React Native project.

### Installation Command
```
npx expo install expo-device
```

### Requirements
- For existing React Native apps, ensure `expo` is installed in your project

### Bundled Version
- expo-device: ~7.1.4

### Import
```javascript
import * as Device from 'expo-device';
```
```

--------------------------------

### Add Development Start Script to package.json

Source: https://docs.expo.dev/build-reference/variants

This snippet provides a `package.json` script shortcut to start the development server with the `APP_VARIANT` environment variable set to 'development'. This streamlines the process of launching the development variant of the app, ensuring `app.config.js` applies the correct configuration. Users can run `npm run dev` or `yarn dev`.

```json
{
  "scripts": {
    "dev": "APP_VARIANT=development npx expo start"
  }
}
```

--------------------------------

### Installation and Setup

Source: https://docs.expo.dev/versions/v53.0.0/sdk/av

Install the expo-av library using npx and configure it in your app.json with optional microphone permissions for iOS.

```APIDOC
## Installation

### Description
Install and configure the expo-av library for audio and video playback functionality.

### Installation Command
```bash
npx expo install expo-av
```

### Configuration in app.json
Configure expo-av using the built-in config plugin for Continuous Native Generation (CNG).

### Example Configuration
```json
{
  "expo": {
    "plugins": [
      [
        "expo-av",
        {
          "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone."
        }
      ]
    ]
  }
}
```

### Configurable Properties

| Property | Platform | Default | Description |
|----------|----------|---------|-------------|
| **microphonePermission** | iOS | "Allow $(PRODUCT_NAME) to access your microphone" | Sets the NSMicrophoneUsageDescription permission message |

### Manual Configuration (Non-CNG Projects)

#### Android
Add to `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

#### iOS
Add to `ios/[app]/Info.plist`:
```xml
<key>NSMicrophoneUsageDescription</key>
<string>Allow $(PRODUCT_NAME) to access your microphone</string>
```
```

--------------------------------

### Install Expo modules for existing projects

Source: https://docs.expo.dev/eas-update/getting-started

Use this command to install the necessary Expo packages into an existing project that does not yet include the `expo` package. This step is crucial for enabling Expo CLI and Metro Config, which are prerequisites for integrating EAS Update.

```shell
npx install-expo-modules@latest
```

--------------------------------

### List Component - Installation & Setup

Source: https://docs.expo.dev/versions/unversioned/sdk/ui/swift-ui/list

Install the @expo/ui package to use the List component. This component requires the expo package to be installed in your React Native project.

```APIDOC
## Installation

### Package Installation

```bash
npx expo install @expo/ui
```

### Requirements
- Expo package must be installed in your React Native project
- Supports iOS and tvOS platforms
- iOS 16.0+ and tvOS 16.0+ for full scrolling support

### Usage Import

```javascript
import { Host, List } from '@expo/ui/swift-ui';
```
```

--------------------------------

### Installation and Setup

Source: https://docs.expo.dev/versions/v52.0.0/sdk/speech

Install the expo-speech library in your Expo project using npm. This is required before using any text-to-speech functionality.

```APIDOC
## Installation

### Description
Install the expo-speech library to enable text-to-speech functionality in your React Native or Expo application.

### Installation Command
```
npx expo install expo-speech
```

### Import
```javascript
import * as Speech from 'expo-speech';
```

### Platform Support
- Android
- iOS
- Web

### Notes
- On iOS physical devices, expo-speech won't produce sound if the device is in silent mode. Ensure silent mode is turned off.
- For existing React Native apps, make sure to install `expo` in your project as well.
```

--------------------------------

### Basic Usage Example

Source: https://docs.expo.dev/versions/latest/sdk/intent-launcher

Quick example demonstrating how to import and use the IntentLauncher to open location settings.

```APIDOC
## Basic Usage

### Description
Demonstrate basic usage of IntentLauncher to open Android settings.

### Code Example
```javascript
import { startActivityAsync, ActivityAction } from 'expo-intent-launcher';

// Open location settings
startActivityAsync(ActivityAction.LOCATION_SOURCE_SETTINGS);
```

### Import
```javascript
import * as IntentLauncher from 'expo-intent-launcher';
```
```

--------------------------------

### Local Capabilities Setup

Source: https://docs.expo.dev/eas/ai/mcp

Configure and start an Expo development server with MCP (Model Context Protocol) capabilities enabled. This setup enables advanced features like screenshots, DevTools access, and automation capabilities in SDK 54 and later.

```APIDOC
## Local Capabilities Setup

### Description
Set up a local Expo development server with MCP capabilities for advanced features including screenshots from iOS Simulator, DevTools access, and automation capabilities. Available in SDK 54 and later.

### Prerequisites
- Expo CLI installed
- Project directory initialized
- Expo account login (same account for MCP authentication)

### Setup Steps

#### Step 1: Navigate to Project
```bash
cd /path/to/your-project
```

#### Step 2: Install expo-mcp Package
```bash
npx expo install expo-mcp --dev
```

#### Step 3: Verify Expo CLI Authentication
```bash
npx expo whoami || npx expo login
```

#### Step 4: Start Development Server with MCP
```bash
EXPO_UNSTABLE_MCP_SERVER=1 npx expo start
```

### Important Notes
- Reconnect or restart MCP server connection in your AI-assisted tool whenever starting or stopping the development server
- Local capabilities require an active local development server connection
- Server capabilities are available remotely without local setup
```

--------------------------------

### Installation and Configuration

Source: https://docs.expo.dev/versions/latest/sdk/router-ui

Setup instructions for installing expo-router/ui in your project and configuring it in your app config file.

```APIDOC
## Installation

### Description
Setup expo-router/ui in your Expo project by installing the expo-router package and configuring the plugin.

### Prerequisites
- Expo Router must be installed in your project
- Follow the Expo Router installation guide for initial setup

### Configuration in app.json

```json
{
  "expo": {
    "plugins": ["expo-router"]
  }
}
```

### Package Information
- **Module**: expo-router/ui (submodule of expo-router)
- **Bundled version**: ~6.0.21
- **Platforms**: Android, iOS, tvOS, Web
```

--------------------------------

### Run Initial Expo Example App (Terminal)

Source: https://docs.expo.dev/modules/native-view-tutorial

Provides terminal commands to prebuild and run an Expo example application on Android and iOS. This ensures a clean initial build and deployment of the base application.

```bash
npx expo prebuild --clean
npx expo run:android
npx expo run:ios
```

--------------------------------

### TaskManager Installation and Setup

Source: https://docs.expo.dev/versions/latest/sdk/task-manager

Instructions for installing and configuring the Expo TaskManager library in your project, including platform-specific requirements.

```APIDOC
## Installation and Configuration

### Installation

#### Using Expo CLI
```bash
npx expo install expo-task-manager
```

#### In Existing React Native Apps
Ensure that `expo` is installed in your project:
```bash
npm install expo
npx expo install expo-task-manager
```

### Platform Requirements

#### iOS
- Standalone apps require extra configuration
- Each background feature requires a special key in the `UIBackgroundModes` array in your `Info.plist` file
- Refer to individual library documentation (Location, BackgroundFetch, Notifications) for specific UIBackgroundModes keys needed

#### Android
- Background task permissions are handled automatically

#### tvOS
- Supported platform

### Testing
- TaskManager can be tested in Expo Go app
- Check documentation of each library using TaskManager to confirm Expo Go support
- Some features may have limited support in Expo Go

### Libraries Using TaskManager
- expo-location
- expo-background-task
- expo-background-fetch
- expo-notifications
```

--------------------------------

### Run Expo Example App on Android and iOS

Source: https://docs.expo.dev/modules/native-module-tutorial

These commands navigate into the example directory and launch the Expo example application on Android or iOS simulators/devices. `npx expo run:android` runs on Android, and `npx expo run:ios` runs on iOS. This allows testing the native module's integration and functionality within a host application.

```Terminal
cd example
npx expo run:android
# Run the example app on iOS
npx expo run:ios
```

--------------------------------

### Example directory structure for EAS Workflows

Source: https://docs.expo.dev/eas-workflows/get-started

This shows the recommended directory structure for organizing EAS workflow YAML files. Workflow definitions are placed within a `.eas/workflows/` directory at the root of your project.

```Text
my-app
.eas
workflows
create-production-builds.yml
eas.json
```

--------------------------------

### Installation and Setup

Source: https://docs.expo.dev/versions/latest/sdk/dev-client

Install expo-dev-client in your Expo or React Native project using npm. This library must be included in your development build to enable development tools and the developer menu.

```APIDOC
## Installation

### Description
Install the expo-dev-client library in your project to enable development tools and debugging capabilities.

### Command
```bash
npx expo install expo-dev-client
```

### Notes
- For existing React Native apps, first install `expo` in your project before installing `expo-dev-client`
- This library is supported on Android, iOS, and tvOS
- For TV support: Android TV supports all operations similar to Android phones; Apple TV supports basic operations with local or tunneled packagers
- Bundled version: ~6.0.20
```

--------------------------------

### Install and run Lighthouse CLI for web performance audit

Source: https://docs.expo.dev/guides/analyzing-bundles

Installs the Lighthouse command-line interface globally for comprehensive web performance, accessibility, and SEO audits. After a production build is served, use this command to run an audit on your site's URL and view the detailed report in your browser.

```bash
npm install -g lighthouse
```

```bash
npx lighthouse <url> --view
```

--------------------------------

### Installation and Setup

Source: https://docs.expo.dev/versions/unversioned/sdk/localization

Install the expo-localization package and configure it using the built-in config plugin for Continuous Native Generation (CNG) support.

```APIDOC
## Installation

### Installation Command
Install the expo-localization package using npx:

```bash
npx expo install expo-localization
```

### Configuration in app.json
Configure expo-localization using the config plugin in your app.json file:

```json
{
  "expo": {
    "plugins": ["expo-localization"]
  }
}
```

### Setup Notes
- Ensure `expo` is installed in your project if installing in an existing React Native app
- The config plugin allows configuration of properties that require building a new app binary
- Manual configuration is required if your app does not use CNG
```

--------------------------------

### Execute and Test Expo Native Module

Source: https://docs.expo.dev/modules/config-plugin-and-native-module-tutorial

These commands demonstrate the workflow for running an Expo example application that uses a custom native module. It includes steps for setting up the native environment (`npx expo prebuild`) and launching the app on both Android and iOS emulators or devices.

```bash
cd example
# Execute your plugin and update native files
npx expo prebuild
# Run the example app on Android
npx expo run:android
# Run the example app on iOS
npx expo run:ios
```

--------------------------------

### Start Expo Development Server (Terminal)

Source: https://docs.expo.dev/modules/get-started

Initiate the Expo development server to enable live reloading and reflection of changes made to your native modules within the application. This command keeps the app in sync with your local development environment.

```shell
npx expo start
```

--------------------------------

### Push Notifications Setup and Registration in React Native/Expo

Source: https://docs.expo.dev/versions/latest/sdk/notifications

Complete example demonstrating push notification registration, permission handling, and token retrieval for Expo applications. Includes notification handler configuration, channel setup for Android, and listener implementation for receiving and responding to notifications. Requires physical device and valid EAS project ID.

```javascript
import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
    }
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <Text>{`Channels: ${JSON.stringify(
        channels.map(c => c.id),
        null,
        2
      )}`}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here', test: { test1: 'more data' } },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2,
    },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('myNotificationChannel', {
      name: 'A channel is needed for the permissions prompt to appear',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error('Project ID not found');
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
```

--------------------------------

### Start Expo JavaScript Bundler with npx expo start

Source: https://docs.expo.dev/develop/development-builds/create-a-build

Starts the JavaScript bundler for development. This command automatically detects if expo-dev-client is installed and targets the development build instead of Expo Go. Use this when continuing development after building the native app.

```bash
npx expo start
```

--------------------------------

### Installation and Setup

Source: https://docs.expo.dev/versions/latest/sdk/pedometer

Instructions for installing the Expo Pedometer library in your Expo or React Native project. Includes the necessary npm command and import statements.

```APIDOC
## Installation

### Installation Command
```bash
npx expo install expo-sensors
```

### Import Statement
```javascript
import { Pedometer } from 'expo-sensors';
```

### Requirements
- Expo CLI or React Native setup
- For existing React Native projects, ensure 'expo' is installed in your project

### Bundled Version
- expo-sensors: ~15.0.8
```

--------------------------------

### Install core Expo package

Source: https://docs.expo.dev/versions/unversioned/sdk/expo

This command installs the main `expo` package into your project using `npx expo install`. This ensures compatibility with your current Expo project setup and dependencies.

```Terminal
npx expo install expo
```

--------------------------------

### Installation and Setup

Source: https://docs.expo.dev/versions/unversioned/sdk/brightness

Instructions for installing the expo-brightness library and configuring required permissions for Android devices. This covers both standard Expo projects and existing React Native applications.

```APIDOC
## Installation and Configuration

### Installation
Install the expo-brightness library using the following command:

```bash
npx expo install expo-brightness
```

For existing React Native applications, ensure that the `expo` package is also installed in your project.

### Android Configuration
If you are not using Continuous Native Generation (CNG) or are using a manual native Android project, add the following permission to `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.WRITE_SETTINGS" />
```

This permission is required to modify system brightness settings on Android devices.
```

--------------------------------

### Installation and Setup

Source: https://docs.expo.dev/versions/v52.0.0/sdk/local-authentication

Install the expo-local-authentication library and configure it in your app.json with the config plugin for FaceID permissions on iOS.

```APIDOC
## Installation

### Method
CLI Installation

### Description
Install the expo-local-authentication library in your Expo project.

### Installation Command
```
npx expo install expo-local-authentication
```

### Configuration in app.json
Configure the library using the built-in config plugin for Continuous Native Generation (CNG).

### Example app.json Configuration
```json
{
  "expo": {
    "plugins": [
      [
        "expo-local-authentication",
        {
          "faceIDPermission": "Allow $(PRODUCT_NAME) to use Face ID."
        }
      ]
    ]
  }
}
```

### Configurable Properties
| Property | Default | Platform | Description |
|----------|---------|----------|-------------|
| `faceIDPermission` | `"Allow $(PRODUCT_NAME) to use Face ID"` | iOS | Sets the NSFaceIDUsageDescription permission message |

### iOS Manual Configuration (Without CNG)
Add the following key to your `ios/[app]/Info.plist`:
```xml
<key>NSFaceIDUsageDescription</key>
<string>Allow $(PRODUCT_NAME) to use FaceID</string>
```
```

--------------------------------

### Installation and Setup

Source: https://docs.expo.dev/versions/latest/sdk/tracking-transparency

Install the expo-tracking-transparency library and configure it in your app configuration file using the built-in config plugin for Continuous Native Generation support.

```APIDOC
## Installation

### Method
NPM Package Installation

### Endpoint
expo-tracking-transparency

### Installation Command
```
npx expo install expo-tracking-transparency
```

### Configuration in app.json
```json
{
  "expo": {
    "plugins": [
      [
        "expo-tracking-transparency",
        {
          "userTrackingPermission": "This identifier will be used to deliver personalized ads to you."
        }
      ]
    ]
  }
}
```

### Configurable Properties

| Property | Default | Platform | Description |
|----------|---------|----------|-------------|
| `userTrackingPermission` | "Allow this app to collect app-related data that can be used for tracking you or your device." | iOS | Sets the iOS `NSUserTrackingUsageDescription` permission message in Info.plist |

### Native Configuration

#### Android
Add the following permission to `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="com.google.android.gms.permission.AD_ID"/>
```

#### iOS
Add the following key to `ios/[app]/Info.plist`:
```xml
<key>NSUserTrackingUsageDescription</key>
<string>Your custom usage description string here.</string>
```
```

--------------------------------

### Run Example App (Android/iOS) for npm Publish

Source: https://docs.expo.dev/modules/use-standalone-expo-module-in-your-project

Navigates into the example directory of the newly created Expo module and runs the example application on either Android or iOS. This command allows developers to verify the module's functionality in a practical, isolated scenario. It's a crucial validation step before the module is officially published to npm.

```bash
cd example
# Run the example app on Android
npx expo run:android
# Run the example app on iOS
npx expo run:ios
```

--------------------------------

### Installation and Setup

Source: https://docs.expo.dev/versions/latest/sdk/screen-orientation

Install the expo-screen-orientation package and configure it in your app.json with optional initial orientation settings for iOS.

```APIDOC
## Installation

### Method
NPM Package Installation

### Installation Command
```
npx expo install expo-screen-orientation
```

### Configuration
Add the following to your app.json to configure the plugin:

```json
{
  "expo": {
    "ios": {
      "requireFullScreen": true
    },
    "plugins": [
      [
        "expo-screen-orientation",
        {
          "initialOrientation": "DEFAULT"
        }
      ]
    ]
  }
}
```

### Configurable Properties
- **initialOrientation** (string) - Optional - Sets the iOS initial screen orientation. Possible values: DEFAULT, ALL, PORTRAIT, PORTRAIT_UP, PORTRAIT_DOWN, LANDSCAPE, LANDSCAPE_LEFT, LANDSCAPE_RIGHT
- **requireFullScreen** (boolean) - Optional - Required for iOS to enable screen orientation locking support

### Import
```javascript
import * as ScreenOrientation from 'expo-screen-orientation';
```
```

--------------------------------

### Install Multiple Expo Packages

Source: https://docs.expo.dev/more/expo-cli

Install several Expo-compatible packages simultaneously by listing them after `npx expo install`. This streamlines the dependency installation process while maintaining version compatibility.

```bash
npx expo install typescript expo-sms
```

--------------------------------

### Install Expo Ngrok for Tunneling (Terminal)

Source: https://docs.expo.dev/more/expo-cli

To enable tunneling for the Expo development server, the `@expo/ngrok` package must be installed globally. This command installs the necessary dependency that `npx expo start` uses to create a public proxy URL.

```Terminal
npm i -g @expo/ngrok
```

--------------------------------

### List Component - Advanced Example with Callbacks

Source: https://docs.expo.dev/versions/unversioned/sdk/ui/swift-ui/list

Demonstrates how to implement the List component with selection, deletion, and reordering callbacks for interactive list management.

```APIDOC
## List Component - Advanced Interactive Example

### Description
Shows how to use the List component with all interactive features enabled including selection, deletion, reordering, and edit mode.

### Complete Example

```javascript
import { Host, List, LabelPrimitive } from '@expo/ui/swift-ui';
import { useState } from 'react';

const AdvancedListExample = () => {
  const [editModeEnabled, setEditModeEnabled] = useState(false);
  const [moveEnabled, setMoveEnabled] = useState(false);
  const [deleteEnabled, setDeleteEnabled] = useState(false);
  const [selectEnabled, setSelectEnabled] = useState(false);
  const [color, setColor] = useState('blue');

  const data = [
    { text: 'Item 1', systemImage: 'star' },
    { text: 'Item 2', systemImage: 'heart' },
    { text: 'Item 3', systemImage: 'bolt' }
  ];

  return (
    <Host style={{ flex: 1 }}>
      <List
        scrollEnabled={true}
        editModeEnabled={editModeEnabled}
        onSelectionChange={(items) => alert(`Selected indexes: ${items.join(', ')}`)}
        moveEnabled={moveEnabled}
        onMoveItem={(from, to) => alert(`Moved item from index ${from} to ${to}`)}
        onDeleteItem={(item) => alert(`Deleted item at index: ${item}`)}
        listStyle='automatic'
        deleteEnabled={deleteEnabled}
        selectEnabled={selectEnabled}>
        {data.map((item, index) => (
          <LabelPrimitive 
            key={index} 
            title={item.text} 
            systemImage={item.systemImage} 
            color={color} 
          />
        ))}
      </List>
    </Host>
  );
};
```

### Callback Handlers

#### onSelectionChange
Triggered when user selects/deselects items. Receives array of selected item indexes.

#### onMoveItem
Triggered when user reorders items. Receives source index and destination index.

#### onDeleteItem
Triggered when user deletes an item. Receives the index of deleted item.
```

--------------------------------

### Initialize New Expo Project with Tabs Template

Source: https://docs.expo.dev/guides/progressive-web-apps

Use this command to create a new Expo project, specifically with the `tabs` template, which is a common starting point for multi-screen applications. After creation, navigate into the new project directory to proceed with further setup.

```terminal
npm create expo -t tabs my-app
cd my-app
```

--------------------------------

### Install expo-dev-client for development builds

Source: https://docs.expo.dev/build/setup

Adds the `expo-dev-client` library to your project. This is crucial for creating development builds, which are debug versions of your app with `expo-dev-client` included. Development builds facilitate rapid iteration and provide a more flexible development environment.

```shell
npx expo install expo-dev-client
```

--------------------------------

### RecordingStartOptions - Recording Start Configuration

Source: https://docs.expo.dev/versions/latest/sdk/audio

Defines options for controlling how audio recording is started across all platforms. Supports delayed start timing and automatic duration-based stopping.

```APIDOC
## RecordingStartOptions

### Description
Options for controlling how audio recording is started. Supports platform-specific timing and duration controls.

### Platforms
Android, iOS, tvOS, Web

### Configuration Properties

#### atTime
- **Type**: `number`
- **Required**: Optional
- **Platform-Specific**: iOS only
- **Description**: The time in seconds to wait before starting the recording. If not provided, recording starts immediately.
- **Platform Behavior**:
  - Android: Ignored, recording starts immediately
  - iOS: Uses native AVAudioRecorder.record(atTime:) for precise timing
  - Web: Ignored, recording starts immediately
- **Important Note**: On iOS, the recording process starts immediately (status updates visible), but actual audio capture begins after the specified delay. This is not a countdown, since the recorder is active but silent during the delay period.

#### forDuration
- **Type**: `number`
- **Required**: Optional
- **Platforms**: Android, iOS, Web
- **Description**: The duration in seconds after which recording should automatically stop. If not provided, recording continues until manually stopped.
```

--------------------------------

### Create and Initialize Audio Recording Instance

Source: https://docs.expo.dev/versions/latest/sdk/audio-av

Instantiate the Recording class and prepare it for audio capture using HIGH_QUALITY preset. Call prepareToRecordAsync() to configure recording options, then startAsync() to begin recording. Handle errors appropriately for failed initialization or permission issues.

```javascript
const recording = new Audio.Recording();
try {
  await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
  await recording.startAsync();
  // You are now recording!
} catch (error) {
  // An error occurred!
}
```

--------------------------------

### Installation and Setup

Source: https://docs.expo.dev/versions/unversioned/sdk/ui/swift-ui/modifiers

Install the Expo UI library and set up modifiers in your project. The modifiers system provides a chainable API for applying styling and behavioral changes to SwiftUI components.

```APIDOC
## Installation

### Description
Install the Expo UI library to use SwiftUI view modifiers.

### Installation Command
```
npx expo install @expo/ui
```

### Requirements
- Ensure `expo` is installed in your React Native project
- Compatible with iOS and tvOS platforms

### Usage Pattern
Modifiers are applied to components using the `modifiers` prop with an array syntax:

```javascript
import { Text } from '@expo/ui/swift-ui';
import { background, padding, cornerRadius } from '@expo/ui/swift-ui/modifiers';

<Text
  modifiers={[
    background('#FF6B6B'),
    cornerRadius(12),
    padding({ all: 16 })
  ]}
>
  Styled Text
</Text>
```

### Key Features
- **Chainable Modifiers**: Combine multiple modifiers for complex styling
- **Conditional Modifiers**: Use spread operator for conditional styling
- **Animation Support**: Built-in animation configuration
- **Accessibility**: Accessibility modifiers for inclusive design
- **Interactive Gestures**: Tap and other gesture recognition
```

--------------------------------

### Install Google Font package from expo-google-fonts

Source: https://docs.expo.dev/develop/user-interface/fonts

Install a specific Google Font package from the @expo-google-fonts collection. Example shows installing the Inter Black font variant, which provides pre-packaged Google Fonts for use in Expo projects.

```bash
npx expo install expo-font @expo-google-fonts/inter
```

--------------------------------

### Installation and Configuration

Source: https://docs.expo.dev/versions/unversioned/sdk/age-range

Setup instructions for installing expo-age-range and configuring the required iOS entitlements for accessing age range information on iOS devices.

```APIDOC
## Installation

### NPM Installation
Install the library using the Expo CLI:
```bash
npx expo install expo-age-range
```

For existing React Native projects, ensure `expo` is installed in your project.

## iOS Configuration

### Requirements
- Xcode 26.0 or later
- iOS 26.0 or later
- `com.apple.developer.declared-age-range` entitlement

### Setup for Expo Projects

Add the entitlement to your `app.json` configuration:

```json
{
  "expo": {
    "ios": {
      "entitlements": {
        "com.apple.developer.declared-age-range": true
      }
    }
  }
}
```

### Setup for Existing React Native Projects

Add the entitlement to your project's `ios/[app]/[app].entitlements` file:

```xml
<key>com.apple.developer.declared-age-range</key>
<true/>
```

## Android Configuration

### Requirements
- Play Age Signals API (beta)
- Note: API may throw exceptions until January 1, 2026
- After January 1, 2026, the API will return live responses
```

--------------------------------

### Full Next.js configuration with Expo adapter and SWC

Source: https://docs.expo.dev/guides/using-nextjs

A comprehensive `next.config.js` example demonstrating the complete integration of `@expo/next-adapter`, SWC for performance, and the necessary package transpilation. This setup ensures optimal compatibility and functionality for a universal Expo and Next.js project.

```JavaScript
const { withExpo } = require('@expo/next-adapter');

/** @type {import('next').NextConfig} */
const nextConfig = withExpo({
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: [
    'react-native',
    'react-native-web',
    'expo',
    // Add more React Native/Expo packages here...
  ],
  experimental: {
    forceSwcTransforms: true,
  },
});

module.exports = nextConfig;
```

--------------------------------

### Installation and Setup

Source: https://docs.expo.dev/versions/unversioned/sdk/asset

Install the expo-asset library and configure it in your app.json using the config plugin system. This enables you to embed asset files in your native project.

```APIDOC
## Installation

### Description
Install expo-asset package and configure it in your app.json for asset management.

### Installation Command
```
npx expo install expo-asset
```

### Configuration in app.json
Add the expo-asset config plugin to embed assets in your native project.

### Example Configuration
```json
{
  "expo": {
    "plugins": [
      [
        "expo-asset",
        {
          "assets": ["path/to/file.png", "path/to/directory"]
        }
      ]
    ]
  }
}
```

### Configurable Properties
- **assets** (string[]) - Required/Optional - An array of asset files or directories to link to the native project. Paths should be relative to project root. Supported file types: Images (.png, .jpg, .gif), Media (.mp4, .mp3, .lottie, .riv), SQLite databases (.db)
```

--------------------------------

### Install Third-Party Library with Expo CLI

Source: https://docs.expo.dev/workflow/using-libraries

Installs a third-party library using npx expo install instead of npm install or yarn add. This allows Expo CLI to pick a compatible version and warn about known incompatibilities. The example installs @react-navigation/native package.

```bash
npx expo install @react-navigation/native
```

--------------------------------

### Execute an Asset Query with Filters and Ordering (JavaScript)

Source: https://docs.expo.dev/versions/unversioned/sdk/media-library-next

Demonstrates how to construct and execute a complex query to retrieve media assets from the device. The query filters assets by media type (image) and maximum height, orders them by creation time in descending order, and limits the number of results to 20. The `exe()` method asynchronously runs the query and returns an array of matching `Asset` objects.

```javascript
const assets = await new Query()
 .eq(AssetField.MEDIA_TYPE, MediaType.IMAGE)
 .lte(AssetField.HEIGHT, 1080)
 .orderBy(AssetField.CREATION_TIME)
 .limit(20)
 .exe();
```

--------------------------------

### Usage Example: Fetching Albums and Displaying Assets

Source: https://docs.expo.dev/versions/unversioned/sdk/media-library

Complete working example demonstrating how to fetch user albums, request permissions, retrieve assets from each album, and display them in a scrollable React Native interface.

```APIDOC
## Complete Usage Example: Fetching Albums and Displaying Assets

### Description
Demonstrates a complete workflow for querying user albums, managing permissions, fetching assets, and displaying them in a React Native application.

### Implementation Overview
This example shows:
1. Using the `usePermissions` hook to manage media library access
2. Calling `getAlbumsAsync` with smart albums included
3. Fetching assets for each album using `getAssetsAsync`
4. Rendering albums and their assets with asset URI display

### Key Components

#### Permission Management
```javascript
const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

async function getAlbums() {
  if (permissionResponse.status !== 'granted') {
    await requestPermission();
  }
  // Proceed with fetching albums
}
```

#### Fetching Albums
```javascript
const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
  includeSmartAlbums: true
});
setAlbums(fetchedAlbums);
```

#### Fetching Album Assets
```javascript
const albumAssets = await MediaLibrary.getAssetsAsync({ album });
setAssets(albumAssets.assets);
```

#### Displaying Assets
```javascript
{assets && assets.map((asset) => (
  <Image source={{ uri: asset.uri }} width={50} height={50} />
))}
```

### Common Use Cases
- Photo gallery applications
- Asset management tools
- Media picker components
- Album-based content organization

### Platform Support
- Android: ✓
- iOS: ✓
- tvOS: ✓
```

--------------------------------

### Installation and Setup

Source: https://docs.expo.dev/versions/v52.0.0/sdk/imagemanipulator

Install the expo-image-manipulator package in your Expo project. This library is available for Android, iOS, and Web platforms.

```APIDOC
## Installation

### Description
Install the expo-image-manipulator library into your Expo project.

### Installation Command
```
npx expo install expo-image-manipulator
```

### Requirements
- Expo CLI installed
- Existing React Native app with Expo configured
- npm or yarn package manager

### Platforms Supported
- Android
- iOS
- Web
```

--------------------------------

### Install Expo SDK library with npx expo install

Source: https://docs.expo.dev/workflow/using-libraries

Shows the command to install an Expo SDK library using npx expo install. This command automatically picks a version compatible with your project and installs it using your JavaScript package manager (npm, yarn, etc.). Example demonstrates installing the expo-device library.

```bash
npx expo install expo-device
```

--------------------------------

### Create and Setup Expo App Project

Source: https://docs.expo.dev/modules/use-standalone-expo-module-in-your-project

Terminal commands to initialize a new Expo app project, navigate to its root directory, and install the expo-settings module as a dependency for testing purposes.

```shell
npx create-expo-app my-app
cd my-app
npx expo install expo-settings
```

--------------------------------

### Install lottie-react-native with Expo

Source: https://docs.expo.dev/versions/v53.0.0/sdk/lottie

Install the lottie-react-native library in an Expo project using the command line. This command automatically handles installation in existing React Native apps with Expo integration.

```bash
npx expo install lottie-react-native
```

--------------------------------

### Render a basic MapView component in React Native

Source: https://docs.expo.dev/versions/latest/sdk/map-view

This React Native component demonstrates the fundamental usage of `MapView` from `react-native-maps`. It sets up a full-screen map within a `View` container, providing a starting point for displaying maps in an application. This example is suitable for both Expo Go and bare React Native projects after installation.

```JavaScript
import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
```

--------------------------------

### Installation and Setup

Source: https://docs.expo.dev/versions/latest/sdk/manifests

Install the expo-manifests library in your Expo project. This library provides TypeScript types for working with Expo manifest files across all supported platforms.

```APIDOC
## Installation

### Overview
Install the expo-manifests library to access Expo manifest types and interfaces.

### Install Command
```bash
npx expo install expo-manifests
```

### Requirements
- Node.js and npm/yarn
- Existing React Native or Expo project
- `expo` package installed in your project

### Import
```typescript
import * as Manifests from 'expo-manifests';
```

### Supported Platforms
- Android
- iOS
- tvOS
```

--------------------------------

### Haptics Installation and Setup

Source: https://docs.expo.dev/versions/unversioned/sdk/haptics

Instructions for installing the expo-haptics library in your Expo or React Native project. The VIBRATE permission is automatically added on Android, and the library requires expo to be installed in existing React Native projects.

```APIDOC
## Installation and Configuration

### Installation
Install the expo-haptics library using the following command:

```bash
npx expo install expo-haptics
```

### Requirements
- For existing React Native apps, ensure `expo` is installed in your project
- On Android, the `VIBRATE` permission is automatically added

### Platform Support
- **Android**: Uses Vibrator system service
- **iOS 10+**: Uses Taptic Engine
- **Web**: Uses Web Vibration API

### iOS Limitations
The Taptic Engine will not work if any of these conditions are true:
- Low Power Mode is enabled (detectable with `expo-battery`)
- User disabled Taptic Engine in settings
- iOS Camera is active
- iOS dictation is active

### Web Limitations
- Browser must support Web Vibration API
- Device must have vibration hardware
- User must grant permission (usually automatic)
- Some browsers ignore vibration in background tabs
```

--------------------------------

### Demonstrate Theme Module Usage in React Native (TSX)

Source: https://docs.expo.dev/modules/native-module-tutorial

This React Native (TSX) example showcases how to integrate and use the `expo-settings` module within an application. It demonstrates initializing the theme state, listening for theme changes using `useEffect`, and updating the theme via user interaction with a button, reflecting the current theme on the UI.

```tsx
import * as Settings from 'expo-settings';
import { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

export default function App() {
  const [theme, setTheme] = useState<string>(Settings.getTheme());

  useEffect(() => {
    const subscription = Settings.addThemeListener(({ theme: newTheme }) => {
      setTheme(newTheme);
    });

    return () => subscription.remove();
  }, [setTheme]);

  // Toggle between dark and light theme
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Theme: {Settings.getTheme()}</Text>
      <Button title={`Set theme to ${nextTheme}`} onPress={() => Settings.setTheme(nextTheme)} />
    </View>
  );
}
```

--------------------------------

### Installation and Setup

Source: https://docs.expo.dev/versions/unversioned/sdk/server

Install expo-server in your Expo Router project and configure it for server mode exports. This is the first step to using server-side capabilities in your Expo Router application.

```APIDOC
## Installation and Configuration

### Description
Install and configure expo-server for use in Expo Router projects.

### Installation Command
```
npx expo install expo-server
```

### Prerequisites
- Expo Router project configured to export in `server` mode
- Node.js runtime environment

### Configuration
Follow Expo Router's API Routes guide to configure your project for server exports before using expo-server runtime APIs.

### Usage Context
Runtime APIs can only be used in server-side code (API routes and server functions).
```

--------------------------------

### LinearGradient Component Installation

Source: https://docs.expo.dev/versions/unversioned/sdk/linear-gradient

Installation guide for the expo-linear-gradient package. This is the first step to use the LinearGradient component in your Expo or React Native project.

```APIDOC
## Installation

### Description
Installs the expo-linear-gradient package and its dependencies.

### Command
```
npx expo install expo-linear-gradient
```

### Requirements
- Expo CLI installed
- Existing React Native or Expo project
- For existing React Native apps, ensure `expo` is installed in the project
```

--------------------------------

### GET /hello

Source: https://docs.expo.dev/router/web/api-routes

A simple API route that responds with a JSON object containing a hello property. This is the basic example demonstrating how to create and execute an API route when the /hello endpoint is matched.

```APIDOC
## GET /hello

### Description
A simple API endpoint that returns a greeting message in JSON format. This demonstrates the basic structure of an Expo Router API route.

### Method
GET

### Endpoint
/hello

### Request Example
```
GET /hello HTTP/1.1
Host: localhost:8081
```

### Response
#### Success Response (200 OK)
- **hello** (string) - The greeting message

#### Response Example
```json
{
  "hello": "world"
}
```

### Implementation
```typescript
export function GET(request: Request) {
  return Response.json({ hello: 'world' });
}
```
```

--------------------------------

### Import and Use Local Expo Module in React Native (TypeScript/JavaScript)

Source: https://docs.expo.dev/modules/get-started

Demonstrates how to import a locally created Expo module into your React Native application, typically within a component like 'App.js' or 'index.tsx'. The example shows calling a method from the module and displaying its returned value.

```typescript
import MyModule from '@/modules/my-module';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>{MyModule.hello()}</Text>
    </View>
  );
}
```

--------------------------------

### Install Express Server Dependencies

Source: https://docs.expo.dev/router/web/api-routes

Install required npm packages for running an Express server: express for the web framework, compression for gzip compression middleware, and morgan for HTTP request logging.

```bash
npm i -D express compression morgan
```

--------------------------------

### Serve Expo Web Build Locally

Source: https://docs.expo.dev/guides/publishing-websites

This command starts a local server to test the static web bundle in a production-like environment. It allows developers to quickly preview their website locally, ensuring functionality and appearance before deploying it to a hosting service. Note that certain features requiring HTTPS might not work as expected.

```terminal
npx expo serve
```

--------------------------------

### Installation and Setup

Source: https://docs.expo.dev/versions/v53.0.0/sdk/local-authentication

Install the expo-local-authentication library and configure it in your app.json file. The library requires configuration for iOS Face ID permissions and can be set up using config plugins.

```APIDOC
## Installation

### NPM Installation
```bash
npx expo install expo-local-authentication
```

### Configuration in app.json

Configure the library using the built-in config plugin for Continuous Native Generation (CNG).

#### Example Configuration
```json
{
  "expo": {
    "plugins": [
      [
        "expo-local-authentication",
        {
          "faceIDPermission": "Allow $(PRODUCT_NAME) to use Face ID."
        }
      ]
    ]
  }
}
```

### Configurable Properties

| Property | Default | Platform | Description |
|----------|---------|----------|-------------|
| `faceIDPermission` | `"Allow $(PRODUCT_NAME) to use Face ID"` | iOS | Sets the `NSFaceIDUsageDescription` permission message |

### iOS Manual Configuration

If not using CNG, add `NSFaceIDUsageDescription` to `ios/[app]/Info.plist`:

```xml
<key>NSFaceIDUsageDescription</key>
<string>Allow $(PRODUCT_NAME) to use FaceID</string>
```

### Import

```javascript
import * as LocalAuthentication from 'expo-local-authentication';
```
```

--------------------------------

### GET Application.getInstallReferrerAsync()

Source: https://docs.expo.dev/versions/unversioned/sdk/application

Asynchronously retrieves the referrer URL of the installed app from the Google Play Store using the Install Referrer API. Only available on Android platform.

```APIDOC
## Method: Application.getInstallReferrerAsync()

### Description
Gets the referrer URL of the installed app with the `Install Referrer API` from the Google Play Store. In practice, the referrer URL may not be a complete, absolute URL.

### Platforms
- Android ✓
- iOS ✗
- tvOS ✗
- Web ✗

### Method
GET (Asynchronous)

### Returns
`Promise<string>` - A Promise that fulfills with a string of the referrer URL

### Example
```javascript
const referrer = await Application.getInstallReferrerAsync();
console.log(referrer); // "utm_source=google-play&utm_medium=organic"
```
```

--------------------------------

### startAsync()

Source: https://docs.expo.dev/versions/v54.0.0/sdk/audio-av

Begins recording audio. This method can only be called if the Recording has been prepared via prepareToRecordAsync(). Returns a Promise that resolves with RecordingStatus when recording has started successfully.

```APIDOC
## startAsync()

### Description
Begins recording. This method can only be called if the `Recording` has been prepared.

### Method
Async Function

### Returns
- **Promise<RecordingStatus>** - A Promise that is fulfilled when recording has begun, or rejects if recording could not be started. The promise is resolved with the `RecordingStatus` of the recording.

### Response Example
```
{
  "canRecord": true,
  "isRecording": true,
  "durationMillis": 0
}
```
```

--------------------------------

### DeviceMotion Installation and Setup

Source: https://docs.expo.dev/versions/v54.0.0/sdk/devicemotion

Install the expo-sensors package and configure DeviceMotion in your app.json for proper permissions and platform-specific settings. This is the first step to integrate device motion sensor access into your Expo project.

```APIDOC
## Installation

### Description
Install and configure the expo-sensors package with DeviceMotion support for your Expo project.

### Installation Command
```
npx expo install expo-sensors
```

### Configuration in app.json
Add the expo-sensors plugin to your app.json configuration:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-sensors",
        {
          "motionPermission": "Allow $(PRODUCT_NAME) to access your device motion."
        }
      ]
    ]
  }
}
```

### iOS Manual Configuration
If not using Continuous Native Generation (CNG), add the following to ios/[app]/Info.plist:

```xml
<key>NSMotionUsageDescription</key>
<string>Allow $(PRODUCT_NAME) to access your device motion</string>
```

### Configuration Parameters
- **motionPermission** (string) - Optional - iOS only - Custom permission message for NSMotionUsageDescription. Default: "Allow $(PRODUCT_NAME) to access your device motion"

### Import
```javascript
import { DeviceMotion } from 'expo-sensors';
```
```

--------------------------------

### Create and Start Audio Recording with createAsync

Source: https://docs.expo.dev/versions/latest/sdk/audio-av

Creates and starts a recording using the given options with optional status update callbacks. This method initializes a Recording object, prepares it with specified options, and starts recording immediately. Returns a Promise containing both the recording object and its status.

```javascript
const { recording, status } = await Audio.Recording.createAsync(
  options,
  onRecordingStatusUpdate,
  progressUpdateIntervalMillis
);

// Which is equivalent to the following:
const recording = new Audio.Recording();
await recording.prepareToRecordAsync(options);
recording.setOnRecordingStatusUpdate(onRecordingStatusUpdate);
await recording.startAsync();
```

--------------------------------

### Create Dev Plugin Project Setup

Source: https://docs.expo.dev/debugging/create-devtools-plugins

Initialize a new dev tools plugin project using create-dev-plugin command. This sets up the project structure with src directory for the hook and webui directory for the web interface.

```bash
npx create-dev-plugin@latest
```

--------------------------------

### Example Patch File Naming Convention

Source: https://docs.expo.dev/config-plugins/patch-project

This shows the naming convention for generated patch files, which includes the platform name and a unique checksum, ensuring distinct identification for each patch.

```text
ios+eee880ad7b07965271d2323f7057a2b4.patch
```

--------------------------------

### installOnUIRuntime()

Source: https://docs.expo.dev/versions/unversioned/sdk/expo

Installs the module on the UI runtime. This function prepares the module for execution on the native UI thread.

```APIDOC
## installOnUIRuntime()

### Description
Installs the module on the UI runtime.

### Platforms
- Android
- iOS
- tvOS
- Web

### Method
Function call

### Returns
`void`
```

--------------------------------

### Initialize new Expo project with npm

Source: https://docs.expo.dev/archive/e2e-tests

Creates a new Expo project named 'eas-tests-example' and navigates into the project directory. This is the initial setup step for the E2E testing workflow.

```bash
npx create-expo-app@latest eas-tests-example
cd eas-tests-example
```

--------------------------------

### Get application installation time

Source: https://docs.expo.dev/versions/latest/sdk/application

Asynchronously retrieve the installation timestamp of the application on the device using PackageInfo.firstInstallTime on Android or NSFileCreationDate on iOS. Returns null on Web. The returned Promise resolves with a Date object representing installation time.

```javascript
await Application.getInstallationTimeAsync();
// 2019-07-18T18:08:26.121Z
```

--------------------------------

### Define Entry Point for Custom Build Cache Provider Plugin

Source: https://docs.expo.dev/guides/cache-builds-remotely

Create a `provider.plugin.js` file in your project's root directory. This file acts as the entry point for your custom build cache plugin, pointing to its compiled output.

```JavaScript
// This file configures the entry file for your plugin.
module.exports = require('./provider/build');
```

--------------------------------

### Find GitHub Repository for npm Package using npm-home

Source: https://docs.expo.dev/workflow/using-libraries

Opens the GitHub repository page for a specified npm package using the npm-home CLI tool. This is useful for checking library documentation and compatibility before installation. The example opens the GitHub page for react-native-localize package.

```bash
npx npm-home --github react-native-localize
```

--------------------------------

### Install Expo Packages in Terminal

Source: https://docs.expo.dev/config-plugins/development-for-libraries

This command demonstrates how to install a package into your Expo project using the `npx expo install` utility. It ensures that the installed package is compatible with your current Expo SDK version.

```bash
npx expo install package
```

--------------------------------

### Configure and Deploy Expo Web App to GitHub Pages

Source: https://docs.expo.dev/archive/publishing-websites-webpack

This section provides step-by-step instructions and code examples for deploying an Expo web application to GitHub Pages. It covers initializing a Git repository, configuring remote origins, installing the 'gh-pages' package, modifying the 'package.json' file with a homepage URL and deployment scripts, and executing the final deployment command.

```shell
git init
```

```shell
git remote add origin https://github.com/username/expo-gh-pages.git
```

```shell
yarn add -D gh-pages
```

```json
{
  "homepage": "http://dev.github.io/expo-gh-pages"
}
```

```json
{
  "scripts": {
    "deploy": "gh-pages -d web-build",
    "predeploy": "expo export:web"
  }
}
```

```shell
yarn deploy
```

--------------------------------

### Initialize Firebase Project for Hosting

Source: https://docs.expo.dev/archive/publishing-websites-webpack

This command initializes a Firebase project in your current directory, setting up necessary configuration files like `firebase.json`. During initialization, specify `web-build` as the public directory and configure as a single-page app.

```Terminal
firebase init
```

--------------------------------

### Get Application Installation Time using Expo Application

Source: https://docs.expo.dev/versions/v54.0.0/sdk/application

This asynchronous function fetches the timestamp when the application was first installed on the device. It returns a Promise that resolves to a `Date` object, representing the installation time. On web, this method returns `null`.

```javascript
await Application.getInstallationTimeAsync();
```

--------------------------------

### Initialize New Expo Module for Monorepo

Source: https://docs.expo.dev/modules/use-standalone-expo-module-in-your-project

Initializes a new Expo module within a monorepo's `packages` directory using `create-expo-module`. The `--no-example` flag skips the creation of an example app, which is often redundant in a monorepo setup. This command prepares a standalone module structure for local development.

```bash
npx create-expo-module packages/expo-settings --no-example
```

--------------------------------

### Import and verify expo-constants in JavaScript

Source: https://docs.expo.dev/bare/installing-expo-modules

Verify Expo installation by importing expo-constants and logging system fonts. After running 'npx expo install expo-constants' and 'npx expo run', add this code to your application to confirm proper setup.

```javascript
import Constants from 'expo-constants';
console.log(Constants.systemFonts);
```

--------------------------------

### Run Expo Prebuild to Apply Config Plugins

Source: https://docs.expo.dev/config-plugins/plugins

Executes the `expo prebuild` command with `--clean` and `--no-install` flags to regenerate native project files and apply any configured plugins without reinstalling node modules. This step is necessary to see custom plugin effects in native projects.

```bash
npx expo prebuild --clean --no-install
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/v53.0.0/sdk/font

Install the expo-font library in your Expo project using the Expo CLI. This command handles all necessary dependencies and setup for your React Native environment.

```APIDOC
## Installation

### Description
Install expo-font library for loading and managing custom fonts in React Native applications.

### Command
```
npx expo install expo-font
```

### Requirements
- Expo project or existing React Native app with expo installed
- Node.js and npm/yarn package manager

### Notes
For existing React Native apps, ensure `expo` is installed in the project before installing `expo-font`.
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/v53.0.0/sdk/safe-area-context

Instructions for installing react-native-safe-area-context in your Expo or React Native project.

```APIDOC
## Installation

### For Expo Projects
```bash
npx expo install react-native-safe-area-context
```

### For Existing React Native Apps
1. Install expo in your project
2. Follow the library's README installation instructions
3. Add SafeAreaProvider to your app root

### Bundled Version
- Current bundled version: 5.4.0

### Supported Platforms
- Android
- iOS
- tvOS
- Web
```

--------------------------------

### Replace Yarn with Bun for Package Management in GitHub Actions

Source: https://docs.expo.dev/eas-update/github-actions

These YAML snippets demonstrate how to modify an existing GitHub Actions workflow (like `update.yml` or `preview.yml`) to use Bun as the package manager instead of Yarn. The first snippet replaces the `actions/setup-node` action with `oven-sh/setup-bun@v1` for Bun installation, and the second updates the dependency installation command to `bun install`.

```yaml
- name: Setup Bun
  uses: oven-sh/setup-bun@v1
  with:
    bun-version: latest
```

```yaml
- name: Install dependencies
  run: bun install
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/unversioned/sdk/sharing

Install the expo-sharing library in your Expo project using the provided npm command.

```APIDOC
## Installation

### Description
Install the expo-sharing library in your project.

### Command
```bash
npx expo install expo-sharing
```

### Requirements
- Expo SDK installed in your project
- For existing React Native apps, ensure `expo` is also installed in the project
```

--------------------------------

### Example: Publish Production Update with Message

Source: https://docs.expo.dev/eas-update/migrate-from-classic-updates

Illustrates how to publish an update to the 'production' channel, including a specific message describing the changes. This is a common use case for deploying bug fixes or new features to your live application.

```Terminal
eas update --channel production --message "Fixes typo"
```

--------------------------------

### Expo Updates Protocol Client Request Headers

Source: https://docs.expo.dev/technical-specs/expo-updates-1

Example of a conformant Expo Updates client library GET request with required and optional headers. Includes protocol version, platform identification, runtime version, accept content-type preferences with quality values, and code signing verification headers. The example demonstrates full header structure for a client configured to perform signature verification.

```http
expo-protocol-version: 1
accept: application/expo+json;q=0.9, application/json;q=0.8, multipart/mixed
expo-platform: *
expo-runtime-version: *
expo-expect-signature: sig, keyid="root", alg="rsa-v1_5-sha256"
```

--------------------------------

### Configure postinstall script in package.json for monorepo build

Source: https://docs.expo.dev/build-reference/build-with-monorepos

This `package.json` snippet demonstrates how to add a `postinstall` script to a project within a monorepo. The script navigates up two directories to the monorepo root and then executes a `yarn build` command, ensuring all necessary dependencies in other workspaces are built after installation. This is useful for projects requiring additional setup beyond standard dependency installation.

```json
{
  "scripts": {
    "postinstall": "cd ../.. && yarn build"
  }
}
```

--------------------------------

### Execute common Expo CLI development commands

Source: https://docs.expo.dev/develop/tools

Utilize various `npx expo` commands to manage an Expo project. This includes starting the development server, prebuilding native directories, running Android/iOS builds, installing packages, and linting the codebase.

```bash
npx expo start
```

```bash
npx expo prebuild
```

```bash
npx expo run:android
```

```bash
npx expo run:ios
```

```bash
npx expo install package-name
```

```bash
npx expo lint
```

--------------------------------

### GET Application.getInstallationTimeAsync()

Source: https://docs.expo.dev/versions/unversioned/sdk/application

Asynchronously retrieves the time when the app was first installed on the device. This includes reinstallation times if the app was uninstalled and reinstalled.

```APIDOC
## Method: Application.getInstallationTimeAsync()

### Description
Gets the time the app was installed onto the device, not counting subsequent updates. If the app is uninstalled and reinstalled, this method returns the time the app was reinstalled.

### Platforms
- Android ✓
- iOS ✓
- tvOS ✓
- Web ✓

### Method
GET (Asynchronous)

### Returns
`Promise<Date>` - A Promise that fulfills with a Date object specifying the installation time

### Platform Implementation Details
- **Android**: Uses `PackageInfo.firstInstallTime`
- **iOS**: Uses the `NSFileCreationDate` of the app's document root directory
- **Web**: Returns `null`

### Example
```javascript
const installDate = await Application.getInstallationTimeAsync();
console.log(installDate); // 2019-07-18T18:08:26.121Z
```
```

--------------------------------

### GET /endpoint

Source: https://docs.expo.dev/router/web/api-routes

A GET endpoint that demonstrates how to access query parameters from the request URL. This example shows parsing query string parameters using the URL search parameters API.

```APIDOC
## GET /endpoint

### Description
An endpoint that retrieves data based on query string parameters passed in the URL. The route handler parses the URL and extracts query parameters.

### Method
GET

### Endpoint
/endpoint

### Query Parameters
- **post** (string) - Optional - The post identifier to fetch data for

### Request Example
```
GET /endpoint?post=my-post-id HTTP/1.1
Host: localhost:8081
```

### Response
#### Success Response (200 OK)
- Response body contains data for the requested post

#### Response Example
```json
{
  "id": "my-post-id",
  "data": "Post data here"
}
```

### Implementation
```typescript
export async function GET(request: Request) {
  const url = new URL(request.url);
  const post = url.searchParams.get('post');

  // fetch data for 'post'
  return Response.json({ ... });
}
```
```

--------------------------------

### Install expo-server npm package

Source: https://docs.expo.dev/versions/latest/sdk/server

Installs the expo-server library in an Expo Router project. Requires the project to be configured for server mode exports. This is the initial setup step before using any server-side APIs.

```bash
npx expo install expo-server
```

--------------------------------

### Prepare Audio Recording with Options

Source: https://docs.expo.dev/versions/latest/sdk/audio-av

Loads the recorder into memory and prepares it for recording with optional RecordingOptions. This method must be called before startAsync() and can only be called once per Recording instance. Returns a Promise that resolves with RecordingStatus or rejects if another Recording is already prepared or options are invalid.

```javascript
// prepareToRecordAsync(options)
// Parameter: options (optional) - RecordingOptions
// Default: RecordingOptionsPresets.LOW_QUALITY
// Returns: Promise<RecordingStatus>
```

--------------------------------

### Basic Calendar Usage Example

Source: https://docs.expo.dev/versions/latest/sdk/calendar

Complete example demonstrating how to request permissions, retrieve calendars, and create a new calendar using the expo-calendar library.

```APIDOC
## Complete Usage Example

### Description
Demonstrates the complete workflow for using expo-calendar: requesting permissions, fetching existing calendars, and creating a new calendar.

### Code Example
```javascript
import { useEffect } from 'react';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import * as Calendar from 'expo-calendar';

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Calendar Module Example</Text>
      <Button
        title="Create a new calendar"
        onPress={createCalendar}
      />
    </View>
  );
}

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'Expo Calendar' };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: 'Expo Calendar',
    color: 'blue',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: 'internalCalendarName',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});
```

### Key Points
- Always request permissions before accessing calendar data
- Use platform-specific logic for iOS vs Android calendar source handling
- Calendar creation requires a valid source object
- The example demonstrates the complete lifecycle from permission request to calendar creation
```

--------------------------------

### Audio.Sound - Create and Initialize

Source: https://docs.expo.dev/versions/v53.0.0/sdk/av

Create an Audio.Sound instance for audio playback. Demonstrates two approaches: direct instantiation and creation with initial source URI.

```APIDOC
## Audio.Sound - Initialize

### Description
Create and initialize an Audio.Sound object for audio playback control.

### Method
Programmatic instantiation

### Setup Audio Mode
```javascript
await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
```

### Approach 1: Direct Instantiation
```javascript
const playbackObject = new Audio.Sound();
```

### Approach 2: Create with Source URI
```javascript
const { sound: playbackObject } = await Audio.Sound.createAsync(
  { uri: 'http://foo/bar.mp3' },
  { shouldPlay: true }
);
```

### Parameters

#### createAsync() Parameters
- **source** (object) - Required - Audio source object with uri property
- **initialStatus** (object) - Optional - Initial playback status configuration
  - **shouldPlay** (boolean) - Whether to start playback immediately

### Returns
- **sound** (Audio.Sound) - The playback object for controlling audio playback

### Notes
- Both approaches create a valid playbackObject reference
- The createAsync() method combines initialization and source loading
- See Audio documentation for detailed createAsync() specifications
```

--------------------------------

### Install Drawer Navigator Dependencies (Expo, SDK 54+)

Source: https://docs.expo.dev/router/advanced/drawer

Installs the necessary `react-navigation/drawer`, `react-native-reanimated`, and `react-native-worklets` packages for the drawer navigator in Expo projects. This setup is specific to SDK 54 and later, enabling animations on Android and iOS.

```bash
npx expo install @react-navigation/drawer react-native-reanimated react-native-worklets
```

--------------------------------

### Initialize a New Local Expo Module (Terminal)

Source: https://docs.expo.dev/modules/get-started

Create a new local Expo module within your existing project's directory. This command generates a 'modules' folder containing your new module, allowing for integrated development and testing.

```shell
npx create-expo-module@latest --local
```

--------------------------------

### Automatic setup of Expo with Next.js template

Source: https://docs.expo.dev/guides/using-nextjs

Quickly initialize a new Expo project pre-configured for Next.js web integration. This command creates a project that can share components between mobile and web, streamlining development. After creation, use `npx expo start` for native and `npx next dev` for web.

```Terminal
npx create-expo-app -e with-nextjs
```

--------------------------------

### Install React Native View Shot and Expo Media Library

Source: https://docs.expo.dev/tutorial/screenshot

This command installs the necessary `react-native-view-shot` library for capturing view content and `expo-media-library` for managing media permissions and saving images on an Expo project.

```bash
npx expo install react-native-view-shot expo-media-library
```

--------------------------------

### Install Netlify CLI Globally

Source: https://docs.expo.dev/archive/publishing-websites-webpack

Install the Netlify command-line interface globally using npm to enable deployment and management of Netlify projects directly from your terminal.

```Terminal
npm install -g netlify-cli
```

--------------------------------

### Expo Router Installation and Configuration

Source: https://docs.expo.dev/versions/unversioned/sdk/router

Learn how to install Expo Router in your project and configure it using the app config. The config plugin handles routing setup automatically when using the default template.

```APIDOC
## Installation

### Description
Install Expo Router in your project to enable file-based routing for React Native and web applications.

### Installation Guide
Follow the official Expo Router installation guide to set up the library in your project.

## Configuration

### Description
Configure Expo Router using the app config file. The config plugin is pre-configured in default project templates.

### Configuration File
**File:** app.json

### Configuration Example
```json
{
  "expo": {
    "plugins": ["expo-router"]
  }
}
```

### Notes
- The `expo-router` config plugin is automatically included in new projects created with the default template
- No additional configuration is required for basic routing functionality
- For advanced configurations, refer to the Router 101 guide
```

--------------------------------

### registerRootComponent Setup

Source: https://docs.expo.dev/versions/v53.0.0/sdk/expo

Configuration guide for setting up the registerRootComponent function in React Native projects to enable Expo modules functionality. Required for projects managing native directories manually.

```APIDOC
## registerRootComponent Setup

### Description
Sets up the registerRootComponent function for existing React Native projects managing native directories manually. This is necessary for Expo modules to work correctly.

### Android Configuration

#### File
`android/app/src/main/your-package/MainActivity.java`

#### Update
Modify the `getMainComponentName()` function to return `"main"`:

```java
@Override
protected String getMainComponentName() {
  return "main";
}
```

### iOS Configuration

#### File
`ios/your-project/AppDelegate.(m|mm|swift)`

#### Update
Use moduleName `main` in the `createRootViewWithBridge:bridge moduleName:@"main" initialProperties:initProps` line of the `application:didFinishLaunchingWithOptions:` function.

### Custom Entry Point Configuration

#### package.json Setup
```json
{
  "main": "src/main.jsx"
}
```

#### Custom Entry File (src/main.jsx)
```javascript
import { registerRootComponent } from 'expo';
import { View } from 'react-native';

function App() {
  return <View />;
}

registerRootComponent(App);
```

### Notes
- For projects not using Expo Router, set the `"main"` field in package.json to any file within your project
- For projects using Expo Router, follow the installation guide and use the src directory reference for more information
- The `export default` will not make a component the root if using a custom entry file; use `registerRootComponent` instead
```

--------------------------------

### Installation - Expo Accelerometer

Source: https://docs.expo.dev/versions/latest/sdk/accelerometer

Install the expo-sensors package which includes the Accelerometer module. Requires npx expo CLI and existing expo setup in your React Native project.

```APIDOC
## Installation

### Description
Install the Expo Accelerometer library from the expo-sensors package

### Command
```bash
npx expo install expo-sensors
```

### Requirements
- React Native project with Expo configured
- Node.js and npm installed
- Expo CLI available

### Notes
- If installing in an existing React Native app, ensure expo is also installed in the project
- Bundled version: ~15.0.8
- Supported platforms: Android, iOS (device only), Web
```

--------------------------------

### Install core dependencies for Expo Next.js manual setup

Source: https://docs.expo.dev/guides/using-nextjs

Manually add the essential packages `expo`, `next`, and `@expo/next-adapter` to your project. These dependencies are crucial for integrating Expo with Next.js for web development.

```Terminal
yarn add expo next @expo/next-adapter
```

--------------------------------

### Install Expo Battery Package

Source: https://docs.expo.dev/versions/latest/sdk/battery

Install the expo-battery package into your React Native or Expo project using the CLI. This command handles platform-specific setup and adds the necessary dependencies.

```bash
npx expo install expo-battery
```

--------------------------------

### Complete Usage Example

Source: https://docs.expo.dev/versions/unversioned/sdk/clipboard

A full React Native application example demonstrating how to use clipboard operations including copying text and fetching clipboard content with user interactions.

```APIDOC
## Complete Clipboard Usage Example

### Description
Full example application showing copy to clipboard and read from clipboard functionality.

### Implementation
```
import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';

export default function App() {
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync('hello world');
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  return (
    <View style={styles.container}>
      <Button title="Click here to copy to Clipboard" onPress={copyToClipboard} />
      <Button title="View copied text" onPress={fetchCopiedText} />
      <Text style={styles.copiedText}>{copiedText}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  copiedText: {
    marginTop: 10,
    color: 'red',
  },
});
```

### Features
- State management with useState hook
- Async copy operation to clipboard
- Async read operation from clipboard
- UI display of clipboard content
- Styled components with React Native StyleSheet
```

--------------------------------

### prepareToRecordAsync(options)

Source: https://docs.expo.dev/versions/v54.0.0/sdk/audio-av

Loads the recorder into memory and prepares it for recording. This method must be called before startAsync() and can only be called if the Recording instance has never been prepared. Returns a Promise that resolves with RecordingStatus when successful.

```APIDOC
## prepareToRecordAsync(options)

### Description
Loads the recorder into memory and prepares it for recording. This must be called before calling `startAsync()`. This method can only be called if the `Recording` instance has never yet been prepared.

### Method
Async Function

### Parameters
#### Options
- **options** (RecordingOptions) - Optional - RecordingOptions for the recording, including sample rate, bitrate, channels, format, encoder, and extension. Defaults to `Audio.RecordingOptionsPresets.LOW_QUALITY`

### Returns
- **Promise<RecordingStatus>** - A Promise that is fulfilled when the recorder is loaded and prepared, or rejects if this failed. If another Recording exists that is currently prepared to record, the Promise will reject. If the RecordingOptions provided are invalid, the Promise will also reject.

### Response Example
```
{
  "canRecord": true,
  "isRecording": false,
  "durationMillis": 0
}
```
```

--------------------------------

### Install react-native-keyboard-controller with Expo

Source: https://docs.expo.dev/versions/latest/sdk/keyboard-controller

This snippet demonstrates how to install the `react-native-keyboard-controller` library using `npx expo install`. It is recommended for Expo projects or existing React Native apps that have Expo installed. Ensure `expo` is part of your project's dependencies for proper installation.

```bash
npx expo install react-native-keyboard-controller
```

--------------------------------

### Get Google Play Store install referrer

Source: https://docs.expo.dev/versions/latest/sdk/application

Asynchronously retrieve the referrer URL from the Google Play Store Install Referrer API for Android devices. Returns a Promise that resolves with a string containing referrer parameters, typically in the format of URL query parameters. Only available on Android.

```javascript
await Application.getInstallReferrerAsync();
// "utm_source=google-play&utm_medium=organic"
```

--------------------------------

### Minimal React Native example with SafeAreaProvider and useSafeAreaInsets

Source: https://docs.expo.dev/develop/user-interface/safe-areas

A complete, self-contained example demonstrating the integration of `SafeAreaProvider` at the application root and the `useSafeAreaInsets` hook within a child screen component. This setup ensures that content is rendered correctly within the device's safe areas by dynamically adjusting padding.

```typescript
import { Text, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

function HomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Text style={{ fontSize: 28 }}>Content is in safe area.</Text>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <HomeScreen />
    </SafeAreaProvider>
  );
}
```

--------------------------------

### View npm Package README with npm-home

Source: https://docs.expo.dev/workflow/using-libraries

Quickly displays the README documentation for an installed npm package using npm-home command. Useful for accessing installation instructions and usage guidelines without navigating to the package website.

```bash
npx npm-home @react-navigation/native
```

--------------------------------

### Execute single and multiline shell commands in EAS Build

Source: https://docs.expo.dev/custom-builds/schema

This example illustrates how to define steps that execute both single-line and multiline shell commands directly. It shows an `echo "Hello world"` command followed by a multiline block using YAML's `|` literal style to print "Multiline bash commands".

```yaml
build:
  name: Run inline shell commands
  steps:
    - run: echo "Hello world"
    - run: |
        echo "Multiline"
        echo "bash commands"
```

--------------------------------

### Perform initial web app deployment using EAS CLI

Source: https://docs.expo.dev/deploy/web

This command publishes your web app to EAS Hosting for the first time. Upon initial execution, it will prompt you to select a preview subdomain for your project, which is used for generating preview and production URLs.

```shell
eas deploy
```

--------------------------------

### Basic unit test setup with mocked Expo module

Source: https://docs.expo.dev/modules/mocking

This example demonstrates a fundamental unit test setup using Jest for an Expo module. It imports both the main JavaScript module and its mocked native counterpart, then uses `expect().toHaveBeenCalledWith()` to assert that a native module function (`doSomething`) is invoked with the correct parameters during the test execution.

```JavaScript
import * as MyModule from '../MyModule';
import ExpoMyModule from '../ExpoMyModule';

describe('MyModule', () => {
  it('calls native module with correct parameters', async () => {
    await MyModule.doSomething('test-param');
    expect(ExpoMyModule.doSomething).toHaveBeenCalledWith('test-param');
  });
});
```

--------------------------------

### Define a single step for a simple EAS Build action

Source: https://docs.expo.dev/custom-builds/schema

This snippet demonstrates a basic EAS Build configuration with a single step. The build, named "Greeting," executes a simple `echo "Hello world"` command, showcasing how to define a minimal set of actions.

```yaml
build:
  name: Greeting
  steps:
    - run: echo "Hello world"
```

--------------------------------

### Define Initial Expo Module Structure and getTheme Function

Source: https://docs.expo.dev/modules/native-module-tutorial

These code snippets collectively define the initial structure of the `expo-settings` native module across Android (Kotlin), iOS (Swift), and JavaScript (TypeScript). They register the module, implement a basic `getTheme` function that returns 'system', and expose this function to the JavaScript environment for consumption. This setup provides the foundational boilerplate for further native module development.

```kotlin
package expo.modules.settings

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoSettingsModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoSettings")

    Function("getTheme") {
      return@Function "system"
    }
  }
}
```

```swift
import ExpoModulesCore

public class ExpoSettingsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoSettings")

    Function("getTheme") { () -> String in
      "system"
    }
  }
}
```

```typescript
export type ExpoSettingsModuleEvents = {};
```

```typescript
import { NativeModule, requireNativeModule } from 'expo';

import { ExpoSettingsModuleEvents } from './ExpoSettings.types';

declare class ExpoSettingsModule extends NativeModule<ExpoSettingsModuleEvents> {
  getTheme: () => string;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoSettingsModule>('ExpoSettings');
```

```typescript
import ExpoSettingsModule from './ExpoSettingsModule';

export function getTheme(): string {
  return ExpoSettingsModule.getTheme();
}
```

--------------------------------

### Serve Static Web Build Locally

Source: https://docs.expo.dev/archive/publishing-websites-webpack

Use the `serve` CLI tool to host the static bundle from the `web-build` directory locally, allowing for quick testing of the website's production behavior. The application will be accessible via HTTP at `http://localhost:5000`.

```Terminal
npx serve web-build --single
```

--------------------------------

### POST prepareToRecordAsync(options) - Prepare Recording

Source: https://docs.expo.dev/versions/v54.0.0/sdk/audio

Prepares the recorder for recording with optional configuration settings. Must be called before starting a recording session. Initializes the necessary resources and applies recording options.

```APIDOC
## POST AudioRecorder.prepareToRecordAsync()

### Description
Prepares the recording for recording.

### Method
Async Function

### Parameters
- **options** (Partial<RecordingOptions>) - Optional - Configuration options for the recording session.

### Returns
`Promise<void>`

### Usage Example
```javascript
const recorder = new AudioRecorder();
await recorder.prepareToRecordAsync({
  // Recording options
});
```
```

--------------------------------

### Run EAS Workflow Command

Source: https://docs.expo.dev/eas/workflows/get-started

Execute an EAS workflow from the command line. This command triggers the specified workflow file and begins the CI/CD process on the EAS cloud infrastructure.

```bash
npx eas-cli@latest workflow:run create-production-builds.yml
```

--------------------------------

### Manual Update Checking Pattern

Source: https://docs.expo.dev/versions/v52.0.0/sdk/updates

Complete example implementation for manually checking, downloading, and applying updates instead of using automatic launch-time checks. Includes configuration steps and React Native code example.

```APIDOC
## Manual Update Checking Pattern

### Description
Implement manual update checking as an alternative to automatic launch-time checks.

### Configuration Steps

#### Step 1: Disable Automatic Checks
In app.json, set checkAutomatically to ON_ERROR_RECOVERY or NEVER:
```json
{
  "expo": {
    "plugins": [
      [
        "expo-updates",
        {
          "checkAutomatically": "NEVER"
        }
      ]
    ]
  }
}
```

#### Step 2: Add Manual Check Code
Implement in your React component (App.js):
```javascript
import { View, Button } from 'react-native';
import * as Updates from 'expo-updates';

function App() {
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();
      
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  return (
    <View>
      <Button title="Fetch update" onPress={onFetchUpdateAsync} />
    </View>
  );
}

export default App;
```

### Flow
1. User taps "Fetch update" button
2. checkForUpdateAsync() checks for available updates
3. If available, fetchUpdateAsync() downloads the update
4. reloadAsync() restarts app with new update
5. Errors caught and displayed to user

### Benefits
- User-controlled update timing
- Can show custom UI/messaging
- Better battery and data usage control
- Improved user experience for update timing
```

--------------------------------

### Example babel.config.js Using Node.js Path

Source: https://docs.expo.dev/guides/using-eslint

This `babel.config.js` example illustrates how to utilize Node.js modules like `path` and the `__dirname` global within a Babel configuration file, assuming ESLint has been configured to recognize Node.js globals for this file.

```JavaScript
import path from 'path';
const __dirname = path.dirname(__filename);

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
```

--------------------------------

### Install Maestro for Mobile UI Testing in EAS

Source: https://docs.expo.dev/custom-builds/schema

This YAML configuration illustrates how to install Maestro, a mobile UI testing framework, within an EAS build process. The `eas/install_maestro` step ensures Maestro and its dependencies are available, allowing you to specify a particular `maestro_version`. This setup is typically followed by a `run` step to execute Maestro tests, and then `eas/upload_artifact` can be used to store test results.

```yaml
build:
  name: Build and test
  steps:
    - eas/build
    # ... simulator/emulator setup
    - eas/install_maestro:
        inputs:
          maestro_version: 1.35.0
    - run:
        command: maestro test flows/signin.yml
    - eas/upload_artifact:
        name: Upload Maestro artifacts
        inputs:
          type: build-artifact
          path: ${ eas.env.HOME }/.maestro/tests
```

--------------------------------

### Record audio with Expo AV in React Native

Source: https://docs.expo.dev/versions/latest/sdk/audio-av

Illustrates how to implement audio recording functionality in a React Native app using `expo-av`. This example covers requesting microphone permissions, configuring audio modes for recording, starting and stopping the recording, and retrieving the URI of the recorded file.

```javascript
import { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  async function startRecording() {
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
  }

  return (
    <View style={styles.container}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
```

--------------------------------

### Example `ImagePicker` result objects across Android, iOS, and Web platforms

Source: https://docs.expo.dev/tutorial/image-picker

These JSON examples illustrate the structure of the `result` object returned by `ImagePicker.launchImageLibraryAsync()` after an image is selected. They highlight differences in properties like `assetId`, `fileName`, `fileSize`, `height`, `width`, `mimeType`, and `uri` across various platforms (Android, iOS, and web).

```json
{
  "assets": [
    {
      "assetId": null,
      "base64": null,
      "duration": null,
      "exif": null,
      "fileName": "ea574eaa-f332-44a7-85b7-99704c22b402.jpeg",
      "fileSize": 4513577,
      "height": 4570,
      "mimeType": "image/jpeg",
      "rotation": null,
      "type": "image",
      "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FStickerSmash-13f21121-fc9d-4ec6-bf89-bf7d6165eb69/ImagePicker/ea574eaa-f332-44a7-85b7-99704c22b402.jpeg",
      "width": 2854
    }
  ],
  "canceled": false
}
```

```json
{
  "assets": [
    {
      "assetId": "99D53A1F-FEEF-40E1-8BB3-7DD55A43C8B7/L0/001",
      "base64": null,
      "duration": null,
      "exif": null,
      "fileName": "IMG_0004.JPG",
      "fileSize": 2548364,
      "height": 1669,
      "mimeType": "image/jpeg",
      "type": "image",
      "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FStickerSmash-13f21121-fc9d-4ec6-bf89-bf7d6165eb69/ImagePicker/ea574eaa-f332-44a7-85b7-99704c22b402.jpeg",
      "width": 1668
    }
  ],
  "canceled": false
}
```

```json
{
  "assets": [
    {
      "fileName": "some-image.png",
      "height": 720,
      "mimeType": "image/png",
      "uri": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAA"
    }
  ],
  "canceled": false
}
```

--------------------------------

### Complete Usage Example

Source: https://docs.expo.dev/versions/v52.0.0/sdk/live-photo

A full example demonstrating how to integrate expo-live-photo with expo-image-picker to select and display Live Photos in a React Native application.

```APIDOC
## LivePhotoScreen Component Example

### Description
Complete working example showing Live Photo selection, display, and playback control integration.

### Implementation

```typescript
import * as ImagePicker from 'expo-image-picker';
import { LivePhotoAsset, LivePhotoView, LivePhotoViewType } from 'expo-live-photo';
import { useRef, useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

export default function LivePhotoScreen() {
  const viewRef = useRef<LivePhotoViewType>(null);
  const [livePhoto, setLivePhoto] = useState<LivePhotoAsset | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['livePhotos'],
    });

    if (!result.canceled && result.assets[0].pairedVideoAsset?.uri) {
      setLivePhoto({
        photoUri: result.assets[0].uri,
        pairedVideoUri: result.assets[0].pairedVideoAsset.uri,
      });
    } else {
      console.error('Failed to pick a live photo');
    }
  };

  if (!LivePhotoView.isAvailable()) {
    return (
      <View style={styles.container}>
        <Text>expo-live-photo is not available on this platform</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LivePhotoView
        ref={viewRef}
        source={livePhoto}
        style={[styles.livePhotoView, { display: livePhoto ? 'flex' : 'none' }]}
        onLoadComplete={() => {
          console.log('Live photo loaded successfully!');
        }}
        onLoadError={error => {
          console.error('Failed to load the live photo: ', error.message);
        }}
      />
      <View style={livePhoto ? styles.pickImageCollapsed : styles.pickImageExpanded}>
        <Button title={livePhoto ? 'Change Image' : 'Pick an image'} onPress={pickImage} />
      </View>
      <Button title="Start Playback Hint" onPress={() => viewRef.current?.startPlayback('hint')} />
      <Button title="Start Playback" onPress={() => viewRef.current?.startPlayback('full')} />
      <Button title="Stop Playback" onPress={() => viewRef.current?.stopPlayback()} />
    </View>
  );
}
```

### Key Features
- Platform availability check with `isAvailable()`
- Image picker integration for Live Photo selection
- Playback control with hint and full modes
- Error handling with `onLoadError` callback
- Responsive UI that adapts based on photo selection state
```

--------------------------------

### Configure Custom Entry Point in package.json

Source: https://docs.expo.dev/router/installation

Update the `main` property in `package.json` to point to your custom entry file, such as `index.js`. This tells Expo Router to use your specified file for initial app setup and side-effect loading.

```JSON
{
  "main": "index.js"
}
```

--------------------------------

### Initial EAS Build eas.json Configuration

Source: https://docs.expo.dev/build-reference/variants

This snippet illustrates a basic `eas.json` configuration for EAS Build. It defines build profiles for `development` and `production`, with `developmentClient` enabled for the development profile. This setup is common for projects using EAS Build before introducing environment-specific variables.

```json
{
  "build": {
    "development": {
      "developmentClient": true
    },
    "production": {}
  }
}
```

--------------------------------

### Run package.json scripts with Bun

Source: https://docs.expo.dev/guides/using-bun

Execute any script defined in package.json using Bun's run command. This example runs the iOS development server with Bun's faster startup time.

```bash
bun run ios
```

--------------------------------

### Install react-native-webview with Expo CLI

Source: https://docs.expo.dev/versions/latest/sdk/webview

This snippet provides the command to install the `react-native-webview` library using `npx expo install`. This is the recommended method for integrating web content capabilities into an Expo or existing React Native project.

```bash
npx expo install react-native-webview
```

--------------------------------

### Create new Expo app project

Source: https://docs.expo.dev/eas-update/getting-started

This command initializes a new Expo project named 'my-app', providing a quick 'Hello world' app suitable for use with EAS Update. It's compatible with various project bootstrapping tools like `create-react-native-app` or `ignite-cli`.

```shell
npx create-expo-app my-app
```

--------------------------------

### Install Vercel CLI Globally

Source: https://docs.expo.dev/archive/publishing-websites-webpack

Install the latest version of the Vercel command-line interface globally using npm to enable seamless deployment of your projects to Vercel.

```Terminal
npm install -g vercel@latest
```

--------------------------------

### Enhance MainActivity onCreate() with Release Level Configuration

Source: https://docs.expo.dev/bare/upgrade_fromSdk=53&toSdk=54

Replaces direct SoLoader initialization and architecture loading with a try-catch block that sets the release level from BuildConfig. Adds error handling to default to STABLE release level if configuration parsing fails, followed by loadReactNative call.

```kotlin
// Old implementation
SoLoader.init(this, OpenSourceMergedSoMapping)
if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
  // If you opted-in for the New Architecture, we load the native entry point for this app.
  load()
}

// New implementation
try {
  DefaultNewArchitectureEntryPoint.releaseLevel = ReleaseLevel.valueOf(BuildConfig.REACT_NATIVE_RELEASE_LEVEL.uppercase())
} catch (e: IllegalArgumentException) {
  DefaultNewArchitectureEntryPoint.releaseLevel = ReleaseLevel.STABLE
}
loadReactNative(this)
```

--------------------------------

### Linking.openURL

Source: https://docs.expo.dev/versions/latest/sdk/linking

Attempt to open the given URL with an installed app. See the Linking guide for more information.

```APIDOC
## Linking.openURL

### Description
Attempt to open the given URL with an installed app. See the Linking guide for more information.

### Method
Utility

### Endpoint
Linking.openURL

### Parameters
#### Function Arguments
- **url** (string) - Required - A URL for the operating system to open. For example: `tel:5555555`, `exp://`.

### Request Example
{
  "url": "exp://my-app"
}

### Response
#### Success Response (200)
- **status** (boolean) - A `Promise` that is fulfilled with `true` if the link is opened operating system automatically or the user confirms the prompt to open the link. The `Promise` rejects if there are no applications registered for the URL or the user cancels the dialog.

#### Response Example
{
  "success": true
}
```

--------------------------------

### POST Audio.Recording.createAsync

Source: https://docs.expo.dev/versions/v53.0.0/sdk/audio-av

Creates and starts a new audio recording with specified options and optional status callbacks. This method initializes the recording, prepares it with the provided options, and begins recording immediately. The method returns both the recording object and its status.

```APIDOC
## POST Audio.Recording.createAsync

### Description
Creates and starts a recording using the given options, with optional onRecordingStatusUpdate callback and progress update interval.

### Method
POST

### Endpoint
Audio.Recording.createAsync(options, onRecordingStatusUpdate, progressUpdateIntervalMillis)

### Parameters
#### Optional Parameters
- **options** (RecordingOptions) - Optional - Options for the recording, including sample rate, bitrate, channels, format, encoder, and extension. Default: `Audio.RecordingOptionsPresets.LOW_QUALITY`
- **onRecordingStatusUpdate** (null | (status: RecordingStatus) => void) - Optional - A callback function taking a single parameter status (a dictionary). Default: `null`
- **progressUpdateIntervalMillis** (null | number) - Optional - The interval between calls of onRecordingStatusUpdate in milliseconds. Default: `null` (defaults to 500ms)

### Request Example
```javascript
const { recording, status } = await Audio.Recording.createAsync(
  Audio.RecordingOptionsPresets.HIGH_QUALITY,
  (status) => console.log('Recording status:', status),
  500
);
```

### Response
#### Success Response (200)
- **recording** (RecordingObject) - The created recording object
- **status** (RecordingStatus) - The current status of the recording

#### Response Example
```javascript
{
  "recording": {
    "_uri": "file:///path/to/recording.caf",
    "_isMeteringEnabled": false
  },
  "status": {
    "canRecord": true,
    "isRecording": true,
    "isDoneRecording": false
  }
}
```

### Error Handling
The Promise is rejected if creation fails. Wrap in try-catch to handle errors.

### Notes
This is equivalent to manually calling prepareToRecordAsync(), setOnRecordingStatusUpdate(), and startAsync().
```

--------------------------------

### Define basic custom build configuration in YAML for EAS

Source: https://docs.expo.dev/custom-builds/get-started

This YAML configuration file, typically located at `.eas/build/hello-world.yml`, defines a custom build process named 'Hello World!'. It includes a single step that runs the shell command `echo "Hello, world!"`. This structure allows for custom actions to be integrated into the EAS build lifecycle.

```yaml
build:
  name: Hello World!
  steps:
    - run: echo "Hello, world!"
    # A built-in function (optional)

```

--------------------------------

### Basic Usage Example

Source: https://docs.expo.dev/versions/unversioned/sdk/brightness

A complete example demonstrating how to use the Expo Brightness API in a React Native application, including permission handling and brightness adjustment.

```APIDOC
## Basic Brightness Usage Example

### Complete Implementation
Here is a complete example of using the Expo Brightness API:

```javascript
import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Brightness from 'expo-brightness';

export default function App() {
  useEffect(() => {
    (async () => {
      // Request permissions to modify brightness
      const { status } = await Brightness.requestPermissionsAsync();
      
      if (status === 'granted') {
        // Set brightness to maximum (1.0)
        await Brightness.setSystemBrightnessAsync(1);
        
        // Get current brightness level
        const currentBrightness = await Brightness.getBrightnessAsync();
        console.log('Current brightness:', currentBrightness);
        
        // Check if API is available
        const isAvailable = await Brightness.isAvailableAsync();
        console.log('Brightness API available:', isAvailable);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Brightness Module Example</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
```
```

--------------------------------

### Displaying 'Hello World' in a Basic React Native Component

Source: https://docs.expo.dev/tutorial/introduction

This React Native snippet demonstrates a foundational component named `Index` that renders the text 'Hello world!' centered on the screen. It utilizes `StyleSheet` for styling, `View` as a container, and `Text` for displaying content, providing a basic example of component structure and layout in an Expo app.

```javascript
import { StyleSheet, Text, View } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text>Hello world!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

--------------------------------

### Start EAS CLI for Google Service Account Key Management

Source: https://docs.expo.dev/push-notifications/fcm-credentials

Run this command to open the interactive Expo Application Services (EAS) CLI, which guides you through the process of managing and uploading your Google Service Account Key for FCM V1 push notifications for Android. You will be prompted to select options like 'Android', 'production', and 'Google Service Account' to proceed with the key setup.

```shell
eas credentials
```

--------------------------------

### Initial Expo app.json Configuration

Source: https://docs.expo.dev/build-reference/variants

This snippet shows a basic `app.json` configuration for an Expo project. It defines the app's `name`, `slug`, and platform-specific identifiers like `bundleIdentifier` for iOS and `package` for Android. This configuration serves as the default setup before introducing variant-specific customizations.

```json
{
  "expo": {
    "name": "MyApp",
    "slug": "my-app",
    "ios": {
      "bundleIdentifier": "com.myapp"
    },
    "android": {
      "package": "com.myapp"
    }
  }
}
```

--------------------------------

### Capabilities Comparison: Server vs Local

Source: https://docs.expo.dev/eas/ai/mcp

Comparison of server-side and local capabilities, including feature availability, setup requirements, and use cases for each capability type.

```APIDOC
## Server Capabilities vs Local Capabilities

### Server Capabilities

#### Availability
- Remote MCP server connection only
- No local development server required

#### Available Features
- Documentation search and learning resources
- Package installation and management
- Configuration file generation (CLAUDE.md, AGENTS.md)
- Project analysis (when available)

#### Tools
- `learn` - Expo how-to learning
- `search_documentation` - Natural language documentation search
- `add_library` - Package installation
- `generate_claude_md` - CLAUDE.md generation (Claude Code only)
- `generate_agents_md` - AGENTS.md generation

### Local Capabilities

#### Requirements
- SDK 54 or later
- Local Expo development server running
- `EXPO_UNSTABLE_MCP_SERVER=1` environment variable
- Local MCP connection established

#### Available Features
- Automation tools (tap, screenshot, element finding)
- Development tools (React Native DevTools)
- Project analysis (expo-router sitemap)
- Advanced testing capabilities
- Visual verification and debugging

#### Tools
- `automation_take_screenshot` - Device screenshots
- `automation_tap` - Screen coordinate tapping
- `automation_find_view_by_testid` - View lookup by testID
- `automation_tap_by_testid` - testID-based tapping
- `automation_take_screenshot_by_testid` - testID-based screenshots
- `open_devtools` - React Native DevTools access
- `expo_router_sitemap` - Route structure analysis

### Use Cases

#### Server Capabilities
- Learning and documentation lookup
- Library installation and setup
- Project configuration
- Remote assistance without local setup

#### Local Capabilities
- Automated testing and verification
- Visual debugging and inspection
- User interaction simulation
- Deep project introspection
- Development environment interaction
```

--------------------------------

### Install and Use globalThis.localStorage with expo-sqlite

Source: https://docs.expo.dev/versions/latest/sdk/sqlite

This snippet demonstrates how to enable the global `localStorage` API using `expo-sqlite/localStorage/install`. After importing the module, `localStorage` becomes available for setting and getting key-value pairs, similar to web environments, facilitating code sharing.

```javascript
import 'expo-sqlite/localStorage/install';

globalThis.localStorage.setItem('key', 'value');
console.log(globalThis.localStorage.getItem('key')); // 'value'
```

--------------------------------

### Integrate iOS System WKWebView (Swift)

Source: https://docs.expo.dev/modules/native-view-tutorial

Integrates the native iOS `WKWebView` into the `ExpoWebView` class. It initializes the `WKWebView`, loads a hardcoded URL, and ensures the `WKWebView`'s frame matches the parent view's bounds during layout changes, enabling native web content rendering on iOS.

```Swift
import ExpoModulesCore
import WebKit

class ExpoWebView: ExpoView {
  let webView = WKWebView()

  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    clipsToBounds = true
    addSubview(webView)

    let url =  URL(string:"https://docs.expo.dev/modules/")!
    let urlRequest = URLRequest(url:url)
    webView.load(urlRequest)
  }

  override func layoutSubviews() {
    webView.frame = bounds
  }
}
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/unversioned/sdk/application

Install the expo-application library in your Expo project using the provided npm command. This package provides access to native application information at runtime.

```APIDOC
## Installation

### Command
```bash
npx expo install expo-application
```

### Requirements
- Expo CLI installed
- Existing React Native app with `expo` package installed

### Import
```javascript
import * as Application from 'expo-application';
```
```

--------------------------------

### Use Expo WebView in Example App (TypeScript)

Source: https://docs.expo.dev/modules/native-view-tutorial

Demonstrates how to import and use the custom `WebView` component within an example React Native application. It renders a full-screen `WebView` with a purple background, serving as a basic test for the integrated native view.

```TypeScript
import { WebView } from 'expo-web-view';

export default function App() {
  return <WebView style={{ flex: 1, backgroundColor: 'purple' }} />;
}
```

--------------------------------

### Linking.getInitialURL()

Source: https://docs.expo.dev/versions/latest/sdk/linking

Gets the URL that was used to launch the app if it was launched by a link. This is useful for handling deep links when the app starts.

```APIDOC
## Linking.getInitialURL()

### Description
Get the URL that was used to launch the app if it was launched by a link.

### Method
GET

### Platforms
- Android
- iOS
- tvOS
- Web

### Returns
- **Type**: `Promise<string | null>`
- **Description**: The URL string that launched your app, or `null` if the app was not launched by a link.

### Usage Example
```
const url = await Linking.getInitialURL();
if (url != null) {
  // Handle the initial URL
}
```
```

--------------------------------

### Initialize New Expo Module Project

Source: https://docs.expo.dev/modules/native-view-tutorial

Initializes a new Expo module project with a specified name. This command sets up the basic directory structure and essential files for developing a custom native module using the Expo Modules API.

```Terminal
npx create-expo-module expo-web-view
```

--------------------------------

### Start Expo Development Server with Web Support

Source: https://docs.expo.dev/guides/customizing-metro

Execute this command in your terminal to launch the Expo development server, enabling web support for your project. This allows you to preview and debug your application in a web browser. As an alternative, you can press 'W' in the Expo CLI terminal UI.

```terminal
npx expo start --web
```

--------------------------------

### Reinstall iOS Pods after Prebuild (Terminal)

Source: https://docs.expo.dev/modules/get-started

Reinstall CocoaPods dependencies if you have an existing 'ios' directory that was previously generated by 'npx expo prebuild' and you've made changes to native modules. This ensures all iOS dependencies are correctly linked.

```shell
npx pod-install
```

--------------------------------

### Create Android Upload Key with keytool

Source: https://docs.expo.dev/guides/local-app-production

Generates an RSA-based upload key for Android app signing using the keytool command-line utility. The command creates a keystore file that stores the upload key securely. Requires OpenJDK to be installed and the keystore file should be moved to the android/app directory after generation.

```bash
sudo keytool -genkey -v -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

--------------------------------

### Implement TypeScript Wrapper for Theme Module API

Source: https://docs.expo.dev/modules/native-module-tutorial

This TypeScript code provides a user-friendly wrapper around the native `ExpoSettingsModule`. It exposes functions like `addThemeListener` for subscribing to theme changes, `getTheme` to fetch the current theme, and `setTheme` to update it, abstracting the underlying native module communication.

```typescript
import { EventSubscription } from 'expo-modules-core';
import ExpoSettingsModule from './ExpoSettingsModule';
import { ThemeChangeEvent } from './ExpoSettings.types';

export function addThemeListener(listener: (event: ThemeChangeEvent) => void): EventSubscription {
  return ExpoSettingsModule.addListener('onChangeTheme', listener);
}

export function getTheme(): string {
  return ExpoSettingsModule.getTheme();
}

export function setTheme(theme: string): void {
  return ExpoSettingsModule.setTheme(theme);
}
```

--------------------------------

### Installation and Import

Source: https://docs.expo.dev/versions/v52.0.0/sdk/application

Install the expo-application library in your project and import it to access application information at runtime.

```APIDOC
## Installation

### NPM Installation

Run the following command to install the expo-application library:

```bash
npx expo install expo-application
```

### Import

Import the Application module in your code:

```javascript
import * as Application from 'expo-application';
```

### Requirements

If installing in an existing React Native app, ensure that `expo` is also installed in your project.
```

--------------------------------

### Install Expo UI package

Source: https://docs.expo.dev/guides/expo-ui-swift-ui

This command installs the `@expo/ui` package using `npx expo install`, adding the necessary dependencies to your Expo project to enable SwiftUI integration.

```bash
npx expo install @expo/ui
```

--------------------------------

### Run Deploy Command for GitHub Pages

Source: https://docs.expo.dev/guides/publishing-websites

Executes the defined `deploy` script, which first triggers the `predeploy` script to build the web app and then pushes the generated build artifacts to the `gh-pages` branch of your GitHub repository. This command initiates the GitHub Pages deployment process, making your web app available online.

```npm
npm run deploy
```

```Yarn
yarn deploy
```

--------------------------------

### Install expo-file-system package

Source: https://docs.expo.dev/versions/latest/sdk/filesystem

Installs the `expo-file-system` library into your project using the `npx expo install` command. This ensures all necessary dependencies are properly linked for both managed and bare Expo workflows. For existing React Native apps, verify that the `expo` package is also installed.

```Terminal
npx expo install expo-file-system
```

--------------------------------

### Generate new Expo TV project

Source: https://docs.expo.dev/guides/building-for-tv

Use `create-expo-app` with the `with-tv` example to quickly initialize a new Expo project pre-configured for Android TV and Apple TV development.

```bash
npx create-expo-app MyTVProject -e with-tv
```

--------------------------------

### Start Audio Recording in Expo

Source: https://docs.expo.dev/versions/v54.0.0/sdk/audio-av

Begins recording audio capture on a prepared Recording instance. Can only be called after prepareToRecordAsync() has completed successfully. Returns a Promise that resolves with RecordingStatus or rejects if recording cannot start.

```javascript
await recording.startAsync();
```

--------------------------------

### Class Method: EventEmitterType.startObserving

Source: https://docs.expo.dev/versions/latest/sdk/expo

Function that is automatically invoked when the first listener for an event with the given name is added. Override it in a subclass to perform some additional setup once the event started being observed.

```APIDOC
## CLASS METHOD EventEmitterType.startObserving

### Description
Function that is automatically invoked when the first listener for an event with the given name is added. Override it in a subclass to perform some additional setup once the event started being observed.

### Method
CLASS METHOD

### Endpoint
EventEmitterType.startObserving(eventName)

### Parameters
#### Path Parameters
- N/A

#### Query Parameters
-
```

--------------------------------

### Define Android Action for Application Settings (Java)

Source: https://docs.expo.dev/versions/latest/sdk/intent-launcher

This constant defines a general Android Intent action string for launching the overall application settings screen. It allows applications to guide users to manage all installed applications.

```Java
ActivityAction.APPLICATION_SETTINGS = "android.settings.APPLICATION_SETTINGS"
```

--------------------------------

### openApplication()

Source: https://docs.expo.dev/versions/v54.0.0/sdk/intent-launcher

Opens an application. Details on parameters and return values are not provided in the input.

```APIDOC
## Method Call openApplication()

### Description
This method is used to open a specified application. The specifics regarding its input parameters and the structure of its return value are not detailed in the available documentation.

### Method
Method Call

### Endpoint
openApplication()

### Parameters
N/A (Details not specified in the input documentation)

### Request Body
N/A (Details not specified in the input documentation)

### Request Example
```json
"N/A"
```

### Response
#### Success Response
N/A (Details not specified in the input documentation)

#### Response Example
```json
"N/A"
```
```

--------------------------------

### Start Audio Recording

Source: https://docs.expo.dev/versions/latest/sdk/audio-av

Begins recording after the Recording instance has been prepared. This method must only be called after prepareToRecordAsync() completes successfully. Returns a Promise that resolves with RecordingStatus when recording starts or rejects if recording cannot be initiated.

```javascript
// startAsync()
// Returns: Promise<RecordingStatus>
```

--------------------------------

### Configure Update Channels in eas.json

Source: https://docs.expo.dev/eas-update/getting-started

Sets up update channels in eas.json for EAS Build, allowing you to point updates at specific build profiles (preview and production). Each profile can have its own channel to manage separate deployments.

```json
{
  "build": {
    "preview": {
      "channel": "preview"
    },
    "production": {
      "channel": "production"
    }
  }
}
```

--------------------------------

### Example Apple App Site Association File for Aggressive Handoff (JSON)

Source: https://docs.expo.dev/router/advanced/apple-handoff

This JSON snippet provides an example of the `apple-app-site-association` file, critical for Apple Handoff and Universal Links. It configures `applinks` to match all routes (`"/" : "*"`) for a given `appIDs`, ensuring broad Handoff support. Replace `<APPLE_TEAM_ID>` and `<IOS_BUNDLE_ID>` with your specific app identifiers.

```json
{
  "applinks": {
    "details": [
      {
        "appIDs": ["<APPLE_TEAM_ID>.<IOS_BUNDLE_ID>"],
        "components": [
          {
            "/": "*",
            "comment": "Matches all routes"
          }
        ]
      }
    ]
  }
}
```

--------------------------------

### Run an EAS build with a specified custom profile

Source: https://docs.expo.dev/custom-builds/get-started

This terminal command initiates an EAS build process for the Android platform, specifically utilizing the build steps defined in the 'test' custom profile. It's used to test and verify the execution of your custom build configurations as part of the development workflow.

```bash
eas build -p android -e test
```

--------------------------------

### Pull existing app metadata with EAS Metadata CLI

Source: https://docs.expo.dev/eas/metadata/getting-started

Retrieve existing app store information from Apple App Store into a store.config.json file. This command is used when you already have an app published in the stores and want to automate future metadata management.

```bash
eas metadata:pull
```

--------------------------------

### Install Lottie React Native Package

Source: https://docs.expo.dev/versions/v52.0.0/sdk/lottie

Installation command for adding lottie-react-native to an Expo project using npx expo install. This ensures compatibility with the current Expo SDK version and sets up the library for use in development builds.

```bash
npx expo install lottie-react-native
```

--------------------------------

### Install Expo Package

Source: https://docs.expo.dev/guides/adopting-prebuild

Installs the `expo` package, which is essential for using the `npx expo prebuild` command and defining the prebuild template. Ensure the installed `expo` version is compatible with your project's `react-native` version.

```bash
npm install expo
```

--------------------------------

### Installation - Expo Package

Source: https://docs.expo.dev/versions/latest/sdk/expo

Install the Expo package using npm. This is the foundational package required to access all Expo APIs and utilities across web and mobile platforms.

```APIDOC
## Installation

### Method
NPM Package Installation

### Command
```
npx expo install expo
```

### Description
Installs the Expo package which provides a set of common methods and types for Expo and related packages. This package is compatible with Android, iOS, tvOS, and Web platforms.

### Supported Platforms
- Android
- iOS
- tvOS
- Web
```

--------------------------------

### Define Android Activity Action for Tether Provisioning UI

Source: https://docs.expo.dev/versions/unversioned/sdk/intent-launcher

This code defines an Android `ActivityAction` constant for launching the tethering provisioning UI. Developers can use this `Intent` action to guide users through carrier-specific tethering setup processes.

```Java
ActivityAction.TETHER_PROVISIONING_UI ＝ "android.settings.TETHER_PROVISIONING_UI"
```

--------------------------------

### Install source-map-explorer for bundle analysis

Source: https://docs.expo.dev/guides/analyzing-bundles

Installs the `source-map-explorer` library as a development dependency. This tool is used to visualize and analyze production JavaScript bundle sizes, specifically for Expo SDK 50 and earlier projects.

```bash
npm i --save-dev source-map-explorer
```

--------------------------------

### Install expo-media-library via npm

Source: https://docs.expo.dev/versions/latest/sdk/media-library

Installs the expo-media-library package and its dependencies in an Expo project using the Expo CLI.

```bash
npx expo install expo-media-library
```

--------------------------------

### Expanded EAS Workflow for Custom Android Maestro Testing

Source: https://docs.expo.dev/custom-builds/schema

This detailed YAML configuration provides a granular breakdown of an Android Maestro testing workflow, expanding the `eas/maestro_test` orb's functionality. It includes explicit steps for building, installing Maestro, starting a specific Android emulator, manually installing the APK, executing Maestro tests with `maestro test`, and uploading test artifacts for debugging and analysis.

```yaml
build:
  name: Build and test (Android, expanded)
  steps:
    - eas/build
    - eas/install_maestro
    - eas/start_android_emulator:
        inputs:
          system_package_name: system-images;android-34;default;x86_64
    - run:
        command: |
          # shopt -s globstar is necessary to add /**/ support
          shopt -s globstar
          # shopt -s nullglob is necessary not to try to install
          # SEARCH_PATH literally if there are no matching files.
          shopt -s nullglob

          SEARCH_PATH="android/app/build/outputs/**/*.apk"
          FILES_FOUND=false

          for APP_PATH in $SEARCH_PATH; do
            FILES_FOUND=true
            echo "Installing \"$APP_PATH\""
            adb install "$APP_PATH"
          done

          if ! $FILES_FOUND; then
            echo "No files found matching \"$SEARCH_PATH\". Are you sure you've built an Emulator app?"
            exit 1
          fi
    - run:
        command: |
          maestro test maestro/flow.yml
    - eas/upload_artifact:
        name: Upload test artifact
        if: ${ always() }
        inputs:
          type: build-artifact
          path: ${ eas.env.HOME }/.maestro/tests
```

--------------------------------

### GET /device/isSideLoadingEnabled

Source: https://docs.expo.dev/versions/latest/sdk/device

Checks whether applications can be installed for this user via the system's `ACTION_INSTALL_PACKAGE` mechanism rather than through the OS's default app store. This method requires the `REQUEST_INSTALL_PACKAGES` permission on Android.

```APIDOC
## GET /device/isSideLoadingEnabled

### Description
Checks whether applications can be installed for this user via the system's `ACTION_INSTALL_PACKAGE` mechanism rather than through the OS's default app store. This method requires the `REQUEST_INSTALL_PACKAGES` permission on Android.

### Method
GET

### Endpoint
/device/isSideLoadingEnabled

### Parameters
#### Path Parameters
(None)

#### Query Parameters
(None)

#### Request Body
(None)

### Request Example
{}

### Response
#### Success Response (200)
- **isEnabled** (boolean) - Represents whether the calling package is allowed to request package installation.

#### Response Example
```json
true
```
```

--------------------------------

### Initialize or Navigate to Expo Project (Terminal)

Source: https://docs.expo.dev/guides/local-https-development

This command sequence allows you to either create a new Expo project using `create-expo-app` and navigate into it, or simply change directory into an existing Expo project. It's the first step to prepare your development environment for local HTTPS setup.

```bash
# Create a new project (if needed)
npx create-expo-app@latest example-app
cd example-app

# Or navigate to existing project
cd your-expo-project
```

--------------------------------

### Xcode 'Start Packager' Build Phase Script Configuration

Source: https://docs.expo.dev/versions/unversioned/config/metro

This code block represents the 'Start Packager' build phase as defined in an Xcode project's `project.pbxproj` file. It's a shell script designed to automatically launch the Metro bundler. The document suggests removing this entire build phase as the development server should be started manually using `npx expo` for better control.

```sh
if [[ -f "$PODS_ROOT/../.xcode.env" ]]; then
 source "$PODS_ROOT/../.xcode.env"
fi
if [[ -f "$PODS_ROOT/../.xcode.env.updates" ]]; then
 source "$PODS_ROOT/../.xcode.env.updates"
fi
if [[ -f "$PODS_ROOT/../.xcode.env.local" ]]; then
 source "$PODS_ROOT/../.xcode.env.local"
fi

export RCT_METRO_PORT="${RCT_METRO_PORT:=8081}"
echo "export RCT_METRO_PORT=${RCT_METRO_PORT}" > `$NODE_BINARY --print "require('path').dirname(require.resolve('react-native/package.json')) + '/scripts/.packager.env'"`
if [ -z "${RCT_NO_LAUNCH_PACKAGER+xxx}" ] ; then
 if nc -w 5 -z localhost ${RCT_METRO_PORT} ; then
 if ! curl -s "http://localhost:${RCT_METRO_PORT}/status" | grep -q "packager-status:running" ; then
 echo "Port ${RCT_METRO_PORT} already in use, packager is either not running or not running correctly"
 exit 2
 fi
 else
 open `$NODE_BINARY --print "require('path').dirname(require.resolve('expo/package.json')) + '/scripts/launchPackager.command'"` || echo "Can't start packager automatically"
 fi
fi

```

--------------------------------

### Install Expo libraries with Bun

Source: https://docs.expo.dev/guides/using-bun

Install Expo packages and libraries using Bun's expo install command. This provides optimized dependency resolution for Expo-specific packages.

```bash
bun expo install expo-audio
```

--------------------------------

### Example: Generated iOS Podfile Entry from extraPods

Source: https://docs.expo.dev/versions/unversioned/sdk/build-properties

This snippet shows the resulting `pod` entry that would be generated in the `ios/Podfile` based on the `extraPods` configuration in `PluginConfigTypeIos`. It illustrates how the declared dependency is translated into the Podfile.

```ruby
pod 'Protobuf', '~> 3.14.0'
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/latest/sdk/intent-launcher

Install the expo-intent-launcher package in your Expo project using npm.

```APIDOC
## Installation

### Description
Install the expo-intent-launcher library in your Expo project.

### Command
```
npx expo install expo-intent-launcher
```

### Prerequisites
- Expo CLI installed
- Existing React Native or Expo project
- For existing React Native apps, ensure `expo` package is also installed
```

--------------------------------

### Install `expo-calendar` Package via `npx expo install`

Source: https://docs.expo.dev/versions/latest/sdk/calendar

Installs the `expo-calendar` library into an Expo or React Native project. This command ensures the correct version of the package is installed, compatible with your current Expo SDK, and is executed in the terminal.

```bash
npx expo install expo-calendar
```

--------------------------------

### Configure Update Channels in Android Native Project

Source: https://docs.expo.dev/eas-update/getting-started

Adds update channel configuration to AndroidManifest.xml for native Android projects not using CNG. Uses the UPDATES_CONFIGURATION_REQUEST_HEADERS_KEY metadata with JSON-encoded header values.

```xml
<meta-data android:name="expo.modules.updates.UPDATES_CONFIGURATION_REQUEST_HEADERS_KEY" android:value="{&quot;expo-channel-name&quot;:&quot;your-channel-name&quot;}"/>
```

--------------------------------

### Install @shopify/react-native-skia with Expo CLI

Source: https://docs.expo.dev/versions/latest/sdk/skia

Installation command for adding @shopify/react-native-skia to an Expo or React Native project. This command uses npx to run the Expo package installer, which handles platform-specific dependencies. For existing React Native apps, ensure Expo is already installed in your project before running this command.

```bash
npx expo install @shopify/react-native-skia
```

--------------------------------

### Bootstrap and run Expo project with specific SDK version on iOS Simulator

Source: https://docs.expo.dev/workflow/ios-simulator

These commands create a new Expo project with a desired SDK version and then open it on an iOS simulator. This process ensures the correct Expo Go app version is installed for the specified SDK.

```bash
npx create-expo-app --template blank@53
npx expo start --ios
```

--------------------------------

### Configure Multiple EAS Build Profiles for Staging and Production

Source: https://docs.expo.dev/archive/classic-updates/release-channels

This `eas.json` example demonstrates how to set up distinct build profiles for `prod` and `staging` environments, each associated with a unique release channel (`prod-v1` and `staging`). This setup facilitates managing different application versions for various user groups or deployment phases.

```json
{
  "build": {
    "prod": {
      "releaseChannel": "prod-v1"
    },
    "staging": {
      "releaseChannel": "staging"
    }
  }
}
```

--------------------------------

### Set up KeyboardProvider in Root Layout

Source: https://docs.expo.dev/guides/keyboard-handling

Configure the KeyboardProvider component in the root layout file to enable keyboard controller functionality across the entire app. This wraps the Stack navigator and any child components.

```typescript
import { Stack } from 'expo-router';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export default function RootLayout() {
  return (
    <KeyboardProvider>
      <Stack>
        <Stack.Screen name="home" />
        <Stack.Screen name="chat" />
      </Stack>
    </KeyboardProvider>
  );
}
```

--------------------------------

### Push store configuration to app stores with EAS Metadata

Source: https://docs.expo.dev/eas/metadata/getting-started

Upload the store.config.json file to Apple App Store after a new app binary has been submitted and processed. This command validates the configuration and uploads metadata to the app stores. If issues are found, it warns the user and allows retry with confirmation.

```bash
eas metadata:push
```

--------------------------------

### Expo Haptics - Complete Usage Example

Source: https://docs.expo.dev/versions/unversioned/sdk/haptics

A complete React Native example demonstrating all available haptic feedback methods: selection feedback, notification feedback with success/error/warning types, and impact feedback with varying intensity levels.

```APIDOC
## Complete Haptics Usage Example

### Overview
This example demonstrates all available haptic feedback methods in a React Native application.

### Full Code Example
```javascript
import { StyleSheet, View, Text, Button } from 'react-native';
import * as Haptics from 'expo-haptics';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Haptics.selectionAsync</Text>
      <View style={styles.buttonContainer}>
        <Button title="Selection" onPress={() => Haptics.selectionAsync()} />
      </View>
      
      <Text style={styles.text}>Haptics.notificationAsync</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Success"
          onPress={() =>
            Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Success
            )
          }
        />
        <Button
          title="Error"
          onPress={() =>
            Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Error
            )
          }
        />
        <Button
          title="Warning"
          onPress={() =>
            Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Warning
            )
          }
        />
      </View>
      
      <Text style={styles.text}>Haptics.impactAsync</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Light"
          onPress={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          }
        />
        <Button
          title="Medium"
          onPress={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          }
        />
        <Button
          title="Heavy"
          onPress={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
          }
        />
        <Button
          title="Rigid"
          onPress={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
          }
        />
        <Button
          title="Soft"
          onPress={() =>
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 10,
    marginBottom: 30,
    justifyContent: 'space-between',
  },
});
```

### Methods Demonstrated
1. **selectionAsync()** - Provides selection feedback
2. **notificationAsync()** - Provides Success, Error, and Warning feedback types
3. **impactAsync()** - Provides Light, Medium, Heavy, Rigid, and Soft impact feedback
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/v53.0.0/sdk/application

Install the expo-application package using expo CLI. This library provides runtime access to native application information across multiple platforms.

```APIDOC
## Installation

### Command
```
npx expo install expo-application
```

### Prerequisites
- For existing React Native apps, ensure `expo` is installed in your project

### Import
```javascript
import * as Application from 'expo-application';
```
```

--------------------------------

### Install react-native-reanimated with Expo CLI

Source: https://docs.expo.dev/develop/user-interface/animation

This command installs the `react-native-reanimated` library using `npx expo install`. It's typically used if your project wasn't created with a default Expo template that includes the library pre-installed.

```bash
npx expo install react-native-reanimated
```

--------------------------------

### Configure DatePicker with a specific date range in React Native

Source: https://docs.expo.dev/versions/unversioned/sdk/ui/swift-ui/datepicker

This example demonstrates how to restrict the selectable dates within a `DatePicker` component using the `range` prop. It sets a start and end date to define the allowed selection period.

```tsx
import { useState } from 'react';
import { Host, DatePicker } from '@expo/ui/swift-ui';

export default function DateRangePickerExample() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Host matchContents>
      <DatePicker
        title="Select a date"
        selection={selectedDate}
        displayedComponents={['date']}
        range={{
          start: new Date(2024, 0, 1),
          end: new Date(2024, 11, 31)
        }}
        onDateChange={date => {
          setSelectedDate(date);
        }}
      />
    </Host>
  );
}
```

--------------------------------

### Initialize Git Repository and Add GitHub Remote

Source: https://docs.expo.dev/guides/publishing-websites

Initializes a new Git repository in the project's root directory and configures it to push changes to a specified GitHub remote URL. This step is essential for syncing local development with a GitHub repository.

```Terminal
git init
git remote add origin https://github.com/username/expo-gh-pages.git
```

--------------------------------

### Initialize New Expo Module Project with create-expo-module (Terminal)

Source: https://docs.expo.dev/modules/config-plugin-and-native-module-tutorial

Use the `create-expo-module` command to scaffold a new Expo module project. This command sets up boilerplate code for Android, iOS, and TypeScript, along with an example application to test the module. It's the first step in creating a custom native module.

```Terminal
npx create-expo-module expo-native-configuration
```

--------------------------------

### Execute a single command in EAS Build steps

Source: https://docs.expo.dev/custom-builds/schema

This configuration shows how to use the `run` key within a step to execute a shell command. It defines a build named "Install npm dependencies" that first checks out the repository and then runs `npm install` to set up project dependencies.

```yaml
build:
  name: Install npm dependencies
  steps:
    - eas/checkout
    - run:
        name: Install dependencies
        command: npm install
```

--------------------------------

### Start Bun Server

Source: https://docs.expo.dev/router/web/api-routes

Start the Bun server to serve the Expo application. The server will be accessible at http://localhost:3000 unless a different PORT environment variable is specified.

```bash
bun run server.ts
```

--------------------------------

### Install Prettier and ESLint Integration Packages

Source: https://docs.expo.dev/guides/using-eslint

This command installs Prettier along with `eslint-config-prettier` and `eslint-plugin-prettier` as development dependencies, enabling seamless integration between ESLint and Prettier for consistent code formatting.

```Terminal
npx expo install prettier eslint-config-prettier eslint-plugin-prettier --dev
```

```Terminal
npx expo install prettier eslint-config-prettier eslint-plugin-prettier "--" --dev
```

--------------------------------

### GET Calendar.getEventAsync(id, recurringEventOptions)

Source: https://docs.expo.dev/versions/latest/sdk/calendar

Returns a specific event selected by ID. For recurring events, the start date of the specific instance must be provided since recurring event instances do not have unique stable IDs.

```APIDOC
## GET Calendar.getEventAsync(id, recurringEventOptions)

### Description
Returns a specific event selected by ID. If a specific instance of a recurring event is desired, the start date of this instance must also be provided, as instances of recurring events do not have their own unique and stable IDs on either iOS or Android.

### Method
GET

### Parameters
#### Path/Query Parameters
- **id** (string) - Required - ID of the event to return.
- **recurringEventOptions** (RecurringEventOptions) - Optional - A map of options for recurring events. Default: `{}`

### Response
#### Success Response (200)
- **event** (Event) - An Event object matching the provided criteria, if one exists.

### Return Type
Promise<Event>

### Platforms
- Android
- iOS
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/unversioned/sdk/storereview

Install the expo-store-review library in your project using npm. Ensure expo is installed in your React Native app before proceeding with the installation.

```APIDOC
## Installation

### Description
Install the expo-store-review library to access native store review APIs.

### Terminal Command
```
npx expo install expo-store-review
```

### Prerequisites
- React Native project with expo installed
- Android 5.0+ or iOS 10.3+

### Configuration
Add store URLs to your `app.json` configuration:

#### iOS Configuration
```json
{
  "ios": {
    "appStoreUrl": "https://apps.apple.com/app/apple-store/id{ITUNES_ITEM_ID}"
  }
}
```

#### Android Configuration
```json
{
  "android": {
    "playStoreUrl": "https://play.google.com/store/apps/details?id={PACKAGE_NAME}"
  }
}
```
```

--------------------------------

### Configure Update Channels in iOS Native Project

Source: https://docs.expo.dev/eas-update/getting-started

Adds update channel configuration to Expo.plist for native iOS projects. Uses a dictionary structure with the expo-channel-name key. The file must be included in the Xcode project.

```xml
<key>EXUpdatesRequestHeaders</key>
<dict>
  <key>expo-channel-name</key>
  <string>your-channel-name</string>
</dict>
```

--------------------------------

### Configure Expo Project Package.json

Source: https://docs.expo.dev/bare/upgrade_fromSdk=53&toSdk=54

Main entry point and npm scripts configuration for Expo development project. Defines start, android, and web build scripts using Expo CLI commands with dev-client flag for native development. Includes core dependencies: Expo, React, React Native, and expo-status-bar for status bar styling.

```json
{
  "main": "index.js",
  "scripts": {
    "start": "expo start --dev-client",
    "android": "expo start --android",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~53.0.20",
    "expo-status-bar": "~2.2.3",
    "react": "19.0.0",
    "react-native": "0.79.6"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  }
}
```

--------------------------------

### create(options)

Source: https://docs.expo.dev/versions/unversioned/sdk/filesystem

Creates a new file with optional configuration options. The options parameter is optional and allows customization of file creation behavior.

```APIDOC
## create(options)

### Description
Creates a new file with optional configuration options.

### Method
Instance Method

### Platforms
- Android
- iOS
- tvOS

### Parameters
#### Optional Parameters
- **options** (FileCreateOptions) - Optional file creation options

### Returns
- **Type**: `void`
```

--------------------------------

### Serve Static Web Build Locally

Source: https://docs.expo.dev/router/reference/static-rendering

Test the production static build locally using a simple HTTP server. This command starts a server to preview the generated static website before deployment.

```bash
npx serve dist
```

--------------------------------

### Define Android Activity Action for Remote Authenticator Enroll

Source: https://docs.expo.dev/versions/unversioned/sdk/intent-launcher

This code defines an Android `ActivityAction` constant for initiating the remote authenticator enrollment process. Developers can utilize this constant in an `Intent` to guide users through the setup of a remote authenticator.

```Java
ActivityAction.REMOTE_AUTHENTICATOR_ENROLL ＝ "android.settings.REMOTE_AUTHENTICATOR_ENROLL"
```

--------------------------------

### POST IntentLauncher.startActivityAsync(activityAction, params)

Source: https://docs.expo.dev/versions/latest/sdk/intent-launcher

Starts the specified activity with optional parameters. The method returns a promise which resolves when the user returns to the app with the activity result.

```APIDOC
## POST IntentLauncher.startActivityAsync

### Description
Starts the specified activity. The method will return a promise which resolves when the user returns to the app with the result of the activity.

### Method
POST

### Parameters
#### Body Parameters
- **activityAction** (string) - Required - The action to be performed, for example, `IntentLauncher.ActivityAction.WIRELESS_SETTINGS`. Pre-defined constants are available in `expo-intent-launcher/src/IntentLauncher.ts`.
- **params** (IntentLauncherParams) - Optional - An object of intent parameters. Default: `{}`

### Request Example
```javascript
const result = await IntentLauncher.startActivityAsync(
  IntentLauncher.ActivityAction.WIRELESS_SETTINGS,
  {
    category: 'android.intent.category.DEFAULT',
    type: 'application/json'
  }
);
```

### Response
#### Success Response (200)
- **resultCode** (ResultCode) - Result code returned by the activity
- **data** (string) - Optional - Data URI returned by the activity
- **extra** (object) - Optional - Extras object returned by the activity

#### Response Example
```javascript
{
  "resultCode": "ok",
  "data": "content://example/data",
  "extra": {
    "com.example.key": "value"
  }
}
```

### Return Type
`Promise<IntentLauncherResult>`
```

--------------------------------

### Handle Sound Creation with try-catch in Expo Audio (JavaScript)

Source: https://docs.expo.dev/versions/v54.0.0/sdk/audio-av

This example shows how to use `Audio.Sound.createAsync` to load and play an audio file, specifically `hello.mp3`, with an initial status that sets `shouldPlay` to true. It wraps the asynchronous call in a `try-catch` block to gracefully handle any potential errors during the sound creation and loading process, providing robust error management.

```javascript
try {
  const { sound: soundObject, status } = await Audio.Sound.createAsync(
    require('./assets/sounds/hello.mp3'),
    { shouldPlay: true }
  );
  // Your sound is playing!
} catch (error) {
  // An error occurred!
}
```

--------------------------------

### Install react-native-keyboard-controller with Expo

Source: https://docs.expo.dev/versions/unversioned/sdk/keyboard-controller

This command installs the `react-native-keyboard-controller` package into an Expo project. If installing into an existing React Native app, ensure Expo is already set up in your project.

```bash
npx expo install react-native-keyboard-controller
```

--------------------------------

### Type useSegments Hook with Specific Route

Source: https://docs.expo.dev/router/reference/typed-routes

Example of passing a full route type to useSegments() to get fully typed segment arrays. This enables TypeScript to infer the exact segment structure for a given route path.

```typescript
import { Link, useSegments } from 'expo-router';

export function useMySegments() {
  const segments = useSegments<'/(search)/profile'>();
  //    ^? segments = ['(search)', 'profile']
  return segments;
}
```

--------------------------------

### Define EAS Build Lifecycle Hooks in package.json

Source: https://docs.expo.dev/build-reference/npm-hooks

This example demonstrates how to set up various EAS Build lifecycle npm hooks within the `scripts` section of a `package.json` file. These hooks allow custom commands to be executed at different stages of the build process, such as before/after installation, on success, on error, or on cancel.

```json
{
  "name": "my-app",
  "scripts": {
    "eas-build-pre-install": "echo 123",
    "eas-build-post-install": "echo 456",
    "eas-build-on-success": "echo 789",
    "eas-build-on-error": "echo 012",
    "eas-build-on-cancel": "echo 345",
    "start": "expo start",
    "test": "jest"
  },
  "dependencies": {
    "expo": "54.0.0"
  }
}
```

--------------------------------

### Setting up custom Fontello icons using createIconSetFromFontello in Expo

Source: https://docs.expo.dev/guides/icons

This example demonstrates how to create a custom icon set from a Fontello configuration file using `createIconSetFromFontello`. It imports the necessary method and configuration, then defines an `Icon` component based on the Fontello assets. This setup is similar to `createIconSetFromIcoMoon` and requires loading the font separately.

```javascript
// Import the createIconSetFromFontello method
import createIconSetFromFontello from '@expo/vector-icons/createIconSetFromFontello';

// Import the config file
import fontelloConfig from './config.json';

// Both the font name and files exported from Fontello are most likely called "fontello".
// Ensure this is the `fontname.ttf` and not the file path.
const Icon = createIconSetFromFontello(fontelloConfig, 'fontello', 'fontello.ttf');
```

--------------------------------

### Configure ESLint Legacy Config with Node.js Globals

Source: https://docs.expo.dev/guides/using-eslint

For projects using legacy ESLint configurations, this example shows how to enable Node.js environment globals in a file like `metro.config.js` by adding an `/* eslint-env node */` comment at the top.

```JavaScript
/* eslint-env node */
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(
  __dirname
);

module.exports = config;
```

--------------------------------

### Specify platform-specific custom build configurations in eas.json

Source: https://docs.expo.dev/custom-builds/get-started

This JSON configuration illustrates how to define separate custom build configurations for iOS and Android within the same build profile in `eas.json`. This allows for platform-specific build logic, where `hello-ios.yml` and `hello-android.yml` can contain unique steps tailored to each operating system.

```json
{
  "build": {
    "test": {
      "ios": {
        "config": "hello-ios.yml"
      },
      "android": {
        "config": "hello-android.yml"
      }
    }
  }
}
```

--------------------------------

### Install react-native-gesture-handler in Expo Project

Source: https://docs.expo.dev/versions/v54.0.0/sdk/gesture-handler

This command installs the `react-native-gesture-handler` library into an existing Expo project. Using `npx expo install` ensures that the installed version is compatible with your project's Expo SDK version.

```shell
npx expo install react-native-gesture-handler
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/v52.0.0/sdk/dev-client

Install expo-dev-client in your project using npm or expo CLI. This library requires Continuous Native Generation (CNG) or manual configuration in your app.

```APIDOC
## Installation

### Overview
Install expo-dev-client to add development tools to your debug builds.

### Command
```
npx expo install expo-dev-client
```

### Prerequisites
- Expo must be installed in your project first
- For existing React Native apps, install `expo` before installing `expo-dev-client`

### Notes
- If not using Continuous Native Generation (CNG), manual configuration is required
- The library will be bundled at version ~5.0.20
```

--------------------------------

### Implement an Expo Config Plugin Entry Point in TypeScript

Source: https://docs.expo.dev/modules/config-plugin-and-native-module-tutorial

This TypeScript snippet illustrates the entry point for an Expo config plugin. It imports the `ConfigPlugin` type for robust type checking and defines `withMyApiKey` as a plugin function that logs a message and returns the `config` object, ready for further modifications.

```typescript
import { ConfigPlugin } from 'expo/config-plugins';

const withMyApiKey: ConfigPlugin = config => {
  console.log('my custom plugin');
  return config;
};

export default withMyApiKey;
```

--------------------------------

### Disable automatic updates initialization on iOS with CocoaPods

Source: https://docs.expo.dev/eas-update/integration-in-existing-native-apps

Pass the EX_UPDATES_CUSTOM_INIT environment variable to the CocoaPods installation command to disable automatic expo-updates initialization on iOS. This allows for custom setup of expo-updates in brownfield projects.

```bash
EX_UPDATES_CUSTOM_INIT=1 npx pod-install
```

--------------------------------

### Start Expo Web Development Server

Source: https://docs.expo.dev/workflow/web

Command to start the development server and begin developing your Expo app in the browser. Enables hot reload and Fast Refresh for rapid iteration.

```bash
npx expo start --web
```

--------------------------------

### Install expo-server Package via NPX

Source: https://docs.expo.dev/router/web/api-routes

Install the expo-server library required for hosting Expo applications on third-party providers. This package contains adapters for various hosting platforms and runtimes.

```bash
npx expo install expo-server
```

--------------------------------

### Define iOS Native Module for Theme Management (Swift)

Source: https://docs.expo.dev/modules/native-module-tutorial

This Swift code defines the `ExpoSettingsModule` for iOS, implementing theme management functionality. It uses `UserDefaults` to store the theme preference, exposes `setTheme` and `getTheme` functions, and dispatches `onChangeTheme` events. An `enum Theme` is defined to restrict valid theme values.

```swift
import ExpoModulesCore

public class ExpoSettingsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoSettings")

    Events("onChangeTheme")

    Function("setTheme") { (theme: Theme) -> Void in
      UserDefaults.standard.set(theme.rawValue, forKey:"theme")
      sendEvent("onChangeTheme", [
        "theme": theme.rawValue
      ])
    }

    Function("getTheme") { () -> String in
      UserDefaults.standard.string(forKey: "theme") ?? Theme.system.rawValue
    }
  }

  enum Theme: String, Enumerable {
    case light
    case dark
    case system
  }
}
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/v53.0.0/sdk/dev-client

Install expo-dev-client in your Expo project using npm. This library adds development tools to your debug builds including launcher UI and developer menu.

```APIDOC
## Installation

### Description
Install the expo-dev-client library in your project to add development tools to debug builds.

### Command
```
npx expo install expo-dev-client
```

### Requirements
- Expo CLI installed
- Existing React Native or Expo project
- For existing React Native apps, install `expo` first

### What Gets Installed
- Configurable launcher UI for launching updates and switching development servers
- Improved debugging tools with network request inspection
- Powerful and extensible developer menu UI
```

--------------------------------

### Display Workflow Instructions using EAS `doc` Job

Source: https://docs.expo.dev/eas/workflows/pre-packaged-jobs

This EAS workflow example demonstrates how to use the `doc` job to display post-workflow instructions. After building and submitting an iOS app, a Markdown section is presented in the logs, guiding the user on the next steps, such as testing via TestFlight and submitting for review.

```yaml
jobs:
  build_ios:
    name: Build iOS
    type: build
    params:
      platform: ios
      profile: production

  submit:
    name: Submit to App Store
    type: submit
    needs: [build_ios]
    params:
      build_id: ${{ needs.build_ios.outputs.build_id }}
      profile: production

  next_steps:
    name: Next Steps
    needs: [submit]
    type: doc
    params:
      md: |
        # To do next

        Your app has just been sent to [App Store Connect](https://appstoreconnect.apple.com/apps).

        1. Download the app from TestFlight.
        2. Test the app a bunch.
        3. Submit the app for review.
```

--------------------------------

### Get Available Email Clients

Source: https://docs.expo.dev/versions/v54.0.0/sdk/mail-composer

Retrieve a list of available email clients installed on the device using getClients(). Each client object contains label, packageName (Android), and url (iOS) properties for opening specific mail applications.

```javascript
MailComposer.getClients(): MailClient[]

// Returns array of available mail clients:
// [
//   { label: 'Gmail', packageName: 'com.google.android.gm', url: 'googlegmail://' },
//   { label: 'Mail', url: 'message://' }
// ]
```

--------------------------------

### Function Call /startAsync

Source: https://docs.expo.dev/versions/latest/sdk/audio-av

Initiates the audio recording process. This method can only be called if the `Recording` instance has been prepared.

```APIDOC
## Function Call /startAsync

### Description
Begins recording. This method can only be called if the `Recording` has been prepared.

### Method
Function Call

### Endpoint
/startAsync

### Parameters
#### Path Parameters
(None)

#### Query Parameters
(None)

#### Request Body
(None)

### Request Example
{}

### Response
#### Success Response (Promise Resolution)
- **status** (`RecordingStatus`) - The current status of the recording, indicating that recording has begun.

#### Response Example
{
  "canRecord": true,
  "durationMillis": 0,
  "isRecording": true,
  "isDoneRecording": false,
  "uri": null,
  "metering": null
}
```

--------------------------------

### Configure Expo Updates in iOS Plist

Source: https://docs.expo.dev/eas-update/getting-started

Sets up Expo Updates configuration in the Expo.plist file for iOS projects. Requires the EXUpdatesRuntimeVersion and EXUpdatesURL keys, with the URL containing your project ID. The file must be added to the Xcode project.

```xml
<key>EXUpdatesRuntimeVersion</key>
<string>1.0.0</string>
<key>EXUpdatesURL</key>
<string>https://u.expo.dev/your-project-id</string>
```

--------------------------------

### Configure Android project bundling in build.gradle

Source: https://docs.expo.dev/bare/installing-expo-modules

Add Expo CLI bundling configuration to android/app/build.gradle to enable proper entry file resolution and bundle command execution. Sets up entryFile, cliFile, and bundleCommand for Android builds.

```gradle
entryFile = file(["node", "-e", "require('expo/scripts/resolveAppEntry')", rootDir.getAbsoluteFile().getParentFile().getAbsolutePath(), "android", "absolute"].execute(null, rootDir).text.trim())
cliFile = new File(["node", "--print", "require.resolve('@expo/cli')"].execute(null, rootDir).text.trim())
bundleCommand = "export:embed"
```

--------------------------------

### Install Multiple Expo SDK Packages via Terminal

Source: https://docs.expo.dev/versions/latest

Install three Expo SDK packages (camera, contacts, and sensors) using the npx expo install command. This command handles dependency resolution and installation of the specified packages into your project.

```terminal
npx expo install expo-camera expo-contacts expo-sensors
```

--------------------------------

### Chip Component - Usage Examples

Source: https://docs.expo.dev/versions/unversioned/sdk/ui/jetpack-compose/chip

Learn how to implement different Chip variants including assist, filter, input, and suggestion chips with icons, selection states, and event handlers.

```APIDOC
## Component Usage Examples

### Assist Chip

Displays a chip with a leading icon and press callback:

```javascript
import { Chip } from '@expo/ui/jetpack-compose';

<Chip
  variant="assist"
  label="Book"
  leadingIcon="filled.Add"
  onPress={() => console.log('Opening flight booking...')}
/>
```

### Filter Chip

Displays a selectable chip for filtering:

```javascript
<Chip
  variant="filter"
  label="Images"
  leadingIcon="filled.Star"
  selected={selectedFilters.includes('Images')}
  onPress={() => handleFilterToggle('Images')}
/>
```

### Input Chip

Displays a chip with dismiss capability:

```javascript
<Chip
  variant="input"
  label="Work"
  leadingIcon="filled.Create"
  onDismiss={() => handleInputDismiss('Work')}
/>
```

### Suggestion Chip

Displays a suggestion chip with icon:

```javascript
<Chip
  variant="suggestion"
  label="Nearby"
  leadingIcon="filled.LocationOn"
  onPress={() => console.log('Searching nearby...')}
/>
```
```

--------------------------------

### Install Expo Google Fonts and dependencies

Source: https://docs.expo.dev/develop/user-interface/fonts

This command installs a specific Google Fonts package (e.g., Inter), `expo-font` for general font loading, and `expo-splash-screen` to manage the app's loading state. These packages are essential for asynchronously loading and displaying fonts in an Expo application.

```bash
npx expo install @expo-google-fonts/inter expo-font expo-splash-screen
```

--------------------------------

### Prepare Audio Recording with Options in Expo

Source: https://docs.expo.dev/versions/v54.0.0/sdk/audio-av

Initializes and prepares an audio recorder instance with optional RecordingOptions before starting a recording session. Must be called before startAsync(). Accepts options for sample rate, bitrate, channels, format, encoder, and extension, defaulting to LOW_QUALITY if omitted.

```javascript
const recording = new Audio.Recording();
await recording.prepareToRecordAsync(options);
```

--------------------------------

### Install Expo Dev Client and EAS Update Packages

Source: https://docs.expo.dev/develop/development-builds/development-workflows

This command installs the necessary packages for enabling the EAS Update extension in your Expo development client. It installs `expo-dev-client` and `expo-updates`, allowing you to view and load published updates directly within your development build. This extension is available for development clients `v0.9.0` and above.

```bash
npx expo install expo-dev-client expo-updates
```

--------------------------------

### Configure Update Channels in app.json with CNG

Source: https://docs.expo.dev/eas-update/getting-started

Uses Continuous Native Generation (CNG) to configure update channels through app.json with requestHeaders. The expo-channel-name header specifies which channel the build pulls updates from, applied after running npx expo prebuild.

```json
{
  "expo": {
    "updates": {
      "requestHeaders": {
        "expo-channel-name": "your-channel-name"
      }
    }
  }
}
```

--------------------------------

### Install Expo Config Plugin via npx expo install

Source: https://docs.expo.dev/config-plugins/plugins

Shows the terminal command to install an Expo config plugin, such as `expo-camera`, which includes native modifications. This command ensures the plugin and its dependencies are added to your project.

```bash
npx expo install expo-camera
```

--------------------------------

### Install Expo Audio in React Native Project

Source: https://docs.expo.dev/versions/latest/sdk/audio

This command installs the `expo-audio` library into an existing Expo or React Native project. Using `npx expo install` ensures that the library version is compatible with your project's Expo SDK.

```bash
npx expo install expo-audio
```

--------------------------------

### Configure Expo Updates Metadata in Android Manifest

Source: https://docs.expo.dev/eas-update/getting-started

Adds Expo Updates metadata to AndroidManifest.xml including the update URL and runtime version reference. The EXPO_UPDATE_URL must contain your project ID, and the runtime version is defined separately in strings.xml.

```xml
<meta-data android:name="expo.modules.updates.EXPO_UPDATE_URL" android:value="https://u.expo.dev/your-project-id"/>
<meta-data android:name="expo.modules.updates.EXPO_RUNTIME_VERSION" android:value="@string/expo_runtime_version"/>
```

--------------------------------

### Deploy Expo Project to Vercel via CLI

Source: https://docs.expo.dev/router/web/api-routes

These commands install the Vercel CLI globally, build the Expo web project, and then deploy it using the `--prebuilt` flag. The Vercel CLI provides a URL for the deployed website upon successful execution. This process streamlines the publishing of the Expo application to Vercel.

```bash
npm install vercel -g
vercel build
vercel deploy --prebuilt
```

--------------------------------

### Install expo-age-range Package

Source: https://docs.expo.dev/versions/latest/sdk/age-range

Installs the `expo-age-range` package into an Expo or React Native project using `npx expo install`. Ensure `expo` is installed for existing React Native apps.

```bash
npx expo install expo-age-range
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/unversioned/sdk/clipboard

Install the expo-clipboard package in your project using npx expo install command. This sets up the clipboard functionality for your React Native application.

```APIDOC
## Installation

### Description
Install the expo-clipboard package to enable clipboard functionality in your project.

### Command
```
npx expo install expo-clipboard
```

### Prerequisites
- Expo CLI installed
- Existing React Native or Expo project
- expo package installed in the project
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/unversioned/sdk/system-ui

Install the expo-system-ui library in your project using the Expo CLI. This library provides access to system UI elements that fall outside of the React component tree.

```APIDOC
## Installation

### Description
Install the expo-system-ui library to access system UI elements for managing root view background colors and user interface styles.

### Command
```
npx expo install expo-system-ui
```

### Requirements
- Expo CLI installed
- For existing React Native apps, ensure `expo` is installed in your project

### Usage
```javascript
import * as SystemUI from 'expo-system-ui';
```
```

--------------------------------

### Install expo-clipboard Package

Source: https://docs.expo.dev/versions/latest/sdk/clipboard

Installs the `expo-clipboard` package into an Expo or React Native project. Use `npx expo install` for managed Expo projects or ensure `expo` is installed for existing React Native apps.

```shell
npx expo install expo-clipboard
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/v54.0.0/sdk/system-ui

Install the expo-system-ui library in your project using npm. This library requires the expo package to be installed in existing React Native apps.

```APIDOC
## Installation

### Command
Install expo-system-ui using the following terminal command:

```bash
npx expo install expo-system-ui
```

### Requirements
- Expo package must be installed in your React Native project
- For Continuous Native Generation (CNG), enable the config plugin
- For manual native configuration, follow platform-specific setup instructions
```

--------------------------------

### Run source-map-explorer analysis script

Source: https://docs.expo.dev/guides/analyzing-bundles

Executes a pre-configured script from your `package.json` to run `source-map-explorer` on your web bundle. This step initiates the visualization of your JavaScript bundle size after it has been exported with source maps.

```bash
npm run analyze:web
```

--------------------------------

### GitHub-Triggered EAS Workflow YAML

Source: https://docs.expo.dev/eas/workflows/get-started

Configure an EAS workflow to automatically trigger on GitHub push events to the main branch. This YAML includes the 'on' trigger configuration that enables automated CI/CD execution when code is pushed to the specified branch.

```yaml
name: Create Production Builds

on:
  push:
    branches: ['main']

jobs:
  build_android:
    type: build
    params:
      platform: android
  build_ios:
    type: build
    params:
      platform: ios
```

--------------------------------

### Create Production Builds EAS Workflow YAML

Source: https://docs.expo.dev/eas/workflows/get-started

Define an EAS workflow that builds production apps for both Android and iOS platforms in parallel. This YAML configuration specifies two build jobs that run simultaneously, each targeting a different platform.

```yaml
name: Create Production Builds

jobs:
  build_android:
    type: build # This job type creates a production build for Android
    params:
      platform: android
  build_ios:
    type: build # This job type creates a production build for iOS
    params:
      platform: ios
```

--------------------------------

### Run iOS App on Connected Device with Development Signing

Source: https://docs.expo.dev/more/expo-cli

Install and launch app on a connected physical iOS device with automatic development signing. Expo CLI automatically handles device registration and installation. Requires developer profiles to be set up on the computer.

```bash
npx expo run:ios --device
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/v52.0.0/sdk/sharing

Instructions for installing the expo-sharing library in your Expo or React Native project.

```APIDOC
## Installation

### Using Expo CLI
```bash
npx expo install expo-sharing
```

### For Existing React Native Apps
If you are installing this in an existing React Native app, make sure to install `expo` in your project first.

### Import
```javascript
import * as Sharing from 'expo-sharing';
```

### Bundled Version
~13.0.1
```

--------------------------------

### Calculate Update Bandwidth Size with Compression

Source: https://docs.expo.dev/eas-update/estimate-bandwidth

This example demonstrates how to calculate the effective bandwidth size for an update after applying a compression ratio to the uncompressed JavaScript bundle size. The compression ratio significantly reduces the actual download size for end-users.

```plaintext
10 MB / 2.6 ≈ 3.85 MB update bandwidth size
```

--------------------------------

### Basic Accelerometer Usage Example

Source: https://docs.expo.dev/versions/latest/sdk/accelerometer

Complete working example demonstrating how to initialize accelerometer listeners, manage subscriptions, and control update intervals in a React Native application.

```APIDOC
## Example: Basic Accelerometer Implementation

### Description
Complete example showing accelerometer initialization, subscription management, and update interval control.

### Code Example
```javascript
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function App() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => Accelerometer.setUpdateInterval(1000);
  const _fast = () => Accelerometer.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Accelerometer: (in gs where 1g = 9.81 m/s^2)</Text>
      <Text style={styles.text}>x: {x}</Text>
      <Text style={styles.text}>y: {y}</Text>
      <Text style={styles.text}>z: {z}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
});
```

### Key Features
- Subscribe/unsubscribe from accelerometer updates
- Display real-time x, y, z acceleration values
- Control update frequency (fast vs slow)
- Proper cleanup in useEffect return handler
- Responsive UI with button controls
```

--------------------------------

### Exclude Third-Party Library from Version Checks in package.json

Source: https://docs.expo.dev/workflow/using-libraries

Configures the expo.install.exclude property in package.json to exclude specific libraries from version checks performed by npx expo install, npx expo-doctor, or npx expo start commands.

```json
{
  "expo": {
    "install": {
      "exclude": ["library-name"]
    }
  }
}
```

--------------------------------

### BlurView Basic Usage Example

Source: https://docs.expo.dev/versions/v53.0.0/sdk/blur-view

Example demonstrating how to implement BlurView with different intensity levels and tint options. Shows rendering BlurView after dynamic content like FlatList.

```APIDOC
## BlurView Basic Usage

### Description
Basic implementation of BlurView component with multiple blur instances at different intensity levels and tints.

### Usage Example
```javascript
import { Text, StyleSheet, View, SafeAreaView } from 'react-native';
import { BlurView } from 'expo-blur';

export default function App() {
  const text = 'Hello, my container is blurring contents underneath!';
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        {[...Array(20).keys()].map(i => (
          <View
            key={`box-${i}`}
            style={[styles.box, i % 2 === 1 ? styles.boxOdd : styles.boxEven]}
          />
        ))}
      </View>
      <BlurView intensity={100} style={styles.blurContainer}>
        <Text style={styles.text}>{text}</Text>
      </BlurView>
      <BlurView intensity={80} tint="light" style={styles.blurContainer}>
        <Text style={styles.text}>{text}</Text>
      </BlurView>
      <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
        <Text style={[styles.text, { color: '#fff' }]}>{text}</Text>
      </BlurView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blurContainer: {
    flex: 1,
    padding: 20,
    margin: 16,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 20,
  },
  background: {
    flex: 1,
    flexWrap: 'wrap',
    ...StyleSheet.absoluteFill,
  },
  box: {
    width: '25%',
    height: '20%',
  },
  boxEven: {
    backgroundColor: 'orangered',
  },
  boxOdd: {
    backgroundColor: 'gold',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
});
```

### Best Practices
- Render BlurView after dynamic content (e.g., FlatList) to avoid blur effect update issues
- Use appropriate intensity values (1-100) based on design requirements
- Apply tint colors that complement your UI design
- Use borderRadius for smooth edges on blur containers
```

--------------------------------

### Install expo-mail-composer package

Source: https://docs.expo.dev/versions/latest/sdk/mail-composer

Install the expo-mail-composer library using npx expo install command. This command automatically installs the correct version compatible with your Expo SDK.

```bash
npx expo install expo-mail-composer
```

--------------------------------

### Install expo-secure-store with npm

Source: https://docs.expo.dev/versions/latest/sdk/securestore

Install the expo-secure-store library using npm. This command installs the latest version of the library and adds it as a dependency to your project.

```bash
npx expo install expo-secure-store
```

--------------------------------

### Create new Expo project with npx create-expo-app

Source: https://docs.expo.dev/build/setup

This command initializes a new Expo project named `my-app` using `npx`. It sets up a basic 'Hello world' React Native app, ready for use with EAS Build. The command executes `create-expo-app` without requiring a global installation.

```shell
npx create-expo-app my-app
```

--------------------------------

### Integrate a single custom build configuration into eas.json

Source: https://docs.expo.dev/custom-builds/get-started

This JSON snippet demonstrates how to link a custom build configuration file (e.g., `test.yml`) to a specific build profile named 'test' within your `eas.json`. By adding the `config` property under a profile, EAS Build knows which custom steps to execute for that profile.

```json
{
  "build": {
    "test": {
      "config": "test.yml"
    }
  }
}
```

--------------------------------

### Install expo-system-ui package

Source: https://docs.expo.dev/versions/latest/sdk/system-ui

Installs the `expo-system-ui` library into an Expo project using `npx expo install`. This command ensures compatibility with the current Expo SDK version.

```Terminal
npx expo install expo-system-ui
```

--------------------------------

### Type: RecordingStartOptions

Source: https://docs.expo.dev/versions/v54.0.0/sdk/audio

Options for controlling how audio recording is started, including parameters for delayed start and automatic stop, with platform-specific behaviors.

```APIDOC
## TYPE RecordingStartOptions

### Description
Options for controlling how audio recording is started.

### Properties
- **atTime** (number) - Optional - Only for iOS. The time in seconds to wait before starting the recording. If not provided, recording starts immediately. Platform behavior:
  - Android: Ignored, recording starts immediately
  - iOS: Uses native AVAudioRecorder.record(atTime:) for precise timing.
  - Web: Ignored, recording starts immediately
  - Note: On iOS, the recording process starts immediately (you'll see status updates), but actual audio capture begins after the specified delay. This is not a countdown, since the recorder is active but silent during the delay period.
- **forDuration** (number) - Optional - Only for Android, iOS, Web. The duration in seconds after which recording should automatically stop. If not provided, recording continues until manually stopped.
```

--------------------------------

### Fetch Image Asset in Next.js API Route

Source: https://docs.expo.dev/versions/v53.0.0/config/metro

This example shows how to handle an imported image asset within a Next.js API route (`GET` handler). It fetches the asset's URI, constructs a full URL, and returns the image data as a `Response`. On server platforms, the asset is always a string or an object with a URI, facilitating direct access for server-side processing.

```typescript
import asset from './img.png';

export async function GET(req: Request) {
  const ImageData = await fetch(
    new URL(
      // Access the asset URI.
      asset.uri,
      // Append to the current request URL origin.
      req.url
    )
  ).then(res => res.arrayBuffer());

  return new Response(ImageData, {
    headers: {
      'Content-Type': 'image/png',
    },
  });
}
```

--------------------------------

### Implement Basic Custom Tabs Layout with Expo Router UI Components

Source: https://docs.expo.dev/versions/v52.0.0/sdk/router-ui

Provides a foundational example of how to combine `Tabs`, `TabSlot`, `TabList`, and `TabTrigger` components to construct a custom tab navigation structure. This setup allows for defining tabs and their corresponding routes.

```jsx
<Tabs>
 <TabSlot />
 <TabList>
  <TabTrigger name="home" href="/" />
 </TabList>
</Tabs>
```

--------------------------------

### Start Express Server with Node

Source: https://docs.expo.dev/router/web/api-routes

Start the Express server using the Node.js runtime to serve the Expo application. The server will listen on port 3000 unless a different PORT environment variable is specified.

```bash
node server.ts
```

--------------------------------

### Request Calendar Permissions, Get, and Create Calendars in React Native

Source: https://docs.expo.dev/versions/latest/sdk/calendar

A React Native example demonstrating the core functionality of `expo-calendar`. It requests calendar permissions, fetches existing event calendars, logs them, and provides a function to programmatically create a new calendar, handling platform-specific default calendar source logic.

```javascript
import { useEffect } from 'react';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import * as Calendar from 'expo-calendar';

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Calendar Module Example</Text>
      <Button title="Create a new calendar" onPress={createCalendar} />
    </View>
  );
}

async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  return defaultCalendar.source;
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'Expo Calendar' };
  const newCalendarID = await Calendar.createCalendarAsync({
    title: 'Expo Calendar',
    color: 'blue',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: 'internalCalendarName',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/latest/sdk/document-picker

Install the expo-document-picker library in your Expo project using npm.

```APIDOC
## Installation

### Description
Install the expo-document-picker package into your Expo or React Native project.

### Command
```
npx expo install expo-document-picker
```

### Notes
If installing in an existing React Native app, ensure `expo` is already installed in your project.

```

--------------------------------

### Create Abstract Target in Podfile

Source: https://docs.expo.dev/build-reference/variants

Replace standard target configuration with an abstract_target that contains common dependencies shared across multiple targets. This allows multiple concrete targets (myapp, myapp-dev) to inherit common configuration while maintaining their own specific settings.

```ruby
abstract_target 'common' do
  # put common target configuration here

  target 'myapp' do
  end

  target 'myapp-dev' do
  end
end
```

--------------------------------

### Install Expo Image Library in React Native Project

Source: https://docs.expo.dev/tutorial/build-a-screen

This command installs the `expo-image` library into your React Native project, enabling the use of its cross-platform `<Image>` component. It updates the `package.json` dependencies, and the development server should be restarted after installation for changes to take effect.

```bash
npx expo install expo-image
```

--------------------------------

### Configure Expo Plugin with Arguments in app.json

Source: https://docs.expo.dev/modules/config-plugin-and-native-module-tutorial

Update the `app.json` file to pass configuration options, such as an `apiKey`, to a local Expo plugin. The plugin path is now provided as an array where the second element is an object containing the plugin-specific arguments, allowing dynamic customization.

```json
{
  "expo": {
    ... 
    "plugins": [["../app.plugin.js", { "apiKey": "custom_secret_api" }]]
  }
}
```

--------------------------------

### Install Canary Release of Expo and SDK Packages

Source: https://docs.expo.dev/versions/latest

Install the latest canary (pre-release) version of the expo package and all related SDK packages. Canary releases represent snapshots of the main development branch and should only be used if comfortable with potential instability.

```terminal
npm install expo@canary && npx expo install --fix
```

--------------------------------

### Install Expo Manifests Library

Source: https://docs.expo.dev/versions/latest/sdk/manifests

Installs the `expo-manifests` library into your project using `npx expo install`. This command ensures proper integration, especially for existing React Native applications where the `expo` package should also be installed.

```shell
npx expo install expo-manifests
```

--------------------------------

### Installation - Expo Package

Source: https://docs.expo.dev/versions/v53.0.0/sdk/expo

Install the core Expo package using npm. This provides access to all common methods and types for Expo development.

```APIDOC
## Installation

### Description
Installs the Expo package and its dependencies into your project.

### Command
```
npx expo install expo
```

### Setup
After installation, import Expo modules in your application:

```javascript
import * as Expo from 'expo';
```

### Supported Platforms
- Android
- iOS
- tvOS
- Web
```

--------------------------------

### Install NetInfo with Expo

Source: https://docs.expo.dev/versions/latest/sdk/netinfo

Install the @react-native-community/netinfo package in an Expo project using the npx expo install command. This ensures compatibility with your current Expo SDK version.

```bash
npx expo install @react-native-community/netinfo
```

--------------------------------

### Configure EAS build in GitHub Actions

Source: https://docs.expo.dev/build/building-on-ci

GitHub Actions workflow triggered on push to main branch and manual dispatch. Uses official Expo GitHub Action for setup, configures Node.js with npm caching, installs dependencies, and triggers EAS builds with EXPO_TOKEN secret.

```yaml
name: EAS Build
on:
  workflow_dispatch:
  push:
    branches:
      - main
jobs:
  build:
    name: Install and build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v6
        with:
          node-version: 22
          cache: npm
      - name: Setup Expo and EAS
        uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - name: Install dependencies
        run: npm ci
      - name: Build on EAS
        run: eas build --platform all --non-interactive --no-wait
```

--------------------------------

### Install react-native-reanimated and react-native-worklets

Source: https://docs.expo.dev/versions/latest/sdk/reanimated

This command installs the `react-native-reanimated` and `react-native-worklets` packages using `npx expo install`. No additional Babel configuration is typically required, as `babel-preset-expo` automatically configures the Reanimated Babel plugin.

```bash
npx expo install react-native-reanimated react-native-worklets
```

--------------------------------

### Deploy Expo Project to Netlify via CLI

Source: https://docs.expo.dev/router/web/api-routes

These commands facilitate the deployment of the built Expo project to Netlify using the Netlify CLI. First, the CLI is installed globally, then `netlify deploy` initiates a draft deployment. Running `netlify deploy --prod` publishes the project to the production URL.

```bash
npm install netlify-cli -g
netlify deploy
```

--------------------------------

### Install expo-localization package

Source: https://docs.expo.dev/versions/latest/sdk/localization

Install the expo-localization library using npx expo install command. Requires expo to be installed in your React Native project.

```bash
npx expo install expo-localization
```

--------------------------------

### Method: startActivityAsync()

Source: https://docs.expo.dev/versions/v53.0.0/sdk/intent-launcher

Starts an Android activity asynchronously, typically using an intent.

```APIDOC
## Method: startActivityAsync()

### Description
Starts an Android activity asynchronously, typically using an intent.

### Parameters
- No specific parameters detailed in the provided text.

### Returns
- No specific return type detailed in the provided text.
```

--------------------------------

### Import Expo SDK Packages in JavaScript

Source: https://docs.expo.dev/versions/latest

Import individual Expo SDK packages into JavaScript/TypeScript code to access device functionality. This example demonstrates importing CameraView from expo-camera, all Contacts functions, and Gyroscope from expo-sensors for use in React Native applications.

```javascript
import { CameraView } from 'expo-camera';
import * as Contacts from 'expo-contacts';
import { Gyroscope } from 'expo-sensors';
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/latest/sdk/image

Install the expo-image package in your Expo project. This component is bundled with version ~3.0.11 and requires expo to be installed in your project.

```APIDOC
## Installation

### Method
Package Installation

### Command
```bash
npx expo install expo-image
```

### Prerequisites
- Expo project setup
- `expo` package installed in your project

### Supported Platforms
- Android
- iOS
- tvOS
- Web

### Bundled Version
~3.0.11
```

--------------------------------

### Install expo-application package

Source: https://docs.expo.dev/versions/latest/sdk/application

Install the expo-application library using the Expo CLI. This command adds the package to your project dependencies and ensures compatibility with your Expo SDK version.

```bash
npx expo install expo-application
```

--------------------------------

### Migrate React Native root component to Expo's registerRootComponent

Source: https://docs.expo.dev/eas-update/getting-started

For projects not created with `npx create-expo-app`, replace `AppRegistry.registerComponent` with `registerRootComponent` from `expo`. This ensures that Expo can correctly configure React Native to load assets, preventing issues in release builds when using EAS Update.

```javascript
import {registerRootComponent} from 'expo';
import App from './App';
export default registerRootComponent(App);
```

--------------------------------

### Install react-native-pager-view with Expo

Source: https://docs.expo.dev/versions/latest/sdk/view-pager

This command installs the `react-native-pager-view` library into an Expo project using `npx expo install`. It ensures compatibility and proper linking with the Expo development environment.

```bash
npx expo install react-native-pager-view
```

--------------------------------

### Install Expo Brightness Package

Source: https://docs.expo.dev/versions/latest/sdk/brightness

This command installs the `expo-brightness` package into your project using `npx expo install`. Ensure `expo` is also installed in existing React Native apps for proper functionality.

```bash
npx expo install expo-brightness
```

--------------------------------

### Initial RootNavigator Setup for Expo Router

Source: https://docs.expo.dev/router/advanced/authentication

This snippet defines the initial `RootNavigator` component, which serves as the main navigation container for the application. At this stage, it simply renders an `expo-router` `Stack`, providing a basic navigation structure that will later be enhanced for authentication.

```typescript
function RootNavigator() {
  return <Stack />;
}
```

--------------------------------

### Configure project for EAS Build

Source: https://docs.expo.dev/build/setup

Prepares your React Native project for building with EAS Build. This command sets up essential configuration files for both Android and iOS platforms. Detailed information on the configuration process is available in the build configuration reference.

```shell
eas build:configure
```

--------------------------------

### Install Expo VideoThumbnails Library

Source: https://docs.expo.dev/versions/latest/sdk/video-thumbnails

Installation command for the expo-video-thumbnails library using npm. This command installs the bundled version ~10.0.8 and adds it to your project dependencies.

```bash
npx expo install expo-video-thumbnails
```

--------------------------------

### Install react-native-svg in Expo projects

Source: https://docs.expo.dev/versions/v52.0.0/sdk/svg

This command installs the `react-native-svg` library into an Expo project. For existing React Native apps, ensure `expo` is installed first, then follow the library's specific installation instructions.

```bash
npx expo install react-native-svg
```

--------------------------------

### Install Expo Accelerometer Library

Source: https://docs.expo.dev/versions/latest/sdk/accelerometer

Installs the `expo-sensors` package, which provides access to the device's accelerometer sensor, using the `npx expo install` command. Ensure `expo` is also installed in existing React Native projects.

```shell
npx expo install expo-sensors
```

--------------------------------

### POST /file-system/legacy/makeDirectoryAsync

Source: https://docs.expo.dev/versions/latest/sdk/filesystem-legacy

Create a new empty directory.

```APIDOC
## POST /file-system/legacy/makeDirectoryAsync

### Description
Create a new empty directory.

### Method
POST

### Endpoint
/file-system/legacy/makeDirectoryAsync

### Parameters
#### Path Parameters
_None_

#### Query Parameters
_None_

#### Request Body
- **fileUri** (string) - Required - `file://` URI to the new directory to create.
- **options** (MakeDirectoryOptions) - Optional - A map of create directory options represented by `MakeDirectoryOptions` type. Default: `{}`

### Request Example
```json
{
  "fileUri": "file://path/to/new/directory",
  "options": {
    "intermediates": true
  }
}
```

### Response
#### Success Response (200)
_No content. Indicates successful directory creation._

#### Response Example
_No response body._
```

--------------------------------

### usePathname Hook - Get Current Route Path

Source: https://docs.expo.dev/router/reference/hooks

Returns the currently selected route location without search parameters, with segments normalized. For example, '/acme?foo=bar' returns '/acme' and '/[id]?id=normal' becomes '/normal'. Useful for determining the current screen location.

```TypeScript
import { Text } from 'react-native';
import { usePathname } from 'expo-router';

export default function Route() {
  // pathname = "/profile/baconbrix"
  const pathname = usePathname();

  return <Text>Pathname: {pathname}</Text>;
}
```

--------------------------------

### Install react-native-maps with Expo CLI

Source: https://docs.expo.dev/versions/latest/sdk/map-view

Installs the `react-native-maps` library into an Expo project using `npx expo install`. This command ensures version compatibility with the current Expo SDK. For existing React Native apps, install `expo` first and then follow the library's README.

```Terminal
npx expo install react-native-maps
```

--------------------------------

### Check All Package Versions with `npx expo install --check`

Source: https://docs.expo.dev/more/expo-cli

Validate all installed package versions against Expo's recommended versions using `npx expo install --check`. This command identifies packages that need updating and can prompt for local fixes, exiting with a non-zero code in CI for continuous validation.

```bash
npx expo install --check
```

--------------------------------

### Customize Expo Webpack configuration in webpack.config.js

Source: https://docs.expo.dev/archive/customizing-webpack

This JavaScript example shows how to modify the default Expo Webpack configuration. It demonstrates adding an alias for 'moduleA' to 'moduleB', disabling compression in development mode, and preventing bundle minimization in production. The `createExpoWebpackConfigAsync` utility from `@expo/webpack-config` is used to get the base configuration.

```javascript
const createExpoWebpackConfigAsync = require('@expo/webpack-config');

// Expo CLI will await this method so you can optionally return a promise.
module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // If you want to add a new alias to the config.
  config.resolve.alias['moduleA'] = 'moduleB';

  // Maybe you want to turn off compression in dev mode.
  if (config.mode === 'development') {
    config.devServer.compress = false;
  }

  // Or prevent minimizing the bundle when you build.
  if (config.mode === 'production') {
    config.optimization.minimize = false;
  }

  // Finally return the new config for the CLI to use.
  return config;
};
```

--------------------------------

### BottomSheet Component Installation

Source: https://docs.expo.dev/versions/unversioned/sdk/ui/jetpack-compose/bottomsheet

Install the @expo/ui package which contains the BottomSheet component. This command installs the necessary dependencies for using the BottomSheet in your Expo project.

```APIDOC
## Installation

### Description
Install the @expo/ui package to use the BottomSheet component in your project.

### Command
```bash
npx expo install @expo/ui
```

### Requirements
- Expo SDK (latest version)
- React Native project or existing Expo project
- For existing React Native apps, ensure `expo` is installed in the project

### Notes
- This component is Android-only and uses Jetpack Compose
- Requires @expo/ui package version compatible with your Expo SDK
```

--------------------------------

### Install Expo Package

Source: https://docs.expo.dev/versions/latest/sdk/expo

Install the Expo package using npm/npx. This provides access to common methods and types available across all Expo-related packages.

```bash
npx expo install expo
```

--------------------------------

### Install LogRocket SDK and Expo Build Properties

Source: https://docs.expo.dev/guides/using-logrocket

This command installs the core LogRocket React Native SDK along with the `expo-build-properties` plugin, which is essential for configuring native build settings. It prepares your Expo project for advanced session replay and error monitoring capabilities provided by LogRocket.

```Terminal
npx expo install @logrocket/react-native expo-build-properties
```

--------------------------------

### Install react-native-svg in Expo projects

Source: https://docs.expo.dev/versions/latest/sdk/svg

This command installs the `react-native-svg` library using `npx expo install`. It's the recommended method for Expo-managed projects or existing React Native apps that have the `expo` package installed.

```Terminal
npx expo install react-native-svg
```

--------------------------------

### Bare Expo Project eas.json with Multiple Build Profiles

Source: https://docs.expo.dev/build/eas-json

This configuration example details an eas.json setup for a bare Expo project, showcasing 'base', 'development', 'staging', and 'production' build profiles. It includes bare-specific settings like Android NDK versions and Gradle commands, along with iOS build configurations and the use of 'extends' for shared properties.

```json
{
  "build": {
    "base": {
      "env": {
        "EXAMPLE_ENV": "example value"
      },
      "android": {
        "image": "ubuntu-18.04-android-30-ndk-r19c",
        "ndk": "21.4.7075529"
      },
      "ios": {
        "image": "latest",
        "node": "12.13.0",
        "yarn": "1.22.5"
      }
    },
    "development": {
      "extends": "base",
      "env": {
        "ENVIRONMENT": "staging"
      },
      "android": {
        "distribution": "internal",
        "withoutCredentials": true,
        "gradleCommand": ":app:assembleDebug"
      },
      "ios": {
        "simulator": true,
        "buildConfiguration": "Debug"
      }
    },
    "staging": {
      "extends": "base",
      "env": {
        "ENVIRONMENT": "staging"
      },
      "distribution": "internal",
      "android": {
        "gradleCommand": ":app:assembleRelease"
      }
    },
    "production": {
      "extends": "base",
      "env": {
        "ENVIRONMENT": "production"
      }
    }
  }
}
```

--------------------------------

### Install expo-image-manipulator via npm

Source: https://docs.expo.dev/versions/latest/sdk/imagemanipulator

Installs the expo-image-manipulator library using npx expo install command. This is the recommended installation method for Expo projects and ensures compatibility with your current Expo SDK version.

```bash
npx expo install expo-image-manipulator
```

--------------------------------

### Install Expo SMS library

Source: https://docs.expo.dev/versions/latest/sdk/sms

Installs the `expo-sms` package into an Expo or React Native project using `npx expo install`. If installing in an existing React Native app, ensure `expo` is also installed.

```Terminal
npx expo install expo-sms
```

--------------------------------

### Start activity with parameters using startActivityAsync

Source: https://docs.expo.dev/versions/v54.0.0/sdk/intent-launcher

Start an activity with optional intent parameters including category, className, data URI, extras, flags, packageName, and MIME type. The method returns a promise that resolves with an IntentLauncherResult object containing the result code and optional data/extras returned by the activity.

```javascript
startActivityAsync(activityAction, {
  category: 'string',
  className: 'string',
  data: 'string',
  extra: {},
  flags: 0,
  packageName: 'string',
  type: 'string'
})
```

--------------------------------

### Install react-native-view-shot with Expo

Source: https://docs.expo.dev/versions/latest/sdk/captureRef

Installs the `react-native-view-shot` library into an Expo project using the `npx expo install` command, ensuring proper linking and dependency management within the Expo ecosystem.

```shell
npx expo install react-native-view-shot
```

--------------------------------

### Exclude packages from Expo version checks in package.json

Source: https://docs.expo.dev/versions/latest/config/package-json

Configure `package.json` to prevent Expo from performing version checks on specified libraries using the `install.exclude` property. This is useful for `npx expo start`, `npx expo-doctor`, and `npx expo install` commands to suppress warnings for intentionally divergent library versions.

```json
{
  "expo": {
    "install": {
      "exclude": ["expo-updates", "expo-splash-screen"]
    }
  }
}
```

--------------------------------

### Application.getInstallationTimeAsync()

Source: https://docs.expo.dev/versions/v54.0.0/sdk/application

Asynchronously retrieves the timestamp when the application was first installed on the device.

```APIDOC
## Method: Application.getInstallationTimeAsync()

### Description
Gets the time the app was installed onto the device, not counting subsequent updates. If the app is uninstalled and reinstalled, this method returns the time the app was reinstalled.

* On Android, this method uses `PackageInfo.firstInstallTime`.
* On iOS, this method uses the `NSFileCreationDate` of the app's document root directory.
* On web, this method returns `null`.

### Returns
`Promise<Date>`

A `Promise` that fulfills with a `Date` object that specifies the time the app was installed on the device.

### Example
```javascript
await Application.getInstallationTimeAsync();
// 2019-07-18T18:08:26.121Z
```
```

--------------------------------

### Install Expo Image Picker library

Source: https://docs.expo.dev/tutorial/image-picker

This command installs the `expo-image-picker` library, a dependency required to access the device's image and video selection UI in an Expo React Native application.

```bash
npx expo install expo-image-picker
```

--------------------------------

### Generate new Expo TV Router project

Source: https://docs.expo.dev/guides/building-for-tv

Initialize a new Expo project for TV targets, including Expo Router for file-based navigation, using the `create-expo-app` command with the `with-router-tv` example.

```bash
npx create-expo-app MyTVProject -e with-router-tv
```

--------------------------------

### Install Expo TaskManager

Source: https://docs.expo.dev/versions/latest/sdk/task-manager

Installs the `expo-task-manager` library into your project. This command uses `npx expo install` to ensure compatibility with your current Expo SDK version. Make sure 'expo' is installed if you're in an existing React Native project.

```shell
npx expo install expo-task-manager
```

--------------------------------

### Install Expo Navigation Bar Package

Source: https://docs.expo.dev/versions/latest/sdk/navigation-bar

Installs the `expo-navigation-bar` package into an Expo or React Native project using `npx expo install`. This command ensures the correct version compatible with your Expo SDK is installed.

```bash
npx expo install expo-navigation-bar
```

--------------------------------

### Install `expo-sharing` package

Source: https://docs.expo.dev/versions/latest/sdk/sharing

Installs the `expo-sharing` library into your project using `npx expo install`. This command ensures compatibility with your Expo SDK version. If integrating into a bare React Native project, make sure the `expo` package is also installed.

```terminal
npx expo install expo-sharing
```

--------------------------------

### Configure Tab Icon with Vector Icon in Expo NativeTabs (React/JSX)

Source: https://docs.expo.dev/versions/unversioned/sdk/router-native-tabs

This example illustrates how to set a custom icon for a `NativeTabs.Trigger` using the `NativeTabs.Trigger.VectorIcon` component, integrated with `@expo/vector-icons/MaterialCommunityIcons`. This approach allows using vector icon libraries for tab icons within an Expo Router `NativeTabs` setup.

```jsx
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default Layout(){
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon src={<NativeTabs.Trigger.VectorIcon family={MaterialCommunityIcons} name="home" />} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
```

--------------------------------

### Create a New Expo Project (CLI)

Source: https://docs.expo.dev/index

This command initializes a new Expo project, setting up the foundational structure for a cross-platform application. It requires Node.js and `npx` to be available in the environment.

```bash
npx create-expo-app@latest
```

--------------------------------

### Install Expo SDK packages using `npx expo install` in Terminal

Source: https://docs.expo.dev/versions/unversioned

This command installs specified Expo SDK packages into your project, making their functionalities available. It requires the Expo CLI to be installed and will add the packages to your node_modules directory and update package.json.

```Terminal
npx expo install expo-camera expo-contacts expo-sensors
```

--------------------------------

### Get Calendar Permissions with Expo React Hook

Source: https://docs.expo.dev/versions/unversioned/sdk/calendar-next

This example demonstrates how to use the `Calendar.useCalendarPermissions()` React hook to check and request calendar permissions within a functional component. It returns an array containing the current permission status and a function to trigger the permission request, simplifying permission handling for calendar access.

```javascript
const [status, requestPermission] = Calendar.useCalendarPermissions();

```

--------------------------------

### Application.getInstallReferrerAsync()

Source: https://docs.expo.dev/versions/v54.0.0/sdk/application

Asynchronously fetches the referrer URL from the Google Play Store for the installed app.

```APIDOC
## Method: Application.getInstallReferrerAsync()

### Description
Gets the referrer URL of the installed app with the `Install Referrer API` from the Google Play Store. In practice, the referrer URL may not be a complete, absolute URL.

### Platform Support
Android only

### Returns
`Promise<string>`

A `Promise` that fulfills with a `string` of the referrer URL of the installed app.

### Example
```javascript
await Application.getInstallReferrerAsync();
// "utm_source=google-play&utm_medium=organic"
```
```

--------------------------------

### Install EAS CLI globally using npm

Source: https://docs.expo.dev/build/setup

Installs the Expo Application Services (EAS) command-line interface globally. This enables interaction with EAS services like EAS Build from your terminal. It's recommended to regularly update EAS CLI for the latest features and bug fixes.

```shell
npm install -g eas-cli
```

--------------------------------

### Define and Register Background Location Task in React Native

Source: https://docs.expo.dev/versions/latest/sdk/task-manager

This example demonstrates how to define a background location task using `expo-task-manager` and `expo-location`. It includes requesting necessary foreground and background location permissions and then starts location updates for a named task. The `TaskManager.defineTask` function processes location data received in the background.

```javascript
import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const LOCATION_TASK_NAME = 'background-location-task';

const requestPermissions = async () => {
  const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus === 'granted') {
    const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus === 'granted') {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
      });
    }
  }
};

const PermissionsButton = () => (
  <View style={styles.container}>
    <Button onPress={requestPermissions} title="Enable background location" />
  </View>
);

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const { locations } = data;
    // do something with the locations captured in the background
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PermissionsButton;
```

--------------------------------

### Installation - Expo Video

Source: https://docs.expo.dev/versions/latest/sdk/video-av

Install the expo-av package which includes the Video component for video playback functionality. This command installs the required dependencies for video support across Android, iOS, tvOS, and Web platforms.

```APIDOC
## Installation

### Description
Install the expo-av package to access the Video component and related video playback APIs.

### Installation Command
```bash
npx expo install expo-av
```

### Requirements
- Expo SDK 54 or later
- React Native project with Expo installed
- For existing React Native apps, ensure `expo` is installed in the project

### Bundled Version
- expo-av: ~16.0.8

### Platforms Supported
- Android
- iOS
- tvOS
- Web
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/latest/sdk/build-properties

Install the expo-build-properties config plugin in your Expo project using npm.

```APIDOC
## Installation

### Description
Install the expo-build-properties config plugin to enable customization of native build properties.

### Command
```bash
npx expo install expo-build-properties
```

### Requirements
- Expo CLI installed
- React Native project with Expo
- Project must run `npx expo prebuild` (not compatible with bare projects)
```

--------------------------------

### Configure iOS Pod with Git Source

Source: https://docs.expo.dev/versions/v53.0.0/sdk/build-properties

Demonstrates configuring an `ExtraIosPodDependency` to fetch a pod from a Git repository. The JSON example shows how to specify the pod name, Git URL, and tag within the configuration object, while the Ruby example provides the equivalent `Podfile` entry for direct use in CocoaPods.

```json
{
  "name": "AFNetworking",
  "git": "https://github.com/gowalla/AFNetworking.git",
  "tag": "0.7.0"
}
```

```ruby
pod 'AFNetworking', :git => 'https://github.com/gowalla/AFNetworking.git', :tag => '0.7.0'
```

--------------------------------

### Configure iOS App Version in EAS Build

Source: https://docs.expo.dev/custom-builds/schema

This snippet illustrates how to incorporate the `eas/configure_ios_version` step into an EAS build process. It provides examples for its use, including a default setup and one where `build_number` and `app_version` are explicitly provided for an iOS application build, which is essential for remote app version management.

```yaml
build:
  name: Configure iOS version
  steps:
    - eas/checkout
    - eas/install_node_modules
    - eas/resolve_apple_team_id_from_credentials:
        id: resolve_apple_team_id_from_credentials
    - eas/prebuild:
        inputs:
          clean: false
          apple_team_id: ${ steps.resolve_apple_team_id_from_credentials.apple_team_id }
    - eas/configure_eas_update
    - eas/configure_ios_credentials
    - eas/configure_ios_version
```

```yaml
build:
  name: Configure iOS version
  steps:
    - eas/checkout
    - eas/install_node_modules
    - eas/resolve_apple_team_id_from_credentials:
        id: resolve_apple_team_id_from_credentials
    - eas/prebuild:
        inputs:
          clean: false
          apple_team_id: ${ steps.resolve_apple_team_id_from_credentials.apple_team_id }
    - eas/configure_eas_update
    - eas/configure_ios_credentials
    - eas/configure_ios_version:
        inputs:
          build_number: '123'
          app_version: '1.0.0'
```

--------------------------------

### Combine Android and iOS Config Plugins into a Single Entry Point

Source: https://docs.expo.dev/config-plugins/plugins

This `withPlugin.ts` file demonstrates how to create a unified config plugin by applying both the previously defined Android and iOS platform-specific plugins. It imports `withAndroidPlugin` and `withIosPlugin` and chains their application to the configuration object, providing a single entry point for multi-platform modifications.

```typescript
import { ConfigPlugin } from 'expo/config-plugins';
import withAndroidPlugin from './withAndroidPlugin';
import withIosPlugin from './withIosPlugin';

const withPlugin: ConfigPlugin = config => {
  // Apply Android modifications first
  config = withAndroidPlugin(config);
  // Then apply iOS modifications and return
  return withIosPlugin(config);
};

export default withPlugin;
```

--------------------------------

### Create new Expo project with create-expo-app

Source: https://docs.expo.dev/eas/hosting/get-started

Creates a new Expo project with the specified app name. This command initializes a basic 'Hello world' app that can be used as a starting point for web deployment with EAS Hosting.

```bash
npx create-expo-app@latest my-app
```

--------------------------------

### Build Plugin with npm for Distribution

Source: https://docs.expo.dev/debugging/create-devtools-plugins

Executes the build process to compile hook code into the build directory and web UI into the dist directory. This command prepares the plugin for distribution or monorepo usage.

```bash
npm run build:all
```

--------------------------------

### Install Watchman with Homebrew

Source: https://docs.expo.dev/workflow/ios-simulator

Watchman is a tool that monitors filesystem changes, enhancing app performance. These commands update Homebrew and then install Watchman.

```bash
brew update
brew install watchman
```

--------------------------------

### Install Expo IntentLauncher Package

Source: https://docs.expo.dev/versions/latest/sdk/intent-launcher

This command installs the `expo-intent-launcher` package into your Expo or React Native project. It utilizes `npx expo install` to ensure compatibility with your project's Expo SDK version. If integrating into an existing React Native app without Expo, ensure the `expo` package is also installed.

```terminal
npx expo install expo-intent-launcher
```

--------------------------------

### Configure React Navigation DevTools in Expo

Source: https://docs.expo.dev/debugging/devtools-plugins

This snippet demonstrates how to install the `@dev-plugins/react-navigation` package and integrate it into an Expo application. It shows two primary integration methods: one for Expo Router apps, where `useNavigationContainerRef` and `Slot` are used, and another for standard React Navigation setups, where `NavigationContainer` is wrapped. The plugin allows inspecting navigation history and state.

```terminal
npx expo install @dev-plugins/react-navigation
```

```javascript
import { useEffect, useRef } from 'react';
import { useNavigationContainerRef, Slot } from 'expo-router';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';

export default Layout() {
  const navigationRef = useNavigationContainerRef();

  useReactNavigationDevTools(navigationRef);

  return <Slot />;
}
```

```javascript
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { useReactNavigationDevTools } from '@dev-plugins/react-navigation';

export default function App() {
  const navigationRef = useNavigationContainerRef();

  useReactNavigationDevTools(navigationRef);

return (
    <NavigationContainer ref={navigationRef}>{/* ... */}</NavigationContainer>
  );
}
```

--------------------------------

### Basic Camera Usage

Source: https://docs.expo.dev/versions/latest/sdk/camera

Simple example demonstrating how to initialize the CameraView component with permission handling and basic camera operations. Shows how to request camera permissions and toggle between front and back-facing cameras.

```APIDOC
## Basic Camera Setup

### Description
Initialize and display a camera preview with permission handling and camera facing toggle functionality.

### Component
CameraView

### Required Imports
```
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
```

### Key Props
- **facing** (CameraType) - Optional - Camera direction: 'front' or 'back'. Default: 'back'
- **animateShutter** (boolean) - Optional - Enable camera shutter animation. Default: true
- **active** (boolean) - Optional - Determines if camera should be active. Default: true

### Permission Handling
Use `useCameraPermissions()` hook to request and check camera permissions before rendering the camera.

### Usage Example
```
const [facing, setFacing] = useState<CameraType>('back');
const [permission, requestPermission] = useCameraPermissions();

function toggleCameraFacing() {
  setFacing(current => (current === 'back' ? 'front' : 'back'));
}

return (
  <View>
    <CameraView style={{flex: 1}} facing={facing} />
    <TouchableOpacity onPress={toggleCameraFacing}>
      <Text>Flip Camera</Text>
    </TouchableOpacity>
  </View>
);
```

### Important Notes
- Only one Camera preview can be active at any given time
- Unmount Camera components when screens become unfocused
- Camera permissions must be granted before rendering
```

--------------------------------

### Install and Use `expo-optimize` for Project Image Optimization

Source: https://docs.expo.dev/archive/classic-updates/optimizing-updates

This snippet outlines the process to install the necessary `sharp-cli` globally and then run `expo-optimize` on your project directory. `expo-optimize` automatically processes and optimizes compatible images within your Expo project, significantly reducing their file sizes without noticeable quality loss.

```terminal
npm install -g sharp-cli
npx expo-optimize <project-directory> [options]
```

--------------------------------

### Install Expo Haptics Package

Source: https://docs.expo.dev/versions/latest/sdk/haptics

Install the expo-haptics library using npm/expo CLI. Automatically adds VIBRATE permission on Android. Ensure expo is installed in your React Native project.

```bash
npx expo install expo-haptics
```

--------------------------------

### Install react-native-safe-area-context with Expo

Source: https://docs.expo.dev/versions/latest/sdk/safe-area-context

Install the react-native-safe-area-context library in an Expo project using the expo CLI. This command handles platform-specific dependencies automatically.

```bash
npx expo install react-native-safe-area-context
```

--------------------------------

### Clean Up Default Expo Module Files

Source: https://docs.expo.dev/modules/native-view-tutorial

Navigates into the newly created module directory and removes default boilerplate files. This step prepares a clean slate for implementing custom native view logic, ensuring no leftover sample code interferes with the new module.

```Terminal
cd expo-web-view
rm src/ExpoWebView.types.ts src/ExpoWebViewModule.ts
rm src/ExpoWebView.web.tsx src/ExpoWebViewModule.web.ts
```

--------------------------------

### Pass Arguments to Package Manager with `npx expo install`

Source: https://docs.expo.dev/more/expo-cli

Directly pass arguments to the underlying package manager (e.g., `yarn`, `npm`) by using the `--` operator after `npx expo install`. This enables advanced installation options, such as adding development dependencies.

```bash
yarn expo install typescript -- -D
```

--------------------------------

### Install expo-document-picker library

Source: https://docs.expo.dev/versions/latest/sdk/document-picker

Install the expo-document-picker package using expo CLI. This command adds the document picker library to your Expo project. Requires expo to be installed in the project.

```bash
npx expo install expo-document-picker
```

--------------------------------

### Install @shopify/flash-list with Expo

Source: https://docs.expo.dev/versions/v53.0.0/sdk/flash-list

Install the @shopify/flash-list package using Expo CLI. This command handles dependency installation for the Flash List component in an Expo-managed React Native project. For existing React Native apps, ensure expo is installed first before following the library's README instructions.

```bash
npx expo install @shopify/flash-list
```

--------------------------------

### Open Expo Go on iOS to a Specific Route using `uri-scheme` CLI

Source: https://docs.expo.dev/router/reference/sitemap

This command demonstrates how to use the `uri-scheme` CLI tool to test native deep linking by opening the Expo Go app on an iOS device to a specified route. Remember to replace the placeholder IP address and port with the actual address shown when running `npx expo start` for your development server.

```bash
npx uri-scheme open exp://192.168.87.39:19000/--/form-sheet --ios
```

--------------------------------

### Install Single Expo Package

Source: https://docs.expo.dev/more/expo-cli

Use `npx expo install` to add a single Expo-compatible package to your project. This command automatically selects a version compatible with your current React Native installation, ensuring project stability.

```bash
npx expo install expo-camera
```

--------------------------------

### Install react-native-keyboard-controller in Expo

Source: https://docs.expo.dev/guides/keyboard-handling

Terminal command to install the Keyboard Controller library in an Expo project. This library provides advanced keyboard handling functionality beyond built-in React Native APIs.

```bash
npx expo install react-native-keyboard-controller
```

--------------------------------

### Create New Expo App with Bare Minimum Template

Source: https://docs.expo.dev/versions/latest

Create a new React Native project named 'my-app' with the bare-minimum template using create-expo-app. This generates a minimal project structure ready for Expo SDK package integration.

```terminal
npx create-expo-app my-app --template bare-minimum
```

--------------------------------

### Get Current Location in React Native with Expo

Source: https://docs.expo.dev/versions/unversioned/sdk/location

This React Native example demonstrates how to request foreground location permissions and retrieve the user's current geographic position using Expo Location. It handles permission denial, checks for emulator compatibility, and displays location data or error messages within a functional component.

```javascript
import { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Device from 'expo-device';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      if (Platform.OS === 'android' && !Device.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});
```

--------------------------------

### Install Expo Live Photo library

Source: https://docs.expo.dev/versions/latest/sdk/live-photo

Installs the `expo-live-photo` library into your project using `npx expo install`. For existing React Native apps, ensure the `expo` package is also installed.

```bash
npx expo install expo-live-photo
```

--------------------------------

### Install expo-asset package

Source: https://docs.expo.dev/versions/latest/sdk/asset

Installation command for adding expo-asset to an Expo project. This should be run in the project root directory and is required before using any expo-asset functionality.

```bash
npx expo install expo-asset
```

--------------------------------

### Installation and Configuration

Source: https://docs.expo.dev/versions/v54.0.0/sdk/network

Install the expo-network package and configure required permissions for Android devices. The module automatically handles ACCESS_NETWORK_STATE and ACCESS_WIFI_STATE permissions on Android.

```APIDOC
## Installation

### Installation Command
Terminal command to install expo-network:
```
npx expo install expo-network
```

### Configuration
On Android, the module automatically requires:
- `ACCESS_NETWORK_STATE` permission
- `ACCESS_WIFI_STATE` permission

These permissions are added automatically when the module is installed.

### Import
```javascript
import * as Network from 'expo-network';
```
```

--------------------------------

### POST /audio/startRecordingAtTime

Source: https://docs.expo.dev/versions/unversioned/sdk/audio

Initiates audio recording at a specified time, given in seconds. This function controls the precise start time of the recording process.

```APIDOC
## POST /audio/startRecordingAtTime

### Description
Starts the recording at the given time.

### Method
POST

### Endpoint
/audio/startRecordingAtTime

### Parameters
#### Request Body
- **seconds** (number) - Required - The time in seconds to start recording at.

### Request Example
{
  "seconds": 5.0
}

### Response
#### Success Response (200)
- **(void)** - No return value.

#### Response Example
{}
```

--------------------------------

### Gauge Component Installation

Source: https://docs.expo.dev/versions/unversioned/sdk/ui/swift-ui/gauge

Install the Gauge component from the @expo/ui package using npm. The Gauge component requires Expo to be installed in your React Native project.

```APIDOC
## Installation

### Description
Install the Gauge component from @expo/ui package.

### Command
```
npx expo install @expo/ui
```

### Requirements
- React Native project with Expo installed
- iOS 16.0 or higher
- @expo/ui package
```

--------------------------------

### Install Expo Video Library

Source: https://docs.expo.dev/versions/latest/sdk/video

Installs the `expo-video` package into your Expo or React Native project. This command uses `npx expo install` to ensure compatibility with your current Expo SDK version.

```shell
npx expo install expo-video
```

--------------------------------

### Directory.create(options)

Source: https://docs.expo.dev/versions/v54.0.0/sdk/filesystem

Creates a directory at the current URI with optional configuration. If options are not provided, a basic directory is created.

```APIDOC
## POST /directory/create

### Description
Creates a directory that the current uri points to.

### Method
POST

### Parameters

#### Request Body
- **options** (DirectoryCreateOptions) - Optional - Configuration options for directory creation.

### Returns
`void`

### Example
```
directory.create(options);
```
```

--------------------------------

### Configure eas/run_gradle with Custom Gradle Command

Source: https://docs.expo.dev/custom-builds/schema

Demonstrates how to use eas/run_gradle with a custom Gradle command specified via the inputs.command parameter. In this example, the bundleRelease command is used to create a release app bundle for the :app module.

```yaml
build:
  name: Build Android app
  steps:
    - eas/checkout
    - eas/install_node_modules
    - eas/prebuild
    - eas/configure_eas_update
    - eas/inject_android_credentials
    - eas/run_gradle:
        inputs:
          command: :app:bundleRelease
```

--------------------------------

### Install Expo ImagePicker via npm

Source: https://docs.expo.dev/versions/latest/sdk/imagepicker

Install the expo-image-picker library in your Expo project using the Expo CLI. This command installs the bundled version ~17.0.10 and its dependencies.

```bash
npx expo install expo-image-picker
```

--------------------------------

### Configure advanced .npmrc for both private npm and private registry

Source: https://docs.expo.dev/build-reference/private-npm-packages

An advanced `.npmrc` configuration example for projects that need to install dependencies from both private npm packages (scoped) and a self-hosted private npm registry. It uses `NPM_TOKEN` for `npmjs.org` and sets a default registry for all other packages, demonstrating how to handle mixed sources.

```npmrc
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
@johndoe:registry=https://registry.npmjs.org/
registry=https://registry.johndoe.com/
```

--------------------------------

### Install Expo BackgroundFetch via npx expo install

Source: https://docs.expo.dev/versions/unversioned/sdk/background-fetch

This command installs the `expo-background-fetch` package into your project. It is suitable for both new Expo projects and existing React Native applications, ensuring the necessary dependencies are added.

```shell
npx expo install expo-background-fetch
```

--------------------------------

### Define multiple sequential steps in EAS Build

Source: https://docs.expo.dev/custom-builds/schema

This configuration exemplifies how to define multiple steps that execute in sequence. It includes checking out the repository, installing dependencies with `npm install`, and finally running tests using `npm test` after echoing a message.

```yaml
build:
  name: Run tests
  steps:
    - eas/checkout
    - run:
        name: Install dependencies
        command: npm install
    - run:
        name: Run tests
        command: |
          echo "Running tests..."
          npm test
```

--------------------------------

### Create PWA Manifest File (manifest.json)

Source: https://docs.expo.dev/guides/progressive-web-apps

This JSON snippet defines a Progressive Web App (PWA) manifest file ("manifest.json"), which specifies metadata like the app's short name, full name, various icon sizes and types, start URL, display mode, theme color, and background color. This file is crucial for enabling PWA functionality and defining how the app appears when installed.

```json
{
  "short_name": "Expo App",
  "name": "Expo Router Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

--------------------------------

### Log in to Expo account via EAS CLI

Source: https://docs.expo.dev/build/setup

Authenticates your local environment with your Expo account. This command initiates the login process, allowing access to EAS services. You can verify your login status by running `eas whoami`.

```shell
eas login
```

--------------------------------

### Install Expo LocalAuthentication Package

Source: https://docs.expo.dev/versions/latest/sdk/local-authentication

This command installs the `expo-local-authentication` package into your Expo project using `npx expo install`. It's essential for adding biometric authentication capabilities to your application.

```bash
npx expo install expo-local-authentication
```

--------------------------------

### Install Expo Device Package

Source: https://docs.expo.dev/versions/latest/sdk/device

Installs the `expo-device` package for accessing system information. Use `npx expo install` for new or existing React Native projects to ensure compatibility.

```bash
npx expo install expo-device
```

--------------------------------

### Install expo-apple-authentication with npm

Source: https://docs.expo.dev/versions/latest/sdk/apple-authentication

Installation command for the Expo Apple Authentication library using npm package manager. This is the first step to integrate Apple Sign-in capability into your Expo project.

```bash
npx expo install expo-apple-authentication
```

--------------------------------

### List Component - Basic Usage

Source: https://docs.expo.dev/versions/unversioned/sdk/ui/swift-ui/list

Demonstrates how to create and render a basic List component with items. The List component wraps children elements and renders them using native SwiftUI list functionality.

```APIDOC
## List Component - Basic Example

### Description
Renders a scrollable list of items with support for various interactive features like selection, editing, and reordering.

### Component
`List`

### Basic Usage Example

```javascript
import { Host, List, LabelPrimitive } from '@expo/ui/swift-ui';

const data = [
  { text: 'Item 1', systemImage: 'star' },
  { text: 'Item 2', systemImage: 'heart' }
];

<Host style={{ flex: 1 }}>
  <List
    scrollEnabled={true}
    editModeEnabled={false}
    deleteEnabled={false}
    selectEnabled={false}
    moveEnabled={false}
    listStyle='automatic'>
    {data.map((item, index) => (
      <LabelPrimitive 
        key={index} 
        title={item.text} 
        systemImage={item.systemImage} 
      />
    ))}
  </List>
</Host>
```

### Features
- Displays scrollable list of items
- Native SwiftUI rendering
- Support for item selection, deletion, and reordering
- Multiple list style options
```

--------------------------------

### Initialize and link project to EAS servers

Source: https://docs.expo.dev/tutorial/eas/configure-development-build

Initializes your project and links it to the EAS servers. This command creates a new EAS project, associates a unique `projectId` in your `app.json`, and verifies the account owner, setting up the project for cloud builds.

```shell
eas init
```

--------------------------------

### Install monorepo dependencies with Yarn

Source: https://docs.expo.dev/brownfield/installing-expo-modules

Execute yarn install at the root of your monorepo project to install all dependencies. This ensures node_modules are available at the project root for native build scripts to access.

```bash
yarn install
```

--------------------------------

### Display API Key in Example React Native App

Source: https://docs.expo.dev/modules/config-plugin-and-native-module-tutorial

This React Native `App` component demonstrates how to use the `expo-native-configuration` module. It calls the `getApiKey` function and displays the returned value within a `Text` component. This provides a visual confirmation that the native module is correctly integrated and returning data.

```JavaScript
import * as ExpoNativeConfiguration from 'expo-native-configuration';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>API key: {ExpoNativeConfiguration.getApiKey()}</Text>
    </View>
  );
}

```

--------------------------------

### Install and Configure ESLint in Expo Project

Source: https://docs.expo.dev/guides/using-eslint

This command uses the Expo CLI to install necessary ESLint dependencies and automatically generates an `eslint.config.js` file at the project root, which extends the `eslint-config-expo` configuration.

```Terminal
# Install and configure ESLint
npx expo lint
```

--------------------------------

### Install Expo SDK Canary Release

Source: https://docs.expo.dev/versions/v53.0

To access the latest, potentially unstable features and fixes, you can install the canary release of the `expo` package and its related SDKs. This command uses `npm install expo@canary` followed by `npx expo install --fix` to ensure dependencies are correctly aligned.

```Terminal
# Install the alpha version of expo and its related packages
npm install expo@canary && npx expo install --fix
```

--------------------------------

### Initiate Production Builds with EAS CLI

Source: https://docs.expo.dev/deploy/build-project

Use these EAS CLI commands to start a production build for your application. You can target specific platforms like Android or iOS, or build for both simultaneously. An optional `--message` flag allows attaching notes for team visibility on the EAS dashboard.

```terminal
eas build --platform android
```

```terminal
eas build --platform ios
```

```terminal
eas build --platform all
```

--------------------------------

### Install `expo-web-browser` package

Source: https://docs.expo.dev/versions/latest/sdk/webbrowser

This command installs the `expo-web-browser` package into your Expo or React Native project. Ensure `expo` is already installed in your project if you are using an existing React Native app.

```terminal
npx expo install expo-web-browser
```

--------------------------------

### Install `expo-keep-awake` package

Source: https://docs.expo.dev/versions/latest/sdk/keep-awake

Installs the `expo-keep-awake` package using `npx expo install`, which is the recommended way to add packages to Expo projects. This command ensures the installation of a version compatible with your current Expo SDK.

```bash
npx expo install expo-keep-awake
```

--------------------------------

### Configure Complete Apple App Store Review Information with Demo Credentials (JSON)

Source: https://docs.expo.dev/eas/metadata/schema

This JSON configuration provides comprehensive details for the Apple App Store review team within the `store.config.json` file, including contact information and optional demo account credentials (username, password, `demoRequired` flag) along with general notes. It's used to give the review team full access for testing and provides additional context about the app.

```json
{
  "configVersion": 0,
  "apple": {
    "review": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "+1 123 456 7890",
      "demoUsername": "john",
      "demoPassword": "applereview",
      "demoRequired": false,
      "notes": "This is an example app primarily used for educational purposes."
    }
  }
}
```

--------------------------------

### Create and Configure PieChartView - iOS

Source: https://docs.expo.dev/modules/third-party-library

Initialize PieChartView and add to view hierarchy with proper bounds configuration. Implements ExpoRadialChartView class extending ExpoView, sets clipsToBounds for proper clipping, and overrides layoutSubviews to ensure chart frame matches parent dimensions.

```swift
class ExpoRadialChartView: ExpoView {
  let chartView = PieChartView()

  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    clipsToBounds = true
    addSubview(chartView)
  }

  override func layoutSubviews() {
    chartView.frame = bounds
  }
}
```

--------------------------------

### Install Vexo Analytics Package

Source: https://docs.expo.dev/guides/using-vexo

These commands install the Vexo analytics package into your project using either npm or yarn, enabling real-time user analytics for your Expo application.

```npm
npm install vexo-analytics
```

```yarn
yarn add vexo-analytics
```

--------------------------------

### Configure EAS Workflow Triggers with `on` Key (YAML)

Source: https://docs.expo.dev/eas/workflows/syntax

The `on` key defines which GitHub events will automatically trigger the execution of your EAS workflow. This example shows how to trigger a workflow on `push` events to the `main` branch or on `pull_request` events for branches starting with 'version-'. Workflows can always be manually initiated using the `eas workflow:run` command, irrespective of the `on` key's configuration.

```yaml
on:
  # Trigger on pushes to main branch
  push:
    branches:
      - main
  # And on pull requests starting with 'version-'
  pull_request:
    branches:
      - version-*

```

--------------------------------

### Refactor Kotlin MainApplication Package List Handling

Source: https://docs.expo.dev/bare/upgrade_fromSdk=53&toSdk=54

Simplifies the getPackages() method in MainApplication.kt using Kotlin functional style with apply block instead of traditional block syntax. Improves code readability while maintaining the same functionality for package registration.

```kotlin
// Old implementation
override fun getPackages(): List<ReactPackage> {
  val packages = PackageList(this).packages
  // Packages that cannot be autolinked yet can be added manually here, for example:
  // packages.add(MyReactNativePackage())
  return packages
}

// New implementation
override fun getPackages(): List<ReactPackage> =
  PackageList(this).packages.apply {
    // Packages that cannot be autolinked yet can be added manually here, for example:
    // add(MyReactNativePackage())
  }
```

--------------------------------

### Install expo-constants package

Source: https://docs.expo.dev/versions/latest/sdk/constants

Install the expo-constants package using npm through the Expo CLI. This command automatically resolves dependencies and is the recommended installation method for Expo projects. Ensure that the expo package is already installed in your project if you're working with an existing React Native app.

```bash
npx expo install expo-constants
```

--------------------------------

### Install EAS CLI and authenticate

Source: https://docs.expo.dev/develop/development-builds/create-a-build

Install the EAS CLI globally and log in with your Expo account credentials. This is a prerequisite for building native apps on EAS servers and is required before running any build commands.

```bash
npm install -g eas-cli && eas login
```

--------------------------------

### Web Bundler Configuration

Source: https://docs.expo.dev/versions/v54.0.0/config/app

Configure the bundler for web platform builds. Supports webpack and metro bundlers with automatic fallback based on installed packages.

```APIDOC
## Web Bundler Configuration

### Description
Specify which bundler to use for web platform builds. Only supported in local CLI with `npx expo`.

### Property

#### bundler
- **Type**: `enum`
- **Path**: `web.bundler`
- **Required**: Optional
- **Allowed Values**: `webpack`, `metro`
- **Default**: `webpack` if `@expo/webpack-config` is installed, otherwise `metro`
- **Description**: Sets the bundler to use for the web platform

### Configuration Example
```json
{
  "web": {
    "bundler": "webpack"
  }
}
```
```

--------------------------------

### Configure Complete Apple App Store Info (JSON)

Source: https://docs.expo.dev/eas/metadata/schema

This JSON configuration provides a comprehensive set of localized App Store details for an Apple app within `store.config.json`. It covers the app's title, subtitle, description, keywords, release notes, promotional text, and various marketing, support, and privacy URLs for a given locale.

```json
{
  "configVersion": 0,
  "apple": {
    "info": {
      "en-US": {
        "title": "App title",
        "subtitle": "Subtitle for your app",
        "description": "A longer description of what your app does",
        "keywords": ["keyword", "other-keyword"],
        "releaseNotes": "Bug fixes and improved stability",
        "promoText": "Short tagline for your app",
        "marketingUrl": "https://example.com/en",
        "supportUrl": "https://example.com/en/help",
        "privacyPolicyUrl": "https://example.com/en/privacy",
        "privacyChoicesUrl": "https://example.com/en/privacy/choices"
      }
    }
  }
}
```

--------------------------------

### Install Expo Speech Library

Source: https://docs.expo.dev/versions/latest/sdk/speech

Installs the `expo-speech` library into an Expo project using `npx expo install`. This command ensures compatibility with your current Expo SDK version.

```shell
npx expo install expo-speech
```

--------------------------------

### Run Expo Development Server or Export for Production

Source: https://docs.expo.dev/router/reference/src-directory

These `npx` commands are executed in the terminal to manage an Expo Router project. `npx expo start` initiates the local development server, while `npx expo export` generates a production-ready build of the application.

```bash
npx expo start
# Or export for production
npx expo export
```

--------------------------------

### POST play() - Start Audio Playback

Source: https://docs.expo.dev/versions/v54.0.0/sdk/audio

Starts playing audio from the current position. This method begins playback of the loaded audio source.

```APIDOC
## POST AudioPlayer.play()

### Description
Start playing audio.

### Method
Function

### Parameters
None

### Returns
`void`

### Usage Example
```javascript
const player = useAudioPlayer(source);
player.play();
```
```

--------------------------------

### AudioRecorder record()

Source: https://docs.expo.dev/versions/v53.0.0/sdk/audio

Starts the audio recording.

```APIDOC
## POST /audioRecorder/record

### Description
Starts the recording.

### Method
POST

### Endpoint
/audioRecorder/record

### Parameters
#### Path Parameters
(None)

#### Query Parameters
(None)

#### Request Body
(None)

### Request Example
{}

### Response
#### Success Response (200)
- **return** (void) - No return value.

#### Response Example
{}
```

--------------------------------

### Handle Multiple Possible Argument Types with Either in Swift and Kotlin

Source: https://docs.expo.dev/modules/module-api

This example illustrates the use of `Either` types to allow a single function argument to accept values of different types. It shows how to check the specific type of the received value and safely extract it using `get()` for conditional logic. This is useful for flexible API designs where an argument can be one of several predefined types.

```Swift
Function("foo") { (bar: Either<String, Int>) in
  if let bar: String = bar.get() {
    // `bar` is a String
  }
  if let bar: Int = bar.get() {
    // `bar` is an Int
  }
}
```

```Kotlin
Function("foo") { bar: Either<String, Int> ->
  bar.get(String::class).let {
    // `it` is a String
  }
  bar.get(Int::class).let {
    // `it` is an Int
  }
}
```

--------------------------------

### Initialize New Expo Project with create-expo-app Command

Source: https://docs.expo.dev/more/create-expo

Execute one of these commands to start a new Expo and React Native project using your preferred Node Package Manager. The tool will then prompt you to enter a name for your application.

```Terminal
npx create-expo-app@latest
```

```Terminal
yarn create expo-app
```

```Terminal
pnpm create expo-app
```

```Terminal
bun create expo
```

--------------------------------

### Create File Instance with Directory Path

Source: https://docs.expo.dev/versions/latest/sdk/filesystem

Demonstrates how to instantiate a new File object by combining a Directory reference with subdirectory and filename strings. The File constructor accepts variable arguments that are joined to create the file URI path.

```javascript
const file = new File(Paths.cache, "subdirName", "file.txt");
```

--------------------------------

### Configure Android App Version in EAS Build

Source: https://docs.expo.dev/custom-builds/schema

This snippet demonstrates how to integrate the `eas/configure_android_version` step into an EAS build workflow. It shows a basic setup without explicit version inputs, relying on default version management, and an example explicitly setting `version_code` and `version_name` for an Android application build, useful for remote app version management.

```yaml
build:
  name: Configure Android version
  steps:
    - eas/checkout
    - eas/install_node_modules
    - eas/prebuild
    - eas/configure_eas_update
    - eas/inject_android_credentials
    - eas/configure_android_version
```

```yaml
build:
  name: Configure Android version
  steps:
    - eas/checkout
    - eas/install_node_modules
    - eas/prebuild
    - eas/configure_eas_update
    - eas/inject_android_credentials
    - eas/configure_android_version:
        inputs:
          version_code: '123'
          version_name: '1.0.0'
```

--------------------------------

### Configure and Schedule Android Notification with Custom Sound (JavaScript)

Source: https://docs.expo.dev/versions/v54.0.0/sdk/notifications

This JavaScript example illustrates how to manually configure and schedule a notification with a custom sound for Android. It distinguishes sound settings for Android 8.0+ (via channelId) and older versions (via content.sound), requiring the sound file to be placed in `android/app/src/main/res/raw/`.

```javascript
// Prepare the notification channel
await Notifications.setNotificationChannelAsync('new_emails', {
  name: 'E-mail notifications',
  importance: Notifications.AndroidImportance.HIGH,
  sound: 'email_sound.wav', // <- for Android 8.0+, see channelId property below
});

// Eg. schedule the notification
await Notifications.scheduleNotificationAsync({
  content: {
    title: "You've got mail! 📬",
    body: 'Open the notification to read them all',
    sound: 'email_sound.wav', // <- for Android below 8.0
  },
  trigger: {
    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: 2,
    channelId: 'new_emails', // <- for Android 8.0+, see definition above
  },
});
```

--------------------------------

### Clean Up Default Expo Module Files for Settings Module

Source: https://docs.expo.dev/modules/native-module-tutorial

These commands navigate into the newly created module directory and remove default view-related files. This action prepares a clean slate for implementing custom native module logic by deleting components not needed for a settings persistence module.

```Terminal
cd expo-settings
rm ios/ExpoSettingsView.swift
rm android/src/main/java/expo/modules/settings/ExpoSettingsView.kt
rm src/ExpoSettingsView.tsx
rm src/ExpoSettingsView.web.tsx src/ExpoSettingsModule.web.ts
```

--------------------------------

### Define Custom Entry Point File for Expo Router

Source: https://docs.expo.dev/router/installation

This JavaScript file serves as a custom entry point, allowing for initialization of global services, polyfills, or log configurations before the main app loads. Ensure `import 'expo-router/entry';` is the last statement to properly register the app entry.

```JavaScript
// Import side effects first and services

// Initialize services

// Register app entry through Expo Router
import 'expo-router/entry';
```

--------------------------------

### Integrate Android System WebView (Kotlin)

Source: https://docs.expo.dev/modules/native-view-tutorial

Integrates the native Android `WebView` into the `ExpoWebView` class. It initializes the `WebView`, sets its layout to match the parent, and loads a hardcoded URL, allowing native web content rendering within the Expo module on Android.

```Kotlin
package expo.modules.webview

import android.content.Context
import android.webkit.WebView
import android.webkit.WebViewClient
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.views.ExpoView

class ExpoWebView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  internal val webView = WebView(context).also {
    it.layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
    it.webViewClient = object : WebViewClient() {}
    addView(it)

    it.loadUrl("https://docs.expo.dev/modules/")
  }
}
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/v52.0.0/sdk/device

Install the expo-device package in your Expo or React Native project using npm.

```APIDOC
## Installation

### Description
Install the expo-device library in your project to access device system information.

### Command
```bash
npx expo install expo-device
```

### Prerequisites
- Ensure you have `expo` installed in your project if using an existing React Native app

### Bundled Version
- ~7.0.3
```

--------------------------------

### Install Expo Checkbox dependency

Source: https://docs.expo.dev/versions/latest/sdk/checkbox

Installs the `expo-checkbox` package into your project using `npx expo install`. This command ensures that the correct version of the dependency, compatible with your Expo environment, is added.

```shell
npx expo install expo-checkbox
```

--------------------------------

### Install expo-screen-capture package

Source: https://docs.expo.dev/versions/latest/sdk/screen-capture

Installs the `expo-screen-capture` package into your Expo or React Native project using `npx expo install`. This is the first step to utilize the screen capture protection and detection features.

```terminal
npx expo install expo-screen-capture
```

--------------------------------

### Install Git LFS for iOS Builds in EAS Pre-Install Shell Script

Source: https://docs.expo.dev/build-reference/npm-hooks

This `pre-install` shell script demonstrates how to conditionally install `git-lfs` using Homebrew, specifically for iOS builds. It checks if `git-lfs` is already installed and, if not, proceeds with its installation, which can be crucial for certain CocoaPods dependencies on macOS workers.

```bash
if [[ "$EAS_BUILD_PLATFORM" == "ios" ]]; then
  if brew list git-lfs > /dev/null 2>&1; then
    echo "=====> git-lfs is already installed."
  else
    echo "=====> Installing git-lfs"
    HOMEBREW_NO_AUTO_UPDATE=1 brew install git-lfs
    git lfs install
  fi
fi
```

--------------------------------

### POST IntentLauncher.openApplication(packageName)

Source: https://docs.expo.dev/versions/latest/sdk/intent-launcher

Opens an application by its package name. This method initiates the application specified by the package name.

```APIDOC
## POST IntentLauncher.openApplication

### Description
Opens an application by its package name.

### Method
POST

### Parameters
#### Body Parameters
- **packageName** (string) - Required - The package name of the application to open. For example, `com.google.android.gm` for Gmail.

### Request Example
```javascript
IntentLauncher.openApplication('com.google.android.gm');
```

### Response
#### Success Response (200)
- No return value

### Return Type
`void`
```

--------------------------------

### Function Call /prepareToRecordAsync

Source: https://docs.expo.dev/versions/latest/sdk/audio-av

Loads the audio recorder into memory and prepares it for recording, setting initial options. This is a prerequisite for starting a recording.

```APIDOC
## Function Call /prepareToRecordAsync

### Description
Loads the recorder into memory and prepares it for recording. This must be called before calling `startAsync()`. This method can only be called if the `Recording` instance has never yet been prepared.

### Method
Function Call

### Endpoint
/prepareToRecordAsync

### Parameters
#### Path Parameters
(None)

#### Query Parameters
(None)

#### Request Body
- **options** (`RecordingOptions`) - Optional - `RecordingOptions` for the recording, including sample rate, bitrate, channels, format, encoder, and extension. If no options are passed to `prepareToRecordAsync()`, the recorder will be created with options `Audio.RecordingOptionsPresets.LOW_QUALITY`. Default: `RecordingOptionsPresets.LOW_QUALITY`

### Request Example
{
  "options": {
    "android": {
      "extension": ".m4a",
      "outputFormat": 2,
      "audioEncoder": 3,
      "sampleRate": 44100,
      "numberOfChannels": 2,
      "bitRate": 128000
    },
    "ios": {
      "extension": ".caf",
      "audioQuality": 1,
      "sampleRate": 44100,
      "numberOfChannels": 2,
      "bitRate": 128000,
      "linearPCMBitDepth": 16,
      "linearPCMIsBigEndian": false,
      "linearPCMIsFloat": false
    },
    "web": {
      "mimeType": "audio/webm"
    }
  }
}

### Response
#### Success Response (Promise Resolution)
- **status** (`RecordingStatus`) - The current status of the recording upon successful preparation.

#### Response Example
{
  "canRecord": true,
  "durationMillis": 0,
  "isRecording": false,
  "isDoneRecording": false,
  "uri": null,
  "metering": null
}
```

--------------------------------

### Expo Project package.json Configuration

Source: https://docs.expo.dev/bare/upgrade

This snippet displays a `package.json` file, crucial for managing an Expo project. It defines the main entry point, scripts for starting the development server and web interface, and lists runtime dependencies such as Expo SDK, React, and React Native, along with development tools like Babel.

```json
{
  "main": "index.js",
  "scripts": {
    "start": "expo start --dev-client",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~54.0.0-preview.1",
    "expo-status-bar": "~3.0.1",
    "react": "19.1.0",
    "react-native": "0.81.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  }
}
```

--------------------------------

### Execute Parameterized Queries with SQLite Prepared Statements in JavaScript

Source: https://docs.expo.dev/versions/unversioned/sdk/sqlite

This example illustrates the use of prepared statements for secure and efficient database interactions. It covers creating a prepared statement with `prepareAsync`, executing it multiple times with different parameters using `executeAsync` (preventing SQL injection), and iterating through results. It highlights the importance of `finalizeAsync` within a `try-finally` block for resource management.

```javascript
const statement = await db.prepareAsync(
  'INSERT INTO test (value, intValue) VALUES ($value, $intValue)'
);
try {
  let result = await statement.executeAsync({ $value: 'bbb', $intValue: 101 });
  console.log('bbb and 101:', result.lastInsertRowId, result.changes);

  result = await statement.executeAsync({ $value: 'ccc', $intValue: 102 });
  console.log('ccc and 102:', result.lastInsertRowId, result.changes);

  result = await statement.executeAsync({ $value: 'ddd', $intValue: 103 });
  console.log('ddd and 103:', result.lastInsertRowId, result.changes);
} finally {
  await statement.finalizeAsync();
}

const statement2 = await db.prepareAsync('SELECT * FROM test WHERE intValue >= $intValue');
try {
  const result = await statement2.executeAsync<{ value: string; intValue: number }>(
    { $intValue: 100 }
  );

  // `getFirstAsync()` is useful when you want to get a single row from the database.
  const firstRow = await result.getFirstAsync();
  console.log(firstRow.id, firstRow.value, firstRow.intValue);

  // Reset the SQLite query cursor to the beginning for the next `getAllAsync()` call.
  await result.resetAsync();

  // `getAllAsync()` is useful when you want to get all results as an array of objects.
  const allRows = await result.getAllAsync();
  for (const row of allRows) {
    console.log(row.value, row.intValue);
  }

  // Reset the SQLite query cursor to the beginning for the next `for-await-of` loop.
  await result.resetAsync();

  // The result object is also an async iterable. You can use it in `for-await-of` loop to iterate SQLite query cursor.
  for await (const row of result) {
    console.log(row.value, row.intValue);
  }
} finally {
  await statement2.finalizeAsync();
}
```

--------------------------------

### Install Expo Image in a React Native Project

Source: https://docs.expo.dev/versions/latest/sdk/image

Provides the command to install the `expo-image` library using `npx expo install`. This is the essential first step to integrate the image component into any Expo or existing React Native application, ensuring all dependencies are correctly handled.

```shell
npx expo install expo-image
```

--------------------------------

### Install expo-network using npx

Source: https://docs.expo.dev/versions/latest/sdk/network

Installs the `expo-network` package into an existing or new Expo project. If integrating into an existing React Native app, ensure the core `expo` package is also installed.

```bash
npx expo install expo-network
```

--------------------------------

### Deploy Expo Web Build to Netlify

Source: https://docs.expo.dev/guides/publishing-websites

This command deploys the static web build located in the `dist` directory to Netlify. It initiates the deployment process, making your web application accessible online via a generated Netlify URL. Ensure your build is complete and redirects are configured before running this command.

```terminal
netlify deploy --dir dist
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/v52.0.0/sdk/system-ui

Install the expo-system-ui package in your Expo project using npx. This library allows you to interact with system UI elements that fall outside of the React component tree.

```APIDOC
## Installation

### Description
Install the expo-system-ui library in your Expo project.

### Command
```bash
npx expo install expo-system-ui
```

### Prerequisites
- Expo project initialized
- If installing in an existing React Native app, ensure `expo` is also installed in your project

### Import
```javascript
import * as SystemUI from 'expo-system-ui';
```
```

--------------------------------

### Write and read text files with TypeScript

Source: https://docs.expo.dev/versions/v53.0.0/sdk/filesystem-next

Create a new text file using the File class, write content to it, and read it back. The example demonstrates error handling for file creation and permission issues. Uses Paths.cache as the destination directory.

```typescript
import { File, Paths } from 'expo-file-system/next';

try {
  const file = new File(Paths.cache, 'example.txt');
  file.create(); // can throw an error if the file already exists or no permission to create it
  file.write('Hello, world!');
  console.log(file.text()); // Hello, world!
} catch (error) {
  console.error(error);
}
```

--------------------------------

### Install Expo Print Library

Source: https://docs.expo.dev/versions/latest/sdk/print

This command installs the `expo-print` package into your Expo or React Native project. For existing React Native applications, ensure the `expo` package is also installed to meet dependencies.

```shell
npx expo install expo-print
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/v54.0.0/sdk/image

Install the expo-image package in your React Native or Expo project using npx expo install command.

```APIDOC
## Installation

### Description
Install the expo-image component in your project.

### Command
```
npx expo install expo-image
```

### Requirements
- Expo SDK installed in your project
- React Native environment configured

### Notes
- For existing React Native apps, ensure `expo` is installed in your project
- Package version: ~3.0.11
```

--------------------------------

### Android ActivityAction Constants for System Settings

Source: https://docs.expo.dev/versions/v52.0.0/sdk/intent-launcher

This snippet provides a comprehensive list of `ActivityAction` constants, each mapping to a specific `android.settings` intent string. These constants are typically used in Android applications (e.g., Java or Kotlin) to programmatically launch various system settings screens, allowing users to configure device features such as display, sound, network, and security. To use them, one would typically create an `Intent` with the action value and start the activity.

```Java
ActivityAction.CAPTIONING_SETTINGS = "android.settings.CAPTIONING_SETTINGS";
ActivityAction.CAST_SETTINGS = "android.settings.CAST_SETTINGS";
ActivityAction.DATA_ROAMING_SETTINGS = "android.settings.DATA_ROAMING_SETTINGS";
ActivityAction.DATE_SETTINGS = "android.settings.DATE_SETTINGS";
ActivityAction.DEVICE_INFO_SETTINGS = "android.settings.DEVICE_INFO_SETTINGS";
ActivityAction.DEVICE_NAME = "android.settings.DEVICE_NAME";
ActivityAction.DISPLAY_SETTINGS = "android.settings.DISPLAY_SETTINGS";
ActivityAction.DREAM_SETTINGS = "android.settings.DREAM_SETTINGS";
ActivityAction.HARD_KEYBOARD_SETTINGS = "android.settings.HARD_KEYBOARD_SETTINGS";
ActivityAction.HOME_SETTINGS = "android.settings.HOME_SETTINGS";
ActivityAction.IGNORE_BACKGROUND_DATA_RESTRICTIONS_SETTINGS = "android.settings.IGNORE_BACKGROUND_DATA_RESTRICTIONS_SETTINGS";
ActivityAction.IGNORE_BATTERY_OPTIMIZATION_SETTINGS = "android.settings.IGNORE_BATTERY_OPTIMIZATION_SETTINGS";
ActivityAction.INPUT_METHOD_SETTINGS = "android.settings.INPUT_METHOD_SETTINGS";
ActivityAction.INPUT_METHOD_SUBTYPE_SETTINGS = "android.settings.INPUT_METHOD_SUBTYPE_SETTINGS";
ActivityAction.INTERNAL_STORAGE_SETTINGS = "android.settings.INTERNAL_STORAGE_SETTINGS";
ActivityAction.LOCALE_SETTINGS = "android.settings.LOCALE_SETTINGS";
ActivityAction.LOCATION_SOURCE_SETTINGS = "android.settings.LOCATION_SOURCE_SETTINGS";
ActivityAction.MANAGE_ALL_APPLICATIONS_SETTINGS = "android.settings.MANAGE_ALL_APPLICATIONS_SETTINGS";
ActivityAction.MANAGE_APPLICATIONS_SETTINGS = "android.settings.MANAGE_APPLICATIONS_SETTINGS";
ActivityAction.MANAGE_DEFAULT_APPS_SETTINGS = "android.settings.MANAGE_DEFAULT_APPS_SETTINGS";
ActivityAction.MEMORY_CARD_SETTINGS = "android.settings.MEMORY_CARD_SETTINGS";
ActivityAction.MONITORING_CERT_INFO = "android.settings.MONITORING_CERT_INFO";
ActivityAction.NETWORK_OPERATOR_SETTINGS = "android.settings.NETWORK_OPERATOR_SETTINGS";
ActivityAction.NFC_PAYMENT_SETTINGS = "android.settings.NFC_PAYMENT_SETTINGS";
ActivityAction.NFC_SETTINGS = "android.settings.NFC_SETTINGS";
ActivityAction.NFCSHARING_SETTINGS = "android.settings.NFCSHARING_SETTINGS";
ActivityAction.NIGHT_DISPLAY_SETTINGS = "android.settings.NIGHT_DISPLAY_SETTINGS";
ActivityAction.NOTIFICATION_POLICY_ACCESS_SETTINGS = "android.settings.NOTIFICATION_POLICY_ACCESS_SETTINGS";
ActivityAction.NOTIFICATION_SETTINGS = "android.settings.NOTIFICATION_SETTINGS";
ActivityAction.PAIRING_SETTINGS = "android.settings.PAIRING_SETTINGS";
ActivityAction.PRIVACY_SETTINGS = "android.settings.PRIVACY_SETTINGS";
ActivityAction.QUICK_LAUNCH_SETTINGS = "android.settings.QUICK_LAUNCH_SETTINGS";
ActivityAction.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS = "android.settings.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS";
ActivityAction.SECURITY_SETTINGS = "android.settings.SECURITY_SETTINGS";
ActivityAction.SETTINGS = "android.settings.SETTINGS";
ActivityAction.SHOW_ADMIN_SUPPORT_DETAILS = "android.settings.SHOW_ADMIN_SUPPORT_DETAILS";
ActivityAction.SHOW_INPUT_METHOD_PICKER = "android.settings.SHOW_INPUT_METHOD_PICKER";
ActivityAction.SHOW_REGULATORY_INFO = "android.settings.SHOW_REGULATORY_INFO";
ActivityAction.SHOW_REMOTE_BUGREPORT_DIALOG = "android.settings.SHOW_REMOTE_BUGREPORT_DIALOG";
ActivityAction.SOUND_SETTINGS = "android.settings.SOUND_SETTINGS";
ActivityAction.STORAGE_MANAGER_SETTINGS = "android.settings.STORAGE_MANAGER_SETTINGS";
ActivityAction.SYNC_SETTINGS = "android.settings.SYNC_SETTINGS";
ActivityAction.SYSTEM_UPDATE_SETTINGS = "android.settings.SYSTEM_UPDATE_SETTINGS";
ActivityAction.TETHER_PROVISIONING_UI = "android.settings.TETHER_PROVISIONING_UI";
```

--------------------------------

### Installing SourceKitten and generating TypeScript mocks

Source: https://docs.expo.dev/modules/mocking

These terminal commands detail the steps for automatically generating TypeScript mocks for native module functions. It involves first installing the `SourceKitten` framework, a prerequisite for parsing Swift, and then executing the `generate-ts-mocks` command from `expo-modules-test-core` within the module's directory.

```Shell
brew install sourcekitten
```

```Shell
npx expo-modules-test-core generate-ts-mocks
```

--------------------------------

### Install Expo AV Package

Source: https://docs.expo.dev/versions/latest/sdk/av

Install the expo-av package in your Expo project using npx. Ensure the expo package is installed in your project if integrating into an existing React Native app.

```bash
npx expo install expo-av
```

--------------------------------

### Basic Usage Example

Source: https://docs.expo.dev/versions/v54.0.0/sdk/image

Example implementation of the Image component with blurhash placeholder, content fitting, and image transition effects.

```APIDOC
## Image Component - Basic Usage

### Description
Basic example showing how to implement the Image component with placeholder and transition effects.

### Import
```javascript
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
```

### Example Code
```javascript
const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';\n\nexport default function App() {\n  return (\n    <View style={styles.container}>\n      <Image\n        style={styles.image}\n        source="https://picsum.photos/seed/696/3000/2000"\n        placeholder={{ blurhash }}\n        contentFit="cover"\n        transition={1000}\n      />\n    </View>\n  );\n}\n\nconst styles = StyleSheet.create({\n  container: {\n    flex: 1,\n    backgroundColor: '#fff',\n    alignItems: 'center',\n    justifyContent: 'center',\n  },\n  image: {\n    flex: 1,\n    width: '100%',\n    backgroundColor: '#0553',\n  },\n});\n```
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/unversioned/sdk/gyroscope

Install the expo-sensors package which includes the Gyroscope module. Ensure expo is installed in your React Native project.

```APIDOC
## Installation Guide

### Description
Install the Expo Sensors package to access the Gyroscope module.

### Package
expo-sensors

### Installation Command
```
npx expo install expo-sensors
```

### Prerequisites
- Expo CLI installed
- Existing React Native project
- expo package installed in your project
```

--------------------------------

### AudioRecorder prepareToRecordAsync(options)

Source: https://docs.expo.dev/versions/v53.0.0/sdk/audio

Prepares the AudioRecorder for recording with optional settings.

```APIDOC
## POST /audioRecorder/prepare

### Description
Prepares the recording for recording.

### Method
POST

### Endpoint
/audioRecorder/prepare

### Parameters
#### Path Parameters
(None)

#### Query Parameters
(None)

#### Request Body
- **options** (Partial<RecordingOptions>) - Optional - Options for preparing the recording.

### Request Example
{
  "options": {
    "outputFormat": "mpeg4",
    "sampleRate": 44100
  }
}

### Response
#### Success Response (200)
- **return** (Promise<void>) - A promise that resolves when the recorder is prepared.

#### Response Example
{}
```

--------------------------------

### Install expo-font and expo-splash-screen packages

Source: https://docs.expo.dev/develop/user-interface/fonts

Install required dependencies for font loading functionality. The expo-font library enables asynchronous font loading, while expo-splash-screen provides the SplashScreen component to prevent app rendering until fonts are ready.

```bash
npx expo install expo-font expo-splash-screen
```

--------------------------------

### Configure .npmrc for private npm packages published to npmjs.org

Source: https://docs.expo.dev/build-reference/private-npm-packages

Shows the `.npmrc` configuration that EAS automatically generates when the `NPM_TOKEN` environment variable is detected during a build. This setup allows installing private packages from `registry.npmjs.org` using a read-only npm token. If an `.npmrc` file already exists in the project root, it must be updated manually.

```npmrc
//registry.npmjs.org/:_authToken=${NPM_TOKEN}
registry=https://registry.npmjs.org/
```

--------------------------------

### GET /file-system/legacy/getInfoAsync

Source: https://docs.expo.dev/versions/latest/sdk/filesystem-legacy

Get metadata information about a file, directory or external content/asset.

```APIDOC
## GET /file-system/legacy/getInfoAsync

### Description
Get metadata information about a file, directory or external content/asset.

### Method
GET

### Endpoint
/file-system/legacy/getInfoAsync

### Parameters
#### Path Parameters
_None_

#### Query Parameters
_None_

#### Request Body
- **fileUri** (string) - Required - URI to the file or directory. See supported URI schemes.
- **options** (InfoOptions) - Optional - A map of options represented by `InfoOptions` type. Default: `{}`

### Request Example
```json
{
  "fileUri": "file://path/to/my/document.txt",
  "options": {
    "md5": true
  }
}
```

### Response
#### Success Response (200)
- **exists** (boolean) - Indicates if the item exists at the URI.
- **isDirectory** (boolean) - Indicates if the item is a directory.
- **uri** (string) - The URI of the item (if it exists).
- **size** (number) - The size of the item in bytes (if it exists).
- **modificationTime** (number) - The last modification time of the item (if it exists, Unix timestamp).
- **md5** (string) - The MD5 hash of the item (if requested and it exists).

#### Response Example
```json
{
  "exists": true,
  "isDirectory": false,
  "uri": "file://path/to/my/document.txt",
  "size": 12345,
  "modificationTime": 1678886400,
  "md5": "abcdef1234567890"
}
```

#### Response Example (File not found)
```json
{
  "exists": false,
  "isDirectory": false
}
```
```

--------------------------------

### Install and Submit App using EAS CLI

Source: https://docs.expo.dev/distribution/introduction

This snippet provides commands to install the EAS CLI, then build and automatically submit a React Native application to app stores, or submit existing binaries. The EAS CLI handles native code signing for Android and iOS and supports advanced features.

```shell
# Install the CLI
npm i -g eas-cli

# Build and submit your app
eas build --auto-submit

# OR -- Submit existing binaries
eas submit
```

--------------------------------

### Basic useSQLiteContext() Hook with SQLiteProvider

Source: https://docs.expo.dev/versions/latest/sdk/sqlite

Demonstrates how to use the useSQLiteContext() hook to access the database instance and perform queries. The example shows a complete app with Header and Content components that retrieve SQLite version and todo items from the database. The migrateDbIfNeeded function handles database schema creation and initialization on first run.

```typescript
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <SQLiteProvider databaseName="test.db" onInit={migrateDbIfNeeded}>
        <Header />
        <Content />
      </SQLiteProvider>
    </View>
  );
}

export function Header() {
  const db = useSQLiteContext();
  const [version, setVersion] = useState('');
  useEffect(() => {
    async function setup() {
      const result = await db.getFirstAsync<{ 'sqlite_version()': string }>(
        'SELECT sqlite_version()'
      );
      setVersion(result['sqlite_version()']);
    }
    setup();
  }, []);
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>SQLite version: {version}</Text>
    </View>
  );
}

interface Todo {
  value: string;
  intValue: number;
}

export function Content() {
  const db = useSQLiteContext();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function setup() {
      const result = await db.getAllAsync<Todo>('SELECT * FROM todos');
      setTodos(result);
    }
    setup();
  }, []);

  return (
    <View style={styles.contentContainer}>
      {todos.map((todo, index) => (
        <View style={styles.todoItemContainer} key={index}>
          <Text>{`${todo.intValue} - ${todo.value}`}</Text>
        </View>
      ))}
    </View>
  );
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let { user_version: currentDbVersion } = await db.getFirstAsync<{ user_version: number }>(
    'PRAGMA user_version'
  );
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(`
PRAGMA journal_mode = 'wal';
CREATE TABLE todos (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
`);
    await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'hello', 1);
    await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'world', 2);
    currentDbVersion = 1;
  }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
```

--------------------------------

### Install Expo SQLite Package

Source: https://docs.expo.dev/versions/latest/sdk/sqlite

Install the expo-sqlite library using the Expo CLI. This command adds SQLite database capabilities to your Expo project and installs the expo package if not already present.

```bash
npx expo install expo-sqlite
```

--------------------------------

### Install expo-dev-client package

Source: https://docs.expo.dev/develop/development-builds/create-a-build

Install the expo-dev-client library in your Expo project. This is required for development builds and provides the foundation for custom native development. For existing bare React Native apps not using Continuous Native Generation, additional configuration steps are required.

```bash
npx expo install expo-dev-client
```

--------------------------------

### ExtraIosPodDependency iOS CocoaPods Configuration Example

Source: https://docs.expo.dev/versions/latest/sdk/build-properties

Example of configuring an extra iOS CocoaPods dependency with git source and tag reference. This demonstrates how to add a pod dependency from a Git repository instead of the default CocoaPods registry, equivalent to the Podfile syntax pod 'AFNetworking', :git => 'https://github.com/gowalla/AFNetworking.git', :tag => '0.7.0'.

```json
{
  "name": "AFNetworking",
  "git": "https://github.com/gowalla/AFNetworking.git",
  "tag": "0.7.0"
}
```

--------------------------------

### FileSystem Legacy.makeDirectoryAsync(fileUri, options)

Source: https://docs.expo.dev/versions/unversioned/sdk/filesystem-legacy

Creates a new empty directory at the specified `fileUri`, with optional configuration from `MakeDirectoryOptions`.

```APIDOC
## Function: `makeDirectoryAsync`

### Description
Create a new empty directory.

### Method
Function Call

### Endpoint
`FileSystem Legacy.makeDirectoryAsync(fileUri, options)`

### Parameters
#### Function Parameters
- **fileUri** (string) - Required - `file://` URI to the new directory to create.
- **options** (MakeDirectoryOptions) - Optional - A map of create directory options represented by `MakeDirectoryOptions` type. Default: `{}`

### Request Example
{
  "fileUri": "file:///path/to/my/new_directory",
  "options": {
    "intermediates": true
  }
}

### Response
#### Success Response (200)
- **return** (void) - Indicates successful creation without returning a value.

#### Response Example
{}
```

--------------------------------

### Install @expo/ui for Jetpack Compose

Source: https://docs.expo.dev/versions/latest/sdk/ui/jetpack-compose

This command installs the `@expo/ui` package, which includes the Jetpack Compose components, into your project. If you are using an existing React Native app, ensure `expo` is also installed as a dependency.

```bash
npx expo install @expo/ui
```

--------------------------------

### Install APK on physical Android device using ADB (Terminal)

Source: https://docs.expo.dev/build-reference/apk

This command uses the Android Debug Bridge (ADB) to install a locally downloaded APK file onto a connected physical Android device. It requires ADB to be installed on the development machine and USB debugging to be enabled on the target Android device for successful installation.

```terminal
adb install path/to/the/file.apk
```

--------------------------------

### Install Expo LinearGradient Package

Source: https://docs.expo.dev/versions/latest/sdk/linear-gradient

Install the expo-linear-gradient package in your Expo project using the terminal command. This installs the bundled version ~15.0.8 which provides native gradient rendering capabilities.

```bash
npx expo install expo-linear-gradient
```

--------------------------------

### Install TinyBase DevTools Expo Plugin

Source: https://docs.expo.dev/debugging/devtools-plugins

Installs the `@dev-plugins/tinybase` package using `npx expo install`. This plugin connects the TinyBase Store Inspector to your Expo application, allowing you to view and update the contents of your TinyBase store directly from the DevTools.

```bash
npx expo install @dev-plugins/tinybase
```

--------------------------------

### Function Audio.Recording.createAsync

Source: https://docs.expo.dev/versions/latest/sdk/audio-av

Creates and starts an audio recording with specified options and status update handlers.

```APIDOC
## Function Audio.Recording.createAsync

### Description
Creates and starts a recording using the given options, with optional `onRecordingStatusUpdate` and `progressUpdateIntervalMillis`.

### Method
Function Call

### Endpoint
Audio.Recording.createAsync

### Parameters
#### Request Body
- **options** (`RecordingOptions`) - Optional - Options for the recording, including sample rate, bitrate, channels, format, encoder, and extension. If no options are passed to, the recorder will be created with options `Audio.RecordingOptionsPresets.LOW_QUALITY`. Default: `RecordingOptionsPresets.LOW_QUALITY`
- **onRecordingStatusUpdate** (`null | (status: RecordingStatus) => void`) - Optional - A function taking a single parameter `status` (a dictionary, described in `getStatusAsync`). Default: `null`
- **progressUpdateIntervalMillis** (`null | number`) - Optional - The interval between calls of `onRecordingStatusUpdate`. This value defaults to 500 milliseconds. Default: `null`

### Request Example
```javascript
const { recording, status } = await Audio.Recording.createAsync(
  options,
  onRecordingStatusUpdate,
  progressUpdateIntervalMillis
);

// Which is equivalent to the following:
const recording = new Audio.Recording();
await recording.prepareToRecordAsync(options);
recording.setOnRecordingStatusUpdate(onRecordingStatusUpdate);
await recording.startAsync();
```

### Response
#### Success Response
- **Returns** (`Promise<RecordingObject>`) - A Promise that is rejected if creation failed, or fulfilled with a RecordingObject if creation succeeded.

#### Response Example
```javascript
try {
  const { recording: recordingObject, status } = await Audio.Recording.createAsync(
    Audio.RecordingOptionsPresets.HIGH_QUALITY
  );
  // You are now recording!
} catch (error) {
  // An error occurred!
}
```
```

--------------------------------

### Install Expo Orbit on macOS via Homebrew

Source: https://docs.expo.dev/develop/tools

Install the Orbit application on macOS using the Homebrew package manager. Orbit facilitates installing and launching EAS builds, updates, and Snack projects on physical devices and simulators, supporting various app formats.

```bash
brew install expo-orbit
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/v53.0.0/sdk/video-thumbnails

Install the expo-video-thumbnails package in your Expo project. This package is bundled with version ~9.1.3 and requires the expo package to be installed in existing React Native apps.

```APIDOC
## Installation

### Overview
Install the Expo VideoThumbnails library to your project.

### Command
```
npx expo install expo-video-thumbnails
```

### Requirements
- Expo project or existing React Native app with expo installed
- Bundled version: ~9.1.3

### Additional Setup
If installing in an existing React Native app, ensure `expo` is installed in your project.
```

--------------------------------

### Understand Expo Plugin Resolution Order: Direct Internal Import

Source: https://docs.expo.dev/config-plugins/mods

Shows an example of directly importing an internal module file of an Expo package. This approach bypasses standard resolution order and is not recommended due to potential breaking changes.

```typescript
import "expo-splash-screen/build/index.js"
```

--------------------------------

### Configure Info.plist for iOS 15.1 - XML

Source: https://docs.expo.dev/bare/installing-expo-modules

Sets up iOS-specific configuration in Info.plist including enabling New Architecture support (RCTNewArchEnabled set to true) and defining required device capabilities. Requires iOS 15.1 as minimum deployment target.

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string></string>
<key>RCTNewArchEnabled</key>
<true/>
<key>UILaunchStoryboardName</key>
<string>LaunchScreen</string>
<key>UIRequiredDeviceCapabilities</key>
```

--------------------------------

### Start Expo Development Server with Tunnel Connection

Source: https://docs.expo.dev/get-started/start-developing

Starts the Expo development server with Tunnel connection type to enable access from devices on different networks or behind restrictive firewalls. Note that Tunnel connections result in slower app reloads compared to LAN or Local connections.

```bash
npx expo start --tunnel
```

--------------------------------

### Implement Basic onCreate Callback in Expo ReactActivityLifecycleListener

Source: https://docs.expo.dev/modules/android-lifecycle-listeners

This code demonstrates the basic structure of a `MyLibReactActivityLifecycleListener` class, which extends `ReactActivityLifecycleListener`. It specifically overrides the `onCreate` method to execute custom setup code when the Android Activity is first created. This allows for initializations dependent on the Activity's creation event.

```kotlin
package expo.modules.mylib

import android.app.Activity
import android.os.Bundle
import expo.modules.core.interfaces.ReactActivityLifecycleListener

class MyLibReactActivityLifecycleListener : ReactActivityLifecycleListener {
  override fun onCreate(activity: Activity, savedInstanceState: Bundle?) {
    // Your setup code in `Activity.onCreate`.
    doSomeSetupInActivityOnCreate(activity)
  }
}
```

```java
package expo.modules.mylib;

import android.app.Activity;
import android.os.Bundle;

import expo.modules.core.interfaces.ReactActivityLifecycleListener;

public class MyLibReactActivityLifecycleListener implements ReactActivityLifecycleListener {
  @Override
  public void onCreate(Activity activity, Bundle savedInstanceState) {
    // Your setup code in `Activity.onCreate`.
    doSomeSetupInActivityOnCreate(activity);
  }
}
```

--------------------------------

### Install Expo GL Package

Source: https://docs.expo.dev/versions/latest/sdk/gl-view

This command installs the `expo-gl` package, which provides the GLView component for OpenGL ES rendering. For existing React Native projects, ensure the `expo` package is also installed as a dependency.

```terminal
npx expo install expo-gl
```

--------------------------------

### Install i18n-js Package

Source: https://docs.expo.dev/guides/localization

This command installs the `i18n-js` library, which is used for managing and applying translations within a multi-language Expo application.

```bash
npx expo install i18n-js
```

--------------------------------

### Install expo-system-ui for Android appearance styles

Source: https://docs.expo.dev/develop/user-interface/color-themes

Command to install the `expo-system-ui` package, which is required for Android projects to properly support and apply `userInterfaceStyle` configurations, especially for development builds. This ensures theme changes are respected on Android.

```shell
npx expo install expo-system-ui
```

--------------------------------

### Install Expo Linking package

Source: https://docs.expo.dev/versions/latest/sdk/linking

Install the expo-linking library in your project using the Expo CLI. This command adds the library to your dependencies and ensures compatibility with your Expo project.

```bash
npx expo install expo-linking
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/unversioned/sdk/print

Install the expo-print library in your Expo project using the CLI command. This package provides printing functionality for Android and iOS platforms.

```APIDOC
## Installation

### Description
Install the expo-print package in your Expo project.

### Command
```
npx expo install expo-print
```

### Prerequisites
- Ensure `expo` is installed in your project if adding to an existing React Native app

### Notes
- Required for both Android and iOS printing functionality
- Web support available
```

--------------------------------

### Install expo-crypto package using Expo CLI

Source: https://docs.expo.dev/versions/latest/sdk/crypto

Installation command for adding the expo-crypto library to an Expo project. This command installs the cryptographic utilities library which provides hash functions and random byte generation.

```bash
npx expo install expo-crypto
```

--------------------------------

### Implement iOS Native Theme Module with UserDefaults (Swift)

Source: https://docs.expo.dev/modules/native-module-tutorial

This Swift code defines an Expo native module for iOS, `ExpoSettingsModule`, which offers functions to set and retrieve the application theme. It utilizes `UserDefaults` for theme persistence and emits an `onChangeTheme` event when the theme is updated.

```swift
import ExpoModulesCore

public class ExpoSettingsModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoSettings")

    Events("onChangeTheme")

    Function("setTheme") { (theme: String) -> Void in
      UserDefaults.standard.set(theme, forKey:"theme")
      sendEvent("onChangeTheme", [
        "theme": theme
      ])
    }

    Function("getTheme") { () -> String in
      UserDefaults.standard.string(forKey: "theme") ?? "system"
    }
  }
}
```

--------------------------------

### Implement Custom UIViewController for Expo Updates (Swift)

Source: https://docs.expo.dev/eas-update/integration-in-existing-native-apps

This Swift code defines a CustomViewController that conforms to AppControllerDelegate. It handles the initialization of the AppController, sets itself as the delegate, starts the update process, and then creates and embeds the React Native root view into its view hierarchy once updates are ready. This setup is crucial for integrating Expo Updates into a bare iOS project.

```swift
import UIKit
import EXUpdates
import ExpoModulesCore

// Step 1
public class CustomViewController: UIViewController, AppControllerDelegate {
  let appDelegate = AppDelegate.shared()

  // Step 2
  public convenience init() {
    self.init(nibName: nil, bundle: nil)
    self.view.backgroundColor = .clear
    // Step 2.1
    appDelegate.updatesController = AppController.sharedInstance
    // Step 2.2
    AppController.sharedInstance.delegate = self
    // Step 2.3
    AppController.sharedInstance.start()
  }

  required public override init(nibName nibNameOrNil: String?, bundle nibBundleOrNil: Bundle?) {
    super.init(nibName: nibNameOrNil, bundle: nibBundleOrNil)
  }

  @available(*, unavailable)
  required public init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  // Step 3
  public func appController(
    _ appController: AppControllerInterface,
    didStartWithSuccess success: Bool
  ) {
    createView()
  }

  private func createView() {
    // Step 3.1
    guard let rootViewFactory: RCTRootViewFactory = appDelegate.reactNativeFactory?.rootViewFactory else {
      fatalError("rootViewFactory has not been initialized")
    }
    let rootView = rootViewFactory.view(
      withModuleName: appDelegate.moduleName,
      initialProperties: appDelegate.initialProps,
      launchOptions: appDelegate.launchOptions
    )
    // Step 3.2
    let controller = self
    controller.view.clipsToBounds = true
    controller.view.addSubview(rootView)
    rootView.translatesAutoresizingMaskIntoConstraints = false
    NSLayoutConstraint.activate([
      rootView.topAnchor.constraint(equalTo: controller.view.safeAreaLayoutGuide.topAnchor),
      rootView.bottomAnchor.constraint(equalTo: controller.view.safeAreaLayoutGuide.bottomAnchor),
      rootView.leadingAnchor.constraint(equalTo: controller.view.safeAreaLayoutGuide.leadingAnchor),
      rootView.trailingAnchor.constraint(equalTo: controller.view.safeAreaLayoutGuide.trailingAnchor)
    ])
  }
}
```

--------------------------------

### Basic Barometer Usage Example

Source: https://docs.expo.dev/versions/v54.0.0/sdk/barometer

A complete example demonstrating how to use the Barometer API in a React Native application. Shows subscription management, data display, and platform-specific handling.

```APIDOC
## Basic Barometer Usage Example

### Description
Complete example of using the Barometer API with React Native components and lifecycle management.

### Code
```javascript
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { Barometer } from 'expo-sensors';

export default function App() {
  const [{ pressure, relativeAltitude }, setData] = useState({ pressure: 0, relativeAltitude: 0 });
  const [subscription, setSubscription] = useState(null);

  const toggleListener = () => {
    subscription ? unsubscribe() : subscribe();
  };

  const subscribe = () => {
    setSubscription(Barometer.addListener(setData));
  };

  const unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  return (
    <View style={styles.wrapper}>
      <Text>Barometer: Listener {subscription ? 'ACTIVE' : 'INACTIVE'}</Text>
      <Text>Pressure: {pressure} hPa</Text>
      <Text>
        Relative Altitude:{' '}
        {Platform.OS === 'ios' ? `${relativeAltitude} m` : `Only available on iOS`}
      </Text>
      <TouchableOpacity onPress={toggleListener} style={styles.button}>
        <Text>Toggle listener</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
    marginTop: 15,
  },
  wrapper: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
```

### Key Features
- Toggle barometer listener on and off
- Display real-time pressure measurements in hectopascals
- Show relative altitude on iOS (not available on Android)
- Proper subscription management and cleanup
```

--------------------------------

### Check Specific Package Versions with `npx expo install --check`

Source: https://docs.expo.dev/more/expo-cli

Validate the versions of particular packages by specifying them after `npx expo install` and adding the `--check` flag. This allows focused validation on selected dependencies, ensuring their compatibility.

```bash
npx expo install react-native expo-sms --check
```

--------------------------------

### Basic Gyroscope Usage Example

Source: https://docs.expo.dev/versions/unversioned/sdk/gyroscope

Complete example demonstrating how to initialize, subscribe to, and manage gyroscope sensor data in a React Native application with start/stop and speed controls.

```APIDOC
## Gyroscope Implementation

### Description
Complete working example showing gyroscope initialization, subscription management, and real-time data display.

### Implementation
```javascript
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Gyroscope } from 'expo-sensors';

export default function App() {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _slow = () => Gyroscope.setUpdateInterval(1000);
  const _fast = () => Gyroscope.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(
      Gyroscope.addListener(gyroscopeData => {
        setData(gyroscopeData);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Gyroscope:</Text>
      <Text style={styles.text}>x: {x}</Text>
      <Text style={styles.text}>y: {y}</Text>
      <Text style={styles.text}>z: {z}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={subscription ? _unsubscribe : _subscribe} style={styles.button}>
          <Text>{subscription ? 'On' : 'Off'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_slow} style={[styles.button, styles.middleButton]}>
          <Text>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_fast} style={styles.button}>
          <Text>Fast</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
```

### Key Features
- Subscribe/unsubscribe toggle for gyroscope monitoring
- Adjustable update intervals (fast: 16ms, slow: 1000ms)
- Real-time display of x, y, z rotation values
- Proper cleanup in useEffect hook

### Platform Support
- Android
- iOS (device only)
- Web
```

--------------------------------

### Install patch-project CLI and Plugin for Expo

Source: https://docs.expo.dev/config-plugins/patch-project

This command installs the `patch-project` CLI tool and automatically adds its config plugin to your Expo project, enabling it for managing native changes.

```bash
npx expo install patch-project
```

--------------------------------

### Install Expo MeshGradient Package

Source: https://docs.expo.dev/versions/latest/sdk/mesh-gradient

Install the expo-mesh-gradient package using npx expo install command. This command automatically adds the package to your project dependencies and ensures compatibility with your Expo SDK version.

```bash
npx expo install expo-mesh-gradient
```

--------------------------------

### Move and copy files using File methods

Source: https://docs.expo.dev/versions/v53.0.0/sdk/filesystem-next

Perform file operations including copy to a new location and move to different directories. Demonstrates creating files, copying with new filename, and moving files to cache and nested folders with URI tracking.

```typescript
import { Directory, File, Paths } from 'expo-file-system/next';

try {
  const file = new File(Paths.document, 'example.txt');
  file.create();
  console.log(file.uri); // '${documentDirectory}/example.txt'
  const copiedFile = new File(Paths.cache, 'example-copy.txt');
  file.copy(copiedFile);
  console.log(copiedFile.uri); // '${cacheDirectory}/example-copy.txt'
  file.move(Paths.cache);
  console.log(file.uri); // '${cacheDirectory}/example.txt'
  file.move(new Directory(Paths.cache, 'newFolder'));
  console.log(file.uri); // '${cacheDirectory}/newFolder/example.txt'
} catch (error) {
  console.error(error);
}
```

--------------------------------

### Install Expo Web Dependencies

Source: https://docs.expo.dev/workflow/web

Command to install required dependencies for web development with Expo including react-dom, react-native-web, and Metro runtime. Run this in your project terminal to set up web support.

```bash
npx expo install react-dom react-native-web @expo/metro-runtime
```

--------------------------------

### Install Expo Fingerprint Package via NPX

Source: https://docs.expo.dev/versions/latest/sdk/fingerprint

Install @expo/fingerprint as a standalone package using npm. This command uses npx to run the Expo CLI installer, which downloads and installs the latest compatible version of the fingerprint library.

```bash
npx expo install @expo/fingerprint
```

--------------------------------

### Importing Fingerprint Module

Source: https://docs.expo.dev/versions/v53.0.0/sdk/fingerprint

Illustrates how to import the `Fingerprint` module from `@expo/fingerprint` for use in your project.

```APIDOC
## Module Import

### Description
This section shows the standard way to import the `Fingerprint` module.

### Method
Import

### Endpoint
`import * as Fingerprint from '@expo/fingerprint';`

### Request Example
```javascript
import * as Fingerprint from '@expo/fingerprint';
```

### Response
N/A
```

--------------------------------

### Install Firebase JS SDK in Expo Project

Source: https://docs.expo.dev/guides/using-firebase

This command installs the Firebase JavaScript SDK into an Expo project using `npx expo install`. It's a prerequisite for integrating Firebase services, specifically for Expo SDK 53 and later which only support `firebase@^12.0.0`.

```Terminal
npx expo install firebase
```

--------------------------------

### Chip Component Installation

Source: https://docs.expo.dev/versions/unversioned/sdk/ui/jetpack-compose/chip

Install the @expo/ui package to access the Chip component for use in your Expo project. This component requires the expo package to be installed in your React Native application.

```APIDOC
## Installation

### Package Installation

Install the @expo/ui package:

```bash
npx expo install @expo/ui
```

### Requirements

- Requires `expo` package to be installed in your project
- Android platform support only
- Part of the @expo/ui/jetpack-compose module
```

--------------------------------

### Configure EAS Build Environment in eas.json

Source: https://docs.expo.dev/eas-update/environment-variables

This snippet demonstrates how to define build profiles in your `eas.json` file and assign a specific `environment` (e.g., `development`, `preview`, `production`) to each. This setup dictates the environment in which your EAS Build jobs will run, influencing how dependencies and configurations are handled.

```json
{
  "build": {
    "development": {
      "environment": "development"
    },
    "preview": {
      "environment": "preview"
    },
    "production": {
      "environment": "production"
    },
    "my-profile": {
      "environment": "production"
  }
}

```

--------------------------------

### Install Expo Localization Package

Source: https://docs.expo.dev/guides/localization

This command installs the `expo-localization` library, which is essential for accessing user language settings and localization data within an Expo project.

```bash
npx expo install expo-localization
```

--------------------------------

### Install expo-store-review package

Source: https://docs.expo.dev/versions/latest/sdk/storereview

Install the expo-store-review library using npm/expo CLI. Requires expo to be installed in your React Native project.

```bash
npx expo install expo-store-review
```

--------------------------------

### Install Expo SDK canary pre-release with npm in Terminal

Source: https://docs.expo.dev/versions/unversioned

This command installs the latest canary (pre-release) version of the `expo` package and its associated dependencies. Canary releases are snapshots of the development branch and are not considered stable, suitable for early testing but not production.

```Terminal
npm install expo@canary && npx expo install --fix
```

--------------------------------

### Install Jest and jest-expo dev dependencies

Source: https://docs.expo.dev/develop/unit-testing

Installs Jest, `jest-expo` (a Jest preset for Expo SDK mocking), and optionally `@types/jest` for TypeScript, as development dependencies. These packages are essential for setting up unit and snapshot testing in your Expo project.

```shell
npx expo install jest-expo jest @types/jest --dev
```

```shell
npx expo install jest-expo jest @types/jest "--" --dev
```

--------------------------------

### Update MainApplication Imports for React Native Entry Points

Source: https://docs.expo.dev/bare/upgrade_fromSdk=53&toSdk=54

Adds new imports for React Native release level handling and modernizes the entry point initialization. Includes imports for ReleaseLevel, DefaultNewArchitectureEntryPoint, and loadReactNative function to support improved new architecture initialization.

```kotlin
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.common.ReleaseLevel
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint
```

--------------------------------

### LinearGradient Component Usage

Source: https://docs.expo.dev/versions/v52.0.0/sdk/linear-gradient

Basic usage example demonstrating how to create linear gradients for backgrounds and buttons. Shows how to apply multiple colors with optional styling and positioning.

```APIDOC
## LinearGradient Component Usage

### Description
Renders a native view that transitions between multiple colors in a linear direction. Can be used for backgrounds, buttons, or any UI element requiring gradient effects.

### Import
```
import { LinearGradient } from 'expo-linear-gradient';
```

### Basic Example
```javascript
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={styles.background}
      />
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.button}>
        <Text style={styles.text}>Sign in with Facebook</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  button: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#fff',
  },
});
```
```

--------------------------------

### Installation - expo-store-review

Source: https://docs.expo.dev/versions/v53.0.0/sdk/storereview

Install the expo-store-review library in your Expo project using npm. This library provides access to native review APIs on Android and iOS platforms.

```APIDOC
## Installation

### Description
Install the Expo StoreReview library in your project to access native store review APIs.

### Installation Command
```
npx expo install expo-store-review
```

### Requirements
- Expo SDK 53+
- Android 5.0 or higher
- iOS with SKStoreReviewController support
- For existing React Native apps, ensure `expo` package is installed
```

--------------------------------

### Export with Advanced Bundling Options

Source: https://docs.expo.dev/more/expo-cli

Export JavaScript and assets with advanced configuration for bundle optimization and analysis. Options include skipping minification, Hermes bytecode generation for size analysis, and static HTML generation for web routes.

```bash
npx expo export --no-minify --no-bytecode --no-ssg
```

--------------------------------

### Install expo-symbols package

Source: https://docs.expo.dev/versions/latest/sdk/symbols

Install the expo-symbols library into your React Native or Expo project using npx. Requires expo to be installed in the project.

```bash
npx expo install expo-symbols
```

--------------------------------

### Install expo-blob Package

Source: https://docs.expo.dev/versions/latest/sdk/blob

Install the expo-blob library using the Expo CLI. Requires expo to be installed in the project. This command handles platform-specific dependencies automatically.

```bash
npx expo install expo-blob
```

--------------------------------

### Install Expo Maps Package

Source: https://docs.expo.dev/versions/latest/sdk/maps

Installs the `expo-maps` package into your project using `npx expo install`. This command ensures compatibility with your Expo project and correctly adds the dependency.

```shell
npx expo install expo-maps
```

--------------------------------

### Install Supabase SDK and Dependencies for Expo

Source: https://docs.expo.dev/guides/using-supabase

This command installs the `@supabase/supabase-js` library and `expo-sqlite` as a required dependency for an Expo React Native project. This is the initial step to integrate Supabase into your application, enabling access to its features.

```Terminal
npx expo install @supabase/supabase-js expo-sqlite
```

--------------------------------

### Install Expo StatusBar package

Source: https://docs.expo.dev/versions/latest/sdk/status-bar

Installs the `expo-status-bar` package into an Expo or React Native project using `npx expo install`. This command ensures proper dependency resolution and compatibility within the Expo ecosystem.

```shell
npx expo install expo-status-bar
```

--------------------------------

### Install SASS Package for SCSS/SASS Support

Source: https://docs.expo.dev/versions/latest/config/metro

Terminal command to install the `sass` package as a development dependency. This enables partial SCSS/SASS support in Expo Metro. After installation, modules without extensions resolve in order: `scss`, `sass`, `css`.

```bash
yarn add -D sass
```

--------------------------------

### Example Apple App Store URL

Source: https://docs.expo.dev/versions/v53.0.0/config/app

The `appStoreUrl` property allows you to provide a direct link to your application on the Apple App Store. This is an example of a valid App Store URL, which is used for linking from your Expo project page if the app is public.

```string
https://apps.apple.com/us/app/expo-client/id982107779
```

--------------------------------

### Implement Android Native Theme Module with SharedPreferences (Kotlin)

Source: https://docs.expo.dev/modules/native-module-tutorial

This Kotlin code defines an Expo native module for Android, `ExpoSettingsModule`, providing functions to set and get the current theme. It uses Android's `SharedPreferences` for persistence and `Bundle` for event payloads, emitting an `onChangeTheme` event upon theme changes.

```kotlin
package expo.modules.settings

import android.content.Context
import android.content.SharedPreferences
import androidx.core.os.bundleOf
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoSettingsModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoSettings")

    Events("onChangeTheme")

    Function("setTheme") { theme: String ->
      getPreferences().edit().putString("theme", theme).commit()
      this@ExpoSettingsModule.sendEvent("onChangeTheme", bundleOf("theme" to theme))
    }

    Function("getTheme") {
      return@Function getPreferences().getString("theme", "system")
    }
  }

  private val context
  get() = requireNotNull(appContext.reactContext)

  private fun getPreferences(): SharedPreferences {
    return context.getSharedPreferences(context.packageName + ".settings", Context.MODE_PRIVATE)
  }
}
```

--------------------------------

### Example app.json Configuration

Source: https://docs.expo.dev/versions/v54.0.0/sdk/build-properties

Demonstrates how to configure the `expo-build-properties` plugin using `app.json` to customize Android and iOS build properties for an Expo project. This configuration is applied during the prebuild process.

```APIDOC
## CONFIGURATION app.json Example

### Description
This example illustrates how to integrate and configure the `expo-build-properties` plugin directly within your `app.json` file. It specifies `compileSdkVersion`, `targetSdkVersion`, `buildToolsVersion` for Android, and `deploymentTarget` for iOS.

### File
`app.json`

### Example Configuration
```json
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "compileSdkVersion": 35,
            "targetSdkVersion": 35,
            "buildToolsVersion": "35.0.0"
          },
          "ios": {
            "deploymentTarget": "15.1"
          }
        }
      ]
    ]
  }
}
```
```

--------------------------------

### Configure Gradle Wrapper JAR Execution in Bash Script

Source: https://docs.expo.dev/bare/upgrade_fromSdk=53&toSdk=54

Bash shell script configuration for executing Gradle wrapper on Unix-like systems. Modified to use -jar flag with gradle-wrapper.jar for proper classpath handling and JVM invocation during Android builds.

```bash
CLASSPATH="\\"\\""  

# Determine the Java command to use to start the JVM.

set -- \
 "-Dorg.gradle.appname=$APP_BASE_NAME" \
 -classpath "$CLASSPATH" \
 -jar "$APP_HOME/gradle/wrapper/gradle-wrapper.jar" \
 "$@"
```

--------------------------------

### Initialize Sentry in Expo React Native Project

Source: https://docs.expo.dev/guides/using-sentry

Use the Sentry wizard to automatically set up Sentry in your Expo project. This command installs necessary dependencies, configures your project for Sentry, sets up Metro, and adds initialization code to your app. Ensure you follow the interactive prompts.

```bash
npx @sentry/wizard@latest -i reactNative
```

--------------------------------

### Display Expo Fingerprint CLI Help

Source: https://docs.expo.dev/versions/latest/sdk/fingerprint

Display the help documentation for the @expo/fingerprint command-line interface. Shows available commands, options, and usage examples for generating and managing project fingerprints.

```bash
npx @expo/fingerprint --help
```

--------------------------------

### Implement Localization with i18n-js in React Native Expo

Source: https://docs.expo.dev/guides/localization

This example demonstrates how to set up `i18n-js` for localization in a React Native Expo app. It defines key-value translations for multiple languages, sets the app's locale using `expo-localization`, enables fallback language support, and displays translated text along with current locale information in the UI. This setup requires `react-native`, `expo-localization`, and `i18n-js`.

```javascript
import { View, StyleSheet, Text } from 'react-native';
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

// Set the key-value pairs for the different languages you want to support.
const translations = {
  en: { welcome: 'Hello', name: 'Charlie' },
  ja: { welcome: 'こんにちは' },
};
const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = getLocales()[0].languageCode ?? 'en';

// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;
// To see the fallback mechanism uncomment the line below to force the app to use the Japanese language.
// i18n.locale = 'ja';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {i18n.t('welcome')} {i18n.t('name')}
      </Text>
      <Text>Current locale: {i18n.locale}</Text>
      <Text>Device locale: {getLocales()[0].languageCode}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    fontSize: 20,
    marginBottom: 16,
  },
});
```

--------------------------------

### Start iOS Simulator in EAS Build

Source: https://docs.expo.dev/custom-builds/schema

This YAML configuration demonstrates how to start an iOS Simulator during an EAS build for testing iOS applications. The `eas/start_ios_simulator` step is only available for iOS builds and allows for an optional `device_identifier` to specify a particular simulator. However, it's generally recommended to omit this input due to potential availability changes across different Xcode runner images.

```yaml
build:
  name: Build and test
  steps:
    - eas/build
    - eas/start_ios_simulator
    # ... Maestro setup and tests
```

--------------------------------

### GLView.startARSessionAsync()

Source: https://docs.expo.dev/versions/latest/sdk/gl-view

Component method that starts an AR session. Returns a promise that resolves to AR session data.

```APIDOC
## GLView.startARSessionAsync()

### Description
Starts an augmented reality session.

### Method
Component Method

### Platforms
- Android
- iOS
- Web

### Parameters
None

### Returns
- **Type**: `Promise<any>`
- **Description**: A promise that resolves to AR session data.
```

--------------------------------

### open()

Source: https://docs.expo.dev/versions/unversioned/sdk/filesystem

Opens the file and returns a FileHandle object that can be used to read and write data to the file.

```APIDOC
## open()

### Description
Opens the file and returns a FileHandle object that can be used to read and write data to the file.

### Method
Instance Method

### Platforms
- Android
- iOS
- tvOS

### Returns
- **Type**: `FileHandle`
- Returns a `FileHandle` object that can be used to read and write data to the file
```

--------------------------------

### Expo Router Installation and Configuration

Source: https://docs.expo.dev/versions/v54.0.0/sdk/router

Instructions for installing Expo Router in your project and configuring it through the app config file using the expo-router plugin.

```APIDOC
## Installation

### Description
Install and configure Expo Router in your React Native and web project.

### Steps
1. Follow the installation guide from Expo Router's official documentation
2. Configure the config plugin in your app.json file

### Configuration Example

```json
{
  "expo": {
    "plugins": ["expo-router"]
  }
}
```

### Notes
- If using the default Expo template, expo-router's config plugin is already configured
- Expo Router is built on top of React Navigation
- Current bundled version: ~6.0.21
```

--------------------------------

### Initialize and Play Sound in Expo Audio

Source: https://docs.expo.dev/versions/latest/sdk/audio-av

Creates a new Sound instance, loads an audio file from assets, plays it, and properly unloads it from memory. This example demonstrates the basic lifecycle of sound playback with error handling. The Sound class implements the Playback interface and supports both Asset and URL sources.

```javascript
const sound = new Audio.Sound();
try {
  await sound.loadAsync(require('./assets/sounds/hello.mp3'));
  await sound.playAsync();
  // Your sound is playing!

  // Don't forget to unload the sound from memory
  // when you are done using the Sound object
  await sound.unloadAsync();
} catch (error) {
  // An error occurred!
}
```

--------------------------------

### Start Local SSL Proxy for HTTPS (Terminal)

Source: https://docs.expo.dev/guides/local-https-development

This command starts `local-ssl-proxy`, which creates a proxy server. It forwards HTTPS traffic from port 443 to the Expo development server running on port 8081, using the `localhost.pem` certificate and `localhost-key.pem` private key generated previously to establish a secure connection.

```bash
npx local-ssl-proxy --source 443 --target 8081 --cert localhost.pem --key localhost-key.pem
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/unversioned/sdk/mesh-gradient

Install the expo-mesh-gradient package in your React Native or Expo project using the expo CLI.

```APIDOC
## Installation

### Command
Install expo-mesh-gradient using the expo CLI:

```bash
npx expo install expo-mesh-gradient
```

### Prerequisites
- For existing React Native apps, ensure `expo` is installed in your project
- Supports iOS and tvOS platforms
```

--------------------------------

### Basic Usage Example

Source: https://docs.expo.dev/versions/v53.0.0/sdk/video-thumbnails

Complete React Native example demonstrating how to use VideoThumbnails.getThumbnailAsync() to generate a thumbnail from a remote video and display it in the UI with error handling.

```APIDOC
## Usage Example

### Overview
Basic implementation of Expo VideoThumbnails in a React Native application.

### Implementation
```javascript
import { useState } from 'react';
import { StyleSheet, Button, View, Image, Text } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails';

export default function App() {
  const [image, setImage] = useState(null);

  const generateThumbnail = async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        {
          time: 15000,
        }
      );
      setImage(uri);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={generateThumbnail} title="Generate thumbnail" />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text>{image}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    width: 200,
    height: 200,
  },
});
```

### Key Features
- Button to trigger thumbnail generation
- Remote video URI support
- Time position specification (15000ms = 15 seconds)
- Error handling with try-catch
- Display generated thumbnail with Image component
```

--------------------------------

### Create a bare-minimum Expo app with `create-expo-app` in Terminal

Source: https://docs.expo.dev/versions/unversioned

Use this command to initialize a new React Native project with Expo SDK support. It creates a project directory using the bare-minimum template, providing a clean slate for development.

```Terminal
npx create-expo-app my-app --template bare-minimum
```

--------------------------------

### Complete Example: Rotate and Flip Image

Source: https://docs.expo.dev/versions/v52.0.0/sdk/imagemanipulator

A complete working example demonstrating how to rotate an image 90 degrees clockwise and flip it vertically, then save the result as a PNG file.

```APIDOC
## Complete Image Manipulation Example

### Description
This example demonstrates a complete workflow: loading an image, applying transformations (rotate and flip), rendering the result, and saving it as PNG.

### Code Example
```javascript
import { useState } from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';
import { Asset } from 'expo-asset';
import { FlipType, SaveFormat, useImageManipulator } from 'expo-image-manipulator';

const IMAGE = Asset.fromModule(require('./assets/snack-icon.png'));

export default function App() {
  const [image, setImage] = useState(IMAGE);
  const context = useImageManipulator(IMAGE.uri);

  const rotate90andFlip = async () => {
    context.rotate(90).flip(FlipType.Vertical);
    const image = await context.renderAsync();
    const result = await image.saveAsync({
      format: SaveFormat.PNG,
    });
    setImage(result);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image.localUri || image.uri }} style={styles.image} />
      </View>
      <Button title="Rotate and Flip" onPress={rotate90andFlip} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
```

### Workflow Steps
1. Initialize the image context using useImageManipulator with an image URI
2. Chain transformation methods: rotate(90).flip(FlipType.Vertical)
3. Call renderAsync() to await transformation completion
4. Call saveAsync() on the result to save with desired format
5. Update component state with the saved image reference
```

--------------------------------

### Remove Start Packager Script from Xcode Build Phase

Source: https://docs.expo.dev/versions/v54.0.0/config/metro

Configuration for the Start Packager build phase in ios/<Project>.xcodeproj/project.pbxproj that should be removed. This shell script phase attempts to launch the Metro packager automatically, but with Expo projects, the dev server must be started separately using `npx expo`. The script contains logic to check if the packager is running and attempts to launch it if needed.

```pbxproj
FD10A7F022414F080027D42C /* Start Packager */ = {
  isa = PBXShellScriptBuildPhase;
  alwaysOutOfDate = 1;
  buildActionMask = 2147483647;
  files = (
  );
  inputFileListPaths = (
  );
  inputPaths = (
  );
  name = "Start Packager";
  outputFileListPaths = (
  );
  outputPaths = (
  );
  runOnlyForDeploymentPostprocessing = 0;
  shellPath = /bin/sh;
  shellScript = "if [[ -f \"$PODS_ROOT/../.xcode.env\" ]]; then\n source \"$PODS_ROOT/../.xcode.env\"\nfi\nif [[ -f \"$PODS_ROOT/../.xcode.env.updates\" ]]; then\n source \"$PODS_ROOT/../.xcode.env.updates\"\nfi\nif [[ -f \"$PODS_ROOT/../.xcode.env.local\" ]]; then\n source \"$PODS_ROOT/../.xcode.env.local\"\nfi\n\nexport RCT_METRO_PORT=\"${RCT_METRO_PORT:=8081}\"\necho \"export RCT_METRO_PORT=${RCT_METRO_PORT}\" > `$NODE_BINARY --print \"require('path').dirname(require.resolve('react-native/package.json')) + '/scripts/.packager.env'\"\n if [ -z \"${RCT_NO_LAUNCH_PACKAGER+xxx}\" ] ; then\n if nc -w 5 -z localhost ${RCT_METRO_PORT} ; then\n if ! curl -s \"http://localhost:${RCT_METRO_PORT}/status\" | grep -q \"packager-status:running\" ; then\n echo \"Port ${RCT_METRO_PORT} already in use, packager is either not running or not running correctly\"\n exit 2\n fi\n else\n open `$NODE_BINARY --print \"require('path').dirname(require.resolve('expo/package.json')) + '/scripts/launchPackager.command'\"\` || echo \"Can't start packager automatically\"\n fi\nfi\n";
  showEnvVarsInLog = 0;
};
```

--------------------------------

### Install gh-pages Development Dependency

Source: https://docs.expo.dev/guides/publishing-websites

Installs the `gh-pages` package as a development dependency in your project. This package is crucial for automating the deployment of your web application to GitHub Pages.

```npm
npm install --save-dev gh-pages
```

```Yarn
yarn add -D gh-pages
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/v54.0.0/sdk/barometer

Install the expo-sensors package which includes the Barometer module. This is required before using barometer functionality in your Expo project.

```APIDOC
## Installation

### Description
Install the expo-sensors package to access the Barometer sensor.

### Command
```
npx expo install expo-sensors
```

### Prerequisites
- Expo CLI installed
- If installing in an existing React Native app, ensure `expo` is installed in your project

### Bundled Version
- expo-sensors: ~15.0.8
```

--------------------------------

### Complete Haptics usage example in React Native

Source: https://docs.expo.dev/versions/v52.0.0/sdk/haptics

A comprehensive example demonstrating all three haptic feedback types with buttons in a React Native app. Shows how to trigger selection, notification (Success/Error/Warning), and impact (Light/Medium/Heavy/Rigid/Soft) feedback with proper UI layout and styling.

```typescript
import { StyleSheet, View, Text, Button } from 'react-native';
import * as Haptics from 'expo-haptics';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Haptics.selectionAsync</Text>
      <View style={styles.buttonContainer}>
        <Button title="Selection" onPress={() => Haptics.selectionAsync()} />
      </View>
      <Text style={styles.text}>Haptics.notificationAsync</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Success"
          onPress={
            () =>
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              )
          }
        />
        <Button
          title="Error"
          onPress={
            () =>
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
              )
          }
        />
        <Button
          title="Warning"
          onPress={
            () =>
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
              )
          }
        />
      </View>
      <Text style={styles.text}>Haptics.impactAsync</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Light"
          onPress={
            () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          }
        />
        <Button
          title="Medium"
          onPress={
            () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          }
        />
        <Button
          title="Heavy"
          onPress={
            () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
          }
        />
        <Button
          title="Rigid"
          onPress={
            () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
          }
        />
        <Button
          title="Soft"
          onPress={
            () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 10,
    marginBottom: 30,
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});
```

--------------------------------

### Install and Configure Tailwind CSS v3 in Expo

Source: https://docs.expo.dev/guides/tailwind

This set of steps outlines how to install Tailwind CSS v3 and its dependencies, initialize configuration files, specify content paths for Tailwind to scan, and import the global stylesheet into your application's entry point.

```bash
# Install Tailwind and its peer dependencies
npx expo install tailwindcss@3 postcss autoprefixer --dev
  
# Create a Tailwind config file
npx tailwindcss init -p
```

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Ensure this points to your source code
    './app/**/*.{js,tsx,ts,jsx}',
    // If you use a `src` directory, add: './src/**/*.{js,tsx,ts,jsx}'
    // Do the same with `components`, `hooks`, `styles`, or any other top-level directories
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

```css
/* This file adds the requisite utility classes for Tailwind to work. */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```typescript
import '../global.css';
```

```javascript
// Import the global.css file in the index.js file:
import './global.css';
```

```bash
npx expo start
```

--------------------------------

### Install TypeScript development dependencies

Source: https://docs.expo.dev/guides/typescript

Install required devDependencies including TypeScript and React types for the project. Supports both macOS/Linux and Windows environments.

```bash
npx expo install typescript @types/react --dev
```

```bash
npx expo install typescript @types/react "--" --dev
```

--------------------------------

### Start Android Emulator in EAS Build

Source: https://docs.expo.dev/custom-builds/schema

This YAML configuration shows how to start an Android Emulator during an EAS build for testing Android applications. The `eas/start_android_emulator` step requires the project to be configured with the old Build Infrastructure and allows specifying the `system_image_package` for the emulator, such as `system-images;android-30;default;x86_64`. This functionality is exclusively available when running an Android build.

```yaml
build:
  name: Build and test
  steps:
    - eas/build
    - eas/start_android_emulator:
        inputs:
          system_image_package: system-images;android-30;default;x86_64
    # ... Maestro setup and tests
```

--------------------------------

### Convert app.json to app.config.js for Dynamic Configuration

Source: https://docs.expo.dev/build-reference/variants

This snippet demonstrates how to convert a static `app.json` file into a dynamic `app.config.js` file. By exporting the configuration as a JavaScript object, it enables the use of environment variables and conditional logic to customize app properties. This conversion is a prerequisite for managing multiple app variants.

```javascript
export default {
  name: 'MyApp',
  slug: 'my-app',
  ios: {
    bundleIdentifier: 'com.myapp',
  },
  android: {
    package: 'com.myapp',
  },
};
```

--------------------------------

### Usage Example - React Native Component

Source: https://docs.expo.dev/versions/latest/sdk/video-thumbnails

Complete working example demonstrating how to use the VideoThumbnails API in a React Native component. Shows how to generate thumbnails from remote videos and display them using Image components.

```APIDOC
## Usage Example

### Complete Implementation

```javascript
import { useState } from 'react';
import { StyleSheet, Button, View, Image, Text } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails';

export default function App() {
  const [image, setImage] = useState(null);

  const generateThumbnail = async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        {
          time: 15000,
        }
      );
      setImage(uri);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={generateThumbnail} title="Generate thumbnail" />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text>{image}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    width: 200,
    height: 200,
  },
});
```

### Key Features Demonstrated
- State management for thumbnail image URI
- Async thumbnail generation from remote video
- Error handling with try-catch
- Conditional rendering of generated thumbnail
- Styling with React Native StyleSheet
```

--------------------------------

### Import FileSystem API components in JavaScript

Source: https://docs.expo.dev/versions/latest/sdk/filesystem

Demonstrates how to import key components like `File`, `Directory`, and `Paths` from the `expo-file-system` library. These imported objects provide the interfaces for interacting with files and directories within your application. The `File` and `Directory` instances hold references to paths, which do not necessarily need to exist on disk at the time of instantiation.

```javascript
import { File, Directory, Paths } from 'expo-file-system';
```

--------------------------------

### Example app.config.js Configuration

Source: https://docs.expo.dev/versions/v54.0.0/sdk/build-properties

Demonstrates how to configure the `expo-build-properties` plugin using `app.config.js` to programmatically set Android and iOS build properties for an Expo project. This provides more flexibility than static `app.json`.

```APIDOC
## CONFIGURATION app.config.js Example

### Description
This example shows how to configure the `expo-build-properties` plugin using an `app.config.js` file. This approach allows for dynamic configuration based on environment variables or other logic, setting `compileSdkVersion`, `targetSdkVersion`, `buildToolsVersion` for Android, and `deploymentTarget` for iOS.

### File
`app.config.js`

### Example Configuration
```javascript
export default {
  expo: {
    plugins: [
      [
        'expo-build-properties',
        {
          android: {
            compileSdkVersion: 35,
            targetSdkVersion: 35,
            buildToolsVersion: '35.0.0',
          },
          ios: {
            deploymentTarget: '15.1',
          },
        },
      ],
    ],
  },
};
```
```

--------------------------------

### Create TypeScript Wrapper Functions for Expo Settings Module

Source: https://docs.expo.dev/modules/native-module-tutorial

This TypeScript snippet exports convenience functions, `getTheme` and `setTheme`, which directly call the corresponding methods on the imported native `ExpoSettingsModule`. This provides a clean and modular API for the application to interact with the theme settings. It encapsulates the native module import for easier consumption.

```typescript
import ExpoSettingsModule from './ExpoSettingsModule';

export function getTheme(): string {
  return ExpoSettingsModule.getTheme();
}

export function setTheme(theme: string): void {
  return ExpoSettingsModule.setTheme(theme);
}
```

--------------------------------

### Manifest Request Headers Example

Source: https://docs.expo.dev/archive/technical-specs/expo-updates-0

Example HTTP headers for a conformant Expo Updates client library making a manifest request to a server. Demonstrates required headers including platform specification, runtime version, content-type preferences, and optional code signing verification headers.

```http
accept: application/expo+json;q=0.9, application/json;q=0.8, multipart/mixed
expo-platform: *
expo-runtime-version: *
expo-expect-signature: sig, keyid="root", alg="rsa-v1_5-sha256"
```

--------------------------------

### Install expo-splash-screen package

Source: https://docs.expo.dev/versions/latest/sdk/app-loading

Install the expo-splash-screen library in your Expo project using the Expo CLI. This is a prerequisite for all splash screen functionality.

```bash
npx expo install expo-splash-screen
```

--------------------------------

### HTTP Headers for Asset Requests

Source: https://docs.expo.dev/technical-specs/expo-updates-1

Example HTTP request headers that a conformant client library MUST send when requesting assets. The accept header specifies the desired asset content type, and accept-encoding indicates supported compression formats (Brotli and Gzip).

```http
accept: image/jpeg, */*
accept-encoding: br, gzip
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/latest/sdk/app-integrity

Install the @expo/app-integrity package in your Expo or React Native project using the Expo CLI.

```APIDOC
## Installation

### Description
Install the @expo/app-integrity package required for app integrity verification on Android and iOS.

### Command
```bash
npx expo install @expo/app-integrity
```

### Prerequisites
- Expo CLI installed
- For existing React Native apps, ensure `expo` is installed in your project

### Notes
- This package provides access to Google Play Integrity APIs on Android
- This package provides access to Apple App Attest service on iOS
```

--------------------------------

### GET Asset Request

Source: https://docs.expo.dev/technical-specs/expo-updates-1

Client libraries must make GET requests to asset URLs specified in the manifest. The request should include appropriate accept headers for the asset content type and specify supported compression encodings.

```APIDOC
## GET [ASSET_URL]

### Description
Request an asset from the Expo Updates CDN. Client libraries MUST verify the base64url-encoded SHA-256 hash of the asset matches the hash field from the manifest.

### Method
GET

### Endpoint
[Asset URL as specified in manifest]

### Headers
- **accept** (string) - Required - Asset MIME type(s) as specified in manifest. Example: `image/jpeg, */*`
- **accept-encoding** (string) - Required - Compression encodings supported by client. Example: `br, gzip`
- **Custom Headers** (string) - Optional - Any additional header pairs from manifest's `assetRequestHeaders` field

### Request Example
```
GET https://cdn.example.com/assets/image.jpeg HTTP/1.1
Accept: image/jpeg, */*
Accept-Encoding: br, gzip
```

### Response
#### Success Response (200)
- **body** (binary) - The asset file content, potentially compressed
- **content-type** (string) - MIME type of the asset
- **content-encoding** (string) - Compression format used (br, gzip, or none)
- **cache-control** (string) - Recommended: `public, max-age=31536000, immutable`

#### Response Example
```
HTTP/1.1 200 OK
Content-Type: application/javascript
Content-Encoding: br
Cache-Control: public, max-age=31536000, immutable
Content-Length: 12345

[compressed binary asset data]
```

### Important Notes
- Assets at a given URL MUST NOT change or be removed
- Client MUST verify SHA-256 hash matches manifest hash field
- Assets SHOULD support both Gzip and Brotli compression
- Server MAY serve uncompressed assets
```

--------------------------------

### Install ESLint Plugin for React Compiler

Source: https://docs.expo.dev/guides/react-compiler

Install the `eslint-plugin-react-compiler` as a development dependency in your project. This plugin helps to enforce the rules of React, ensuring your codebase remains compatible and optimized for the React Compiler.

```bash
npx expo install eslint-plugin-react-compiler -- -D
```

--------------------------------

### Install Stripe React Native with Expo

Source: https://docs.expo.dev/versions/latest/sdk/stripe

Automatically installs the correct version of @stripe/stripe-react-native compatible with your Expo SDK version. Run this command in your project directory to add Stripe payment functionality.

```bash
npx expo install @stripe/stripe-react-native
```

--------------------------------

### Configure FileSystem with Config Plugin in app.json

Source: https://docs.expo.dev/versions/unversioned/sdk/filesystem

Configure expo-file-system using the built-in config plugin for Continuous Native Generation (CNG). This example enables document opening in place and file sharing for iOS. Properties require rebuilding the app binary to take effect.

```json
{
  "expo": {
    "plugins": [
      [
        "expo-file-system",
        {
          "supportsOpeningDocumentsInPlace": true,
          "enableFileSharing": true
        }
      ]
    ]
  }
}
```

--------------------------------

### Install Drawer Navigator Dependencies (Expo, SDK 53 and earlier)

Source: https://docs.expo.dev/router/advanced/drawer

Installs the necessary `react-navigation/drawer`, `react-native-reanimated`, and `react-native-gesture-handler` packages for the drawer navigator in Expo projects. This configuration is for SDK 53 and earlier, providing animation capabilities on Android and iOS.

```bash
npx expo install @react-navigation/drawer react-native-reanimated react-native-gesture-handler
```

--------------------------------

### Configure Background Fetch with Short Interval for Android Testing

Source: https://docs.expo.dev/versions/latest/sdk/background-fetch

Configuration function for Android platform to set a minimal interval (1 minute) for background fetch task execution during development and testing. Allows rapid triggering of background fetch by backgrounding the application.

```javascript
async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 1 * 60, // task will fire 1 minute after app is backgrounded
  });
}
```

--------------------------------

### Install React Compiler Babel Plugin and Runtime for Expo SDK 53 and Earlier

Source: https://docs.expo.dev/guides/react-compiler

For Expo projects using SDK 53, SDK 52, or earlier, install both the `babel-plugin-react-compiler` and `react-compiler-runtime`. This ensures all required dependencies are present to enable the React Compiler functionality in older SDK environments.

```bash
npx expo install babel-plugin-react-compiler@beta react-compiler-runtime@beta
```

--------------------------------

### Install Web Development Dependencies for Expo Router

Source: https://docs.expo.dev/router/installation

If developing for web, install `react-native-web` and `react-dom` using this command. These packages are essential for running your Expo Router application in a web environment.

```Terminal
npx expo install react-native-web react-dom
```

--------------------------------

### Installation - expo-live-photo

Source: https://docs.expo.dev/versions/v52.0.0/sdk/live-photo

Install the expo-live-photo library in your Expo project. This package provides Live Photo display capabilities for iOS applications built with React Native.

```APIDOC
## Installation

### Description
Install the expo-live-photo library to enable Live Photo support in your Expo project.

### Command
```bash
npx expo install expo-live-photo
```

### Requirements
- Expo project setup
- React Native environment configured
- iOS platform support

### Notes
- If installing in an existing React Native app, ensure `expo` is also installed in your project
- This library is iOS-only and provides no functionality on other platforms
```

--------------------------------

### Remove Start Packager Script in Xcode Project

Source: https://docs.expo.dev/versions/latest/config/metro

This code block represents the 'Start Packager' build phase within an Xcode project's `project.pbxproj` file. It's intended to automatically launch the Metro packager. For Expo projects, this script should be removed, as the developer is expected to start the Expo dev server manually using `npx expo` before or after running the app.

```shell
if [[ -f \"$PODS_ROOT/../.xcode.env\" ]]; then\n source \"$PODS_ROOT/../.xcode.env\"\nfi\nif [[ -f \"$PODS_ROOT/../.xcode.env.updates\" ]]; then\n source \"$PODS_ROOT/../.xcode.env.updates\"\nfi\nif [[ -f \"$PODS_ROOT/../.xcode.env.local\" ]]; then\n source \"$PODS_ROOT/../.xcode.env.local\"\nfi\n\nexport RCT_METRO_PORT=\"${RCT_METRO_PORT:=8081}\"\necho \"export RCT_METRO_PORT=${RCT_METRO_PORT}\" > `$NODE_BINARY --print \"require('path').dirname(require.resolve('react-native/package.json')) + '/scripts/.packager.env'\"`\nif [ -z \"${RCT_NO_LAUNCH_PACKAGER+xxx}\" ] ; then\n if nc -w 5 -z localhost ${RCT_METRO_PORT} ; then\n if ! curl -s \"http://localhost:${RCT_METRO_PORT}/status\" | grep -q \"packager-status:running\" ; then\n echo \"Port ${RCT_METRO_PORT} already in use, packager is either not running or not running correctly\"\n exit 2\n fi\n else\n open `$NODE_BINARY --print \"require('path').dirname(require.resolve('expo/package.json')) + '/scripts/launchPackager.command'\"` || echo \"Can't start packager automatically\"\n fi\nfi\n
```

--------------------------------

### Install Latest EAS Build on iOS Simulator

Source: https://docs.expo.dev/build-reference/simulators

To quickly install the most recent completed build onto an iOS simulator, use the `eas build:run` command with the `--latest` flag. This bypasses the build selection prompt and directly installs the newest compatible build.

```terminal
eas build:run -p ios --latest
```

--------------------------------

### Install react-native-view-shot with Expo CLI

Source: https://docs.expo.dev/versions/unversioned/sdk/captureRef

Install the react-native-view-shot library using Expo's package manager. This command adds the library to your React Native project dependencies and configures it for use.

```bash
npx expo install react-native-view-shot
```

--------------------------------

### Basic Expo WebView Usage in React Native App

Source: https://docs.expo.dev/modules/native-view-tutorial

This React Native example demonstrates a simple usage of the custom `WebView` component. It loads a static URL and displays an alert with the loaded URL string when the `onLoad` event is triggered, showcasing basic event handling and property usage.

```typescript
import { WebView } from 'expo-web-view';

export default function App() {
  return (
    <WebView
      style={{ flex: 1 }}
      url="https://expo.dev"
      onLoad={event => alert(`loaded ${event.nativeEvent.url}`)}
    />
  );
}
```

--------------------------------

### Reference Local Expo Plugin in app.json

Source: https://docs.expo.dev/modules/config-plugin-and-native-module-tutorial

Configure an Expo project to use a locally defined plugin by adding its path to the 'plugins' array within the 'expo' section of `app.json`. This enables Expo to discover and apply the plugin during the build process.

```json
{
  "expo": {
    ... 
    "plugins": ["../app.plugin.js"]
  }
}
```

--------------------------------

### Generate Apple App Site Association file using npx setup-safari

Source: https://docs.expo.dev/router/advanced/apple-handoff

This command uses `npx setup-safari` to automatically generate the `apple-app-site-association` file based on your app's configuration. It simplifies the initial setup process for universal links and Handoff.

```terminal
npx setup-safari
```

--------------------------------

### Install expo-build-properties plugin

Source: https://docs.expo.dev/versions/latest/sdk/build-properties

Installs the `expo-build-properties` config plugin into your Expo project using `npx expo install`. This plugin is required to customize native build properties for Android and iOS during the prebuild process.

```Terminal
npx expo install expo-build-properties
```

--------------------------------

### Fetch and serve image asset in server-side API route

Source: https://docs.expo.dev/versions/latest/config/metro

This example demonstrates handling an imported image asset within a server-side API route, such as for Next.js or similar environments. On server platforms, assets are typically objects containing a `uri`. The code fetches the image data using its URI and serves it as a `Response` with the appropriate `Content-Type` header.

```javascript
import asset from './img.png';

export async function GET(req: Request) {
  const ImageData = await fetch(
    new URL(
      // Access the asset URI.
      asset.uri,
      // Append to the current request URL origin.
      req.url
    )
  ).then(res => res.arrayBuffer());

  return new Response(ImageData, {
    headers: {
      'Content-Type': 'image/png'
    }
  });
}
```

--------------------------------

### GET /file-system/legacy/readAsStringAsync

Source: https://docs.expo.dev/versions/latest/sdk/filesystem-legacy

Read the entire contents of a file as a string. Binary will be returned in raw format, you will need to append `data:image/png;base64,` to use it as Base64.

```APIDOC
## GET /file-system/legacy/readAsStringAsync

### Description
Read the entire contents of a file as a string. Binary will be returned in raw format, you will need to append `data:image/png;base64,` to use it as Base64.

### Method
GET

### Endpoint
/file-system/legacy/readAsStringAsync

### Parameters
#### Path Parameters
_None_

#### Query Parameters
_None_

#### Request Body
- **fileUri** (string) - Required - `file://` or SAF URI to the file or directory.
- **options** (ReadingOptions) - Optional - A map of read options represented by `ReadingOptions` type. Default: `{}`

### Request Example
```json
{
  "fileUri": "file://path/to/document.txt",
  "options": {
    "encoding": "utf8"
  }
}
```

### Response
#### Success Response (200)
- **content** (string) - The entire contents of the file as a string.

#### Response Example
```json
{
  "content": "This is the content of the file. It can be a long string."
}
```
```

--------------------------------

### Run Plugin in Local Development Mode

Source: https://docs.expo.dev/debugging/create-devtools-plugins

Start the plugin web UI in local development mode for testing. This npm script runs the plugin as an Expo app in the browser only.

```bash
npm run web:dev
```

--------------------------------

### Installing Expo BlurView package

Source: https://docs.expo.dev/versions/latest/sdk/blur-view

Use this terminal command to install the `expo-blur` package in your Expo or existing React Native project. Ensure you have `expo` installed if adding to a bare React Native application.

```bash
npx expo install expo-blur
```

--------------------------------

### AudioRecorder startRecordingAtTime(seconds)

Source: https://docs.expo.dev/versions/v53.0.0/sdk/audio

Starts the recording at a specified time offset.

```APIDOC
## POST /audioRecorder/startAtTime

### Description
Starts the recording at the given time.

### Method
POST

### Endpoint
/audioRecorder/startAtTime

### Parameters
#### Path Parameters
(None)

#### Query Parameters
(None)

#### Request Body
- **seconds** (number) - Required - The time in seconds to start recording at.

### Request Example
{
  "seconds": 5.0
}

### Response
#### Success Response (200)
- **return** (void) - No return value.

#### Response Example
{}
```

--------------------------------

### LinearGradient Component Installation

Source: https://docs.expo.dev/versions/v52.0.0/sdk/linear-gradient

Install the expo-linear-gradient package in your project. This package provides a universal gradient component compatible with Android, iOS, tvOS, and Web platforms.

```APIDOC
## Installation

### Description
Install the expo-linear-gradient package to enable gradient rendering in your React Native or Expo project.

### Command
```
npx expo install expo-linear-gradient
```

### Requirements
- Expo project or existing React Native app with expo installed
- Compatible with SDK 52 and later

### Package Details
- **Bundled Version**: ~14.0.2
- **Platforms**: Android, iOS, tvOS, Web
- **Repository**: GitHub
```

--------------------------------

### GET / (Schedule Background Tasks)

Source: https://docs.expo.dev/versions/latest/sdk/server

Illustrates how to use `runTask` and `deferTask` within an Expo Router GET handler to schedule asynchronous operations. `runTask` executes immediately, while `deferTask` runs after the HTTP response is sent.

```APIDOC
## GET /

### Description
This example shows how to use `runTask` and `deferTask` within an Expo Router GET handler to schedule asynchronous operations. `runTask` executes immediately, while `deferTask` runs after the HTTP response is sent.

### Method
GET

### Endpoint
`/

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
N/A (GET request, no explicit body)

### Response
#### Success Response (200)
- **success** (boolean) - Indicates if the tasks were scheduled successfully.

#### Response Example
```json
{
  "success": true
}
```
```

--------------------------------

### MCP Tools - Server Capabilities

Source: https://docs.expo.dev/eas/ai/mcp

Documentation of available server-side MCP tools that work with remote connection only, without requiring a local development server. These tools include learning resources, documentation search, and library installation.

```APIDOC
## MCP Server Tools (Remote Capabilities)

### Description
Server capabilities available through remote MCP connection without local development server setup.

### Available Tools

#### 1. learn
- **Purpose**: Learn Expo how-to for a specific topic
- **Example Prompt**: "learn how to use expo-router"
- **Availability**: Server
- **Returns**: Expo documentation and tutorials for requested topics

#### 2. search_documentation
- **Purpose**: Search Expo documentation using natural language queries
- **Example Prompt**: "search documentation for CNG"
- **Availability**: Server
- **Returns**: Relevant documentation results matching search terms

#### 3. add_library
- **Purpose**: Install Expo packages and display documentation
- **Example Prompt**: "add sqlite and basic CRUD to the app"
- **Availability**: Server
- **Method**: Uses `npx expo install` for package installation
- **Returns**: Installation confirmation and package documentation

#### 4. generate_claude_md
- **Purpose**: Generate CLAUDE.md configuration files
- **Example Prompt**: "generate a CLAUDE.md for the project"
- **Availability**: Server (Claude Code only)
- **Returns**: Generated CLAUDE.md configuration file

#### 5. generate_agents_md
- **Purpose**: Generate AGENTS.md files for project configuration
- **Example Prompt**: "generate an AGENTS.md file for the project"
- **Availability**: Server
- **Returns**: Generated AGENTS.md configuration file
```

--------------------------------

### Define and Style Home Screen (React Native)

Source: https://docs.expo.dev/tutorial/create-your-first-app

This code defines the main entry point for a React Native application, setting up a basic 'Home screen' view. It imports `Text`, `View`, and `StyleSheet` from `react-native` to structure and style the UI. Custom styles are defined using `StyleSheet.create` for the container and text elements, applying a dark background and white text.

```typescript
import { Text, View, StyleSheet } from 'react-native';

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
});
```

--------------------------------

### Install tsx for TypeScript App Config

Source: https://docs.expo.dev/config-plugins/plugins

Installs the `tsx` package as a development dependency, which is required to parse TypeScript files for dynamic app configuration in Expo projects. This enables writing app config logic in TypeScript.

```bash
npm install --save-dev tsx
```

--------------------------------

### startAnimating()

Source: https://docs.expo.dev/versions/latest/sdk/image

Asynchronously starts playback of the view's image if it is animated. Applicable for formats like GIF, WebP, or APNG.

```APIDOC
## startAnimating()

### Description
Component method that asynchronously starts playback of the view's image if it is animated.

### Platforms
- Android
- iOS

### Method
Component instance method (async)

### Return Type
`Promise<void>`

### Returns
A promise that resolves when animation playback starts.

### Example
```javascript
const imageRef = useRef(null);
await imageRef.current?.startAnimating();
```
```

--------------------------------

### Configuration Option: `steps[].run.command`

Source: https://docs.expo.dev/custom-builds/schema

Specifies the shell command(s) that will be executed when this particular build step is invoked.

```APIDOC
## Configuration Option: `steps[].run.command`

### Description
The `command` property is essential for every `run` step, defining the actual shell script or commands to be executed. It can accept single-line commands or multiline scripts for more complex operations.

### Method
N/A (Build Configuration)

### Endpoint
`steps[].run.command`

### Parameters
#### Property
- **command** (string) - Required - The shell command(s) to execute. Supports multiline input using `|`.

### Request Example
```yaml
build:
  name: Run tests
  steps:
    - eas/checkout
    - run:
        name: Run tests
        command: |
          echo "Running tests..."
          npm test
```

### Response
#### Effect
- The specified shell command(s) are executed sequentially in the build environment for this step.
```

--------------------------------

### Install EAS CLI globally

Source: https://docs.expo.dev/eas/hosting/get-started

Installs the EAS Command Line Interface globally on your system. EAS CLI is required to interact with EAS services from the terminal and manage deployments. This command also checks for available updates.

```bash
npm install --global eas-cli
```

--------------------------------

### Install Expo TrackingTransparency Package

Source: https://docs.expo.dev/versions/latest/sdk/tracking-transparency

Install the expo-tracking-transparency library using npm and expo CLI. This command adds the tracking transparency module to your Expo project dependencies.

```bash
npx expo install expo-tracking-transparency
```

--------------------------------

### CircularProgress Component Installation

Source: https://docs.expo.dev/versions/unversioned/sdk/ui/swift-ui/circularprogress

Install the @expo/ui package containing the CircularProgress component. This package provides SwiftUI components for React Native and Expo projects.

```APIDOC
## Installation

### Description
Installs the Expo UI library containing the CircularProgress component for iOS and tvOS platforms.

### Command
```bash
npx expo install @expo/ui
```

### Requirements
- Expo CLI installed
- React Native or Expo project initialized
- iOS or tvOS target platform

### Note
If installing in an existing React Native app, ensure the `expo` package is also installed in your project.
```

--------------------------------

### Manually Prepend `baseUrl` to Image `src` (TypeScript)

Source: https://docs.expo.dev/more/expo-cli

Provides an example where a developer directly specifies an image URL in an `<img>` tag. In such cases, if `baseUrl` is configured, the developer must manually prepend the `baseUrl` to the `src` attribute to ensure correct asset resolution on the server.

```typescript
export default function Blog() {
  return <img src="/my-root/assets/image.png" />;
}
```

--------------------------------

### Basic Calendar Module Usage Example

Source: https://docs.expo.dev/versions/v53.0.0/sdk/calendar

Complete React Native component demonstrating calendar permissions request, fetching calendars, and creating a new calendar. Includes UI with button to trigger calendar creation and platform-specific styling.

```javascript
import { useEffect } from 'react';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import * as Calendar from 'expo-calendar';

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Calendar Module Example</Text>
      <Button title="Create a new calendar" onPress={createCalendar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
```

--------------------------------

### Deploy Expo Web Project to Firebase Hosting

Source: https://docs.expo.dev/archive/publishing-websites-webpack

This command executes the `deploy-hosting` script defined in `package.json`, which first builds your Expo web project and then deploys it to Firebase Hosting. After execution, check the provided URL for your deployed site.

```Terminal
npm run deploy-hosting
```

--------------------------------

### Expo Router Installation

Source: https://docs.expo.dev/router/reference/hooks

Install Expo Router in your project and configure it in your app.json file. The config plugin is automatically included in the default template.

```APIDOC
## Installation

### Description
Set up Expo Router in your React Native or web project with the required configuration.

### Configuration in app.json

```json
{
  "expo": {
    "plugins": ["expo-router"]
  }
}
```

### Bundled Version
- Version: ~6.0.21

### Platforms Supported
- Android
- iOS
- tvOS
- Web
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/v54.0.0/sdk/localization

Install the expo-localization package in your Expo project using the Expo CLI. This library provides native user localization information for Android, iOS, tvOS, and Web platforms.

```APIDOC
## Installation

### Description
Install the expo-localization package to enable localization features in your Expo app.

### Method
CLI Command

### Command
```
npx expo install expo-localization
```

### Requirements
- Expo CLI installed
- Existing Expo project or React Native app with Expo installed

### Notes
- If installing in an existing React Native app, ensure `expo` is installed in the project
- Bundled version: ~17.0.8
```

--------------------------------

### Installation - expo-manifests

Source: https://docs.expo.dev/versions/unversioned/sdk/manifests

Install the expo-manifests library in your Expo project. This library provides TypeScript type definitions for Expo manifest configurations and is compatible with React Native applications.

```APIDOC
## Installation

### Description
Install the expo-manifests library to access Expo manifest type definitions.

### Prerequisites
- Node.js and npm installed
- Existing Expo or React Native project
- expo package installed in your project

### Installation Command
```bash
npx expo install expo-manifests
```

### Additional Setup
If installing in an existing React Native app, ensure the `expo` package is also installed:
```bash
npm install expo
```

### Platform Support
- Android ✓
- iOS ✓
- tvOS ✓
```

--------------------------------

### Custom Gymfile Template with Extra Properties in EAS Build

Source: https://docs.expo.dev/custom-builds/schema

Example EAS Build configuration demonstrating custom Gymfile template with additional properties. Shows how to specify a custom template inline and pass custom values through the extra object, allowing template variables like MY_VALUE to be injected.

```yaml
build:
  name: Generate Gymfile template
  steps:
    - eas/checkout
    - eas/install_node_modules
    - eas/resolve_apple_team_id_from_credentials:
        id: resolve_apple_team_id_from_credentials
    - eas/prebuild:
        inputs:
          clean: false
          apple_team_id: ${ steps.resolve_apple_team_id_from_credentials.apple_team_id }
    - eas/configure_eas_update
    - eas/configure_ios_credentials
    - eas/generate_gymfile_from_template:
        inputs:
          credentials: ${ eas.job.secrets.buildCredentials }
          extra:
            MY_VALUE: my value
          template: |
            suppress_xcode_output(true)
            clean(<%- CLEAN %>)

            scheme("<%- SCHEME %>")
            <% if (BUILD_CONFIGURATION) { %>
            configuration("<%- BUILD_CONFIGURATION %>")
            <% } %>

            export_options({
            method: "<%- EXPORT_METHOD %>",
            provisioningProfiles: {<% _.forEach(PROFILES, function(profile) { %>
                "<%- profile.BUNDLE_ID %>" => "<%- profile.UUID %>",<% }); %>
            }<% if (ICLOUD_CONTAINER_ENVIRONMENT) { %>,
            iCloudContainerEnvironment: "<%- ICLOUD_CONTAINER_ENVIRONMENT %>"
            <% } %>
            })

            export_xcargs "OTHER_CODE_SIGN_FLAGS=\"--keychain <%- KEYCHAIN_PATH %>\""

            disable_xcpretty(true)
            buildlog_path("<%- LOGS_DIRECTORY %>")

            output_directory("<%- OUTPUT_DIRECTORY %>")

            sth_else("<%- MY_VALUE %>")
```

--------------------------------

### POST /filesystem/legacy/createDownloadResumable

Source: https://docs.expo.dev/versions/unversioned/sdk/filesystem-legacy

Create a `DownloadResumable` object which can start, pause, and resume a download of contents at a remote URI to a file in the app's file system.
Note: You need to call `downloadAsync()`, on a `DownloadResumable` instance to initiate the download.

```APIDOC
## POST /filesystem/legacy/createDownloadResumable

### Description
Create a `DownloadResumable` object which can start, pause, and resume a download of contents at a remote URI to a file in the app's file system.

### Method
POST

### Endpoint
/filesystem/legacy/createDownloadResumable

### Parameters
#### Path Parameters
_None_

#### Query Parameters
_None_

#### Request Body
- **uri** (`string`) - Required - The remote URI to download from.
- **fileUri** (`string`) - Required - The local URI of the file to download to. If there is no file at this URI, a new one is created. If there is a file at this URI, its contents are replaced. The directory for the file must exist.
- **options** (`DownloadOptions`) - Optional - A map of download options represented by `DownloadOptions` type.
- **callback** (`FileSystemNetworkTaskProgressCallback<DownloadProgressData>`) - Optional - This function is called on each data write to update the download progress. Note: When the app has been moved to the background, this callback won't be fired until it's moved to the foreground.
- **resumeData** (`string`) - Optional - The string which allows the api to resume a paused download. This is set on the `DownloadResumable` object automatically when a download is paused. When initializing a new `DownloadResumable` this should be `null`.

### Request Example
```json
{
  "uri": "http://example.com/file.zip",
  "fileUri": "file:///data/user/0/com.example.app/files/downloads/file.zip",
  "options": {},
  "callback": null,
  "resumeData": null
}
```

### Response
#### Success Response (200)
- **downloadResumable** (`DownloadResumable`) - The created `DownloadResumable` object.

#### Response Example
```json
{
  "type": "DownloadResumable Object"
}
```
```

--------------------------------

### Install Expo Asset Library

Source: https://docs.expo.dev/develop/user-interface/assets

This command installs the `expo-asset` library, which is essential for managing assets at both build time and runtime in Expo projects. It provides functionalities like config plugins for embedding assets and hooks for asynchronous asset loading.

```terminal
npx expo install expo-asset
```

--------------------------------

### Add Local Module Dependency to package.json (JSON)

Source: https://docs.expo.dev/modules/config-plugin-and-native-module-tutorial

This JSON snippet illustrates how to add a local dependency to the `package.json` file. It configures `expo-native-configuration` to point to the module's root directory using `file:..`. This allows the example application to use the module during development.

```JSON
{
  ...
  "dependencies": {
    "expo-native-configuration": "file:.."
    ...
  }
}

```

--------------------------------

### Initialize React Native and Expo Modules in Android MainApplication.kt

Source: https://docs.expo.dev/brownfield/installing-expo-modules

This Kotlin code updates the `MainApplication` class to properly initialize React Native and integrate Expo modules. It configures the `ReactNativeHost` and `ReactHost` for a React Native application, handles package loading, sets the entry file, enables developer support, and integrates application lifecycle events with Expo's `ApplicationLifecycleDispatcher`. This setup supports both the old and new React Native architectures.

```kotlin
package com.example.blankandroid

import android.app.Application
import android.content.res.Configuration
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.ReactHost
import com.facebook.react.common.ReleaseLevel
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint
import com.facebook.react.defaults.DefaultReactNativeHost
import expo.modules.ApplicationLifecycleDispatcher
import expo.modules.ReactNativeHostWrapper

class MainApplication : Application(), ReactApplication {
 override fun onCreate() {
  super.onCreate()
  loadReactNative(this)
  ApplicationLifecycleDispatcher.onApplicationCreate(this)
 }
 override val reactNativeHost: ReactNativeHost = ReactNativeHostWrapper(
  this,
  object : DefaultReactNativeHost(this) {
   override fun getPackages(): List<ReactPackage> =
    PackageList(this).packages.apply {
     // Packages that cannot be autolinked yet can be added manually here, for example:
     // add(MyReactNativePackage())
    }
   override fun getJSMainModuleName(): String = ".expo/.virtual-metro-entry"
   override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG
   override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
  }
 )

 override val reactHost: ReactHost
  get() = ReactNativeHostWrapper.createReactHost(applicationContext, reactNativeHost)


 override fun onConfigurationChanged(newConfig: Configuration) {
  super.onConfigurationChanged(newConfig)
  ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig)
 }
}
```

--------------------------------

### Create Directory Instance with expo-file-system (TypeScript)

Source: https://docs.expo.dev/versions/latest/sdk/filesystem

Demonstrates how to create a new `Directory` instance using the `Paths.cache` constant and a subdirectory name. This instance represents a directory path and does not necessarily create the directory on disk immediately.

```TypeScript
const directory = new Directory(Paths.cache, "subdirName");
```

--------------------------------

### Asset Request Headers Example

Source: https://docs.expo.dev/archive/technical-specs/expo-updates-0

Example HTTP request headers for asset retrieval. Includes Accept header for content type negotiation and Accept-Encoding header specifying supported compression algorithms (Brotli and Gzip). Client libraries should include these headers along with any custom headers from assetRequestHeaders.

```http
accept: image/jpeg, */*
accept-encoding: br, gzip
```

--------------------------------

### Install Expo Contacts Package

Source: https://docs.expo.dev/versions/latest/sdk/contacts

Installs the `expo-contacts` library into an Expo project using `npx expo install`. This command ensures compatibility with your current Expo SDK version, automatically handling native module linking.

```Terminal
npx expo install expo-contacts
```

--------------------------------

### Configuration - app.json Setup

Source: https://docs.expo.dev/versions/latest/sdk/document-picker

Configure expo-document-picker using built-in config plugins for Continuous Native Generation (CNG) to enable features like iCloud storage.

```APIDOC
## Configuration in app.json

### Description
Configure expo-document-picker using config plugins for runtime-independent properties requiring native app rebuilds.

### Example Configuration
```json
{
  "expo": {
    "plugins": [
      [
        "expo-document-picker",
        {
          "iCloudContainerEnvironment": "Production"
        }
      ]
    ]
  }
}
```

### Configurable Properties

| Property | Default | Platform | Description |
|----------|---------|----------|-------------|
| `iCloudContainerEnvironment` | `undefined` | iOS | Sets the iOS `com.apple.developer.icloud-container-environment` entitlement for AdHoc builds. Values: `Development`, `Production` |
| `kvStoreIdentifier` | `undefined` | iOS | Overrides the default iOS `com.apple.developer.ubiquity-kvstore-identifier` entitlement using Apple Team ID and bundle identifier |

```

--------------------------------

### npm Login and Publish Package Commands

Source: https://docs.expo.dev/modules/use-standalone-expo-module-in-your-project

Terminal commands to authenticate with npm and publish your module to the npm registry. Requires an active npm account. After publishing, the module becomes installable via npm install in other projects.

```shell
npm login
```

```shell
npm publish
```

--------------------------------

### Advanced Expo WebView with Browser UI and Loading Indicator

Source: https://docs.expo.dev/modules/native-view-tutorial

This React Native example builds a more comprehensive web browser UI around the `WebView` component. It includes a text input for dynamic URL navigation, state management for the URL and loading state, and a visible loading indicator, offering a richer user experience for web browsing.

```typescript
import { useState } from 'react';
import { ActivityIndicator, Platform, Text, TextInput, View } from 'react-native';
import { WebView } from 'expo-web-view';

export default function App() {
  const [inputUrl, setInputUrl] = useState('https://docs.expo.dev/modules/');
  const [url, setUrl] = useState(inputUrl);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 80 : 30 }}>
      <TextInput
        value={inputUrl}
        onChangeText={setInputUrl}
        returnKeyType="go"
        autoCapitalize="none"
        onSubmitEditing={() => {
          if (inputUrl !== url) {
            setUrl(inputUrl);
            setIsLoading(true);
          }
        }}
        keyboardType="url"
        style={{
          color: '#fff',
          backgroundColor: '#000',
          borderRadius: 10,
          marginHorizontal: 10,
          paddingHorizontal: 20,
          height: 60,
        }}
      />

      <WebView
        url={url.startsWith('https://') || url.startsWith('http://') ? url : `https://${url}`}
        onLoad={() => setIsLoading(false)}
        style={{ flex: 1, marginTop: 20 }}
      />
      <LoadingView isLoading={isLoading} />
    </View>
  );
}

function LoadingView({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) {
    return null;
  }

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <ActivityIndicator animating={isLoading} color="#fff" style={{ marginRight: 10 }} />
      <Text style={{ color: '#fff' }}>Loading...</Text>
    </View>
  );
}
```

--------------------------------

### POST /playback/play

Source: https://docs.expo.dev/versions/v53.0.0/sdk/av

Starts or resumes media playback. Equivalent to setting `shouldPlay` to true. Note that playback may not start immediately due to buffering or other conditions.

```APIDOC
## POST /playback/play

### Description
Starts or resumes media playback. This is equivalent to `playbackObject.setStatusAsync({ shouldPlay: true })`. Playback may not start immediately after calling this function for reasons such as buffering. Make sure to update your UI based on the `isPlaying` and `isBuffering` properties of the `AVPlaybackStatus`.

### Method
POST

### Endpoint
`/playback/play`

### Parameters
None

### Request Example
No request body required.

### Response
#### Success Response (200)
- **progressUpdateIntervalMillis** (number) - Interval in milliseconds for status updates
- **positionMillis** (number) - Current playback position in milliseconds
- **shouldPlay** (boolean) - Set to true
- **rate** (number) - Playback rate
- **shouldCorrectPitch** (boolean) - Pitch correction enabled
- **volume** (number) - Volume level
- **isMuted** (boolean) - Audio muted status
- **isLooping** (boolean) - Looping enabled
- **isPlaying** (boolean) - Whether media is playing
- **isBuffering** (boolean) - Whether media is buffering

#### Response Example
```json
{
  "progressUpdateIntervalMillis": 500,
  "positionMillis": 0,
  "shouldPlay": true,
  "rate": 1.0,
  "shouldCorrectPitch": false,
  "volume": 1.0,
  "isMuted": false,
  "isLooping": false,
  "isPlaying": true,
  "isBuffering": false
}
```
```

--------------------------------

### Register an Expo Account

Source: https://docs.expo.dev/more/expo-cli

Create a new Expo account using the `npx expo register` command. This is the initial step for enabling secure Over-The-Air (OTA) updates and accessing other authenticated Expo CLI services.

```bash
npx expo register
```

--------------------------------

### Set and Schedule Expo Notifications with app.json Configured Custom Sound

Source: https://docs.expo.dev/versions/unversioned/sdk/notifications

This JavaScript example demonstrates how to set up a notification channel and schedule a notification using a custom sound. The sound file, like 'mySoundFile.wav', should have been previously configured in your `app.json` file. Only the base filename is required for reference.

```javascript
await Notifications.setNotificationChannelAsync('new_emails', {
  name: 'E-mail notifications',
  importance: Notifications.AndroidImportance.HIGH,
  sound: 'mySoundFile.wav', // Provide ONLY the base filename
});

await Notifications.scheduleNotificationAsync({
  content: {
    title: "You've got mail! 📬",
    sound: 'mySoundFile.wav', // Provide ONLY the base filename
  },
  trigger: {
    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
    seconds: 2,
    channelId: 'new_emails',
  },
});
```

--------------------------------

### Override Multiple Android Activity Lifecycle Methods in Expo

Source: https://docs.expo.dev/modules/android-lifecycle-listeners

This example illustrates how to override multiple Activity lifecycle methods within a single `ReactActivityLifecycleListener` class to handle various events. It includes `onCreate` for initial setup and deep linking, `onResume` for foreground tracking, `onPause` for background actions, `onDestroy` for resource cleanup, `onNewIntent` for handling new intents like deep links, and `onBackPressed` for custom back navigation. This comprehensive implementation allows fine-grained control over the Android Activity's lifecycle within an Expo module.

```kotlin
package expo.modules.mylib

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import expo.modules.core.interfaces.ReactActivityLifecycleListener

class MyLibReactActivityLifecycleListener : ReactActivityLifecycleListener {
  override fun onCreate(activity: Activity?, savedInstanceState: Bundle?) {
    // Called when the activity is first created
    // Initialize your setup here, for example handling deep links
    val deepLinkUrl = activity?.intent?.data
    if (deepLinkUrl != null) {
      handleDeepLink(deepLinkUrl.toString())
    }
  }

  override fun onResume(activity: Activity) {
    // Called when the activity comes to the foreground
    // For example, track when user returns to the app
    trackAppStateChange("active")
  }

  override fun onPause(activity: Activity) {
    // Called when the activity goes to the background
    // For example, pause ongoing operations such as track analytics
    trackAppStateChange("inactive")
  }

  override fun onDestroy(activity: Activity) {
    // Called when the activity is being destroyed
    // Clean up resources here
    cleanup()
  }

  override fun onNewIntent(intent: Intent?): Boolean {
    // Called when app receives a new intent while already running
    // For example, handle new deep links while app is open
    val newUrl = intent?.data
    if (newUrl != null) {
      handleDeepLink(newUrl.toString())
      return true
    }
    return false
  }

  override fun onBackPressed(): Boolean {
    // Called when user presses the back button
    // Return true to prevent default back behavior
    return handleCustomBackNavigation()
  }

  // Now, you can add private functions to handle
```

```java
package expo.modules.mylib;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import expo.modules.core.interfaces.ReactActivityLifecycleListener;

public class MyLibReactActivityLifecycleListener implements ReactActivityLifecycleListener {
  @Override
  public void onCreate(Activity activity, Bundle savedInstanceState) {
    // Called when the activity is first created
    // Initialize your setup here, for example handling deep links
    if (activity != null && activity.getIntent() != null && activity.getIntent().getData() != null) {
      String deepLinkUrl = activity.getIntent().getData().toString();
      handleDeepLink(deepLinkUrl);
    }
  }

  @Override
  public void onResume(Activity activity) {
    // Called when the activity comes to the foreground
    // For example, track when user returns to the app
    trackAppStateChange("active");
  }

  @Override
  public void onPause(Activity activity) {
    // Called when the activity goes to the background
    // For example, pause ongoing operations such as track analytics
    trackAppStateChange("inactive");
  }

  @Override
  public void onDestroy(Activity activity) {
    // Called when the activity is being destroyed
    // Clean up resources here
    cleanup();
  }

  @Override
  public boolean onNewIntent(Intent intent) {
    // Called when app receives a new intent while already running
    // For example, handle new deep links while app is open
    if (intent != null && intent.getData() != null) {
      String newUrl = intent.getData().toString();
      handleDeepLink(newUrl);
      return true;
    }
    return false;
  }

  @Override
  public boolean onBackPressed() {
    // Called when user presses the back button
    // Return true to prevent default back behavior
    return handleCustomBackNavigation();
  }

  // Now, you can add private functions to handle
```

--------------------------------

### Web Metadata Configuration

Source: https://docs.expo.dev/versions/v54.0.0/config/app

Configure basic metadata for your web application including favicon, name, short name, language, and description that appear in browser tabs and PWA manifest.

```APIDOC
## Web Metadata Configuration

### Description
Define metadata properties for your web application displayed in browser tabs and PWA manifest.

### Properties

#### favicon
- **Type:** string
- **Path:** `web.favicon`
- **Description:** Relative path of an image to use for your app's favicon.

#### name
- **Type:** string
- **Path:** `web.name`
- **Description:** Defines the title of the document. Defaults to the outer level name.

#### shortName
- **Type:** string
- **Path:** `web.shortName`
- **Description:** A short version of the app's name, 12 characters or fewer. Used in app launcher and new tab pages. Maps to `short_name` in the PWA manifest.json. Defaults to the `name` property.
- **Constraints:** Maximum 12 characters long

#### lang
- **Type:** string
- **Path:** `web.lang`
- **Description:** Specifies the primary language for the values in the name and short_name members. Contains a single language tag.

#### description
- **Type:** string
- **Path:** `web.description`
- **Description:** Provides a general description of what the pinned website does.

### Example Configuration
```json
{
  "web": {
    "favicon": "./assets/favicon.png",
    "name": "My Awesome App",
    "shortName": "MyApp",
    "lang": "en",
    "description": "A progressive web application built with Expo"
  }
}
```
```

--------------------------------

### Download and install development build with EAS CLI

Source: https://docs.expo.dev/develop/development-builds/share-with-your-team

Terminal command to download and install a development build using EAS CLI. The user must be signed into the Expo account associated with the development build. The profile name defaults to 'development' but can be customized with the --profile flag.

```bash
eas build:run --profile development
```

--------------------------------

### Install expo-asset Library

Source: https://docs.expo.dev/guides/assets

Install the expo-asset library using npm or yarn via Expo CLI. This library provides the config plugin for build-time asset embedding and the useAssets hook for runtime asset loading.

```bash
npx expo install expo-asset
```

--------------------------------

### Install expo-font Library for Native Font Embedding

Source: https://docs.expo.dev/develop/user-interface/fonts

This command installs the `expo-font` library, which is a required dependency for using the `expo-font` config plugin to embed custom fonts in an Expo project. It should be executed in your project's terminal.

```terminal
npx expo install expo-font
```

--------------------------------

### Configure Sub-directory Hosting in package.json

Source: https://docs.expo.dev/archive/publishing-websites-webpack

To serve your web application from a specific sub-directory, add a `homepage` property to your `package.json` file and specify the desired path.

```JSON
{
  "homepage": "/path/to/sub-directory"
}
```

--------------------------------

### Utility: `set-env`

Source: https://docs.expo.dev/custom-builds/schema

Explains how to share environment variables between build steps using the `set-env` executable, making them available in subsequent steps.

```APIDOC
## Utility: `set-env`

### Description
Use the `set-env` executable to share environment variables across build steps. Unlike variables exported with `export`, `set-env` ensures the variable's value persists for subsequent steps in the build pipeline. It requires the environment variable's name and its value as arguments.

### Method
N/A (Build Utility)

### Endpoint
`set-env [VARIABLE_NAME] [VARIABLE_VALUE]`

### Parameters
#### Arguments
- **VARIABLE_NAME** (string) - Required - The name of the environment variable to make available to other steps.
- **VARIABLE_VALUE** (string) - Required - The string value to assign to the environment variable.

### Request Example
```yaml
build:
  name: Shared environment variable example
  steps:
    - run:
        name: Set environment variables
        command: |
          set -x
          set-env ENV_TEST_SET_ENV "present-in-following-steps"
          echo "ENV_TEST_SET_ENV: $ENV_TEST_SET_ENV"
    - run:
        name: Check variables values in next step
        command: |
          set -x
          echo "ENV_TEST_SET_ENV: $ENV_TEST_SET_ENV"
```

### Response
#### Effect
- The specified environment variable is made accessible with its value to all subsequent build steps in the workflow.
```

--------------------------------

### Install Expo FaceDetector Package

Source: https://docs.expo.dev/versions/v52.0.0/sdk/facedetector

This command installs the `expo-face-detector` package into your Expo project. It's important to note that this module is not supported in the Expo Go app and requires a development build to function correctly.

```bash
npx expo install expo-face-detector
```

--------------------------------

### Expo iOS Build Phase Environment Configuration Setup

Source: https://docs.expo.dev/versions/v54.0.0/config/metro

Bash script snippet for setting up environment variables and paths in Xcode build phases. This configuration sources optional .xcode.env files, establishes the project root directory, and conditionally sets up entry file resolution, CLI path, and bundle command variables for Expo CLI integration with React Native.

```bash
if [[ -f "$PODS_ROOT/../.xcode.env" ]]; then
  source "$PODS_ROOT/../.xcode.env"
fi
if [[ -f "$PODS_ROOT/../.xcode.env.local" ]]; then
  source "$PODS_ROOT/../.xcode.env.local"
fi

# The project root by default is one level up from the ios directory
export PROJECT_ROOT="$PROJECT_DIR"/..

if [[ "$CONFIGURATION" = *Debug* ]]; then
  export SKIP_BUNDLING=1
fi
if [[ -z "$ENTRY_FILE" ]]; then
  # Set the entry JS file using the bundler's entry resolution.
  export ENTRY_FILE="$($NODE_BINARY -e \"require('expo/scripts/resolveAppEntry')\" \"$PROJECT_ROOT\" ios absolute | tail -n 1)"
fi

if [[ -z "$CLI_PATH" ]]; then
  # Use Expo CLI
  export CLI_PATH="$($NODE_BINARY --print \"require.resolve('@expo/cli')\")"
fi
if [[ -z "$BUNDLE_COMMAND" ]]; then
  # Default Expo CLI command for bundling
  export BUNDLE_COMMAND="export:embed"
fi

`"$NODE_BINARY" --print "require('path').dirname(require.resolve('react-native/package.json')) + '/scripts/react-native-xcode.sh'"`
```

--------------------------------

### React Hook to Get Event Parameter from `useEvent` (Expo)

Source: https://docs.expo.dev/versions/unversioned/sdk/expo

This example demonstrates how to use the `useEvent` React hook from Expo to listen for a 'statusChange' event on an `expo-video` player. It retrieves and displays the current player status by initializing the hook with the video player's current status and updating it whenever the event fires. The hook simplifies state management based on external event emitters.

```typescript
import { useEvent } from 'expo';
import { VideoPlayer } from 'expo-video';

export function PlayerStatus({ videoPlayer }: { videoPlayer: VideoPlayer }) {
  const { status } = useEvent(videoPlayer, 'statusChange', { status: videoPlayer.status });

  return <Text>{`Player status: ${status}`}</Text>;
}
```

--------------------------------

### Nest Stack Navigator within a Tab in Expo Router (`app/(tabs)/feed/_layout.tsx`)

Source: https://docs.expo.dev/router/basics/common-navigation-patterns

This example demonstrates how to embed a `Stack` navigator inside a specific tab, such as the 'Feed' tab, within Expo Router. It configures the stack to start at the 'index' route using `unstable_settings.initialRouteName`. This layout in `app/(tabs)/feed/_layout.tsx` enables hierarchical navigation within the tab while keeping the main tab bar visible.

```typescript
import { Stack } from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function FeedLayout() {
  return <Stack />;
}
```

--------------------------------

### Manage cached GIF files with FileSystem

Source: https://docs.expo.dev/versions/v54.0.0/sdk/filesystem-legacy

Comprehensive example demonstrating directory management, batch downloads, file existence checks, and content URI generation for sharing files. Includes functions for downloading, caching, retrieving, and deleting GIF files from a local cache directory.

```typescript
import * as FileSystem from 'expo-file-system/legacy';

const gifDir = FileSystem.cacheDirectory + 'giphy/';
const gifFileUri = (gifId: string) => gifDir + `gif_${gifId}_200.gif`;
const gifUrl = (gifId: string) => `https://media1.giphy.com/media/${gifId}/200.gif`;

async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(gifDir);
  if (!dirInfo.exists) {
    console.log("Gif directory doesn't exist, creating…");
    await FileSystem.makeDirectoryAsync(gifDir, { intermediates: true });
  }
}

export async function addMultipleGifs(gifIds: string[]) {
  try {
    await ensureDirExists();
    console.log('Downloading', gifIds.length, 'gif files…');
    await Promise.all(gifIds.map(id => FileSystem.downloadAsync(gifUrl(id), gifFileUri(id))));
  } catch (e) {
    console.error("Couldn't download gif files:", e);
  }
}

export async function getSingleGif(gifId: string) {
  await ensureDirExists();
  const fileUri = gifFileUri(gifId);
  const fileInfo = await FileSystem.getInfoAsync(fileUri);
  if (!fileInfo.exists) {
    console.log("Gif isn't cached locally. Downloading…");
    await FileSystem.downloadAsync(gifUrl(gifId), fileUri);
  }
  return fileUri;
}

export async function getGifContentUri(gifId: string) {
  return FileSystem.getContentUriAsync(await getSingleGif(gifId));
}

export async function deleteAllGifs() {
  console.log('Deleting all GIF files…');
  await FileSystem.deleteAsync(gifDir);
}
```

--------------------------------

### Web UI App Component with Message Handling

Source: https://docs.expo.dev/debugging/create-devtools-plugins

Create the web UI component for your dev tools plugin that listens for messages from the app and manages event subscriptions. This example demonstrates setting up message listeners and cleaning up subscriptions.

```typescript
import { useDevToolsPluginClient, type EventSubscription } from 'expo/devtools';
import { useEffect } from 'react';

export default function App() {
  const client = useDevToolsPluginClient('my-devtools-plugin');

  useEffect(() => {
    const subscriptions: EventSubscription[] = [];

    subscriptions.push(
      client?.addMessageListener('ping', data => {
        alert(`Received ping from ${data.from}`);
      })
    );

    return () => {
      for (const subscription of subscriptions) {
        subscription?.remove();
      }
    };
  }, [client]);
}
```

--------------------------------

### Install React Native Testing Library

Source: https://docs.expo.dev/develop/unit-testing

Installs `@testing-library/react-native` as a development dependency. This library offers a lightweight and robust solution for testing React Native components, serving as a modern replacement for the deprecated `react-test-renderer`.

```shell
npx expo install @testing-library/react-native --dev
```

```shell
npx expo install @testing-library/react-native "--" --dev
```

--------------------------------

### Install Expo SDK with Bun

Source: https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough

Install a specific version of the Expo package using Bun. Replace the version number (54.0.0) with your target SDK version. This is the first step in upgrading the Expo SDK.

```bash
bun install expo@^54.0.0
```

--------------------------------

### Configure Gradle Wrapper JAR Execution in Batch Script

Source: https://docs.expo.dev/bare/upgrade_fromSdk=53&toSdk=54

Windows batch script configuration for executing Gradle wrapper. Modified to use -jar flag pointing to gradle-wrapper.jar instead of direct classpath reference for improved build execution on Windows systems.

```batch
set CLASSPATH=

@rem Execute Gradle
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %GRADLE_OPTS% "-Dorg.gradle.appname=%APP_BASE_NAME%" -classpath "%CLASSPATH%" -jar "%APP_HOME%\gradle\wrapper\gradle-wrapper.jar" %*
```

--------------------------------

### Fetch and Display Media Library Albums and Assets in React Native

Source: https://docs.expo.dev/versions/v54.0.0/sdk/media-library

This comprehensive React Native example demonstrates how to use `expo-media-library` to request permissions, fetch all available media albums (including smart albums), and then display each album along with a preview of its contained assets. It utilizes `useState` and `useEffect` hooks for managing application state and asset loading.

```javascript
import { useState, useEffect } from 'react';
import { Button, Text, ScrollView, StyleSheet, Image, View, Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const [albums, setAlbums] = useState(null);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  async function getAlbums() {
    if (permissionResponse.status !== 'granted') {
      await requestPermission();
    }
    const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
      includeSmartAlbums: true,
    });
    setAlbums(fetchedAlbums);
  }

  return (
    <View style={styles.container}>
      <Button onPress={getAlbums} title="Get albums" />
      <ScrollView>
        {albums && albums.map((album) => <AlbumEntry album={album} />)}
      </ScrollView>
    </View>
  );
}

function AlbumEntry({ album }) {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function getAlbumAssets() {
      const albumAssets = await MediaLibrary.getAssetsAsync({ album });
      setAssets(albumAssets.assets);
    }
    getAlbumAssets();
  }, [album]);

  return (
    <View key={album.id} style={styles.albumContainer}>
      <Text>
        {album.title} - {album.assetCount ?? 'no'} assets
      </Text>
      <View style={styles.albumAssetsContainer}>
        {assets && assets.map((asset) => (
          <Image source={{ uri: asset.uri }} width={50} height={50} />
        ))}
      </View>
    </View>
  );
}
```

--------------------------------

### Define a Basic Expo Config Plugin in JavaScript

Source: https://docs.expo.dev/modules/config-plugin-and-native-module-tutorial

This snippet demonstrates the fundamental structure of an Expo config plugin. It defines a synchronous function named `withMyApiKey` that accepts an `ExpoConfig` object and returns it, serving as a placeholder for custom plugin logic.

```javascript
const withMyApiKey = config => {
  return config;
};
```

--------------------------------

### Install specific EAS build on Android emulator (Terminal)

Source: https://docs.expo.dev/build-reference/apk

This command downloads and installs a selected EAS build onto an attached Android emulator. When executed, it presents a list of available builds, allowing the user to choose which one to install based on identifiers like build ID, creation time, or version number.

```terminal
eas build:run -p android
```

--------------------------------

### Build and Run App on Android TV Emulator

Source: https://docs.expo.dev/guides/building-for-tv

Launch the app on a running Android TV emulator using the expo run:android command. Requires an Android TV emulator to be started before execution.

```bash
npx expo run:android
```

--------------------------------

### Install Expo Router Dependencies Manually

Source: https://docs.expo.dev/router/installation

This command installs the necessary packages for Expo Router, ensuring compatibility with your current Expo SDK version. It includes core dependencies like `expo-router`, `react-native-safe-area-context`, `react-native-screens`, `expo-linking`, `expo-constants`, and `expo-status-bar`.

```Terminal
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

--------------------------------

### Configure Default Expo Router Entry Point in package.json

Source: https://docs.expo.dev/router/installation

Set the `main` property in `package.json` to `expo-router/entry` to designate it as the primary entry point for your application. This configuration ensures Expo Router correctly initializes your app's routing.

```JSON
{
  "main": "expo-router/entry"
}
```

--------------------------------

### SafeAreaProvider Setup

Source: https://docs.expo.dev/versions/v53.0.0/sdk/safe-area-context

Required provider component that must be added at the root of your application. It initializes the safe area context and enables hooks and consumer API to function properly.

```APIDOC
## SafeAreaProvider

### Description
Context provider component that must be added at the app root to enable safe area functionality. May also need to be added at the root of modals or routes when using react-native-screen.

### Import
```javascript
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
```

### Basic Setup
```javascript
function App() {
  return <SafeAreaProvider>...</SafeAreaProvider>;
}
```

### Optimized Setup with initialMetrics
```javascript
function App() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      ...
    </SafeAreaProvider>
  );
}
```

### Props

#### initialMetrics
- **Type**: `EdgeInsets` object
- **Required**: Optional
- **Description**: Initial metrics to speed up rendering on first load. Use `initialWindowMetrics` for web SSR or when you need to inject device-specific values. Cannot be used if provider remounts or with react-native-navigation.
```

--------------------------------

### Export web project for deployment using npx expo

Source: https://docs.expo.dev/deploy/web

To deploy your web app, you need to create a static build of your web project. This command exports your web project into a `dist` directory. Remember to re-run this command every time before deploying when you make changes to your web app.

```shell
npx expo export --platform web
```

--------------------------------

### Install Redux DevTools Expo Plugin

Source: https://docs.expo.dev/debugging/devtools-plugins

Installs the `redux-devtools-expo-dev-plugin` package using `npx expo install`. This plugin enables Redux DevTools integration with Expo applications, offering live action and state monitoring, rewind, and replay capabilities.

```bash
npx expo install redux-devtools-expo-dev-plugin
```

--------------------------------

### Implement Basic Drawer Layout (Expo Router)

Source: https://docs.expo.dev/router/advanced/drawer

Demonstrates the foundational setup for a drawer navigator within an Expo Router application. It imports the `Drawer` component and renders it as the default layout, creating a functional, albeit unconfigured, drawer navigation system.

```typescript
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return <Drawer />;
}
```

--------------------------------

### Setup Push Notifications Handler and Register for Tokens

Source: https://docs.expo.dev/versions/unversioned/sdk/notifications

Initializes the notification handler to control notification display behavior and registers the device for push notifications. This includes platform-specific setup for Android notification channels and permission handling. The function retrieves the Expo push token needed for sending notifications from a backend service.

```javascript
import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
    }
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <Text>{`Channels: ${JSON.stringify(
        channels.map(c => c.id),
        null,
        2
      )}`}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  );
}
```

--------------------------------

### Install React Native TV Config Plugin via npm

Source: https://docs.expo.dev/guides/building-for-tv

Install the @react-native-tvos/config-tv plugin as a development dependency using npm/expo. This plugin modifies the project for TV when either the EXPO_TV environment variable is set to 1 or the isTV plugin parameter is true.

```bash
npx expo install @react-native-tvos/config-tv -- --dev
```

--------------------------------

### Implement Android Theme Settings Native Module (Kotlin)

Source: https://docs.expo.dev/modules/native-module-tutorial

This Kotlin snippet demonstrates how to create an Expo native module for Android to manage theme settings. It uses Android's `SharedPreferences` to persist theme values, allowing both retrieval (`getTheme`) and storage (`setTheme`) of a string-based theme preference. The module leverages `reactContext` to access shared preferences and defaults to 'system' if no theme is found.

```kotlin
package expo.modules.settings

import android.content.Context
import android.content.SharedPreferences
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoSettingsModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoSettings")

    Function("setTheme") { theme: String ->
      getPreferences().edit().putString("theme", theme).commit()
    }

    Function("getTheme") {
      return@Function getPreferences().getString("theme", "system")
    }
  }

  private val context
  get() = requireNotNull(appContext.reactContext)

  private fun getPreferences(): SharedPreferences {
    return context.getSharedPreferences(context.packageName + ".settings", Context.MODE_PRIVATE)
  }
}
```

--------------------------------

### GET Last Notification Response

Source: https://docs.expo.dev/versions/v52.0.0/sdk/notifications

Gets the notification response that was received most recently. A notification response designates an interaction with a notification, such as tapping on it.

```APIDOC
## GET Notifications.getLastNotificationResponseAsync()

### Description
Gets the notification response that was received most recently. A notification response designates an interaction with a notification, such as tapping on it.

### Method
GET

### Endpoint
Notifications.getLastNotificationResponseAsync()

### Parameters
None

### Response
#### Success Response (200)
- **NotificationResponse | null** (object | null) - A NotificationResponse object if a notification response was received, or null if no notification response has been received yet

### Platforms
- Android
- iOS

### Returns
`Promise<NotificationResponse | null>`

- `null` - if no notification response has been received yet
- `NotificationResponse` object - if a notification response was received
```

--------------------------------

### Extra Field Configuration Examples

Source: https://docs.expo.dev/archive/technical-specs/expo-updates-0

Provides examples of optional extra field configuration, including EAS project integration and expo-config information that may be included in manifest responses.

```APIDOC
## Extra Field Configuration

### Description
The `extra` field allows specification of optional information such as third-party configuration. While Expo Updates does not specify or rely upon this field, other libraries may use it. A common use case is including EAS (Expo Application Services) configuration.

### Extra Field Requirements
- The server MUST send back an empty object `{}` at a minimum
- The field may contain any JSON-serializable data
- Other libraries may depend on specific keys within this object

### EAS Configuration Example
```json
{
  "extra": {
    "eas": {
      "projectId": "00000000-0000-0000-0000-000000000000"
    }
  }
}
```

### EAS Configuration with Expo Config Example
```json
{
  "extra": {
    "eas": {
      "projectId": "00000000-0000-0000-0000-000000000000"
    },
    "expoConfig": {
      "name": "My App",
      "version": "1.0.0",
      "iconUrl": "https://example.com/icon.png"
    }
  }
}
```

### Minimal Extra Field Example
```json
{
  "extra": {}
}
```

### Notes
- The `eas.projectId` field uses UUID format (RFC 4122)
- The `expoConfig` object may contain app configuration used by multiple Expo libraries
- Additional third-party keys may be added as needed by specific implementations
- Clients should gracefully handle unknown keys in the `extra` object
```

--------------------------------

### GET /containers - Get All Containers

Source: https://docs.expo.dev/versions/latest/sdk/contacts

Retrieves all contact containers from the device. Containers are storage locations for contacts and groups.

```APIDOC
## GET /containers

### Description
Retrieve all contact containers from the device. Containers are storage locations where contacts and groups are stored, such as device storage or online accounts.

### Method
GET

### Endpoint
/containers

### Response
#### Success Response (200)
- **containers** (array) - Array of Container objects
- **id** (string) - Unique identifier for the container
- **name** (string) - Name of the container
- **type** (ContainerType) - Type of the container (local, exchange, cardDAV, etc.)

#### Response Example
{
  "containers": [
    {
      "id": "container_1",
      "name": "Device Contacts",
      "type": "local"
    },
    {
      "id": "container_2",
      "name": "Google Contacts",
      "type": "cardDAV"
    }
  ]
}

### Platform Support
- Android: Yes
- iOS: Yes
```

--------------------------------

### Install AppIntegrity library using Expo CLI

Source: https://docs.expo.dev/versions/latest/sdk/app-integrity

Install the @expo/app-integrity package in your Expo or React Native project using npx expo install command. This package provides app integrity verification APIs for both Android and iOS platforms.

```bash
npx expo install @expo/app-integrity
```

--------------------------------

### Gyroscope Installation

Source: https://docs.expo.dev/versions/v54.0.0/sdk/gyroscope

Install the expo-sensors package which includes the Gyroscope module. This is required before using any gyroscope functionality in your Expo project.

```APIDOC
## Installation

### Description
Install the expo-sensors package to access gyroscope functionality.

### Command
```bash
npx expo install expo-sensors
```

### Requirements
- Expo project or existing React Native app with expo installed
- Supported platforms: Android, iOS (device only), Web

### Bundled Version
- ~15.0.8
```

--------------------------------

### Generate Android Release Keystore with keytool

Source: https://docs.expo.dev/app-signing/local-credentials

This `keytool` command generates a new Android release keystore file (`release.keystore`) with specified security parameters. It requires replacing placeholders for keystore password, key password, key alias, and the Android package name. This command is a prerequisite for configuring Android local credentials in EAS Build.

```bash
keytool \
  -genkey -v \
  -storetype JKS \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -storepass KEYSTORE_PASSWORD \
  -keypass KEY_PASSWORD \
  -alias KEY_ALIAS \
  -keystore release.keystore \
  -dname "CN=com.expo.your.android.package,OU=,O=,L=,S=,C=US"
```

--------------------------------

### Create and Configure PieChart View - Android

Source: https://docs.expo.dev/modules/third-party-library

Initialize a PieChart instance with layout parameters matching the parent view and add it to the view hierarchy. Implements the ExpoRadialChartView class that extends ExpoView and manages the chart display with proper layout configuration.

```kotlin
class ExpoRadialChartView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  internal val chartView = PieChart(context).also {
    it.layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
    addView(it)
  }
}
```

--------------------------------

### Configure iOS Production Build Script in project.pbxproj

Source: https://docs.expo.dev/versions/unversioned/config/metro

Shell script configuration for iOS production builds that sets up the ENTRY_FILE environment variable using Metro's entry resolution. Handles .xcode.env files, skips bundling in Debug mode, resolves CLI path for Expo CLI, and executes React Native's xcode build script.

```bash
shellScript = "if [[ -f \"$PODS_ROOT/../.xcode.env\" ]]; then\n source \"$PODS_ROOT/../.xcode.env\"\nfi\nif [[ -f \"$PODS_ROOT/../.xcode.env.local\" ]]; then\n source \"$PODS_ROOT/../.xcode.env.local\"\nfi\n\n# The project root by default is one level up from the ios directory\nexport PROJECT_ROOT=\"$PROJECT_DIR\"/../\n\nif [[ \"$CONFIGURATION\" = *Debug* ]]; then\n export SKIP_BUNDLING=1\nfi\nif [[ -z \"$ENTRY_FILE\" ]]; then\n # Set the entry JS file using the bundler's entry resolution.\n export ENTRY_FILE=\"$(\"$NODE_BINARY\" -e \"require('expo/scripts/resolveAppEntry')\" \"$PROJECT_ROOT\" ios absolute | tail -n 1)\"\nfi\n\nif [[ -z \"$CLI_PATH\" ]]; then\n # Use Expo CLI\n export CLI_PATH=\"$(\"$NODE_BINARY\" --print \"require.resolve('@expo/cli')\")\"\nfi\nif [[ -z \"$BUNDLE_COMMAND\" ]]; then\n # Default Expo CLI command for bundling\n export BUNDLE_COMMAND=\"export:embed\"\nfi\n\n`\"$NODE_BINARY\" --print \"require('path').dirname(require.resolve('react-native/package.json')) + '/scripts/react-native-xcode.sh'\"`\n\n";
```

--------------------------------

### EAS Install Node Modules Function in YAML

Source: https://docs.expo.dev/custom-builds/schema

Installs node modules using the package manager detected in your project (npm, pnpm, or Yarn). This function supports monorepos, ensuring correct dependency installation across complex project structures.

```yaml
build:
  name: Install node modules
  steps:
    - eas/checkout
    - eas/install_node_modules
```

--------------------------------

### Chain Expo Config Plugins with withPlugins in app.config.ts

Source: https://docs.expo.dev/config-plugins/plugins

Illustrates using the `withPlugins` utility from `expo/config-plugins` to chain multiple Expo config plugins, enhancing readability for complex configurations. It shows an example of passing plugin functions with and without arguments, applying them to a base configuration object.

```typescript
import { withPlugins } from 'expo/config-plugins';

// Create a base config object
const baseConfig = {
  name: 'my app',
  ... rest of the config 
};

// ❌ Hard to read
withDelta(withFoo(withBar(config, 'input 1'), 'input 2'), 'input 3');

// ✅ Easy to read
withPlugins(config, [
  [withFoo, 'input 1'],
  [withBar, 'input 2'],
  // When no input is required, you can just pass the method
  withDelta,
]);

// Export the base config with plugins applied
module.exports = ({ config }: { config: ExpoConfig }) => {
  return withPlugins(baseConfig, plugins);
};

```

--------------------------------

### Configure source-map-explorer scripts in package.json

Source: https://docs.expo.dev/guides/analyzing-bundles

Adds analysis scripts to your `package.json` to easily run `source-map-explorer` for different platforms (web, iOS, Android). You might need to adjust the input paths depending on your specific project setup or SDK version.

```json
{
  "scripts": {
    "analyze:web": "source-map-explorer 'dist/_expo/static/js/web/*.js' 'dist/_expo/static/js/web/*.js.map'",
    "analyze:ios": "source-map-explorer 'dist/_expo/static/js/ios/*.js' 'dist/_expo/static/js/ios/*.js.map'",
    "analyze:android": "source-map-explorer 'dist/_expo/static/js/android/*.js' 'dist/_expo/static/js/android/*.js.map'"
  }
}
```

--------------------------------

### Define Custom Entry Point in package.json (Expo)

Source: https://docs.expo.dev/versions/latest/sdk/expo

This `package.json` snippet illustrates how to specify a custom entry file for an Expo project. By setting the `"main"` field to a path like `"src/main.jsx"`, you can organize your project structure and designate a different file as the application's starting point, diverging from the default `App.js`.

```json
{
  "main": "src/main.jsx"
}
```

--------------------------------

### POST loadAsync(source, initialStatus, downloadAsync)

Source: https://docs.expo.dev/versions/latest/sdk/av

Loads media from a specified source into memory and prepares it for playback. This must be called before controlling playback status, and the `playbackObject` must be in an unloaded state.

```APIDOC
## POST loadAsync(source, initialStatus, downloadAsync)

### Description
Loads the media from `source` into memory and prepares it for playing. This must be called before calling `setStatusAsync()` or any of the convenience set status methods. This method can only be called if the `playbackObject` is in an unloaded state.

### Method
POST

### Endpoint
Playback.loadAsync(source, initialStatus, downloadAsync)

### Parameters
#### Request Body
- **source** (AVPlaybackSource) - Required - The source of the media.
- **initialStatus** (AVPlaybackStatusToSet) - Optional - The initial intended `AVPlaybackStatusToSet` of the `playbackObject`, whose values will override the default initial playback status. This value defaults to `{}` if no parameter is passed.
- **downloadAsync** (boolean) - Optional - If set to `true`, the system will attempt to download the resource to the device before loading. This value defaults to `true`.

### Request Example
```json
{
  "source": {
    "uri": "https://example.com/audio.mp3"
  },
  "initialStatus": {
    "shouldPlay": true,
    "volume": 0.7
  },
  "downloadAsync": true
}
```

### Response
#### Success Response (200)
- **Promise<AVPlaybackStatus>** - A Promise that is fulfilled with the `AVPlaybackStatus` of the `playbackObject` once it is loaded, or rejects if loading failed. The Promise will also reject if the `playbackObject` was already loaded.

#### Response Example
```json
{
  "isLoaded": true,
  "uri": "https://example.com/audio.mp3",
  "progressUpdateIntervalMillis": 500,
  "durationMillis": 60000,
  "positionMillis": 0,
  "playableDurationMillis": 60000,
  "seekableDurationMillis": 60000,
  "rate": 1,
  "shouldCorrectPitch": false,
  "volume": 0.7,
  "isMuted": false,
  "isBuffering": false,
  "isPlaying": true,
  "isLooping": false,
  "didJustFinish": false
}
```
```

--------------------------------

### GET /file-system/legacy/readDirectoryAsync

Source: https://docs.expo.dev/versions/latest/sdk/filesystem-legacy

Enumerate the contents of a directory.

```APIDOC
## GET /file-system/legacy/readDirectoryAsync

### Description
Enumerate the contents of a directory.

### Method
GET

### Endpoint
/file-system/legacy/readDirectoryAsync

### Parameters
#### Path Parameters
_None_

#### Query Parameters
_None_

#### Request Body
- **fileUri** (string) - Required - `file://` URI to the directory.

### Request Example
```json
{
  "fileUri": "file://path/to/directory"
}
```

### Response
#### Success Response (200)
- **contents** (string[]) - An array of strings, each containing the name of a file or directory contained in the specified directory.

#### Response Example
```json
{
  "contents": [
    "file1.txt",
    "subdirectory",
    "image.jpg"
  ]
}
```
```

--------------------------------

### Start Metro Bundler for Development

Source: https://docs.expo.dev/brownfield/get-started

Terminal command to start the Metro bundler in the React Native project directory. Metro compiles TypeScript code into a JavaScript bundle and serves it via HTTP from localhost, enabling hot reloading during development on iOS simulators or devices.

```bash
yarn start
```

--------------------------------

### Start Expo Dev Server in Offline Mode (Terminal)

Source: https://docs.expo.dev/more/expo-cli

Use this command to start the Expo development server without making any network requests. This is beneficial for developing applications when there is no internet connection or to prevent unnecessary external calls.

```Terminal
npx expo start --offline
```

--------------------------------

### React Compiler Configuration

Source: https://docs.expo.dev/versions/v54.0.0/config/app

Experimentally enable React Compiler for automatic optimization of React components and rendering performance.

```APIDOC
## React Compiler Configuration

### Description
Experimentally enable React Compiler for automatic component optimization.

### Property

#### reactCompiler
- **Type**: `boolean`
- **Path**: `experiments.reactCompiler`
- **Required**: Optional
- **Default**: `false`
- **Description**: Experimentally enable React Compiler for automatic optimization

### Configuration Example
```json
{
  "experiments": {
    "reactCompiler": true
  }
}
```

### Notes
- Experimental feature subject to changes
- Automatically optimizes component rendering
- May affect debugging and error tracking
```

--------------------------------

### POST FileSystem.makeDirectoryAsync()

Source: https://docs.expo.dev/versions/v52.0.0/sdk/filesystem

Creates a new empty directory at the specified file:// URI. Supports optional configuration through MakeDirectoryOptions.

```APIDOC
## FileSystem.makeDirectoryAsync(fileUri, options)

### Description
Create a new empty directory.

### Platforms
- Android
- iOS
- tvOS

### Method
Asynchronous Function

### Parameters
#### Path/Query Parameters
- **fileUri** (string) - Required - `file://` URI to the new directory to create.
- **options** (MakeDirectoryOptions) - Optional - A map of create directory options represented by `MakeDirectoryOptions` type. Default: `{}`

### Returns
`Promise<void>`

A Promise that resolves when the directory is successfully created.
```

--------------------------------

### BlurView Component - Installation

Source: https://docs.expo.dev/versions/v52.0.0/sdk/blur-view

Install the expo-blur package in your React Native project. This is required before using the BlurView component in your application.

```APIDOC
## Installation

### Description
Install the expo-blur package to use the BlurView component in your React Native application.

### Command
```
npx expo install expo-blur
```

### Requirements
- Requires `expo` to be installed in your project
- Compatible with React Native applications

### Package Information
- **Bundled version**: ~14.0.3
- **Platforms**: Android, iOS, tvOS, Web
```

--------------------------------

### Refactor MainApplication Kotlin Class for React Native 0.74

Source: https://docs.expo.dev/bare/upgrade

Updates the MainApplication.kt file to use the new React Native entry point APIs introduced in SDK 54. Simplifies the getPackages() method using Kotlin's apply function, adds release level configuration, and replaces deprecated SoLoader initialization with loadReactNative() call.

```kotlin
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.ReactHost
import com.facebook.react.common.ReleaseLevel
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint
import com.facebook.react.defaults.DefaultReactNativeHost

import expo.modules.ApplicationLifecycleDispatcher
import expo.modules.ReactNativeHostWrapper

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost = ReactNativeHostWrapper(
    this,
    object : DefaultReactNativeHost(this) {
      override fun getPackages(): List<ReactPackage> =
        PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // add(MyReactNativePackage())
        }

      override fun getJSMainModuleName(): String = ".expo/.virtual-metro-entry"

      override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

      override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
    }
  )

  override fun onCreate() {
    super.onCreate()
    try {
      DefaultNewArchitectureEntryPoint.releaseLevel = ReleaseLevel.valueOf(BuildConfig.REACT_NATIVE_RELEASE_LEVEL.uppercase())
    } catch (e: IllegalArgumentException) {
      DefaultNewArchitectureEntryPoint.releaseLevel = ReleaseLevel.STABLE
    }
    loadReactNative(this)
    ApplicationLifecycleDispatcher.onApplicationCreate(this)
  }
}
```

--------------------------------

### startObserving(eventName)

Source: https://docs.expo.dev/versions/v52.0.0/sdk/expo

Lifecycle hook automatically invoked when the first listener for an event is added. Override this method in a subclass to perform setup tasks when event observation begins. Supported on Android, iOS, tvOS, and Web platforms.

```APIDOC
## startObserving(eventName)

### Description
Function that is automatically invoked when the first listener for an event with the given name is added. Override it in a subclass to perform some additional setup once the event started being observed.

### Method
Custom Lifecycle Hook

### Parameters
#### Input Parameters
- **eventName** (EventName) - Required - The name of the event being observed

### Returns
`void`

### Platforms
- Android
- iOS
- tvOS
- Web
```

--------------------------------

### Usage Example - Age Range Request

Source: https://docs.expo.dev/versions/unversioned/sdk/age-range

Complete example demonstrating how to use the expo-age-range library to request and display user age range information in a React Native application with error handling.

```APIDOC
## Complete Usage Example

### Implementation

```javascript
import * as AgeRange from 'expo-age-range';
import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [result, setResult] = useState<AgeRange.AgeRangeResponse | { error: string } | null>(null);

  const requestAgeRange = async () => {
    try {
      const ageRange = await AgeRange.requestAgeRangeAsync({
        threshold1: 10,
        threshold2: 13,
        threshold3: 18,
      });
      setResult(ageRange);
    } catch (error) {
      setResult({ error: error.message });
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Request Age Range" onPress={requestAgeRange} />
      {result && (
        <Text style={styles.result}>
          {'error' in result ? `Error: ${result.error}` : `Lower age bound: ${result.lowerBound}`}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
  },
});
```

### Key Features
- Async/await pattern for age range request
- Error handling with try/catch block
- State management using React hooks
- Conditional rendering based on response type
- Display of age range lower bound or error message
```

--------------------------------

### Build Expo Web Project for Deployment

Source: https://docs.expo.dev/guides/server-components

This command is used to build an Expo project specifically for web deployment. The `-p web` flag ensures that the output is optimized for web platforms, creating the necessary static assets for hosting.

```bash
npx expo export -p web
```

--------------------------------

### GET AuthSession.getDefaultReturnUrl(urlPath, options)

Source: https://docs.expo.dev/versions/v53.0.0/sdk/auth-session

Gets the default return URL for the authentication flow. This method is deprecated; use makeRedirectUri() instead.

```APIDOC
## GET AuthSession.getDefaultReturnUrl(urlPath, options)

### Description
Gets the default return URL for the authentication flow.

### Method
GET

### Parameters
#### Optional Parameters
- **urlPath** (string) - Optional - Additional path component to append
- **options** (Omit<CreateURLOptions, 'queryParams'>) - Optional - URL creation options

### Returns
- **string** - The default return URL

### Deprecation Notice
Deprecated - Use `makeRedirectUri()` instead.
```

--------------------------------

### Web Splash Screen Configuration

Source: https://docs.expo.dev/versions/v54.0.0/config/app

Configure Progressive Web App splash screen settings including background color, image, and resize behavior for the loading screen.

```APIDOC
## Web Splash Screen Configuration

### Description
Configure PWA splash screens displayed when the application is launching. In Bare Workflow, use expo-splash-screen.

### Path
`web.splash`

### Type
object

### Properties

#### backgroundColor
- **Type:** string (hex color)
- **Path:** `web.splash.backgroundColor`
- **Description:** Color to fill the loading screen background.
- **Format:** 6 character long hex color string, for example `'#000000'`

#### image
- **Type:** string
- **Path:** `web.splash.image`
- **Description:** Local path or remote URL to an image to fill the background of the loading screen. Image size and aspect ratio are up to you. Must be a .png file.

#### resizeMode
- **Type:** enum
- **Path:** `web.splash.resizeMode`
- **Description:** Determines how the `image` will be displayed in the splash loading screen.
- **Possible Values:** `cover`, `contain`
- **Default:** `contain`

### Example Configuration
```json
{
  "web": {
    "splash": {
      "backgroundColor": "#FFFFFF",
      "image": "./assets/splash.png",
      "resizeMode": "contain"
    }
  }
}
```
```

--------------------------------

### GET Location.getHeadingAsync()

Source: https://docs.expo.dev/versions/latest/sdk/location

Gets the current heading information from the device by calling watchHeadingAsync and returning an accurate heading value after several updates.

```APIDOC
## GET Location.getHeadingAsync()

### Description
Gets the current heading information from the device. Internally calls watchHeadingAsync and waits for a couple of updates, then returns the one that is accurate enough.

### Method
GET

### Endpoint
Location.getHeadingAsync()

### Parameters
None

### Response
#### Success Response (200)
- **magHeading** (number) - Heading relative to magnetic north in degrees
- **trueHeading** (number) - Heading relative to true north in degrees
- **accuracy** (number) - Heading accuracy in degrees

#### Response Example
```json
{
  "magHeading": 45.5,
  "trueHeading": 46.2,
  "accuracy": 5
}
```

### Return Type
`Promise<LocationHeadingObject>`
```

--------------------------------

### Install Resend SDK in Expo Project

Source: https://docs.expo.dev/guides/using-resend

Install the Resend SDK as a server-only library in your Expo project using the Expo CLI. This library enables email sending from the server-side code via API Routes.

```bash
npx expo install resend
```

--------------------------------

### GET /sources

Source: https://docs.expo.dev/versions/unversioned/sdk/calendar-next

Retrieves an array of source objects detailing different device sources.

```APIDOC
## GET /sources

### Description
Gets an array of Source objects with details about the different sources stored on the device.

### Method
GET

### Endpoint
Calendar Next.getSourcesSync()

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
N/A

### Response
#### Success Response (200)
- **Source[]** - An array of Source objects representing the sources found.

#### Response Example
N/A
```

--------------------------------

### POST Audio.Sound.createAsync() - Create and Load Sound

Source: https://docs.expo.dev/versions/latest/sdk/audio-av

Creates and loads a sound from a specified source with optional initial playback status and callback handlers. This is the primary method for initializing audio playback in your application.

```APIDOC
## Audio.Sound.createAsync(source, initialStatus, onPlaybackStatusUpdate, downloadFirst)

### Description
Creates and loads a sound from the specified source. Supports multiple platforms including Android, iOS, tvOS, and Web.

### Method
Async Method (Returns Promise)

### Endpoint
`Audio.Sound.createAsync(source, initialStatus?, onPlaybackStatusUpdate?, downloadFirst?)`

### Parameters

#### Method Parameters
- **source** (AVPlaybackSource) - Required - The source of the sound. Accepts require() paths or Asset objects.
- **initialStatus** (AVPlaybackStatusToSet) - Optional - The initial intended PlaybackStatusToSet of the sound. Default: `{}`
- **onPlaybackStatusUpdate** (null | (status: AVPlaybackStatus) => void) - Optional - Callback function receiving PlaybackStatus updates. Default: `null`
- **downloadFirst** (boolean) - Optional - If true, downloads the resource to device before loading. Only works with require() or Asset sources. Default: `true`

### Request Example
```javascript
const { sound } = await Audio.Sound.createAsync(
  source,
  initialStatus,
  onPlaybackStatusUpdate,
  downloadFirst
);

// Equivalent to:
const sound = new Audio.Sound();
sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
await sound.loadAsync(source, initialStatus, downloadFirst);
```

### Response

#### Success Response (Promise Resolved)
- **SoundObject** (object) - Contains `sound` instance and `status` properties
  - **sound** (Audio.Sound) - The created sound object ready for playback
  - **status** (AVPlaybackStatus) - Current playback status

#### Response Example
```javascript
try {
  const { sound: soundObject, status } = await Audio.Sound.createAsync(
    require('./assets/sounds/hello.mp3'),
    { shouldPlay: true }
  );
  // Your sound is playing!
} catch (error) {
  // An error occurred!
}
```

#### Error Response
- **Promise Rejection** - Occurs if creation failed due to invalid source or device error
```

--------------------------------

### GET /groups - Get All Groups

Source: https://docs.expo.dev/versions/latest/sdk/contacts

Retrieves all contact groups from the device. Returns a list of all available groups that can be used to organize contacts.

```APIDOC
## GET /groups

### Description
Retrieve all contact groups from the device. Returns a list of all available groups that can be used to organize and categorize contacts.

### Method
GET

### Endpoint
/groups

### Response
#### Success Response (200)
- **groups** (array) - Array of Group objects
- **id** (string) - Unique identifier for the group
- **name** (string) - Name of the group
- **containerId** (string) - Identifier of the container this group belongs to

#### Response Example
{
  "groups": [
    {
      "id": "group_1",
      "name": "Family",
      "containerId": "container_1"
    },
    {
      "id": "group_2",
      "name": "Work",
      "containerId": "container_1"
    }
  ]
}

### Platform Support
- Android: Yes
- iOS: Yes
```

--------------------------------

### Configure Netlify Server Entry for Expo SSR

Source: https://docs.expo.dev/router/web/api-routes

This TypeScript file defines the server entry point for an Expo web project deployed on Netlify. It uses `expo-server/adapter/netlify` to create a request handler, directing all requests to the `dist/server` build output. This setup enables server-side rendering by delegating all incoming requests through this middleware.

```typescript
import path from 'node:path';
import { createRequestHandler } from 'expo-server/adapter/netlify';

export default createRequestHandler({
  build: path.join(__dirname, '../../dist/server'),
});

```

--------------------------------

### POST play()

Source: https://docs.expo.dev/versions/v52.0.0/sdk/video

Resumes video playback. Use this method to start or resume playback of the current video source. This method works across all supported platforms.

```APIDOC
## POST play()

### Description
Resumes the player and starts video playback.

### Method
Function call (no HTTP method)

### Platforms
Android, iOS, tvOS, Web

### Parameters
None

### Returns
`void`

### Usage Example
```javascript
videoPlayer.play();
```
```

--------------------------------

### Updates.emergencyLaunchReason Property

Source: https://docs.expo.dev/versions/latest/sdk/updates

Provides error message details when an emergency launch occurs. Returns a string error message if isEmergencyLaunch is true, describing what failed during initialization.

```APIDOC
## Updates.emergencyLaunchReason

### Description
Contains error message when an emergency launch occurs.

### Type
`null | string`

### Platforms
- Android
- iOS
- tvOS

### Details
If `isEmergencyLaunch` is set to true, this will contain a string error message describing what failed during initialization.

### Example
```typescript
import * as Updates from 'expo-updates';

if (Updates.isEmergencyLaunch) {
  console.error('Emergency launch reason:', Updates.emergencyLaunchReason);
}
```
```

--------------------------------

### Install react-native-safe-area-context library for Expo

Source: https://docs.expo.dev/develop/user-interface/safe-areas

Install the `react-native-safe-area-context` library, which provides flexible APIs for handling safe area insets on Android and iOS. This step can often be skipped if using a default Expo template or Expo Router, as it might already be installed as a peer dependency.

```Terminal
npx expo install react-native-safe-area-context
```

--------------------------------

### Install React Native WebView, Terminal

Source: https://docs.expo.dev/guides/dom-components

Install `react-native-webview`, a crucial dependency for the `'use dom'` directive to function. This package provides the native component that renders the web content.

```bash
npx expo install react-native-webview
```

--------------------------------

### Define ActivityAction for Manage Unknown App Sources (Android)

Source: https://docs.expo.dev/versions/latest/sdk/intent-launcher

Defines the `ActivityAction` constant for opening the Android settings where users can manage permissions for installing apps from unknown sources. This is a critical security setting for controlling app installation outside of official app stores.

```javascript
ActivityAction.MANAGE_UNKNOWN_APP_SOURCES = "android.settings.MANAGE_UNKNOWN_APP_SOURCES"
```

--------------------------------

### Install CocoaPods Dependencies via Terminal

Source: https://docs.expo.dev/brownfield/get-started

Executes the pod install command to download and integrate React Native dependencies into the Xcode workspace. This command must be run after creating or modifying the Podfile and generates the .xcworkspace file required for development.

```bash
pod install
```

--------------------------------

### Define Android Activity Action to Show Manual

Source: https://docs.expo.dev/versions/unversioned/sdk/intent-launcher

This code defines an Android `ActivityAction` constant for displaying a system manual or help documentation. Developers can use this `Intent` action to provide users with access to device-specific guides.

```Java
ActivityAction.SHOW_MANUAL ＝ "android.settings.SHOW_MANUAL"
```

--------------------------------

### Build Native Projects Locally with Expo CLI

Source: https://docs.expo.dev/guides/adopting-prebuild

After running `expo prebuild`, these commands allow you to build and test the native Android and iOS projects locally. This verifies that the prebuild process successfully generated functional native code.

```bash
# Build your native Android project
npx expo run:android
  
# Build your native iOS project
npx expo run:ios
```

--------------------------------

### Preview Expo Prebuild Results Without Generating Code

Source: https://docs.expo.dev/config-plugins/development-and-debugging

Demonstrates how to print the results of config plugins without actually generating any native code. Using `npx expo config --type prebuild` helps in inspecting the output of plugins and their modifications before applying changes to the project.

```shell
npx expo config --type prebuild
```

--------------------------------

### FileSystem Legacy.readAsStringAsync(fileUri, options)

Source: https://docs.expo.dev/versions/unversioned/sdk/filesystem-legacy

Reads the entire content of a file as a string. Binary content will be returned raw, requiring manual Base64 prefixing for specific uses.

```APIDOC
## Function: `readAsStringAsync`

### Description
Read the entire contents of a file as a string. Binary will be returned in raw format, you will need to append `data:image/png;base64,` to use it as Base64.

### Method
Function Call

### Endpoint
`FileSystem Legacy.readAsStringAsync(fileUri, options)`

### Parameters
#### Function Parameters
- **fileUri** (string) - Required - `file://` or SAF URI to the file or directory.
- **options** (ReadingOptions) - Optional - A map of read options represented by `ReadingOptions` type. Default: `{}`

### Request Example
{
  "fileUri": "file:///path/to/document.txt",
  "options": {
    "encoding": "utf8"
  }
}

### Response
#### Success Response (200)
- **return** (string) - A string containing the entire contents of the file.

#### Response Example
{
  "content": "Hello, world! This is the file content."
}
```

--------------------------------

### Minimal iOS Build Workflow - YAML

Source: https://docs.expo.dev/custom-builds/schema

Simplified iOS build configuration with essential steps for checking out code, installing dependencies, prebuilding, configuring EAS update, generating Gymfile, running fastlane, and uploading artifacts. Use this when credential resolution and custom prebuild parameters are not required.

```yaml
build:
  name: Build iOS app
  steps:
    - eas/checkout
    - eas/install_node_modules
    - eas/prebuild
    - eas/configure_eas_update
    - eas/generate_gymfile_from_template
    - eas/run_fastlane
    - eas/find_and_upload_build_artifacts
```

--------------------------------

### Specify SF Symbols Icons for Link Preview Menu Actions

Source: https://docs.expo.dev/router/reference/link-preview

This example expands on link preview menus by showing how to assign SF Symbols icons to `Link.MenuAction` components. The `icon` prop takes a string corresponding to an SF Symbol name, enhancing the visual representation of menu actions for a more intuitive user experience. This functionality is specific to iOS.

```jsx
<Link href="/about">
  <Link.Trigger>About</Link.Trigger>
  <Link.Menu>
    <Link.MenuAction title="Share" icon="square.and.arrow.up" onPress={handleSharePress} />
    <Link.MenuAction title="Block" icon="nosign" onPress={handleBlockPress} />
    <Link.MenuAction
      title="Follow"
      icon="person.crop.circle.badge.plus"
      onPress={handleFollowPress}
    />
    <Link.MenuAction title="Copy" icon="doc.on.doc" onPress={handleCopyPress} />
  </Link.Menu>
</Link>
```

--------------------------------

### Checkbox Component Installation

Source: https://docs.expo.dev/versions/v54.0.0/sdk/checkbox

Install the expo-checkbox package into your Expo project. This component provides basic checkbox functionality across all platforms.

```APIDOC
## Installation

### Description
Install the expo-checkbox package to add checkbox component functionality to your Expo project.

### Command
```
npx expo install expo-checkbox
```

### Version
- **Bundled version**: ~5.0.8
- **Supported platforms**: Android, iOS, tvOS, Web

### Import
```javascript
import { Checkbox } from 'expo-checkbox';
```
```

--------------------------------

### Pass Output from One Step to Another

Source: https://docs.expo.dev/custom-builds/schema

Shows how to use output from one step as input to another step using the step ID and output name reference syntax. The first step produces a 'foo' output with the ID 'id123', which is then consumed by the second step.

```yaml
build:
  name: Outputs demo
  steps:
    - run:
        name: Produce output
        id: id123
        outputs: [foo]
        command: |
          echo "Producing output for another step"
          set-output foo bar
    - run:
        name: Use output from another step
        inputs:
          foo: ${ steps.id123.foo }
        command: |
          echo "foo = \"${ inputs.foo }\""
```

--------------------------------

### Type: MakeDirectoryOptions

Source: https://docs.expo.dev/versions/v53.0.0/sdk/filesystem

Options for creating a new directory.

```APIDOC
## Type: MakeDirectoryOptions

### Description
Options for creating a new directory.

### Type
Object

### Properties
- **intermediates** (`boolean`, optional) - If `true`, don't throw an error if there is no file or directory at this URI. Default: `false`.
```

--------------------------------

### Configure EAS Credentials for App Store Connect API Key

Source: https://docs.expo.dev/submit/ios

Run this terminal command to interactively set up your App Store Connect API Key credentials using EAS, guiding you through selecting a build profile and linking your API key.

```bash
eas credentials --platform ios
```

--------------------------------

### Basic Text-to-Speech Usage in React Native

Source: https://docs.expo.dev/versions/latest/sdk/speech

Demonstrates how to integrate and use `expo-speech` in a React Native application to speak a predefined text. This example sets up a button that, when pressed, triggers the text-to-speech functionality.

```javascript
import { View, StyleSheet, Button } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const speak = () => {
    const thingToSay = '1';
    Speech.speak(thingToSay);
  };

  return (
    <View style={styles.container}>
      <Button title="Press to hear some words" onPress={speak} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
```

--------------------------------

### Example JSON for Android Intent Filter Configuration

Source: https://docs.expo.dev/versions/latest/config/app

This JSON array provides an example structure for defining custom intent filters within your Android application. It includes settings for `autoVerify`, `action`, `data` (scheme and host), and `category` to handle specific deep links or actions.

```json
[
   {
     "autoVerify": true,
     "action": "VIEW",
     "data": {
       "scheme": "https",
       "host": "*.example.com"
     },
     "category": [
       "BROWSABLE",
       "DEFAULT"
     ]
   }
 ]
```

--------------------------------

### EAS Workflow: Installing Node.js Modules

Source: https://docs.expo.dev/eas/workflows/syntax

Shows how to use the `eas/install_node_modules` built-in function to install project dependencies. This function automatically detects the package manager (bun, npm, pnpm, or Yarn) and supports monorepos, typically following a checkout step.

```YAML
jobs:
  my_job:
    steps:
      - uses: eas/checkout
      - uses: eas/install_node_modules
```

--------------------------------

### Complete Background Location Task Example

Source: https://docs.expo.dev/versions/v54.0.0/sdk/task-manager

Full example demonstrating how to set up a React Native component with a button to enable background location tracking. Includes task definition, permission requests, and UI with StyleSheet styling. Shows the complete workflow for background location updates.

```javascript
import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

const LOCATION_TASK_NAME = 'background-location-task';

const requestPermissions = async () => {
  const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus === 'granted') {
    const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus === 'granted') {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Balanced,
      });
    }
  }
};

const PermissionsButton = () => (
  <View style={styles.container}>
    <Button onPress={requestPermissions} title="Enable background location" />
  </View>
);

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    return;
  }
  if (data) {
    const { locations } = data;
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PermissionsButton;
```

--------------------------------

### Install React Compiler Babel Plugin for Expo SDK 54 and Later

Source: https://docs.expo.dev/guides/react-compiler

Install the `babel-plugin-react-compiler` for Expo projects using SDK 54 and later. This command adds the necessary Babel plugin to your project, which is automatically configured by Expo for these SDK versions.

```bash
npx expo install babel-plugin-react-compiler@beta
```

--------------------------------

### GET AuthSession.getRedirectUrl(path)

Source: https://docs.expo.dev/versions/v53.0.0/sdk/auth-session

Gets the URL that the authentication provider needs to redirect to after authorization. The URL format varies between managed and web workflows.

```APIDOC
## GET AuthSession.getRedirectUrl(path)

### Description
Get the URL that your authentication provider needs to redirect to. For example: `https://auth.expo.io/@your-username/your-app-slug`. You can pass an additional path component to be appended to the default redirect URL.

### Method
GET

### Parameters
#### Optional Parameters
- **path** (string) - Optional - Additional path component to append to the redirect URL

### Returns
- **string** - The redirect URL for the authentication provider

### Example
```
const url = AuthSession.getRedirectUrl('redirect');

// Managed: https://auth.expo.io/@your-username/your-app-slug/redirect
// Web: https://localhost:19006/redirect
```

### Notes
This method will throw an exception if you're using the bare workflow on native.
```

--------------------------------

### File.create()

Source: https://docs.expo.dev/versions/v54.0.0/sdk/filesystem

Creates a new file with optional configuration options. Accepts FileCreateOptions to customize the file creation process.

```APIDOC
## create(options)

### Description
Creates a file with optional configuration.

### Method
POST (File Operation)

### Parameters
#### Query Parameters
- **options** (`FileCreateOptions`) - Optional - Configuration options for file creation.

### Returns
- **Type**: `void`
- **Description**: Operation completes without returning a value.
```

--------------------------------

### Install Dependencies for Blurhash Generation - npm

Source: https://docs.expo.dev/versions/latest/sdk/image

Install required npm packages for handling multipart form data (multer), image processing (sharp), and blurhash encoding. These dependencies enable server-side blurhash generation from uploaded images.

```bash
npm install multer sharp blurhash
```

--------------------------------

### Configure Asset Bundling Patterns in app.json for Expo

Source: https://docs.expo.dev/archive/classic-updates/updating-your-app

This configuration snippet for `app.json` defines patterns for assets that should be bundled and pre-downloaded as part of an Expo update. The `assetBundlePatterns` array accepts glob patterns (e.g., `**/*` for all assets or `assets/images/*` for specific image directories). Assets matching these patterns will be downloaded by clients before the update that uses them is launched, ensuring they are available offline. Assets not matching can be lazily loaded at runtime.

```json
"assetBundlePatterns": [
  "**/*" // or "assets/images/*", etc.
],
```

--------------------------------

### Install Expo SDK with pnpm

Source: https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough

Install a specific version of the Expo package using pnpm. Replace the version number (54.0.0) with your target SDK version. This is the first step in upgrading the Expo SDK.

```bash
pnpm add expo@^54.0.0
```

--------------------------------

### Configure Workflow-Wide Default Tool Versions (YAML)

Source: https://docs.expo.dev/eas/workflows/syntax

This example demonstrates how to specify default versions for various development tools like Node.js, Yarn, and pnpm across all jobs in a workflow using the `defaults.tools` block. It ensures consistent tool environments for builds and deployments.

```yaml
name: Set up custom versions
defaults:
  tools:
    node: latest
    yarn: '2'
    corepack: true
    pnpm: '8'
    bun: '1.0.0'
    fastlane: 2.224.0
    cocoapods: 1.12.0

on:
  push:
    branches: ['*']

jobs:
  setup:
    steps:
      - name: Check Node version
        run: node --version # should print a concrete version, like 23.9.0
      - name: Check Yarn version
        run: yarn --version # should print a concrete version, like 2.4.3

```

--------------------------------

### Configuration Setup

Source: https://docs.expo.dev/versions/latest/sdk/build-properties

Configure the expo-build-properties plugin in your app.json or app.config.js file with Android and iOS build properties.

```APIDOC
## Configuration Setup

### Description
Set up the expo-build-properties plugin in your Expo config file to customize native build settings.

### app.json Configuration
```json
{
  "expo": {
    "plugins": [
      [
        "expo-build-properties",
        {
          "android": {
            "compileSdkVersion": 35,
            "targetSdkVersion": 35,
            "buildToolsVersion": "35.0.0"
          },
          "ios": {
            "deploymentTarget": "15.1"
          }
        }
      ]
    ]
  }
}
```

### app.config.js Configuration
```javascript
export default {
  expo: {
    plugins: [
      [
        'expo-build-properties',
        {
          android: {
            compileSdkVersion: 35,
            targetSdkVersion: 35,
            buildToolsVersion: '35.0.0'
          },
          ios: {
            deploymentTarget: '15.1'
          }
        }
      ]
    ]
  }
};
```
```

--------------------------------

### GET /blog/[post]

Source: https://docs.expo.dev/router/web/api-routes

A parameterized API route that handles dynamic path segments using square bracket notation. This endpoint demonstrates how to access path parameters from the request context.

```APIDOC
## GET /blog/[post]

### Description
A dynamic API endpoint that accepts a post identifier as a path parameter. The route handler receives the parameter value and can use it to fetch specific data.

### Method
GET

### Endpoint
/blog/{post}

### Path Parameters
- **post** (string) - Required - The post identifier extracted from the URL path

### Request Example
```
GET /blog/my-post-title HTTP/1.1
Host: localhost:8081
```

### Response
#### Success Response (200 OK)
- Response body varies based on the post data fetched

#### Response Example
```json
{
  "id": "my-post-title",
  "title": "Post Title",
  "content": "Post content here"
}
```

### Implementation
```typescript
export async function GET(request: Request, { post }: Record<string, string>) {
  // const postId = new URL(request.url).searchParams.get('post')
  // fetch data for 'post'
  return Response.json({ ... });
}
```
```

--------------------------------

### GET /demo

Source: https://docs.expo.dev/router/web/api-routes

A basic API route that returns a static JSON response. This demonstrates the simplest form of an API route implementation using the Response.json() method.

```APIDOC
## GET /demo

### Description
A simple demonstration endpoint that returns a static JSON response. This shows the basic structure and syntax for creating an Expo Router API route.

### Method
GET

### Endpoint
/demo

### Request Example
```
GET /demo HTTP/1.1
Host: localhost:8081
```

### Response
#### Success Response (200 OK)
- **hello** (string) - A greeting message

#### Response Example
```json
{
  "hello": "universe"
}
```

### Implementation
```typescript
export function GET() {
  return Response.json({ hello: 'universe' });
}
```
```

--------------------------------

### Practical Modifiers Usage Example

Source: https://docs.expo.dev/versions/unversioned/sdk/ui/swift-ui/modifiers

Demonstrates real-world usage patterns for combining multiple modifiers including styling, shadows, gestures, and conditional modifiers for creating rich UI experiences.

```APIDOC
## Complete Modifiers Usage Example

### Description
Demonstrates practical patterns for combining multiple modifiers to create styled, interactive, and animated components.

### Code Example
```javascript
import { Text, Host, VStack } from '@expo/ui/swift-ui';
import {
  background,
  cornerRadius,
  padding,
  shadow,
  foregroundColor,
  onTapGesture,
} from '@expo/ui/swift-ui/modifiers';
import { useState } from 'react';

function ModifiersExample() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <Host style={{ flex: 1 }}>
      <VStack spacing={20}>
        {/* Basic styling modifiers */}
        <Text
          modifiers={[
            background('#FF6B6B'),
            cornerRadius(12),
            padding({ all: 16 }),
            foregroundColor('#FFFFFF'),
          ]}
        >
          Basic styled text
        </Text>

        {/* Complex combination with shadow and interaction */}
        <Text
          modifiers={[
            background('#4ECDC4'),
            cornerRadius(16),
            padding({ horizontal: 20, vertical: 12 }),
            shadow({ radius: 4, x: 0, y: 2, color: '#4ECDC440' }),
            onTapGesture(() => console.log('Tapped!')),
          ]}
        >
          Styled with shadow and tap gesture
        </Text>

        {/* Conditional modifiers using spread operator */}
        <Text
          modifiers={[
            background('#9B59B6'),
            cornerRadius(8),
            padding({ all: 14 }),
            ...(isEnabled
              ? [shadow({ radius: 6, y: 3 }), scaleEffect(1.02)]
              : [grayscale(0.5), opacity(0.7)]),
          ]}
        >
          Conditional styling
        </Text>
      </VStack>
    </Host>
  );
}
```

### Key Patterns
1. **Basic Styling**: Combine background, padding, and corner radius modifiers
2. **Interactive Elements**: Add tap gestures and shadow effects
3. **Conditional Modifiers**: Use spread operator to apply different modifiers based on state
4. **Compound Modifiers**: Combine spacing, sizing, and visual effects

### Platforms
- iOS
- tvOS
```

--------------------------------

### Install expo-background-task npm package

Source: https://docs.expo.dev/versions/unversioned/sdk/background-task

Installation command for expo-background-task library. Run this command in your project directory to add the background task module to your Expo or React Native application.

```bash
npx expo install expo-background-task
```

--------------------------------

### Install Expo SDK with npm

Source: https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough

Install a specific version of the Expo package using npm. Replace the version number (54.0.0) with your target SDK version. This is the first step in upgrading the Expo SDK.

```bash
npm install expo@^54.0.0
```

--------------------------------

### Configure Podfile with Expo Modules - Ruby

Source: https://docs.expo.dev/bare/installing-expo-modules

Sets up the Podfile to integrate Expo modules and handle React Native autolinking. Configures native module resolution and conditional autolinking based on environment variables. Requires Node.js for module resolution and supports both community and Expo autolinking strategies.

```ruby
require File.join(File.dirname(`node --print "require.resolve('expo/package.json')"`), "scripts/autolinking")
require Pod::Executable.execute_command('node', ['-p', 'require.resolve(

target 'myapp' do
  config = use_native_modules!
  use_expo_modules!

  if ENV['EXPO_USE_COMMUNITY_AUTOLINKING'] == '1'
    config_command = ['node', '-e', "process.argv=['', '', 'config'];require('@react-native-community/cli').run()"];
  else
    config_command = [
      'node',
      '--no-warnings',
      '--eval',
      'require(require.resolve(\'expo-modules-autolinking\', { paths: [require.resolve(\'expo/package.json\')] }))(process.argv.slice(1))',
      'react-native-config',
      '--json',
      '--platform',
      'ios'
    ]
  end

  config = use_native_modules!(config_command)

  use_react_native!(
    :path => config[:reactNativePath]
  )
end
```

--------------------------------

### GET getAvailableInputs() - Get Available Recording Inputs

Source: https://docs.expo.dev/versions/v54.0.0/sdk/audio

Returns a list of available recording inputs (microphones). This method can only be called after the recorder has been prepared.

```APIDOC
## GET AudioRecorder.getAvailableInputs()

### Description
Returns a list of available recording inputs. This method can only be called if the `Recording` has been prepared.

### Method
Function

### Parameters
None

### Returns
`Promise<RecordingInput[]>` - A Promise that is fulfilled with an array of `RecordingInput` objects.

### Usage Example
```javascript
const recorder = new AudioRecorder();
await recorder.prepareToRecordAsync();
const inputs = await recorder.getAvailableInputs();
console.log(inputs);
```
```

--------------------------------

### Install and Authenticate EAS CLI for Expo Account

Source: https://docs.expo.dev/deploy/submit-to-app-stores

Installs the Expo Application Services (EAS) command-line interface globally via npm and then prompts the user to log in with their Expo account. This authentication is required to use EAS for building and submitting applications to app stores.

```terminal
npm install -g eas-cli && eas login
```

--------------------------------

### Create a Run-Once Expo Config Plugin with Version Tracking (TypeScript)

Source: https://docs.expo.dev/config-plugins/development-and-debugging

This example illustrates how to create a run-once Expo config plugin using `createRunOncePlugin` from `expo/config-plugins`. It prevents duplicate execution by tracking the plugin's name and version in `_internal.pluginHistory`, ensuring the plugin runs only once during the build process. The plugin wraps another `ConfigPlugin` and uses its package's name and version for identification.

```TypeScript
import { ConfigPlugin, createRunOncePlugin } from 'expo/config-plugins';

// Keeping the name, and version in sync with it's package.
const pkg = require('my-cool-plugin/package.json');

const withMyCoolPlugin: ConfigPlugin = config => config;

// A helper method that wraps `withRunOnce` and appends items to `pluginHistory`.
export default createRunOncePlugin(
  // The plugin to guard.
  withMyCoolPlugin,
  // An identifier used to track if the plugin has already been run.
  pkg.name,
  // Optional version property, if omitted, defaults to UNVERSIONED.
  pkg.version
);
```

--------------------------------

### Installation

Source: https://docs.expo.dev/versions/v54.0.0/sdk/imagemanipulator

Install the expo-image-manipulator package in your Expo project. This library provides image manipulation capabilities for local file system images across multiple platforms.

```APIDOC
## Installation

### Description
Install the expo-image-manipulator package to enable image manipulation functionality in your Expo project.

### Installation Command
```
npx expo install expo-image-manipulator
```

### Requirements
- Expo CLI or React Native CLI
- Existing React Native app (if installing in non-Expo project)
- The `expo` package must be installed in your project

### Supported Platforms
- Android
- iOS
- tvOS
- Web

### Package Version
- Bundled version: ~14.0.8
```

--------------------------------

### Migrate Media Library Album to Internal Storage with SAF and MediaLibrary

Source: https://docs.expo.dev/versions/latest/sdk/filesystem-legacy

Demonstrates a complete workflow for migrating a media library album from external storage to internal app storage using StorageAccessFramework and expo-media-library. This function requests permissions, validates the selected folder, moves files to the document directory, creates media assets, and organizes them into a new album. Requires expo-file-system/legacy and expo-media-library packages.

```typescript
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system/legacy';
const { StorageAccessFramework } = FileSystem;

async function migrateAlbum(albumName: string) {
  // Gets SAF URI to the album
  const albumUri = StorageAccessFramework.getUriForDirectoryInRoot(albumName);

  // Requests permissions
  const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync(albumUri);
  if (!permissions.granted) {
    return;
  }

  const permittedUri = permissions.directoryUri;
  // Checks if users selected the correct folder
  if (!permittedUri.includes(albumName)) {
    return;
  }

  const mediaLibraryPermissions = await MediaLibrary.requestPermissionsAsync();
  if (!mediaLibraryPermissions.granted) {
    return;
  }

  // Moves files from external storage to internal storage
  await StorageAccessFramework.moveAsync({
    from: permittedUri,
    to: FileSystem.documentDirectory!,
  });

  const outputDir = FileSystem.documentDirectory! + albumName;
  const migratedFiles = await FileSystem.readDirectoryAsync(outputDir);

  // Creates assets from local files
  const [newAlbumCreator, ...assets] = await Promise.all(
    migratedFiles.map<Promise<MediaLibrary.Asset>>(
      async fileName => await MediaLibrary.createAssetAsync(outputDir + '/' + fileName)
    )
  );

  // Album was empty
  if (!newAlbumCreator) {
    return;
  }

  // Creates a new album in the scoped directory
  const newAlbum = await MediaLibrary.createAlbumAsync(albumName, newAlbumCreator, false);
  if (assets.length) {
    await MediaLibrary.addAssetsToAlbumAsync(assets, newAlbum, false);
  }
}
```

--------------------------------

### AudioPlayer Method: `play()`

Source: https://docs.expo.dev/versions/latest/sdk/audio

Starts playing audio from the current position.

```APIDOC
## Method: `play()`

### Description
Start playing audio.

### Parameters

### Returns
`void`
```

--------------------------------

### Configure Middleware Settings in Expo Server

Source: https://docs.expo.dev/versions/unversioned/sdk/server

This example demonstrates how to configure middleware settings in an Expo server-side application using the `MiddlewareSettings` interface. It shows how to define `matcher` properties to conditionally run middleware based on HTTP methods and URL patterns, exported from a `+middleware.ts` file.

```typescript
import type { MiddlewareSettings } from 'expo-server';

export const unstable_settings: MiddlewareSettings = {
  matcher: {
    methods: ['GET'],
    patterns: ['/api', '/admin/[...path]']
  }
};

```

--------------------------------

### TestFlight Full Distribution Workflow YAML

Source: https://docs.expo.dev/eas/workflows/pre-packaged-jobs

Complete workflow example that builds an iOS app and distributes it to both internal and external TestFlight groups with changelog notes. This demonstrates a multi-job workflow where the testflight job depends on the build_ios job output.

```yaml
name: TestFlight Distribution

jobs:
  build_ios:
    name: Build iOS
    type: build
    params:
      platform: ios
      profile: production

  testflight:
    name: Distribute to TestFlight
    type: testflight
    needs: [build_ios]
    params:
      build_id: ${{ needs.build_ios.outputs.build_id }}
      internal_groups: ['QA Team']
      external_groups: ['Public Beta']
      changelog: |
        What's new in this release:
        - New features
        - Bug fixes
```

--------------------------------

### Basic Expo UI Picker Component Usage

Source: https://docs.expo.dev/versions/unversioned/sdk/ui/swift-ui/picker

A minimal example showing the `Picker` component from `@expo/ui/swift-ui`. It illustrates how to define selectable options by nesting `Text` components and applying the `tag` modifier to each option.

```typescript
<Picker modifiers={[pickerStyle('segmented')]}>
  <Text modifiers={[tag('option1')]}>Option 1</Text>
  <Text modifiers={[tag(0)]}>Option 3</Text>
</Picker>
```

--------------------------------

### Implement Dynamic App Name and Identifier Getters in app.config.js

Source: https://docs.expo.dev/tutorial/eas/multiple-app-variants

This JavaScript snippet provides `getUniqueIdentifier()` and `getAppName()` functions in `app.config.js`. These functions dynamically return variant-specific bundle identifiers, package names, and app display names based on the `IS_DEV` and `IS_PREVIEW` flags, enabling multiple installations of the app on a single device.

```javascript
const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.yourname.stickersmash.dev';
  }

  if (IS_PREVIEW) {
    return 'com.yourname.stickersmash.preview';
  }

  return 'com.yourname.stickersmash';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'StickerSmash (Dev)';
  }

  if (IS_PREVIEW) {
    return 'StickerSmash (Preview)';
  }

  return 'StickerSmash: Emoji Stickers';
};
```

--------------------------------

### Install Expo Cellular Library

Source: https://docs.expo.dev/versions/latest/sdk/cellular

Install the expo-cellular package using npm and Expo CLI. This command automatically adds the library to your project dependencies. Required for accessing cellular provider information on mobile devices.

```bash
npx expo install expo-cellular
```

--------------------------------

### Login to Firebase CLI

Source: https://docs.expo.dev/archive/publishing-websites-webpack

This command authenticates the Firebase CLI with your Google account, allowing it to interact with your Firebase projects. Run this after installing the Firebase CLI.

```Terminal
firebase login
```

--------------------------------

### Install Expo AuthSession and Crypto Dependencies

Source: https://docs.expo.dev/versions/latest/sdk/auth-session

Install expo-auth-session and its peer dependency expo-crypto using the Expo CLI. Both packages are required for browser-based authentication functionality in your React Native or Expo project.

```bash
npx expo install expo-auth-session expo-crypto
```

--------------------------------

### Define WiFi DPP Configurator ActivityAction Constants

Source: https://docs.expo.dev/versions/latest/sdk/intent-launcher

ActivityAction constants for WiFi Direct Protected Setup (DPP) configurator operations. These actions enable launching QR code generation and scanning interfaces for secure WiFi network configuration and authentication.

```java
ActivityAction.WIFI_DPP_CONFIGURATOR_AUTH_QR_CODE_GENERATOR = "android.settings.WIFI_DPP_CONFIGURATOR_AUTH_QR_CODE_GENERATOR";
ActivityAction.WIFI_DPP_CONFIGURATOR_QR_CODE_GENERATOR = "android.settings.WIFI_DPP_CONFIGURATOR_QR_CODE_GENERATOR";
ActivityAction.WIFI_DPP_CONFIGURATOR_QR_CODE_SCANNER = "android.settings.WIFI_DPP_CONFIGURATOR_QR_CODE_SCANNER";
ActivityAction.WIFI_DPP_ENROLLEE_QR_CODE_SCANNER = "android.settings.WIFI_DPP_ENROLLEE_QR_CODE_SCANNER";
```

--------------------------------

### Deploy web app to EAS Hosting

Source: https://docs.expo.dev/eas/hosting/get-started

Publishes your exported web project to EAS Hosting. On first run, it prompts to connect an EAS project and choose a preview subdomain name. After completion, the CLI outputs a preview URL and link to deployment details on the EAS Dashboard.

```bash
eas deploy
```

--------------------------------

### GET NavigationBar.getVisibilityAsync()

Source: https://docs.expo.dev/versions/v52.0.0/sdk/navigation-bar

Gets the current visibility status of the navigation bar. Returns a promise resolving to the visibility state.

```APIDOC
## GET NavigationBar.getVisibilityAsync()

### Description
Get the navigation bar's visibility.

### Method
Asynchronous Function (GET)

### Endpoint
`NavigationBar.getVisibilityAsync()`

### Parameters
None

### Request Example
```javascript
const visibility = await NavigationBar.getVisibilityAsync();
```

### Response
#### Success Response (Promise<NavigationBarVisibility>)
- **(NavigationBarVisibility)** - Navigation bar's current visibility status. Returns `hidden` on unsupported platforms (iOS, web).

#### Response Example
```javascript
"visible"
```
```

--------------------------------

### Initialize React Native in MainApplication Class - Kotlin

Source: https://docs.expo.dev/brownfield/get-started

Implements the Application class in Kotlin to initialize React Native runtime with Expo module support. Configures ReactApplication interface, loads React Native, sets up package management, and handles application lifecycle events.

```kotlin
package com.example.blankandroid

import android.app.Application
import android.content.res.Configuration
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeApplicationEntryPoint.loadReactNative
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.ReactHost
import com.facebook.react.common.ReleaseLevel
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint
import com.facebook.react.defaults.DefaultReactNativeHost
import expo.modules.ApplicationLifecycleDispatcher
import expo.modules.ReactNativeHostWrapper

class MainApplication : Application(), ReactApplication {
  override fun onCreate() {
    super.onCreate()
    loadReactNative(this)
    ApplicationLifecycleDispatcher.onApplicationCreate(this)
  }
  override val reactNativeHost: ReactNativeHost = ReactNativeHostWrapper(
    this,
    object : DefaultReactNativeHost(this) {
      override fun getPackages(): List<ReactPackage> =
        PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // add(MyReactNativePackage())
        }
      override fun getJSMainModuleName(): String = ".expo/.virtual-metro-entry"
      override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG
      override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
    }
  )

  override val reactHost: ReactHost
    get() = ReactNativeHostWrapper.createReactHost(applicationContext, reactNativeHost)

  override fun onConfigurationChanged(newConfig: Configuration) {
    super.onConfigurationChanged(newConfig)
    ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig)
  }
}
```

--------------------------------

### GET /device/platformFeature

Source: https://docs.expo.dev/versions/latest/sdk/device

Checks if the device has a specific system feature. You can get all available system features with `Device.getSystemFeatureAsync()`. On iOS and web, this method always resolves to `false`.

```APIDOC
## GET /device/platformFeature

### Description
Checks if the device has a specific system feature. You can get all available system features with `Device.getSystemFeatureAsync()`. On iOS and web, this method always resolves to `false`.

### Method
GET

### Endpoint
/device/platformFeature

### Parameters
#### Path Parameters
(None)

#### Query Parameters
- **feature** (string) - Required - The platform-specific name of the feature to check for on the device.

#### Request Body
(None)

### Request Example
{}

### Response
#### Success Response (200)
- **hasFeature** (boolean) - Indicates whether the device has the specified system feature.

#### Response Example
```json
true
```
```

--------------------------------

### Define Maestro Home Screen Test Flow (YAML)

Source: https://docs.expo.dev/eas/workflows/examples/e2e-tests

This Maestro flow launches the app and asserts that 'Welcome!' text is visible on the home screen. It's defined in `.maestro/home.yml` and requires the `appId` to be replaced with your specific application ID.

```yaml
appId: dev.expo.eastestsexample # This is an example app id. Replace it with your app id.
---
- launchApp
- assertVisible: 'Welcome!'
```

--------------------------------

### Expanded EAS Workflow for Custom iOS Maestro Testing

Source: https://docs.expo.dev/custom-builds/schema

This comprehensive YAML configuration outlines an expanded iOS Maestro testing workflow, detailing each step previously abstracted by `eas/maestro_test`. It covers building the application, installing Maestro, launching an iOS simulator, manually installing the `.app` bundle, running Maestro tests, and uploading test artifacts for detailed review.

```yaml
build:
  name: Build and test (iOS, expanded)
  steps:
    - eas/build
    - eas/install_maestro
    - eas/start_ios_simulator
    - run:
        command: |
          # shopt -s nullglob is necessary not to try to install
          # SEARCH_PATH literally if there are no matching files.
          shopt -s nullglob

          SEARCH_PATH="ios/build/Build/Products/*simulator/*.app"
          FILES_FOUND=false

          for APP_PATH in $SEARCH_PATH; do
            FILES_FOUND=true
            echo "Installing \"$APP_PATH\""
            xcrun simctl install booted "$APP_PATH"
          done

          if ! $FILES_FOUND; then
            echo "No files found matching \"$SEARCH_PATH\". Are you sure you've built a Simulator app?"
            exit 1
          fi
    - run:
        command: |
          maestro test maestro/flow.yml
    - eas/upload_artifact:
        name: Upload test artifact
        if: ${ always() }
        inputs:
          type: build-artifact
          path: ${ eas.env.HOME }/.maestro/tests
```

--------------------------------

### Define ActivityAction for Process Wi-Fi Easy Connect URI (Android)

Source: https://docs.expo.dev/versions/latest/sdk/intent-launcher

Defines the `ActivityAction` constant for processing a Wi-Fi Easy Connect URI. This action is used to initiate a Wi-Fi connection using a simplified setup process, often via QR codes.

```javascript
ActivityAction.PROCESS_WIFI_EASY_CONNECT_URI = "android.settings.PROCESS_WIFI_EASY_CONNECT_URI"
```

--------------------------------

### Define custom Jest test scripts in package.json

Source: https://docs.expo.dev/develop/unit-testing

This JSON snippet for `package.json` demonstrates how to define various `scripts` to run Jest with different command-line options. Examples include `test` with watch mode and `changedSince`, `testDebug` for debugging, `testFinal` for a full run, and `updateSnapshots` for updating snapshots.

```json
"scripts": {
  "test": "jest --watch --coverage=false --changedSince=origin/main",
  "testDebug": "jest -o --watch --coverage=false",
  "testFinal": "jest",
  "updateSnapshots": "jest -u --coverage=false"
  ... 
}
```

--------------------------------

### Generate Apple Smart Banner Meta Tag with Expo CLI

Source: https://docs.expo.dev/linking/ios-universal-links

This command utilizes `npx` to execute an Expo CLI utility, `setup-safari`, which automatically generates and configures the necessary meta tag for the Apple Smart Banner in your project, simplifying the setup process.

```terminal
npx setup-safari
```

--------------------------------

### Create Sound Instance (Deprecated)

Source: https://docs.expo.dev/versions/latest/sdk/audio-av

Deprecated method for creating a Sound instance with initial playback status and callbacks. This method is superseded by Sound.createAsync(). It accepts an AVPlaybackSource, optional initial status, optional status update callback, and download preference. Returns a Promise resolving to a SoundObject.

```javascript
// create(source, initialStatus, onPlaybackStatusUpdate, downloadFirst)
// Deprecated: Use Sound.createAsync() instead
// Parameters:
//   source: AVPlaybackSource
//   initialStatus (optional): AVPlaybackStatusToSet
//   onPlaybackStatusUpdate (optional): null | (status: AVPlaybackStatus) => void
//   downloadFirst (optional): boolean
// Returns: Promise<SoundObject>
```

--------------------------------

### Configure iOS Plugin-Specific Permission Messages in app.json

Source: https://docs.expo.dev/guides/permissions

This example shows how to configure specific permission messages directly through a plugin's properties, such as `expo-media-library`. This allows for more granular control over messages like `photosPermission` and `savePhotosPermission` within the `plugins` array in `app.json`.

```json
{
  "plugins": [
    [
      "expo-media-library",
      {
        "photosPermission": "Allow $(PRODUCT_NAME) to access your photos.",
        "savePhotosPermission": "Allow $(PRODUCT_NAME) to save photos."
      }
    ]
  ]
}
```

--------------------------------

### Export Theme Management Utility Functions (TypeScript)

Source: https://docs.expo.dev/modules/native-module-tutorial

This TypeScript file provides utility functions that wrap the core functionality of the `ExpoSettingsModule`. It exports `addThemeListener` for subscribing to theme changes, `getTheme` to retrieve the current theme, and `setTheme` to update the theme. These functions offer a convenient and type-safe API for consuming the theme management features within an Expo application.

```typescript
import { EventSubscription } from 'expo-modules-core';

import ExpoSettingsModule from './ExpoSettingsModule';

import { Theme, ThemeChangeEvent } from './ExpoSettings.types';

export function addThemeListener(listener: (event: ThemeChangeEvent) => void): EventSubscription {
  return ExpoSettingsModule.addListener('onChangeTheme', listener);
}

export function getTheme(): Theme {
  return ExpoSettingsModule.getTheme();
}

export function setTheme(theme: Theme): void {
  return ExpoSettingsModule.setTheme(theme);
}
```

--------------------------------

### GET / (Access Request Metadata)

Source: https://docs.expo.dev/versions/latest/sdk/server

Demonstrates how to create a GET API route in Expo Router using `expo-server` to access request metadata such as the environment and origin. It returns a JSON object indicating the production/staging status and the request's origin.

```APIDOC
## GET /

### Description
This example demonstrates how to create a GET API route in Expo Router using `expo-server` to access request metadata such as the environment and origin. It returns a JSON object indicating the production/staging status and the request's origin.

### Method
GET

### Endpoint
`/

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
N/A (GET request, no explicit body)

### Response
#### Success Response (200)
- **isProduction** (boolean) - Indicates if the environment is production (null).
- **isStaging** (boolean) - Indicates if the environment is staging.
- **origin** (string | null) - The origin URL of the request.

#### Response Example
```json
{
  "isProduction": true,
  "isStaging": false,
  "origin": "https://example.com"
}
```
```

--------------------------------

### RecordingOptions Object

Source: https://docs.expo.dev/versions/v53.0.0/sdk/audio-av

The `RecordingOptions` object defines various settings for audio recording, including platform-specific configurations and general recording parameters. It is passed to `prepareToRecordAsync()` to customize recording behavior.

```APIDOC
## RecordingOptions Object

### Description
The `RecordingOptions` object defines various settings for audio recording, including platform-specific configurations and general recording parameters. It is passed to `prepareToRecordAsync()` to customize recording behavior.

### Method
Object Definition

### Parameters
#### Request Body
- **android** (`RecordingOptionsAndroid`) - Recording options specific to the Android platform.
- **ios** (`RecordingOptionsIOS`) - Recording options specific to the iOS platform.
- **isMeteringEnabled** (`boolean`) - Optional - A boolean that determines whether audio level information will be part of the status object under the "metering" key.
- **keepAudioActiveHint** (`boolean`) - Optional - A boolean that hints to keep the audio active after `prepareToRecordAsync` completes. Setting this value can improve the speed at which the recording starts. Only set this value to `true` when you call `startAsync` immediately after `prepareToRecordAsync`. This value is automatically set when using `Audio.recording.createAsync()`.
- **web** (`RecordingOptionsWeb`) - Recording options specific to the Web platform.
```

--------------------------------

### Execute SQL Prepared Statements in Expo SQLite with TypeScript

Source: https://docs.expo.dev/versions/v52.0.0/sdk/sqlite

This example demonstrates creating, executing, and finalizing prepared statements for both INSERT and SELECT operations using `db.prepareAsync()` and `statement.executeAsync()`. It shows how to retrieve single (`getFirstAsync`), multiple (`getAllAsync`), and iterate results, emphasizing resource cleanup with `finalizeAsync` in a `try-finally` block.

```typescript
const statement = await db.prepareAsync(
  'INSERT INTO test (value, intValue) VALUES ($value, $intValue)'
);
try {
  let result = await statement.executeAsync({ $value: 'bbb', $intValue: 101 });
  console.log('bbb and 101:', result.lastInsertRowId, result.changes);

  result = await statement.executeAsync({ $value: 'ccc', $intValue: 102 });
  console.log('ccc and 102:', result.lastInsertRowId, result.changes);

  result = await statement.executeAsync({ $value: 'ddd', $intValue: 103 });
  console.log('ddd and 103:', result.lastInsertRowId, result.changes);
} finally {
  await statement.finalizeAsync();
}

const statement2 = await db.prepareAsync('SELECT * FROM test WHERE intValue >= $intValue');
try {
  const result = await statement2.executeAsync<{ value: string; intValue: number }> ({
    $intValue: 100,
  });

  // `getFirstAsync()` is useful when you want to get a single row from the database.
  const firstRow = await result.getFirstAsync();
  console.log(firstRow.id, firstRow.value, firstRow.intValue);

  // Reset the SQLite query cursor to the beginning for the next `getAllAsync()` call.
  await result.resetAsync();

  // `getAllAsync()` is useful when you want to get all results as an array of objects.
  const allRows = await result.getAllAsync();
  for (const row of allRows) {
    console.log(row.value, row.intValue);
  }

  // Reset the SQLite query cursor to the beginning for the next `for-await-of` loop.
  await result.resetAsync();

  // The result object is also an async iterable. You can use it in `for-await-of` loop to iterate SQLite query cursor.
  for await (const row of result) {
    console.log(row.value, row.intValue);
  }
} finally {
  await statement2.finalizeAsync();
}
```

--------------------------------

### Configuration Option: `steps[].run.inputs`

Source: https://docs.expo.dev/custom-builds/schema

Provides input values to a build step, allowing its commands to access and utilize these predefined parameters.

```APIDOC
## Configuration Option: `steps[].run.inputs`

### Description
The `inputs` property defines a collection of key-value pairs that serve as input parameters for a specific step. These inputs can be referenced within the step's `command` using template syntax like `${ inputs.name }`.

### Method
N/A (Build Configuration)

### Endpoint
`steps[].run.inputs`

### Parameters
#### Property
- **[key]** (string) - Required - A key-value pair where the key is the input parameter's name and the value is its string content.

### Request Example
```yaml
build:
  name: Demo
  steps:
    - run:
        name: Say Hi
        inputs:
          name: Expo
        command: echo "Hi, ${ inputs.name }!"
```

### Response
#### Effect
- The provided input values are made available within the step's command execution context, accessible via the `inputs` object.
```

--------------------------------

### Use APP_VARIANT Environment Variable in app.config.js for App Configuration

Source: https://docs.expo.dev/eas/environment-variables_redirected=

Shows how to use non-prefixed environment variables like APP_VARIANT in app.config.js to dynamically configure app properties based on build variants. The example conditionally sets the app name, bundle identifier, and package name for development, preview, and production variants. This enables variant-specific configuration without exposing sensitive data.

```javascript
const IS_DEV = process.env.APP_VARIANT === 'development';
const IS_PREVIEW = process.env.APP_VARIANT === 'preview';

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.yourname.stickersmash.dev';
  }

  if (IS_PREVIEW) {
    return 'com.yourname.stickersmash.preview';
  }

  return 'com.yourname.stickersmash';
};

const getAppName = () => {
  if (IS_DEV) {
    return 'StickerSmash (Dev)';
  }

  if (IS_PREVIEW) {
    return 'StickerSmash (Preview)';
  }

  return 'StickerSmash: Emoji Stickers';
};

export default {
  name: getAppName(),
  %%placeholder-start%%... %%placeholder-end%%
  ios: {
    bundleIdentifier: getUniqueIdentifier(),
    %%placeholder-start%%... %%placeholder-end%%
  },
  android: {
    package: getUniqueIdentifier(),
    %%placeholder-start%%... %%placeholder-end%%
  },
};
```

--------------------------------

### Asset Response Headers Example

Source: https://docs.expo.dev/archive/technical-specs/expo-updates-0

Example HTTP response headers for asset delivery. Includes Content-Encoding header specifying compression format (Brotli), Content-Type header with asset MIME type, and Cache-Control header set for long-duration caching. Assets at a given URL must not change, so immutable cache directives are recommended.

```http
content-encoding: br
content-type: application/javascript
```

```http
cache-control: public, max-age=31536000, immutable
```

--------------------------------

### Read Custom API Key in Expo Native Module (Android & iOS)

Source: https://docs.expo.dev/modules/config-plugin-and-native-module-tutorial

This snippet provides platform-specific code for reading a custom API key, 'MY_CUSTOM_API_KEY', from native configuration files within an Expo native module. The Android example uses Kotlin to read from AndroidManifest.xml, while the iOS example uses Swift to read from Info.plist.

```kotlin
package expo.modules.nativeconfiguration

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.content.pm.PackageManager

class ExpoNativeConfigurationModule() : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoNativeConfiguration")

    Function("getApiKey") {
      val applicationInfo = appContext?.reactContext?.packageManager?.getApplicationInfo(appContext?.reactContext?.packageName.toString(), PackageManager.GET_META_DATA)

      return@Function applicationInfo?.metaData?.getString("MY_CUSTOM_API_KEY")
    }
  }
}
```

```swift
import ExpoModulesCore

public class ExpoNativeConfigurationModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoNativeConfiguration")

    Function("getApiKey") {
     return Bundle.main.object(forInfoDictionaryKey: "MY_CUSTOM_API_KEY") as? String
    }
  }
}
```

--------------------------------

### Install EAS Build Cache Provider Package

Source: https://docs.expo.dev/guides/cache-builds-remotely

Install the `eas-build-cache-provider` package as a developer dependency to enable EAS build caching in your Expo project.

```Terminal
npx expo install eas-build-cache-provider --dev
```

```Terminal
npx expo install eas-build-cache-provider "--" --dev
```

--------------------------------

### Integrate Expo Config Plugin in Dynamic App Config

Source: https://docs.expo.dev/config-plugins/plugins

This example shows how to include a custom config plugin (`./plugins/withPlugin.ts`) in the `plugins` array of your `app.config.ts` file. This tells Expo to apply the custom logic defined in the plugin during the prebuild process, extending native configurations.

```typescript
import "tsx/cjs";
import { ExpoConfig } from "expo/config";

module.exports = ({ config }: { config: ExpoConfig }) => {
  ... rest of your app config 
  plugins: [
      ["./plugins/withPlugin.ts"],
    ],
};

```

--------------------------------

### Configure expo-dev-client in app.json with config plugin

Source: https://docs.expo.dev/versions/latest/sdk/dev-client

Configure the development client launcher settings using the built-in config plugin in app.json. This example sets the launchMode to 'most-recent' to launch the most recently opened project. Requires Continuous Native Generation (CNG) to be enabled.

```json
{
  "expo": {
    "plugins": [
      [
        "expo-dev-client",
        {
          "launchMode": "most-recent"
        }
      ]
    ]
  }
}
```
### NativewindUI Project Build and Run Commands

Source: https://nativewindui.com/installation/manual

Instructions for building and running a React Native project that uses NativewindUI. It requires a custom development client and provides the necessary commands for prebuilding the project and starting the development server.

```bash
npx expo prebuild --clean

```

```bash
npm run start

```

--------------------------------

### NativewindUI React Native Usage Example

Source: https://nativewindui.com/installation/manual

This snippet demonstrates the integration of NativewindUI with React Native components, specifically using FlashList for displaying a list of components. It includes custom styling, hooks for layout and navigation, and utility functions for rendering list items.

```tsx
import {
  useHeaderHeight,
} from'@react-navigation/elements';
import { Icon } from'@roninoss/icons';
import { FlashList } from'@shopify/flash-list';
import { cssInterop } from'nativewind';
import * as React from'react';
import {
  Linking,
  useWindowDimensions,
  View,
} from'react-native';
import { useSafeAreaInsets } from'react-native-safe-area-context';
import { Text } from'~/components/nativewindui/Text';
import { useColorScheme } from'~/lib/useColorScheme';

cssInterop(FlashList, {
  className: 'style',
  contentContainerClassName: 'contentContainerStyle',
});

exportdefaultfunctionScreen() {
  return (
    <FlashList
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      data={COMPONENTS}
      estimatedItemSize={200}
      contentContainerClassName="py-4"
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={renderItemSeparator}
      renderItem={renderItem}
      ListEmptyComponent={COMPONENTS.length === 0 ? ListEmptyComponent : undefined}
    />
  );
}

functionListEmptyComponent() {
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const { colors } = useColorScheme();
  const height = dimensions.height - headerHeight - insets.bottom - insets.top;

  return (
    <Viewstyle={{ height }} className="flex-1 items-center justify-center gap-1 px-12">
      <Iconname="file-plus-outline"size={42}color={colors.grey} />
      <Textvariant="title3"className="pb-1 text-center font-semibold">
        No Components Installed
      </Text>
      <Textcolor="tertiary"variant="subhead"className="pb-4 text-center">
        You can install any of the free components from the{' '}
        <TextonPress={() => Linking.openURL('https://nativewindui.com')}
          variant="subhead"
          className="text-primary">
          NativewindUI
        </Text>
        {' website.'}
      </Text>
    </View>
  );
}

type ComponentItem = { name: string; component: React.FC };

functionkeyExtractor(item: ComponentItem) {
  return item.name;
}

functionrenderItemSeparator() {
  return <ViewclassName="p-2" />;
}

functionrenderItem({ item }: { item: ComponentItem }) {
  return (
    <Cardtitle={item.name}><item.component /></Card>
  );
}

functionCard({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <ViewclassName="px-4">
      <ViewclassName="gap-4 rounded-xl border border-border bg-card p-4 pb-6 shadow-sm shadow-black/10 dark:shadow-none">
        <TextclassName="text-center text-sm font-medium tracking-wider opacity-60">{title}</Text>
        {children}
      </View>
    </View>
  );
}

const COMPONENTS: ComponentItem[] = [];

```

--------------------------------

### Install NativewindUI Dependencies

Source: https://nativewindui.com/installation/manual

Installs the necessary NativewindUI dependencies and related libraries for an Expo project using Expo Router. Requires npx and Expo CLI.

```bash
npx expo install nativewind react-native-reanimated tailwindcss@^3.4.0 prettier-plugin-tailwindcss @roninoss/icons @shopify/flash-list class-variance-authority clsx expo-dev-client tailwind-merge expo-navigation-bar
```

--------------------------------

### TypeScript Environment for NativeWind

Source: https://nativewindui.com/installation/manual

Adds TypeScript environment definitions for NativeWind to ensure proper type checking and autocompletion for NativeWind-specific types.

```typescript
/// <reference types="nativewind/types" />
```

--------------------------------

### NativewindUI Text Component Installation

Source: https://nativewindui.com/component/text

Instructions for installing the NativewindUI Text component, including manual installation steps and adding necessary dependencies.

```bash
npx nwui-cli@latest add text
```

```bash
npx expo install react-native-uitextview
```

--------------------------------

### NativewindUI Progress Indicator Installation

Source: https://nativewindui.com/component/progress-indicator

Instructions for installing the Progress Indicator component using the NativeWindUI CLI.

```bash
npx nwui-cli@latest add progress-indicator
```

--------------------------------

### Expo TypeScript Environment

Source: https://nativewindui.com/installation/manual

Includes the necessary TypeScript environment reference for Expo projects. This file should typically be ignored by version control.

```typescript
/// <reference types="expo/types" />// NOTE: This file should not be edited and should be in your git ignore
```

--------------------------------

### Install NativewindUI Activity Indicator

Source: https://nativewindui.com/component/activity-indicator

Instructions for manually installing the Activity Indicator component using the NativewindUI CLI.

```bash
npx nwui-cli@latest add activity-indicator
```

--------------------------------

### NativewindUI Picker Installation

Source: https://nativewindui.com/component/picker

Instructions for installing the NativewindUI Picker component. This involves using an npx command to add the component and installing necessary dependencies.

```bash
npx nwui-cli@latest add picker
npx expo install @react-native-picker/picker
```

--------------------------------

### Initialize Tailwind CSS

Source: https://nativewindui.com/installation/manual

Initializes Tailwind CSS in your Expo project by creating a `tailwind.config.js` file. This command should be run in the root of your project.

```bash
npx tailwindcss init
```

--------------------------------

### NativewindUI Date Picker Installation

Source: https://nativewindui.com/component/date-picker

Instructions for installing the NativewindUI Date Picker component using the command line interface and adding necessary dependencies.

```bash
npx nwui-cli@latest add date-picker
```

```bash
npx expo install @react-native-community/datetimepicker
```

--------------------------------

### Global CSS with Tailwind Directives and Color Variables

Source: https://nativewindui.com/installation/manual

Sets up the `global.css` file with essential Tailwind directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`) and defines CSS variables for color schemes, including platform-specific overrides for iOS and Android, and supports dark mode.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
@layer base {
:root {
    --background: 242242247;
    --foreground: 000;
    --card: 255255255;
    --card-foreground: 82830;
    --popover: 230230235;
    --popover-foreground: 000;
    --primary: 0123254;
    --primary-foreground: 255255255;
    --secondary: 45175231;
    --secondary-foreground: 255255255;
    --destructive: 2555643;
    --destructive-foreground: 255255255;
    --muted: 175176180;
    --muted-foreground: 142142147;
    --accent: 2554084;
    --accent-foreground: 255255255;
    --popover: 230230235;
    --popover-foreground: 000;
    --primary: 0123254;
    --primary-foreground: 255255255;
    --secondary: 45175231;
    --secondary-foreground: 255255255;
    --destructive: 2555643;
    --destructive-foreground: 255255255;
    --muted: 175176180;
    --muted-foreground: 142142147;
    --accent: 2554084;
    --accent-foreground: 255255255;
    --popover: 230230235;
    --popover-foreground: 000;
    --card: 255255255;
    --card-foreground: 82830;
    --border: 230230235;
    --input: 210210215;
    --ring: 230230235;
    --android-background: 249249255;
    --android-foreground: 000;
    --android-card: 255255255;
    --android-card-foreground: 242835;
    --android-popover: 215217228;
    --android-popover-foreground: 000;
    --android-primary: 0112233;
    --android-primary-foreground: 255255255;
    --android-secondary: 176201255;
    --android-secondary-foreground: 2055108;
    --android-muted: 193198215;
    --android-muted-foreground: 657184;
    --android-accent: 16973204;
    --android-accent-foreground: 255255255;
    --android-destructive: 1862626;
    --android-destructive-foreground: 255255255;
    --android-border: 215217228;
    --android-input: 210210215;
    --android-ring: 215217228;
  }
@media (prefers-color-scheme: dark) {
:root {
      --background: 000;
      --foreground: 255255255;
      --card: 212124;
      --card-foreground: 255255255;
      --popover: 404042;
      --popover-foreground: 255255255;
      --primary: 3133255;
      --primary-foreground: 255255255;
      --secondary: 100211254;
      --secondary-foreground: 255255255;
      --muted: 707073;
      --muted-foreground: 142142147;
      --accent: 2555295;
      --accent-foreground: 255255255;
      --destructive: 2546754;
      --destructive-foreground: 255255255;
      --border: 404042;
      --input: 555557;
      --ring: 404042;
      --android-background: 000;
      --android-foreground: 255255255;
      --android-card: 161927;
      --android-card-foreground: 224226237;
      --android-popover: 394250;
      --android-popover-foreground: 224226237;
      --android-primary: 3133255;
      --android-primary-foreground: 255255255;
      --android-secondary: 2860114;
      --android-secondary-foreground: 189209255;
      --android-muted: 216226255;
      --android-muted-foreground: 139144160;
      --android-accent: 830111;
      --android-accent-foreground: 238177255;
      --android-destructive: 147010;
      --android-destructive-foreground: 255255255;
      --android-border: 394250;
      --android-input: 555557;
    }
}
```

--------------------------------

### NativeWindUI Bottom Sheet Installation

Source: https://nativewindui.com/component/bottom-sheet

Provides instructions for installing the NativeWindUI bottom-sheet component, including CLI commands and manual dependency management.

```bash
npx nwui-cli@latest add bottom-sheet
```

```bash
npx expo install @gorhom/bottom-sheet react-native-gesture-handler
```

--------------------------------

### NativeWindUI Badge Component Example

Source: https://nativewindui.com/component/badge

A simple example demonstrating the usage of the NativeWindUI Badge component with a count.

```jsx
<View className="items-center">
  <View><Iconname="bell-outline"color={colors.foreground} /><Badge>6</Badge></View>
</View>
```

--------------------------------

### NativewindUI Button Installation

Source: https://nativewindui.com/component/button

Provides instructions for installing the NativewindUI Button component. This includes using the nwui-cli command to add the button and listing the necessary project dependencies.

```bash
npx nwui-cli@latest add button
```

```bash
npx expo install @rn-primitives/slot
```

--------------------------------

### NativewindUI Slider Installation

Source: https://nativewindui.com/component/slider

Instructions for installing the NativewindUI Slider component. This involves using the CLI to add the component and installing a necessary dependency.

```bash
npx nwui-cli@latest add slider
```

```bash
npx expo install @react-native-community/slider
```

--------------------------------

### NativewindUI Toggle Installation

Source: https://nativewindui.com/component/toggle

Instructions for installing the NativewindUI Toggle component using the command-line interface. This involves running a CLI command to add the component to your project.

```bash
npx nwui-cli@latest add toggle
```

--------------------------------

### Configure Tailwind CSS for NativeWind UI

Source: https://nativewindui.com/installation/manual

Configures the `tailwind.config.js` file for NativeWind UI. It includes setting the content paths to your project's components, applying the NativeWind preset, and defining theme extensions for colors and border widths, including platform-specific color variables.

```javascript
const { hairlineWidth, platformSelect } = require('nativewind/theme');
/** @type {import('tailwindcss').Config}*/module.exports = {
// NOTE: Update this to include the paths to all of your component files.content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
presets: [require('nativewind/preset')],
theme: {
extend: {
colors: {
border: withOpacity('border'),
input: withOpacity('input'),
ring: withOpacity('ring'),
background: withOpacity('background'),
foreground: withOpacity('foreground'),
primary: {
DEFAULT: withOpacity('primary'),
foreground: withOpacity('primary-foreground'),
        },
secondary: {
DEFAULT: withOpacity('secondary'),
foreground: withOpacity('secondary-foreground'),
        },
destructive: {
DEFAULT: withOpacity('destructive'),
foreground: withOpacity('destructive-foreground'),
        },
muted: {
DEFAULT: withOpacity('muted'),
foreground: withOpacity('muted-foreground'),
        },
accent: {
DEFAULT: withOpacity('accent'),
foreground: withOpacity('accent-foreground'),
        },
popover: {
DEFAULT: withOpacity('popover'),
foreground: withOpacity('popover-foreground'),
        },
card: {
DEFAULT: withOpacity('card'),
foreground: withOpacity('card-foreground'),
        },
      },
borderWidth: {
hairline: hairlineWidth(),
      },
    },
  },
plugins: [],
};
functionwithOpacity(variableName) {
return({
 opacityValue
    }) => {
if (opacityValue !== undefined) {
return platformSelect({
ios: `rgb(var(--${variableName}) / ${opacityValue})`,
android: `rgb(var(--android-${variableName}) / ${opacityValue})`,
      });
    }
return platformSelect({
ios: `rgb(var(--${variableName}))`,
android: `rgb(var(--android-${variableName}))`,
    });
  };
}
```

--------------------------------

### Install Ratings Indicator

Source: https://nativewindui.com/component/ratings-indicator

Instructions for installing the NativewindUI ratings indicator component using the command-line interface. It also specifies the necessary dependency to add to your project.

```bash
npx nwui-cli@latest add ratings-indicator
```

```bash
npx expo install expo-store-review
```

--------------------------------

### NativeWind UI Navigation Theme

Source: https://nativewindui.com/installation/manual

Defines theme configurations for React Navigation, providing distinct light and dark themes that utilize the custom color palettes defined in `~/theme/colors.ts`. This ensures consistent styling across the application's navigation.

```ts
import { DefaultTheme, DarkTheme } from'@react-navigation/native';
import { COLORS } from'./colors';
const NAV_THEME = {
light: {
    ...DefaultTheme,
colors: {
background: COLORS.light.background,
border: COLORS.light.grey5,
card: COLORS.light.card,
notification: COLORS.light.destructive,
primary: COLORS.light.primary,
text: COLORS.black,
    },
  },
dark: {
    ...DarkTheme,
colors: {
background: COLORS.dark.background,
border: COLORS.dark.grey5,
card: COLORS.dark.grey6,
notification: COLORS.dark.destructive,
primary: COLORS.dark.primary,
text: COLORS.white,
    },
  },
};
export { NAV_THEME };
```

--------------------------------

### NativeWindUI Integration with React Navigation

Source: https://nativewindui.com/installation/manual

Demonstrates how to set up the root layout for a React Native project using Expo Router and integrate NativeWindUI's theming. It involves wrapping the root navigator with `NavThemeProvider` to apply the correct navigation theme based on the color scheme.

```tsx
import'../global.css';
import'expo-dev-client';
{YOUR_OTHER_IMPORTS}
import { StatusBar } from'expo-status-bar';
import { ThemeProvider as NavThemeProvider } from'@react-navigation/native';
import { useColorScheme, useInitialAndroidBarSync } from'~/lib/useColorScheme';
import { NAV_THEME } from'~/theme';

export { 
// Catch any errors thrown by the Layout component.  ErrorBoundary,
} from'expo-router';

exportdefaultfunctionRootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  return (
    <><StatusBarkey={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
style={isDarkColorScheme ? 'light' : 'dark'}      /><NavThemeProvidervalue={NAV_THEME[colorScheme]}>        {YOUR_ROOT_NAVIGATOR}
</NavThemeProvider></>
  );
}
```

--------------------------------

### Babel Configuration for NativeWind

Source: https://nativewindui.com/installation/manual

Configures Babel to support NativeWind by adding the necessary presets. This allows NativeWind to process Tailwind CSS classes within your React Native components.

```javascript
module.exports = function (api) {
  api.cache(true);
const plugins = [];
  plugins.push('react-native-reanimated/plugin');
return {
presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],
    plugins,
  };
};
```

--------------------------------

### Install NativeWindUI Project

Source: https://nativewindui.com/installation

Scaffold a new Expo project pre-configured with NativeWindUI. This command sets up the project structure and necessary dependencies for using NativeWindUI components.

```bash
npx rn-new@latest --nativewindui --blank
```

--------------------------------

### NativewindUI Progress Indicator Usage Example

Source: https://nativewindui.com/component/progress-indicator

A simple example demonstrating how to import and use the ProgressIndicator component in a React Native application.

```javascript
import { ProgressIndicator } from'~/components/nativewindui/ProgressIndicator';

<ProgressIndicator value={50} />
```

--------------------------------

### Install Keyboard Controller Dependency

Source: https://nativewindui.com/component/adaptive-search-header

This snippet shows the command to install the necessary `react-native-keyboard-controller` dependency for the Adaptive Search Header component.

```bash
npx expo install react-native-keyboard-controller
```

--------------------------------

### NativewindUI Stepper Basic Usage

Source: https://nativewindui.com/component/stepper

A minimal example demonstrating the instantiation of the Stepper component.

```javascript
<Stepper />
```

--------------------------------

### Install Keyboard Controller

Source: https://nativewindui.com/component/context-menu

Installs the react-native-keyboard-controller dependency using npx for Expo projects.

```bash
npx expo install react-native-keyboard-controller
```

--------------------------------

### Metro Configuration for NativeWind

Source: https://nativewindui.com/installation/manual

Configures the Metro bundler to work with NativeWind, specifying the input CSS file and inline rem value. This step is crucial for NativeWind's styling capabilities in Expo projects.

```javascript
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
// eslint-disable-next-line no-undefconst config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, {
input: './global.css',
inlineRem: 16,
});
```

--------------------------------

### NativewindUI Avatar Component Installation (CLI)

Source: https://nativewindui.com/component/avatar

Instructions for installing the NativewindUI Avatar component using the command-line interface (CLI). This command fetches the latest version of the CLI and adds the avatar component to the project.

```bash
npx nwui-cli@latest add avatar
```

--------------------------------

### NativeWindUI Text Component

Source: https://nativewindui.com/installation/manual

Defines a customizable Text component using `cva` for variants and integrates with React Native's Text component. It allows for styling based on predefined variants like size and color, and supports merging with existing class names.

```tsx
import * as React from'react';
import { Text as RNText } from'react-native';
import { cn } from'~/lib/cn';

const textVariants = cva('text-foreground', {
  variants: {
    variant: {
      largeTitle: 'text-4xl',
      title1: 'text-2xl',
      title2: 'text-[22px] leading-7',
      title3: 'text-xl',
      heading: 'text-[17px] leading-6 font-semibold',
      body: 'text-[17px] leading-6',
      callout: 'text-base',
      subhead: 'text-[15px] leading-6',
      footnote: 'text-[13px] leading-5',
      caption1: 'text-xs',
      caption2: 'text-[11px] leading-4',
    },
    color: {
      primary: '',
      secondary: 'text-secondary-foreground/90',
      tertiary: 'text-muted-foreground/90',
      quarternary: 'text-muted-foreground/50',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'primary',
  },
});

const TextClassContext = React.createContext<string | undefined>(undefined);

function Text({
  className,
  variant,
  color,
  ...props
}: React.ComponentPropsWithoutRef<typeof RNText> & VariantProps<typeof textVariants>) {
  const textClassName = React.useContext(TextClassContext);

  return (
    <RNTextclassName={cn(textVariants({ variant, color }), textClassName, className)} {...props} />
  );
}

export { Text, TextClassContext, textVariants };
```

--------------------------------

### NativeWind UI Color Scheme Hook

Source: https://nativewindui.com/installation/manual

Provides a hook to manage the color scheme (light/dark) and synchronize it with the native navigation bar on Android. It uses `nativewind`'s `useColorScheme` and `expo-navigation-bar`.

```tsx
import * as NavigationBar from'expo-navigation-bar';
import { useColorScheme as useNativewindColorScheme } from'nativewind';
import * as React from'react';
import { Platform } from'react-native';
import { COLORS } from'~/theme/colors';
functionuseColorScheme() {
const { colorScheme, setColorScheme: setNativewindColorScheme } = useNativewindColorScheme();
asyncfunctionsetColorScheme(colorScheme: 'light' | 'dark') {
    setNativewindColorScheme(colorScheme);
if (Platform.OS !== 'android') return;
try {
await setNavigationBar(colorScheme);
    } catch (error) {
console.error('useColorScheme.tsx", "setColorScheme', error);
    }
  }
functiontoggleColorScheme() {
return setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  }
return {
colorScheme: colorScheme ?? 'light',
isDarkColorScheme: colorScheme === 'dark',
    setColorScheme,
    toggleColorScheme,
colors: COLORS[colorScheme ?? 'light'],
  };
}
/**
 * Set the Android navigation bar color based on the color scheme.
 */functionuseInitialAndroidBarSync() {
const { colorScheme } = useColorScheme();
  React.useEffect(() => {
if (Platform.OS !== 'android') return;
    setNavigationBar(colorScheme).catch((error) => {
console.error('useColorScheme.tsx", "useInitialColorScheme', error);
    });
  }, []);
}
export { useColorScheme, useInitialAndroidBarSync };
functionsetNavigationBar(colorScheme: 'light' | 'dark') {
returnPromise.all([
    NavigationBar.setButtonStyleAsync(colorScheme === 'dark' ? 'light' : 'dark'),
    NavigationBar.setPositionAsync('absolute'),
    NavigationBar.setBackgroundColorAsync(colorScheme === 'dark' ? '#00000030' : '#ffffff80'),
  ]);
}
```

--------------------------------

### NativeWind UI Color Definitions

Source: https://nativewindui.com/installation/manual

Defines color palettes for both iOS and Android platforms, including various shades of grey, background, foreground, and specific semantic colors like destructive and primary. These colors are used throughout the NativeWind UI.

```ts
import { Platform } from'react-native';
const IOS_SYSTEM_COLORS = {
white: 'rgb(255, 255, 255)',
black: 'rgb(0, 0, 0)',
light: {
grey6: 'rgb(242, 242, 247)',
grey5: 'rgb(230, 230, 235)',
grey4: 'rgb(210, 210, 215)',
grey3: 'rgb(199, 199, 204)',
grey2: 'rgb(175, 176, 180)',
grey: 'rgb(142, 142, 147)',
background: 'rgb(242, 242, 247)',
foreground: 'rgb(0, 0, 0)',
root: 'rgb(255, 255, 255)',
card: 'rgb(255, 255, 255)',
destructive: 'rgb(255, 56, 43)',
primary: 'rgb(0, 123, 254)',
  },
dark: {
grey6: 'rgb(21, 21, 24)',
grey5: 'rgb(40, 40, 42)',
grey4: 'rgb(55, 55, 57)',
grey3: 'rgb(70, 70, 73)',
grey2: 'rgb(99, 99, 102)',
grey: 'rgb(142, 142, 147)',
background: 'rgb(0, 0, 0)',
foreground: 'rgb(255, 255, 255)',
root: 'rgb(0, 0, 0)',
card: 'rgb(21, 21, 24)',
destructive: 'rgb(254, 67, 54)',
primary: 'rgb(3, 133, 255)',
  },
} asconst;
const ANDROID_COLORS = {
white: 'rgb(255, 255, 255)',
black: 'rgb(0, 0, 0)',
light: {
grey6: 'rgb(249, 249, 255)',
grey5: 'rgb(215, 217, 228)',
grey4: 'rgb(193, 198, 215)',
grey3: 'rgb(113, 119, 134)',
grey2: 'rgb(65, 71, 84)',
grey: 'rgb(24, 28, 35)',
background: 'rgb(249, 249, 255)',
foreground: 'rgb(0, 0, 0)',
root: 'rgb(255, 255, 255)',
card: 'rgb(255, 255, 255)',
destructive: 'rgb(186, 26, 26)',
primary: 'rgb(0, 112, 233)',
  },
dark: {
grey6: 'rgb(16, 19, 27)',
grey5: 'rgb(39, 42, 50)',
grey4: 'rgb(49, 53, 61)',
grey3: 'rgb(54, 57, 66)',
grey2: 'rgb(139, 144, 160)',
grey: 'rgb(193, 198, 215)',
background: 'rgb(0, 0, 0)',
foreground: 'rgb(255, 255, 255)',
root: 'rgb(0, 0, 0)',
card: 'rgb(16, 19, 27)',
destructive: 'rgb(147, 0, 10)',
primary: 'rgb(3, 133, 255)',
  },
} asconst;
const COLORS = Platform.OS === 'ios' ? IOS_SYSTEM_COLORS : ANDROID_COLORS;
export { COLORS };
```

--------------------------------

### Form Component Basic Usage

Source: https://nativewindui.com/component/form

This example illustrates the fundamental usage of the `Form`, `FormItem`, and `TextField` components from NativeWindUI within a `ScrollView`. It's a basic setup for collecting user input.

```javascript
import { Form, FormItem, FormSection } from'~/components/nativewindui/Form';
import { TextField } from'~/components/nativewindui/TextField';

<ScrollView contentContainerClassName="p-8">
<Form><FormSection><FormItem><TextFieldplaceholder="First Name" /></FormItem><FormItem><TextFieldplaceholder="Last Name" /></FormItem></FormSection></Form></ScrollView>
```

--------------------------------

### NativewindUI Avatar Component Installation (Expo)

Source: https://nativewindui.com/component/avatar

Instructions for installing the NativewindUI Avatar component as a dependency in an Expo project. This command ensures the necessary package is added to the project's dependencies.

```bash
npx expo install @rn-primitives/avatar
```

--------------------------------

### NativewindUI Action Sheet Installation - CLI Command

Source: https://nativewindui.com/component/action-sheet

Provides the command-line instruction to add the Action Sheet component to your NativewindUI project using the nwui-cli.

```bash
npx nwui-cli@latest add action-sheet
```

--------------------------------

### NativewindUI Action Sheet Installation - Dependency

Source: https://nativewindui.com/component/action-sheet

Instructs on how to add the necessary @expo/react-native-action-sheet dependency to your project using the expo install command.

```bash
npx expo install @expo/react-native-action-sheet
```

--------------------------------

### Segmented Control Usage Example

Source: https://nativewindui.com/component/segmented-control

A basic usage example of the Segmented Control component, showing how to import it and render it with a list of values and an index change handler.

```javascript
import { SegmentedControl } from'~/components/nativewindui/SegmentedControl';

// ...

const [selectedIndex, setSelectedIndex] = React.useState(0);

return (
  <SegmentedControl
    values={['One', 'Two', 'Three', 'Four']}
    selectedIndex={selectedIndex}
    onIndexChange={(index) => {
      setSelectedIndex(index);
    }}
  />
);
```

--------------------------------

### NativeWind UI Class Name Utility

Source: https://nativewindui.com/installation/manual

A utility function `cn` that merges class names using `clsx` and `tailwind-merge`. It's designed to simplify the process of applying Tailwind CSS classes in a React Native environment.

```ts
import { clsx, type ClassValue } from'clsx';
import { twMerge } from'tailwind-merge';
exportfunctioncn(...inputs: ClassValue[]) {
return twMerge(clsx(inputs));
}
```

--------------------------------

### NativewindUI - Get All-Access

Source: https://nativewindui.com/screen/profile-screen

This snippet represents the call to action for obtaining all-access to NativewindUI's pro templates and components, emphasizing faster development with ready-to-use designs.

```HTML
<div class="access-section">
  <h3>Unlock All Pro Templates & Components</h3>
  <p>Elevate your app with powerful, native-feeling components and templates. Build faster with beautiful ready-to-use designs.</p>
  <button>Get all-access</button>
</div>
```

--------------------------------

### iOS Messaging Flow Example

Source: https://nativewindui.com/screen/messaging-flow-ios-style

Demonstrates a collection of screens inspired by the iOS messaging app, offering a native-feeling user experience. This template is part of the Pro offering and requires all-access to use the source code.

```APIDOC
NativewindUI iOS Messaging Flow:
  Description: A collection of screens inspired by the iOS messaging app.
  Style: Native iOS messaging app.
  Requirements: Pro template, requires all-access for source code.
  Usage: Scan QR code to try on device via Companion App.
  Components Included: Authentication Flow, Checkout Flow, Consent Welcome, OTP Screen, Profile Settings (Apple style), Messaging Flow (Apple style).
```

--------------------------------

### NativeWindUI Toolbar Component Example

Source: https://nativewindui.com/component/toolbar

Demonstrates the usage of the NativeWindUI Toolbar component in a React Native application. It showcases different configurations for the left and right views, including icons and call-to-action elements. The example also includes platform-specific styling for iOS.

```javascript
import { Stack } from'expo-router';
import * as React from'react';
import { Platform, ScrollView, View } from'react-native';
import { Button } from'~/components/nativewindui/Button';
import { Text } from'~/components/nativewindui/Text';
import { Toolbar, ToolbarCTA, ToolbarIcon } from'~/components/nativewindui/Toolbar';

export default function ToolbarScreen() {
  const [example, setExample] = React.useState(0);

  return (
    <><Stack.Screen
      options={Platform.select({
        ios: {
          title: 'Toolbar',
          headerTransparent: true,
          headerBlurEffect: 'regular',
        },
        default: {
          title: 'Toolbar',
        },
      })}
    /><ScrollView contentContainerClassName="flex-1">
        <View className="flex-1 items-center justify-center">
          <Button onPress={() => setExample((prev) => (prev === 2 ? 0 : prev + 1))}>
            <Text>Change Example</Text>
          </Button>
        </View>
        <View className="flex-1 items-center justify-center">
          <Text>Example {example}</Text>
        </View>
      </ScrollView>
      {example === 0 && (
        <Toolbar
          className="absolute bottom-0 left-0 right-0"
          leftView={<><ToolbarIcon icon={{ name: 'bookmark-outline' }} /><ToolbarIcon icon={{ name: 'trash-can-outline' }} /></>}
          rightView={<ToolbarCTA icon={{ name: 'pencil-box-outline' }} />}
        />
      )}
      {example === 1 && (
        <Toolbar
          className="absolute bottom-0 left-0 right-0"
          iosHint="Hint for iOS"
          leftView={<ToolbarIcon icon={{ name: 'bookmark-outline' }} />}
          rightView={<ToolbarCTA icon={{ name: 'pencil-box-outline' }} />}
        />
      )}
      {example === 2 && (
        <Toolbar
          className="absolute bottom-0 left-0 right-0"
          iosHint="Hint for iOS"
          rightView={<ToolbarCTA icon={{ name: 'pencil-box-outline' }} />}
        />
      )}
    </>
  );
}
```

--------------------------------

### Install react-native-keyboard-controller

Source: https://nativewindui.com/component/text-field

This command installs the necessary dependency for the NativewindUI Text Field component to function correctly, specifically for managing keyboard behavior.

```bash
npx expo install react-native-keyboard-controller
```

--------------------------------

### Usage Example for Activity Indicator

Source: https://nativewindui.com/component/activity-indicator

A simple import statement showing how to use the Activity Indicator component in your project.

```tsx
import { ActivityIndicator } from'~/components/nativewindui/ActivityIndicator';
```

--------------------------------

### NativeWindUI TextFields Example

Source: https://nativewindui.com/component/text-field

Demonstrates various configurations of TextField components from NativeWindUI within a `KeyboardAwareScrollView`. It includes examples for base text fields, fields with labels, and fields with custom left views, utilizing different material variants.

```javascript
import { Icon } from'@roninoss/icons';
import { Stack } from'expo-router';
import * as React from'react';
import { Platform, View } from'react-native';
import { KeyboardAwareScrollView } from'react-native-keyboard-controller';
import { useSafeAreaInsets } from'react-native-safe-area-context';
import { Button } from'~/components/nativewindui/Button';
import { Form, FormItem, FormSection } from'~/components/nativewindui/Form';
import { TextField } from'~/components/nativewindui/TextField';
import { Text } from'~/components/nativewindui/Text';
import { useColorScheme } from'~/lib/useColorScheme';
exportdefaultfunctionTextFieldsScreen() {
const [materialVariant, setMaterialVariant] = React.useState<'filled' | 'outlined'>('outlined');
const { colors } = useColorScheme();
const insets = useSafeAreaInsets();
return (
<><Stack.Screenoptions={{title: 'TextFields',
headerRight:Platform.select({
ios:undefined,
default: () => (
<Buttonsize="icon"variant="plain"onPress={() =>                  setMaterialVariant((prev) => (prev === 'filled' ? 'outlined' : 'filled'))
                }
              />
            ),
          }),
        }} />
<KeyboardAwareScrollViewbottomOffset={8}keyboardShouldPersistTaps="handled"keyboardDismissMode="interactive"contentContainerStyle={{paddingBottom:insets.bottom }}><FormclassName="px-4 pt-8"><FormSectionios={{title: 'BaseTextfields' }}
footnote="Footnote"
materialIconProps={{name: 'person-outline' }}><FormItem><TextFieldtextContentType="none"
autoComplete="off"
materialVariant={materialVariant}
placeholder="First Name" /></FormItem><FormItem><TextFieldtextContentType="none"
autoComplete="off"
materialVariant={materialVariant}
placeholder="Last Name" /></FormItem><FormItem><TextFieldtextContentType="none"
autoComplete="off"
materialVariant={materialVariant}
placeholder="Username" /></FormItem></FormSection><FormSectionios={{title: 'TEXTFIELDSWITHLABELS' }}
materialIconProps={{name: 'phone-outline' }}><FormItem><TextFieldtextContentType="none"
autoComplete="off"
materialVariant={materialVariant}
label="First Name"
placeholder="Type here..." /></FormItem><FormItem><TextFieldtextContentType="none"
autoComplete="off"
materialVariant={materialVariant}
label="Last Name"
placeholder="Type here..." /></FormItem><FormItem><TextFieldtextContentType="none"
autoComplete="off"
materialVariant={materialVariant}
label="Username"
placeholder="Type here..." /></FormItem></FormSection>
          {Platform.OS === 'ios' && (
<FormSectionios={{title: 'TEXTFIELDSWITHLABELSVARIANT' }}><FormItem><TextFieldtextContentType="none"
autoComplete="off"
materialVariant={materialVariant}
placeholder="Type here..."
leftView={
<ViewclassName="w-28 justify-center pl-2"><Text>First Name</Text></View>
                  }
                />
</FormItem><FormItem><TextFieldtextContentType="none"
autoComplete="off"
materialVariant={materialVariant}
placeholder="Type here..."
leftView={
<ViewclassName="w-28 justify-center pl-2"><Text>Last Name</Text></View>
                  }
                />
</FormItem><FormItem><TextFieldtextContentType="none"
autoComplete="off"
materialVariant={materialVariant}
placeholder="Type here..."
leftView={
<ViewclassName="w-28 justify-center pl-2"><Text>Username</Text></View>
                  }
                />
</FormItem></FormSection>
          )}
<FormSectionios={{title: 'TEXTFIELDSWITHLEFTICON' }}

```

--------------------------------

### NativeWindUI Theme Toggle Component

Source: https://nativewindui.com/installation/manual

Implements a theme toggle button using React Native Reanimated for animations. It allows users to switch between 'light' and 'dark' color schemes and displays a moon or sun icon accordingly. The component uses `LayoutAnimationConfig` and `ZoomInRotate` for visual feedback on theme changes.

```tsx
import { Icon } from'@roninoss/icons';
import { Pressable, View } from'react-native';
import Animated, { LayoutAnimationConfig, ZoomInRotate } from'react-native-reanimated';
import { cn } from'~/lib/cn';
import { useColorScheme } from'~/lib/useColorScheme';
import { COLORS } from'~/theme/colors';

exportfunction ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <LayoutAnimationConfigskipEntering><Animated.ViewclassName="items-center justify-center"key={"toggle-" + colorScheme}
entering={ZoomInRotate}><PressableonPress={() => {
            setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
          }}
          className="opacity-80">
          {colorScheme === 'dark'
            ? ({ pressed }) => (
<ViewclassName={cn('px-0.5', pressed && 'opacity-50')}><IconnamingScheme="sfSymbol"name="moon.stars"color={COLORS.white} /></View>              )
            : ({ pressed }) => (
<ViewclassName={cn('px-0.5', pressed && 'opacity-50')}><IconnamingScheme="sfSymbol"name="sun.min"color={COLORS.black} /></View>              )}
</Pressable></Animated.View></LayoutAnimationConfig>
  );
}
```

--------------------------------

### NativewindUI Text Component Screen Example

Source: https://nativewindui.com/component/text

An example of integrating the NativewindUI Text component within an Expo Router screen, demonstrating various text variants and styling options.

```typescript
import { Icon } from'@roninoss/icons';
import { Stack } from'expo-router';
import { View, ScrollView, Pressable } from'react-native';
import { Text } from'~/components/nativewindui/Text';
import { useColorScheme } from'~/lib/useColorScheme';

export default function TextScreen() {
  const { colors } = useColorScheme();
  return (
    <><Stack.Screenoptions={{title: 'NativewindUI',
headerSearchBarOptions: {
hideWhenScrolling:false,
          },
headerLargeTitle:true,
headerRight() {
return (
              <PressableclassName="opacity-80 active:opacity-40"><ViewclassName="opacity-90"><Iconname="cog-outline"color={colors.foreground} /></View></Pressable>
            );
          },
        }} />
<ScrollViewcontentInsetAdjustmentBehavior="automatic"className="p-4"><ViewclassName="border-border bg-card gap-4 rounded-xl border p-4 pb-6 shadow-sm shadow-black/10 dark:shadow-none"><TextclassName="text-foreground text-center text-sm font-medium tracking-wider opacity-60">
            Text
</Text><ViewclassName="gap-2"><Textvariant="largeTitle"className="text-center">
              Large Title
</Text><Textvariant="title1"className="text-center">
              Title 1
</Text><Textvariant="title2"className="text-center">
              Title 2
</Text><Textvariant="title3"className="text-center">
              Title 3
</Text><Textvariant="heading"className="text-center">
              Heading
</Text><Textvariant="body"className="text-center">
              Body
</Text><Textvariant="callout"className="text-center">
              Callout
</Text><Textvariant="subhead"className="text-center">
              Subhead
</Text><Textvariant="footnote"className="text-center">
              Footnote
</Text><Textvariant="caption1"className="text-center">
              Caption 1
</Text><Textvariant="caption2"className="text-center">
              Caption 2
</Text></View></View></ScrollView></>
  );
}

```

--------------------------------

### NativewindUI Avatar Component Usage Example

Source: https://nativewindui.com/component/avatar

A practical example of how to implement the NativewindUI Avatar component in a React Native application. It shows the import statement and the JSX structure for rendering an avatar with an image and fallback text.

```typescript
import { Avatar, AvatarFallback, AvatarImage } from'~/components/nativewindui/Avatar';

<Avatar alt="NativewindUI Avatar">
  <AvatarImagesource={{uri: 'https://pbs.twimg.com/profile_images/1782428433898708992/1voyv4_A_400x400.jpg',
    }}
  /><AvatarFallback><TextclassName="text-foreground">NUI</Text></AvatarFallback></Avatar>

```

--------------------------------

### NativeWindUI Large Title Header Example

Source: https://nativewindui.com/component/large-title-header

Demonstrates the usage of the NativeWindUI Large Title Header component, including its title, search bar integration, and interactive elements.

```typescript
import { Icon } from'@roninoss/icons';
import * as React from'react';
import { Platform, View } from'react-native';
import { KeyboardAwareScrollView } from'react-native-keyboard-controller';
import Animated, { FadeIn, LinearTransition, ZoomOut } from'react-native-reanimated';
import { Button } from'~/components/nativewindui/Button';
import { LargeTitleHeader } from'~/components/nativewindui/LargeTitleHeader';
import { LargeTitleSearchBarRef } from'~/components/nativewindui/LargeTitleHeader/types';
import { Text } from'~/components/nativewindui/Text';
import { useColorScheme } from'~/lib/useColorScheme';
exportdefaultfunctionLargeTitleHeaderScreen() {
const { colors } = useColorScheme();
const searchBarRef = React.useRef<LargeTitleSearchBarRef>(null);
const [materialPreset, setMaterialPreset] = React.useState<'stack' | 'inline'>('stack');
return (
<><LargeTitleHeadertitle="Large title"materialPreset={materialPreset}
rightView={() => (
<Buttonvariant="plain"size="icon"><Iconsize={24}name="account-circle-outline"color={colors.foreground} /></Button>        )}
        searchBar={{
          ref: searchBarRef,
          onChangeText: (text) => {
            console.log(text);
          },
          materialRightView() {
            return (
<Animated.Viewentering={FadeIn}exiting={ZoomOut}><Buttonvariant="plain"size="icon"><Iconsize={24}name="cog-outline"color={colors.foreground} /></Button></Animated.View>            );
          },
          content: (
<KeyboardAwareScrollViewclassName="ios:bg-background/95"contentContainerClassName="flex-1"keyboardShouldPersistTaps="always"><ViewclassName="flex-1 items-center justify-center"><Text>Search bar content</Text></View></KeyboardAwareScrollView>          ),
        }}
      />
<Animated.ScrollViewlayout={LinearTransition}contentInsetAdjustmentBehavior="automatic"contentContainerClassName="flex-1 py-10 px-4 gap-12"><ButtononPress={() => {
            searchBarRef.current?.focus();
          }}>
<Text>Focus input</Text></Button>        {Platform.OS !== 'ios' && (
<Buttonvariant={materialPreset === 'inline' ? 'secondary' : 'tonal'}
onPress={() => {
              setMaterialPreset((prev) => (prev === 'inline' ? 'stack' : 'inline'));
            }}>
<Text>Switch to {materialPreset === 'inline' ? 'stack' : 'inline'}</Text></Button>        )}
</Animated.ScrollView></>  );
}
```

--------------------------------

### NativeWindUI Toolbar Basic Structure

Source: https://nativewindui.com/component/toolbar

Provides a basic example of how to structure the NativeWindUI Toolbar component with left and right views containing icons and a call-to-action element.

```javascript
<Toolbar
  className="absolute bottom-0 left-0 right-0"
  leftView={<ToolbarIconicon={{name: 'bookmark-outline' }} />}
  rightView={<ToolbarCTAicon={{name: 'pencil-box-outline' }} />}
/>
```

--------------------------------

### NativewindUI Date Picker Screen Example

Source: https://nativewindui.com/component/date-picker

An example screen component demonstrating the integration of the NativewindUI DatePicker within a React Native application using expo-router. It includes header configurations and basic layout.

```javascript
import { Icon } from'@roninoss/icons';
import { Stack } from'expo-router';
import * as React from'react';
import { View, Text, ScrollView, Pressable } from'react-native';
import { DatePicker } from'~/components/nativewindui/DatePicker';
import { useColorScheme } from'~/lib/useColorScheme';

exportdefaultfunction DatePickerScreen() {
  const [date, setDate] = React.useState(new Date());
  const { colors } = useColorScheme();

  return (
    <><Stack.Screen
      options={{
        title: 'NativewindUI',
        headerSearchBarOptions: {
          hideWhenScrolling: false,
        },
        headerLargeTitle: true,
        headerRight() {
          return (
            <Pressable className="opacity-80 active:opacity-40">
              <View className="opacity-90"><Icon name="cog-outline" color={colors.foreground} /></View>
            </Pressable>
          );
        },
      }} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        className="p-4"
      >
        <View className="border-border bg-card gap-4 rounded-xl border p-4 pb-6 shadow-sm shadow-black/10 dark:shadow-none">
          <Text className="text-foreground text-center text-sm font-medium tracking-wider opacity-60">
            Date Picker
          </Text>
          <View className="items-center">
            <DatePicker
              value={date}
              mode="datetime"
              onChange={(ev) => {
                setDate(new Date(ev.nativeEvent.timestamp));
              }}
            />
          </View>
        </View>
      </ScrollView></>
  );
}
```

--------------------------------

### NativeWindUI List Component Example

Source: https://nativewindui.com/component/list

Demonstrates how to use the NativeWindUI List component with data, estimated item size, and custom render functions for list items and section headers. Includes a key extractor for efficient rendering.

```typescript
import { ListRenderItemInfo } from'@shopify/flash-list';
import { Stack } from'expo-router';
import { View } from'react-native';
import { Text } from'~/components/nativewindui/Text';
import { ESTIMATED_ITEM_HEIGHT, List, ListDataItem, ListItem, ListSectionHeader } from'~/components/nativewindui/List';

exportdefaultfunctionListScreen() {
  return (
    <><Stack.Screenoptions={{title: 'Insets' }} /><Listvariant="insets"data={DATA}
      estimatedItemSize={ESTIMATED_ITEM_HEIGHT.titleOnly}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    /></>
  );
}

functionrenderItem<TextendsListDataItem>(info: ListRenderItemInfo<T>) {
  if (typeof info.item === 'string') {
    return<ListSectionHeader {...info} />;
  }
  return (
    <ListItem
      leftView={
        <ViewclassName="flex-1 justify-center px-4">
          <ViewclassName="aspect-square h-8 rounded bg-red-500" />
        </View>
      }
      rightView={
        <ViewclassName="flex-1 justify-center px-4">
          <Textvariant="caption1"className="ios:px-0 text-muted-foreground px-2">
            100+
          </Text>
        </View>
      }
      {...info}
      onPress={() => console.log('onPress')}
    />
  );
}

functionkeyExtractor(item: (Omit<ListDataItem, string> & { id: string }) | string) {
  return typeof item === 'string' ? item : item.id;
}

const DATA = [
  'Header',
  {
    id: '1',
    title: 'Hello',
    subTitle: 'World',
  },
  {
    id: '2',
    title: 'Hello',
    subTitle: 'World',
  },
  {
    id: '3',
    title: 'Hello',
    subTitle: 'World',
  },
  {
    id: '4',
    title: 'Hello',
    subTitle: 'World',
  },
  'Header 2',
  {
    id: '5',
    title: 'Hello',
    subTitle: 'World',
  },
  {
    id: '6',
    title: 'Hello',
    subTitle: 'World',
  },
  {
    id: '7',
    title: 'Hello',
    subTitle: 'World',
  },
  {
    id: '8',
    title: 'Hello',
    subTitle: 'World',
  },
  'Header 3',
  {
    id: '9',
    title: 'Hello',
    subTitle: 'World',
  },
  {
    id: '10',
    title: 'Hello',
    subTitle: 'World',
  },
  {
    id: '11',
    title: 'Hello',
    subTitle: 'World',
  },
  {
    id: '12',
    title: 'Hello',
    subTitle: 'World',
  },
];
```

--------------------------------

### Android Messaging Flow Example

Source: https://nativewindui.com/screen/messaging-flow-ios-style

Showcases a collection of screens inspired by the Android messaging app, providing a native-feeling user experience. This template is part of the Pro offering and requires all-access to use the source code.

```APIDOC
NativewindUI Android Messaging Flow:
  Description: A collection of screens inspired by the Android messaging app.
  Style: Native Android messaging app.
  Requirements: Pro template, requires all-access for source code.
  Usage: Scan QR code to try on device via Companion App.
  Components Included: Authentication Flow, Checkout Flow, Consent Welcome, OTP Screen, Profile Settings (Android style), Messaging Flow (Android style).
```

--------------------------------

### Basic ContextMenu Usage

Source: https://nativewindui.com/component/context-menu

A simple example demonstrating how to use the ContextMenu component with basic items and a submenu. It includes an onItemPress handler to log the selected item.

```javascript
import { ContextMenu } from'~/components/nativewindui/ContextMenu';
import { createContextItem, createContextSubMenu } from'~/components/nativewindui/ContextMenu/utils';
import { Pressable, Text } from 'react-native';

<ContextMenu
  className="rounded-md"
  items={[
    createContextItem({
      actionKey: 'first',
      title: 'Item 1',
    }),
    createContextSubMenu({ title: 'Submenu 1', iOSItemSize: 'small' }, [
      createContextItem({
        actionKey: 'sub-first',
        title: 'Sub Item 1',
      }),
      createContextItem({
        actionKey: 'sub-second',
        title: 'Sub Item 2',
      }),
    ]),
  ]}
  onItemPress={(item) => {
    console.log('Item Pressed', item);
  }}>
  <Pressable><Text>Long Press Me</Text></Pressable>
</ContextMenu>
```

--------------------------------

### Usage Example for Ratings Indicator

Source: https://nativewindui.com/component/ratings-indicator

A minimal usage example demonstrating how to import and use the 'expo-store-review' library within a React Native component's effect hook to request a review.

```javascript
import * as StoreReview from'expo-store-review';

  React.useEffect(() => {
asyncfunctionshowRequestReview() {
try {
if (await StoreReview.hasAction()) {
await StoreReview.requestReview();
        }
      } catch (error) {
console.log(
'FOR ANDROID: Make sure you meet all conditions to be able to test and use it: https://developer.android.com/guide/playcore/in-app-review/test#troubleshooting',
          error
        );
      } 
    }
const timeout = setTimeout(() => {
      showRequestReview();
    }, 1000);
return() =>clearTimeout(timeout);
  }, []);
```

--------------------------------

### Install react-native-keyboard-controller

Source: https://nativewindui.com/component/form

This snippet shows how to add the react-native-keyboard-controller dependency to your Expo project using npx.

```bash
npx expo install react-native-keyboard-controller
```

--------------------------------

### React Native Share Functionality Example

Source: https://nativewindui.com/component/activity-view

This example demonstrates how to implement the sharing functionality within a React component using `React.useEffect` and the `Share.share` method. It handles both successful sharing and dismissal of the share sheet.

```javascript
React.useEffect(() => {
asyncfunctionshare() {
try {
const result = await Share.share({
message: 'NativewindUI | Familiar interface, native feel.',
      });
if (result.action === Share.sharedAction) {
if (result.activityType) {
// shared with activity type of result.activityType        }
else {
// shared        }
      }
elseif (result.action === Share.dismissedAction) {
// dismissed      }
    }
catch (error: any) {
console.log(error.message);
    }
  }
  share();
}, []);
```

--------------------------------

### NativewindUI Progress Indicator Screen Example

Source: https://nativewindui.com/component/progress-indicator

Demonstrates the usage of the ProgressIndicator component within an Expo Router screen. It includes dynamic progress updates and integration with the app's color scheme and header.

```typescript
import { Icon } from'@roninoss/icons';
import { Stack } from'expo-router';
import * as React from'react';
import { View, Text, ScrollView, Pressable } from'react-native';
import { ProgressIndicator } from'~/components/nativewindui/ProgressIndicator';
import { useColorScheme } from'~/lib/useColorScheme';
exportdefaultfunctionProgressIndicatorScreen() {
const [progress, setProgress] = React.useState(13);
let id: ReturnType<typeofsetInterval> | null = null;
  React.useEffect(() => {
if (!id) {
      id = setInterval(() => {
        setProgress((prev) => (prev >= 99 ? 0 : prev + 5));
      }, 1000);
    }
return() => {
if (id) clearInterval(id);
    };
  }, []);
const { colors } = useColorScheme();
return (
<><Stack.Screenoptions={{title: 'NativewindUI',
headerSearchBarOptions: {
hideWhenScrolling:false,
          },
headerLargeTitle:true,
headerRight() {
return (
              <PressableclassName="opacity-80 active:opacity-40"><ViewclassName="opacity-90"><Iconname="cog-outline"color={colors.foreground} /></View></Pressable>            );
          },
        }} />
<ScrollViewcontentInsetAdjustmentBehavior="automatic"className="p-4"><ViewclassName="border-border bg-card gap-4 rounded-xl border p-4 pb-6 shadow-sm shadow-black/10 dark:shadow-none"><TextclassName="text-foreground text-center text-sm font-medium tracking-wider opacity-60">            Progress Indicator
</Text><ViewclassName="p-4"><ProgressIndicatorvalue={progress} /></View></View></ScrollView></>
  );
}

```

--------------------------------

### NativewindUI Picker Usage Example

Source: https://nativewindui.com/component/picker

Demonstrates how to use the NativewindUI Picker component in a React Native application. It includes setting the selected value, handling value changes, and rendering PickerItems with labels and values.

```typescript
import { Icon } from'@roninoss/icons';
import { Stack } from'expo-router';
import * as React from'react';
import { View, Text, ScrollView, Pressable } from'native';
import { Picker, PickerItem } from'~/components/nativewindui/Picker';
import { useColorScheme } from'~/lib/useColorScheme';

exportdefaultfunctionPickerScreen() {
  const [picker, setPicker] = React.useState('blue');
  const { colors } = useColorScheme();

  return (
    <><Stack.Screenoptions={{title: 'NativewindUI',
headerSearchBarOptions: {
        hideWhenScrolling:false,
          },
headerLargeTitle:true,
headerRight() {
return (
              <PressableclassName="opacity-80 active:opacity-40"><ViewclassName="opacity-90"><Iconname="cog-outline"color={colors.foreground} /></View></Pressable>
            );
          },
        }} />
<ScrollViewcontentInsetAdjustmentBehavior="automatic"className="p-4"><ViewclassName="border-border bg-card gap-4 rounded-xl border p-4 pb-6 shadow-sm shadow-black/10 dark:shadow-none"><TextclassName="text-foreground text-center text-sm font-medium tracking-wider opacity-60">
            Picker
</Text><PickerselectedValue={picker}onValueChange={(itemValue) => setPicker(itemValue)}>
<PickerItemlabel="Red"value="red"color={colors.foreground}style={{backgroundColor:colors.root,
              }}
            /><PickerItemlabel="Blue"value="blue"color={colors.foreground}style={{backgroundColor:colors.root,
              }}
            /><PickerItemlabel="Green"value="green"color={colors.foreground}style={{backgroundColor:colors.root,
              }}
            /></Picker></View></ScrollView></>
  );
}
```

--------------------------------

### NativeWindUI Alert Basic Usage

Source: https://nativewindui.com/component/alert

A simple example of how to implement the NativeWindUI Alert component with a title, message, and custom buttons.

```jsx
<Alert
  title="Discard draft?"
  message="Some message that is kind of important since it is in an alert."
  buttons={[
    {
      text: 'Cancel',
      style: 'cancel',
      onPress: (text) => {
        console.log('Cancel Pressed', text);
      },
    },
    {
      text: 'OK',
      onPress: (text) => {
        console.log('OK Pressed', text);
      },
    },
  ]}>
  <Button><Text>Show Alert</Text></Button>
</Alert>
```

--------------------------------

### Adaptive Search Header Usage Example

Source: https://nativewindui.com/component/adaptive-search-header

This TypeScript code provides a comprehensive example of how to implement and use the `AdaptiveSearchHeader` component in a React Native application. It includes configuration for iOS and Android, event handling for text changes, and integration with `KeyboardAwareScrollView`.

```typescript
import { Icon } from'@roninoss/icons';
import { Link } from'expo-router';
import * as React from'react';
import { Platform, ScrollView, View } from'react-native';
import { KeyboardAwareScrollView } from'react-native-keyboard-controller';
import Animated, { FadeIn, ZoomOut } from'react-native-reanimated';
import { AdaptiveSearchHeader } from'~/components/nativewindui/AdaptiveSearchHeader';
import { AdaptiveSearchBarRef } from'~/components/nativewindui/AdaptiveSearchHeader/types';
import { Button } from'~/components/nativewindui/Button';
import { Text } from'~/components/nativewindui/Text';
import { useColorScheme } from'~/lib/useColorScheme';

export default function AdaptiveHeaderScreen() {
  const { colors } = useColorScheme();
  const searchBarRef = React.useRef<AdaptiveSearchBarRef>(null);

  return (
    <>
      <AdaptiveSearchHeader
        iosTitle="Title"
        iosIsLargeTitle={false}
        shadowVisible={false}
        rightView={() => (
          <Button variant="plain" size="icon">
            <Icon size={24} name="account-circle-outline" color={colors.foreground} />
          </Button>
        )}
        searchBar={{
          ref: searchBarRef,
          iosCancelButtonText: 'Abort',
          onChangeText: (text) => {
            console.log(text);
          },
          materialRightView() {
            return (
              <Animated.View entering={FadeIn} exiting={ZoomOut}>
                <Button variant="plain" size="icon">
                  <Icon size={24} name="cog-outline" color={colors.foreground} />
                </Button>
              </Animated.View>
            );
          },
          content: (
            <KeyboardAwareScrollView
              className="ios:bg-background/95"
              contentContainerClassName="flex-1"
              keyboardShouldPersistTaps="always">
              <View className="flex-1 items-center justify-center">
                <Text>Search bar content</Text>
              </View>
            </KeyboardAwareScrollView>
          ),
        }}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerClassName="flex-1 py-10 px-4 gap-12">
        <Button
          onPress={() => {
            searchBarRef.current?.focus();
          }}>
          <Text>Focus input</Text>
        </Button>
        {Platform.OS !== 'ios' && (
          <Link href="/" asChild>
            <Button variant="plain">
              <Text>Go home</Text>
            </Button>
          </Link>
        )}
      </ScrollView>
    </>
  );
}
```

--------------------------------

### Button Usage Example

Source: https://nativewindui.com/component/button

Demonstrates how to import and use the Button component in a React Native application, including nesting a Text component within the Button.

```javascript
import { Button } from'~/components/nativewindui/Button';

<Button>
<Text>Press me</Text></Button>
```

--------------------------------

### TextField Usage Example

Source: https://nativewindui.com/component/text-field

Demonstrates how to import and use the NativeWindUI TextField component in a React Native application.

```react-native
import { TextField } from'~/components/nativewindui/TextField';

<TextField />
```

--------------------------------

### Render AdaptiveSearchHeader

Source: https://nativewindui.com/component/adaptive-search-header

Shows a basic example of how to render the AdaptiveSearchHeader component with a specified iOS title.

```javascript
<AdaptiveSearchHeader iosTitle="Adaptive Search Header" />
```

--------------------------------

### NativeWindUI Bottom Sheet Provider Setup

Source: https://nativewindui.com/component/bottom-sheet

Illustrates the necessary modifications to the Expo Router's _layout.tsx file to integrate the BottomSheetModalProvider and GestureHandlerRootView for the bottom sheet functionality.

```javascript
import '../global.css';
import 'expo-dev-client';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// YOUR_OTHER_IMPORTS
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/theme';

export {    
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <NavThemeProvider value={NAV_THEME[colorScheme]}>
            {/* YOUR_ROOT_NAVIGATOR */}
          </NavThemeProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
}
```

--------------------------------

### NativeWindUI Badge Component Usage

Source: https://nativewindui.com/component/badge

Demonstrates how to import and use the NativeWindUI Badge component in a React Native application. It shows examples with different variants and counts.

```jsx
import {
  Icon
} from'@roninoss/icons';
import {
  Stack
} from'expo-router';
import {
  View
} from'react-native';
import {
  Badge
} from'~/components/nativewindui/Badge';
import {
  useColorScheme
} from'~/lib/useColorScheme';

exportdefaultfunction BadgeScreen() {
  const { colors } = useColorScheme();

  return (
    <>
      <Stack.Screenoptions={{title: 'Badge' }} />
      <ViewclassName="flex-1 items-center justify-center py-4">
        <ViewclassName="flex-row gap-8">
          <View><Iconname="bell-outline"color={colors.foreground} /><Badge /></View>
          <View><Iconname="bell-outline"color={colors.foreground} /><Badge>6</Badge></View>
          <View><Iconname="bell-outline"color={colors.foreground} /><Badgevariant="info" /></View>
          <View><Iconname="bell-outline"color={colors.foreground} /><Badgevariant="info"maxCount={9}>              10
</Badge></View>
        </View>
      </View>
    </>
  );
}
```

--------------------------------

### Usage Example for NativeWindUI Sheet Component

Source: https://nativewindui.com/component/bottom-sheet

Demonstrates how to import and use the custom Sheet component and its associated hook (useSheetRef) in a React Native component. It shows how to present the bottom sheet programmatically.

```javascript
import { Sheet, useSheetRef } from'~/components/nativewindui/Sheet';

// Inside a component:
const bottomSheetModalRef = useSheetRef();

React.useEffect(() => {
  bottomSheetModalRef.current?.present();
}, []);

return (
  <Sheet ref={bottomSheetModalRef} snapPoints={[200]}>
    <BottomSheetView>
      {/* content */}
    </BottomSheetView>
  </Sheet>
);

```

--------------------------------

### DropdownMenu Usage Example

Source: https://nativewindui.com/component/dropdown-menu

Demonstrates how to use the DropdownMenu component with nested submenus and handles item press events. The child component must accept Pressable props for Android compatibility.

```javascript
import { DropdownMenu } from'~/components/nativewindui/DropdownMenu';
import {
  createDropdownItem,
  createDropdownSubMenu,
} from'~/components/nativewindui/DropdownMenu/utils';

<DropdownMenu
  items={[
    createDropdownItem({
actionKey: 'first',
title: 'Item 1',
    }),
    createDropdownSubMenu({ title: 'Submenu 1', iOSItemSize: 'small' }, [
      createDropdownItem({
actionKey: 'sub-first',
title: 'Sub Item 1',
      }),
      createDropdownItem({
actionKey: 'sub-second',
title: 'Sub Item 2',
      }),
    ]),
  ]},
  onItemPress={(item) => {
console.log('Item Pressed', item);
  }}>
<Button><Text>Open Dropdown</Text></Button></DropdownMenu>
```

--------------------------------

### NativewindUI Date Picker Usage Example

Source: https://nativewindui.com/component/date-picker

Demonstrates how to use the NativewindUI DatePicker component in a React Native application. It shows state management for the selected date and how to handle changes.

```javascript
import { DatePicker } from'~/components/nativewindui/DatePicker';
import * as React from'react';

// Inside a React component:
const [date, setDate] = React.useState(new Date());

return (
  <DatePicker
    value={date}
    mode="datetime"
    onChange={(ev) => {
      setDate(new Date(ev.nativeEvent.timestamp));
    }}
  />
);
```

--------------------------------

### Render Large Title Header

Source: https://nativewindui.com/component/large-title-header

Shows a basic example of how to render the LargeTitleHeader component with a title.

```jsx
<LargeTitleHeader title="Large title" />
```

--------------------------------

### Install KeyboardProvider

Source: https://nativewindui.com/component/large-title-header

Integrates the KeyboardProvider from react-native-keyboard-controller into your Expo Router layout to manage keyboard behavior.

```typescript
import '../global.css';
import 'expo-dev-client';
import { PortalHost } from '@rn-primitives/portal';
import { StatusBar } from 'expo-status-bar';
import { KeyboardProvider } from 'react-native-keyboard-controller';       // YOUR_OTHER_IMPORTS
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/theme';
export {    
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';
export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />
      <KeyboardProvider statusBarTranslucent navigationBarTranslucent>              <NavThemeProvider value={NAV_THEME[colorScheme]}>
                 {/* YOUR_ROOT_NAVIGATOR */}
                 <PortalHost />
              </NavThemeProvider>
          </KeyboardProvider>        </>
  );
}
```

--------------------------------

### NativewindUI Stepper Usage Example

Source: https://nativewindui.com/component/stepper

Demonstrates how to use the NativewindUI Stepper component within an Expo Router application. It includes state management for the counter and functions to handle increment/decrement actions.

```typescript
import { Stack } from'expo-router';
import * as React from'react';
import { View } from'react-native';
import Animated, {
  FadeInUp,
  FadeOutDown,
  LayoutAnimationConfig,
  ZoomInEasyUp,
  ZoomOutEasyDown,
} from'react-native-reanimated';
import { Text } from'~/components/nativewindui/Text';
import { Stepper } from'~/components/nativewindui/Stepper';

export default function StepperScreen() {
  const [count, setCount] = React.useState(0);

  function subtract() {
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  }

  function add() {
    setCount((prev) => prev + 1);
  }

  return (
    <><Stack.Screenoptions={{title: 'Stepper' }} /><ViewclassName="flex-1 items-center justify-center p-8"><ViewclassName="w-full flex-row items-center justify-between"><ViewclassName="flex-row items-center gap-1"><Text>Stepper: </Text><FlipCountercount={count} /></View><SteppersubtractButton={{disabled:count === 0,onPress:subtract }}
addButton={{onPress:add }}
          /></View></View></>
  );
}

function FlipCounter({ count }: { count: number }) {
  const id = React.useId();
  return (
    <ViewclassName="overflow-hidden py-1"><LayoutAnimationConfigskipEntering><Animated.Viewentering={FadeInUp.duration(120)}exiting={FadeOutDown.duration(120)}key={`${id}-wrapper-${count}`}><Animated.Viewkey={`${id}-inner-${count}`}
entering={ZoomInEasyUp.duration(120)}exiting={ZoomOutEasyDown.duration(120)}><TextclassName="text-primary font-medium">{count}</Text></Animated.View></Animated.View></LayoutAnimationConfig></View>
  );
}
```

--------------------------------

### Form Component Usage with Keyboard Handling

Source: https://nativewindui.com/component/form

This example showcases the implementation of a form screen using NativeWindUI's `Form`, `FormItem`, `TextField`, and `Button` components. It integrates with `react-native-keyboard-controller` for a seamless user experience, especially on iOS with `KeyboardGestureArea` and `KeyboardAwareScrollView`.

```javascript
import { Stack } from'expo-router';
import * as React from'react';
import { Platform, View } from'react-native';
import { KeyboardAwareScrollView, KeyboardGestureArea } from'react-native-keyboard-controller';
import { useSafeAreaInsets } from'react-native-safe-area-context';
import { Button } from'~/components/nativewindui/Button';
import { Form, FormItem, FormSection } from'~/components/nativewindui/Form';
import { Text } from'~/components/nativewindui/Text';
import { TextField } from'~/components/nativewindui/TextField';
import { cn } from'~/lib/cn';
exportdefaultfunctionFormScreen() {
const insets = useSafeAreaInsets();
const [canSave, setCanSave] = React.useState(false);
functiononChange() {
if (!canSave) {
      setCanSave(true);
    }
  }
return (
    <><Stack.Screenoptions={{title: 'Name',
headerRight:Platform.select({
ios: () => (
<ButtonclassName="ios:px-0"disabled={!canSave}variant="plain"><TextclassName={cn(canSave && 'text-primary')}>Save</Text></Button>            ),
          }),
        }} />
<KeyboardGestureAreainterpolator="ios"><KeyboardAwareScrollViewbottomOffset={8}keyboardShouldPersistTaps="handled"keyboardDismissMode="interactive"contentContainerStyle={{paddingBottom:insets.bottom }}><FormclassName="gap-5 px-4 pt-8"><FormSectionmaterialIconProps={{name: 'person-outline' }}><FormItem><TextFieldtextContentType="none"autoComplete="off"label={Platform.select({ios:undefined, default: 'First' })}
leftView={Platform.select({ios: <LeftLabel>First</LeftLabel> })}
                  placeholder={Platform.select({ ios: 'required' })}
                  onChange={onChange} /> </FormItem><FormItem><TextFieldtextContentType="none"autoComplete="off"label={Platform.select({ios:undefined, default: 'Middle' })}
leftView={Platform.select({ios: <LeftLabel>Middle</LeftLabel> })}
                  placeholder={Platform.select({ ios: 'optional' })}
                  onChange={onChange} /> </FormItem><FormItem><TextFieldtextContentType="none"autoComplete="off"label={Platform.select({ios:undefined, default: 'Last' })}
leftView={Platform.select({ios: <LeftLabel>Last</LeftLabel> })}
                  placeholder={Platform.select({ ios: 'required' })}
                  onChange={onChange} /> </FormItem></FormSection>            {Platform.OS !== 'ios' && (
<ViewclassName="items-end"><ButtonclassName="px-6"><Text>Save</Text></Button></View>            )}
</Form></KeyboardAwareScrollView></KeyboardGestureArea></>
  );
}
functionLeftLabel({ children }: { children: string }) {
return (
<ViewclassName="w-28 justify-center pl-2"><Text>{children}</Text></View>  );
}
```

--------------------------------

### NativewindUI Slider Usage Example

Source: https://nativewindui.com/component/slider

Demonstrates how to import and use the NativewindUI Slider component in a React Native application. It includes setting the slider value and handling changes.

```typescript
import { Icon } from'@roninoss/icons';
import { Stack } from'expo-router';
import * as React from'react';
import { View, Text, ScrollView, Pressable } from'react-native';
import { Slider } from'~/components/nativewindui/Slider';
import { useColorScheme } from'~/lib/useColorScheme';

export default function SliderScreen() {
  const { colors } = useColorScheme();
  const [sliderValue, setSliderValue] = React.useState(0.5);

  return (
    <><Stack.Screenoptions={{title: 'NativewindUI',
headerSearchBarOptions: {
hideWhenScrolling:false,
          },
headerLargeTitle:true,
headerRight() {
return (
              <PressableclassName="opacity-80 active:opacity-40"><ViewclassName="opacity-90"><Iconname="cog-outline"color={colors.foreground} /></View></Pressable>            );
          },
        }} />
<ScrollViewcontentInsetAdjustmentBehavior="automatic"className="p-4"><ViewclassName="border-border bg-card gap-4 rounded-xl border p-4 pb-6 shadow-sm shadow-black/10 dark:shadow-none"><TextclassName="text-foreground text-center text-sm font-medium tracking-wider opacity-60">
            Slider
</Text><Slidervalue={sliderValue}onValueChange={setSliderValue} /></View></ScrollView></>
  );
}
```

--------------------------------

### NativeWindUI List Usage with Subtitles

Source: https://nativewindui.com/component/list

Provides a basic example of using the NativeWindUI List component with data that includes subtitles. It specifies the estimated item size suitable for items with subtitles and defines a key extractor.

```react-native
<List
  data={[
    {
      id: '1',
      title: 'Hello',
      subTitle: 'World',
    },
    {
      id: '2',
      title: 'Hello',
      subTitle: 'World',
    },
    {
      id: '3',
      title: 'Hello',
      subTitle: 'World',
    },
  ]}
  estimatedItemSize={ESTIMATED_ITEM_HEIGHT.withSubTitle}
  renderItem={(info) => {
    return<ListItem {...info} />;
  }}
  keyExtractor={(item) => item.id}
/>
```

--------------------------------

### NativewindUI Action Sheet Installation - Layout Configuration

Source: https://nativewindui.com/component/action-sheet

Shows how to integrate the Action Sheet component into your Expo Router application by wrapping the root component with ActionSheetProvider in the _layout.tsx file.

```javascript
    import '../global.css';
    import 'expo-dev-client';
+   import { ActionSheetProvider } from '@expo/react-native-action-sheet';        import { StatusBar } from 'expo-status-bar';
    // YOUR_OTHER_IMPORTS
    import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
    import { NAV_THEME } from '~/theme';
    export default function RootLayout() {
      useInitialAndroidBarSync();
      const { colorScheme, isDarkColorScheme } = useColorScheme();
      return (
        <>
          <StatusBar
            key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
            style={isDarkColorScheme ? 'light' : 'dark'}
          />
+         <ActionSheetProvider>
              <NavThemeProvider value={NAV_THEME[colorScheme]}>
                 {/* YOUR_ROOT_NAVIGATOR */}
              </NavThemeProvider>
+          </ActionSheetProvider>
        </>
      );
    }
```

--------------------------------

### NativeWindUI Alert Usage Example

Source: https://nativewindui.com/component/alert

Demonstrates how to use the NativeWindUI Alert component in a React Native application with Expo Router. It shows how to trigger alerts with different button configurations and styles, including a prompt-based alert.

```typescript
import { Stack } from'expo-router';
import * as React from'react';
import { View } from'react-native';
import { Alert } from'~/components/nativewindui/Alert';
import { AlertRef } from'~/components/nativewindui/Alert/types';
import { Button } from'~/components/nativewindui/Button';
import { Text } from'~/components/nativewindui/Text';

exportdefaultfunctionAlertScreen() {
  const alertRef = React.useRef<AlertRef>(null);

  return (
    <><Stack.Screenoptions={{title: 'Alert' }} /><ViewclassName="flex-1 items-center justify-center gap-4 py-4">
        <ButtononPress={() => {
            alertRef.current?.show();
          }}>
          <Text>Show Prompt With Ref</Text>
        </Button>
        <Alert
          title="Discard draft?"
          message="Some message that is kind of important since it is in an alert."
          buttons={[
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: (text) => {
                console.log('Cancel Pressed', text);
              },
            },
            {
              text: 'OK',
              onPress: (text) => {
                console.log('OK Pressed', text);
              },
            },
          ]}>
          <Buttonvariant="secondary"><Text>Show Alert</Text></Button>
        </Alert>
        <Alert
          title="Login to Hydra"
          message="Reminding you to drink water."
          materialIcon={{name: 'water-outline' }}
          materialWidth={370}
          prompt={{
            type: 'login-password',
            keyboardType: 'email-address',
          }}
          buttons={[
            {
              text: 'Report',
              style: 'destructive',
              onPress: () => {
                console.log('Report Pressed');
              },
            },
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: (text) => {
                console.log('Cancel Pressed', text);
              },
            },
            {
              text: 'OK',
              onPress: (text) => {
                console.log('OK Pressed', text);
              },
            },
          ]}
          ref={alertRef}
        />
      </View></>
  );
}
```

--------------------------------

### NativeWindUI DropdownMenu Integration

Source: https://nativewindui.com/component/dropdown-menu

This snippet demonstrates how to import and use the NativeWindUI DropdownMenu component within an Expo Router screen. It includes setting up the screen layout, managing component state (checked, isLoading), and defining static and dynamic menu items using helper functions like createDropdownItem and createDropdownSubMenu. The example also shows how to handle item presses and integrate with an AlertAnchor for user feedback.

```javascript
import { Stack } from'expo-router';
import * as React from'react';
import { View } from'react-native';
import { Text } from'~/components/nativewindui/Text';
import { AlertAnchor } from'~/components/nativewindui/Alert';
import { AlertRef } from'~/components/nativewindui/Alert/types';
import { Button } from'~/components/nativewindui/Button';
import { DropdownMenu } from'~/components/nativewindui/DropdownMenu';
import { DropdownMenuRef } from'~/components/nativewindui/DropdownMenu/types';
import {
  createDropdownItem,
  createDropdownSubMenu,
} from'~/components/nativewindui/DropdownMenu/utils';
import { useColorScheme } from'~/lib/useColorScheme';

exportdefaultfunctionDropdownMenuScreen() {
  const [checked, setChecked] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const { colors } = useColorScheme();
  const ref = React.useRef<DropdownMenuRef>(null);
  const alertRef = React.useRef<AlertRef>(null);

  const dynamicItems = React.useMemo(() => {
    return [
      createDropdownSubMenu({ title: 'Sub Menu', iOSItemSize: 'small', loading: isLoading }, [
        createDropdownSubMenu({ title: 'Submenu 2' }, [
          { actionKey: '1', title: 'Item 1' },
          { actionKey: '2', title: 'Item 2' },
        ]),
        createDropdownItem({ actionKey: '43', title: 'Item 3' }),
      ]),
      createDropdownItem({
        actionKey: '4',
        title: 'Checkbox Item',
        state: { checked },
        keepOpenOnPress: true,
        icon: {
          namingScheme: 'sfSymbol',
          name: 'checkmark.seal',
          color: colors.primary,
        },
      }),
      createDropdownItem({
        actionKey: '5',
        title: 'Set to loading',
        keepOpenOnPress: true,
        disabled: isLoading,
      }),
    ];
  }, [checked, isLoading]);

  return (
    <><Stack.Screenoptions={{title: 'DropdownMenu' }} /><ViewclassName="flex-1 flex-row justify-center gap-8 p-8">
        <DropdownMenutitle="Dropdown Menu"items={STATIC_ITEMS}
onItemPress={(item) => {
            alertRef.current?.alert({
              title: 'Item Pressed',
              message: `Item ${item.actionKey} pressed`,
              buttons: [{ text: 'OK' }],
              materialWidth: 350,
            });
          }}>
          <Button><Text>Open Dropdown</Text></Button>
        </DropdownMenu>
        <DropdownMenuref={ref}items={dynamicItems}
onItemPress={(item) => {
            if (item.actionKey === '4') {
              setChecked((prev) => !prev);
              return;
            }
            if (item.actionKey === '5') {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
              }, 1500);
              return;
            }
            alertRef.current?.alert({
              title: 'Item Pressed',
              message: `Item ${item.actionKey} pressed`,
              buttons: [{ text: 'OK' }],
              materialWidth: 350,
            });
          }}>
          <Buttonvariant="secondary"onPress={() => {
              if (isLoading) {
                setTimeout(() => {
                  setIsLoading(false);
                }, 1500);
              }
            }}>
            <Text>With State</Text>
          </Button>
        </DropdownMenu>
      </View><AlertAnchorref={alertRef} /></>
  );
}

const STATIC_ITEMS = [
  createDropdownSubMenu({ title: 'Submenu 1', iOSItemSize: 'small', loading: false }, [
    createDropdownSubMenu({ title: 'Sub', iOSItemSize: 'small' }, [
      { actionKey: '10', title: 'Select Me' },
      { actionKey: '20', title: 'No! Select Me!' },
    ]),
    createDropdownItem({
      actionKey: '430',
      title: 'Item 430',
      icon: { name: 'checkmark.seal', namingScheme: 'sfSymbol' },
    }),
  ]),
  createDropdownSubMenu({ title: 'Hello', iOSItemSize: 'small' }, [
    createDropdownItem({
      actionKey: '30',
      icon: { name: 'checkmark.seal', namingScheme: 'sfSymbol' },
    }),
    createDropdownItem({
      actionKey: '31',
      icon: { name: 'checkmark.seal', namingScheme: 'sfSymbol' },
    }),
    createDropdownItem({
      actionKey: '32',
      icon: { name: 'checkmark.seal', namingScheme: 'sfSymbol' },
    }),
    createDropdownItem({
      actionKey: '33',
      icon: { name: 'checkmark.seal', namingScheme: 'sfSymbol' },
    }),
  ]),
  createDropdownSubMenu({ title: '', iOSType: 'inline', iOSItemSize: 'small' }, [
    createDropdownItem({ actionKey: '130', title: '💧' }),
    createDropdownItem({ actionKey: '131', title: '💧' }),
    createDropdownItem({ actionKey: '132', title: '💧' }),
    createDropdownItem({ actionKey: '133', title: '💧' }),
  ]),
  createDropdownItem({
    actionKey: '40',
    title: 'Delete Computer',
    destructive: true,
    image: { url: 'https://picsum.photos/id/2/100', cornerRadius: 30 },
  }),
];

```

--------------------------------

### React Native Activity View Example

Source: https://nativewindui.com/component/activity-view

This snippet demonstrates how to implement an Activity View in a React Native application using NativewindUI. It includes sharing functionality via the React Native Share API and integrates with Expo Router for navigation.

```javascript
import { Icon } from'@roninoss/icons';
import { Stack } from'expo-router';
import { View, Text, ScrollView, Pressable, Button, Share, Alert } from'react-native';
import { useColorScheme } from'~/lib/useColorScheme';

exportdefaultfunctionActivityViewScreen() {
  const { colors } = useColorScheme();

  return (
    <><Stack.Screenoptions={{title: 'NativewindUI',
headerSearchBarOptions: {
hideWhenScrolling:false,
          },
headerLargeTitle:true,
headerRight() {
return (
              <PressableclassName="opacity-80 active:opacity-40"><ViewclassName="opacity-90"><Iconname="cog-outline"color={colors.foreground} /></View></Pressable>            );
          },
        }} />
<ScrollViewcontentInsetAdjustmentBehavior="automatic"className="p-4"><ViewclassName="border-border bg-card gap-4 rounded-xl border p-4 pb-6 shadow-sm shadow-black/10 dark:shadow-none"><TextclassName="text-foreground text-center text-sm font-medium tracking-wider opacity-60">
            Activity View
</Text><Buttoncolor={colors.primary}onPress={async () => {
              try {
                const result = await Share.share({
                  message: 'NativewindUI | Familiar interface, native feel.',
                });
                if (result.action === Share.sharedAction) {
                  if (result.activityType) {
                    // shared with activity type of result.activityType
                  } else {
                    // shared
                  }
                } else if (result.action === Share.dismissedAction) {
                  // dismissed
                }
              } catch (error: any) {
                Alert.alert(error.message);
              }
            }}
            title="Share a message" />
</View></ScrollView></>
  );
}
```

--------------------------------

### NativewindUI Checkbox Usage

Source: https://nativewindui.com/component/checkbox

Demonstrates how to import and use the NativewindUI Checkbox component within an Expo Router setup. It shows a basic implementation centered on the screen.

```javascript
import { Stack } from'expo-router';
import { View } from'react-native';
import { Checkbox } from'~/components/nativewindui/Checkbox';

exportdefaultfunction CheckboxScreen() {
  return (
    <><Stack.Screenoptions={{title: 'Checkbox' }} /><ViewclassName="flex-1 items-center justify-center py-4"><Checkbox /></View></>
  );
}
```

--------------------------------

### NativewindUI Project Links

Source: https://nativewindui.com/screen/settings-screen-android-style

Provides links to the project's community and code repository.

```English
Project Links:
Discord
GitHub
```

--------------------------------

### Activity Indicator Screen Example (React Native)

Source: https://nativewindui.com/component/activity-indicator

This snippet demonstrates how to use the NativewindUI Activity Indicator component within a React Native screen using expo-router. It includes setting up the screen title, header elements, and displaying the activity indicator within a scrollable view with styling.

```tsx
import { Icon } from'@roninoss/icons';
import { Stack } from'expo-router';
import { View, Text, ScrollView, Pressable } from'react-native';
import { ActivityIndicator } from'~/components/nativewindui/ActivityIndicator';
import { useColorScheme } from'~/lib/useColorScheme';

exportdefaultfunctionActivityIndicatorScreen() {
  const { colors } = useColorScheme();
  return (
    <><Stack.Screenoptions={{title: 'NativewindUI',
headerSearchBarOptions: {
hideWhenScrolling:false,
          },
headerLargeTitle:true,
headerRight() {
return (
              <PressableclassName="opacity-80 active:opacity-40"><ViewclassName="opacity-90"><Iconname="cog-outline"color={colors.foreground} /></View></Pressable>            );
          },
        }} />
<ScrollViewcontentInsetAdjustmentBehavior="automatic"className="p-4"><ViewclassName="border-border bg-card gap-4 rounded-xl border p-4 pb-6 shadow-sm shadow-black/10 dark:shadow-none"><TextclassName="text-foreground text-center text-sm font-medium tracking-wider opacity-60">
            Activity Indicator
</Text><ViewclassName="p-4"><ActivityIndicator /></View></View></ScrollView></>
  );
}
```

--------------------------------

### Authentication Flow Components

Source: https://nativewindui.com/screen/authentication-flow

This section details the screens and components commonly used in authentication flows. It highlights pro templates that require all-access for source code usage.

```English
Screens commonly used in authentication flows:
- Sign in
- OTP Screen
- Profile Settings (Apple style)
- Profile Settings (Android style)

Pro template requires all-access to use the source code.
```

--------------------------------

### NativewindUI Component Showcase

Source: https://nativewindui.com/screen/profile-screen

This section lists various UI components and features offered by NativewindUI, ranging from basic elements like buttons and alerts to more complex flows like authentication and messaging.

```HTML
<ul>
  <li>Action Sheet</li>
  <li>Activity Indicator</li>
  <li>Activity View</li>
  <li>Adaptive Search Header</li>
  <li>Alert</li>
  <li>Avatar</li>
  <li>Badge</li>
  <li>Bottom Sheet</li>
  <li>Bottom Tabs</li>
  <li>Button</li>
  <li>Card</li>
  <li>Checkbox</li>
  <li>Context Menu</li>
  <li>Date Picker</li>
  <li>Drawer Content</li>
  <li>Dropdown Menu</li>
  <li>Form</li>
  <li>Large Title Header</li>
  <li>List Picker</li>
  <li>Progress Indicator</li>
  <li>Ratings Indicator</li>
  <li>Search Input</li>
  <li>Segmented Control</li>
  <li>Slider</li>
  <li>Stepper</li>
  <li>Text</li>
  <li>Text Field</li>
  <li>Toggle</li>
  <li>Toolbar</li>
</ul>
```

--------------------------------

### NativewindUI Components Overview

Source: https://nativewindui.com/screen/settings-screen-android-style

An overview of the various UI components available in the NativewindUI library. These components cover common mobile application elements and design patterns.

```English
Available Components:
Action Sheet, Activity Indicator, Activity View, Adaptive Search Header, Alert, Avatar, Badge, Bottom Sheet, Bottom Tabs, Button, Card, Checkbox, Context Menu, Date Picker, Drawer Content, Dropdown Menu, Form, Large Title Header, List Picker, Progress Indicator, Ratings Indicator, Search Input, Segmented Control, Slider, Stepper, Text, Text Field, Toggle, Toolbar.
```

--------------------------------

### Profile Screen Components (NativewindUI)

Source: https://nativewindui.com/screen/profile-screen

This snippet showcases the profile-related screens available in NativewindUI, including Apple and Android style settings. It highlights the availability of a 'Pro template' that requires all-access.

```HTML
<div class="profile-section">
  <h2>Profile</h2>
  <p>A collection of screens that are commonly used for a user's profile.</p>
  <div class="template-info">
    <p>Pro template</p>
    <p>Requires all-access to use the source code</p>
    <a href="#">👀 See It Live!</a>
  </div>
  <div class="qr-code-container">
    <p>Scan the QR code to try this component on your device!</p>
    <img src="path/to/qr-code.png" alt="QR Code">
  </div>
  <div class="platform-links">
    <a href="#">Apple</a>
    <a href="#">Android</a>
  </div>
</div>
```

--------------------------------

### AdaptiveSearchHeader Component API

Source: https://nativewindui.com/component/adaptive-search-header

Detailed API documentation for the AdaptiveSearchHeader component, outlining all available props, their types, default values, and descriptions.

```APIDOC
AdaptiveSearchHeader:
  Props:
    iosIsLargeTitle: boolean (default: false) - Whether the iOS large title style is used.
    iosBackButtonMenuEnabled: boolean - If the iOS back button menu is enabled.
    iosBackButtonTitle: string - The title of the iOS back button.
    iosBackButtonTitleVisible: boolean - Whether the iOS back button title is visible.
    iosBackVisible: boolean - Whether the iOS back button is visible.
    iosBlurEffect: 'systemMaterial' | 'none' (default: 'none') - The blur effect used on iOS. Requires iosBlurEffect to be set to "none" for shadowVisible.
    iosTitle: string - The title of the header on iOS.
    materialUseSafeAreaTop: boolean (default: true) - Whether to use the safe area top on Android.
    shadowVisible: boolean - Whether the shadow is visible. iOS requires iosBlurEffect to be set to "none".
    leftView: HeaderOptions["headerLeft"] - Left view element for the header.
    rightView: HeaderOptions["headerRight"] - Right view element for the header.
    shown: boolean - Whether the header is shown.
    backgroundColor: string - Background color of the header.
    screen: ScreenOptions - Screen options to apply to the header.
    searchBar: object - Options for the search bar.
      searchBar.iosCancelButtonText: string - Text for the iOS cancel button in the search bar.
      searchBar.iosHideWhenScrolling: boolean - Whether the iOS search bar hides when scrolling.
      searchBar.iosTintColor: string - Tint color for the iOS search bar.
      searchBar.materialRightView: HeaderOptions["headerRight"] - Right view element for the search bar on Android.
      searchBar.materialBlurOnSubmit: boolean - Whether the search bar blurs on submit for Android.
      searchBar.materialOnSubmitEditing: ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void) - Callback triggered on submit editing for the Android search bar.
      searchBar.autoCapitalize: NativeStackNavigationSearchBarOptions["autoCapitalize"] - Auto-capitalize behavior for the search bar input.
      searchBar.inputType: NativeStackNavigationSearchBarOptions["inputType"] - Input type for the search bar.
      searchBar.onBlur: () => void - Callback triggered when the search bar loses focus.
      searchBar.onCancelButtonPress: () => void - Callback triggered when the cancel button is pressed in the search bar.
      searchBar.onChangeText: (text: string) => void - Callback triggered when the text changes in the search bar.
      searchBar.onFocus: () => void - Callback triggered when the search bar gains focus.
      searchBar.onSearchButtonPress: () => void - Callback triggered when the search button is pressed in the search bar.
      searchBar.placeholder: string - Placeholder text for the search bar.
      searchBar.ref: React.RefObject<AdaptiveSearchBarRef> - Ref object for the search bar.
      searchBar.textColor: string - Text color for the search bar.
      searchBar.content: React.ReactNode - Content to be rendered inside the search bar.
```

--------------------------------

### Import AdaptiveSearchHeader

Source: https://nativewindui.com/component/adaptive-search-header

Demonstrates how to import the AdaptiveSearchHeader component from the NativeWindUI library.

```javascript
import { AdaptiveSearchHeader } from'~/components/nativewindui/AdaptiveSearchHeader';
```

--------------------------------

### NativeWindUI UI Components

Source: https://nativewindui.com/screen/authentication-flow

A list of various UI components available in NativeWindUI, covering elements from basic controls to more complex UI patterns.

```English
UI Components:
Action Sheet, Activity Indicator, Activity View, Adaptive Search Header, Alert, Avatar, Badge, Bottom Sheet, Bottom Tabs, Button, Card, Checkbox, Context Menu, Date Picker, Drawer Content, Dropdown Menu, Form, Large Title Header, List Picker, Progress Indicator, Ratings Indicator, Search Input, Segmented Control, Slider, Stepper, Text, Text Field, Toggle, Toolbar
```

--------------------------------

### NativeWindUI Dropdown Menu Documentation

Source: https://nativewindui.com/component/dropdown-menu

Documentation for the NativeWindUI Dropdown Menu component. This component displays a menu of items or actions that directly relate to the button's purpose. It is a Pro component and requires all-access to use the source code. Live previews are available via QR code.

```APIDOC
Component: Dropdown Menu

Description: Displays a menu of items or actions directly related to the button's purpose.

Status: Pro component
Requirements: Requires all-access to use the source code.

Features:
- Live preview available via QR code.
- Supports Apple and Android platforms.

Usage:
Scan the QR code to try this component on your device.
Available in the Companion App.
```

--------------------------------

### NativewindUI Templates Overview

Source: https://nativewindui.com/index

NativewindUI offers ready-to-use app templates and screens, tailored for each platform. These templates are professionally designed and fully customizable, allowing developers to jump-start their projects.

```React Native
## Templates
Ready-to-use flows and screens, tailored to each platform
Jump-start your development with our collection of professionally designed, fully customizable app templates. From authentication to checkout, we've got you covered.
Explore all templates
MessagesSettingsProfileWelcomeAuthenticationCheckout
Apple
Apple
Android
Android
iOSAndroid
```

--------------------------------

### NativewindUI Component Showcase

Source: https://nativewindui.com/screen/messaging-flow-ios-style

A comprehensive list of UI components available in NativewindUI, designed for building modern mobile applications with native aesthetics. These components cover a wide range of functionalities from basic elements to complex views.

```APIDOC
NativewindUI Components:
  Action Sheet
  Activity Indicator
  Activity View
  Adaptive Search Header
  Alert
  Avatar
  Badge
  Bottom Sheet
  Bottom Tabs
  Button
  Card
  Checkbox
  Context Menu
  Date Picker
  Drawer Content
  Dropdown Menu
  Form
  Large Title Header
  List Picker
  Progress Indicator
  Ratings Indicator
  Search Input
  Segmented Control
  Slider
  Stepper
  Text
  Text Field
  Toggle
  Toolbar
```

--------------------------------

### NativewindUI UI Elements

Source: https://nativewindui.com/screen/checkout-flow

A catalog of individual UI components available in NativewindUI, ranging from basic elements like buttons and inputs to more complex components such as date pickers and toolbars.

```English
Action Sheet
Activity Indicator
Activity View
Adaptive Search Header
Alert
Avatar
Badge
Bottom Sheet
Bottom Tabs
Button
Card
Checkbox
Context Menu
Date Picker
Drawer Content
Dropdown Menu
Form
Large Title Header
List Picker
Progress Indicator
Ratings Indicator
Search Input
Segmented Control
Slider
Stepper
Text
Text Field
Toggle
Toolbar
```

--------------------------------

### NativeWindUI Badge Component Import

Source: https://nativewindui.com/component/badge

Shows the basic import statement for the NativeWindUI Badge component.

```javascript
import { Badge } from'~/components/nativewindui/Badge';
```

--------------------------------

### NativeWindUI Drawer Content Component Usage

Source: https://nativewindui.com/component/drawer-content

This snippet shows the basic import and usage of NativeWindUI's Drawer Content components for building navigation drawers. It illustrates how to structure sections and items within the drawer.

```javascript
import {
  DrawerContentRoot,
  DrawerContentSection,
  DrawerContentSectionItem,
  DrawerContentSectionTitle,
  getActiveDrawerContentScreen,
} from'~/components/nativewindui/DrawerContent';
```

```javascript
<DrawerContentRoot navigation={props.navigation}>
  <DrawerContentSectionTitletype="large">Section Title</DrawerContentSectionTitle>
  <DrawerContentSection>
    <DrawerContentSectionItemisActivelabel="Item 1" />
    <DrawerContentSectionItemlabel="Item 2" />
  </DrawerContentSection>
  <DrawerContentSectionTitle>Section Title 2</DrawerContentSectionTitle>
  <DrawerContentSection>
    <DrawerContentSectionItemlabel="Item 3" />
    <DrawerContentSectionItemlabel="Item 4" />
  </DrawerContentSection>
</DrawerContentRoot>
```

--------------------------------

### NativeWindUI Large Title Header Props

Source: https://nativewindui.com/component/large-title-header

Detailed API documentation for the LargeTitleHeader component, outlining all available props, their types, and descriptions for customization.

```APIDOC
LargeTitleHeader:
  Props:
    iosBackButtonMenuEnabled | boolean | Enables or disables the iOS back button menu.
    iosBackButtonTitle | string | Title for the iOS back button.
    iosBackButtonTitleVisible | boolean | Determines if the iOS back button title is visible.
    iosBlurEffect | HeaderOptions["headerBlurEffect"] | "none" | The blur effect for the iOS header. Default is "systemMaterial".
    materialPreset | 'stack' | 'inline' | Material design preset for the header layout.
    materialTitleClassName | string | Class name for styling the Android title.
    backVisible | boolean | Determines if the back button is visible.
    shadowVisible | boolean | Controls the visibility of the shadow. For iOS, iosBlurEffect must be "none".
    leftView | HeaderOptions["headerLeft"] | Custom component for the left side of the header.
    rightView | HeaderOptions["headerRight"] | Custom component for the right side of the header.
    shown | boolean | Controls the visibility of the header.
    title | string | Title text for the header.
    backgroundColor | string | Background color for the header.
    screen | ScreenOptions | Options for screen navigation and presentation.
    searchBar | object | Options and configuration for the search bar within the header.
      searchBar.iosCancelButtonText | string | Text for the iOS search bar cancel button.
      searchBar.iosHideWhenScrolling | boolean | Hides the search bar when scrolling on iOS.
      searchBar.iosTintColor | string | Tint color for the iOS search bar.
      searchBar.materialRightView | HeaderOptions["headerRight"] | Custom component for the right side of the Android search bar.
      searchBar.materialBlurOnSubmit | boolean | Blurs the search bar when submitting input on Android.
      searchBar.materialOnSubmitEditing | ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void) | undefined | Callback function triggered when submitting input.
      searchBar.autoCapitalize | NativeStackNavigationSearchBarOptions["autoCapitalize"] | Configures the auto-capitalization behavior.
      searchBar.inputType | NativeStackNavigationSearchBarOptions["inputType"] | Defines the input type for the search bar.
      searchBar.onBlur | () => void | Callback function triggered when the search bar loses focus.
      searchBar.onCancelButtonPress | () => void | Callback function triggered when the cancel button is pressed.
      searchBar.onChangeText | (text: string) => void | Callback function triggered when the text in the search bar changes.
      searchBar.onFocus | () => void | Callback function triggered when the search bar gains focus.
      searchBar.onSearchButtonPress | () => void | Callback function triggered when the search button is pressed.
      searchBar.placeholder | string | Placeholder text for the search bar.
      searchBar.ref | React.RefObject<LargeTitleSearchBarRef> | Reference to the search bar commands.
      searchBar.textColor | string | Text color for the search bar input.
      searchBar.content | React.ReactNode | Custom content to display within the search bar.
```

--------------------------------

### Messaging Flow Components

Source: https://nativewindui.com/screen/authentication-flow

Components designed for messaging functionalities, available in both Apple and Android styles.

```English
Messaging Flow (Apple style)
Messaging Flow (Android style)
```

--------------------------------

### Consent Welcome Screen Implementation

Source: https://nativewindui.com/screen/consent-welcome-screen

This snippet shows how to implement the Consent Welcome Screen using NativewindUI components. It includes setting up the layout with SafeAreaView, displaying a welcome message, listing features with icons, and providing buttons for user consent and navigation. It utilizes React Native, Expo Router, and NativewindUI components like Button, Text, and Icon.

```tsx
import { Icon } from'@roninoss/icons';
import { Link } from'expo-router';
import { Platform, View, type ViewStyle } from'react-native';
import { SafeAreaView } from'react-native-safe-area-context';
import { Button } from'~/components/nativewindui/Button';
import { Text } from'~/components/nativewindui/Text';
import { useColorScheme } from'~/lib/useColorScheme';
const ROOT_STYLE: ViewStyle = { flex: 1 };
exportdefaultfunctionWelcomeConsentScreen() {
const { colors } = useColorScheme();
return (
<SafeAreaViewstyle={ROOT_STYLE}><ViewclassName="mx-auto max-w-sm flex-1 justify-between gap-4 px-8 py-4 "><ViewclassName="ios:pt-8 pt-12"><Textvariant="largeTitle"className="ios:text-left ios:font-black text-center font-bold">
            Welcome to your
</Text><Textvariant="largeTitle"className="ios:text-left ios:font-black text-primary text-center font-bold">
            Application
</Text></View><ViewclassName="gap-8">
          {FEATURES.map((feature) => (
<Viewkey={feature.title}className="flex-row gap-4"><ViewclassName="pt-px"><Iconname={feature.icon}size={38}color={colors.primary}ios={{renderingMode: 'hierarchical' }}
                /></View><ViewclassName="flex-1"><TextclassName="font-bold">{feature.title}</Text><Textvariant="footnote">{feature.description}</Text></View></View>
          ))}
</View><ViewclassName="gap-4"><ViewclassName="items-center"><Iconname="account-multiple"size={24}color={colors.primary}ios={{renderingMode: 'hierarchical' }}
            /><Textvariant="caption2"className="pt-1 text-center">
              By pressing continue, you agree to our{' '}
<Linkhref="/"><Textvariant="caption2"className="text-primary">
                  Terms of Service
</Text></Link>{' '}
              and that you have read our{' '}
<Linkhref="/"><Textvariant="caption2"className="text-primary">
                  Privacy Policy
</Text></Link></Text></View><Linkhref="../"replaceasChild><Buttonsize={Platform.select({ios: 'lg', default: 'md'})}>
<Text>Continue</Text></Button></Link></View></View></SafeAreaView>
  );
}
const FEATURES = [
  {
title: 'Profile Management',
description: 'Easily update and manage your personal information, settings, and preferences',
icon: 'account-circle-outline',
  },
  {
title: 'Secure Messaging',
description: 'Chat securely with friends and family in real-time.',
icon: 'message-processing',
  },
  {
title: 'Activity Tracking',
description: 'Monitor your daily activities and track your progress over time.',
icon: 'chart-timeline-variant',
  },
] asconst;
```

--------------------------------

### NativewindUI Stepper Import

Source: https://nativewindui.com/component/stepper

Shows the basic import statement required to use the Stepper component in your project.

```javascript
import { Stepper } from'~/components/nativewindui/Stepper';
```

--------------------------------

### NativewindUI List Component Props

Source: https://nativewindui.com/component/list

Defines the properties for the NativewindUI List component, inheriting from FlashList. Includes props for rendering items, layout variants, data management, and styling.

```APIDOC
List Component Props:

Inherits all props from @shopify's FlashList component.

Props:
- renderItem: ListRenderItem<T> | Custom render function for list items.
- variant: ListVariant | 'full-width' | The layout variant for the list.
- sectionHeaderAsGap: boolean | false | Whether the section header is used as a gap.
- rootClassName: string | Class name for the root element.
- rootStyle: StyleProp<ViewStyle> | Style for the root element.
- contentInsetAdjustmentBehavior: 'automatic' | 'scrollableAxes' | 'never' | 'always' | 'automatic' | Behavior for adjusting content insets.
- data: T[] | Data source for the list.
- ref: ListRef<T> | Reference to the FlashList instance.
- contentContainerClassName: string | Class name for the content container.
```

--------------------------------

### Show Action Sheet with Options

Source: https://nativewindui.com/component/action-sheet

Demonstrates how to use the `useActionSheet` hook to display a custom action sheet. It covers defining options, destructive and cancel button indices, and handling the selected action.

```javascript
import { useActionSheet } from'@expo/react-native-action-sheet';

const { showActionSheetWithOptions } = useActionSheet();
React.useEffect(() => {
  const options = ['Delete', 'Save', 'Cancel'];
  const destructiveButtonIndex = 0;
  const cancelButtonIndex = 2;

  showActionSheetWithOptions(
    {
      options,
      cancelButtonIndex,
      destructiveButtonIndex,
    },
    (selectedIndex: number) => {
      switch (selectedIndex) {
        case 1:
          // Save
          break;
        case destructiveButtonIndex:
          // Delete
          break;
        case cancelButtonIndex:
          // Canceled      
      }
    }
  );
}, []);
```

--------------------------------

### Basic Activity Indicator Usage

Source: https://nativewindui.com/component/activity-indicator

Demonstrates the basic usage of the Activity Indicator component by rendering it.

```tsx
<ActivityIndicator />
```

--------------------------------

### NativewindUI Card Component Usage

Source: https://nativewindui.com/component/card

Demonstrates how to import and use the NativewindUI Card component and its sub-components in a React Native application. It shows the basic structure for creating a card with title, subtitle, and description.

```javascript
import {
  addOpacityToRgb,
  Card,
  CardBadge,
  CardContent,
  CardDescription,
  CardFooter,
  CardImage,
  CardSubtitle,
  CardTitle,
} from'~/components/nativewindui/Card';
```

```jsx
<Card>
<CardContent><CardTitle>Title</CardTitle><CardSubtitle>Subtitle</CardSubtitle></CardContent><CardFooter><CardDescription>Description</CardDescription></CardFooter>
</Card>
```

--------------------------------

### NativeWindUI Toolbar Usage Import

Source: https://nativewindui.com/component/toolbar

Shows how to import the Toolbar, ToolbarCTA, and ToolbarIcon components from the NativeWindUI library for use in a React Native project.

```javascript
import {
  Toolbar,
  ToolbarCTA,
  ToolbarIcon,
} from'~/components/nativewindui/Toolbar';
```

--------------------------------

### TextField Component API Documentation

Source: https://nativewindui.com/component/text-field

Provides detailed information about the props available for the NativeWindUI TextField component, including their types, default values, and descriptions. It covers general props, platform-specific props for Android and iOS, and accessibility features.

```APIDOC
TextField
  Inherits all the props from React Native's TextInput component.

Prop | Type | Default | Description  
---|---|---|---
leftView | React.ReactNode |  | Element to be displayed on the left side of the text input.  
rightView | React.ReactNode |  | Element to be displayed on the right side of the text input.  
label | string |  | Label text displayed above the text input.  
labelClassName | string |  | Class names applied to the label.  
containerClassName | string |  | Class names applied to the container of the text field.  
errorMessage | string |  |  Android:Appears as text below the TextField with a destructive color and displays an error icon in the TextField iOS:Used only for accessibility, as errors are recommended to be shown in an Alert.  
materialVariant | 'outlined' | 'filled' | outlined | Material variant for the input, applies only on Android.  
materialRingColor | string |  | Override ring color, applies only on Android.  
materialHideActionIcons | string |  | Hides the clear button icon and the error icons, applies only on Android.  
accessibilityHint | string |  | Provides additional accessibility information. Can override errorMessage for accessibility.
```

--------------------------------

### Dropdown Menu Item and Submenu Creation

Source: https://nativewindui.com/component/dropdown-menu

Illustrates the usage of utility functions `createDropdownSubMenu` and `createDropdownItem` to structure dropdown menu data, including nested submenus.

```javascript
import { createDropdownSubMenu, createDropdownItem } from'~/components/nativewindui/DropdownMenu/utils';
const MENU = [
createDropdownSubMenu({ title: 'Submenu' }, [
  createDropdownItem({ actionKey: '1', title: 'Item 1' }),
  createDropdownItem({ actionKey: '2', title: 'Item 2' }),
]),
];
```

--------------------------------

### Wrap Layout with KeyboardProvider

Source: https://nativewindui.com/component/adaptive-search-header

This TypeScript code demonstrates how to wrap the root layout component (`_layout.tsx`) with `KeyboardProvider` from `react-native-keyboard-controller`, enabling keyboard management features for the Adaptive Search Header.

```typescript
import '../global.css';
import 'expo-dev-client';
import { PortalHost } from '@rn-primitives/portal';
import { StatusBar } from 'expo-status-bar';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/theme';
export { 
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />
      <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
        <NavThemeProvider value={NAV_THEME[colorScheme]}>
          {/* YOUR_ROOT_NAVIGATOR */}
          <PortalHost />
        </NavThemeProvider>
      </KeyboardProvider>
    </>
  );
}
```

--------------------------------

### NativewindUI Avatar Component Usage (React Native)

Source: https://nativewindui.com/component/avatar

Demonstrates how to use the NativewindUI Avatar component in a React Native application. It includes importing the necessary components and rendering an avatar with an image source and fallback text.

```typescript
import { Icon } from'@roninoss/icons';
import { Stack } from'expo-router';
import { View, Text, ScrollView, Pressable } from'react-native';
import { Avatar, AvatarFallback, AvatarImage } from'~/components/nativewindui/Avatar';
import { useColorScheme } from'~/lib/useColorScheme';

const TWITTER_AVATAR_URI =
'https://pbs.twimg.com/profile_images/1782428433898708992/1voyv4_A_400x400.jpg';

exportdefaultfunction AvatarScreen() {
  const { colors } = useColorScheme();

  return (
    <><Stack.Screenoptions={{title: 'NativewindUI',
headerSearchBarOptions: {
hideWhenScrolling:false,
          },
headerLargeTitle:true,
headerRight() {
return (
              <PressableclassName="opacity-80 active:opacity-40"><ViewclassName="opacity-90"><Iconname="cog-outline"color={colors.foreground} /></View></Pressable>            );
          },
        }} />
<ScrollViewcontentInsetAdjustmentBehavior="automatic"className="p-4"><ViewclassName="border-border bg-card gap-4 rounded-xl border p-4 pb-6 shadow-sm shadow-black/10 dark:shadow-none"><TextclassName="text-foreground text-center text-sm font-medium tracking-wider opacity-60">
            Avatar
</Text><ViewclassName="items-center"><Avataralt="NativewindUI Avatar"><AvatarImagesource={{uri:TWITTER_AVATAR_URI }} /><AvatarFallback><TextclassName="text-white">NUI</Text></AvatarFallback></Avatar></View></View></ScrollView></>
  );
}
```

--------------------------------

### OTP Screen Component

Source: https://nativewindui.com/screen/otp-screen

The OTP Screen component allows users to input a one-time password for authentication. It is a premium component requiring an all-access subscription to utilize its source code. The component is designed to be used within the NativewindUI framework.

```English
This section describes the OTP Screen component, which is a Pro template. It requires all-access to use the source code. The component is intended for user authentication via a one-time password.
```

--------------------------------

### NativewindUI Checkout Flow Components

Source: https://nativewindui.com/screen/checkout-flow

This section details the UI components and templates specifically designed for checkout flows within native mobile applications. It highlights the availability of 'Pro' templates that require special access.

```English
Project: /websites/nativewindui

# Checkout Flow
A collection of screens that are commonly used in checkout flows.
Pro template
Requires all-access to use the source code

Try It Live:
In the Companion App
Apple
Android

Unlock All Pro Templates & Components
Elevate your app with powerful, native-feeling components and templates. Build faster with beautiful ready-to-use designs.
Get all-access
```

--------------------------------

### NativewindUI Messaging Flow (Android Style)

Source: https://nativewindui.com/screen/messaging-flow-android-style

This section details the 'Messaging Flow (Android style)' component, a collection of screens designed to mimic the user experience of the native Android messaging application. It is available as a Pro template, requiring all-access to utilize its source code.

```English
## Messaging Flow (Android style)
A collection of screens inspired by the Android messaging app.
Pro template
Requires all-access to use the source code
```

--------------------------------

### NativeWindUI Context Menu Utilities

Source: https://nativewindui.com/component/context-menu

Utility functions for creating context menu items and submenus within the NativeWindUI framework. These functions help structure the menu data.

```javascript
import { createContextSubMenu, createContextItem } from'~/components/nativewindui/ContextMenu/utils';

const MENU = [
  createContextSubMenu({ title: 'Submenu' }, [
    createContextItem({ actionKey: '1', title: 'Item 1' }),
    createContextItem({ actionKey: '2', title: 'Item 2' }),
  ]),
];
```

--------------------------------

### NativeWindUI Badge Component Props

Source: https://nativewindui.com/component/badge

Details the available props for the NativeWindUI Badge component, including their types, default values, and descriptions. It inherits props from NativewindUI's Text component.

```APIDOC
Badge
Inherits all the props from NativewindUI's Text component except for the variant prop.

Prop | Type | Default | Description  
---|---|---|---
variant | 'info' | 'destructive' | 'destructive' | The visual style of the badge. Defaults to "destructive".  
maxCount | number |  | The maximum count to display. If the count exceeds this value, it will display "{maxCount}+".  
textVariant | TextProps["variant"] | "caption2" | The text style variant to use. Defaults to "caption2".  
containerClassName | string |  | Additional class name(s) for the badge container.
```

--------------------------------

### NativeWindUI Alert Props

Source: https://nativewindui.com/component/alert

Defines the available properties for the NativeWindUI Alert component, including their types and descriptions.

```APIDOC
Alert
Prop | Type | Description  
---|---|---  
title | string | The title of the alert.  
buttons | (Omit<AlertButton, "onPress"> & { onPress?: (text: AlertInputValue) => void })[] | An array of button configurations for the alert.  
message | string | The message content of the alert.  
prompt | object | Configuration for a prompt within the alert, if applicable.  
prompt.type | Exclude<AlertType, "default"> | The type of prompt to display.  
prompt.defaultValue | string | The default value of the prompt input.  
prompt.keyboardType | KeyboardType | The keyboard type for the prompt input.  
materialPortalHost | string | The portal host for Android elements.  
materialIcon | Pick<IconProps<'material'>, 'color' | 'size'> & { name: MaterialIconName } | Configuration for a material icon in the alert.  
materialWidth | number | The width of the Android alert.  
children | React.ReactNode | The children elements to render inside the alert.
```

--------------------------------

### NativewindUI Avatar Component Source Code

Source: https://nativewindui.com/component/avatar

The source code for the NativewindUI Avatar component, including Avatar, AvatarImage, and AvatarFallback. This code is intended to be copied into the specified file path in the project.

```typescript
import * as AvatarPrimitive from'@rn-primitives/avatar';
import * as React from'react';
import { cn } from'~/lib/cn';

const Avatar = React.forwardRef<AvatarPrimitive.RootRef, AvatarPrimitive.RootProps>(
  ({ alt, className, ...props }, ref) => {
    return (
      <AvatarPrimitive.Rootref={ref}alt={alt}className={cn('relativeflexh-10w-10shrink-0overflow-hiddenrounded-full', className)}
        {...props}
      />    );
  }
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<AvatarPrimitive.ImageRef, AvatarPrimitive.ImageProps>(
  ({ className, ...props }, ref) => {
    return (
      <AvatarPrimitive.Imageref={ref}className={cn('aspect-squareh-fullw-full', className)}
        {...props}
      />    );
  }
);
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<AvatarPrimitive.FallbackRef, AvatarPrimitive.FallbackProps>(
  ({ className, ...props }, ref) => {
    return (
      <AvatarPrimitive.Fallbackref={ref}className={cn(
          'bg-mutedflexh-fullw-fullitems-centerjustify-centerrounded-full',
className        )}
        {...props}
      />    );
  }
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };

```

--------------------------------

### ContextMenu with State and Preview

Source: https://nativewindui.com/component/context-menu

Demonstrates a ContextMenu with dynamic state display (checked status and selected emoji) and an auxiliary preview on iOS. It also includes a basic pressable element.

```javascript
import React, { useRef } from 'react';
import { View, Pressable, Text, Platform, Animated } from 'react-native';
import { ContextMenu, createContextItem, createContextSubMenu } from '~/components/nativewindui/ContextMenu';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { AlertAnchor } from '~/components/nativewindui/Alert';

const MyContextMenu = () => {
  const checked = true;
  const selectedEmoji = '😊';
  const alertRef = useRef(null);

  const STATIC_ITEMS = [
    createContextSubMenu({ title: 'Submenu 1', iOSItemSize: 'small', loading: false }, [
      createContextSubMenu({ title: 'Sub', iOSItemSize: 'small' }, [
        { actionKey: '10', title: 'Select Me' },
        { actionKey: '20', title: 'No! Select Me!' },
      ]),
      createContextItem({
        actionKey: '430',
        title: 'Item 430',
        icon: { name: 'checkmark.seal', namingScheme: 'sfSymbol' },
      }),
    ]),
    createContextSubMenu({ title: 'Hello', iOSItemSize: 'small' }, [
      createContextItem({
        actionKey: '30',
        icon: { name: 'checkmark.seal', namingScheme: 'sfSymbol' },
      }),
      createContextItem({
        actionKey: '31',
        icon: { name: 'checkmark.seal', namingScheme: 'sfSymbol' },
      }),
      createContextItem({
        actionKey: '32',
        icon: { name: 'checkmark.seal', namingScheme: 'sfSymbol' },
      }),
      createContextItem({
        actionKey: '33',
        icon: { name: 'checkmark.seal', namingScheme: 'sfSymbol' },
      }),
    ]),
    createContextSubMenu({ title: '', iOSType: 'inline', iOSItemSize: 'small' }, [
      createContextItem({ actionKey: '130', title: '💧' }),
      createContextItem({ actionKey: '131', title: '💧' }),
      createContextItem({ actionKey: '132', title: '💧' }),
      createContextItem({ actionKey: '133', title: '💧' }),
    ]),
    createContextItem({
      actionKey: '40',
      title: 'Delete Computer',
      destructive: true,
      image: { url: 'https://picsum.photos/id/2/100', cornerRadius: 30 },
    }),
  ];

  return (
    <>
      <View>
        <Text variant="footnote" className="text-muted-foreground font-bold">With State</Text>
        <Text variant="footnote">Checked: {checked ? 'true' : 'false'}</Text>
        <Text variant="footnote">Emoji: {selectedEmoji}</Text>
      </View>
      <ContextMenu
        className="rounded-md"
        title="Dropdown Menu"
        items={STATIC_ITEMS}
        materialAlign="start"
        auxiliaryPreviewPosition="center"
        renderAuxiliaryPreview={() => (
          <Animated.View entering={FadeIn} exiting={FadeOut} className="bg-card flex-row items-center justify-center rounded-md px-12 py-4">
            <Text variant="footnote">Auxiliary Preview</Text>
          </Animated.View>
        )}
        iosRenderPreview={() => (
          <View className="aspect-square h-72 items-center justify-center rounded-md bg-red-500 px-12 py-4">
            <Text variant="footnote">iOS Preview</Text>
          </View>
        )}
        onItemPress={(item) => {
          alertRef.current?.alert({
            title: 'Item Pressed',
            message: `Item ${item.actionKey} pressed`,
            buttons: [{ text: 'OK' }],
            materialWidth: 350,
          });
        }}>
        <Pressable className="border-accent bg-card h-32 items-center justify-center rounded-md border border-dashed">
          <Text variant="footnote" className="text-muted-foreground font-bold">With Preview</Text>
          <Text>Long Press Me</Text>
        </Pressable>
      </ContextMenu>
      {Platform.OS === 'ios' && (
        <ContextMenu className="rounded-md" title="Dropdown Menu" items={STATIC_ITEMS} materialAlign="start" auxiliaryPreviewPosition="center" renderAuxiliaryPreview={() => {
              return (
<Animated.View entering={FadeIn} exiting={FadeOut} className="bg-card flex-row items-center justify-center rounded-md px-12 py-4"><Text variant="footnote">Auxiliary Preview</Text></Animated.View>
              );
            }} iosRenderPreview={() => {
              return (
<View className="aspect-square h-72 items-center justify-center rounded-md bg-red-500 px-12 py-4"><Text variant="footnote">iOS Preview</Text></View>
              );
            }} onItemPress={(item) => {
              alertRef.current?.alert({
                title: 'Item Pressed',
                message: `Item ${item.actionKey} pressed`,
                buttons: [{ text: 'OK' }],
                materialWidth: 350,
              });
            }}>
<Pressable className="border-accent bg-card h-32 items-center justify-center rounded-md border border-dashed"><Text variant="footnote" className="text-muted-foreground font-bold">                With Preview
</Text><Text>Long Press Me</Text></Pressable></ContextMenu>
        )}
      </View>
      <AlertAnchor ref={alertRef} />
    </>
  );
};

```

--------------------------------

### NativeWindUI Drawer Layout and Content

Source: https://nativewindui.com/component/drawer-content

This snippet demonstrates how to set up a drawer navigation layout using Expo Router and implement the NativeWindUI Drawer Content component. It includes screen configuration, styling options, and the structure for displaying navigation items within the drawer.

```tsx
import { DrawerContentComponentProps } from'@react-navigation/drawer';
import { Icon } from'@roninoss/icons';
import { Stack } from'expo-router';
import { Drawer } from'expo-router/drawer';
import { Platform, Pressable, View } from'react-native';
import { Text } from'~/components/nativewindui/Text';
import {
  DrawerContentRoot,
  DrawerContentSection,
  DrawerContentSectionItem,
  DrawerContentSectionTitle,
  getActiveDrawerContentScreen,
} from'~/components/nativewindui/DrawerContent';
import { useColorScheme } from'~/lib/useColorScheme';

exportdefaultfunctionDrawerLayout() {
  const { colors } = useColorScheme();

  return (
    <><Stack.Screenoptions={{headerShown:false }} /><DrawerdrawerContent={DrawerContent}
screenOptions={{
      headerShown:true,
      swipeEnabled:true,
      headerTintColor:Platform.OS === 'ios' ? undefined:colors.foreground,
    }}>
      <Drawer.Screenname="index"options={{title: 'Drawer'}} />
    </Drawer></>
  );
}

functionDrawerContent(props: DrawerContentComponentProps) {
  const { colors } = useColorScheme();
  const activeScreen = getActiveDrawerContentScreen(props);

  return (
    <DrawerContentRootnavigation={props.navigation}
      actions={
        <Pressable>
          <Icon
            ios={{name: 'ellipsis.circle', weight: 'light'}}
            materialIcon={{
              name: 'dots-horizontal-circle-outline',
              type: 'MaterialCommunityIcons',
            }}
            color={Platform.select({default:colors.grey, ios:colors.primary})}
          />
        </Pressable>
      }>
      <DrawerContentSectionTitletype="large">Music</DrawerContentSectionTitle>
      <DrawerContentSection>
        <DrawerContentSectionItem
          icon={{name: 'play-circle-outline'}}
          isActive={activeScreen === 'index'}
          label="Listen Now"
          rightView={<TextclassName="px-1 text-sm">1</Text>}
        />
        <DrawerContentSectionItemicon={{name: 'atom'}} isActive={false}label="React Native" />
        <DrawerContentSectionItemicon={{name: 'alarm'}} isActive={false}label="Clock" />
      </DrawerContentSection>
      {Platform.OS === 'android' && <ViewclassName="bg-border mx-3.5 my-1 h-px" />}
      <DrawerContentSectionTitle>Library</DrawerContentSectionTitle>
      <DrawerContentSection>
        <DrawerContentSectionItem
          icon={{name: 'microphone-variant'}}
          isActive={false}
          label="Artists"
        />
        <DrawerContentSectionItemicon={{name: 'music-note'}} isActive={false}label="Songs" />
        <DrawerContentSectionItemicon={{name: 'monitor'}} isActive={false}label="TV & Movies" />
      </DrawerContentSection>
    </DrawerContentRoot>
  );
}
```

--------------------------------

### NativewindUI Action Sheet Component Usage

Source: https://nativewindui.com/component/action-sheet

Demonstrates how to use the Action Sheet component in a React Native application. It shows how to import necessary modules, configure the header, and display the action sheet with options when a button is pressed.

```javascript
import { useActionSheet } from'@expo/react-native-action-sheet';
import { Icon } from'@roninoss/icons';
import { Stack } from'expo-router';
import { Button, View, Text, ScrollView, Pressable } from'react-native';
import { useColorScheme } from'~/lib/useColorScheme';

exportdefaultfunctionActionSheetScreen() {
  const { colorScheme, colors } = useColorScheme();
  const { showActionSheetWithOptions } = useActionSheet();

  return (
    <><Stack.Screenoptions={{title: 'NativewindUI',
headerSearchBarOptions: {
hideWhenScrolling:false,
          },
headerLargeTitle:true,
headerRight() {
return (
              <PressableclassName="opacity-80 active:opacity-40"><ViewclassName="opacity-90"><Iconname="cog-outline"color={colors.foreground} /></View></Pressable>            );
          },
        }} />
<ScrollViewcontentInsetAdjustmentBehavior="automatic"className="p-4"><ViewclassName="border-border bg-card gap-4 rounded-xl border p-4 pb-6 shadow-sm shadow-black/10 dark:shadow-none"><TextclassName="text-foreground text-center text-sm font-medium tracking-wider opacity-60">            Action Sheet
</Text><Buttoncolor="grey"onPress={async () => {
              const options = ['Delete', 'Save', 'Cancel'];
              const destructiveButtonIndex = 0;
              const cancelButtonIndex = 2;
              showActionSheetWithOptions(
                {
                  options,
                  cancelButtonIndex,
                  destructiveButtonIndex,
                  containerStyle: {
                    backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
                  },
                  textStyle: {
                    color: colors.foreground,
                  },
                },
                (selectedIndex) => {
                  switch (selectedIndex) {
                    case 1:
                      // Save
                      break;
                    case destructiveButtonIndex:
                      // Delete
                      break;
                    case cancelButtonIndex:
                    // Canceled
                  }
                }
              );
            }}
            title="Open action sheet" />
</View></ScrollView></>  );
}
```

--------------------------------

### NativewindUI Picker Component Implementation

Source: https://nativewindui.com/component/picker

The core implementation of the NativewindUI Picker component, which wraps the @react-native-picker/picker. It includes styling, color handling, and props forwarding.

```typescript
import { Picker as RNPicker } from'@react-native-picker/picker';
import { View } from'native';
import { cn } from'~/lib/cn';
import { useColorScheme } from'~/lib/useColorScheme';

exportfunctionPicker<T>({
  mode = 'dropdown',
  style,
  dropdownIconColor,
  dropdownIconRippleColor,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RNPicker<T>>) {
  const { colors } = useColorScheme();

  return (
    <ViewclassName={cn(
        'ios:shadow-smios:shadow-black/5border-backgroundbg-backgroundrounded-mdborder',
className      )}><RNPickermode={mode}
style={style ?? {
            backgroundColor:colors.root,
borderRadius:8,
          }
        }
dropdownIconColor={dropdownIconColor ?? colors.foreground}
dropdownIconRippleColor={dropdownIconRippleColor ?? colors.foreground}
        {...props}
      /></View>
  );
}

exportconst PickerItem = RNPicker.Item;
```

--------------------------------

### NativewindUI Checkbox Basic Implementation

Source: https://nativewindui.com/component/checkbox

Illustrates the minimal code needed to render a NativewindUI Checkbox component.

```javascript
<Checkbox />
```

--------------------------------

### Import Large Title Header

Source: https://nativewindui.com/component/large-title-header

Demonstrates how to import the LargeTitleHeader component from the NativeWindUI library.

```javascript
import { LargeTitleHeader } from'~/components/nativewindui/LargeTitleHeader';
```

--------------------------------

### NativewindUI Card Component Props

Source: https://nativewindui.com/component/card

Details the props available for the NativewindUI Card component and its related sub-components. This includes inherited props from base components like React Native's View and Expo Image, as well as specific props for customization.

```APIDOC
Card:
  Inherits props from React Native's View component.
  Props:
    rootClassName | string | Class name for the root element of the Card.

CardBadge:
  Inherits props from React Native's View component.

CardContent:
  Inherits props from React Native's View component.
  Props:
    linearGradientColors | readonly string[] | Colors used in the linear gradient for the Card background.
    iosBlurIntensity | number | Default: 3 | Intensity of the blur effect on iOS devices.
    iosBlurClassName | string | Class name applied to the blur view on iOS.

CardImage:
  Inherits props from the Expo Image component.
  Props:
    transition | number | Default: 200 | Transition duration for the image in milliseconds.
    style | StyleProp<ViewStyle> | Style applied to the image container.
    contentPosition | 'top left' | 'top right' | 'bottom left' | 'bottom right' | Default: 'top right' | Position of the image content inside the container.
    contentFit | 'cover' | 'contain' | 'fill' | 'none' | Default: 'cover' | How the image content fits within its container.
    materialRootClassName | string | ANDROID ONLY: Class name for the root container of the image component.

CardTitle:
  Inherits props from NativewindUI's Text component.

CardSubtitle:
  Inherits props from NativewindUI's Text component.

CardDescription:
  Inherits props from NativewindUI's Text component.

CardFooter:
  Inherits props from the Blur View component.
```

--------------------------------

### NativewindUI Text Component Usage

Source: https://nativewindui.com/component/text

Demonstrates how to import and use the NativewindUI Text component in a React Native application. It showcases basic text rendering.

```typescript
import { Text } from'~/components/nativewindui/Text';

<Text>Body</Text>
```

--------------------------------

### NativeWindUI Bottom Sheet Implementation

Source: https://nativewindui.com/component/bottom-sheet

Demonstrates how to use the NativeWindUI Bottom Sheet component in a React Native application with Expo Router. It includes setting up the sheet, handling its presentation, and integrating with the app's theme and navigation.

```javascript
import { BottomSheetView } from'@gorhom/bottom-sheet';
import { Icon } from'@roninoss/icons';
import { Stack } from'expo-router';
import { Button, Platform, Pressable, ScrollView, Text, View } from'react-native';
import { Sheet, useSheetRef } from'~/components/nativewindui/Sheet';
import { useColorScheme } from'~/lib/useColorScheme';

exportdefaultfunctionSheetScreen() {
  const { colors, isDarkColorScheme } = useColorScheme();
  const bottomSheetModalRef = useSheetRef();

  return (
    <><Stack.Screenoptions={{title: 'NativewindUI',
headerSearchBarOptions: {
hideWhenScrolling:false,
          },
headerLargeTitle:true,
headerRight() {
return (
              <PressableclassName="opacity-80 active:opacity-40"><ViewclassName="opacity-90"><Iconname="cog-outline"color={colors.foreground} /></View></Pressable>            );
          },
        }} />
<ScrollViewcontentInsetAdjustmentBehavior="automatic"className="p-4"><ViewclassName="border-border bg-card gap-4 rounded-xl border p-4 pb-6 shadow-sm shadow-black/10 dark:shadow-none"><TextclassName="text-foreground text-center text-sm font-medium tracking-wider opacity-60">
            Bottom Sheet
</Text><Buttoncolor={isDarkColorScheme && Platform.OS === 'ios' ? 'white' : 'black'}
title="Open Bottom Sheet"onPress={() => bottomSheetModalRef.current?.present()}
          />
</View></ScrollView><Sheetref={bottomSheetModalRef}snapPoints={[200]}><BottomSheetViewclassName="flex-1 items-center justify-center pb-8"><TextclassName="text-foreground">@gorhom/bottom-sheet 🎉</Text></BottomSheetView></Sheet></>
  );
}
```

--------------------------------

### ProgressIndicator Props

Source: https://nativewindui.com/component/progress-indicator

Details the properties available for the ProgressIndicator component. It inherits all props from React Native's View component and includes specific props for controlling its behavior and appearance.

```APIDOC
ProgressIndicator:
  Inherits props from: React Native View component

  Props:
    value (number): The current value to be represented by the progress indicator.
    max (number): The maximum value for the progress indicator's range.
    getValueLabel ((value: number, max: number) => string): A function used to format the display label for the current value. It receives the current value and the maximum value as arguments.
```

--------------------------------

### NativewindUI Progress Indicator Component Implementation

Source: https://nativewindui.com/component/progress-indicator

The core implementation of the ProgressIndicator component using React Native Reanimated for smooth animations. It handles value, max, and custom label formatting.

```typescript
import * as React from'react';
import { View } from'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from'react-native-reanimated';
import { cn } from'~/lib/cn';
const DEFAULT_MAX = 100;
const ProgressIndicator = React.forwardRef<
  React.ElementRef<typeof View>,
  React.ComponentPropsWithoutRef<typeof View> & {
    value?: number;
    max?: number;
    getValueLabel?: (value: number, max: number) =>string;
  }
>(
(
    {
      value: valueProp,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      className,
      children,
      ...props
    },
    ref
) => {
const max = maxProp ?? DEFAULT_MAX;
const value = isValidValueNumber(valueProp, max) ? valueProp : 0;
const progress = useDerivedValue(() => value ?? 0);
const indicator = useAnimatedStyle(() => {
return {
width: withSpring(
`${interpolate(progress.value, [0, 100], [1, 100], Extrapolation.CLAMP)}%`,
          {
            overshootClamping: true,
          }
        ),
      };
    });
return (
<Viewrole="progressbar"ref={ref}aria-valuemax={max}aria-valuemin={0}aria-valuenow={value}aria-valuetext={getValueLabel(value,max)}
accessibilityValue={{min:0,
max,
now:value,
text:getValueLabel(value, max),
        }}
className={cn('relativeh-1w-fulloverflow-hiddenrounded-full', className)}
        {...props}><ViewclassName="bg-muted absolute bottom-0 left-0 right-0 top-0 opacity-20" /><Animated.Viewrole="presentation"style={indicator}className={cn('bg-primaryh-full')} /></View>
    );
  }
);
ProgressIndicator.displayName = 'ProgressIndicator';
export { ProgressIndicator };
functiondefaultGetValueLabel(value: number, max: number) {
return`${Math.round((value / max) * 100)}%`;
}
functionisValidValueNumber(value: any, max: number): valueisnumber{
returntypeof value === 'number' && !isNaN(value) && value <= max && value >= 0;
}

```

--------------------------------

### Expo Router ContextMenu Screen

Source: https://nativewindui.com/component/context-menu

Demonstrates a ContextMenu component within an Expo Router screen. It includes static and dynamic menu items, handling item presses, and rendering custom auxiliary previews. The component utilizes React hooks for state management and refs for accessing component methods.

```typescript
import { Stack } from'expo-router';
import * as React from'react';
import { Platform, Pressable, View } from'react-native';
import Animated, { FadeIn, FadeOut } from'react-native-reanimated';
import { Text } from'~/components/nativewindui/Text';
import { AlertAnchor } from'~/components/nativewindui/Alert';
import { AlertRef } from'~/components/nativewindui/Alert/types';
import { Button } from'~/components/nativewindui/Button';
import { ContextMenu } from'~/components/nativewindui/ContextMenu';
import { ContextMenuRef } from'~/components/nativewindui/ContextMenu/types';
import {
  createContextItem,
  createContextSubMenu,
} from'~/components/nativewindui/ContextMenu/utils';
import { useColorScheme } from'~/lib/useColorScheme';

const STATIC_ITEMS = [
  createContextItem({ actionKey: '1', title: 'Item 1' }),
  createContextItem({ actionKey: '2', title: 'Item 2' }),
  createContextItem({ actionKey: '3', title: 'Item 3' }),
];

export default function ContextMenuScreen() {
  const [checked, setChecked] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const { colors } = useColorScheme();
  const ref = React.useRef<ContextMenuRef>(null);
  const [selectedEmoji, setSelectedEmoji] = React.useState('');
  const alertRef = React.useRef<AlertRef>(null);

  const dynamicItems = React.useMemo(() => {
    return [
      createContextSubMenu({ title: 'Sub Menu', iOSItemSize: 'small', loading: isLoading }, [
        createContextSubMenu({ title: 'Submenu 2' }, [
          { actionKey: '1', title: 'Item 1' },
          { actionKey: '2', title: 'Item 2' },
        ]),
        createContextItem({ actionKey: '43', title: 'Item 3' }),
      ]),
      createContextItem({
        actionKey: '4',
        title: 'Checkbox Item',
        state: { checked },
        keepOpenOnPress: true,
        icon: {
          namingScheme: 'sfSymbol',
          name: 'checkmark.seal',
          color: colors.primary,
        },
      }),
      createContextItem({
        actionKey: '5',
        title: 'Set to loading',
        keepOpenOnPress: true,
        disabled: isLoading,
      }),
    ];
  }, [checked, isLoading]);

  function handleEmojiPress(emoji: string) {
    return () => {
      if (emoji === selectedEmoji) {
        return;
      }
      setSelectedEmoji(emoji);
      ref.current?.dismissMenu?.();
    };
  }

  return (
    <>
      <Stack.Screenoptions={{ title: 'ContextMenu' }} />
      <View className="flex-1  justify-center gap-8 p-8">
        <ContextMenu
          className="rounded-md"
          title="Dropdown Menu"
          items={STATIC_ITEMS}
          materialAlign="start"
          auxiliaryPreviewPosition="center"
          renderAuxiliaryPreview={() => {
            return (
              <Animated.Viewentering={FadeIn}
exiting={FadeOut}
className="flex-row items-center justify-center rounded-md bg-red-500 px-12 py-4">
                <Textvariant="footnote">Auxiliary Preview</Text>
              </Animated.View>
            );
          }}
          onItemPress={(item) => {
            alertRef.current?.alert({
              title: 'Item Pressed',
              message: `Item ${item.actionKey} pressed`,
              buttons: [{ text: 'OK' }],
              materialWidth: 350,
            });
          }}>
          <PressableclassName="border-foreground bg-card h-32 items-center justify-center rounded-md border border-dashed">
            <Textvariant="footnote"className="text-muted-foreground font-bold">
              Static
            </Text>
            <Text>Long Press Me</Text>
          </Pressable>
        </ContextMenu>
        <ContextMenu
          ref={ref}
          className="rounded-md"
          items={dynamicItems}
          auxiliaryPreviewPosition="center"
          renderAuxiliaryPreview={() => {
            return (
              <Animated.Viewentering={FadeIn}
exiting={FadeOut}
className="bg-card flex-row rounded-md p-2 shadow">
                <Buttonvariant={selectedEmoji === '❤️' ? 'tonal' : 'plain'}
                  size="icon"
                  onPress={handleEmojiPress('❤️')}>
                  <Textvariant="footnote">❤️</Text>
                </Button>
                <Buttonvariant={selectedEmoji === '😍' ? 'tonal' : 'plain'}
                  size="icon"
                  onPress={handleEmojiPress('😍')}>
                  <Textvariant="footnote">😍</Text>
                </Button>
                <Buttonvariant={selectedEmoji === '🥰' ? 'tonal' : 'plain'}
                  size="icon"
                  onPress={handleEmojiPress('🥰')}>
                  <Textvariant="footnote">🥰</Text>
                </Button>
                <Buttonvariant={selectedEmoji === '💘' ? 'tonal' : 'plain'}
                  size="icon"
                  onPress={handleEmojiPress('💘')}>
                  <Textvariant="footnote">💘</Text>
                </Button>
              </Animated.View>
            );
          }}
          onItemPress={(item) => {
            if (item.actionKey === '4') {
              setChecked((prev) => !prev);
              return;
            }
            if (item.actionKey === '5') {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
              }, 1500);
              return;
            }
            alertRef.current?.alert({
              title: 'Item Pressed',
              message: `Item ${item.actionKey} pressed`,
              buttons: [{ text: 'OK' }],
              materialWidth: 350,
            });
          }}>
          <Pressable
            onLongPress={() => {
              if (isLoading) {
                setTimeout(() => {
                  setIsLoading(false);
                }, 1500);
              }
            }}
            className="border-primary bg-card h-32 items-center justify-center rounded-md border border-dashed">
            <Textvariant="footnote"className="text-muted-foreground font-bold">
              Dynamic
            </Text>
            <Text>Long Press Me</Text>
          </Pressable>
        </ContextMenu>
      </View>
      <AlertAnchor ref={alertRef} />
    </>
  );
}

```

--------------------------------

### Android Style Settings Screen

Source: https://nativewindui.com/screen/settings-screen-android-style

A screen component designed to mimic the appearance and functionality of the Android settings application. This component is part of the 'Pro' templates and requires all-access to use its source code.

```English
This documentation describes the 'Settings Screen (Android style)' component.

Features:
- Inspired by the Android settings app.
- Part of the Pro templates.
- Requires all-access for source code.

Usage:
- Scan the QR code to try this component on your device via the Companion App.
- Available for iOS and Android platforms.
```

--------------------------------

### NativewindUI Text Component Implementation

Source: https://nativewindui.com/component/text

Provides the source code for the NativewindUI Text component, including its styling variants using class-variance-authority and integration with react-native-uitextview via cssInterop.

```typescript
import { VariantProps, cva } from'class-variance-authority';
import { cssInterop } from'nativewind';
import * as React from'react';
import { UITextView } from'react-native-uitextview';
import { cn } from'~/lib/cn';

cssInterop(UITextView, { className: 'style' });

const textVariants = cva('text-foreground', {
  variants: {
    variant: {
      largeTitle: 'text-4xl',
      title1: 'text-2xl',
      title2: 'text-[22px] leading-7',
      title3: 'text-xl',
      heading: 'text-[17px] leading-6 font-semibold',
      body: 'text-[17px] leading-6',
      callout: 'text-base',
      subhead: 'text-[15px] leading-6',
      footnote: 'text-[13px] leading-5',
      caption1: 'text-xs',
      caption2: 'text-[11px] leading-4',
    },
    color: {
      primary: '',
      secondary: 'text-secondary-foreground/90',
      tertiary: 'text-muted-foreground/90',
      quarternary: 'text-muted-foreground/50',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'primary',
  },
});

const TextClassContext = React.createContext<string | undefined>(undefined);

function Text({
  className,
  variant,
  color,
  ...props
}: React.ComponentPropsWithoutRef<typeof UITextView> & VariantProps<typeof textVariants>) {
  const textClassName = React.useContext(TextClassContext);
  return (
    <UITextViewclassName={cn(textVariants({variant, color }), textClassName, className)}
      {...props}
    />
  );
}

export { Text, TextClassContext, textVariants };

```

--------------------------------

### NativeWindUI ContextMenu Props

Source: https://nativewindui.com/component/context-menu

Defines the properties for the ContextMenu component, including title, items, styling, and event handlers. It inherits all props from React Native's View component.

```APIDOC
ContextMenu Props:

Inherits all props from React Native's View component.

- title (string): The title of the context menu.
- items ((ContextItem | ContextSubMenu)[]): The items or submenus to display in the context menu.
- iOSItemSize ('small' | 'medium' | 'large'): The preferred item size on iOS.
- children (React.ReactNode): The child component to render inside the context menu. It needs to accept Pressable props to ensure compatibility on Android.
- onItemPress ((item: Omit<ContextItem, 'icon'>) => void): Callback function triggered when an item is pressed.
- enabled (boolean, default: true): Whether the context menu is enabled.
- iosRenderPreview (() => React.ReactElement): Function to render a preview on iOS.
- iosOnPressMenuPreview (() => void): Callback for pressing the menu preview on iOS.
- renderAuxiliaryPreview (() => React.ReactElement): Function to render an auxiliary preview.
- auxiliaryPreviewPosition ('start' | 'center' | 'end'): Position for the auxiliary preview.
- materialPortalHost (string): The host for the Android portal.
- materialSideOffset (number, default: 2): Side offset for Android context menu.
- materialAlignOffset (number): Alignment offset for Android context menu.
- materialAlign ('start' | 'center' | 'end'): Alignment for Android context menu.
- materialWidth (number): Width for the Android context menu.
- materialMinWidth (number): Minimum width for the Android context menu.
- materialLoadingText (string): Text to display while the context menu is loading.
- materialSubMenuTitlePlaceholder (string): Placeholder title for the Android submenu.
- materialOverlayClassName (string): Class name for the Android overlay.
```

--------------------------------

### Layout Configuration with KeyboardProvider

Source: https://nativewindui.com/component/form

This snippet demonstrates how to wrap the root layout component in `_layout.tsx` with `KeyboardProvider`. It configures `statusBarTranslucent` and `navigationBarTranslucent` props for enhanced keyboard handling in Expo applications.

```tsx
import '../global.css';
    import 'expo-dev-client';
    import { PortalHost } from '@rn-primitives/portal';
    import { StatusBar } from 'expo-status-bar';
    import { KeyboardProvider } from 'react-native-keyboard-controller';       // YOUR_OTHER_IMPORTS
    import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
    import { NAV_THEME } from '~/theme';
    export {
      // Catch any errors thrown by the Layout component.
      ErrorBoundary,
    } from 'expo-router';
    export default function RootLayout() {
      useInitialAndroidBarSync();
      const { colorScheme, isDarkColorScheme } = useColorScheme();
      return (
        <>
          <StatusBar
            key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
            style={isDarkColorScheme ? 'light' : 'dark'}
          />
          <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
             <NavThemeProvider value={NAV_THEME[colorScheme]}>
                 {/* YOUR_ROOT_NAVIGATOR */}
                 <PortalHost />
              </NavThemeProvider>
          </KeyboardProvider>
        </>
      );
    }
```

--------------------------------

### React Native Share API Usage

Source: https://nativewindui.com/component/activity-view

This snippet shows the basic import and usage of the React Native Share API for sharing content, which is a core part of the Activity View functionality.

```javascript
import { Share } from'react-native';
```

--------------------------------

### NativewindUI Button Component Usage

Source: https://nativewindui.com/component/button

Demonstrates how to use the NativewindUI Button component in a React Native application. It showcases different variants like primary, secondary, tonal, plain, and icon-only buttons, along with handling loading states and platform-specific styling.

```javascript
import { Text } from'~/components/nativewindui/Text';
import { Button } from'~/components/nativewindui/Button';
import { Icon } from'@roninoss/icons';
import { Stack } from'expo-router';
import * as React from'react';
import { Platform, View } from'react-native';
import Animated, { FadeIn } from'react-native-reanimated';
import { ActivityIndicator } from'~/components/nativewindui/ActivityIndicator';
import { useColorScheme } from'~/lib/useColorScheme';

exportdefaultfunctionButtonScreen() {
  const { colors } = useColorScheme();
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <><Stack.Screenoptions={{title: 'Button' }} /><ViewclassName="flex-1 items-center justify-center gap-8"><Button><Iconname="play"color="white"size={21} /><Text>Primary</Text></Button><Buttonvariant="secondary"><Text>Secondary</Text></Button><ButtononPress={() => {
            setIsLoading((prev) => !prev);
          }}
          variant="tonal">
          {isLoading && (
<Animated.Viewentering={FadeIn.delay(200)}><ActivityIndicatorsize="small" /></Animated.View>          )}
<Text>Tonal</Text></Button><Buttonvariant="plain"><Text>Plain</Text></Button><Buttonvariant="tonal"size="icon"><Iconname="heart"color={Platform.OS === 'ios' ? colors.primary:colors.foreground}
size={21}          /></Button></View></>  );
}
```

--------------------------------

### NativewindUI Components Overview

Source: https://nativewindui.com/index

NativewindUI provides a variety of platform-perfect UI elements that feel native on both iOS and Android. These components are designed to elevate the user experience with beautiful, platform-specific designs.

```React Native
### Components
Platform-perfect components, ready for your next app
Expertly crafted UI elements that feel truly native on both iOS and Android. Elevate your app's experience with our beautiful platform-specific designs.
iOSAndroid
### Action Sheet
A modal view that presents choices related to an action people initiate.
### Activity Indicator
Lets people know that your app isn't stalled while it loads content or performs lengthy operations.
### Activity View
Often called a share sheet, an activity view presents a range of tasks that people can perform in the current context.
### Alert
An alert gives people critical information they need right away.
### Adaptive Search Header
A screen header with a visible search input.
### Avatar
An image that represents a person on your platform.
### Bottom Sheet
A bottom sheet helps people perform a scoped task that's closely related to their current context.
### Badge
Badges are small status descriptors for UI elements.
### Bottom Tabs
Show more...
```

--------------------------------

### DropdownMenu Props Documentation

Source: https://nativewindui.com/component/dropdown-menu

Details the available props for the DropdownMenu component, including their types, default values, and descriptions. It inherits props from React Native's View component.

```APIDOC
DropdownMenu:
  Inherits all the props from React Native's View component.
  Prop | Type | Default | Description  
  ---|---|---|--  
  title | string |  | The title of the dropdown menu.  
  items | (DropdownItem | DropdownSubMenu)[] |  | The items or submenus to display in the dropdown.  
  iOSItemSize | 'small' | 'medium' | 'large' |  | The preferred item size on iOS.  
  children | React.ReactNode |  | The child component to render inside the dropdown menu. It needs to accept Pressable props to ensure compatibility on Android  
  onItemPress | (item: Omit<DropdownItem, 'icon'>) => void |  | Callback function triggered when an item is pressed.  
  enabled | boolean | true | Whether the dropdown menu is enabled.  
  materialPortalHost | string |  | The host for the Android portal.  
  materialSideOffset | number | 2 | Side offset for Android dropdown.  
  materialAlignOffset | number |  | Alignment offset for Android dropdown.  
  materialAlign | 'start' | 'center' | 'end' |  | Alignment for Android dropdown.  
  materialWidth | number |  | Width for the Android dropdown.  
  materialMinWidth | number |  | Minimum width for the Android dropdown.  
  materialLoadingText | string |  | Text to display while the dropdown is loading.  
  materialSubMenuTitlePlaceholder | string |  | Placeholder title for the Android submenu.  
  materialOverlayClassName | string |  | Class name for the Android overlay.
```

--------------------------------

### Integrate ActionSheetProvider in _layout.tsx

Source: https://nativewindui.com/component/action-sheet

Wrap your root component with ActionSheetProvider to enable custom action sheet functionality. This involves importing the provider and placing it around your navigation structure.

```typescript
import '../global.css';
import 'expo-dev-client';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { StatusBar } from 'expo-status-bar';
// YOUR_OTHER_IMPORTS
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/theme';
export { 
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';
export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />
      <ActionSheetProvider>
        <NavThemeProvider value={NAV_THEME[colorScheme]}>
           {/* YOUR_ROOT_NAVIGATOR */}
        </NavThemeProvider>
      </ActionSheetProvider>
    </>
  );
}
```

--------------------------------

### NativewindUI ListItem Component Props

Source: https://nativewindui.com/component/list

Defines the properties for the NativewindUI ListItem component, inheriting from React Native's Pressable. Includes props for item data, sectioning, styling, and interaction.

```APIDOC
ListItem Component Props:

Inherits all props from React Native's Pressable component.

Props:
- item: T | The data item for this list item.
- isFirstInSection: boolean | Indicates if this is the first item in a section.
- isLastInSection: boolean | Indicates if this is the last item in a section.
- index: number | The index of the item in the list.
- variant: ListVariant | The variant for the list item.
- className: string | Additional class names for the list item.
- androidRootClassName: string | Class name for the root element on Android.
- titleClassName: string | Class name for the title text.
- titleStyle: StyleProp<TextStyle> | Style for the title text.
- textNumberOfLines: number | Number of lines for the title text.
- subTitleStyle: StyleProp<TextStyle> | Style for the subtitle text.
- subTitleClassName: string | Class name for the subtitle text.
- subTitleNumberOfLines: number | Number of lines for the subtitle text.
- textContentClassName: string | Class name for the content text container.
- sectionHeaderAsGap: boolean | Whether the section header is used as a gap.
- removeSeparator: boolean | false | Whether to remove the separator below the item.
- leftView: React.ReactNode | Custom view rendered on the left side of the item.
- rightView: React.ReactNode | Custom view rendered on the right side of the item.
- disabled: boolean | false | Whether the item is disabled.
- ref: ListItemRef | Reference to the list item component.
```

--------------------------------

### getActiveDrawerContentScreen Utility

Source: https://nativewindui.com/component/drawer-content

A utility function to retrieve the currently active screen within the drawer content.

```APIDOC
getActiveDrawerContentScreen: () => any
  Description: A function to get the active drawer content screen.
```

--------------------------------

### NativeWindUI SearchInput Props

Source: https://nativewindui.com/component/search-input

Details the available props for the NativeWindUI SearchInput component. It inherits all props from React Native's TextInput and includes specific props for styling and customization.

```APIDOC
SearchInput

Inherits all the props from React Native's TextInput component.

Prop | Type | Description  
---|---|---
containerClassName | string | Class name to style the container of the search input.
iconContainerClassName | string | Class name to style the icon container within the search input.
cancelText | string | iOS only - Text to display on the cancel button.
iconColor | string | Color of the icon displayed in the search input.
```

--------------------------------

### Clear Expo Cache

Source: https://nativewindui.com/troubleshoot

This command is used to restart the Expo development server after clearing the Metro bundler cache. This is often necessary when encountering issues with component styling or class name rendering in NativewindUI.

```bash
npx expo start -c
```

--------------------------------

### NativeWindUI SearchInput Usage

Source: https://nativewindui.com/component/search-input

Demonstrates how to import and use the SearchInput component from NativeWindUI in an Expo Router application. It shows basic integration with styling and props.

```javascript
import { Stack } from'expo-router';
import { View } from'react-native';
import { SearchInput } from'~/components/nativewindui/SearchInput';

exportdefaultfunctionSearchInputScreen() {
  return (
    <><Stack.Screenoptions={{title: 'SearchInput' }} /><ViewclassName="justify-center p-4"><SearchInputtextContentType="none"
autoComplete="off" /></View></>
  );
}
```

```javascript
import { SearchInput } from'~/components/nativewindui/SearchInput';
```

```javascript
<SearchInput />
```

--------------------------------

### NativewindUI Checkbox Props

Source: https://nativewindui.com/component/checkbox

Details the available props for the NativewindUI Checkbox component, including `defaultChecked`, `checked`, and `onCheckedChange`, along with their types and descriptions. It also notes that the component inherits props from `CheckboxPrimitive.Root`.

```APIDOC
Checkbox
Inherits all the props from rn-primitives's CheckboxPrimitive.Root component.
Prop | Type | Description  
---|---|---  
defaultChecked | boolean | The default checked state of the checkbox when it is uncontrolled.  
checked | boolean | The controlled checked state of the checkbox.  
onCheckedChange | (checked: boolean) => void | Callback called when the checked state changes.
```

--------------------------------

### NativewindUI Bottom Tabs Component

Source: https://nativewindui.com/component/bottom-tabs

Documentation for the 'Bottom Tabs' component in NativewindUI. It allows users to switch between main sections of an app and inherits props from @react-navigation/bottom-tabs's BottomTabBarProps and React Native's Pressable component.

```APIDOC
MaterialTabBar
  Inherits all the props from @react-navigation/bottom-tabs's BottomTabBarProps.

MaterialTabItem
  Inherits all the props from React Native's Pressable component.

Props for MaterialTabItem:

Prop | Type | Description
---|---|---
isFocused | boolean | Indicates if the tab item is currently focused.
name | IconProps<'material'>['name'] | The name of the icon to be displayed in the tab item.
label | string | React.ReactNode | The label to be displayed on the tab item. Can be a string or a React node.
badge | number | string | An optional badge to be displayed on the tab item, can be a number or a string.
```

--------------------------------

### DrawerContentSectionItem Props

Source: https://nativewindui.com/component/drawer-content

DrawerContentSectionItem displays an icon, label, and handles press events. It can also include an optional right view and indicate an active state.

```APIDOC
DrawerContentSectionItem:
  Props:
    icon: IconProps<'sfSymbol' | 'material'> - The icon to be displayed.
    label: string - The label to be displayed.
    onPress: () => void - The function to be called when the item is pressed.
    isActive: boolean - Whether the item is active. Defaults to false.
    rightView: React.ReactNode - The view to be displayed on the right of the item.
```

--------------------------------

### NativewindUI Date Picker Component Implementation

Source: https://nativewindui.com/component/date-picker

The core implementation of the NativewindUI DatePicker component, which wraps the '@react-native-community/datetimepicker'. It accepts various props for customization.

```typescript
import DateTimePicker from'@react-native-community/datetimepicker';
import * as React from'react';

interface DatePickerProps extends React.ComponentProps<typeof DateTimePicker> {
  mode: 'date' | 'time' | 'datetime';
  materialDateClassName?: string;
  materialDateLabel?: string;
  materialDateLabelClassName?: string;
  materialTimeClassName?: string;
  materialTimeLabel?: string;
  materialTimeLabelClassName?: string;
}

exportfunction DatePicker({
  materialDateClassName: _materialDateClassName,
  materialDateLabel: _materialDateLabel,
  materialDateLabelClassName: _materialDateLabelClassName,
  materialTimeClassName: _materialTimeClassName,
  materialTimeLabel: _materialTimeLabel,
  materialTimeLabelClassName: _materialTimeLabelClassName,
  ...props
}: DatePickerProps) {
  return <DateTimePicker {...props} />;
}
```

--------------------------------

### NativeWindUI FormSection Component Props

Source: https://nativewindui.com/component/form

Defines the properties for the NativeWindUI FormSection component. It inherits all props from React Native's View component and includes specific props for customization.

```typescript
interface FormSectionProps extends ViewProps {
  rootClassName?: string;
  footnote?: string;
  footnoteClassName?: string;
  ios?: { title: string; titleClassName?: string };
  materialIconProps?: Omit<IconProps<'material'>, 'namingScheme' | 'ios'>;
  style?: ViewStyle;
}
```

--------------------------------

### NativeWindUI Form Component Props

Source: https://nativewindui.com/component/form

Defines the properties for the NativeWindUI Form component. It inherits all props from React Native's View component and includes specific props for customization.

```typescript
interface FormProps extends ViewProps {
  rootClassName?: string;
  footnote?: string;
  footnoteClassName?: string;
  ios?: { title: string; titleClassName?: string };
  materialIconProps?: Omit<IconProps<'material'>, 'namingScheme' | 'ios'>;
  style?: ViewStyle;
}
```

--------------------------------

### NativewindUI Activity Indicator Component Implementation

Source: https://nativewindui.com/component/activity-indicator

This is the core implementation of the NativewindUI Activity Indicator component. It wraps React Native's ActivityIndicator and applies theme colors based on the application's color scheme.

```tsx
import { ActivityIndicator as RNActivityIndicator } from'react-native';
import { useColorScheme } from'~/lib/useColorScheme';

functionActivityIndicator(props: React.ComponentPropsWithoutRef<typeof RNActivityIndicator>) {
  const { colors } = useColorScheme();
  return<RNActivityIndicatorcolor={colors.primary} {...props} />;
}

export { ActivityIndicator };
```

--------------------------------

### DrawerContentRoot Props

Source: https://nativewindui.com/component/drawer-content

DrawerContentRoot inherits all props from React Native's View component. The 'actions' prop allows for custom React Nodes to be displayed in the drawer content.

```APIDOC
DrawerContentRoot:
  Inherits props from React Native's View component.
  Props:
    actions: React.ReactNode - Actions to be displayed in the drawer content.
```

--------------------------------

### Integrate GestureHandlerRootView and BottomSheetModalProvider in _layout.tsx

Source: https://nativewindui.com/component/bottom-sheet

This snippet shows how to wrap the root component with GestureHandlerRootView and BottomSheetModalProvider in your Expo router layout file. This is necessary for gesture handling and bottom sheet functionality.

```tsx
import '../global.css';
import 'expo-dev-client';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';    // YOUR_OTHER_IMPORTS
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/theme';
export {    
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';
export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <NavThemeProvider value={NAV_THEME[colorScheme]}>
            {/* YOUR_ROOT_NAVIGATOR */}
          </NavThemeProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
}
```

--------------------------------

### NativewindUI Slider Component Implementation

Source: https://nativewindui.com/component/slider

The core implementation of the NativewindUI Slider component, which wraps the @react-native-community/slider and applies custom styling based on the color scheme.

```typescript
import RNSlider from'@react-native-community/slider';
import { Platform } from'react-native';
import { useColorScheme } from'~/lib/useColorScheme';
import { COLORS } from'~/theme/colors';

function Slider({
  thumbTintColor,
  minimumTrackTintColor,
  maximumTrackTintColor,
  ...props
}: React.ComponentPropsWithoutRef<typeof RNSlider>) {
  const { colors } = useColorScheme();

  return (
    <RNSlider
      thumbTintColor={thumbTintColor ?? Platform.OS === 'ios' ? COLORS.white:colors.primary}
      minimumTrackTintColor={minimumTrackTintColor ?? colors.primary}
      maximumTrackTintColor={maximumTrackTintColor ?? Platform.OS === 'android' ? colors.primary:undefined      }
      {...props}
    />  );
}

export { Slider };

```

--------------------------------

### NativewindUI Context Menu Component

Source: https://nativewindui.com/component/context-menu

The Context Menu component from NativewindUI offers a way to present contextual actions related to specific UI elements. It is designed to keep the interface clean by hiding less frequently used options. This component is part of the Pro offering and requires an all-access subscription to utilize its source code.

```React Native
/*
 * NativewindUI Context Menu Component
 *
 * Provides access to functionality directly related to an item,
 * without cluttering the interface.
 *
 * Pro component: Requires all-access to use the source code.
 *
 * Usage:
 * <ContextMenu>
 *   <ContextMenu.Trigger>
 *     <Button title="Open Menu" />
 *   </ContextMenu.Trigger>
 *   <ContextMenu.Content>
 *     <ContextMenu.Item onPress={() => console.log('Action 1')}>Action 1</ContextMenu.Item>
 *     <ContextMenu.Item onPress={() => console.log('Action 2')}>Action 2</ContextMenu.Item>
 *   </ContextMenu.Content>
 * </ContextMenu>
 */

// Note: Actual implementation details and imports would be here.
// This is a conceptual representation based on the provided text.
```

--------------------------------

### Integrate KeyboardProvider in Expo Layout

Source: https://nativewindui.com/component/text-field

This snippet shows how to wrap the root layout component in an Expo application with `KeyboardProvider` from `react-native-keyboard-controller`. It includes the necessary import and the component usage with `statusBarTranslucent` and `navigationBarTranslucent` props.

```tsx
import '../global.css';
    import 'expo-dev-client';
    import { PortalHost } from '@rn-primitives/portal';
    import { StatusBar } from 'expo-status-bar';
    import { KeyboardProvider } from 'react-native-keyboard-controller';       // YOUR_OTHER_IMPORTS
    import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
    import { NAV_THEME } from '~/theme';
    export {
      // Catch any errors thrown by the Layout component.
      ErrorBoundary,
    } from 'expo-router';
    export default function RootLayout() {
      useInitialAndroidBarSync();
      const { colorScheme, isDarkColorScheme } = useColorScheme();
      return (
        <>
          <StatusBar
            key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
            style={isDarkColorScheme ? 'light' : 'dark'}
          />
          <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
              <NavThemeProvider value={NAV_THEME[colorScheme]}>
                 {/* YOUR_ROOT_NAVIGATOR */}
                 <PortalHost />
              </NavThemeProvider>
          </KeyboardProvider>
        </>
      );
    }
```

--------------------------------

### NativeWindUI Button Props

Source: https://nativewindui.com/component/button

Details the available props for the NativeWindUI Button component, including their types, default values, and descriptions. The Button component inherits all props from React Native's Pressable component.

```APIDOC
Button Props:

Inherits all the props from React Native's Pressable component.

Prop | Type | Default | Description
---|---|---|---
variant | 'primary' | 'secondary' | 'tonal' | 'plain' | 'primary' | The visual style of the button. Defaults to "primary".
size | 'none' | 'sm' | 'md' | 'lg' | 'icon' | 'md' | The size of the button. Defaults to "md".
androidRootClassName | string |  | ANDROID ONLY: The class name of the root responsible for hiding the ripple overflow.
```

--------------------------------

### NativeWindUI FormItem Component Props

Source: https://nativewindui.com/component/form

Defines the properties for the NativeWindUI FormItem component. It inherits all props from React Native's View component and includes specific props for styling iOS separators.

```typescript
interface FormItemProps extends ViewProps {
  iosSeparatorClassName?: string;
}
```

--------------------------------

### DrawerContentSectionTitle Props

Source: https://nativewindui.com/component/drawer-content

DrawerContentSectionTitle inherits props from NativewindUI's Text component, excluding the 'variant' prop. It supports a 'type' prop to define the style of the section title.

```APIDOC
DrawerContentSectionTitle:
  Inherits props from NativewindUI's Text component (excluding 'variant').
  Props:
    type: 'large' | 'default' - The type of the section title. Defaults to 'default'.
```

--------------------------------

### NativewindUI Toggle Component Implementation

Source: https://nativewindui.com/component/toggle

The core implementation of the NativewindUI Toggle component, which is a wrapper around React Native's Switch component. It customizes the track and thumb colors based on the application's color scheme.

```typescript
import { Switch } from'react-native';
import { useColorScheme } from'~/lib/useColorScheme';
import { COLORS } from'~/theme/colors';

functionToggle(props: React.ComponentPropsWithoutRef<typeof Switch>) {
  const { colors } = useColorScheme();
  return (
    <SwitchtrackColor={{true:colors.primary,
false:colors.grey,
      }}
thumbColor={COLORS.white}      {...props}
    />
  );
}

export { Toggle };
```

--------------------------------

### NativewindUI Estimated Item Height Constant

Source: https://nativewindui.com/component/list

Defines the estimated height for list items in NativewindUI, specifically for items containing only a title or a title with a subtitle.

```APIDOC
Constant:

ESTIMATED_ITEM_HEIGHT: The estimated height of each list item with title only and with subtle.
```

--------------------------------

### NativewindUI Checkbox Import

Source: https://nativewindui.com/component/checkbox

Shows the basic import statement required to use the NativewindUI Checkbox component in a React Native project.

```javascript
import { Checkbox } from'~/components/nativewindui/Checkbox';
```

--------------------------------

### DrawerContentSection Component

Source: https://nativewindui.com/component/drawer-content

DrawerContentSection inherits all props from React Native's View component.

```APIDOC
DrawerContentSection:
  Inherits props from React Native's View component.
```

--------------------------------

### NativeWindUI Sheet Component

Source: https://nativewindui.com/component/bottom-sheet

A custom React Native component for displaying bottom sheets, built using @gorhom/bottom-sheet. It includes customizable styles for the sheet, background, and handle indicator, and integrates with a custom color scheme hook.

```tsx
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from'@gorhom/bottom-sheet';
import * as React from'react';
import { useColorScheme } from'~/lib/useColorScheme';

const Sheet = React.forwardRef<BottomSheetModal, React.ComponentPropsWithoutRef<typeof BottomSheetModal>>(
  ({ index = 0, backgroundStyle, style, handleIndicatorStyle, ...props }, ref) => {
    const { colors } = useColorScheme();

    const renderBackdrop = React.useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        backgroundStyle={backgroundStyle ?? {
          backgroundColor: colors.card,
        }}
        style={style ?? {
          borderWidth: 1,
          borderColor: colors.grey5,
          borderTopStartRadius: 16,
          borderTopEndRadius: 16,
        }}
        handleIndicatorStyle={handleIndicatorStyle ?? {
          backgroundColor: colors.grey4,
        }}
        backdropComponent={renderBackdrop}
        {...props}
      />
    );
  }
);

function useSheetRef() {
  return React.useRef<BottomSheetModal>(null);
}

export { Sheet, useSheetRef };

```

--------------------------------

### NativewindUI Toggle Component Usage

Source: https://nativewindui.com/component/toggle

Demonstrates how to use the NativewindUI Toggle component within an Expo Router application. It includes state management for the toggle's value and integrates with the app's color scheme.

```typescript
import { Icon } from'@roninoss/icons';
import { Stack } from'expo-router';
import * as React from'react';
import { View, ScrollView, Pressable, Text } from'react-native';
import { Toggle } from'~/components/nativewindui/Toggle';
import { useColorScheme } from'~/lib/useColorScheme';

exportdefaultfunctionTextScreen() {
  const { colors } = useColorScheme();
  const [switchValue, setSwitchValue] = React.useState(true);

  return (
    <><Stack.Screenoptions={{title: 'NativewindUI',
headerSearchBarOptions: {
hideWhenScrolling:false,
          },
headerLargeTitle:true,
headerRight() {
return (
              <PressableclassName="opacity-80 active:opacity-40"><ViewclassName="opacity-90"><Iconname="cog-outline"color={colors.foreground} /></View></Pressable>            );
          },
        }} />
<ScrollViewcontentInsetAdjustmentBehavior="automatic"className="p-4"><ViewclassName="border-border bg-card gap-4 rounded-xl border p-4 pb-6 shadow-sm shadow-black/10 dark:shadow-none"><TextclassName="text-foreground text-center text-sm font-medium tracking-wider opacity-60">
            Toggle
</Text><ViewclassName="items-center"><Togglevalue={switchValue}onValueChange={setSwitchValue} /></View></View></ScrollView></>
  );
}
```

--------------------------------

### TextClassContext for Text Children

Source: https://nativewindui.com/component/text

TextClassContext is a React context designed to pass class names down to its Text children. This simplifies styling by allowing a parent component to define styles that are inherited by nested Text elements.

```JavaScript
import React, { createContext, useContext, useState } from 'react';

const TextClassContext = createContext();

export const TextClassProvider = ({ children, className }) => {
  return (
    <TextClassContext.Provider value={{ className }}>
      {children}
    </TextClassContext.Provider>
  );
};

export const useTextClass = () => {
  const context = useContext(TextClassContext);
  if (!context) {
    throw new Error('useTextClass must be used within a TextClassProvider');
  }
  return context;
};

// Example Usage:
// const MyComponent = () => (
//   <TextClassProvider className="text-blue-500 font-bold">
//     <Text>Hello, NativeWindUI!</Text>
//   </TextClassProvider>
// );

```

--------------------------------

### NativeWind UI Button Component

Source: https://nativewindui.com/component/button

Defines the NativeWind UI Button component, including its variants, sizes, and platform-specific styling for iOS and Android. It utilizes class-variance-authority for variant management and provides ripple effect customization for Android.

```tsx
import * as Slot from'@rn-primitives/slot';
import { cva, type VariantProps } from'class-variance-authority';
import * as React from'react';
import { Platform, Pressable, PressableProps, View, ViewStyle } from'react-native';
import { TextClassContext } from'~/components/nativewindui/Text';
import { cn } from'~/lib/cn';
import { useColorScheme } from'~/lib/useColorScheme';
import { COLORS } from'~/theme/colors';
const buttonVariants = cva('flex-row items-center justify-center gap-2', {
variants: {
variant: {
primary: 'ios:active:opacity-80 bg-primary',
secondary: 'ios:border-primary ios:active:bg-primary/5 border border-foreground/40',
tonal:
'ios:bg-primary/10 dark:ios:bg-primary/10 ios:active:bg-primary/15 bg-primary/15 dark:bg-primary/30',
plain: 'ios:active:opacity-70',
    },
size: {
none: '',
sm: 'py-1 px-2.5 rounded-full',
md: 'ios:rounded-lg py-2 ios:py-1.5 ios:px-3.5 px-5 rounded-full',
lg: 'py-2.5 px-5 ios:py-2 rounded-xl gap-2',
icon: 'ios:rounded-lg h-10 w-10 rounded-full',
    },
  },
defaultVariants: {
variant: 'primary',
size: 'md',
  },
});
const androidRootVariants = cva('overflow-hidden', {
variants: {
size: {
none: '',
icon: 'rounded-full',
sm: 'rounded-full',
md: 'rounded-full',
lg: 'rounded-xl',
    },
  },
defaultVariants: {
size: 'md',
  },
});
const buttonTextVariants = cva('font-medium', {
variants: {
variant: {
primary: 'text-white',
secondary: 'ios:text-primary text-foreground',
tonal: 'ios:text-primary text-foreground',
plain: 'text-foreground',
    },
size: {
none: '',
icon: '',
sm: 'text-[15px] leading-5',
md: 'text-[17px] leading-7',
lg: 'text-[17px] leading-7',
    },
  },
defaultVariants: {
variant: 'primary',
size: 'md',
  },
});
functionconvertToRGBA(rgb: string, opacity: number): string{
const rgbValues = rgb.match(/\d+/g);
if (!rgbValues || rgbValues.length !== 3) {
thrownewError('Invalid RGB color format');
  }
const red = parseInt(rgbValues[0], 10);
const green = parseInt(rgbValues[1], 10);
const blue = parseInt(rgbValues[2], 10);
if (opacity < 0 || opacity > 1) {
thrownewError('Opacity must be a number between 0 and 1');
  }
return`rgba(${red},${green},${blue},${opacity})`;
}
const ANDROID_RIPPLE = {
dark: {
primary: { color: convertToRGBA(COLORS.dark.grey3, 0.4), borderless: false },
secondary: { color: convertToRGBA(COLORS.dark.grey5, 0.8), borderless: false },
plain: { color: convertToRGBA(COLORS.dark.grey5, 0.8), borderless: false },
tonal: { color: convertToRGBA(COLORS.dark.grey5, 0.8), borderless: false },
  },
light: {
primary: { color: convertToRGBA(COLORS.light.grey4, 0.4), borderless: false },
secondary: { color: convertToRGBA(COLORS.light.grey5, 0.4), borderless: false },
plain: { color: convertToRGBA(COLORS.light.grey5, 0.4), borderless: false },
tonal: { color: convertToRGBA(COLORS.light.grey6, 0.4), borderless: false },
  },
};
// Add as class when possible: https://github.com/marklawlor/nativewind/issues/522const BORDER_CURVE: ViewStyle = {
borderCurve: 'continuous',
};
type ButtonVariantProps = Omit<VariantProps<typeof buttonVariants>, 'variant'> & {
  variant?: Exclude<VariantProps<typeof buttonVariants>['variant'], null>;
};
type AndroidOnlyButtonProps = {
/**
   * ANDROID ONLY: The class name of root responsible for hidding the ripple overflow.
   */  androidRootClassName?: string;
};
type ButtonProps = PressableProps & ButtonVariantProps & AndroidOnlyButtonProps;
const Root = Platform.OS === 'android' ? View : Slot.Pressable;
const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
(    { className, variant = 'primary', size, style = BORDER_CURVE, androidRootClassName, ...props },
    ref
) => {
const { colorScheme } = useColorScheme();
return (
<TextClassContext.Providervalue={buttonTextVariants({variant, size })}><RootclassName={Platform.select({
ios:undefined,
default:androidRootVariants({
size,
className:androidRootClassName,
            }),
          })}><PressableclassName={cn(props.disabled && 'opacity-50',
buttonVariants({ variant, size, className })
            )}
ref={ref}style={style}android_ripple={ANDROID_RIPPLE[colorScheme][variant]}            {...props}
          /></Root></TextClassContext.Provider>    );
  }
);
Button.displayName = 'Button';
export { Button, buttonTextVariants, buttonVariants };
exporttype { ButtonProps };
```

--------------------------------

### Segmented Control Implementation

Source: https://nativewindui.com/component/segmented-control

Demonstrates how to implement the Segmented Control component in a React Native application using expo-router. It includes state management for the selected index and passing values to the component.

```javascript
import { Stack } from'expo-router';
import * as React from'react';
import { View } from'react-native';
import { SegmentedControl } from'~/components/nativewindui/SegmentedControl';

const VALUES = ['One', 'Two', 'Three', 'Four'];

exportdefaultfunctionSegmentedControlScreen() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <><Stack.Screenoptions={{title: 'SegmentedControl' }} /><ViewclassName="flex-1 p-4"><SegmentedControl
          values={VALUES}
          selectedIndex={selectedIndex}
          onIndexChange={(index) => {
            setSelectedIndex(index);
          }}
        />
</View></>
  );
}
```

--------------------------------

### SegmentedControl Props

Source: https://nativewindui.com/component/segmented-control

Details the available props for the NativewindUI SegmentedControl component, including their types, default values, and descriptions. It also inherits props from React Native's TextInput.

```APIDOC
SegmentedControl

Inherits all the props from React Native's TextInput component.

Prop | Type | Default | Description  
---|---|---|---
enabled | boolean | true | Determines if the segment control is enabled.  
onIndexChange | (index: number) => void |  | Callback function triggered when the selected index changes.  
onValueChange | (value: string) => void |  | Callback function triggered when the selected value changes.  
selectedIndex | number |  | The currently selected index.  
values | string[] |  | Array of strings representing the segment values.  
materialTextClassName | string |  | Class name for the text style of the segments.  
iosMomentary | boolean |  | If true, selection won't persist visually, but the callback will still work.
```

--------------------------------

### Ratings Indicator Component (React Native)

Source: https://nativewindui.com/component/ratings-indicator

This React Native component uses the 'expo-store-review' library to request a review from the user. It includes logic to check if a review action is available and handles potential errors, especially for Android. The effect hook is set up to request a review after a short delay.

```javascript
import * as StoreReview from'expo-store-review';
import { Icon } from'@roninoss/icons';
import { Stack } from'expo-router';
import * as React from'react';
import { View, Text, ScrollView, Pressable } from'react-native';
import { useColorScheme } from'~/lib/useColorScheme';
let hasRequestedReview = false;
exportdefaultfunctionRatingsIndicatorScreen() {
const { colors, isDarkColorScheme } = useColorScheme();
  React.useEffect(() => {
asyncfunctionshowRequestReview() {
if (hasRequestedReview) return;
try {
if (await StoreReview.hasAction()) {
await StoreReview.requestReview();
        }
      } catch (error) {
console.log(
'FOR ANDROID: Make sure you meet all conditions to be able to test and use it: https://developer.android.com/guide/playcore/in-app-review/test#troubleshooting',
          error
        );
      } finally {
        hasRequestedReview = true;
      }
    }
const timeout = setTimeout(() => {
      showRequestReview();
    }, 1000);
return() =>clearTimeout(timeout);
  }, []);
return (
<><Stack.Screenoptions={{title: 'NativewindUI',
headerSearchBarOptions: {
hideWhenScrolling:false,
          },
headerLargeTitle:true,
headerRight() {
return (
              <PressableclassName="opacity-80 active:opacity-40"><ViewclassName="opacity-90"><Iconname="cog-outline"color={colors.foreground} /></View></Pressable>            );
          },
        }} />
<ScrollViewcontentInsetAdjustmentBehavior="automatic"className="p-4"><ViewclassName="border-border bg-card gap-4 rounded-xl border p-4 pb-6 shadow-sm shadow-black/10 dark:shadow-none"><TextclassName="text-foreground text-center text-sm font-medium tracking-wider opacity-60">            Ratings Indicator
</Text><ViewclassName="gap-3"><TextclassName="text-foreground pb-2 text-center font-semibold">              Please follow the guidelines.
</Text><ViewclassName="flex-row"><TextclassName="text-muted-foreground w-6 text-center">·</Text><ViewclassName="flex-1"><TextclassName="text-muted-foreground text-xs">
                  Don't call StoreReview.requestReview() from a button
</Text></View></View><ViewclassName="flex-row"><TextclassName="text-muted-foreground w-6 text-center">·</Text><ViewclassName="flex-1"><TextclassName="text-muted-foreground text-xs">
                  Don't request a review when the user is doing something time sensitive.
</Text></View></View><ViewclassName="flex-row"><TextclassName="text-muted-foreground w-6 text-center">·</Text><ViewclassName="flex-1"><TextclassName="text-muted-foreground text-xs">
                  Don't ask the user any questions before or while presenting the rating button or
                  card.
</Text></View></View></View></View></ScrollView></>  );
}
```

=== COMPLETE CONTENT === This response contains all available snippets from this library. No additional content exists. Do not make further requests.

# TypeScript Compiler and Language Services API

TypeScript is a language for application-scale JavaScript development that adds optional types to JavaScript. The TypeScript compiler provides a comprehensive API for programmatic access to parsing, type checking, transforming, and emitting JavaScript code. This enables developers to build powerful tools like IDEs, linters, bundlers, documentation generators, and code transformation utilities that leverage TypeScript's sophisticated type system and AST manipulation capabilities.

The TypeScript API is organized into several core components: the Compiler API for creating programs and emitting code, the Language Service API for editor integrations providing completions and diagnostics, the Type Checker for semantic analysis, and various utility APIs for AST manipulation, module resolution, and incremental compilation. All APIs are exported through the main `typescript` module and provide both low-level AST access and high-level abstractions for common use cases.

## Minimal Compiler - Basic Program Creation and Compilation

Create a simple TypeScript compiler that compiles files and reports diagnostics with proper error handling and exit codes.

```typescript
import * as ts from "typescript";

function compile(fileNames: string[], options: ts.CompilerOptions): void {
  let program = ts.createProgram(fileNames, options);
  let emitResult = program.emit();

  let allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  allDiagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      let { line, character } = ts.getLineAndCharacterOfPosition(
        diagnostic.file,
        diagnostic.start!
      );
      let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
      console.log(
        `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`
      );
    } else {
      console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
    }
  });

  let exitCode = emitResult.emitSkipped ? 1 : 0;
  console.log(`Process exiting with code '${exitCode}'.`);
  process.exit(exitCode);
}

compile(process.argv.slice(2), {
  noEmitOnError: true,
  noImplicitAny: true,
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS
});
```

## Quick Transpilation - String to String Transformation

Transpile TypeScript code to JavaScript without type checking using the transpileModule API for fast code transformation.

```typescript
import * as ts from "typescript";

const source = "let x: string = 'string'";

let result = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2015
  }
});

console.log(JSON.stringify(result));
// Output: {"outputText":"let x = 'string';\n","diagnostics":[],"sourceMapText":"..."}
```

## Declaration Generation - Generate Type Definitions Without Type Checking

Generate TypeScript declaration files (.d.ts) from TypeScript source without running the full type checker using transpileDeclaration for fast isolated declaration emit.

```typescript
import * as ts from "typescript";

const source = `
export const greet = (name: string) => {
  return "Hello, " + name;
};

export class Calculator {
  add(a: number, b: number) {
    return a + b;
  }
}
`;

let result = ts.transpileDeclaration(source, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2020
  }
});

console.log(result.outputText);
// Output:
// export declare const greet: (name: string) => string;
// export declare class Calculator {
//     add(a: number, b: number): number;
// }
```

## Declaration File Generation - Extract Types from JavaScript

Generate TypeScript declaration files (.d.ts) from JavaScript source files with JSDoc annotations for automatic type definition creation.

```typescript
import * as ts from "typescript";

function compile(fileNames: string[], options: ts.CompilerOptions): void {
  const createdFiles: Record<string, string> = {};
  const host = ts.createCompilerHost(options);
  host.writeFile = (fileName: string, contents: string) => {
    createdFiles[fileName] = contents;
  };

  const program = ts.createProgram(fileNames, options, host);
  program.emit();

  fileNames.forEach(file => {
    console.log("### JavaScript\n");
    console.log(host.readFile(file));

    console.log("### Type Definition\n");
    const dts = file.replace(".js", ".d.ts");
    console.log(createdFiles[dts]);
  });
}

compile(process.argv.slice(2), {
  allowJs: true,
  declaration: true,
  emitDeclarationOnly: true,
});
```

## AST Traversal and Printing - Extract Code Sections

Parse TypeScript files, traverse the AST to find specific declarations, and print them using the printer API for code extraction and documentation generation.

```typescript
import * as ts from "typescript";

function extract(file: string, identifiers: string[]): void {
  let program = ts.createProgram([file], { allowJs: true });
  const sourceFile = program.getSourceFile(file);

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  const unfoundNodes: [string, ts.Node][] = [];
  const foundNodes: [string, ts.Node][] = [];

  ts.forEachChild(sourceFile!, node => {
    let name = "";

    if (ts.isFunctionDeclaration(node) && node.name) {
      name = node.name.text;
      node.body = undefined; // Hide implementation
    } else if (ts.isVariableStatement(node)) {
      name = node.declarationList.declarations[0].name.getText(sourceFile!);
    } else if (ts.isInterfaceDeclaration(node)) {
      name = node.name.text;
    }

    const container = identifiers.includes(name) ? foundNodes : unfoundNodes;
    container.push([name, node]);
  });

  if (!foundNodes.length) {
    console.log(
      `Could not find any of ${identifiers.join(", ")} in ${file}, found: ${
        unfoundNodes.filter(f => f[0]).map(f => f[0]).join(", ")
      }.`
    );
    process.exitCode = 1;
  } else {
    foundNodes.forEach(f => {
      const [name, node] = f;
      console.log("### " + name + "\n");
      console.log(printer.printNode(ts.EmitHint.Unspecified, node, sourceFile!));
    });
  }
}

extract(process.argv[2], process.argv.slice(3));
```

## Simple Linter - AST-Based Code Analysis

Build a custom linter that traverses the AST recursively to enforce code style rules with position-aware error reporting.

```typescript
import { readFileSync } from "fs";
import * as ts from "typescript";

export function delint(sourceFile: ts.SourceFile) {
  delintNode(sourceFile);

  function delintNode(node: ts.Node) {
    switch (node.kind) {
      case ts.SyntaxKind.ForStatement:
      case ts.SyntaxKind.ForInStatement:
      case ts.SyntaxKind.WhileStatement:
      case ts.SyntaxKind.DoStatement:
        if ((node as ts.IterationStatement).statement.kind !== ts.SyntaxKind.Block) {
          report(
            node,
            'A looping statement\'s contents should be wrapped in a block body.'
          );
        }
        break;

      case ts.SyntaxKind.IfStatement:
        const ifStatement = node as ts.IfStatement;
        if (ifStatement.thenStatement.kind !== ts.SyntaxKind.Block) {
          report(
            ifStatement.thenStatement,
            'An if statement\'s contents should be wrapped in a block body.'
          );
        }
        if (
          ifStatement.elseStatement &&
          ifStatement.elseStatement.kind !== ts.SyntaxKind.Block &&
          ifStatement.elseStatement.kind !== ts.SyntaxKind.IfStatement
        ) {
          report(
            ifStatement.elseStatement,
            'An else statement\'s contents should be wrapped in a block body.'
          );
        }
        break;

      case ts.SyntaxKind.BinaryExpression:
        const op = (node as ts.BinaryExpression).operatorToken.kind;
        if (op === ts.SyntaxKind.EqualsEqualsToken ||
            op === ts.SyntaxKind.ExclamationEqualsToken) {
          report(node, 'Use \'===\' and \'!==\'.');
        }
        break;
    }

    ts.forEachChild(node, delintNode);
  }

  function report(node: ts.Node, message: string) {
    const { line, character } = sourceFile.getLineAndCharacterOfPosition(
      node.getStart()
    );
    console.log(`${sourceFile.fileName} (${line + 1},${character + 1}): ${message}`);
  }
}

const fileNames = process.argv.slice(2);
fileNames.forEach(fileName => {
  const sourceFile = ts.createSourceFile(
    fileName,
    readFileSync(fileName).toString(),
    ts.ScriptTarget.ES2015,
    true
  );
  delint(sourceFile);
});
```

## Watch Mode - Incremental Compilation

Create a watch program with incremental builder for continuous compilation that only rebuilds changed files and their dependencies.

```typescript
import ts = require("typescript");

const formatHost: ts.FormatDiagnosticsHost = {
  getCanonicalFileName: path => path,
  getCurrentDirectory: ts.sys.getCurrentDirectory,
  getNewLine: () => ts.sys.newLine
};

function watchMain() {
  const configPath = ts.findConfigFile(
    "./",
    ts.sys.fileExists,
    "tsconfig.json"
  );
  if (!configPath) {
    throw new Error("Could not find a valid 'tsconfig.json'.");
  }

  const createProgram = ts.createSemanticDiagnosticsBuilderProgram;

  const host = ts.createWatchCompilerHost(
    configPath,
    {},
    ts.sys,
    createProgram,
    reportDiagnostic,
    reportWatchStatusChanged
  );

  const origCreateProgram = host.createProgram;
  host.createProgram = (rootNames, options, host, oldProgram) => {
    console.log("** We're about to create the program! **");
    return origCreateProgram(rootNames, options, host, oldProgram);
  };

  const origPostProgramCreate = host.afterProgramCreate;
  host.afterProgramCreate = program => {
    console.log("** We finished making the program! **");
    origPostProgramCreate!(program);
  };

  ts.createWatchProgram(host);
}

function reportDiagnostic(diagnostic: ts.Diagnostic) {
  console.error(
    "Error",
    diagnostic.code,
    ":",
    ts.flattenDiagnosticMessageText(diagnostic.messageText, formatHost.getNewLine())
  );
}

function reportWatchStatusChanged(diagnostic: ts.Diagnostic) {
  console.info(ts.formatDiagnostic(diagnostic, formatHost));
}

watchMain();
```

## Language Service - Editor Integration

Implement incremental compilation using the Language Service API for editor-like functionality with file watching and on-demand emit.

```typescript
import * as fs from "fs";
import * as ts from "typescript";

function watch(rootFileNames: string[], options: ts.CompilerOptions) {
  const files: Record<string, { version: number }> = {};

  rootFileNames.forEach(fileName => {
    files[fileName] = { version: 0 };
  });

  const servicesHost: ts.LanguageServiceHost = {
    getScriptFileNames: () => rootFileNames,
    getScriptVersion: fileName =>
      files[fileName] && files[fileName].version.toString(),
    getScriptSnapshot: fileName => {
      if (!fs.existsSync(fileName)) {
        return undefined;
      }
      return ts.ScriptSnapshot.fromString(fs.readFileSync(fileName).toString());
    },
    getCurrentDirectory: () => process.cwd(),
    getCompilationSettings: () => options,
    getDefaultLibFileName: options => ts.getDefaultLibFilePath(options),
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    readDirectory: ts.sys.readDirectory,
    directoryExists: ts.sys.directoryExists,
    getDirectories: ts.sys.getDirectories,
  };

  const services = ts.createLanguageService(
    servicesHost,
    ts.createDocumentRegistry()
  );

  rootFileNames.forEach(fileName => {
    emitFile(fileName);

    fs.watchFile(fileName, { persistent: true, interval: 250 }, (curr, prev) => {
      if (+curr.mtime <= +prev.mtime) {
        return;
      }

      files[fileName].version++;
      emitFile(fileName);
    });
  });

  function emitFile(fileName: string) {
    let output = services.getEmitOutput(fileName);

    if (!output.emitSkipped) {
      console.log(`Emitting ${fileName}`);
    } else {
      console.log(`Emitting ${fileName} failed`);
      logErrors(fileName);
    }

    output.outputFiles.forEach(o => {
      fs.writeFileSync(o.name, o.text, "utf8");
    });
  }

  function logErrors(fileName: string) {
    let allDiagnostics = services
      .getCompilerOptionsDiagnostics()
      .concat(services.getSyntacticDiagnostics(fileName))
      .concat(services.getSemanticDiagnostics(fileName));

    allDiagnostics.forEach(diagnostic => {
      let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
      if (diagnostic.file) {
        let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
          diagnostic.start!
        );
        console.log(
          `  Error ${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`
        );
      } else {
        console.log(`  Error: ${message}`);
      }
    });
  }
}

const currentDirectoryFiles = fs
  .readdirSync(process.cwd())
  .filter(fileName => fileName.endsWith(".ts"));

watch(currentDirectoryFiles, { module: ts.ModuleKind.CommonJS });
```

## Custom Module Resolution

Override the default module resolution strategy by implementing custom CompilerHost.resolveModuleNames for specialized module lookup paths.

```typescript
import * as ts from "typescript";
import * as path from "path";

function createCompilerHost(
  options: ts.CompilerOptions,
  moduleSearchLocations: string[]
): ts.CompilerHost {
  return {
    getSourceFile,
    getDefaultLibFileName: () => "lib.d.ts",
    writeFile: (fileName, content) => ts.sys.writeFile(fileName, content),
    getCurrentDirectory: () => ts.sys.getCurrentDirectory(),
    getDirectories: path => ts.sys.getDirectories(path),
    getCanonicalFileName: fileName =>
      ts.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase(),
    getNewLine: () => ts.sys.newLine,
    useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
    fileExists,
    readFile,
    resolveModuleNames
  };

  function fileExists(fileName: string): boolean {
    return ts.sys.fileExists(fileName);
  }

  function readFile(fileName: string): string | undefined {
    return ts.sys.readFile(fileName);
  }

  function getSourceFile(
    fileName: string,
    languageVersion: ts.ScriptTarget,
    onError?: (message: string) => void
  ) {
    const sourceText = ts.sys.readFile(fileName);
    return sourceText !== undefined
      ? ts.createSourceFile(fileName, sourceText, languageVersion)
      : undefined;
  }

  function resolveModuleNames(
    moduleNames: string[],
    containingFile: string
  ): (ts.ResolvedModule | undefined)[] {
    const resolvedModules: (ts.ResolvedModule | undefined)[] = [];
    for (const moduleName of moduleNames) {
      let result = ts.resolveModuleName(moduleName, containingFile, options, {
        fileExists,
        readFile
      });
      if (result.resolvedModule) {
        resolvedModules.push(result.resolvedModule);
      } else {
        for (const location of moduleSearchLocations) {
          const modulePath = path.join(location, moduleName + ".d.ts");
          if (fileExists(modulePath)) {
            resolvedModules.push({ resolvedFileName: modulePath });
            break;
          }
        }
      }
    }
    return resolvedModules;
  }
}

function compile(sourceFiles: string[], moduleSearchLocations: string[]): void {
  const options: ts.CompilerOptions = {
    module: ts.ModuleKind.AMD,
    target: ts.ScriptTarget.ES5
  };
  const host = createCompilerHost(options, moduleSearchLocations);
  const program = ts.createProgram(sourceFiles, options, host);
  program.emit();
}

compile(["app.ts"], ["./custom_modules", "./node_modules/@types"]);
```

## AST Creation and Printing - Generate Code

Use the factory API to programmatically create TypeScript AST nodes and print them to source code for code generation tools.

```typescript
import ts = require("typescript");

function makeFactorialFunction() {
  const functionName = ts.factory.createIdentifier("factorial");
  const paramName = ts.factory.createIdentifier("n");
  const parameter = ts.factory.createParameterDeclaration(
    undefined,
    undefined,
    undefined,
    paramName
  );

  const condition = ts.factory.createBinaryExpression(
    paramName,
    ts.SyntaxKind.LessThanEqualsToken,
    ts.factory.createNumericLiteral(1)
  );
  const ifBody = ts.factory.createBlock(
    [ts.factory.createReturnStatement(ts.factory.createNumericLiteral(1))],
    true
  );

  const decrementedArg = ts.factory.createBinaryExpression(
    paramName,
    ts.SyntaxKind.MinusToken,
    ts.factory.createNumericLiteral(1)
  );
  const recurse = ts.factory.createBinaryExpression(
    paramName,
    ts.SyntaxKind.AsteriskToken,
    ts.factory.createCallExpression(functionName, undefined, [decrementedArg])
  );
  const statements = [
    ts.factory.createIfStatement(condition, ifBody),
    ts.factory.createReturnStatement(recurse)
  ];

  return ts.factory.createFunctionDeclaration(
    undefined,
    [ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
    undefined,
    functionName,
    undefined,
    [parameter],
    ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
    ts.factory.createBlock(statements, true)
  );
}

const resultFile = ts.createSourceFile(
  "someFileName.ts",
  "",
  ts.ScriptTarget.Latest,
  false,
  ts.ScriptKind.TS
);
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

const result = printer.printNode(
  ts.EmitHint.Unspecified,
  makeFactorialFunction(),
  resultFile
);
console.log(result);
// Output:
// export function factorial(n): number {
//     if (n <= 1) {
//         return 1;
//     }
//     return n * factorial(n - 1);
// }
```

## Type Checker - Extract Class Documentation

Use the TypeChecker API to walk the AST, resolve symbols and types, and extract JSDoc documentation for automated API documentation generation.

```typescript
import * as ts from "typescript";
import * as fs from "fs";

interface DocEntry {
  name?: string;
  fileName?: string;
  documentation?: string;
  type?: string;
  constructors?: DocEntry[];
  parameters?: DocEntry[];
  returnType?: string;
}

function generateDocumentation(
  fileNames: string[],
  options: ts.CompilerOptions
): void {
  let program = ts.createProgram(fileNames, options);
  let checker = program.getTypeChecker();
  let output: DocEntry[] = [];

  for (const sourceFile of program.getSourceFiles()) {
    if (!sourceFile.isDeclarationFile) {
      ts.forEachChild(sourceFile, visit);
    }
  }

  fs.writeFileSync("classes.json", JSON.stringify(output, undefined, 4));

  function visit(node: ts.Node) {
    if (!isNodeExported(node)) {
      return;
    }

    if (ts.isClassDeclaration(node) && node.name) {
      let symbol = checker.getSymbolAtLocation(node.name);
      if (symbol) {
        output.push(serializeClass(symbol));
      }
    } else if (ts.isModuleDeclaration(node)) {
      ts.forEachChild(node, visit);
    }
  }

  function serializeSymbol(symbol: ts.Symbol): DocEntry {
    return {
      name: symbol.getName(),
      documentation: ts.displayPartsToString(
        symbol.getDocumentationComment(checker)
      ),
      type: checker.typeToString(
        checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!)
      )
    };
  }

  function serializeClass(symbol: ts.Symbol) {
    let details = serializeSymbol(symbol);

    let constructorType = checker.getTypeOfSymbolAtLocation(
      symbol,
      symbol.valueDeclaration!
    );
    details.constructors = constructorType
      .getConstructSignatures()
      .map(serializeSignature);
    return details;
  }

  function serializeSignature(signature: ts.Signature) {
    return {
      parameters: signature.parameters.map(serializeSymbol),
      returnType: checker.typeToString(signature.getReturnType()),
      documentation: ts.displayPartsToString(
        signature.getDocumentationComment(checker)
      )
    };
  }

  function isNodeExported(node: ts.Node): boolean {
    return (
      (ts.getCombinedModifierFlags(node as ts.Declaration) &
       ts.ModifierFlags.Export) !== 0 ||
      (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile)
    );
  }
}

generateDocumentation(process.argv.slice(2), {
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS
});
```

## Summary

The TypeScript Compiler API serves as the foundation for the entire TypeScript ecosystem, powering everything from VS Code's IntelliSense to build tools like Webpack and bundlers like esbuild. The primary use cases include building compilers and transpilers with `createProgram` and `emit`, implementing type-aware linters and code analyzers using the `TypeChecker`, creating editor integrations with the `LanguageService` for completions and diagnostics, generating code with the `factory` API, and building custom transformers for code manipulation. The API's incremental compilation capabilities through Builder and Watch modes enable efficient rebuilds in large codebases by only reprocessing changed files and their dependencies.

Integration patterns typically involve choosing the right API level for your use case: use `transpileModule` for simple string-to-string JavaScript transformations without type checking, use `transpileDeclaration` for fast isolated declaration file generation without full type checking, use `createProgram` for full compilation with type checking and emit, use `createLanguageService` for editor-like features with incremental updates, and use `createWatchProgram` for continuous compilation. Custom `CompilerHost` implementations allow for virtual file systems and custom module resolution strategies, while the `TypeChecker` provides deep semantic analysis for extracting type information, resolving symbols, and understanding type relationships. All APIs work with TypeScript's immutable AST representation, making it safe to traverse and analyze code across multiple tools in a build pipeline.
### Example Nativewind Component

Source: https://www.nativewind.dev/docs/getting-started/installation/frameworkless

A basic `App.tsx` example demonstrating the usage of Nativewind's `className` prop with Tailwind CSS utility classes for styling React Native components. This serves as a test to confirm the installation is successful.

```javascript
import "./global.css";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
    </View>
  );
}
```

--------------------------------

### Initialize New Expo Project with Nativewind

Source: https://www.nativewind.dev/docs/getting-started/installation

Command to create a new Expo project pre-configured with Nativewind and Tailwind CSS. This simplifies the initial setup process.

```bash
npx rn-new --nativewind
```

--------------------------------

### Example Nativewind Component (App.tsx)

Source: https://www.nativewind.dev/docs/getting-started/installation

A basic React Native component demonstrating the usage of Nativewind's `className` prop with Tailwind utility classes for styling. This serves as a test to verify the installation.

```typescript
import "./global.css"
import { Text, View } from "react-native";
 
export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
    </View>
  );
}

```

--------------------------------

### Install Nativewind and Tailwind CSS (npm)

Source: https://www.nativewind.dev/docs/getting-started/installation/frameworkless

Installs the necessary Nativewind packages, React Native dependencies, and Tailwind CSS for development. It's crucial to install specific versions of `react-native-safe-area-context` and `tailwindcss` as recommended.

```bash
npm install nativewind react-native-reanimated react-native-safe-area-context@5.4.0
npm install --dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11
```

--------------------------------

### Install Nativewind and Peer Dependencies (npm)

Source: https://www.nativewind.dev/docs/getting-started/installation

Installs Nativewind along with its required peer dependencies, react-native-reanimated and react-native-safe-area-context. Also installs tailwindcss and prettier-plugin-tailwindcss as development dependencies.

```bash
npm install nativewind react-native-reanimated@~3.17.4 react-native-safe-area-context@5.4.0
npm install --dev tailwindcss@^3.4.17 prettier-plugin-tailwindcss@^0.5.11
```

--------------------------------

### Install React Native Reanimated Pods

Source: https://www.nativewind.dev/docs/getting-started/installation/frameworkless

After installing `react-native-reanimated`, this command is necessary to link the native modules for iOS projects.

```bash
npx pod-install
```

--------------------------------

### Babel Configuration with Nativewind Preset (babel.config.js)

Source: https://www.nativewind.dev/docs/getting-started/installation

Configures the Babel preset for Expo projects, enabling Nativewind by specifying `jsxImportSource: 'nativewind'` and including the 'nativewind/babel' preset.

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
```

--------------------------------

### Modify app.json for Metro Bundler

Source: https://www.nativewind.dev/docs/getting-started/installation

Configures the `app.json` file to explicitly use the Metro bundler for web builds, which is required for Nativewind's web support.

```json
{
  "expo": {
    "web": {
      "bundler": "metro"
    }
  }
}
```

--------------------------------

### Tailwind CSS Configuration (tailwind.config.js)

Source: https://www.nativewind.dev/docs/getting-started/installation

Configuration file for Tailwind CSS. It specifies the content paths to scan for Nativewind classes and includes the Nativewind preset for default configuration.

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

--------------------------------

### Configure Metro Bundler for Nativewind

Source: https://www.nativewind.dev/docs/getting-started/installation/frameworkless

Modifies your `metro.config.js` to integrate Nativewind. The `withNativeWind` function from `nativewind/metro` is used to process your CSS input file (`./global.css`) for bundling.

```javascript
const {
  getDefaultConfig,
  mergeConfig,
} = require("@react-native/metro-config");
const {
  withNativeWind,
} = require("nativewind/metro");

const config = mergeConfig(getDefaultConfig(__dirname), {
  /* your config */
});

module.exports = withNativeWind(config, {
  input: "./global.css",
});
```

--------------------------------

### Add Nativewind Babel Preset

Source: https://www.nativewind.dev/docs/getting-started/installation/frameworkless

Applies the Nativewind Babel preset to your `babel.config.js` file. This preset is required for Nativewind to transpile your styles correctly during the build process.

```javascript
module.exports = {
  // remove the existing presets and add the new one or add it to the existing presets
  presets: ['<existing presets>', 'nativewind/babel'],
};
```

--------------------------------

### Metro Bundler Configuration with Nativewind (metro.config.js)

Source: https://www.nativewind.dev/docs/getting-started/installation

Configures the Metro bundler to work with Nativewind. It uses `withNativeWind` to process the specified input CSS file.

```javascript
const {
  getDefaultConfig
} = require("expo/metro-config");
const {
  withNativeWind
} = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname)
 
module.exports = withNativeWind(config, { input: './global.css' })

```

--------------------------------

### Import Global CSS File

Source: https://www.nativewind.dev/docs/getting-started/installation/frameworkless

Imports the global CSS file into your application's entry point (e.g., `App.js`). This makes the Tailwind directives available throughout your project.

```javascript
import "./global.css";

export default App() {
  /* Your App */
}
```

--------------------------------

### cssInterop with TextInput Example

Source: https://www.nativewind.dev/docs/api/css-interop

An example demonstrating how to use cssInterop with the core TextInput component to map className, placeholderClassName, and selectionClassName.

```APIDOC
## cssInterop with TextInput Example

### Description
This example shows how to configure `cssInterop` for the `TextInput` component, mapping `className` to the `style` prop and extracting specific styles to pass as props. It also demonstrates how to handle `placeholderClassName` and `selectionClassName` by mapping their styles to specific props like `placeholderTextColor` and `selectionColor`.

### Method
`cssInterop(TextInput, options)`

### Endpoint
N/A (This is a function configuration)

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **component** (object) - `TextInput` component.
- **options** (object) - Configuration options:
  - **className** (object): Maps `className` prop.
    - **target** (string): Maps to the `style` prop.
    - **nativeStyleToProp** (object): Extracts `textAlign` style to the `textAlign` prop.
  - **placeholderClassName** (object): Handles placeholder styles.
    - **target** (boolean): `false`, indicating not to pass as a direct prop.
    - **nativeStyleToProp** (object): Extracts `color` style to the `placeholderTextColor` prop.
  - **selectionClassName** (object): Handles selection styles.
    - **target** (boolean): `false`, indicating not to pass as a direct prop.
    - **nativeStyleToProp** (object): Extracts `color` style to the `selectionColor` prop.

### Request Example
```javascript
cssInterop(TextInput, {
  className: {
    target: "style",
    nativeStyleToProp: {
      textAlign: true,
    },
  },
  placeholderClassName: {
    target: false,
    nativeStyleToProp: {
      color: "placeholderTextColor",
    },
  },
  selectionClassName: {
    target: false,
    nativeStyleToProp: {
      color: "selectionColor",
    },
  },
});
```

### Response
This configuration modifies the `TextInput` component's behavior for style resolution.
```

--------------------------------

### Tailwind Directives in CSS

Source: https://www.nativewind.dev/docs/getting-started/installation

Adds the necessary Tailwind CSS directives to a global CSS file. These directives are essential for Tailwind to process and generate styles.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

--------------------------------

### Transpile Nativewind and CSS Interop Packages

Source: https://www.nativewind.dev/docs/getting-started/installation/nextjs

This code demonstrates how to configure the `transpilePackages` option in your `next.config.js` file. It ensures that `nativewind` and `react-native-css-interop` are correctly transpiled by Next.js, which is necessary for them to function properly within the Next.js build process.

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
+  transpilePackages: ["nativewind", "react-native-css-interop"],
}

```

--------------------------------

### Verify Nativewind Installation in React Component

Source: https://www.nativewind.dev/docs/getting-started/troubleshooting

Demonstrates how to use the `verifyInstallation()` utility function from Nativewind within a React component to confirm correct installation. Do not call this function on the global scope.

```javascript
import React from 'react';
import { verifyInstallation } from 'nativewind';

function App() {
    // Ensure to call inside a component, not globally
    verifyInstallation();

    return (
      // Your component JSX here...
    );
}

export default App;
```

--------------------------------

### TypeScript Type Definitions for Nativewind

Source: https://www.nativewind.dev/docs/getting-started/installation

Adds a triple-slash directive to a TypeScript environment declaration file (`.d.ts`) to include Nativewind's type definitions, enabling better IntelliSense and type checking.

```typescript
/// <reference types="nativewind/types" />
```

--------------------------------

### Importing CSS File in App.js

Source: https://www.nativewind.dev/docs/getting-started/installation

Imports the global CSS file containing Tailwind directives into the main App component. This ensures that the styles are applied throughout the application.

```javascript
import "./global.css"
 
export default App() {
  /* Your App */
}
```

--------------------------------

### cssInterop Example with TextInput Component

Source: https://www.nativewind.dev/docs/api/css-interop

Illustrates a practical example of using cssInterop with the core TextInput component. It details how to map `className` to the `style` prop and extract specific styles like `textAlign` to pass as props. It also shows how to handle `placeholderClassName` and `selectionClassName`.

```javascript
cssInterop(TextInput, {
  className: {
    target: "style", // map className->style
    nativeStyleToProp: {
      textAlign: true, // extract `textAlign` styles and pass them to the `textAlign` prop
    },
  },
  placeholderClassName: {
    target: false, // Don't pass this as a prop
    nativeStyleToProp: {
      color: "placeholderTextColor", // extract `color` and pass it to the `placeholderTextColor`prop
    },
  },
  selectionClassName: {
    target: false, // Don't pass this as a prop
    nativeStyleToProp: {
      color: "selectionColor", // extract `color` and pass it to the `selectionColor`prop
    },
  },
});
```

--------------------------------

### Add Nativewind Preset to Tailwind Configuration

Source: https://www.nativewind.dev/docs/getting-started/installation/nextjs

This code snippet shows how to add the Nativewind preset to your `tailwind.config.js` file. This integrates Nativewind's styling capabilities into your Next.js project's Tailwind CSS configuration. It modifies the `presets` array in the configuration object.

```javascript
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
  ],
+ presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
}
```

--------------------------------

### Enable Nativewind Debug Mode

Source: https://www.nativewind.dev/docs/getting-started/troubleshooting

Instructions to enable Nativewind's debug mode by setting the `DEBUG` environment variable before starting your development server. This helps in gathering detailed logs for troubleshooting.

```bash
DEBUG=nativewind <start-command>
```

--------------------------------

### Configure JSX Import Source for Nativewind

Source: https://www.nativewind.dev/docs/getting-started/installation/nextjs

This configuration snippet for `tsconfig.json` or `jsconfig.json` sets the `jsxImportSource` to `nativewind`. This is a crucial step for Nativewind to correctly process JSX elements and apply styles in your Next.js project. It ensures that Nativewind's JSX transformations are enabled.

```json
{
  "compilerOptions": {
    "jsxImportSource": "nativewind"
  }
}
```

--------------------------------

### Apply Tailwind Styles with Higher Specificity

Source: https://www.nativewind.dev/docs/getting-started/installation/nextjs

This configuration modifies the `tailwind.config.js` file to set `important: 'html'`. This common fix for Next.js projects ensures that Tailwind styles, managed by Nativewind, are applied with higher specificity, preventing them from being overridden by other StyleSheet imports and ensuring styles are correctly rendered.

```javascript
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [require('nativewind/tailwind/css')],
+ important: 'html',
  theme: {
    extend: {},
  },
}

```

--------------------------------

### Compile Tailwind CSS using Tailwind CLI

Source: https://www.nativewind.dev/docs/getting-started/troubleshooting

Example of using the Tailwind CLI to compile CSS. The input should be your project's main CSS file containing the '@import "tailwindcss";' directive, and the output will be the generated CSS file.

```bash
npx tailwindcss --input ./global.css --output output.css
```

--------------------------------

### Switching Between Multiple Themes with Light/Dark Mode in NativeWind

Source: https://www.nativewind.dev/docs/guides/themes

This example illustrates how to implement a theming system in NativeWind that supports multiple themes (e.g., 'brand', 'christmas') and switches between light and dark modes. It uses the `useColorScheme` hook to detect the current color scheme and apply the appropriate theme variables.

```javascript
import { vars, useColorScheme } from 'nativewind'

const themes = {
  brand: {
    'light': vars({
      '--color-primary': 'black',
      '--color-secondary': 'white'
    }),
    'dark': vars({
      '--color-primary': 'white',
      '--color-secondary': 'dark'
    })
  },
  christmas: {
    'light': vars({
      '--color-primary': 'red',
      '--color-secondary': 'green'
    }),
    'dark': vars({
      '--color-primary': 'green',
      '--color-secondary': 'red'
    })
  }
}

function Theme(props) {
  const { colorScheme } = useColorScheme()
  return (
    <View style={themes[props.name][colorScheme]}>
      {props.children}
    </View>
  )
}

export default App() {
  return (
    <Theme name="brand">
      <View className="text-primary">{/* rgba(0, 0, 0, 1) */}>
      <Theme name="christmas">
        <View className="text-primary">{/* rgba(255, 0, 0, 1) */}>
      </Theme>
    </Theme>
  )
}
```

--------------------------------

### Defining and Using Custom Theme Colors in NativeWind

Source: https://www.nativewind.dev/docs/guides/themes

This set of examples demonstrates how to define and use custom theme colors in NativeWind. It includes a `colors.ts` file for defining custom color palettes, a `tailwind.config.js` to extend the theme with these colors, and a `MyActivityIndicator.js` component that utilizes a custom color.

```javascript
module.exports = {
  tahiti: {
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
  },
};
```

```javascript
const colors = require("./colors");

module.exports = {
  theme: {
    extend: {
      colors,
    },
  },
};
```

```javascript
import colors from "./colors";

export function MyActivityIndicator(props) {
  return <ActivityIndicator color={colors.tahiti.500} {...props} />;
}
```

--------------------------------

### Configure Metro Bundler with NativeWind Plugin (JavaScript)

Source: https://www.nativewind.dev/docs/guides/using-with-monorepos

This snippet shows how to modify the `metro.config.js` file in an NX monorepo to include the NativeWind plugin. It uses a promise chain to merge existing NX configuration with the NativeWind configuration, specifying the input CSS file.

```javascript
const { withNativeWind } = require("nativewind/metro");

// ... existing Nx configuration

module.exports = withNxMetro(mergeConfig(defaultConfig, customConfig), {
  // ... existing Nx config
}).then((config) => withNativeWind(config, { input: "./global.css" }));
```

--------------------------------

### Native App Setup with SafeAreaProvider

Source: https://www.nativewind.dev/docs/tailwind/new-concepts/safe-area-insets

This snippet shows how to integrate `react-native-safe-area-context` into a React Native application to enable safe area insets. It requires wrapping the app's root component with `SafeAreaProvider` and utilizing the `p-safe` class for content padding.

```javascript
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
 
export function MyApp(props) {
  // Make sure you have the SafeAreaProvider at the root of your app
  return (
    <SafeAreaProvider>
      <View className="p-safe" {...props} />
    </SafeAreaProvider>
  );
}
```

--------------------------------

### React Native Box Shadow Example

Source: https://www.nativewind.dev/docs/tailwind/effects/box-shadow

This code snippet demonstrates how to apply box shadows using NativeWind in a React Native application. It imports necessary components, defines styled components, and applies shadow classes directly within the JSX. Ensure you have NativeWind and react-native-shadow-generator installed.

```javascript
import { Text, View } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View)
const StyledText = styled(Text)

const App = () => {
  return (
    <StyledView className="flex-1 items-center justify-center">
      <StyledView className="h-[50vh] items-center justify-center shadow">
        <StyledText className="text-slate-800 shadow">Try editing me! 🎉</StyledText>
      </StyledView>
    </StyledView>
  );
}
```

--------------------------------

### Configure Metro with NativeWind

Source: https://www.nativewind.dev/docs/api/with-nativewind

Integrates NativeWind into your Metro bundler configuration using the withNativeWind higher-order component. It requires the path to your main NativeWind CSS file as input. This setup allows NativeWind to process your Tailwind CSS for React Native.

```javascript
import {
  withNativeWind,
} from "native-wind/metro";

module.exports = withNativeWind(config, {
  input: "<relative path to your .css file>",
});
```

--------------------------------

### Clear Cache for Expo and React Native CLI

Source: https://www.nativewind.dev/docs/getting-started/troubleshooting

Commands to clear the cache when starting your application for Expo and framework-less React Native projects to resolve troubleshooting issues.

```bash
npx expo start --clear
```

```bash
npx react-native start --reset-cache
```

--------------------------------

### Platform-specific style rendering differences in React Native

Source: https://www.nativewind.dev/docs/core-concepts/style-specificity

Illustrates how style specificity rules can lead to different rendering outcomes on Native versus Web platforms in React Native. This example shows how the order of styles applied via the 'style' prop and 'className' can affect the final text color.

```javascript
// Native has red text
<Text style={{ color: 'black' }, { color: 'red' }} />

// Web has black text
<Text className="text-red-500" style={{ color: 'black'}} />
```

--------------------------------

### Create a Nativewind Component with Variants (React Native)

Source: https://www.nativewind.dev/docs/guides/custom-components

This example shows how to build a more complex Nativewind component with different visual variants. It uses an object to map variant names to specific class names, allowing for flexible styling based on component state or type.

```javascript
const variantStyles = {
  default: "rounded",
  primary: "bg-blue-500 text-white",
  secondary: "bg-white-500 text-black",
};

function MyComponent({ variant, className, ...props }) {
  return (
    <Text
      className={
        `${variantStyles.default}
        ${variantStyles[variant]}
        ${className}
      `}
      {...props }
    />
  );
}
```

--------------------------------

### Dynamic Styling with Conditional Logic in Nativewind

Source: https://www.nativewind.dev/docs/index

Demonstrates creating dynamic styles based on component props. This example uses conditional logic to build an array of classNames that are joined and applied to a React Native Text component.

```javascript
import { Text } from "react-native";

export function MyText({ bold, italic, lineThrough, ...props }) {
  const classNames = [];

  if (bold) classNames.push("font-bold");
  if (italic) classNames.push("italic");
  if (lineThrough) classNames.push("line-through");

  return <Text className={classNames.join(" ")} {...props} />;
}
```

--------------------------------

### Manually Set Color Scheme with colorScheme.set()

Source: https://www.nativewind.dev/docs/core-concepts/dark-mode

This example shows how to manually control the dark mode state using `colorScheme.set()` from NativeWind. It includes a basic toggle functionality to switch between 'light' and 'dark' themes and updates the UI accordingly. Persisting the user's choice can be achieved with AsyncStorage.

```javascript
import { useState } from "react";
import { SafeAreaView, Text, Pressable } from "react-native";
import { colorScheme } from "nativewind";
import { StatusBar } from 'expo-status-bar';

import './global.css';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setCurrentTheme(newTheme);
    colorScheme.set(newTheme);
  };

  return (
    <SafeAreaView
      className={`flex-1 ${currentTheme === 'dark' ? 'bg-gray-900' : 'bg-white'} justify-center items-center`}
    >
      <StatusBar style={currentTheme === 'dark' ? 'light' : 'dark'} />
      <Pressable
        onPress={toggleTheme}
        className="mt-4"
      >
        <Text className={currentTheme === 'dark' ? 'text-gray-100' : 'text-gray-900'} style={{ fontSize: 16, fontWeight: 'bold' }}>
          {currentTheme === 'dark' ? 'Dark' : 'Light'}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
```

--------------------------------

### Interoperable SVG Styling with NativeWind (React Native)

Source: https://www.nativewind.dev/docs/tailwind/svg/fill

This snippet demonstrates how to use `cssInterop` to enable NativeWind's className styling for SVG components like Svg, Circle, and Rect from react-native-svg. It includes the necessary imports and the `cssInterop` setup for className to map to the 'style' prop, with specific native style properties defined. The example usage shows how to apply dynamic styles like fill and stroke using Tailwind CSS classes.

```javascript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import { cssInterop } from 'nativewind'

cssInterop(Svg, {
  className: {
    target: "style",
    nativeStyleToProp: { width: true, height: true }
  },
});
cssInterop(Circle, {
  className: {
    target: "style",
    nativeStyleToProp: { width: true, height: true, stroke: true, strokeWidth: true, fill: true }
  },
});
cssInterop(Rect, {
  className: {
    target: "style",
    nativeStyleToProp: { width: true, height: true, stroke: true, strokeWidth: true, fill: true }
  },
});

export function SvgExample () {
  return (
    <View className="inset-0 items-center content-center">
      <Svg className="h-1/2 w-1/2" viewBox="0 0 100 100" >
        <Circle cx="50" cy="50" r="45" className="stroke-blue-500 stroke-2 fill-green-500" />
        <Rect x="15" y="15" className="w-16 h-16 stroke-red-500 stroke-2 fill-yellow-500" />
      </Svg>
    </View>
  );
}

```

--------------------------------

### VS Code Configuration for Custom ClassName Props

Source: https://www.nativewind.dev/docs/getting-started/editor-setup

This JSON snippet configures the Tailwind CSS IntelliSense extension in VS Code to recognize custom className attributes. It adds 'headerClassName' alongside the default 'class' and 'className' to enable autocompletion for these props.

```json
{
  "tailwindCSS.classAttributes": [
    "class",
    "className",
    "headerClassName"
  ]
}
```

--------------------------------

### Using calc() for CSS Property Calculations in Nativewind

Source: https://www.nativewind.dev/docs/core-concepts/functions-and-directives

Illustrates the use of the CSS calc() function for performing calculations on CSS property values. It shows examples of combining calc() with var() and the limitations in React Native regarding mixing units (numerical and percentage).

```css
/* Can be used to calculate a value */
.element {
  width: calc(var(--my-variable) - (20px + 2rem));
}

/* Or part of a value */
.element {
  background-color: hsl(
    calc(var(--H) + 20),
    calc(var(--S) - 10%),
    calc(var(--L) + 30%)
  )
}

```

```css
/* Limitations: Mixing Units */
.element {
  /* ❌ This mixes `numerical` and `percentage` units */
  width: calc(100% - 20px);
}

.element {
  /* ❌ This mixes `numerical` and `percentage` units */
  --width: 100%;
  width: calc(var(--width) - 20px);
}

.element {
  /* ✅  This only uses `numerical` units */
  --width: 100rem;
  width: calc(var(--width) - 20px);
}

.element {
  /* ✅  This only uses `percentage` units */
  --width: 100%;
  width: calc(var(--width) - 20%);
}

```

```css
/* Limitations: Custom Properties */
.element {
  /* ❌ Operators cannot be in a custom property */
  --width: 100% - 20%;
  width: calc(var(--width));
}

.element {
  /* ✅  Operator is part of the `calc()` expression */
  --width: 100%;
  width: calc(var(--width) - 20%);
}

```

--------------------------------

### Configure Font Family in tailwind.config.js with NativeWind

Source: https://www.nativewind.dev/docs/tailwind/typography/font-family

This JavaScript snippet demonstrates how to extend the `fontFamily` theme in `tailwind.config.js` using NativeWind. It shows how to define static font families and use `platformSelect` for conditional font loading based on the platform (iOS, Android, or default). Ensure `nativewind/theme` is installed.

```javascript
import { platformSelect } from "nativewind/theme";

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        example: ["ExampleFontFamily"],
        system: platformSelect({
          ios: "Georgia",
          android: "sans-serif",
          default: "ui-sans-serif",
        }),
      },
    },
  },
};
```

--------------------------------

### Merge Nativewind className with Inline Styles (React Native)

Source: https://www.nativewind.dev/docs/guides/custom-components

Nativewind automatically merges utility class names with inline styles. This example illustrates how inline styles can override or complement styles defined by className, following standard style specificity rules.

```javascript
<Text className="text-white" style={{ color: "black" }} /> // Will be black
```

--------------------------------

### cssInterop Usage and Configuration

Source: https://www.nativewind.dev/docs/api/css-interop

Demonstrates the basic usage of the cssInterop function for mapping and overriding component props. It shows how to create new props, map them to existing ones, or override existing props with custom configurations, including style attribute mapping.

```javascript
import { cssInterop } from 'nativewind';

// Create a new prop and map it to an existing prop
cssInterop(component, { "new-prop": "existing-prop" });

// Override an existing prop.
cssInterop(component, { "new-prop": true });

// Override an existing prop.
cssInterop(component, {
  "new-prop": {
    target: "existing-prop", // string or boolean
    nativeStyleToProp: {
      "style-attribute": "existing-prop",
    }
  }
});
```

--------------------------------

### Outline Style Compatibility (Web)

Source: https://www.nativewind.dev/docs/tailwind/borders/outline-style

Demonstrates the usage of outline utility classes in NativeWind. These classes are exclusively supported on the web platform. No specific dependencies are mentioned beyond the core NativeWind library.

```html
<div class="outline-none">...</div>
<div class="outline">...</div>
<div class="outline-dashed">...</div>
<div class="outline-dotted">...</div>
<div class="outline-double">...</div>
```

--------------------------------

### NativeWind Place Items Compatibility

Source: https://www.nativewind.dev/docs/tailwind/flexbox/place-content

Details the compatibility of NativeWind's 'place-items' classes. All listed classes are confirmed to be supported on the web platform only, with no native support indicated.

```markdown
Class| Support  
---|---
```
place-items-start
```
| 🌐 Web only  
```
place-items-end
```
| 🌐 Web only  
```
place-items-center
```
| 🌐 Web only  
```
place-items-baseline
```
| 🌐 Web only  
```
place-items-stretch
```
| 🌐 Web only  
```

--------------------------------

### Place Self Compatibility Table

Source: https://www.nativewind.dev/docs/tailwind/flexbox/place-self

This section details the compatibility of different 'place-self' values with the web. All listed values are web-only.

```markdown
Class| Support  
---|---  
```
place-self-auto
```| 🌐 Web only  
```
place-self-start
```| 🌐 Web only  
```
place-self-end
```| 🌐 Web only  
```
place-self-center
```| 🌐 Web only  
```
place-self-stretch
```| 🌐 Web only
```

--------------------------------

### Demonstrate Explicit Styles in NativeWind (React Native)

Source: https://www.nativewind.dev/docs/core-concepts/differences

Illustrates the correct way to apply styles, especially during conditional rendering, to avoid React Native styling issues. It shows how to provide both default and dark mode text colors.

```jsx
❌ <Text className="dark:text-white-500" />
✅ <Text className="text-black dark:text-red-500" />
```

--------------------------------

### cssInterop Function Usage

Source: https://www.nativewind.dev/docs/api/css-interop

Demonstrates the basic usage of the cssInterop function to map new props to existing ones or override existing props.

```APIDOC
## cssInterop Function

### Description
This function "tags" components so that when its rendered, the runtime will know to resolve the className strings into styles. You should only use this when you have a custom native component, are using a third-party component that needs the style prop to be resolved, or are using a third-party component that does not pass all its props to its children.

### Method
`cssInterop(component, options)`

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
- **component** (object) - Required - The component to tag.
- **options** (object) - Required - Configuration options for mapping props and styles.
  - **new-prop** (string | boolean | object) - The name of the new prop or mapping configuration.
    - If string: Maps the new prop to an existing prop.
    - If boolean `true`: Overrides an existing prop.
    - If object: Provides detailed mapping configuration:
      - **target** (string | boolean): The existing prop to map to or `false` to not pass as a prop.
      - **nativeStyleToProp** (object): An object mapping style attributes to existing props.

### Request Example
```javascript
// Create a new prop and map it to an existing prop
cssInterop(component, { "new-prop": "existing-prop" });

// Override an existing prop
cssInterop(component, { "new-prop": true });

// Detailed mapping configuration
cssInterop(component, {
  "new-prop": {
    target: "existing-prop",
    nativeStyleToProp: {
      "style-attribute": "existing-prop",
    }
  }
});
```

### Response
This function does not return a value. It modifies the component in place.
```

--------------------------------

### Map Similar Props to Single Style Prop

Source: https://www.nativewind.dev/docs/guides/third-party-components

Demonstrates how to use `cssInterop` to map multiple similar props (like `labelColor` and `inputColor`) to a single `className` prop, simplifying style management in wrapper components.

```javascript
import { cssInterop } from 'nativewind';
import { Text, TextInput } from 'react-native';

function ThirdPartyComponent({ labelColor, inputColor, ...props }) {
  return (
    <>
      <Text style={{ color: labelColor }}>Label</Text>
      <TextInput style={{ color: inputColor }} />
    </>
  );
}

// Original approach (cumbersome)
// cssInterop(ThirdPartyComponent, {
//   labelColorClassName: {
//     target: false,
//     nativeStyleToProps: { color: 'labelColor' }
//   },
//   inputColorClassName: {
//     target: false,
//     nativeStyleToProps: { color: 'inputColor' }
//   }
// })

// Wrapper component using the original approach
// function Wrapper() {
//   const labelStyle = cva('color-black');
//   const inputStyle = cva('color-black');
//   return (
//     <ThirdPartyComponent
//       labelColorClassName={labelStyle}
//       inputColorClassName={inputStyle}
//     />
//   );
// }

// Simplified approach using dynamic mapping
cssInterop(ThirdPartyComponent, {
  className: 'style',
});

function Wrapper() {
  const style = cva("{}-[inputColor]:color-black {}-[labelColor]:color-black");
  return <ThirdPartyComponent className={style} />;
}
```

--------------------------------

### Outline Offset Utility Classes (Web)

Source: https://www.nativewind.dev/docs/tailwind/borders/outline-offset

Demonstrates the various outline-offset utility classes available in NativeWind. These classes are exclusively supported on the web platform. Usage involves applying classes like `outline-offset-0`, `outline-offset-1`, `outline-offset-2`, `outline-offset-4`, and `outline-offset-8` directly within your JSX or HTML structure. No external dependencies are required beyond NativeWind itself.

```html
<div class="outline-offset-0">...</div>
<div class="outline-offset-1">...</div>
<div class="outline-offset-2">...</div>
<div class="outline-offset-4">...</div>
<div class="outline-offset-8">...</div>
```

--------------------------------

### Use pixelRatio for Screen Density Scaling

Source: https://www.nativewind.dev/docs/customization/theme

The `pixelRatio` helper scales values based on the device's pixel ratio, similar to `PixelRatio.get()`. If a number is provided, it multiplies `PixelRatio.get()` by that number.

```javascript
const { pixelRatio } = require("nativewind/theme");

module.module.exports = {
  theme: {
    extend: {
      borderWidth: {
        number: pixelRatio(2),
      },
    },
  },
};
```

--------------------------------

### Remap Props Options (JavaScript)

Source: https://www.nativewind.dev/docs/api/remap-props

Illustrates the different ways the remapProps utility can be configured. It shows how to create a new prop that maps to an existing prop on the component and how to override an existing prop directly. These options provide flexibility in customizing component prop behavior.

```javascript
// Create a new prop and map it to an existing prop
remapProps(component, { "new-prop": "existing-prop" });

// Override an existing prop.
remapProps(component, { prop: true });
```

--------------------------------

### withNativeWind HOC

Source: https://www.nativewind.dev/docs/api/with-nativewind

The `withNativeWind` higher-order component (HOC) is used to update your Metro configuration to support NativeWind. It requires the path to your main CSS file.

```APIDOC
## withNativeWind HOC

### Description
This HOC modifies the Metro configuration to enable NativeWind support. The essential `input` option specifies the path to your CSS file.

### Method
Higher-Order Component

### Endpoint
N/A (Configuration Function)

### Parameters
#### Required Options
- **input** (string) - Required - The relative path to your `.css` file.

#### Optional Options
- **output** (string) - Optional - The relative path to the output directory for cached files. Defaults to `<projectRoot>/node_modules/.cache/nativewind/`.
- **projectRoot** (string) - Optional - The absolute path to your project root. Primarily used to set the `output` path.
- **inlineRem** (number | false) - Optional - A numeric value for inlining `rem` units on native platforms. Set to `false` to disable. Defaults to `14`.
- **configPath** (string) - Optional - The relative path to your `tailwind.config` file. Defaults to `tailwind.config`. It's recommended to use `@config` instead.
- **hotServerOptions** (object) - Optional - Options to pass to the hot server. Defaults to `{ port: 8089 }`.

### Request Example
```javascript
import { withNativeWind } from "native-wind/metro";

module.exports = withNativeWind(config, {
  input: "./app/tailwind.css",
  // other options can be added here
});
```

### Response
N/A (Modifies Metro Configuration)

### Experimental Options
These options are configured within an `experiments` key.

#### `inlineAnimations`
- **Description**: Use `react-native-reanimated`'s inline shared values instead of hooks for improved performance. Note potential issues with fast-refresh.
- **Type**: `boolean`
- **Default**: `false`

### Example Usage with Experimental Option
```javascript
import { withNativeWind } from "native-wind/metro";

module.exports = withNativeWind(config, {
  input: "./app/tailwind.css",
  experiments: {
    inlineAnimations: true,
  },
});
```
```

--------------------------------

### Order Utility Classes (Web Only)

Source: https://www.nativewind.dev/docs/tailwind/flexbox/order

This section lists the available order utility classes in NativeWind. All listed classes are exclusively supported on the web platform. These classes control the visual order of elements within a flex or grid container. No specific input or output is detailed, as these are CSS class names.

```html
```
order-1
```
```

```html
```
order-2
```
```

```html
```
order-3
```
```

```html
```
order-4
```
```

```html
```
order-5
```
```

```html
```
order-6
```
```

```html
```
order-7
```
```

```html
```
order-8
```
```

```html
```
order-9
```
```

```html
```
order-10
```
```

```html
```
order-11
```
```

```html
```
order-12
```
```

```html
```
order-first
```
```

```html
```
order-last
```
```

```html
```
order-none
```
```

--------------------------------

### NativeWind Break After Class Compatibility

Source: https://www.nativewind.dev/docs/tailwind/layout/break-after

This section details the compatibility of various 'break-after' classes with NativeWind. All listed classes are exclusively supported on the web platform.

```text
Class| Support  
---|---
```
break-after-auto
```
| 🌐 Web only  
```
break-after-avoid
```
| 🌐 Web only  
```
break-after-all
```
| 🌐 Web only  
```
break-after-avoid-page
```
| 🌐 Web only  
```
break-after-page
```
| 🌐 Web only  
```
break-after-left
```
| 🌐 Web only  
```
break-after-right
```
| 🌐 Web only  
```
break-after-column
```
| 🌐 Web only  
```

--------------------------------

### Read System Color Scheme with useColorScheme

Source: https://www.nativewind.dev/docs/core-concepts/dark-mode

This snippet demonstrates how to read the current system's color scheme preference using the `useColorScheme` hook from NativeWind. It's essential for implementing automatic dark mode that follows the device's settings. No explicit dependencies are needed beyond NativeWind itself.

```javascript
import { useColorScheme } from 'nativewind';

// Inside your component:
const { colorScheme } = useColorScheme();

// You can now use colorScheme to conditionally apply styles,
// e.g., className={`bg-${colorScheme === 'dark' ? 'gray-800' : 'white'}`}
```

--------------------------------

### pixelRatioSelect() Utility

Source: https://www.nativewind.dev/docs/guides/themes

A helper function similar to `Platform.select` for conditionally applying styles based on the device's pixel ratio.

```APIDOC
## pixelRatioSelect()

### Description
A helper function to use `PixelRatio.get()` in a conditional statement, similar to `Platform.select`.

### Method
Utility Function

### Endpoint
N/A (Used within `tailwind.config.js`)

### Parameters
*   **options** (object) - Required - An object where keys represent pixel ratio thresholds or 'default', and values are the corresponding styles or values.
    *   **key** (number | 'default') - The pixel ratio threshold or the default value.
    *   **value** (any) - The style or value to apply for the given pixel ratio.

### Request Example
```javascript
const { pixelRatioSelect, hairlineWidth } = require("nativewind/theme");

module.exports = {
  theme: {
    extend: {
      borderWidth: pixelRatioSelect({
        2: 1,
        default: hairlineWidth(),
      }),
    },
  },
};
```

### Response
*   **selectedStyle** (any) - The style or value selected based on the current device's pixel ratio.
```

--------------------------------

### Dynamic Theme with CSS Variables in NativeWind

Source: https://www.nativewind.dev/docs/guides/themes

This snippet demonstrates how to create a dynamic theme in NativeWind by utilizing CSS Variables. It shows the configuration in `tailwind.config.js` to set up custom color values and the corresponding usage in an `App.tsx` component to apply these themes.

```javascript
module.exports = {
  theme: {
    colors: {
      primary: "rgb(var(--color-values) / <alpha-value>)",
    },
  },
  plugins: [
    ({ addBase }) =>
      addBase({
        ":root": {
          "--color-values": "255 0 0",
          "--color-rgb": "rgb(255 0 0)",
        },
      }),
  ],
};
```

```typescript
import { vars } from 'nativewind'

const userTheme = vars({
  '--color-values': '0 255 0',
  '--color-rgb': 'rbg(0 0 255)'
});

export default App() {
  return (
    <View>
      <Text className="text-primary">Access as a theme value</Text>
      <Text className="text-[--color-rgb]">Or the variable directly</Text>

      <View style={userTheme}>
        <Text className="text-primary">I am now green!</Text>
        <Text className="text-[--color-rgb]">I am now blue!</Text>
      </View>
    </View>
  )
}
```

--------------------------------

### Scroll Snap Align Classes Compatibility

Source: https://www.nativewind.dev/docs/tailwind/interactivity/scroll-snap-align

This section outlines the compatibility of scroll snap alignment utility classes with NativeWind. It specifies that classes such as snap-start, snap-end, snap-center, and snap-align-none are currently supported only on the web platform. The table uses icons to denote support levels.

```markdown
Class| Support  
---|---  
```
snap-start
```
| 🌐 Web only  
```
snap-end
```
| 🌐 Web only  
```
snap-center
```
| 🌐 Web only  
```
snap-align-none
```
| 🌐 Web only  
Legend
### Class
`-{n}` Supports values from theme
`-[n]` Supports arbitrary values
### Icon
✅ Full support
✔️ Partial support on native
🧪 Experimental support on native
📱 Native only
🌐 Web only
```

--------------------------------

### pixelRatio() Utility

Source: https://www.nativewind.dev/docs/guides/themes

Equivalent of React Native's PixelRatio.get(). Can be used to scale values based on the device's pixel density.

```APIDOC
## pixelRatio()

### Description
Equivalent of `PixelRatio.get()`. If a number is provided it returns `PixelRatio.get() * <value>`, otherwise it returns the PixelRatio value.

### Method
Utility Function

### Endpoint
N/A (Used within `tailwind.config.js`)

### Parameters
*   **value** (number) - Optional - The value to multiply with the device's pixel ratio.

### Request Example
```javascript
const { pixelRatio } = require("nativewind/theme");

module.exports = {
  theme: {
    extend: {
      borderWidth: {
        number: pixelRatio(2),
      },
    },
  },
};
```

### Response
*   **scaledValue** (number) - The calculated pixel ratio or scaled value.
```

--------------------------------

### Break Before Utility Classes (Web Only)

Source: https://www.nativewind.dev/docs/tailwind/layout/break-before

Demonstrates the available 'break-before' utility classes supported by NativeWind. These classes control how page breaks occur before an element and are exclusively for web environments.

```html
<div class="break-before-auto">...</div>
<div class="break-before-avoid">...</div>
<div class="break-before-all">...</div>
<div class="break-before-avoid-page">...</div>
<div class="break-before-page">...</div>
<div class="break-before-left">...</div>
<div class="break-before-right">...</div>
<div class="break-before-column">...</div>
```

--------------------------------

### Apply Pixel Ratio Multiplier using pixelRatio()

Source: https://www.nativewind.dev/docs/guides/themes

The `pixelRatio()` function multiplies the device's pixel ratio by a given value, useful for applying density-aware sizing. It takes a numeric value and returns the scaled value, or just the pixel ratio if no value is provided. This is typically used within `tailwind.config.js` to extend theme properties.

```javascript
const { pixelRatio } = require("nativewind/theme");

module.exports = {
  theme: {
    extend: {
      borderWidth: {
        number: pixelRatio(2),
      },
    },
  },
};
```

--------------------------------

### Enable Disabled Tailwind Plugins in NativeWind (JavaScript)

Source: https://www.nativewind.dev/docs/core-concepts/differences

Shows how to re-enable performance-optimized, disabled core plugins like textOpacity, borderOpacity, and backgroundOpacity in NativeWind by configuring `tailwind.config.js`.

```javascript
tailwind.config.js
module.exports = {
  // ...
  corePlugins: {
    ...
    textOpacity: true,
    borderOpacity: true,
    backgroundOpacity: true,
    divideOpacity: true,
  },
  // ...
};
```

--------------------------------

### Enable NativeWind backgroundOpacity

Source: https://www.nativewind.dev/docs/tailwind/backgrounds/background-color

This code snippet shows how to enable the `backgroundOpacity` core plugin in NativeWind's `tailwind.config.js`. This is necessary if you need to dynamically control text opacity using the `--tw-background-opacity` variable on native platforms.

```javascript
module.exports = {
  /* ...  */
  corePlugins: {
    backgroundOpacity: true,
  },
};
```

--------------------------------

### NativeWind Width Class Compatibility

Source: https://www.nativewind.dev/docs/tailwind/sizing/width

This section details the compatibility of various Tailwind CSS width classes when used with NativeWind. It specifies whether a class has full support, partial support, experimental support, or is only available on the web.

```markdown
Class| Support  
---|---
```
w-{n}
```
| ✅ Full Support  
```
w-[n]
```
| ✅ Full Support  
```
w-full
```
| ✅ Full Support  
```
w-screen
```
| ✅ Full Support  
```
w-auto
```
| 🌐 Web only  
```
w-min
```
| 🌐 Web only  
```
w-max
```
| 🌐 Web only  
```
w-fit
```
| 🌐 Web only  
```

--------------------------------

### Outline Color Class Compatibility (Web)

Source: https://www.nativewind.dev/docs/tailwind/borders/outline-color

This snippet shows the compatibility of various outline color utility classes in NativeWind specifically for web environments. It lists classes like outline-inherit, outline-current, outline-transparent, outline-black, outline-white, and the theme/arbitrary value variants.

```markdown
Class| Support  
---|---  
```
outline-inherit
```
| 🌐 Web only  
```
outline-current
```
| 🌐 Web only  
```
outline-transparent
```
| 🌐 Web only  
```
outline-black
```
| 🌐 Web only  
```
outline-white
```
| 🌐 Web only  
```
outline-{n}
```
| 🌐 Web only  
```
outline-[n]
```
| 🌐 Web only  
```

--------------------------------

### NativeWind Content-None Class Compatibility (Web Only)

Source: https://www.nativewind.dev/docs/tailwind/typography/content

This snippet demonstrates the 'content-none' class in NativeWind. It is explicitly supported only on the web platform. No specific inputs or outputs are defined for this class, but its usage implies disabling default content processing for specific elements.

```markdown
content-none
```

--------------------------------

### NativeWind Max-Height Compatibility

Source: https://www.nativewind.dev/docs/tailwind/sizing/max-height

This section details the compatibility of various Tailwind CSS max-height classes within the NativeWind framework. It clarifies which classes are fully supported, partially supported, or web-only.

```markdown
Class| Support  
---|---  
```
max-h-0
```
| ✅ Full Support  
```
max-h-[n]
```
| ✅ Full Support  
```
max-h-{n}
```
| ✅ Full Support  
```
max-h-full
```
| ✅ Full Support  
```
max-h-screen
```
| ✅ Full Support  
```
max-h-min
```
| 🌐 Web only  
```
max-h-max
```
| 🌐 Web only  
```
max-h-fit
```
| 🌐 Web only  

Legend
### Class
`-{n}` Supports values from theme
`-[n]` Supports arbitrary values
### Icon
✅ Full support
✔️ Partial support on native
🧪 Experimental support on native
📱 Native only
🌐 Web only
```

--------------------------------

### Web CSS for Safe Area Insets

Source: https://www.nativewind.dev/docs/tailwind/new-concepts/safe-area-insets

This code demonstrates CSS styling for web applications to handle safe area insets using the `env()` function. It sets `height: -webkit-fill-available` on `html`, `body`, and `#root` elements to ensure proper rendering, especially for utilities like `h-screen-safe` and `min-h-screen-safe` in Chrome.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
 
@layer base {
  html {
    height: -webkit-fill-available;
  }
 
  body {
    height: -webkit-fill-available;
  }
 
  #root {
    height: -webkit-fill-available;
  }
}
```

--------------------------------

### Use platformSelect for Platform-Specific Theme Values

Source: https://www.nativewind.dev/docs/customization/theme

The `platformSelect` helper allows you to define theme values that differ based on the operating system (iOS, Android, web, etc.). It's analogous to React Native's `Platform.select`.

```javascript
const { platformSelect } = require("nativewind/theme");

module.exports = {
  theme: {
    extend: {
      colors: {
        error: platformSelect({
          ios: "red",
          android: "blue",
          default: "green",
        }),
      },
    },
  },
};
```

--------------------------------

### Scale Text with Screen Width using CSS Variables

Source: https://www.nativewind.dev/docs/tailwind/typography/font-size

Applies CSS variables and media queries in `global.css` to dynamically adjust font sizes based on screen width. This approach is necessary because NativeWind does not support media queries on `:root` directly.

```css
@media (min-width: 640px) {
  .text-root {
    --font-size-dynamic: 16px;
  }
}
 
@media (min-width: 768px) {
  .text-root {
    --font-size-dynamic: 18px;
  }
}
```

--------------------------------

### Use hairlineWidth for Thin Borders

Source: https://www.nativewind.dev/docs/customization/theme

The `hairlineWidth` helper provides the equivalent of `StyleSheet.hairlineWidth`, useful for defining very thin borders in your theme.

```javascript
const { hairlineWidth } = require("nativewind/theme");

module.exports = {
  theme: {
    extend: {
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
};
```

--------------------------------

### TypeScript Global Type Declarations for NativeWind

Source: https://www.nativewind.dev/docs/guides/third-party-components

Shows how to extend third-party component types globally using TypeScript declaration files to support custom classNames added via NativeWind.

```typescript
declare module "<3rd party package>" {
  interface 3rdPartyComponentProps {
    customClassName?: string;
  }
}

// Example for React Native components
import {
  ScrollViewProps,
  ScrollViewPropsAndroid,
  ScrollViewPropsIOS,
  Touchable,
  VirtualizedListProps,
} from "react-native";

declare module "@react-native/virtualized-lists" {
  export interface VirtualizedListWithoutRenderItemProps<ItemT>
    extends ScrollViewProps {
    ListFooterComponentClassName?: string;
    ListHeaderComponentClassName?: string;
  }
}

declare module "react-native" {
  interface ScrollViewProps
    extends ViewProps,
      ScrollViewPropsIOS,
      ScrollViewPropsAndroid,
      Touchable {
    contentContainerClassName?: string;
    indicatorClassName?: string;
  }
  interface FlatListProps<ItemT> extends VirtualizedListProps<ItemT> {
    columnWrapperClassName?: string;
  }
  interface ViewProps {
    className?: string;
  }
}
```

--------------------------------

### Enable CSS Interop for Style Attribute Props

Source: https://www.nativewind.dev/docs/guides/third-party-components

Explains the use of the `cssInterop` function to enable Nativewind's styling for components that rely on specific style attribute props (like `backgroundColor`) or access the `style` prop directly. `cssInterop` acts as a marker for Nativewind to convert `className` props into the necessary style objects. Be aware that enabling `cssInterop` may incur a performance cost.

```javascript
/*
 * This component will not work as expected with Nativewind
 *   - borderColor will not work as it is a prop
 *   - backgroundColor will not work as it is based on the style.color value
 */
function ThirdPartyComponent({"borderColor", "style", ...props}) {
  // The background color is based on the style prop
  const backgroundColor = style.color === "white" ? "black" : "white";
  return (
    <View
      style={{
        ...style,
        borderColor,
        backgroundColor,
      }}
    />
  );
}

// To support these components, you can use the `cssInterop` function.
// cssInterop(ThirdPartyComponent);

// CAUTION
// Enabling the `cssInterop` for a component comes at a performance cost. Nativewind will need to resolve the styles, add event handlers, inject context, etc.
```

--------------------------------

### Using env() for Safe Area Insets in Nativewind

Source: https://www.nativewind.dev/docs/core-concepts/functions-and-directives

Shows how to use the CSS env() function in Nativewind to access device-specific environment information, specifically for safe area insets like top, bottom, left, and right.

```css
env(safe-area-inset-top);
env(safe-area-inset-bottom);
env(safe-area-inset-left);
env(safe-area-inset-right);

```

--------------------------------

### Redirect Nativewind Debug Output to File

Source: https://www.nativewind.dev/docs/getting-started/troubleshooting

Command to capture Nativewind debug output into a log file. This is useful for recording terminal output when reporting issues.

```bash
DEBUG=nativewind script output.log <start-command>
```

--------------------------------

### Use pixelRatioSelect for Conditional Pixel Ratio Styling

Source: https://www.nativewind.dev/docs/customization/theme

Similar to `Platform.select`, `pixelRatioSelect` allows conditional styling based on the device's pixel ratio. You can provide specific values for different ratios or a default.

```javascript
const { pixelRatio, hairlineWidth } = require("nativewind/theme");

module.exports = {
  theme: {
    extend: {
      borderWidth: pixelRatioSelect({
        2: 1,
        default: hairlineWidth(),
      }),
    },
  },
};
```

--------------------------------

### fontScaleSelect() Utility

Source: https://www.nativewind.dev/docs/guides/themes

A helper function similar to `Platform.select` for conditionally applying styles based on the user's font scale settings.

```APIDOC
## fontScaleSelect()

### Description
A helper function to use `PixelRatio.getFontScale()` in a conditional statement, similar to `Platform.select`.

### Method
Utility Function

### Endpoint
N/A (Used within `tailwind.config.js`)

### Parameters
*   **options** (object) - Required - An object where keys represent font scale thresholds or 'default', and values are the corresponding styles or values.
    *   **key** (number | 'default') - The font scale threshold or the default value.
    *   **value** (any) - The style or value to apply for the given font scale.

### Request Example
```javascript
const { fontScaleSelect, hairlineWidth } = require("nativewind/theme");

module.exports = {
  theme: {
    extend: {
      fontSize: {
        custom: fontScaleSelect({
          2: 14,
          default: 16,
        }),
      },
    },
  },
};
```

### Response
*   **selectedStyle** (any) - The style or value selected based on the current user's font scale.
```

--------------------------------

### NativeWind Border Color Compatibility Classes

Source: https://www.nativewind.dev/docs/tailwind/borders/border-color

Lists supported border color classes in NativeWind, indicating full or web-only support. The `border-opacity` plugin is disabled by default for performance but can be enabled in `tailwind.config.js`.

```plaintext
border-{n}
border-[n]
border-inherit
border-current
```

--------------------------------

### Customize Platform Colors in tailwind.config.js

Source: https://www.nativewind.dev/docs/customization/colors

Demonstrates how to configure custom platform-specific colors in the `tailwind.config.js` file using NativeWind's `platformSelect` and `platformColor` utilities. This allows defining distinct colors for iOS and Android, with a fallback for other platforms.

```javascript
// tailwind.config.js

const { platformSelect, platformColor } = require("nativewind/theme");

module.exports = {
  theme: {
    extend: {
      colors: {
        error: platformSelect({
          // Now you can provide platform specific values
          ios: platformColor("systemRed"),
          android: platformColor("?android:colorError"),
          default: "red",
        }),
      },
    },
  },
};
```

--------------------------------

### Enable NativeWind Border Opacity

Source: https://www.nativewind.dev/docs/tailwind/borders/border-color

Configuration to enable the `borderOpacity` core plugin in NativeWind. This allows dynamic opacity changes via CSS variables, which is disabled by default for performance reasons.

```javascript
module.exports = {
  /* ... */
  corePlugin: {
    borderOpacity: true,
  },
};
```

--------------------------------

### Use roundToNearestPixel for Pixel Rounding

Source: https://www.nativewind.dev/docs/customization/theme

The `roundToNearestPixel` helper functions identically to `PixelRatio.roundToNearestPixel`, rounding pixel values to the nearest whole number.

```javascript
const { roundToNearestPixel } = require("nativewind/theme");

module.exports = {
  theme: {
    extend: {
      size: {
        custom: roundToNearestPixel(8.4)
      },
    },
  },
};
```

--------------------------------

### Ring Offset Color Classes (Web Only)

Source: https://www.nativewind.dev/docs/tailwind/borders/ring-offset-color

This snippet lists the available Ring Offset Color classes supported by NativeWind, specifically for web-only environments. These classes control the offset color of a ring element.

```html
ring-offset-0
ring-offset-1
ring-offset-2
ring-offset-4
ring-offset-8
```

--------------------------------

### Line Clamp Class Compatibility (Tailwind CSS)

Source: https://www.nativewind.dev/docs/tailwind/typography/line-clamp

This snippet details the compatibility of various line-clamp utility classes with NativeWind. It indicates whether full support is available for each class, aligning with Tailwind CSS functionality.

```markdown
Class| Support  
---|---
```
line-clamp-1
```
| ✅ Full Support  
```
line-clamp-2
```
| ✅ Full Support  
```
line-clamp-3
```
| ✅ Full Support  
```
line-clamp-4
```
| ✅ Full Support  
```
line-clamp-5
```
| ✅ Full Support  
```
line-clamp-6
```
| ✅ Full Support  
```
line-clamp-none
```
| ✅ Full Support  

Legend
### Class
`-{n}` Supports values from theme
`-[n]` Supports arbitrary values
### Icon
✅ Full support
✔️ Partial support on native
🧪 Experimental support on native
📱 Native only
🌐 Web only
```

--------------------------------

### Convert Layout Size to Pixel Size using getPixelSizeForLayoutSize()

Source: https://www.nativewind.dev/docs/guides/themes

The `getPixelSizeForLayoutSize()` function is an equivalent of `PixelRatio.getPixelSizeForLayoutSize()`, converting a layout size (in density-independent pixels) to the actual pixel size based on the device's pixel ratio. It's useful for defining sizes that scale appropriately with screen density.

```javascript
const { getPixelSizeForLayoutSize } = require("nativewind/theme");

module.exports = {
  theme: {
    extend: {
      size: {
        custom: getPixelSizeForLayoutSize(2),
      },
    },
  },
};
```

--------------------------------

### Use platformColor with platformSelect for Dynamic Colors

Source: https://www.nativewind.dev/docs/customization/theme

The `platformColor` function, often used with `platformSelect`, allows you to reference platform-specific color definitions, similar to React Native's `PlatformColor`.

```javascript
const { platformColor } = require("nativewind/theme");

module.exports = {
  theme: {
    extend: {
      colors: {
        platformRed: platformSelect({
          android: platformColor("systemRed"),
          web: "red",
        }),
      },
    },
  },
};
```

--------------------------------

### Enabling Text Opacity in NativeWind

Source: https://www.nativewind.dev/docs/tailwind/typography/text-color

This code snippet shows how to enable the `textOpacity` core plugin in NativeWind by modifying the `tailwind.config.js` file. This allows for dynamic text opacity, which is disabled by default for performance reasons.

```javascript
module.exports = {
  /* ...  */
  corePlugin: {
    textOpacity: true,
  },
};
```

--------------------------------

### Use getPixelSizeForLayoutSize for Pixel Conversion

Source: https://www.nativewind.dev/docs/customization/theme

The `getPixelSizeForLayoutSize` helper is a direct equivalent of React Native's `PixelRatio.getPixelSizeForLayoutSize`, converting layout size to pixel size.

```javascript
const { getPixelSizeForLayoutSize } = require("nativewind");

module.exports = {
  theme: {
    extend: {
      size: {
        custom: getPixelSizeForLayoutSize(2),
      },
    },
  },
};
```

--------------------------------

### getPixelSizeForLayoutSize() Utility

Source: https://www.nativewind.dev/docs/guides/themes

Equivalent of React Native's PixelRatio.getPixelSizeForLayoutSize(). Converts layout size to pixel size.

```APIDOC
## getPixelSizeForLayoutSize()

### Description
Equivalent of `PixelRatio.getPixelSizeForLayoutSize()`.

### Method
Utility Function

### Endpoint
N/A (Used within `tailwind.config.js`)

### Parameters
*   **layoutSize** (number) - Required - The layout size to convert.

### Request Example
```javascript
const { getPixelSizeForLayoutSize } = require("nativewind/theme");

module.exports = {
  theme: {
    extend: {
      size: {
        custom: getPixelSizeForLayoutSize(2),
      },
    },
  },
};
```

### Response
*   **pixelSize** (number) - The converted pixel size.
```

--------------------------------

### Remap Props with Tailwind CSS ClassNames (JavaScript)

Source: https://www.nativewind.dev/docs/api/remap-props

Demonstrates how to use Nativewind's remapProps utility to create a new component that accepts Tailwind CSS classNames for its style props. This is useful for integrating third-party components that have distinct style props for different parts of the component, such as button and label styles.

```javascript
import { remapProps } from "nativewind";

/**
  ThirdPartyButton is a component with two "style" props, buttonStyle & labelStyle.
  We can use remapProps to create new props that accept Tailwind CSS's classNames.
 */
const CustomizedButton = remapProps(ThirdPartyButton, {
  buttonClass: "buttonStyle",
  labelClass: "labelStyle",
});

<CustomizedButton buttonClass="bg-blue-500" labelClass="text-white" />;
```

--------------------------------

### Create a Nativewind Component with Default Styles (React Native)

Source: https://www.nativewind.dev/docs/guides/custom-components

This snippet demonstrates how to create a custom Nativewind component that accepts and merges className props with predefined default styles. It's useful for establishing consistent styling across multiple instances of a component.

```javascript
function MyComponent({ className }) {
  const defaultStyles = "text-black dark:text-white";
  return <Text className={`${defaultStyles} ${className}`} />;
}

<MyComponent className="font-bold" />;
```

--------------------------------

### NativeWind Border Radius Compatibility Table

Source: https://www.nativewind.dev/docs/tailwind/borders/border-radius

This table shows the compatibility of various Tailwind CSS border radius classes with NativeWind. It indicates full support, partial support, experimental support, or web-only availability for each class.

```markdown
Class| Support  
---|---  
```
rounded-none
```
| ✅ Full Support  
```
rounded
```
| ✅ Full Support  
```
rounded-{n}
```
| ✅ Full Support  
```
rounded-[n]
```
| ✅ Full Support  
```
rounded-full
```
| ✅ Full Support  
```
rounded-t-none
```
| ✅ Full Support  
```
rounded-t-{n}
```
| ✅ Full Support  
```
rounded-t-[n]
```
| ✅ Full Support  
```
rounded-t-full
```
| ✅ Full Support  
```
rounded-r-none
```
| ✅ Full Support  
```
rounded-r-{n}
```
| ✅ Full Support  
```
rounded-r-[n]
```
| ✅ Full Support  
```
rounded-r-full
```
| ✅ Full Support  
```
rounded-b-none
```
| ✅ Full Support  
```
rounded-b-{n}
```
| ✅ Full Support  
```
rounded-b-[n]
```
| ✅ Full Support  
```
rounded-b-full
```
| ✅ Full Support  
```
rounded-l-none
```
| ✅ Full Support  
```
rounded-l-{n}
```
| ✅ Full Support  
```
rounded-l-[n]
```
| ✅ Full Support  
```
rounded-l-full
```
| ✅ Full Support  
```
rounded-tl-none
```
| ✅ Full Support  
```
rounded-tl-{n}
```
| ✅ Full Support  
```
rounded-tl-[n]
```
| ✅ Full Support  
```
rounded-tl-full
```
| ✅ Full Support  
```
rounded-tr-none
```
| ✅ Full Support  
```
rounded-tr-{n}
```
| ✅ Full Support  
```
rounded-tr-[n]
```
| ✅ Full Support  
```
rounded-tr-full
```
| ✅ Full Support  
```
rounded-br-none
```
| ✅ Full Support  
```
rounded-br-{n}
```
| ✅ Full Support  
```
rounded-br-[n]
```
| ✅ Full Support  
```
rounded-br-full
```
| ✅ Full Support  
```
rounded-bl-none
```
| ✅ Full Support  
```
rounded-bl-{n}
```
| ✅ Full Support  
```
rounded-bl-[n]
```
| ✅ Full Support  
```
rounded-bl-full
```
| ✅ Full Support  
```
border-inherit
```
| 🌐 Web only  
```
border-current
```
| 🌐 Web only  
```

--------------------------------

### fontScale() Utility

Source: https://www.nativewind.dev/docs/guides/themes

Equivalent of React Native's PixelRatio.getFontScale(). Used to scale values based on the user's font size preference.

```APIDOC
## fontScale()

### Description
Equivalent of `PixelRatio.getFontScale()`. If a number is provided it returns `PixelRatio.getFontScale() * <value>`, otherwise it returns the `PixelRatio.getFontScale()` value.

### Method
Utility Function

### Endpoint
N/A (Used within `tailwind.config.js`)

### Parameters
*   **value** (number) - Optional - The value to multiply with the device's font scale.

### Request Example
```javascript
const { fontScale } = require("nativewind/theme");

module.exports = {
  theme: {
    extend: {
      fontSize: {
        custom: fontScale(2),
      },
    },
  },
};
```

### Response
*   **scaledValue** (number) - The calculated font scale or scaled value.
```

--------------------------------

### List Style Position Compatibility

Source: https://www.nativewind.dev/docs/tailwind/typography/list-style-position

Demonstrates the compatibility of NativeWind with Tailwind CSS list style position classes. Supports 'list-inside' and 'list-outside' with full support on native platforms.

```markdown
Class| Support  
---|---  
```
list-inside
```
| ✅ Full Support  
```
list-outside
```
| ✅ Full Support  

Legend

### Class
`-{n}` Supports values from theme
`-[n]` Supports arbitrary values

### Icon
✅ Full support
✔️ Partial support on native
🧪 Experimental support on native
📱 Native only
🌐 Web only
```

--------------------------------

### Implement Dynamic Text Scaling in React Native

Source: https://www.nativewind.dev/docs/tailwind/typography/font-size

Renders text that scales dynamically with screen width in a React Native application using the `text-root` class and CSS variables defined in `global.css`. This requires the `text-[--font-size-dynamic]` class to apply the scaling.

```javascript
export default App() {
  return (
    <Text className="text-root">
      <Text className="text-[--font-size-dynamic]">I scale with screen width</Text>
    </Text>
  )
}
```

--------------------------------

### useColorScheme Hook

Source: https://www.nativewind.dev/docs/api/use-color-scheme

The useColorScheme hook allows you to access the current color scheme of the device and provides functions to override or toggle it.

```APIDOC
## useColorScheme Hook

### Description
Provides access to the device's color scheme and allows for manual control over it.

### Method
JavaScript Hook

### Endpoint
N/A (Client-side hook)

### Parameters
#### Path Parameters
N/A

#### Query Parameters
N/A

#### Request Body
N/A

### Request Example
```javascript
import { useColorScheme } from "nativewind";
import { Text } from "react-native";
 
function MyComponent() {
  const { colorScheme, setColorScheme } = useColorScheme();
 
  return (
    <Text
      onPress={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}
    >
      {`The color scheme is ${colorScheme}`}
    </Text>
  );
}
```

### Response
#### Success Response (Hook Return Value)
- **colorScheme** (string) - The current device color scheme ('light', 'dark', or 'system').
- **setColorScheme** (function) - Overrides the current color scheme. Accepts 'light', 'dark', or 'system'.
- **toggleColorScheme** (function) - Toggles the color scheme between 'light' and 'dark'.

#### Response Example
```json
{
  "colorScheme": "light",
  "setColorScheme": "function",
  "toggleColorScheme": "function"
}
```

### Additional Notes
Manual color scheme changes can also be performed using `NativeWindStyleSheet.setColorScheme(colorScheme)`.
```

--------------------------------

### Remap className Props for Multiple Style Props

Source: https://www.nativewind.dev/docs/guides/third-party-components

Illustrates how to use the `remapProps` function to map custom `className` props to existing style props on a component, such as `style` and `contentContainerStyle` for `FlatList`. This allows Nativewind to manage styles for components with multiple distinct styling targets. Call `remapProps` once at your app's entry point.

```javascript
// This component has two 'style' props
function ThirdPartyComponent({"style", "contentContainerStyle", ...props}) {
  return (
    <FlatList
      style={"style"}
      contentContainerStyle={"contentContainerStyle"}
      {...props}
    />
  );
}

// Call this once at the entry point of your app
remapProps(ThirdPartyComponent, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
});

// Now you can use the component with Nativewind
<ThirdPartyComponent className="p-5" contentContainerClassName="p-2" />;
```

--------------------------------

### Box Content Utility (Web Only)

Source: https://www.nativewind.dev/docs/tailwind/layout/box-sizing

The `box-content` utility sets the CSS box-sizing property to content-box. This is supported only on web platforms within NativeWind.

```html
<div class="box-content">...</div>
```

--------------------------------

### Remapping Props for Complex Components in Nativewind

Source: https://www.nativewind.dev/docs/index

Illustrates how Nativewind can remap `className` props to specific style props for complex components like FlatList. This allows components that don't natively support `className` to be styled with Tailwind CSS.

```javascript
remapProps(FlatList, {
  className: "style",
  ListFooterComponentClassName: "ListFooterComponentStyle",
  ListHeaderComponentClassName: "ListHeaderComponentStyle",
  columnWrapperClassName: "columnWrapperStyle",
  contentContainerClassName: "contentContainerStyle",
});

<FlatList
  {...}
  className="bg-black"
  ListHeaderComponentClassName="bg-black text-white"
  ListFooterComponentClassName="bg-black text-white"
  columnWrapperClassName="bg-black"
  contentContainerClassName="bg-black"
  indicatorClassName="bg-black"
/>
```

--------------------------------

### Integrate Third-Party Components with Nativewind

Source: https://www.nativewind.dev/docs/index

Shows how Nativewind's JSX transform allows direct use of Tailwind CSS classNames on third-party React components without custom wrappers. It takes a CustomText component and applies bold styling using `className='text-bold'`.

```javascript
import { CustomText } from "third-party-text-component";

export function BoldText(props) {
  // You just need to write `className="<your styles>"`
  return <CustomText className="text-bold" {...props} />;
}
```

--------------------------------

### Using var() for Custom Colors in Nativewind

Source: https://www.nativewind.dev/docs/core-concepts/functions-and-directives

Demonstrates how to use the CSS var() function to define and apply custom colors in Nativewind. This involves setting a custom property in tailwind.config.js and then using it within React Native components via className or the vars helper function.

```javascript
module.exports = {
  theme: {
    extend: {
      color: {
        custom: "var(--my-custom-color)",
      },
    },
  },
};

```

```javascript
// style: { color: "red" }
<Text className="text-custom [--my-custom-color:red]">

// style: { color: "green" }
<View style={vars({ "--my-custom-color": "green" })}>
  <Text className="text-custom">
</View>

```

--------------------------------

### Use fontScale for Font Scaling

Source: https://www.nativewind.dev/docs/customization/theme

The `fontScale` helper utilizes `PixelRatio.getFontScale()` to adjust font sizes. It can either return the raw font scale value or multiply it by a provided number.

```javascript
const { fontScale } = require("nativewind/theme");

module.exports = {
  theme: {
    extend: {
      fontSize: {
        custom: fontScale(2),
      },
    },
  },
};
```

--------------------------------

### Box Border Utility (Web Only)

Source: https://www.nativewind.dev/docs/tailwind/layout/box-sizing

The `box-border` utility sets the CSS box-sizing property to border-box. This is supported only on web platforms within NativeWind.

```html
<div class="box-border">...</div>
```

--------------------------------

### Handle Multiple Style Props in Nativewind Component (React Native)

Source: https://www.nativewind.dev/docs/guides/custom-components

This snippet shows how a custom component can accept and apply class names to different internal elements using distinct props, such as `className` for the container and `textClassName` for the text element.

```javascript
function MyComponent({ className, textClassName }) {
  return (
    <View className={className}>
      <Text className={textClassName}>Hello, Nativewind!</Text>
    </View>
  );
}
```

--------------------------------

### Dynamic Mapping Modifier for Prop Remapping

Source: https://www.nativewind.dev/docs/guides/third-party-components

Explains the dynamic mapping modifier in `cssInterop` which allows props to be moved or remapped. This is useful for consolidating styles into a single prop or for nested property access.

```javascript
import { cssInterop } from 'nativewind';
import { View } from 'react-native';

// Example of moving a prop value to a nested property
// cssInterop(SomeComponent, {
//   className: 'style'
// });

// Example usage within a component
function ExampleComponent(props) {
  // The className prop will be processed by cssInterop
  return <View {...props} />;
}

// Usage with dynamic mapping for nested properties
cssInterop(ExampleComponent, {
  className: 'style',
});

function DynamicMappingExample() {
  // This className will map to nested properties using the dynamic modifier
  const style = cva("{}-[screenOptions.tabBarTintColor]:color-red-500");

  return <ExampleComponent className={style} />;
}

// The output for the above className would effectively be:
// { screenOptions: { tabBarTintColor: 'color-red-500' } }
```

--------------------------------

### Use fontScaleSelect for Conditional Font Scaling

Source: https://www.nativewind.dev/docs/customization/theme

Similar to `Platform.select`, `fontScaleSelect` enables conditional font sizing based on the user's font scale settings. It accepts specific values for different scales or a default.

```javascript
const { fontScaleSelect, hairlineWidth } = require("nativewind/theme");

module.exports = {
  theme: {
    extend: {
      fontSize: {
        custom: fontScaleSelect({
          2: 14,
          default: 16,
        }),
      },
    },
  },
};
```

--------------------------------

### Configure Dynamic Font Size in Tailwind CSS

Source: https://www.nativewind.dev/docs/tailwind/typography/font-size

Defines a CSS variable for dynamic font sizing within the Tailwind CSS theme configuration. This allows for flexible text scaling based on external factors like screen width.

```javascript
module.exports = {
  theme: {
    extend: {
      fontSize: {
        dynamic: "var(--font-size-dynamic)",
      },
    },
  },
};
```

--------------------------------

### Applying !important modifier for consistent styling in Nativewind

Source: https://www.nativewind.dev/docs/core-concepts/style-specificity

Shows how to use the '!important' modifier in Nativewind classNames to override inline styles and ensure consistent styling across different platforms. This is useful for resolving styling discrepancies where default specificity rules might lead to unexpected results.

```javascript
// Basic components
<Text className="text-red-500" style={{ color: 'green' }} /> // green text
<Text className="!text-red-500" style={{ color: 'green' }} /> // red text

// Remapped components (reusing the initial problem example)
<MyText className="text-red-500" /> // Native: red, Web: black
<MyText className="!text-red-500" /> // Both platforms: red
```

--------------------------------

### Use useColorScheme Hook in React Native

Source: https://www.nativewind.dev/docs/api/use-color-scheme

Demonstrates how to use the useColorScheme hook to display the current color scheme and toggle it using a Text component. This hook provides the current 'colorScheme' and a 'setColorScheme' function to update it.

```javascript
import { useColorScheme } from "nativewind";
import { Text } from "react-native";

function MyComponent() {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <Text
      onPress={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}
    >
      {`The color scheme is ${colorScheme}`}
    </Text>
  );
}

```

--------------------------------

### Enable Divide Opacity Core Plugin

Source: https://www.nativewind.dev/docs/tailwind/borders/divide-color

This code snippet shows how to enable the 'divideOpacity' core plugin in your NativeWind project's tailwind.config.js file. This allows the divide color to dynamically change its opacity, which is disabled by default for performance reasons. You need to add this to your existing configuration.

```javascript
module.exports = {
  /* ...  */
  corePlugin: {
    divideOpacity: true,
  },
};
```

--------------------------------

### Nativewind CSS Interop with react-native-svg

Source: https://www.nativewind.dev/docs/index

Shows how to use Nativewind's `cssInterop` to bridge `className` props with style attributes for components like react-native-svg's Svg and Circle. This enables styling SVG elements using Tailwind classes.

```javascript
import { Text } from "react-native";
import { cssInterop } from "nativewind";
import { Svg, Circle } from "react-native-svg";

/**
 * Svg uses `height`/`width` props on native and className on web
 */
const StyledSVG = cssInterop(Svg, {
  className: {
    target: "style",
    nativeStyleToProp: {
      height: true,
      width: true,
    },
  },
});
/**
 * Circle uses `fill`/`stroke`/`strokeWidth` props on native and className on web
 */
const StyledCircle = cssInterop(Circle, {
  className: {
    target: "style",
    nativeStyleToProp: {
      fill: true,
      stroke: true,
      strokeWidth: true,
    },
  },
});

export function BoldText(props) {
  return (
    <Svg className="w-1/2 h-1/2" viewBox="0 0 100 100">
      <StyledCircle
        className="fill-green-500 stroke-blue-500 stroke-2"
        cx="50"
        cy="50"
        r="45"
      />
    </Svg>
  );
}
```

--------------------------------

### Handle className to style prop remapping in React Native

Source: https://www.nativewind.dev/docs/core-concepts/style-specificity

Demonstrates how Nativewind remaps 'className' prop to the 'style' prop for React Native components. This allows using Tailwind CSS classes like 'text-red-500' which are translated to inline styles. The 'remapProps' function is used to configure this remapping.

```javascript
function MyText({ style }) {
  return <Text {...props} style={[{ color: 'black' }, style]} />;
}

remapProps(MyText, { className: 'style' })

<MyText style={{ color: 'red' }}>The text will be red on all platforms</MyText>
<MyText className="text-red-500">What color should I render as?</MyText>
```

--------------------------------

### roundToNearestPixel() Utility

Source: https://www.nativewind.dev/docs/guides/themes

Equivalent of React Native's PixelRatio.roundToNearestPixel(). Rounds a given value to the nearest whole pixel.

```APIDOC
## roundToNearestPixel()

### Description
Equivalent of `PixelRatio.roundToNearestPixel()`.

### Method
Utility Function

### Endpoint
N/A (Used within `tailwind.config.js`)

### Parameters
*   **value** (number) - Required - The value to round.

### Request Example
```javascript
const { roundToNearestPixel } = require("nativewind/theme");

module.exports = {
  theme: {
    extend: {
      size: {
        custom: roundToNearestPixel(8.4)
      },
    },
  },
};
```

### Response
*   **roundedValue** (number) - The value rounded to the nearest pixel.
```

--------------------------------

### Accessing Default Tailwind CSS Colors in NativeWind

Source: https://www.nativewind.dev/docs/guides/themes

This snippet shows how to access the default color palette provided by Tailwind CSS at runtime within a NativeWind application. It imports the `colors` object from `tailwindcss/colors` and uses it to set the color of an `ActivityIndicator` component.

```javascript
import colors from "tailwindcss/colors";

export function MyActivityIndicator(props) {
  return <ActivityIndicator size="small" color={colors.blue.500} {...props} />;
}
```

--------------------------------

### Ensure Third-Party Components Pass Props

Source: https://www.nativewind.dev/docs/guides/third-party-components

Demonstrates how to modify a third-party component to correctly pass down all props, including `className`, to underlying views. Components that 'pick' props can limit functionality and prevent the use of new React Native APIs. Ensure your component spreads all props using `{...props}`.

```javascript
// ❌ This component will not work with Nativewind
// This component is 'picking' the props.
// Any props that are not explicitly defined will not be passed down
function ThirdPartyComponent({"style"}) {
  return <View style={"style"} />;
}

// ✅ This component will work with Nativewind
function ThirdPartyComponent({"style", ...props}) {
  return <View style={"style"} {...props} />;
}
```

--------------------------------

### Round to Nearest Pixel using roundToNearestPixel()

Source: https://www.nativewind.dev/docs/guides/themes

The `roundToNearestPixel()` function, mirroring `PixelRatio.roundToNearestPixel()`, rounds a given pixel value to the nearest whole pixel. This is essential for ensuring crisp rendering and avoiding sub-pixel issues on different displays.

```javascript
const { roundToNearestPixel } = require("nativewind/theme");

module.exports = {
  theme: {
    extend: {
      size: {
        custom: roundToNearestPixel(8.4)
      },
    },
  },
});
```

--------------------------------

### React Native Color Styling Issue

Source: https://www.nativewind.dev/docs/getting-started/troubleshooting

Illustrates a common issue where color classes applied to a View component do not work in React Native because `<View />` does not accept a `color` style. The solution is to apply color classes to the `<Text />` element instead.

```javascript
export function App() {
  return (
    <View className="text-red-500">
      <Text>Hello, World!</Text>
    </View>
  );
}
```

--------------------------------

### Style SVG Components with cssInterop and Stroke

Source: https://www.nativewind.dev/docs/tailwind/svg/stroke

This snippet demonstrates how to apply Tailwind CSS classes to SVG components in React Native using NativeWind's `cssInterop`. It covers enabling className support for Svg, Circle, and Rect components, allowing inline styling of stroke, fill, width, and height. This requires the `react-native-svg` library.

```javascript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import { cssInterop } from 'nativewind'

cssInterop(Svg, {
  className: {
    target: "style",
    nativeStyleToProp: { width: true, height: true }
  },
});
cssInterop(Circle, {
  className: {
    target: "style",
    nativeStyleToProp: { width: true, height: true, stroke: true, strokeWidth: true, fill: true }
  },
});
cssInterop(Rect, {
  className: {
    target: "style",
    nativeStyleToProp: { width: true, height: true, stroke: true, strokeWidth: true, fill: true }
  },
});

export function SvgExample () {
  return (
    <View className="inset-0 items-center content-center">
      <Svg className="h-1/2 w-1/2" viewBox="0 0 100 100" >
        <Circle cx="50" cy="50" r="45" className="stroke-blue-500 stroke-2 fill-green-500" />
        <Rect x="15" y="15" className="w-16 h-16 stroke-red-500 stroke-2 fill-yellow-500" />
      </Svg>
    </View>
  );
}
```

--------------------------------

### Define Base REM Value in Global CSS

Source: https://www.nativewind.dev/docs/tailwind/typography/font-size

Manually sets the base `font-size` to `16px` in `global.css` when NativeWind's `inlineRem` feature is disabled. This ensures consistent `rem` unit interpretation across the application.

```css
:root {
  font-size: 16px;
}
```

--------------------------------

### Configure Default Inlined REM Value in Metro

Source: https://www.nativewind.dev/docs/tailwind/typography/font-size

Sets the default `rem` value for inlining in NativeWind via `metro.config.js`. This configuration allows customization of the base `rem` unit used across the application, defaulting to `16px` when `inlineRem` is set.

```javascript
module.exports = withNativeWind({
  input: "./global.css"
  inlineRem: 16,
});
```

--------------------------------

### Disable REM Inlining in Metro Configuration

Source: https://www.nativewind.dev/docs/tailwind/typography/font-size

Disables the automatic inlining of `rem` values in NativeWind by setting `inlineRem` to `false` in `metro.config.js`. When disabled, developers must manually define the `rem` value in their CSS.

```javascript
module.exports = withNativeWind({
  inline: "./global.css"
  inlineRem: false,
});
```

=== COMPLETE CONTENT === This response contains all available snippets from this library. No additional content exists. Do not make further requests.
