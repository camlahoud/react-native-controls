/**
 * A text component that supports letter spacing to handle the lack of spacing
 * in android
 */
import React, { Component } from 'react';
import { Platform } from 'react-native';
import { Text } from 'native-base';

export default class SpacedText extends Component {
    render() {
        let style = {};
        var text = this.props.children;
        if (Platform.OS == 'ios') {
            style['letterSpacing'] = this.props.letterSpacing;
        } else {
            text = this.applyAndroidLetterSpacing(text);
        }
        return (
            <Text style={[this.props.style, style]}>
                {text}
            </Text>
        )
    }
    applyAndroidLetterSpacing(string) {
        count = 1;
        if (this.props.letterSpacing) {
            count = Math.max(Math.floor(this.props.letterSpacing / 4),1);
        }
        return string.split('').join('\u200A'.repeat(count));
    }
}