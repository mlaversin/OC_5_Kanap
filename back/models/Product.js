const products = [
  {
    colors: ['Bleu', 'Blanc', 'Noir'],
    _id: '107fb5b75607497b96722bda5b504926',
    name: 'Kanap Sinopé',
    price: 1849,
    imageUrl: 'kanap01.webp',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    altTxt: "Photo d'un canapé bleu, deux places",
  },
  {
    colors: ['Noir/Jaune', 'Noir/Rouge'],
    _id: '415b7cacb65d43b2b5c1ff70f3393ad1',
    name: 'Kanap Cyllène',
    price: 4499,
    imageUrl: 'kanap02.webp',
    description:
      'Morbi nec erat aliquam, sagittis urna non, laoreet justo. Etiam sit amet interdum diam, at accumsan lectus.',
    altTxt: "Photo d'un canapé jaune et noir, quatre places",
  },
  {
    colors: ['Vert', 'Rouge', 'Orange'],
    _id: '055743915a544fde83cfdfc904935ee7',
    name: 'Kanap Calycé',
    price: 3199,
    imageUrl: 'kanap03.webp',
    description:
      'Pellentesque fermentum arcu venenatis ex sagittis accumsan. Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante.',
    altTxt: "Photo d'un canapé d'angle, vert, trois places",
  },
  {
    colors: ['Rose', 'Blanc'],
    _id: 'a557292fe5814ea2b15c6ef4bd73ed83',
    name: 'Kanap Autonoé',
    price: 1499,
    imageUrl: 'kanap04.webp',
    description:
      'Donec mattis nisl tortor, nec blandit sapien fermentum at. Proin hendrerit efficitur fringilla. Lorem ipsum dolor sit amet.',
    altTxt: "Photo d'un canapé rose, une à deux places",
  },
  {
    colors: ['Gris', 'Violet', 'Bleu'],
    _id: '8906dfda133f4c20a9d0e34f18adcf06',
    name: 'Kanap Eurydomé',
    price: 2249,
    imageUrl: 'kanap05.webp',
    description:
      'Ut laoreet vulputate neque in commodo. Suspendisse maximus quis erat in sagittis. Donec hendrerit purus at congue aliquam.',
    altTxt: "Photo d'un canapé gris, trois places",
  },
  {
    colors: ['Gris', 'Marine'],
    _id: '77711f0e466b4ddf953f677d30b0efc9',
    name: 'Kanap Hélicé',
    price: 999,
    imageUrl: 'kanap06.webp',
    description:
      'Curabitur vel augue sit amet arcu aliquet interdum. Integer vel quam mi. Morbi nec vehicula mi, sit amet vestibulum.',
    altTxt: "Photo d'un canapé gris, deux places",
  },
  {
    colors: ['Rouge', 'Argenté'],
    _id: '034707184e8e4eefb46400b5a3774b5f',
    name: 'Kanap Thyoné',
    price: 1999,
    imageUrl: 'kanap07.webp',
    description:
      'EMauris imperdiet tellus ante, sit amet pretium turpis molestie eu. Vestibulum et egestas eros. Vestibulum non lacus orci.',
    altTxt: "Photo d'un canapé rouge, deux places",
  },
  {
    colors: ['Rose', 'Brun', 'Jaune', 'Blanc'],
    _id: 'a6ec5b49bd164d7fbe10f37b6363f9fb',
    name: 'Kanap Orthosie',
    price: 3999,
    imageUrl: 'kanap08.webp',
    description:
      'Mauris molestie laoreet finibus. Aenean scelerisque convallis lacus at dapibus. Morbi imperdiet enim metus rhoncus.',
    altTxt: "Photo d'un canapé rose, trois places",
  },
];

exports.find = () => {
  return new Promise((resolve, reject) =>
    resolve(JSON.parse(JSON.stringify(products)))
  );
};

exports.findById = (id) => {
  return new Promise((resolve, reject) =>
    resolve(
      JSON.parse(JSON.stringify(products)).find((product) => product._id == id)
    )
  );
};
