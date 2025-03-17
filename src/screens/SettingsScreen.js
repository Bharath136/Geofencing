import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import tailwind from 'twrnc';

const SettingsScreen = () => {
  const [isNotificationEnabled, setNotificationEnabled] = useState(true);
  const [isGeofencingEnabled, setGeofencingEnabled] = useState(false);
  const [isDarkModeEnabled, setDarkModeEnabled] = useState(false);

  // Handlers to toggle the settings
  const handleNotificationToggle = () => setNotificationEnabled(previousState => !previousState);
  const handleGeofencingToggle = () => setGeofencingEnabled(previousState => !previousState);
  const handleDarkModeToggle = () => setDarkModeEnabled(previousState => !previousState);

  return (
    <View style={tailwind`flex-1 bg-blue-50`}>
      <Text style={tailwind`text-2xl font-bold text-blue-700 text-center pt-6`}>
        Settings
      </Text>

      <View style={tailwind`px-6 py-4`}>
        <View style={tailwind`mb-4`}>
          <Text style={tailwind`text-lg text-blue-800`}>Notifications</Text>
          <Switch
            value={isNotificationEnabled}
            onValueChange={handleNotificationToggle}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isNotificationEnabled ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>

        <View style={tailwind`mb-4`}>
          <Text style={tailwind`text-lg text-blue-800`}>Geofencing</Text>
          <Switch
            value={isGeofencingEnabled}
            onValueChange={handleGeofencingToggle}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isGeofencingEnabled ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>

        <View style={tailwind`mb-4`}>
          <Text style={tailwind`text-lg text-blue-800`}>Dark Mode</Text>
          <Switch
            value={isDarkModeEnabled}
            onValueChange={handleDarkModeToggle}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isDarkModeEnabled ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>

        <TouchableOpacity
          onPress={() => { }}
          style={tailwind`bg-yellow-500 py-3 px-6 rounded-lg mt-6`}
        >
          <Text style={tailwind`text-center text-white text-lg font-bold`}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settingItem: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SettingsScreen;
