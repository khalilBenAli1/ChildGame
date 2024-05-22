import React from "react";
import { View, Text, Image, StyleSheet, Modal } from "react-native";
import CustomModal from "../../Components/CustomModal";
import AppButton from "../../Components/AppButton";

const RoundStart = ({ isVisible, onClose, text, mode, orderList,onClick ,bannerText}) => {
  return (
    <CustomModal
      isVisible={isVisible}
      onClose={onClose}
      hasBanner
      height={"90%"}
      bannerText={bannerText}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{text}</Text>
        <Image
          source={require("../../assets/newImgs/btata 4.png")}
          style={styles.image}
        />
        <View style={styles.orderContainer}>
          <Text style={styles.sub}>
            {mode === "individual"
              ? "Player playing order :"
              : "Team playing order :"}
          </Text>
          {orderList.map((name, index) => (
            <View key={index} style={styles.orderItem}>
              <View style={styles.orderNumber}>
                <Text style={styles.orderNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.orderName}>{name}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.note}>Note :</Text>
        <Text style={styles.description}>
          Each Team will have A 5 questions and challenges to answer before the
          end of the timer and <Text style={{fontWeight:"bold",color:"#389936"}}>Good luck</Text>
        </Text>
      </View>
      <AppButton
        onClick={onClick}
        backgroundColor={"#389936"}
      >
        <View style={styles.languagesContainer}>
          <Text style={styles.buttonText}>Start the round</Text>
        </View>
      </AppButton>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color:"#389936"
  },
  sub: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  buttonText:{
    color:"white",
    fontSize:20,
    fontWeight:"bold"
  },
  image: {
    width: 200,
    height: 150,
    resizeMode: "contain",
    marginVertical: 10,
  },
  orderContainer: {
    alignSelf: "stretch",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  orderNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#DEAE48",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  orderNumberText: {
    color: "white",
    fontSize: 14,
  },
  orderName: {
    fontSize: 16,
  },
  note: {
    color: "#FF2F2F",
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
  },
});

export default RoundStart;

//Usage
{/* <RoundStart
isVisible={true}
onClose={() => console.log("Close modal")}
text="Round Beginning"
mode="individual"
orderList={["Alice", "Bob", "Charlie"]}
onClick={()=>console.log('test')}
/> */}