import React from 'react';
import { View, Text } from 'react-native';

class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <View>
                    <Text>Something went wrong.</Text>
                </View>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;

