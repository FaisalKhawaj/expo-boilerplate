import { LogBox } from "react-native";

export const HideWarnings = () =>
  LogBox.ignoreLogs([
    "Require cycle",
    "Non-serializable values were found in the navigation state",
    "Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak",
    "`new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method.",
    "`new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.",
    "Cannot update a component (`Unknown`) while rendering a different component (`ForwardRef`).",
    "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
    "exported from 'deprecated-react-native-prop-types'.",
    "VirtualizedLists should never be nested",
    "If you want to use Reanimated 2 then go",
    "Looks like you're passing an inline function for 'component' prop for the screen 'AddOptions' (e.g. component={() => <SomeComponent />}). Passing an inline function will cause the component state to be lost on re-render and cause perf issues since it's re-created every render. You can pass the function as children to 'Screen' instead to achieve the desired behaviour",
    "Looks like you're passing an inline function for 'component' prop for the screen 'AddOptions' (e.g. component={() => <SomeComponent />})",
    " WARN  [Reanimated] Tried to modify key `reduceMotion` of an object which has been already passed to a worklet",
    "Reanimated] Tried to modify key `reduceMotion` of an object which has been already passed to a worklet. See  https://docs.swmansion.com/react-native-reanimated/docs/guides/troubleshooting#tried-to-modify-key-of-an-object-which-has-been-converted-to-a-shareable",
    "Tried to modify key `reduceMotion` of an object which has been already passed to a worklet.",
  ]);
