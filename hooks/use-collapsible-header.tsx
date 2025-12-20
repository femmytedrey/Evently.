import {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

interface useCollapsibleHeaderProps {
  maxHeight?: number;
  minHeight?: number;
}
export const useCollapsibleHeader = ({
  maxHeight = 350,
  minHeight = 150,
}: useCollapsibleHeaderProps = {}) => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, maxHeight - minHeight],
      [maxHeight, minHeight],
      Extrapolation.CLAMP
    );
    return { height };
  });

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, maxHeight, minHeight],
      [1, 0],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  return {
    scrollHandler,
    headerAnimatedStyle,
    imageAnimatedStyle,
    scrollY,
    HEADER_MAX_HEIGHT: maxHeight,
    HEADER_MIN_HEIGHT: minHeight,
  };
};
