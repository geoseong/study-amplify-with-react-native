import { Auth, AuthLoadingScreen } from '../screen';

import StackNav from './stack';
import { createSwitchNavigator } from 'react-navigation';

/**
 * @name RouteConfigs
 * @description The route configs object is a mapping from route name to a route config,
 *  which tells the navigator what to present for that route.
 */
const RouteConfigs = {
  AuthLoading: AuthLoadingScreen,
  Main: StackNav,
  Auth,
};
/**
 * @param initialRouteName - The routeName for the initial tab route when first loading.
 * @param navigationOptions - Navigation options for the navigator itself, to configure a parent navigator
 * @param defaultNavigationOptions - Default navigation options to use for screens
 * @param resetOnBlur - Reset the state of any nested navigators when switching away from a screen. Defaults to true.
 * @param paths - Provide a mapping of routeName to path config, which overrides the paths set in the routeConfigs.
 * @param backBehavior - initialRoute to return to initial route, order to return to previous route,
 *  history to return to last visited route, or none.
 */
const SwitchNavigatorConfig = {
  headerMode: Platform.OS === 'ios' ? 'float' : 'screen',
  initialRouteName: 'AuthLoading',
};
const SwitchNav = createSwitchNavigator(RouteConfigs, SwitchNavigatorConfig);

export default SwitchNav;
