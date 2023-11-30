const dummyGlimpses = Array(30)
  .fill({
    name: `test${Math.random() * 30}`,
    location: 'San Fancisco, USA',
    text: `${
      Math.random() * 123457
    }Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. `,
    avatarImg: '/assets/glimpse-list/glimpse-avatar.png',
    hobby: ['puppylove', 'coding studying', 'k-pop', 'kkkk'],
    position: ['CEO', 'Product'],
  })
  .map((obj, index) => {
    return {id: index, ...obj};
  });

export default dummyGlimpses;
