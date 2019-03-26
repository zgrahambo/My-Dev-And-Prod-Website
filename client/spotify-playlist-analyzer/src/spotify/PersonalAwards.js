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
