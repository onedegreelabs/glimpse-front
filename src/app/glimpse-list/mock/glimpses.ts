const dummyGlimpses = Array(30)
  .fill({
    name: 'test',
    location: 'San Fancisco, USA',
    text: "Lorem Ipsum is simply dummy  text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    avatarImg: '/assets/glimpse-list/glimpse-avatar.png',
    hobby: ['puppylove', 'coding studying', 'k-pop', 'kkkk'],
    position: ['Product', 'CEO'],
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

export default dummyGlimpses;
