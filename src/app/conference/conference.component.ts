import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-conference',
  templateUrl: './conference.component.html',
  styleUrl: './conference.component.css'
})
export class ConferenceComponent implements OnInit, AfterViewInit {
  domain: string = 'meet.jit.si';
  room: any;
  user: any
  api: any;
  options: any;

  // Custom controls
  isAudioMuted = true;
  isVideoMuted = true;

  constructor() { }

  ngOnInit(): void {
    this.room = 'ms-meet-conference';
    this.user = {
      name: 'Sidó Norbert'
    }
  }
  ngAfterViewInit(): void {
    this.options = {
      roomName: this.room,
      width: 900,
      height: 700,
      configOverwrite: {
        prejoinPageEnabled: true
      },
      interfaceConfigOverwrite: {
        TILE_VIEW_MAX_COLUMNS: 6,
        isAudioMuted: true,
        isVideoMuted: true,
      },
      parentNode: document.querySelector('#jitsi-iframe'),
      userInfo: {
        displayName: this.user.name,
      }
    };

    this.api = new JitsiMeetExternalAPI(this.domain, this.options);

    this.api.addEventListeners({
      readyToClose: this.handleClose,
      participantLeft: this.handleParticipantLeft,
      participantJoined: this.handleParticipantJoined,
      videoConferenceJoined: this.handleVideoConferenceJoined,
      videoConferenceLeft: this.handleVideoConferenceLeft,
      audioMuteStatusChanged: this.handleMuteStatus,
      videoMuteStatusChanged: this.handleVideoStatus
    });
  }
  
  // Events settings
  handleClose() {
    console.log('A videókonferencia bezárásra kerül!');
  }
  async handleParticipantLeft(participant: any) {
    try {
      const data = await this.getParticipants()
    }
    catch (error) {
      console.error(error)
    }
  }
  
  async handleParticipantJoined(participant: any) {
    try {
      const data = await this.getParticipants()
    }    
    catch (error) {
      console.error(error)
    }
  }
  async handleVideoConferenceJoined() {
    try {
      const data = await this.getParticipants()
    }
    catch (error) {
      console.error(error)
    }
  }
  handleVideoConferenceLeft() {
    console.log('Kiléptél a konferenciából!')
  }
  handleMuteStatus() {
    console.log('A hang némítási állapota megváltozott!')
  }
  handleVideoStatus() {
    console.log('A videó némítási állapota megváltozott!')
  }

  async getParticipants() {
    try {
      await new Promise(res => setTimeout(res, 500));
      return await this.api.getParticipants();
  }
    catch(error) {
      console.error(error)
    }
  }

  // Custom controls
  executeCommand(command: string) {
    this.api.executeCommand(command);;
    if (command == 'hangup') {
      alert('Köszönjük hogy rész vettél!');
      return;
    }

    if (command == 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
    }

    if (command == 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
    }
  }
}
