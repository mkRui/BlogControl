import { notification, message } from 'antd';

export function random (min: number, max: number):number {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function messageTip (type: string, title: string, content: string):void {
    notification[type]({
        message: title,
        description: content
    });
}
