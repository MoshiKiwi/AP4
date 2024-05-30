import React from 'react';
import { StyleSheet, View } from 'react-native';

const SkeletonCard = () => {
    return (
        <View style={styles.skeletonCard}>
            <View style={styles.skeletonImage} />
            <View style={styles.skeletonContent}>
                <View style={styles.skeletonLine} />
                <View style={styles.skeletonLine} />
                <View style={styles.skeletonLine} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    skeletonCard: {
        backgroundColor: '#f5f5f5', // Match card background color
        borderRadius: 5, // Match card border radius
        margin: 10, // Match card margin
        padding: 10, // Match card padding
        shadowColor: '#000', // Optional shadow for depth effect (optional)
        shadowOffset: { width: 0, height: 2 }, // Optional shadow (optional)
        shadowOpacity: 0.3, // Optional shadow (optional)
        shadowRadius: 2, // Optional shadow (optional)
        elevation: 1, // Match card elevation (optional)
    },
    skeletonImage: {
        width: '100%', // Match card image width
        height: 200, // Match card image height
        backgroundColor: '#e0e0e0', // Light gray for image placeholder
        borderRadius: 5, // Match card image border radius
        marginBottom: 10, // Add some spacing below the image
    },
    skeletonContent: {
        flex: 1, // Allow content to fill remaining space
    },
    skeletonLine: {
        backgroundColor: '#e0e0e0', // Match image placeholder color
        height: 10, // Adjust line height based on desired size
        borderRadius: 2, // Add some rounded corners to lines
        marginBottom: 5, // Add some spacing between lines
    },
});

export default SkeletonCard;

