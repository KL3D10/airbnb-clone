import { View } from 'react-native'
import React, { useMemo, useState } from 'react'
import ExploreHeader from '@/components/ExploreHeader'
import { Stack } from 'expo-router';
import Listings from '@/components/Listings';
import listingsData from '@/assets/data/airbnb-listings.json'
import ListingsDataGeo from '@/assets/data/airbnb-listings.geo.json'
import ListingsMap from '@/components/ListingsMap';
import ListingsBottomSheet from '@/components/ListingsBottomSheet';

const Page = () => {
  const [category, setCategory] = useState('Tiny homes')
  const items = useMemo(() => listingsData as any, [])

  const onDataChanged = (category: string) => {
    setCategory(category)
  }

  return (
    <View style={{ flex: 1, marginTop: 130 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      {/* <Listings listings={items} category={category} /> */}
      <ListingsMap listings={ListingsDataGeo} />
      <ListingsBottomSheet listings={items} category={category} />
    </View>
  )
}

export default Page