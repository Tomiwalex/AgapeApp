import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DevotionalScreen from "../stack/DevotionalScreen";
import MonthSelection from "./stack/MonthSelection";
import DaysSelection from "./stack/DaysSelection";
import Devotional from "./stack/Devotional";

const DevotionalStacks = () => {
  const DevotionalStack = createNativeStackNavigator();

  return (
    <DevotionalStack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <DevotionalStack.Screen name="Devotional" component={DevotionalScreen} />
      <DevotionalStack.Screen name="Months" component={MonthSelection} />
      <DevotionalStack.Screen name="Days" component={DaysSelection} />
      <DevotionalStack.Screen name="DailyDevotion" component={Devotional} />
    </DevotionalStack.Navigator>
  );
};

export default DevotionalStacks;
