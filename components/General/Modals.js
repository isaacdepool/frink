import React from 'react'
import { Text, Modal, View, StyleSheet} from 'react-native'
import InfoIcon from '../../assets/icons/info-2.svg'
import SuccessIcon from '../../assets/icons/done.svg' 
import { TouchableOpacity } from 'react-native';

const s = require('../../style');

export const Modals = ({
    show=false,
    title='',
    subtitle='',
    isSubtitle=false,
    isInfo=false,
    isSuccess=true,
    isCancel=false,
    handleAccept,
    handleCancel
}) => {
  return (
    <Modal
    visible={show}
    transparent={true}
    >
        <View style={[s.contenedorCenter]}>
            <View style={[s.bgFFF, s.w80, styles.box, s.p5]}>
                    {
                        isInfo
                        ?
                        <InfoIcon width={50} height={50} style={[styles.icon]} />
                        :
                        <SuccessIcon width={50} height={50} style={[styles.icon]} />
                    }
                    <Text style={[s.fontSize30, s.mt3, s.textCenter, s.fontFamily2]}>{title}</Text>
                    {
                        isSubtitle&&
                        <Text style={[s.fontSize18, s.textCenter, s.colorGrey]}>{subtitle}</Text>
                    }

                <View style={[s.contenedorFlexSpaceBetween, s.mt4]}>
                    {
                        isCancel&&
                        <TouchableOpacity style={[styles.btn, s.mr2, s.bg_tertiary]}
                        onPress={handleCancel}
                        >
                            <Text style={[s.fontSize16, s.fontFamily2, s.colorWhite]}>Cancel</Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity style={[styles.btn, s.bg_quarternary]}
                    onPress={handleAccept}
                    >
                        <Text style={[s.fontSize16, s.fontFamily2, s.colorRed]}>{isCancel? 'Accept' : 'OK'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    box:{
        justifyContent: "center",
        alignItems: "center",
        position: 'relative',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    icon:{
        position: 'absolute',
        top: -20,
    },
    btn:{
        // borderWidth: 1,
        borderRadius: 5,
        width: '40%',
        height: 40,
        justifyContent: "center",
        alignItems: "center",

    }
});
