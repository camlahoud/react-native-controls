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
    Icon,
    StyleProvider,
    Left,
    Body,
    Right
} from 'native-base';
import SpacedText from './spacedtext';
var moment = require('moment');
var _ = require('lodash');

export default class SelectList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            modalVisible: false,
            value: this.props.value || ''
        };
        
        this.cancel = this.cancel.bind(this);
    }
    
    render() {
        let textStyle = {color: this.props.textColor};
        return (
            <TouchableOpacity onPress={() => this.setModalVisible()}>
                <Text style={[this.props.style,styles.datePicker, textStyle]}>
                    {this.getDisplay()}
                </Text>
                <Modal
                    animationType='slide'
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {this.dismissModal();}}
                    >
                    <StyleProvider style={this.props.styleProvider}>
                    <Container style={{flex:1}} theme={this.props.theme}>
                        <Header>
                            <Left><Button transparent onPress={() => this.dismissModal()}>{this.props.cancelBtnText ? this.props.cancelBtnText : <Icon name='ios-arrow-back' style={{color: "#FFF"}} />}</Button></Left>
                            <Body><Title>{this.props.title}</Title></Body>
                        </Header>
                        <Content>
                            <List dataArray={this.props.data}
                                rowHasChanged={this.rowHasChanged.bind(this)}
                                renderRow={(item) => {
                                    return <ListItem key={item.key} style={this.props.listItemStyle} onPress={() => this.selectValue(item.key)}>
                                        {this.props.letterSpacing ? 
                                        <SpacedText style={[styles.text,this.props.listTextStyle]} letterSpacing={this.props.letterSpacing}>{item.label}</SpacedText>:
                                        <Text style={[styles.text,this.props.listTextStyle]}>{item.label}</Text>}
                                    </ListItem>
                                }}
                            />
                        </Content>
                    </Container>
                    </StyleProvider>
                </Modal>
            </TouchableOpacity>
        )
    }
    
    getDisplay() {
        if (this.props.getDisplay) {
            return this.props.getDisplay(this.props.value);
        }
        return this.props.value;
    }
    
    selectValue(value) {
        this.setState({
            changed1: this.state.value.key,
            changed2: value.key
        })
        this.props.onValueChange(value);
        this.dismissModal();
    }

    rowHasChanged(r1, r2) {
        if (r1.key === this.state.changed1) {
            this.setState({changed1: null});
            return true;
        }
        if (r1.key === this.state.changed2) {
            this.setState({changed2: null});
            return true;
        }
        return r1 !== r2;
    }
    
    open() {
        this.setModalVisible();
    }
    
    setModalVisible() {
        this.setState({modalVisible: true});
    }
    
    dismissModal() {
        this.setState({
            modalVisible: false
        });
    }
    
    cancel() {
        this.setState({
            modalVisible: false,
            value: this.props.value || '',
        })
    }
}

SelectList.defaultProps = {
    title: '',
    maxSelection: -1,

    // slide animation duration time, default to 300ms, IOS only
    duration: 300,
    cancelBtnText: '',
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