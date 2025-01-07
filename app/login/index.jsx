import React, { useEffect, useCallback } from 'react';
import { View, Image, Text, Pressable, StyleSheet } from 'react-native';
import Colors from './../../constants/Colors';
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';

export const useWarmUpBrowser = () => {
  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/home', { scheme: 'myapp' }),
      });

      if (createdSessionId) {
        console.log('Session created:', createdSessionId);
        setActive({ session: createdSessionId });
      } else {
        console.log('OAuth flow did not create a session.');
      }
    } catch (err) {
      console.error('OAuth error:', err);
    }
  }, [startOAuthFlow]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/adoptme.jpeg')} 
        style={styles.image} 
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Ready to make new friends?</Text>
        <Text style={styles.subtitle}>
          You can’t buy love, but you can rescue it.
        </Text>
      </View>
      <Pressable onPress={onPress} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  textContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'outfit-Bold',
    fontSize: 30,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'outfit',
    fontSize: 18,
    textAlign: 'center',
    color: Colors.GRAY,
  },
  button: {
    padding: 20,
    marginTop: 50,
    backgroundColor: Colors.PRIMARY,
    width: '80%',
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'outfit-Medium',
    fontSize: 20,
    color: '#fff',
  },
});
