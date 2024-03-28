import {ProfileCardDto} from '@/types/profileType';

type ProfileCardType = ProfileCardDto['type'];

const getCardsByType = (
  cards: ProfileCardDto[],
  type: ProfileCardType
): ProfileCardDto[] => {
  const filteredCards = cards.filter(card => card.type === type);

  return filteredCards;
};

export default getCardsByType;
