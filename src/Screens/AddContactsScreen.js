import { View, Text, FlatList, SectionList, ToastAndroid } from "react-native";
import { useContactStore } from "../stores/contactStore";
import Contact from "../Components/Contact";
import axios from "axios";
import { API_URL } from "../../config";
import { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";
import { useMainStore } from "../stores/mainStore";
import { useChatStore } from "../stores/chatsStore";
import { useMessageStore } from "../stores/messageStore";

const AddContactsScreen = ({ navigation }) => {
  const permissionGranted = useContactStore((state) => state.permissionGranted);
  const contacts = useContactStore((state) => state.contacts);
  const setContacts = useContactStore((state) => state.setContacts);
  const setFetchingUsers = useContactStore((state) => state.setFetchingUsers);
  const changeheaderName = useMainStore((state) => state.changeheaderName);
  const insertChat = useChatStore((state) => state.insertChat);

  const setTempContacts = useContactStore((state) => state.setTempContacts);
  const [myContact, setMyContact] = useState(null);
  const myNumber = useMainStore((state) => state.number);
  const name = useMainStore((state) => state.name);

  const setCurrentScreen = useMessageStore((state) => state.setCurrentScreen)

  useEffect(() => {
    const groupContacts = async (c) => {
      setFetchingUsers(true);
      if (c) {
        if (c.length > 0) {
          var result = await axios.post(`${API_URL}/user/existingUsers`, {
            numbers: c.map((item) => item.number),
          });
          setFetchingUsers(false);
          setMyContact(c.find((item) => item.number == myNumber));
          setContacts(
            c.filter(
              (item) =>
                result.data.includes(item.number) && item.number != myNumber
            )
          );
          setTempContacts(
            c.filter(
              (item) =>
                result.data.includes(item.number) && item.number != myNumber
            )
          );
        }
      } else {
        if (contacts.length > 0) {
          var result = await axios.post(`${API_URL}/user/existingUsers`, {
            numbers: contacts.map((item) => item.number),
          });
          setFetchingUsers(false);
          setMyContact(contacts.find((item) => item.number == myNumber));
          setContacts(
            contacts.filter(
              (item) =>
                result.data.includes(item.number) && item.number != myNumber
            )
          );
          setTempContacts(
            contacts.filter(
              (item) =>
                result.data.includes(item.number) && item.number != myNumber
            )
          );
        }
      }
    };
    async function back() {
      setFetchingUsers(true);
      if (permissionGranted) {
        const { data } = await Contacts.getContactsAsync({
          sort: Contacts.SortTypes.FirstName,
        });
        var newData = [];
        data.map((item) => {
          var contact = {
            name: item.name,
            image: item.image ? item.image : null,
          };
          item.phoneNumbers &&
            item.phoneNumbers.map((pn) => {
              newData.push({ ...contact, pnId: pn.id, number: pn.number });
            });
        });
        const numbers = newData.map((item) => item.number);

        groupContacts(
          newData.filter(
            ({ number }, index) => !numbers.includes(number, index + 1)
          )
        );
      }
    }
    (async () => {
      await groupContacts();
      await back();
    })();
  }, []);

  const goToChat = ({ id, name, dp, number }) => {
    setCurrentScreen("ChatScreen")
    changeheaderName(name, dp);
    insertChat({ id, name, number, dp });
    navigation.navigate("ChatScreen", { number });
  };

  return (
    <View className="flex-1 bg-white dark:bg-[#121212]">
      {permissionGranted && contacts.length > 0 ? (
        <>
          {myContact && (
            <Contact
              // onPress={() =>
              //   ToastAndroid.show("Your contact", ToastAndroid.SHORT)
              // }
              onPress={() => {
                ToastAndroid.show("Your contact", ToastAndroid.SHORT);
              }}
              {...myContact}
              name={name}
            />
          )}
          <Text className="font-semibold text-lg p-2 text-[#80808080] dark:text-white">
            My Chat Users
          </Text>
          <FlatList
            data={contacts}
            keyExtractor={(item) => item.pnId}
            renderItem={({ item, index }) => (
              <Contact onPress={goToChat} {...item} />
            )}
          />
        </>
      ) : (
        <View className="flex-1 justify-center items-center">
          <Text>No contacts found</Text>
        </View>
      )}
    </View>
  );
};

export default AddContactsScreen;
