document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('audio');
  
    const wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'rgb(170, 248, 212)', 
      progressColor: 'rgb(60,179,113 )',
      backgroundColor: 'rgb(0,0,0)',
      barWidth: 4,
      barGap: 3, 
      barRadius: 9,
      height: 128, 
      responsive: false,
      backend: 'MediaElement',
      mediaControls: false, 
      media: audio, 
    });

    let currentPlayingButton = null;
  
    function playSong(songFile, songTitle, button) {
      audio.src = `https://nusky7studio.es/portfolio/mp3/${songFile}`;
      // audio.src = `/mp3/${songFile}`;
      title = document.getElementById('song-title');
      title.textContent = songTitle;

      if (currentPlayingButton) {
        currentPlayingButton.classList.remove('animate-glowText');
      }
  
      currentPlayingButton = button;
      button.classList.add('animate-glowText');
      title.classList.add('animate-glowText');
  
      audio.load();
      audio.addEventListener('canplay', () => {
        wavesurfer.load(audio);
        audio.play();
      });
    }
  
    document.querySelectorAll('.audio-controls button').forEach((button) => {
      button.addEventListener('click', () => {
        const songFile = button.getAttribute('data-file');
        const songTitle = button.textContent.trim();
        playSong(songFile, songTitle, button);
      });
    });
    audio.addEventListener('play', () => wavesurfer.play());
    audio.addEventListener('pause', () => wavesurfer.pause());
  
    audio.addEventListener('ended', () => {
      if (currentPlayingButton) {
        currentPlayingButton.classList.remove('animate-glowText');
        title.classList.remove('animate-glowText');
        
      }
      wavesurfer.stop();
      audio.stop();
    });
  });


//   𝙍𝙀𝙏𝙍𝙊 𝙉𝙄𝙂𝙃𝙏𝙎𝘾𝘼𝙋𝙀 Synthwave album from the 80-s
  