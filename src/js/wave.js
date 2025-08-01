// import WaveSurfer from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js'

// document.addEventListener('DOMContentLoaded', () => {
//   const audio = document.getElementById('audio');
//   let currentPlayingButton = null;
//   let currentIndex = 0;
//   let title = document.getElementById('song-title');

//   // const playlist = [
//   //   { file: "zenithGlow.mp3" },
//   //   { file: "ciberVibes.mp3" },
//   //   { file: "lowx.mp3" },
//   //   { file: "c152.mp3" },
//   //   { file: "amiga.mp3" },
//   //   { file: "duneRiders.mp3" },
//   //   { file: "havoc.mp3" },
//   //   { file: "proxima.mp3" },
//   //   { file: "destination.mp3" },
//   //   { file: "retroSynth.mp3" },
//   //   { file: "perpetual.mp3" },
//   //   { file: "aloneTogether.mp3" },
//   //   { file: "mountains.mp3" },
//   //   { file: "release.mp3" },
//   //   { file: "egerie.mp3" },
//   //   { file: "euphorie.mp3" },
//   //   { file: "memoryReboot.mp3" },
//   //   { file: "fearless.mp3" }
//   // ];

//   fetch('../locales/songs.json')
//   .then(res => res.json())
//   .then((songs) => {
//     const controls = document.querySelector('.audio-controls');
//     songs.forEach((song, index) => {
//       const btn = document.createElement('button');
//       btn.textContent = song.title;
//       btn.dataset.file = song.file;
//       btn.className = `song-btn mx-2 py-3 rounded-lg font-orbi ${song.color}`;
//       btn.addEventListener('click', () => {
//         currentIndex = index;
//         playSong(song.file, btn);
//       });
//       controls.appendChild(btn);
//       controls.appendChild(document.createElement('hr')).className = "border-gray-700/60";
//     });
//   });


//   const waveSurferInstances = new Map();

//   function createWaveformContainer(index) {
//     const container = document.createElement('div');
//     container.id = `waveform-${index}`;
//     container.style.display = 'none';
//     document.getElementById('waveform').appendChild(container);
//     return container;
//   }

//   function playSong(songFile, button) {
//     // Detener todas las otras ondas si están activas
//     waveSurferInstances.forEach((instance, file) => {
//       if (file !== songFile) instance.stop();
//     });
  
//     // Ocultar todas las ondas previas
//     document.querySelectorAll('[id^="waveform-"]').forEach((container) => {
//       container.style.display = 'none';
//     });
  
//     // Mostrar contenedor correcto
//     let waveformDiv = document.getElementById(`waveform-${currentIndex}`);
//     if (!waveformDiv) {
//       waveformDiv = createWaveformContainer(currentIndex);
//     }
//     waveformDiv.style.display = 'block';
  
//     // Cambiar título
//     const songTitle = button.textContent.trim();
//     title.textContent = songTitle;
  
//     // Cambiar estilo visual del botón
//     if (currentPlayingButton) {
//       currentPlayingButton.classList.remove(
//         'animate-glowGreenShadowCycle',
//         'animate-flashSlow',
//         'drop-shadow-xl'
//       );
//     }
//     currentPlayingButton = button;
//     button.classList.add('animate-glowGreenShadowCycle', 'drop-shadow-xl');
//     title.classList.add('animate-glowText', 'text-green-300');
  
//     // Verificar si ya existe la onda para este archivo
//     let waveInstance = waveSurferInstances.get(songFile);
//     if (!waveInstance) {
//       waveInstance = WaveSurfer.create({
//         container: waveformDiv,
//         waveColor: 'rgb(170, 248, 212)',
//         progressColor: 'rgb(60,179,113)',
//         backgroundColor: 'rgb(0,0,0)',
//         barWidth: 4,
//         barGap: 3,
//         barRadius: 9,
//         height: 128,
//         responsive: false,
//         backend: 'MediaElement',
//         media: audio,
//       });
  
//       waveSurferInstances.set(songFile, waveInstance);
  
//       // Esperar a que la onda esté lista
//       waveInstance.once('ready', () => {
//         audio.play();
//       });
  
//       waveInstance.load(`/mp3/${songFile}`);
//     } else {
//       // Si ya existe reproducir
//       audio.src = `/mp3/${songFile}`;
//       audio.load();
//       audio.play();
//     }
//   }
  

//   function playNext() {
//     currentIndex = (currentIndex + 1) % playlist.length;
//     const nextSong = playlist[currentIndex];
//     const buttons = document.querySelectorAll('.audio-controls button');
//     playSong(nextSong.file, buttons[currentIndex]);
//   }

//   document.querySelectorAll('.audio-controls button').forEach((button, index) => {
//     button.addEventListener('click', () => {
//       currentIndex = index;
//       const songFile = playlist[index].file;
//       playSong(songFile, button);
//     });
//   });

//   audio.addEventListener('play', () => {
//     currentPlayingButton.classList.add('animate-glowGreenShadowCycle', 'drop-shadow-xl');
//     currentPlayingButton.classList.remove('animate-flashSlow');
//     title.classList.add('text-green-300', 'animate-glowText');
//     title.classList.remove('text-violet-300');
//     const waveInstance = waveSurferInstances.get(playlist[currentIndex].file);
//     if (waveInstance) waveInstance.play();
//   });

//   audio.addEventListener('pause', () => {
//     title.classList.remove('text-green-300', 'animate-glowText');
//     title.classList.add('text-violet-300');
//     currentPlayingButton.classList.remove('animate-glowGreenShadowCycle', 'drop-shadow-xl');
//     currentPlayingButton.classList.add('animate-flashSlow');
//     const waveInstance = waveSurferInstances.get(playlist[currentIndex].file);
//     if (waveInstance) waveInstance.pause();
    
//   });

//   audio.addEventListener('ended', playNext);
// });


import WaveSurfer from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js'

document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('audio');
  const title = document.getElementById('song-title');
  const controls = document.querySelector('.audio-controls');
  const waveSurferInstances = new Map();
  let currentPlayingButton = null;
  let currentIndex = 0;
  let playlist = [];

  fetch('../locales/songs.json')
    .then(res => res.json())
    .then((songs) => {
      playlist = songs;
      songs.forEach((song, index) => {
        const btn = document.createElement('button');
        btn.textContent = song.title;
        btn.dataset.file = song.file;
        btn.className = `song-btn mx-2 py-3 rounded-lg font-orbi ${song.color}`;
        btn.addEventListener('click', () => {
          currentIndex = index;
          playSong(song.file, btn);
        });
        controls.appendChild(btn);
        const hr = document.createElement('hr');
        hr.className = "border-gray-700/60";
        controls.appendChild(hr);
      });
    });

  function createWaveformContainer(index) {
    const container = document.createElement('div');
    container.id = `waveform-${index}`;
    container.style.display = 'none';
    document.getElementById('waveform').appendChild(container);
    return container;
  }

  function playSong(songFile, button) {
    waveSurferInstances.forEach((instance, file) => {
      if (file !== songFile) instance.stop();
    });

    document.querySelectorAll('[id^="waveform-"]').forEach((container) => {
      container.style.display = 'none';
    });

    let waveformDiv = document.getElementById(`waveform-${currentIndex}`);
    if (!waveformDiv) {
      waveformDiv = createWaveformContainer(currentIndex);
    }
    waveformDiv.style.display = 'block';

    const songTitle = button.textContent.trim();
    title.textContent = songTitle;

    if (currentPlayingButton) {
      currentPlayingButton.classList.remove('animate-glowGreenShadowCycle', 'animate-flashSlow', 'drop-shadow-xl');
    }
    currentPlayingButton = button;
    button.classList.add('animate-glowGreenShadowCycle', 'drop-shadow-xl');
    title.classList.add('animate-glowText', 'text-green-300');

    let waveInstance = waveSurferInstances.get(songFile);
    if (!waveInstance) {
      waveInstance = WaveSurfer.create({
        container: waveformDiv,
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

      waveSurferInstances.set(songFile, waveInstance);

      waveInstance.once('ready', () => {
        audio.play();
      });

      waveInstance.load(`/mp3/${songFile}`);
    } else {
      audio.src = `/mp3/${songFile}`;
      audio.load();
      audio.play();
    }
  }

  function playNext() {
    currentIndex = (currentIndex + 1) % playlist.length;
    const nextSong = playlist[currentIndex];
    const buttons = document.querySelectorAll('.audio-controls button');
    playSong(nextSong.file, buttons[currentIndex]);
  }

  audio.addEventListener('play', () => {
    if (currentPlayingButton) {
      currentPlayingButton.classList.add('animate-glowGreenShadowCycle', 'drop-shadow-xl');
      currentPlayingButton.classList.remove('animate-flashSlow');
    }
    title.classList.add('text-green-300', 'animate-glowText');
    title.classList.remove('text-violet-300');
    const waveInstance = waveSurferInstances.get(playlist[currentIndex]?.file);
    if (waveInstance) waveInstance.play();
  });

  audio.addEventListener('pause', () => {
    title.classList.remove('text-green-300', 'animate-glowText');
    title.classList.add('text-violet-300');
    if (currentPlayingButton) {
      currentPlayingButton.classList.remove('animate-glowGreenShadowCycle', 'drop-shadow-xl');
      currentPlayingButton.classList.add('animate-flashSlow');
    }
    const waveInstance = waveSurferInstances.get(playlist[currentIndex]?.file);
    if (waveInstance) waveInstance.pause();
  });

  audio.addEventListener('ended', playNext);
});
