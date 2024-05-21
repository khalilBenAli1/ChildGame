import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,ImageBackground} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SeasonCard = ({ title, numberOfChallenges, difficulty, completed, color, onClick ,sub,disabled=false,playable}) => {
    const completedBarColor = completed ? '#1BAA76' : 'white';
    const percentageText = completed ? '100%' : '0%';
    const backgroundUrl = 'https://drive.usercontent.google.com/download?id=1wN4nPLBj3Fb-CLzkF5dzTTDgycuTbQJL&export=view&authuser=0';

    const gradientColors = playable
    ? ['transparent', color]  // Normal colorful gradient if playable
    : ['rgba(0,0,0,0.6)', 'rgba(255,255,255,0.6)'];  // Black and white mask if not playable

    return (
        <TouchableOpacity onPress={onClick} style={styles.card} disabled={disabled}>
             <ImageBackground source={{ uri: backgroundUrl }} style={styles.imageBackground}>
             { !playable && (
                    <View style={styles.bwOverlay} />
                )}
            <LinearGradient
                colors={gradientColors}
                style={styles.linearGradient}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
            >
                <Text style={styles.title}>{title}<Text style={[{color:playable?"black":"white"},styles.sub]}>{sub}</Text></Text>
                <Text style={styles.details}>Challenges: {numberOfChallenges}</Text>
                <Text style={styles.details}>Difficulty: {difficulty}</Text>
                <View style={styles.footer}>
                    <View style={[styles.completionBar, { backgroundColor: completedBarColor }]} />
                    <Text style={styles.percentage}>{percentageText}</Text>
                </View>
            </LinearGradient>
            </ImageBackground>
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
    imageBackground: {
        flex: 1,
    },
    bwOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
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
