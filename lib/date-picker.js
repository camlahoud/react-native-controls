import React, { Component } from 'react';
import {
    Platform,
    DatePickerIOS,
    DatePickerAndroid,
    TimePickerAndroid,
    TouchableOpacity,
    TouchableHighlight,
    Text,
    Modal,
    View,
    Animated,
    StyleSheet
} from 'react-native';
var moment = require('moment');

export default class DatePicker extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            modalVisible: false,
            value: this.props.value || new Date(),
            mode: this.props.mode || 'date',
            format: "MMMM Do YYYY",
            animatedHeight: new Animated.Value(0)
        };
        if (this.state.mode == 'time') {
            this.state.format = 'HH:mm';
        }
        
        this.set = this.set.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    render() {
        if (Platform.OS == 'ios') {
            return this._renderIOSDatePicker();
        } else {
            return this._renderAndroidDatePicker();
        }
    }
    
    _renderIOSDatePicker() {
        let textStyle = {color: this.props.textColor};
        return (
            <TouchableOpacity onPress={() => this.setModalVisible()}>
                <Text style={[this.props.style,styles.datePicker, textStyle]}>
                    {moment(this.props.value).format(this.state.format)}
                </Text>
                <Modal
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {this.dismissModal();}}
                    >
                    <View style={{flex: 1}}>
                        <TouchableHighlight
                            style={styles.datePickerMask}
                            activeOpacity={1}
                            underlayColor={'#00000077'}
                            onPress={this.cancel}
                            >
                                <Animated.View
                                    style={[styles.datePickerCon, {height: this.state.animatedHeight}]}
                                >
                                    <TouchableHighlight
                                        underlayColor={'#fff'}
                                        style={{flex: 1}}
                                    >
                                        <View style={{flex:1}}>
                                            <View style={styles.toolbar}>
                                                <TouchableOpacity style={styles.cancelBtn} onPress={this.cancel}>
                                                    <Text style={textStyle}>{this.props.cancelBtnText}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.setBtn} onPress={this.set}>
                                                    <Text style={textStyle}>{this.props.confirmBtnText}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <DatePickerIOS 
                                                date={this.state.value}
                                                mode={this.state.mode}
                                                onDateChange={(value) => { this.setState ( { value } ) }} />
                                        </View>
                                    </TouchableHighlight>
                                </Animated.View>
                        </TouchableHighlight>
                    </View>
                </Modal>
            </TouchableOpacity>
        )
    }
    
    _renderAndroidDatePicker() {
        let textStyle = {color: this.props.textColor};
        return (
            <TouchableOpacity onPress={this.openAndroidPicker.bind(this)}>
                <Text style={[this.props.style,styles.datePicker,textStyle]}>
                    {moment(this.props.value).format(this.state.format)}
                </Text>
            </TouchableOpacity>
        );
    }
    
    openAndroidPicker() {
        if (this.state.mode == 'date') {
            DatePickerAndroid.open({
                date: this.props.value
            }).then((event) => {
                const {action, year, month, day} = event;
                if (action !== DatePickerAndroid.dismissedAction) {
                    var newVal = new Date(year,month,day);
                    this.props.onValueChange(newVal);
                }
            })
        } else if (this.state.mode == 'time') {
            TimePickerAndroid.open({
                hour: this.props.value.getHours(),
                minute: this.props.value.getMinutes(),
                is24Hour: true
            }).then((event) => {
                const {action, minute, hour} = event;
                if (action === TimePickerAndroid.timeSetAction) {
                    var newVal = new Date();
                    newVal.setHours(hour);
                    newVal.setMinutes(minute);
                    this.props.onValueChange(newVal);
                }
            })
        }
    }
    
    setModalVisible() {
        const {height, duration} = this.props;
        this.setState({modalVisible: true});
        Animated.timing(
            this.state.animatedHeight,
            {
                toValue: height,
                duration: duration
            }
        ).start();
    }
    
    dismissModal() {
        this.setState({
            modalVisible: false,
            animatedHeight: new Animated.Value(0)
        });
    }
    
    set() {
        this.props.onValueChange(this.state.value);
        this.dismissModal();
    }
    
    cancel() {
        this.setState({
            modalVisible: false,
            value: this.props.value || new Date(),
        })
    }
}

DatePicker.defaultProps = {
    mode: 'date',
    // component height: 216(DatePickerIOS) + 1(borderTop) + 42(marginTop), IOS only
    height: 259,
    
    textColor: "#000",

    // slide animation duration time, default to 300ms, IOS only
    duration: 300,
    confirmBtnText: 'Set',
    cancelBtnText: 'Cancel',
};



const styles = StyleSheet.create({
    datePickerCon: {
        backgroundColor: '#fff',
        height: 0,
        overflow: 'hidden',
        flex: 1
    },
    datePickerMask: {
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: 'row',
        backgroundColor: '#00000077'
    },
    toolbar: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})