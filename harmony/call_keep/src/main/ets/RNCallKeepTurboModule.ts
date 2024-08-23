/**
 * MIT License
 *
 * Copyright (C) 2024 Huawei Device Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */


import { RNOHLogger, TurboModule } from '@rnoh/react-native-openharmony/ts';
import { TM } from '@rnoh/react-native-openharmony/generated/ts';
import { call } from '@kit.TelephonyKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { Context } from '@kit.AbilityKit';
import { voipCall } from '@kit.CallKit';
import { avSession } from '@kit.AVSessionKit';
import { audio } from '@kit.AudioKit';
import { promptAction } from '@kit.ArkUI';


const LOGGER_NAME = 'RNCallKeepTurboModule';


export class RNCallKeepTurboModule extends TurboModule implements TM.CallKeepNativeModule.Spec {
  public logger: RNOHLogger;
  public context: Context;
  voipCallState: voipCall.VoipCallState =
    voipCall.VoipCallState.VOIP_CALL_STATE_IDLE;
  session: avSession.AVSession | undefined;
  audioRenderer: audio.AudioRenderer | undefined = undefined;
  mapController: any;


  constructor(ctx) {
    super(ctx);
    this.logger = this.ctx.logger.clone(LOGGER_NAME)
    this.context = this.ctx.uiAbilityContext;
  }

  /**
   * 拨打电话 ALL
   */
  startCall(uuid: string, number: string, contactIdentifier: string, handleType: string,
    hasVideo: boolean): void {
    this.logger.info("uuid :" + uuid + ", handle :" + number + ", contactIdentifier : " + contactIdentifier +
      ", handleType :" + handleType + ", hasVideo :" + hasVideo);
    // 调用查询能力接口
    let isSupport = call.hasVoiceCapability();
    if (isSupport) {
      call.makeCall(number).then(() => {
        this.logger.info(`makeCall success`);
      }).catch((err: BusinessError) => {
        this.logger.error(`makeCall fail, promise: err->${JSON.stringify(err)}`);
      });
    }
  }

  /**
   *
   * @param uuid 唯一标识
   * @returns 判断当前电话是否已接通，仅当电话存在且用户已接听电话时，才会返回 true
   * IOS
   */
  isCallActive(uuid: string): Promise<boolean> {
    let callState: call.CallState = call.getCallStateSync();
    this.logger.info(`the call state is:` + callState);
    if (call.CallState.CALL_STATE_OFFHOOK == callState
      || call.CallState.CALL_STATE_ANSWERED == callState) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  }

  /**
   * 判断当前是否有通话存在
   * @returns
   */
  checkIfBusy(): Promise<boolean> {
    try {
      let hasCall: boolean = call.hasCallSync();
      this.logger.info(`hasCallSync  has call is ` + hasCall);
      return Promise.resolve(hasCall);
    } catch (exception) {
      this.logger.error(`checkIfBusy fail, promise: err->${JSON.stringify(exception)}`);
    }
  }

  async displayIncomingCall(uuid: string, handle: string, localizedCallerName: string, handleType: string,
    hasVideo: boolean,
    options: TM.CallKeepNativeModule.IOptions): Promise<void> {
    try {
      promptAction.showToast({
        message: 'current method is not supported..',
        duration: 1000
      });
    } catch (e) {
      throw new Error('Method not implemented.');
    }
  }

  endCall(uuid: string): void {
    try {
      promptAction.showToast({
        message: 'current method is not supported..',
        duration: 1000
      });
    } catch (e) {
      throw new Error('Method not implemented.');
    }
  }

  rejectCall(uuid: string): void {
    try {
      promptAction.showToast({
        message: 'current method is not supported..',
        duration: 1000
      });
    } catch (e) {
      throw new Error('Method not implemented.');
    }
  }

  getCalls(): Promise<{
    callUUID: string;
    hasConnected: boolean;
    hasEnded: boolean;
    onHold: boolean;
    outgoing: boolean;
  }[] | null> {
    throw new Error('Method not implemented.');
  }

  updateDisplay(uuid: string, displayName: string, handle: string,
    options: TM.CallKeepNativeModule.IOptions): void {
    try {
      promptAction.showToast({
        message: 'current method is not supported..',
        duration: 1000
      });
    } catch (e) {
      throw new Error('Method not implemented.');
    }
  }

  supportConnectionService(): boolean {
    return true;
  }

  checkSpeaker(): Promise<boolean> {
    return Promise.resolve(false);
  }

  getAudioRoutes(): Promise<void> {
    return Promise.resolve(null);
  }

  getInitialEvents(): Promise<unknown[]> {
    return Promise.resolve(null);
  }

  clearInitialEvents(): void {
    try {
      promptAction.showToast({
        message: 'current method is not supported..',
        duration: 1000
      });
    } catch (e) {
      throw new Error('Method not implemented.');
    }
  }

  removeEventListener(type: string): void {
    try {
      promptAction.showToast({
        message: 'current method is not supported..',
        duration: 1000
      });
    } catch (e) {
      throw new Error('Method not implemented.');
    }
  }

  setup(options: TM.CallKeepNativeModule.IOptions): Promise<boolean> {
    return Promise.resolve(false);
  }

  hasDefaultPhoneAccount(): boolean {
    return false;
  }

  answerIncomingCall(uuid: string): void {
    try {
      promptAction.showToast({
        message: 'current method is not supported..',
        duration: 1000
      });
    } catch (e) {
      throw new Error('Method not implemented.');
    }
  }

  registerPhoneAccount(options: TM.CallKeepNativeModule.IOptions): void {
    try {
      promptAction.showToast({
        message: 'current method is not supported..',
        duration: 1000
      });
    } catch (e) {
      throw new Error('Method not implemented.');
    }
  }

  registerAndroidEvents(): void {
    try {
      promptAction.showToast({
        message: 'current method is not supported..',
        duration: 1000
      });
    } catch (e) {
      throw new Error('Method not implemented.');
    }
  }

  unregisterAndroidEvents(): void {
    try {
      promptAction.showToast({
        message: 'current method is not supported..',
        duration: 1000
      });
    } catch (e) {
      throw new Error('Method not implemented.');
    }
  }

  checkPhoneAccountEnabled(): Promise<boolean> {
    return Promise.resolve(false);
  }

  isConnectionServiceAvailable(): Promise<boolean> {
    return Promise.resolve(false);
  }

  reportEndCallWithUUID(uuid: string, reason: number): void {
    try {
      promptAction.showToast({
        message: 'current method is not supported..',
        duration: 1000
      });
    } catch (e) {
      throw new Error('Method not implemented.');
    }
  }

  endAllCalls(): void {
    try {
      promptAction.showToast({
        message: 'current method is not supported..',
        duration: 1000
      });
    } catch (e) {
      throw new Error('Method not implemented.');
    }
  }

  setReachable(): void {
    try {
      promptAction.showToast({
        message: 'current method is not supported..',
        duration: 1000
      });
    } catch (e) {
      throw new Error('Method not implemented.');
    }
  }

  setAudioRoute(uuid: string, inputName: string): Promise<void> {
    return Promise.resolve();
  }

  hasPhoneAccount(): Promise<boolean> {
    return Promise.resolve(false);
  }

  hasOutgoingCall(): Promise<boolean> {
    return Promise.resolve(false);
  }

  setMutedCall(uuid: string, muted: boolean): void {
    try {
      promptAction.showToast({
        message: 'current method is not supported..',
        duration: 1000
      });
    } catch (e) {
      throw new Error('Method not implemented.');
    }
  }

  toggleAudioRouteSpeaker(uuid: string, routeSpeaker: boolean): void {
    try {
      promptAction.showToast({
        message: 'current method is not supported..',
        duration: 1000
      });
    } catch (e) {
      throw new Error('Method not implemented.');
    }
  }

  setOnHold(uuid: string, held: boolean): void {
    try {
      promptAction.showToast({
        message: 'current method is not supported..',
        duration: 1000
      });
    } catch (e) {
      throw new Error('Method not implemented.');
    }
  }

  setSettings(settings: TM.CallKeepNativeModule.IOptions): void {
    try {
      promptAction.showToast({
        message: 'current method is not supported..',
        duration: 1000
      });
    } catch (e) {
      throw new Error('Method not implemented.');
    }
  }

  setConnectionState(uuid: string, state: number): void {
    try {
      promptAction.showToast({
        message: 'current method is not supported..',
        duration: 1000
      });
    } catch (e) {
      throw new Error('Method not implemented.');
    }
  }

  sendDTMF(uuid: string, key: string): void {
    try {
      promptAction.showToast({
        message: 'current method is not supported..',
        duration: 1000
      });
    } catch (e) {
      throw new Error('Method not implemented.');
    }
  }

  setAvailable(active: boolean): void {
    try {
      promptAction.showToast({
        message: 'current method is not supported..',
        duration: 1000
      });
    } catch (e) {
      throw new Error('Method not implemented.');
    }
  }

  setForegroundServiceSettings(settings: TM.CallKeepNativeModule.IOptions): void {
    try {
      promptAction.showToast({
        message: 'current method is not supported..',
        duration: 1000
      });
    } catch (e) {
      throw new Error('Method not implemented.');
    }
  }

  canMakeMultipleCalls(allow: boolean): void {
    try {
      promptAction.showToast({
        message: 'current method is not supported..',
        duration: 1000
      });
    } catch (e) {
      throw new Error('Method not implemented.');
    }
  }

  setCurrentCallActive(callUUID: string): void {
    try {
      promptAction.showToast({
        message: 'current method is not supported..',
        duration: 1000
      });
    } catch (e) {
      throw new Error('Method not implemented.');
    }
  }

  backToForeground(): void {
    try {
      promptAction.showToast({
        message: 'current method is not supported..',
        duration: 1000
      });
    } catch (e) {
      throw new Error('Method not implemented.');
    }
  }

  checkIsInManagedCall(): Promise<boolean> {
    return Promise.resolve(false);
  }
}

