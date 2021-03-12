import * as React from 'react';
import {
  StatusBar,
  Animated,
  Text,
  Image,
  View,
  StyleSheet,
  Dimensions,
  Button,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('screen');

// https://www.flaticon.com/packs/retro-wave
// inspiration: https://dribbble.com/shots/11164698-Onboarding-screens-animation
// https://twitter.com/mironcatalin/status/1321180191935373312

const bgs = ['#E8994D', '#C84D2B', '#FF63ED', '#4813A4'];
const DATA = [
  {
    key: '3571572',
    title: 'What does it feel like when I hug you?',
    description:
      "Don't worry if your child isn't initially excited about answering your questions—and",
    image: require('../assets/rocking-horse.png'),

    skip: false,
  },
  {
    key: '3571747',
    title: 'Did you smile or laugh extra today?',
    description:
      "don't rush her to answer or move on to another one too quickly",
    image: require('../assets/teddy-bear.png'),
    skip: false,
  },
  {
    key: '3571680',
    title: 'If you designed clothes, what would they look like?',
    description:
      "Letting your child take her time shows that you're genuinely interested in ",
    image: require('../assets/train.png'),
    skip: false,
  },
  {
    key: '3571603',
    title: 'What is a memory that makes you happy?',
    description: 'what she has to say, and not just robotically asking!!!',
    image: require('../assets/cradle.png'),
    skip: true,
  },
];

const Indicator = ({scrollX}) => {
  return (
    <View style={{position: 'absolute', bottom: 50, flexDirection: 'row'}}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 1, 0.6],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={`indicatr=${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: '#fff',
              opacity,
              margin: 10,
              transform: [
                {
                  scale,
                },
              ],
            }}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({scrollX}) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });
  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, {backgroundColor}]}></Animated.View>
  );
};

const Square = ({scrollX}) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1,
  );
  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['30deg', '-30deg', '30deg'],
  });

  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height - 80, 0],
  });
  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        backgroundColor: '#ffff',
        position: 'absolute',
        borderRadius: 10,
        top: -height * 0.62,
        left: -height * 0.32,
        transform: [
          {
            rotate,
          },
          {translateX},
        ],
      }}></Animated.View>
  );
};

export default function App({navigation}) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        horizontal
        pagingEnabled
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        renderItem={({item, index}) => {
          return (
            <View
              style={{width, alignItems: 'center', padding: 20}}
              key={index}>
              <View
                style={{
                  flex: 0.7,
                  // justifyContent: 'center',
                }}>
                <Image
                  source={item.image}
                  style={{
                    width: width / 2,
                    height: height / 2,
                    resizeMode: 'contain',
                  }}
                />
              </View>
              <View
                style={{
                  flex: 0.3,
                }}>
                <Text
                  style={{
                    fontSize: 28,
                    color: '#fff',
                    fontWeight: '700',
                    marginBottom: 20,
                  }}>
                  {item.title}
                </Text>
                <Text style={{fontSize: 14, color: '#fff', fontWeight: '300'}}>
                  {item.description}
                </Text>

                {item.skip ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('HomeScreen')}
                    style={{
                      marginTop: 120,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: bgs[1],
                      }}>
                      Skip
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX} />
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
