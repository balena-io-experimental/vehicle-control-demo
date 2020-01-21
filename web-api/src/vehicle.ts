import { EventEmitter } from "events";

const can = require('socketcan');

const channel = can.createRawChannel("can0", { timestamps: true, non_block_send: true });

export const start = () => {
    channel.start();
}

type CanFrame = {
    id: number,
    data: Buffer,
};

export enum HeadlightState {
    Off = 0,
    Dipped = 1,
    Main = 2,
}

export enum IndicatorState {
    Off = 0,
    Left = 1,
    Right = 2,
    Hazard = 2,
}

export enum EmergencyState {
    Off = 0,
    On = 1,
}

export enum SirenState {
    Off = 0,
    On = 1,
}

export interface BasicVehicleState {
    headlights: HeadlightState,
    indicators: IndicatorState,
    emergency: EmergencyState,
    siren: SirenState,
}

export class BasicVehicle extends EventEmitter {
    private state: BasicVehicleState;

    public constructor() {
        super();
        this.state = {
            headlights: HeadlightState.Off,
            indicators: IndicatorState.Off,
            emergency: EmergencyState.Off,
            siren: SirenState.Off,
        };

        channel.addListener('onMessage', (msg: CanFrame) => {
            if (msg.id != 1) {
                return;
            }

            if (this.state.headlights != msg.data.readUInt8(0) ||
                this.state.indicators != msg.data.readUInt8(1) ||
                this.state.emergency != msg.data.readUInt8(2)) {
                this.state.headlights = msg.data.readUInt8(0);
                this.state.indicators = msg.data.readUInt8(1);
                this.state.emergency = msg.data.readUInt8(2);

                this.emit('updated', this.state);
            }
        });

        channel.addListener('onMessage', (msg: CanFrame) => {
            if (msg.id != 2) {
                return;
            }

            if (this.state.siren != msg.data.readUInt8(0)) {
                this.state.siren = msg.data.readUInt8(0);
                this.emit('updated', this.state);
            }
        });
    }

    protected updateVehicle(state: BasicVehicleState) {
        const lightsFrame: CanFrame = {
            id: 1,
            data: Buffer.alloc(3),
        };
        lightsFrame.data.writeUInt8(state.headlights, 0);
        lightsFrame.data.writeUInt8(state.indicators, 1);
        lightsFrame.data.writeUInt8(state.emergency, 2);

        const soundFrame: CanFrame = {
            id: 2,
            data: Buffer.alloc(1),
        };
        soundFrame.data.writeUInt8(state.siren, 0);

        channel.send(lightsFrame);
        channel.send(soundFrame);
    }

    public getState() {
        return this.state;
    }

    public setHeadlights(headlights: HeadlightState) {
        this.updateVehicle({ ...this.state, ...{ headlights } });
    }

    public setIndicators(indicators: IndicatorState) {
        this.updateVehicle({ ...this.state, ...{ indicators } });
    }

    public setEmergency(emergency: EmergencyState) {
        this.updateVehicle({ ...this.state, ...{ emergency } });
    }

    public setSiren(siren: SirenState) {
        this.updateVehicle({ ...this.state, ...{ siren } });
    }
}
