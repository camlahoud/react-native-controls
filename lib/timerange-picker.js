import React, { Component } from 'react';
import {
    Text,
    Modal,
    View,
    Animated,
    StyleSheet
} from 'react-native';
import DatePicker from './date-picker';
var moment = require('moment');

export default class TimeRangePicker extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            modalVisible: false,
            from: moment(props.value.from,"HH:mm").toDate(),
            to: moment(props.value.to,"HH:mm").toDate(),
            animatedHeight: new Animated.Value(0)
        };
        
        this.set = this.set.bind(this);
    }
    render() {
        return (
            <View style={styles.wrapper}>
                <DatePicker 
                    mode="time"
                    textColor={this.props.textColor}
                    value={this.state.from}
                    onValueChange={(value) => this.setFrom(value)} />
                <Text style={{color: this.props.textColor}}>{this.props.separator}</Text>
                <DatePicker 
                    mode="time"
                    textColor={this.props.textColor}
                    value={this.state.to}
                    onValueChange={(value) => this.setTo(value)} />
            </View>
        )
    }
    
    setFrom(value) {
        this.setState({
            from: value
        }, () => {
            this.set();
        })
    }
    
    setTo(value) {
        this.setState({
            to: value
        }, () => {
            this.set();
        })
    }
    
    set() {
        this.props.onValueChange({
            from: moment(this.state.from).format("HH:mm"),
            to: moment(this.state.to).format("HH:mm")
        });
    }
}

TimeRangePicker.defaultProps = {
    separator: " - ",
    // component height: 216(DatePickerIOS) + 1(borderTop) + 42(marginTop), IOS only
    height: 259,
    
    textColor: "#000",

    // slide animation duration time, default to 300ms, IOS only
    duration: 300,
    confirmBtnText: 'Set',
    cancelBtnText: 'Cancel',
};



const styles = StyleSheet.create({
    wrapper: {
        flexDirection: "row"
    }
})