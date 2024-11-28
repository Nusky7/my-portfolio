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
      // audio.src = `https://nusky7studio.es/mp3/${songFile}`;
      audio.src = `/mp3/${songFile}`;
      title = document.getElementById('song-title');
      title.textContent = songTitle;

      if (currentPlayingButton) {
        currentPlayingButton.classList.remove(
          'font-semibold', 'animate-glowText', 
          'animate-flashSlow', 'text-green-200',  
          'drop-shadow-lg'
        );
      }
  
      currentPlayingButton = button;
      console.log(currentPlayingButton);
      button.classList.add('animate-glowText', 'font-semibold',  'text-green-200',  'drop-shadow-lg', 'important');
      title.classList.add('animate-glowText', 'text-green-300');
  
      audio.load();
      audio.addEventListener('canplay', () => {
        if (!wavesurfer.isReady) {
          wavesurfer.load(audio.src);
        }
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
        currentPlayingButton.classList.remove('animate-glowText', 'text-green-200');
        title.classList.remove('animate-glowText', 'text-green-300');
        title.classList.add('text-violet-300');
      }
      wavesurfer.stop();
    });

  audio.addEventListener('pause', () => {
      if (currentPlayingButton) {
        currentPlayingButton.classList.remove('animate-glowText', 'text-green-200', 'drop-shadow-sm');
        title.classList.remove('animate-glowText', 'text-green-300');
        title.classList.add('text-violet-300');
        currentPlayingButton.classList.add('animate-flashSlow');
      }
      wavesurfer.pause();
    });
    audio.addEventListener('play', () => {
      if (currentPlayingButton) {
        currentPlayingButton.classList.add('animate-glowText', 'text-green-200');
        currentPlayingButton.classList.remove('animate-flashSlow');
        title.classList.remove('text-violet-300');
        title.classList.add('animate-glowText', 'text-green-300');
       

        
      }
      wavesurfer.play();
    });
  });

