document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('audio');
  let currentPlayingButton = null;
  let currentIndex = 0;
  let title = document.getElementById('song-title');

  const playlist = [
    { file: "lowx.mp3" },
    { file: "c152.mp3" },
    { file: "amiga.mp3" },
    { file: "duneRiders.mp3" },
    { file: "havoc.mp3" },
    { file: "proxima.mp3" },
    { file: "destination.mp3" },
    { file: "retroSynth.mp3" },
    { file: "perpetual.mp3" },
    { file: "aloneTogether.mp3" },
    { file: "mountains.mp3" },
    { file: "release.mp3" },
    { file: "egerie.mp3" },
    { file: "euphorie.mp3" },
    { file: "memoryReboot.mp3" },
    { file: "fearless.mp3" },
   
    { file: "prag.mp3" },
    { file: "eyeShut.mp3" },
    { file: "urban.mp3" }
   
  ];


  const waveSurferInstances = new Map();

  function createWaveformContainer(index) {
    const container = document.createElement('div');
    container.id = `waveform-${index}`;
    container.style.display = 'none'; 
    document.getElementById('waveform').appendChild(container);
    return container;
  }

  // Precargar ondas
  playlist.forEach((song, index) => {
    const container = createWaveformContainer(index); 

    const waveInstance = WaveSurfer.create({
      container: container, 
      waveColor: 'rgb(170, 248, 212)',
      progressColor: 'rgb(60,179,113)',
      backgroundColor: 'rgb(0,0,0)',
      barWidth: 4,
      barGap: 3,
      barRadius: 9,
      height: 128,
      responsive: false,
      backend: 'MediaElement',
      media: audio, 
    });

    // Precargar audio
    waveInstance.load(`/mp3/${song.file}`);
    waveSurferInstances.set(song.file, waveInstance);
  });

  function playSong(songFile, button) {
    waveSurferInstances.forEach((instance, file) => {
      if (file !== songFile) instance.stop();
    });

    document.querySelectorAll('[id^="waveform-"]').forEach((container) => {
      container.style.display = 'none';
    });

    const waveContainer = document.getElementById(`waveform-${currentIndex}`);
    waveContainer.style.display = 'block'; 

    audio.src = `/mp3/${songFile}`;
    audio.load();

    const songTitle = button.textContent.trim();
    title.textContent = songTitle;

    if (currentPlayingButton) {
      currentPlayingButton.classList.remove('animate-glowGreenShadowCycle', 'animate-flashSlow', 'drop-shadow-xl');
    }
    currentPlayingButton = button;
    button.classList.add('animate-glowGreenShadowCycle', 'drop-shadow-xl');
    title.classList.add('animate-glowText', 'text-green-300');

    const waveInstance = waveSurferInstances.get(songFile);
    if (waveInstance) {
      audio.play();
    }
  }

  function playNext() {
    currentIndex = (currentIndex + 1) % playlist.length;
    const nextSong = playlist[currentIndex];
    const buttons = document.querySelectorAll('.audio-controls button');
    playSong(nextSong.file, buttons[currentIndex]);
  }

  document.querySelectorAll('.audio-controls button').forEach((button, index) => {
    button.addEventListener('click', () => {
      currentIndex = index;
      const songFile = playlist[index].file;
      playSong(songFile, button);
    });
  });

  audio.addEventListener('play', () => {
    currentPlayingButton.classList.add('animate-glowGreenShadowCycle', 'drop-shadow-xl');
    currentPlayingButton.classList.remove('animate-flashSlow');
    title.classList.add('text-green-300', 'animate-glowText');
    title.classList.remove('text-violet-300');
    const waveInstance = waveSurferInstances.get(playlist[currentIndex].file);
    if (waveInstance) waveInstance.play();
  });

  audio.addEventListener('pause', () => {
    title.classList.remove('text-green-300', 'animate-glowText');
    title.classList.add('text-violet-300');
    currentPlayingButton.classList.remove('animate-glowGreenShadowCycle', 'drop-shadow-xl');
    currentPlayingButton.classList.add('animate-flashSlow');
    const waveInstance = waveSurferInstances.get(playlist[currentIndex].file);
    if (waveInstance) waveInstance.pause();
    
  });

  audio.addEventListener('ended', playNext);
});
