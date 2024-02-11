import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
import axios from 'axios';
import {IProfileCard} from '@/types/profileType';
import {linkImg} from '@/app/profile/const/profile';
import {ILinkImg} from '@/types/profileType';

type ProfileCardType = IProfileCard['type'];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const token = localStorage.getItem('accessToken');

export const customAxios = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Authorization: `Bearer ${token}` || '',
  },
});

export const getCardsByType = (
  cards: IProfileCard[],
  type: ProfileCardType
): IProfileCard[] => {
  const filteredCards = cards.filter(card => card.type === type);

  return filteredCards;
};

export const getConnectImg = (connectUrl: string): ILinkImg => {
  const filteredLinkImg = linkImg.filter(link => connectUrl.includes(link.alt));

  return filteredLinkImg.length === 0
    ? {alt: 'link', src: '/icons/link_icon.svg'}
    : filteredLinkImg[0];
};

export function getQueryString(url: string): {[key: string]: string} {
  const queryStringIndex = url.indexOf('?');
  if (queryStringIndex === -1) {
    return {};
  }

  const queryString = url.substring(queryStringIndex + 1);
  const queryParams: {[key: string]: string} = {};
  const pairs = queryString.split('&');

  for (const pair of pairs) {
    const [key, value] = pair.split('=');
    queryParams[decodeURIComponent(key)] = decodeURIComponent(value || '');
  }

  return queryParams;
}
