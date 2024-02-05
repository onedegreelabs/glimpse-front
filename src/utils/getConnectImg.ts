import {linkImg} from '@/containers/my/profile/constans/profile';
import {ILinkImg} from '@/types/profileType';

const getConnectImg = (connectUrl: string): ILinkImg => {
  const filteredLinkImg = linkImg.filter(link => connectUrl.includes(link.alt));

  return filteredLinkImg.length === 0
    ? {alt: 'link', src: '/icons/link_icon.svg'}
    : filteredLinkImg[0];
};

export default getConnectImg;
