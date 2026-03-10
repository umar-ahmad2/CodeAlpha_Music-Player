const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const playlistEl = document.getElementById("playlist");

const songs = [
  { title: "Shan e Ramazan", artist: "Waseem Badami, Junaid Jamshed & Amjad Sabri", src: "Shan-e-Ramazan-Kalaam-Waseem-Badami-ARY-_Media_yZzN1tXe_9Q_008_128k.m4a" },
  { title: "Assubhu Bada", artist: "Usaid Zahid Siddique", src: "Usaid-Zahid-Siddique-Assubhu-Bada.m4a" },
  { title: "Rahmatun Lil’Alameen", artist: "Maher Zain", src: "Rahmatun Lil’Alameen.m4a" }
];

let songIndex = 0;

// Load song
function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  title.textContent = song.title;
  artist.textContent = song.artist;
  highlightPlaylist(index);
}

// Play song
function playSong() {
  audio.play();
}

// Pause song
function pauseSong() {
  audio.pause();
}

// Next song
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
}

// Previous song
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
}

// Update progress bar
audio.addEventListener("timeupdate", () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent || 0;

  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

// Seek
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume control
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Autoplay next song
audio.addEventListener("ended", nextSong);

// Format time
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Playlist UI
function buildPlaylist() {
  playlistEl.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
      songIndex = index;
      loadSong(songIndex);
      playSong();
    });
    playlistEl.appendChild(li);
  });
}

function highlightPlaylist(index) {
  const items = playlistEl.querySelectorAll("li");
  items.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

// Event listeners
playBtn.addEventListener("click", playSong);
pauseBtn.addEventListener("click", pauseSong);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Initialize
buildPlaylist();
loadSong(songIndex);
