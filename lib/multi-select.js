import React, { Component } from 'react';
import {
    Platform,
    TouchableOpacity,
    TouchableHighlight,
    Text,
    Modal,
    View,
    Animated,
    StyleSheet
} from 'react-native';
import {
    Container,
    Content,
    Header,
    Title,
    Button,
    List,
    ListItem,
    CheckBox,
    Icon
} from 'native-base';
import SpacedText from './spacedtext';
var moment = require('moment');
var _ = require('lodash');

export default class MultiSelect extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            modalVisible: false,
            value: this.props.value || []
        };
        
        this.set = this.set.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    
    render() {
        let textStyle = {color: this.props.textColor};
        return (
            <TouchableOpacity onPress={() => this.open()}>
                <Text style={[this.props.style,styles.datePicker, textStyle]}>
                    {this.getDisplay()}
                </Text>
                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {this.cancel();}}
                    >
                    <Container style={{flex:1}} theme={this.props.theme}>
                        <Header>
                            <Button transparent onPress={() => this.props.saveOnBack ? this.set() : this.cancel()}>{this.props.cancelBtnText ? this.props.cancelBtnText : <Icon name='ios-arrow-back' style={{color: "#FFF"}} />}</Button>
                            <Title>{this.props.title}</Title>
                            {this.props.saveOnBack ? null: 
                            <Button transparent onPress={() => this.set()} textStyle={styles.setButton}>{this.props.confirmBtnText}</Button>}
                        </Header>
                        <Content>
                            <List dataArray={this.props.data}
                                renderRow={item => {
                                    return <ListItem key={item.key} style={this.props.listItemStyle}>
                                        <MyCheckBox checked={_.indexOf(this.state.value,item.key)>=0} onPress={() => { this.toggleValue(item.key)}} theme={this.props.theme} />
                                        {this.props.letterSpacing ? 
                                        <SpacedText style={[styles.text,this.props.listTextStyle]} letterSpacing={this.props.letterSpacing}>{item.label}</SpacedText>:
                                        <Text style={[styles.text,this.props.listTextStyle]}>{item.label}</Text>}
                                    </ListItem>
                                }}
                            />
                        </Content>
                    </Container>
                </Modal>
            </TouchableOpacity>
        )
    }
    
    getDisplay() {
        if (this.props.getDisplay) {
            return this.props.getDisplay(this.props.value);
        }
        return this.props.value.join(', ');
    }
    
    toggleValue(key) {
        var index = _.indexOf(this.state.value, key);
        var value = this.state.value;
        if (index>=0) {
            _.pullAt(value, [index]);
        } else {
            if (this.props.maxSelection > 0) {
                if (value.length>=this.props.maxSelection) {
                    return;
                }
            }
            value.push(key);
        }
        this.setState({value});
    }
    
    open() {
        this.setState({modalVisible: true});
    }
    
    dismissModal() {
        this.setState({
            modalVisible: false
        });
    }
    
    set() {
        this.props.onValueChange(this.state.value);
        this.dismissModal();
    }
    
    cancel() {
        this.setState({
            modalVisible: false,
            value: this.props.value || [],
        })
    }
}

MultiSelect.defaultProps = {
    title: '',
    maxSelection: -1,

    // slide animation duration time, default to 300ms, IOS only
    duration: 300,
    confirmBtnText: 'Set',
    cancelBtnText: '',
    
    saveOnBack: false //If true will automatically call the set function on back
};

/**
 * A custom checkbox, just a circle no check
 */
class MyCheckBox extends Component {
    render() {
        var checkboxSize = this.props.theme ? this.props.theme.checkboxSize : 23;
        const size = {
            width: checkboxSize,
            height: checkboxSize,
            borderRadius: checkboxSize/2
        }
        const color = this.props.theme ? this.props.theme.checkboxBgColor : "#ed885d";
        let style = {};
        if (this.props.checked) {
            style = {
                backgroundColor: color
            }
        } else {
            style={
                borderWidth: 2,
                borderColor: color
            }
        }
        return <TouchableOpacity onPress={this.props.onPress} style={styles.checkbox}>
            <View style={[size, style]} />
        </TouchableOpacity>
    }
}



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
    },
    setButton: {
        fontSize: 14
    },
    checkbox: {
        marginRight: 15,
        paddingLeft: (Platform.OS === 'ios') ? 5 : 2,
        paddingBottom: (Platform.OS === 'ios') ? 0 : 5,
    }
})