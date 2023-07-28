/**
 * @module smwebsdk
 */
import { Deferred } from './Deferred';
import { Features } from './Features';
import { SmEvent } from './SmEvent';
import { Logger, LogLevel } from './utils/Logger';
import { WebsocketResponse } from './websocket-message/index';
import { UserMedia } from './types/scene';
import { ConnectionStateTypes } from './enums/ConnectionStateTypes';
import { ConnectionState } from './ConnectionState';
export { UserMedia } from './types/scene';
export interface MessageFunction {
    (message: string): void;
}
export interface WebsocketFunction {
    (message: WebsocketResponse): void;
}
export interface SessionFunction {
    (resumeRequested: boolean, isResumedSession: boolean, server: string, sessionId: string): void;
}
export interface ConnectionStateFunction {
    (connectionState: ConnectionStateTypes): void;
}
/**
 *  Session class
 */
export declare class Session {
    private _videoElement;
    private _serverUri;
    private _connectUserText;
    private _accessToken;
    private _peerConnection;
    private _localStream;
    private _remoteStream;
    private _connectPendingRemoteStream;
    private _serverConnection;
    private _sessionId;
    private _resumeRequested;
    private _isResumedSession;
    private _outgoingQueue;
    private _server;
    private _sceneId;
    private _controlUrl;
    private _controlConnection;
    private _controlOpen;
    private _controlQueue;
    private _audioOnly;
    private _requestedUserMedia;
    private _requiredUserMedia;
    private _onConnected;
    private _onClose;
    private _onMessage;
    private _onUserText;
    private _sessionError;
    private _pendingLog;
    private _closed;
    private _shouldLogToServer;
    private _features;
    private _connectionState;
    private _logger;
    private _microphoneMuteDelay;
    private _changeUserMediaQueue;
    private _onMicrophoneActive?;
    private _onCameraActive?;
    private _removeListeners;
    private _videoOptions;
    private _audioOptions;
    constructor(videoElement: HTMLVideoElement, serverUri: string, connectUserText: string | undefined, accessToken: string, audioOnly: boolean, requestedUserMedia: UserMedia, requiredUserMedia: UserMedia, echoCancellationEnabled: boolean, logger: Logger, connectionState: ConnectionState);
    set onConnected(sessionFunction: SessionFunction);
    set onClose(closeFunction: MessageFunction);
    set onMessage(messageFunction: WebsocketFunction);
    set onUserText(userTextFunction: MessageFunction);
    /**
     * @deprecated use Scene
     */
    set loggingEnabled(enable: boolean);
    /**
     * @deprecated use Scene method
     */
    get loggingEnabled(): boolean;
    /**
     * @deprecated use Scene method
     */
    setMinLogLevel(level: LogLevel): void;
    /**
     * @deprecated use Scene method
     */
    setLogging(enable: boolean): void;
    log(text: string, level?: LogLevel): void;
    private logToServer;
    sendlogMessage(textArray: string[]): void;
    connect(userText?: string): Promise<string | undefined | any>;
    private webcamRequested;
    private micRequested;
    getMediaConstraints(requestedMedia: UserMedia, requiredMedia: UserMedia): MediaStreamConstraints;
    private buildAudioOptions;
    selectUserMedia(requestedMedia: UserMedia, requiredMedia: UserMedia, deferred: Deferred<any>, completion: (stream: MediaStream | null, deferred: Deferred<any>) => any): void;
    private getUserMediaRequiredOnlyFallback;
    private getUserMediaAudioOnlyFallback;
    private MakeErrorForUserMedia;
    private getUserMediaSuccess;
    private hasTurnServer;
    private gotMessageFromServer;
    private gotIceCandidate;
    private createdDescription;
    private onRemoteStream;
    private onConnectedSuccess;
    private onVideoLoaded;
    sendRtcEvent(name: string, body: any): void;
    sendVideoBounds(width: number, height: number): void;
    /**
     * Sends updated user camera rotation to server
     * this gives the app the chance to choose the required rotation of the user camera
     * such that it matches the devices orientation.  Values can be 0, 90, 180, 270.
     * @param rotation - The clockwise rotation in degrees of the user video feed (0, 90, 180 or 270)
     * @internal
     */
    private sendUserCamera;
    private sendCameraRotation;
    sendMessage(message: any): void;
    sendUserText(text: string): void;
    private hasCamera;
    private hasMicrophone;
    private makeUserMedia;
    private findSenderTrackByKind;
    private findSenderByKind;
    private processChangeUserMediaQueue;
    private changeUserMediaInternal;
    private updateSenderTrack;
    private getTrackByKind;
    private isSenderTrackEnabled;
    isMicrophoneActive(): boolean;
    isCameraActive(): boolean;
    setMediaDeviceActive({ microphone, camera, }: {
        microphone?: boolean;
        camera?: boolean;
    }): Promise<void>;
    close(sendRtcClose?: boolean, reason?: string, deferred?: Deferred<any>): void;
    private createOffer;
    private setRemoteDescription;
    private setLocalDescription;
    private createAnswer;
    get peerConnection(): RTCPeerConnection | null;
    get serverConnection(): WebSocket;
    get sessionId(): string;
    get server(): string;
    get sceneId(): number;
    get isMicrophoneConnected(): boolean;
    get isCameraConnected(): boolean;
    get features(): Features;
    get microphoneMuteDelay(): number;
    get userMediaStream(): MediaStream | null;
    get microphoneMuted(): boolean;
    set microphoneMuted(mute: boolean);
    get webcamMuted(): boolean;
    set webcamMuted(mute: boolean);
    get offsetX(): number;
    get offsetY(): number;
    set microphoneActiveCallbacks(callbacks: SmEvent);
    set cameraActiveCallbacks(callbacks: SmEvent);
}
//# sourceMappingURL=Session.d.ts.map