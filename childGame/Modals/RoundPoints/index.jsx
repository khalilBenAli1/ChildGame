import React from 'react';
import { View, Text, Image, StyleSheet, Modal } from 'react-native';
import CustomModal from '../../Components/CustomModal';
import AppButton from '../../Components/AppButton';

const RoundPoints = ({ isVisible, onClose, bannerText, numberOfPlayers, mode, players }) => {
  return (
    <CustomModal isVisible={isVisible} onClose={onClose} height="80%" hasBanner bannerText={bannerText}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/imgs/Score.png")}
          style={styles.image}
        />
        <Text style={styles.roundPointsTitle}>Round Points</Text>
        <View style={[styles.namesContainer, { justifyContent: numberOfPlayers === 1 ? 'center' : 'space-around' }]}>
          {players.map((name, index) => (
            <View key={index} style={styles.nameBox}>
              <Text style={styles.name}>{name}</Text>
              {index < players.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>
        <View style={styles.horizontalSeparator} />
        <Text style={styles.roundResultTitle}>Round Result</Text>
        <View style={[styles.namesContainer, { justifyContent: numberOfPlayers === 1 ? 'center' : 'space-around' }]}>
          {players.map((name, index) => (
            <View key={index} style={styles.nameBox}>
              <Text style={styles.name}>{name}</Text>
              {index < players.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  bannerText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
    resizeMode:"contain"
  },
  roundPointsTitle: {
    fontSize: 22,
    color: '#389936',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  namesContainer: {
    flexDirection: 'row',
    marginVertical:20,
    height:100,
  },
  nameBox: {
    flexDirection: 'row',
    alignItems: "flex-start",
    justifyContent:"flex-start"
  },
  name: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  separator: {
    height: '100%',
    width: 1,
    backgroundColor: '#000',
    marginHorizontal: 20,
  },
  horizontalSeparator:{
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "dashed",
    width:300,
    marginVertical:20,
    height:1
  },
  roundResultTitle: {
    fontSize: 22,
    color: '#DEAE48',
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  roundResult: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default RoundPoints;


//modal usage 
// <RoundPoints
// isVisible={true}
// onClose={() => console.log("Close modal")}
// bannerText={<Text>Final Scores</Text>}
// numberOfPlayers={3}
// mode="team"
// players={["Team Alpha", "Team Beta", "Team Gamma"]}
// />