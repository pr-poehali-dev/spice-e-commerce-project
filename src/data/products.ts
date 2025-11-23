export interface Product {
  id: number;
  name: string;
  price: number;
  weight: string;
  category: string;
  image: string;
  description: string;
  origin: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Шафран Premium',
    price: 2500,
    weight: '5г',
    category: 'spices',
    image: 'https://images.unsplash.com/photo-1596040033229-a0b55ee2a6dc?w=800&auto=format&fit=crop',
    description: 'Красные нити шафрана высшей категории из Ирана',
    origin: 'Иран'
  },
  {
    id: 2,
    name: 'Кардамон зелёный',
    price: 890,
    weight: '50г',
    category: 'spices',
    image: 'https://images.unsplash.com/photo-1599909533554-f2504ab88e8e?w=800&auto=format&fit=crop',
    description: 'Целые стручки зелёного кардамона с горных плантаций',
    origin: 'Индия'
  },
  {
    id: 3,
    name: 'Китайский Пуэр',
    price: 1200,
    weight: '100г',
    category: 'tea',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&auto=format&fit=crop',
    description: 'Выдержанный чай с глубоким земляным вкусом',
    origin: 'Китай'
  },
  {
    id: 4,
    name: 'Улун молочный',
    price: 950,
    weight: '100г',
    category: 'tea',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop',
    description: 'Классический чай с нежным сливочным ароматом',
    origin: 'Тайвань'
  },
  {
    id: 5,
    name: 'Звёздчатый анис',
    price: 450,
    weight: '50г',
    category: 'spices',
    image: 'https://images.unsplash.com/photo-1599909533625-46bbf39df127?w=800&auto=format&fit=crop',
    description: 'Целые звёздочки аниса для сладких и пряных блюд',
    origin: 'Вьетнам'
  },
  {
    id: 6,
    name: 'Подарочный набор «Восток»',
    price: 3500,
    weight: '300г',
    category: 'gift',
    image: 'https://images.unsplash.com/photo-1607982920134-4b5f7e36a8d3?w=800&auto=format&fit=crop',
    description: 'Эксклюзивная коллекция специй в деревянной шкатулке',
    origin: 'Микс'
  }
];
