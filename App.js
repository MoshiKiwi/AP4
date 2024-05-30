import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, RefreshControl, Image } from 'react-native';

import ProductCard from './ProductCard';
import SkeletonCard from './SkeletonCard';

function HomeScreen() {
    const [assets, setAssets] = React.useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const page = React.useRef(1);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://192.168.1.7/api/getproducts`);
            let data = await response.json();

            await Promise.all(data.map(async (item) => {
                const creatorResponse = await fetch(`http://192.168.1.7/api/getuser/${item.creatorID}`);
                const creatorData = await creatorResponse.json();

                item.creator = creatorData.name;
            }));

            const shuffledData = [...data].sort(() => Math.random() - 0.5);
            setAssets(shuffledData.slice(0, 10));
            page.current++;
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setRefreshing(false);
        }
    };

    React.useEffect(() => { fetchData() }, [refreshing])

    const handleRefresh = async () => {
        setRefreshing(true)
        setAssets([])
        await fetchData()
        setRefreshing(false)
    };

    return (
        <FlatList
            data={assets}
            renderItem={({ item }) => (
                <ProductCard
                    data={item}
                />
            )}

            keyExtractor={(item) => item.id}
            ListEmptyComponent={() => <View><SkeletonCard/><SkeletonCard/><SkeletonCard/></View> }
            refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={handleRefresh}/> }
        />
    );
}



function ManageScreen() {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Manage Screen</Text>
      </View>
  );
}

function ProfileScreen() {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Profile Screen</Text>
      </View>
  );
}

const Tab = createBottomTabNavigator();

const CustomHeader = ({ title, logoImage }) => {
    return (
        <View style={styles.headerContainer}>
            {logoImage && <Image source={logoImage} style={styles.logoImage} />}
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    );
};

function App() {
  return (
      <NavigationContainer>
          <Tab.Navigator
              screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                      let iconName;

                      if (route.name === 'Explorer') { iconName = focused ? 'compass' : 'compass-outline'
                      } else if (route.name === 'Gérer') { iconName = 'playlist-edit'
                      } else if (route.name === 'Profil') { iconName = focused ? 'account' : 'account-outline'
                      }

                      return (
                        <MaterialCommunityIcons name={iconName} size={size} color={color} />
                      )
              },
              tabBarActiveTintColor: 'blue',
              tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen
                name="Explorer"
                component={HomeScreen}
                options={{
                    header: () => (<CustomHeader title="Explorer" logoImage={require('./assets/logo.png')} />),
                }}
            />
            <Tab.Screen
                name="Gérer"
                component={ManageScreen}
                options={{
                    header: () => (<CustomHeader title="Gérer" logoImage={require('./assets/logo.png')} />),
                }}
            />
            <Tab.Screen
                name="Profil"
                component={ProfileScreen}
                options={{
                    header: () => (<CustomHeader title="Profil" logoImage={require('./assets/logo.png')} />),
                }}
            />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    exploreContainer: {
        flex: 1,
        padding: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingBottom: 10
    },
    logoImage: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    loadingText: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default App;
