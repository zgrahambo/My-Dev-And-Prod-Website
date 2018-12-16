export const awards = {
  duration: {
    icon: 'clock outline',
    text: 'Longest avg song length',
    id: '',
    val: 0
  },
  popularity: {
    icon: 'group',
    text: 'Most popular songs',
    id: '',
    val: 0
  },
  acousticness: {
    icon: 'battery zero',
    text: 'Loves acoustic songs',
    id: '',
    val: 0
  },
  danceability: {
    icon: 'child',
    text: 'Enjoys dancing music',
    id: '',
    val: 0
  },
  energy: {
    icon: 'bolt',
    text: 'High energy songs',
    id: '',
    val: 0
  },
  tempo: {
    icon: 'fire',
    text: 'Fastest tempo songs',
    id: '',
    val: 0
  },
  positivity: {
    icon: 'plus square',
    text: 'Most positive vibes',
    id: '',
    val: 0
  },
  speechiness: {
    icon: 'talk',
    text: 'Enjoys spoken words',
    id: '',
    val: 0
  },
  loudness: {
    icon: 'volume up',
    text: 'Turns it up to 11',
    id: '',
    val: 0
  },
  instrumentalness: {
    icon: 'wrench',
    text: 'Enjoys real instruments',
    id: '',
    val: 0
  }
};

const maxAmountOfAwards = 3;

export class PersonalAwards {
  constructor(awardList=[]) {
    if (awardList.length > maxAmountOfAwards)
      this.awardList = awardList.slice(0, maxAmountOfAwards);
    else
      this.awardList = awardList;
  }

  addAward(award){
    if (this.awardList.length > maxAmountOfAwards || !award.id)
      return false;
    this.awardList.push(award);
    return true;
  }
}
