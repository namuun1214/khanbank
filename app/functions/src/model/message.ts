export class Messaging {
    title: string;
    body: string;
    sound: string;
    channel_id: string;
    android_channel_id: string;
  
    constructor(title: string, body: string, sound = 'default') {
      this.title = title ?? '';
      this.body = body ?? '';
      this.sound = sound;
      this.channel_id = 'androidChannel';
      this.android_channel_id = 'androidChannel';
    }
  }
  