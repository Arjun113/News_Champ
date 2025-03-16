const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
    light: {
        text: '#11181C',
        background: '#fff',
        tint: tintColorLight,
        icon: '#687076',
        tabIconDefault: '#687076',
        tabIconSelected: tintColorLight,
        container: {
            flex: 1,
            backgroundColor: '#25292e',
            alignItems: 'center',
            justifyContent: 'center',
        },
        button: {
            fontSize: 20,
            textDecorationLine: 'underline',
            color: '#fff',
        }
    },
    dark: {
        text: '#ECEDEE',
        background: '#151718',
        tint: tintColorDark,
        icon: '#9BA1A6',
        tabIconDefault: '#9BA1A6',
        tabIconSelected: tintColorDark,
        container: {
            flex: 1,
            backgroundColor: '#25292e',
            alignItems: 'center',
            justifyContent: 'center',
        },
        button: {
            fontSize: 20,
            textDecorationLine: 'underline',
            color: '#000',
        }
    },
};