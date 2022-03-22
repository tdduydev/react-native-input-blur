/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Containers, Icon } from "@tdduydev/rn-base-component";

import ViewLabel, {
  MIN_HEIGHT,
} from "@tdduydev/rn-base-component/src/containers/ViewLabel";
import {
  padding,
  margin,
} from "@tdduydev/rn-base-component/src/components/config/spacing";
import LinearGradient from "react-native-linear-gradient";
import { BlurView } from "@react-native-community/blur";
import { renderNode } from "@tdduydev/rn-base-component/src/components/helpers";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSecure: props.secureTextEntry,
      isHeading: props.value || props.defaultValue,
    };
    this.input = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.updateHeading(this.props.value);
    }
  }
  updateHeading = (value) => {
    this.setState({
      isHeading: value,
    });
  };

  handleFocus = (data) => {
    this.updateHeading(true);
    if (this.props.onFocus) {
      this.props.onFocus(data);
    }
  };
  onChange = (value) => {
    this.setState(
      {
        value,
      },
      () => {
        if (this.props.onChangeText) {
          this.props.onChangeText(value);
        }
      }
    );
  };

  handleBlur = (data) => {
    const { value } = this.props;
    this.updateHeading(
      value || (this.input.current && this.input.current._lastNativeText)
    );
    if (this.props.onBlur) {
      this.props.onBlur(data);
    }
  };

  BlueViewCheckPlatform = () => {
    if (Platform.OS === "ios") {
      return (
        <>
          <LinearGradient
            colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.4)"]}
            style={styles.LinearGradient}
          ></LinearGradient>
          <BlurView style={styles.BlurView} blurType="light" blurAmount={10} />
        </>
      );
    } else {
      return (
        <View
          style={[
            styles.BlurView,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              flex: 1,
              backgroundColor: "white",
              zIndex: 1,
              opacity: 0.3,
            },
          ]}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.4)"]}
            style={styles.LinearGradient}
          ></LinearGradient>
        </View>
      );
    }
  };

  render() {
    const {
      label,
      error,
      secureTextEntry,
      theme,
      style,
      multiline,
      rightIcon,
      leftIcon,
      rightIconContainerStyle,
      leftIconContainerStyle,
      ...rest
    } = this.props;
    const { isHeading } = this.state;
    return (
      <ViewLabel label={label} error={error} isHeading={isHeading}>
        <View style={styles.viewInput}>
          {Platform.OS === "ios" ? this.BlueViewCheckPlatform() : <></>}

          {leftIcon && (
            <View
              style={StyleSheet.flatten([
                styles.iconContainer,
                leftIconContainerStyle,
              ])}
            >
              {renderNode(Icon, leftIcon)}
            </View>
          )}
          <Containers.InputBasic
            {...rest}
            inputRef={this.input}
            testID="RN-text-input"
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            secureTextEntry={secureTextEntry}
            multiline={multiline}
            style={[
              styles.input,
              !multiline && {
                height: MIN_HEIGHT,
              },
              style && style,
            ]}
          />
          {Platform.OS === "android" ? this.BlueViewCheckPlatform() : <></>}
          {rightIcon && (
            <View
              style={StyleSheet.flatten([
                styles.iconContainer,
                rightIconContainerStyle,
              ])}
            >
              {renderNode(Icon, rightIcon)}
            </View>
          )}
        </View>
      </ViewLabel>
    );
  }
}

const styles = StyleSheet.create({
  BlurView: {
    position: "absolute",
    zIndex: 2,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 45,
    opacity: 0.9,
  },
  LinearGradient: {
    zIndex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 45,
    opacity: 0.6,
  },
  viewInput: {
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: "rgb(230, 230, 230)",
    height: 45,
  },
  input: {
    flex: 1,
    paddingHorizontal: padding.large,
    position: "relative",
    color: "#ffffff",
    zIndex: 3,
  },
  viewIcon: {
    marginRight: margin.large,
  },
  iconContainer: {
    zIndex: 99,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
});

export default Input;
