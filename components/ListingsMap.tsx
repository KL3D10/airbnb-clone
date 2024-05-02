import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapView from 'react-native-map-clustering'
import { defaultStyles } from '@/constants/Styles'
import { useRoute } from '@react-navigation/native'
import { useRouter } from 'expo-router'

interface Props {
    listings: any
}

const INITIAL_REGION = {
    latitude: 41.33,
    longitude: 19.82,
    latitudeDelta: 12,
    longitudeDelta: 12,
};

const ListingsMap = ({ listings }: Props) => {
    const router = useRouter()

    const onMarkerSelected = (item: ListingGeo) => {
        router.push(`/listing/${item.properties.id}`)
        console.log(item);
    }

    const renderCluster = (cluster: any) => {
        const { id, geometry, onPress, properties } = cluster;
        const points = properties.point_count;

        return (
            <Marker key={`cluster-${id}`}
                onPress={onPress}
                coordinate={{
                    longitude: geometry.coordinates[0],
                    latitude: geometry.coordinates[1]
                }}>
                <View style={styles.marker}>
                    <Text
                        style={{
                            color: '#000',
                            textAlign: 'center',
                            fontFamily: 'mon-sb',
                        }}>
                        {points}
                    </Text>
                </View>
            </Marker>
        )
    }

    return (
        <View style={defaultStyles.container}>
            <MapView
                animationEnabled={false}
                style={StyleSheet.absoluteFill}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                showsMyLocationButton
                initialRegion={INITIAL_REGION}
                clusterColor='#fff'
                clusterTextColor='#000'
                clusterFontFamily='mon-sb'
                renderCluster={renderCluster}
            >
                {listings.features.map((item: ListingGeo) => (
                    <Marker
                        key={item.properties.id}
                        onPress={() => onMarkerSelected(item)}
                        coordinate={{
                            latitude: +item.properties.latitude,
                            longitude: +item.properties.longitude
                        }}
                    >
                        <View style={styles.marker}>
                            <Text style={styles.markerText}>€ {item.properties.price}</Text>
                        </View>
                    </Marker>
                ))}
            </MapView>
        </View>
    )
}

export default ListingsMap

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    marker: {
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    markerText: {
        fontSize: 14,
        fontFamily: 'mon-sb',
    }
})