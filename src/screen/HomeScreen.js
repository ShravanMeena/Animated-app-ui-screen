import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
} from 'react-native';
const {width, height} = Dimensions.get('screen');
import faker from 'faker';
import axios from 'axios';

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
      'women',
      'men',
    ])}/${faker.random.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
const BG_IMG =
  'https://images.pexels.com/photos/6941845/pexels-photo-6941845.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

export default ({navigation}) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Image
        style={styles.backgroundImage}
        blurRadius={5}
        source={{
          uri: BG_IMG,
        }}
      />

      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            listener: (event) => {
              //do something here like Keyboard.dismiss() or this.props.onScroll(event)
            },
            useNativeDriver: true,
          },
        )}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 42,
        }}
        renderItem={({item, index}) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];

          const inputRangeForOpacity = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 0.6),
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
          });

          const opacity = scrollY.interpolate({
            inputRange: inputRangeForOpacity,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              style={{
                flexDirection: 'row',
                padding: SPACING,
                marginBottom: SPACING,
                backgroundColor: '#fff',
                borderRadius: 16,
                elevation: 4,
                opacity,
                transform: [{scale}],
              }}>
              <Image
                source={{uri: item.image}}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING / 2,
                }}
              />
              <TouchableOpacity
                onPress={() => navigation.navigate('DetailsScreen')}>
                <Text style={{fontSize: 22, fontWeight: '700'}}>
                  {item.name}
                </Text>
                <Text style={{fontSize: 14, opacity: 0.6, fontWeight: '700'}}>
                  {item.jobTitle}
                </Text>
                <Text style={{fontSize: 10, opacity: 0.2, fontWeight: '700'}}>
                  {item.email}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
});
