import FontAwesome from '@expo/vector-icons/FontAwesome'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Tabs } from 'expo-router'

import { colors } from '~theme'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: colors.green[500] }}>
      <Tabs.Screen
        name="lists"
        options={{
          title: 'Lists',
          tabBarIcon: ({ color }) => (
            <Ionicons name="list-circle" size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 size={24} name="users" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={30} name="plus-circle" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="web"
        options={{
          title: 'Web',
          tabBarIcon: ({ color }) => (
            <Ionicons name="compass-sharp" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="cog" color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
