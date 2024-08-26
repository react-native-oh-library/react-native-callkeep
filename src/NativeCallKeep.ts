import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';


type NativeEvents = {
    didReceiveStartCallAction: 'RNCallKeepDidReceiveStartCallAction';
    answerCall: 'RNCallKeepPerformAnswerCallAction';
    endCall: 'RNCallKeepPerformEndCallAction';
    didActivateAudioSession: 'RNCallKeepDidActivateAudioSession';
    didDeactivateAudioSession: 'RNCallKeepDidDeactivateAudioSession';
    didDisplayIncomingCall: 'RNCallKeepDidDisplayIncomingCall';
    didPerformSetMutedCallAction: 'RNCallKeepDidPerformSetMutedCallAction';
    didToggleHoldCallAction: 'RNCallKeepDidToggleHoldAction';
    didChangeAudioRoute: 'RNCallKeepDidChangeAudioRoute';
    didPerformDTMFAction: 'RNCallKeepDidPerformDTMFAction';
    showIncomingCallUi: 'RNCallKeepShowIncomingCallUi';
    silenceIncomingCall: 'RNCallKeepOnSilenceIncomingCall';
    createIncomingConnectionFailed: 'RNCallKeepOnIncomingConnectionFailed';
    checkReachability: 'RNCallKeepCheckReachability';
    didResetProvider: 'RNCallKeepProviderReset';
    didLoadWithEvents: 'RNCallKeepDidLoadWithEvents';
    onHasActiveCall: 'onHasActiveCall';
}

type InitialEvents = Array<{
    [Event in Events]: { name: NativeEvents[Event], data: EventsPayload[Event] }
}[Events]>

type Events = 'didReceiveStartCallAction' | 'answerCall' | 'endCall' | 'didActivateAudioSession'
    | 'didDeactivateAudioSession' | 'didDisplayIncomingCall' | 'didPerformSetMutedCallAction' | 'didToggleHoldCallAction'
    | 'didChangeAudioRoute' | 'didPerformDTMFAction' | 'showIncomingCallUi' | 'silenceIncomingCall' | 'createIncomingConnectionFailed'
    | 'checkReachability' | 'didResetProvider' | 'didLoadWithEvents' | 'onHasActiveCall';
type EventsPayload = {
    didReceiveStartCallAction: { handle: string, callUUID?: string, name?: string };
    answerCall: { callUUID: string };
    endCall: { callUUID: string };
    didActivateAudioSession: undefined;
    didDeactivateAudioSession: undefined;
    didDisplayIncomingCall: {
        error?: string,
        errorCode?: 'Unentitled' | 'CallUUIDAlreadyExists' | 'FilteredByDoNotDisturb' | 'FilteredByBlockList' | 'Unknown',
        callUUID: string,
        handle: string,
        localizedCallerName: string,
        hasVideo: '1' | '0',
        fromPushKit: '1' | '0',
        payload: object,
    };
    didPerformSetMutedCallAction: { muted: boolean, callUUID: string };
    didToggleHoldCallAction: { hold: boolean, callUUID: string };
    didChangeAudioRoute: {
        output: string,
        reason?: number,
        handle?: string,
        callUUID?: string,
    };
    didPerformDTMFAction: { digits: string, callUUID: string };
    showIncomingCallUi: { handle: string, callUUID: string, name: string };
    silenceIncomingCall: { handle: string, callUUID: string, name: string };
    createIncomingConnectionFailed: { handle: string, callUUID: string, name: string };
    checkReachability: undefined;
    didResetProvider: undefined;
    didLoadWithEvents: InitialEvents;
    onHasActiveCall: undefined;
}

type HandleType = 'generic' | 'number' | 'email';

type AudioRoute = {
    name: string,
    type: string,
    selected?: boolean
}

enum AudioSessionCategoryOption {
    mixWithOthers = 0x1,
    duckOthers = 0x2,
    interruptSpokenAudioAndMixWithOthers = 0x11,
    allowBluetooth = 0x4,
    allowBluetoothA2DP = 0x20,
    allowAirPlay = 0x40,
    defaultToSpeaker = 0x8,
    overrideMutedMicrophoneInterruption = 0x80,
}

enum AudioSessionMode {
    default = 'AVAudioSessionModeDefault',
    gameChat = 'AVAudioSessionModeGameChat',
    measurement = 'AVAudioSessionModeMeasurement',
    moviePlayback = 'AVAudioSessionModeMoviePlayback',
    spokenAudio = 'AVAudioSessionModeSpokenAudio',
    videoChat = 'AVAudioSessionModeVideoChat',
    videoRecording = 'AVAudioSessionModeVideoRecording',
    voiceChat = 'AVAudioSessionModeVoiceChat',
    voicePrompt = 'AVAudioSessionModeVoicePrompt',
}

interface IOptions {
    ios: {
        appName: string,
        imageName?: string,
        supportsVideo?: boolean,
        maximumCallGroups?: string,
        maximumCallsPerCallGroup?: string,
        ringtoneSound?: string,
        includesCallsInRecents?: boolean
        audioSession?: {
            categoryOptions?: AudioSessionCategoryOption | number,
            mode?: AudioSessionMode | string,
        }
    },
    android: {
        alertTitle: string,
        alertDescription: string,
        cancelButton: string,
        okButton: string,
        imageName?: string,
        additionalPermissions: string[],
        selfManaged?: boolean,
        foregroundService?: {
            channelId: string,
            channelName: string,
            notificationTitle: string,
            notificationIcon?: string
        }
    }
}

const CONSTANTS = {
    END_CALL_REASONS: {
        FAILED: 1,
        REMOTE_ENDED: 2,
        UNANSWERED: 3,
        ANSWERED_ELSEWHERE: 4,
        DECLINED_ELSEWHERE: 5 | 2,
        MISSED: 2 | 6
    }
};

interface EventListener {
    remove(): void
}

export interface Spec extends TurboModule {
    getInitialEvents(): Promise<InitialEvents>

    clearInitialEvents(): void

    removeEventListener(type: Events): void

    setup(options: IOptions): Promise<boolean>

    hasDefaultPhoneAccount(): boolean

    answerIncomingCall(uuid: string): void

    registerPhoneAccount(options: IOptions): void

    registerAndroidEvents(): void

    unregisterAndroidEvents(): void

    displayIncomingCall(
        uuid: string,
        handle: string,
        localizedCallerName?: string,
        handleType?: HandleType,
        hasVideo?: boolean,
        options?: IOptions,
    ): void

    startCall(
        uuid: string,
        handle: string,
        contactIdentifier?: string,
        handleType?: HandleType,
        hasVideo?: boolean,
    ): void

    updateDisplay(
        uuid: string,
        displayName: string,
        handle: string,
        options?: IOptions,
    ): void

    checkPhoneAccountEnabled(): Promise<boolean>;

    isConnectionServiceAvailable(): Promise<boolean>;

    reportEndCallWithUUID(uuid: string, reason: number): void

    rejectCall(uuid: string): void

    endCall(uuid: string, handle: string): void

    endAllCalls(): void

    setReachable(): void

    setSettings(settings: IOptions): void;

    /**
     * @description isCallActive method is available only on iOS.
     */
    isCallActive(uuid: string): Promise<boolean>

    getCalls(): Promise<{
        callUUID: string,
        hasConnected: boolean,
        hasEnded: boolean,
        onHold: boolean,
        outgoing: boolean
    }[] | void>

    getAudioRoutes(): Promise<void>

    setAudioRoute: (uuid: string, inputName: string) => Promise<void>

    /**
     * @description supportConnectionService method is available only on Android.
     */
    supportConnectionService(): boolean

    /**
     * @description hasPhoneAccount method is available only on Android.
     */
    hasPhoneAccount(): Promise<boolean>

    hasOutgoingCall(): Promise<boolean>

    /**
     * @description setMutedCall method is available only on iOS.
     */
    setMutedCall(uuid: string, muted: boolean): void

    /**
     * @description toggleAudioRouteSpeaker method is available only on Android.
     * @param uuid
     * @param routeSpeaker
     */
    toggleAudioRouteSpeaker(uuid: string, routeSpeaker: boolean): void

    setOnHold(uuid: string, held: boolean): void

    setConnectionState(uuid: string, state: number): void

    /**
     * @descriptions sendDTMF is used to send DTMF tones to the PBX.
     */
    sendDTMF(uuid: string, key: string): void

    checkIfBusy(): Promise<boolean>

    checkSpeaker(): Promise<boolean>

    /**
     * @description setAvailable method is available only on Android.
     */
    setAvailable(active: boolean): void

    setForegroundServiceSettings(settings: IOptions): void

    canMakeMultipleCalls(allow: boolean): void

    setCurrentCallActive(callUUID: string): void

    backToForeground(): void

    /**
     * @descriptions Android Only, Check if there is active native call
     */
    checkIsInManagedCall(): Promise<boolean>
}

export default TurboModuleRegistry.get<Spec>('CallKeepNativeModule') as Spec | null;