export interface Glimpse {
  id: number;
  name: string;
  location: string;
  text: string;
  avatarImg: string;
  hobby: string[];
  position: string[];
  link: string[];
}

export const dummyGlimpses: Glimpse[] = Array(30)
  .fill({
    name: 'test',
    location: 'San Fancisco, USA',
    text: "Lorem Ipsum is simply dummy  text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    avatarImg: '/assets/glimpse-list/glimpse-avatar.png',
    hobby: ['puppylove', 'coding studying', 'k-pop', 'kkkk'],
    position: ['Product', 'CEO'],
    link: ['test', 'test', 'test', 'test'],
  })
  .map((obj, index) => {
    const {name = '', text = '', ...rest} = {...obj};
    return {
      id: index,
      name: `${name}${Math.ceil(Math.random() * 100)}`,
      text: `${Math.ceil(Math.random() * 100)}${text}`,
      ...rest,
    };
  });
