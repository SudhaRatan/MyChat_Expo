import { PermissionsAndroid, TouchableOpacity } from "react-native";
import GradientText from "./LinearGradientText";
import { FontAwesome5 } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import { useContactStore } from "../stores/contactStore";

const ChatScreenHeaderRight = ({ navigation }) => {
  const setPermissionGranted = useContactStore(
    (state) => state.setPermissionGranted
  );

  const setContacts = useContactStore((state) => state.setContacts);
  const contacts = useContactStore((state) => state.contacts);

  const setC = async () => {
    setPermissionGranted(true);
    if (contacts.length === 0) {
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
      setContacts(
        newData.filter(({ number }, index) => !numbers.includes(number, index + 1))
      );
    }
  };

  const NavToAdd = () => {
    (async () => {
      if (
        !(await PermissionsAndroid.check("android.permission.READ_CONTACTS"))
      ) {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
          await setC();
        } else {
          setPermissionGranted(false);
        }
      } else {
        await setC();
      }

      navigation.navigate("AddContacts");
    })();
  };

  return (
    <TouchableOpacity onPress={NavToAdd}>
      <GradientText
        colors={["#5ce27f", "#5cabe2"]}
        style={{
          paddingHorizontal: 16,
        }}
      >
        <FontAwesome5 name="user-plus" size={20} color="#5cabe2" />
      </GradientText>
    </TouchableOpacity>
  );
};

export default ChatScreenHeaderRight;
