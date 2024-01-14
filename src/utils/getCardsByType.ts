import {IProfileCard} from '@/types/profileType';

type ProfileCardType = IProfileCard['type'];

const getCardsByType = (
  cards: IProfileCard[],
  type: ProfileCardType
): IProfileCard[] => {
  const filteredCards = cards.filter(card => card.type === type);

  return filteredCards;
};

export default getCardsByType;
