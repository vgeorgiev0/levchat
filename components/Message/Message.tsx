import React, { useState, useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "../../src/models";
import styles from "./styles";
import { Auth } from "aws-amplify";

const myID = "u1";

const Message = ({ message }: any) => {
  const [user, setUser] = useState<User | undefined>();
  const [isMe, setIsMe] = useState<boolean>(false);

  useEffect(() => {
    DataStore.query(User, message.userID).then(setUser);
  }, []);

  useEffect(() => {
    const checkIsMe = async () => {
      if (!user) {
        return;
      }

      const authUser = await Auth.currentAuthenticatedUser();
      setIsMe(user?.id === authUser.attributes.sub);
    };
    checkIsMe();
  }, [user]);

  if (!user) {
    return <ActivityIndicator />;
  }

  // const isMe = message.user.id === myID;

  return (
    <View
      style={[
        styles.container,
        isMe ? styles.containerRight : styles.containerLeft,
      ]}
    >
      <Text style={{ color: isMe ? "black" : "#fff" }}>{message.content}</Text>
    </View>
  );
};

export default Message;
