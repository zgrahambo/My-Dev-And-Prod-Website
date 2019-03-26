export class Score {
  constructor(scoreSet) {
    if(!scoreSet) {
      this.numTracks = 0;
      this.duration = 0;
      this.popularity = 0;
      this.acousticness = 0;
      this.danceability = 0;
      this.energy = 0;
      this.tempo = 0;
      this.positivity = 0;
      this.speechiness = 0;
      this.loudness = 0;
      this.instrumentalness = 0;
    }
    else {
      this.duration = scoreSet.duration;
      this.popularity = scoreSet.popularity;
      this.acousticness = scoreSet.acousticness;
      this.danceability = scoreSet.danceability;
      this.energy = scoreSet.energy;
      this.tempo = scoreSet.tempo;
      this.positivity = scoreSet.positivity;
      this.speechiness = scoreSet.speechiness;
      this.loudness = scoreSet.loudness;
      this.instrumentalness = scoreSet.instrumentalness;
    }
  }
  increaseNumTracks() {
    this.numTracks += 1;
  }
  increaseDuration(duration) {
    this.duration += duration;
  }
  increasePopularity(popularity) {
    this.popularity += popularity;
  }
  increaseAcousticness(acousticness) {
    this.acousticness += acousticness;
  }
  increaseDanceability(danceability) {
    this.danceability += danceability;
  }
  increaseEnergy(energy) {
    this.energy += energy;
  }
  increaseTempo(tempo) {
    this.tempo += tempo;
  }
  increasePositivity(positivity) {
    this.positivity += positivity;
  }
  increaseSpeechiness(speechiness) {
    this.speechiness += speechiness;
  }
  increaseLoudness(loudness) {
    this.loudness += loudness;
  }
  increaseInstrumentalness(instrumentalness) {
    this.instrumentalness += instrumentalness;
  }

  getAverages() { // n = number of tracks
    const n = this.numTracks;
    return {
      popularity: this.popularity/n,
      acousticness: this.acousticness/n,
      danceability: this.danceability/n,
      energy: this.energy/n,
      tempo: this.tempo/n,
      positivity: this.positivity/n,
      speechiness: this.speechiness/n,
      loudness: this.loudness/n,
      instrumentalness: this.instrumentalness/n,
      duration: this.duration/n
    };
  }
}
