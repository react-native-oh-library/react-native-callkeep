import CallKeepModule from 'react-native-callkeep';
import CallKeepModuleHarmony from './index.harmony';
import { Platform } from 'react-native';

const isIosAndroid = Platform.OS === 'ios' || Platform.OS === 'android';

const exportComp = isIosAndroid ? CallKeepModule : CallKeepModuleHarmony;

export default exportComp;