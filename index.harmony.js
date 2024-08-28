import { NativeModules, Platform, Alert, TurboModuleRegistry } from 'react-native';

import { listeners, emit } from './actions';

const RNCallKeepModule = TurboModuleRegistry.get('CallKeepNativeModule');

const AudioSessionCategoryOption = {
  mixWithOthers: 0x1,
  duckOthers: 0x2,
  interruptSpokenAudioAndMixWithOthers: 0x11,
  allowBluetooth: 0x4,
  allowBluetoothA2DP: 0x20,
  allowAirPlay: 0x40,
  defaultToSpeaker: 0x8,
  overrideMutedMicrophoneInterruption: 0x80,
}

const AudioSessionMode = {
  default: 'AVAudioSessionModeDefault',
  gameChat: 'AVAudioSessionModeGameChat',
  measurement: 'AVAudioSessionModeMeasurement',
  moviePlayback: 'AVAudioSessionModeMoviePlayback',
  spokenAudio: 'AVAudioSessionModeSpokenAudio',
  videoChat: 'AVAudioSessionModeVideoChat',
  videoRecording: 'AVAudioSessionModeVideoRecording',
  voiceChat: 'AVAudioSessionModeVoiceChat',
  voicePrompt: 'AVAudioSessionModeVoicePrompt',
}

const CONSTANTS = {
  END_CALL_REASONS: {
    FAILED: 1,
    REMOTE_ENDED: 2,
    UNANSWERED: 3,
    ANSWERED_ELSEWHERE: 4,
    DECLINED_ELSEWHERE: 5,  // make declined elsewhere link to "Remote ended" on android because that's kinda true
    MISSED: 2,
  },
};

export { emit, CONSTANTS, AudioSessionCategoryOption, AudioSessionMode };

class EventListener {
  constructor(type, listener, callkeep) {
    this._type = type;
    this._listener = listener;
    this._callkeep = callkeep;
  }

  remove = () => {
    this._callkeep.removeEventListener(this._type, this._listener);
  };
}

class RNCallKeep {
  constructor() {
    this._callkeepEventHandlers = new Map();
  }

  addEventListener = (type, handler) => {
    const listener = listeners[type](handler);

    const listenerSet = this._callkeepEventHandlers.get(type) ?? new Set();
    listenerSet.add(listener);

    this._callkeepEventHandlers.set(type, listenerSet);

    return new EventListener(type, listener, this);
  };

  removeEventListener = (type, listener = undefined) => {
    const listenerSet = this._callkeepEventHandlers.get(type);
    if (!listenerSet) {
      return;
    }

    if (listener) {
      listenerSet.delete(listener);
      listener.remove();
      if (listenerSet.size <= 0) {
        this._callkeepEventHandlers.delete(type);
      }
    } else {
      listenerSet.forEach((listener) => {
        listener.remove();
      });
      this._callkeepEventHandlers.delete(type);
    }
  };

  setup = async (options) => {
    return this._setupIOS(options.ios);
  };

  setSettings = (settings) => RNCallKeepModule.setSettings(settings['ios']);

  registerPhoneAccount = (options) => {
    return;
  };

  registerAndroidEvents = () => {
    return;
  };

  unregisterAndroidEvents = () => {
    return;
  };

  hasDefaultPhoneAccount = async (options) => {
    return;
  };

  displayIncomingCall = (
    uuid,
    handle,
    localizedCallerName = '',
    handleType = 'number',
    hasVideo = false,
    options = null
  ) => {
    // should be boolean type value
    let supportsHolding = !!(options?.ios?.supportsHolding ?? true);
    let supportsDTMF = !!(options?.ios?.supportsDTMF ?? true);
    let supportsGrouping = !!(options?.ios?.supportsGrouping ?? true);
    let supportsUngrouping = !!(options?.ios?.supportsUngrouping ?? true);

    RNCallKeepModule.displayIncomingCall(
      uuid,
      handle,
      handleType,
      hasVideo,
      localizedCallerName,
      supportsHolding,
      supportsDTMF,
      supportsGrouping,
      supportsUngrouping
    );
  };

  checkIsInManagedCall = async () => false;

  answerIncomingCall = (uuid) => {
    RNCallKeepModule.answerIncomingCall(uuid);
  };

  startCall = (uuid, handle, contactIdentifier, handleType = 'number', hasVideo = false) => {
    RNCallKeepModule.startCall(uuid, handle, contactIdentifier, handleType, hasVideo);
  };

  checkPhoneAccountEnabled = async () => {
    return;
  };

  isConnectionServiceAvailable = async () => {
    return true;
  };

  reportConnectingOutgoingCallWithUUID = (uuid) => {
    RNCallKeepModule.reportConnectingOutgoingCallWithUUID(uuid);
  };

  reportConnectedOutgoingCallWithUUID = (uuid) => {
    RNCallKeepModule.reportConnectedOutgoingCallWithUUID(uuid);
  };

  reportEndCallWithUUID = (uuid, reason) => RNCallKeepModule.reportEndCallWithUUID(uuid, reason);

  /*
   * Android explicitly states we reject a call
   * On iOS we just notify of an endCall
   */
  rejectCall = (uuid) => {
    RNCallKeepModule.endCall(uuid);
  };

  isCallActive = async (uuid) => await RNCallKeepModule.isCallActive(uuid);

  getCalls = () => {
    return RNCallKeepModule.getCalls();
  };

  endCall = (uuid) => RNCallKeepModule.endCall(uuid);

  endAllCalls = () => RNCallKeepModule.endAllCalls();

  supportConnectionService = () => true;

  hasPhoneAccount = async () => true;

  hasOutgoingCall = async () => null;

  setMutedCall = (uuid, shouldMute) => {
    RNCallKeepModule.setMutedCall(uuid, shouldMute);
  };

  sendDTMF = (uuid, key) => RNCallKeepModule.sendDTMF(uuid, key);
  /**
   * @description when Phone call is active, Android control the audio service via connection service. so this function help to toggle the audio to Speaker or wired/ear-piece or vice-versa
   * @param {*} uuid
   * @param {*} routeSpeaker
   * @returns Audio route state of audio service
   */
  toggleAudioRouteSpeaker = (uuid, routeSpeaker) => null;

  getAudioRoutes = () => RNCallKeepModule.getAudioRoutes();

  setAudioRoute = (uuid, inputName) => RNCallKeepModule.setAudioRoute(uuid, inputName);

  checkIfBusy = () => RNCallKeepModule.checkIfBusy();

  checkSpeaker = () => RNCallKeepModule.checkSpeaker();

  setAvailable = (state) => {
    return;
  };

  setForegroundServiceSettings = (settings) => {
    return;
  };

  canMakeMultipleCalls = (state) => {
    return;
  };

  setCurrentCallActive = (callUUID) => {
    return;
  };

  updateDisplay = (uuid, displayName, handle, options = null) => {
    let iosOptions = {};
    if (options && options.ios) {
      iosOptions = {
        ...options.ios,
      };
    }
    RNCallKeepModule.updateDisplay(uuid, displayName, handle, iosOptions);
  };

  setOnHold = (uuid, shouldHold) => RNCallKeepModule.setOnHold(uuid, shouldHold);

  setConnectionState = (uuid, state) => null;

  setReachable = () => RNCallKeepModule.setReachable();

  // @deprecated
  reportUpdatedCall = (uuid, localizedCallerName) => {
    console.warn('RNCallKeep.reportUpdatedCall is deprecated, use RNCallKeep.updateDisplay instead');

    return RNCallKeepModule.reportUpdatedCall(uuid, localizedCallerName);
  };

  _setupIOS = async (options) =>
    new Promise((resolve, reject) => {
      if (!options.appName) {
        reject('RNCallKeep.setup: option "appName" is required');
      }
      if (typeof options.appName !== 'string') {
        reject('RNCallKeep.setup: option "appName" should be of type "string"');
      }

      resolve(RNCallKeepModule.setup(options));
    });

  _setupAndroid = async (options) => {
    RNCallKeepModule.setup(options);

    if (options.selfManaged) {
      return false;
    }

    const showAccountAlert = await RNCallKeepModule.checkPhoneAccountPermission(options.additionalPermissions || []);
    const shouldOpenAccounts = await this._alert(options, showAccountAlert);

    if (shouldOpenAccounts) {
      RNCallKeepModule.openPhoneAccounts();
      return true;
    }

    return false;
  };

  _hasDefaultPhoneAccount = async (options) => {
    const hasDefault = await RNCallKeepModule.checkDefaultPhoneAccount();
    const shouldOpenAccounts = await this._alert(options, hasDefault);

    if (shouldOpenAccounts) {
      RNCallKeepModule.openPhoneAccountSettings();
    }
  };

  _alert = async (options, condition) =>
    new Promise((resolve, reject) => {
      if (!condition) {
        return resolve(false);
      }

      Alert.alert(
        options.alertTitle,
        options.alertDescription,
        [
          {
            text: options.cancelButton,
            onPress: reject,
            style: 'cancel',
          },
          { text: options.okButton, onPress: () => resolve(true) },
        ],
        { cancelable: true },
      );
    });

  backToForeground() {
    return;
  }

  getInitialEvents() {
    return RNCallKeepModule.getInitialEvents();
  }

  clearInitialEvents() {
    return RNCallKeepModule.clearInitialEvents();
  }
}

export default new RNCallKeep();
