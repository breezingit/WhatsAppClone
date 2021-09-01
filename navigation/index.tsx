/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { View } from 'react-native';
import { ColorSchemeName, Pressable } from 'react-native';
import {Octicons,MaterialCommunityIcons} from '@expo/vector-icons'
import {createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { Fontisto } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import {MainTabParamList ,RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import { color } from 'react-native-reanimated';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        
        backgroundColor: Colors.light.tint,
        
      },
      headerTintColor: Colors.light.background,
      headerTitleAlign:'left',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }}>
      <Stack.Screen name="Root" 
        component={BottomTabNavigator} 
        options={{ 
          title:"WhatsApp",
          headerRight: ()=>(
            <View style={{
              flexDirection:'row', 
              width:60,
              justifyContent:'space-between',
              marginRight:10,
              }}>
              <Octicons name="search" size={22} color={'white'}/>
              <MaterialCommunityIcons name="dots-vertical" size={24} color={'white'}/>
            </View>
          )
         }} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="Modal" component={ModalScreen} />
        </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createMaterialTopTabNavigator<MainTabParamList >();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Chats"
  
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].background,
        tabBarStyle:{
          backgroundColor:Colors[colorScheme].tint,
        },
        tabBarIndicatorStyle:{
          backgroundColor:Colors[colorScheme].background,
          height:4, 
        },
        tabBarLabelStyle:{
          fontWeight:'bold',
        },
        tabBarShowIcon:true,
      }}>
      <BottomTab.Screen
        name="Camera"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          // title: 'Tab One',
          tabBarIcon: ({ color }) => <Fontisto name="camera" color={color} size={20} />,
          tabBarLabel:()=>null,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Chats"
        component={TabTwoScreen}
        
      />
      <BottomTab.Screen
        name="Status"
        component={TabTwoScreen}
        
      />
      <BottomTab.Screen
        name="Calls"
        component={TabTwoScreen}
      
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
