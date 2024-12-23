// Simulated Track Data
const tracks = [
  {
    title: "Song 1",
    artist: "Artist 1",
    src: "https://example.com/song1.mp3",
    cover: "https://via.placeholder.com/150?text=Album+1",
  },
  {
    title: "Song 2",
    artist: "Artist 2",
    src: "https://example.com/song2.mp3",
    cover: "https://via.placeholder.com/150?text=Album+2",
  },
  {
    title: "Song 3",
    artist: "Artist 3",
    src: "https://example.com/song3.mp3",
    cover: "https://via.placeholder.com/150?text=Album+3",
  },
];

let currentTrackIndex = 0;
const audio = new Audio();
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const trackList = document.getElementById("trackList");
const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");
const albumCover = document.getElementById("albumCover");

function loadTrack(index) {
  const track = tracks[index];
  audio.src = track.src;
  songTitle.textContent = track.title;
  artistName.textContent = track.artist;
  albumCover.src = track.cover;
}

function populatePlaylist() {
  tracks.forEach((track, index) => {
    const li = document.createElement("li");
    li.textContent = `${track.title} - ${track.artist}`;
    li.addEventListener("click", () => {
      currentTrackIndex = index;
      loadTrack(index);
      audio.play();
      updatePlayPauseButton(true);
    });
    trackList.appendChild(li);
  });
}

function playPauseTrack() {
  if (audio.paused) {
    audio.play();
    updatePlayPauseButton(true);
  } else {
    audio.pause();
    updatePlayPauseButton(false);
  }
}

function changeTrack(step) {
  currentTrackIndex = (currentTrackIndex + step + tracks.length) % tracks.length;
  loadTrack(currentTrackIndex);
  audio.play();
  updatePlayPauseButton(true);
}

function updatePlayPauseButton(isPlaying) {
  playPauseBtn.textContent = isPlaying ? "⏸️" : "▶️";
}

// Event Listeners
playPauseBtn.addEventListener("click", playPauseTrack);
prevBtn.addEventListener("click", () => changeTrack(-1));
nextBtn.addEventListener("click", () => changeTrack(1));

// Initialize
populatePlaylist();
loadTrack(currentTrackIndex);
