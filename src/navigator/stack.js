import { Main } from '../screen';
import { createStackNavigator } from 'react-navigation-stack';

/**
 * @name RouteConfigs
 * @description The route configs object is a mapping from route name to a route config,
 *  which tells the navigator what to present for that route.
 */
const RouteConfigs = {
  // For each screen that you can navigate to, create a new entry like this:
  Main: {
    // `ProfileScreen` is a React component that will be the main content of the screen.
    screen: Main,
    // When `ProfileScreen` is loaded by the StackNavigator, it will be given a `navigation` prop.
    // The action and route params are extracted from the path.
    params: { pagename: 'awskrugGallery' },
    // Optional: Override the `navigationOptions` for the screen
    navigationOptions: ({ navigation }) => {
      return {
        title: `${navigation.getParam('pagename', 'name')}'s Profile`,
      };
    },
  },
};

/**
 * @param initialRouteName - Sets the default screen of the stack. Must match one of the keys in route configs.
 * @param initialRouteParams - The params for the initial route
 * @param initialRouteKey - Optional identifier of the initial route
 * @param navigationOptions - Navigation options for the navigator itself, to configure a parent navigator
    title - String that can be used as a fallback for headerTitle.
    header - Function that given HeaderProps returns a React Element, to display as a header.
 * @param defaultNavigationOptions - Default navigation options to use for screens
 * @param paths - A mapping of overrides for the paths set in the route configs
 * @param mode - Defines the style for rendering and transitions
    card - Use the standard iOS and Android screen transitions. This is the default.
    modal - Make the screens slide in from the bottom which is a common iOS pattern. 
      Only works on iOS, has no effect on the transition on Android. This also disables react-native-screens for the stack.
 * @param headerMode - Specifies how the header should be rendered
    float - Render a single header that stays at the top and animates as screens are changed.
      This is a common pattern on iOS.
    screen - Each screen has a header attached to it and the header fades in and out together with the screen.
      This is a common pattern on Android.
    none - No header will be rendered.
 */
const StackNavigatorConfig = {
  headerMode: Platform.OS === 'ios' ? 'float' : 'screen',
  initialRouteName: 'Main',
  /*
   * Use modal on iOS because the card mode comes from the right,
   * which conflicts with the drawer example gesture
   */
  mode: Platform.OS === 'ios' ? 'modal' : 'card',
  // header: ({ scene, previous, navigation }) => {
  //   const { options } = scene.descriptor;
  //   const title =
  //     options.headerTitle !== undefined
  //       ? options.headerTitle
  //       : options.title !== undefined
  //       ? options.title
  //       : scene.route.routeName;

  //   return (
  //     <MyHeader
  //       title={title}
  //       leftButton={
  //         previous ? <MyBackButton onPress={navigation.goBack} /> : undefined
  //       }
  //     />
  //   );
  // };
};

const StackNav = createStackNavigator(RouteConfigs, StackNavigatorConfig);
export default StackNav;
