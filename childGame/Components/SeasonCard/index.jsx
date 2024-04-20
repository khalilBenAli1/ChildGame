import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SeasonCard = ({ title, numberOfChallenges, difficulty, completed, color, onClick ,disabled=false}) => {
    const completedBarColor = completed ? '#1BAA76' : 'white';
    const percentageText = completed ? '100%' : '0%';

    return (
        <TouchableOpacity onPress={onClick} style={styles.card} disabled={disabled}>
            <LinearGradient
                colors={['transparent', color]}
                style={styles.linearGradient}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
            >
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.details}>Challenges: {numberOfChallenges}</Text>
                <Text style={styles.details}>Difficulty: {difficulty}</Text>
                <View style={styles.footer}>
                    <View style={[styles.completionBar, { backgroundColor: completedBarColor }]} />
                    <Text style={styles.percentage}>{percentageText}</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        height: 180,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 20,
    },
    linearGradient: {
        flex: 1,
        padding: 15,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 24,
        color: '#FFF',
        fontWeight: 'bold',
    },
    details: {
        fontSize: 16,
        color: '#FFF',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    completionBar: {
        height: 15,
        width: '100%',
        backgroundColor: 'transparent',
        borderRadius: 20
    },
    percentage: {
        position: 'absolute',
        right: 10,
        top: -25,
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold',
    },
});

export default SeasonCard;
