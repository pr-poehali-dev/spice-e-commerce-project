import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { products } from '@/data/products';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
}

const reviews: Review[] = [
  {
    id: 1,
    author: 'Анна Петрова',
    rating: 5,
    date: '15 октября 2024',
    text: 'Потрясающий шафран! Использовала для плова - аромат невероятный, цвет насыщенный. Качество на высоте!'
  },
  {
    id: 2,
    author: 'Дмитрий Соколов',
    rating: 5,
    date: '2 ноября 2024',
    text: 'Заказываю уже второй раз. Лучший шафран, который я пробовал. Упаковка герметичная, свежесть гарантирована.'
  },
  {
    id: 3,
    author: 'Мария Ковалёва',
    rating: 4,
    date: '8 ноября 2024',
    text: 'Отличное качество, но цена высоковата. Впрочем, для такого продукта это оправдано.'
  }
];

const recipes = [
  {
    id: 1,
    title: 'Классический плов с шафраном',
    time: '90 минут',
    difficulty: 'Средняя',
    description: 'Добавьте щепотку шафрана за 15 минут до готовности плова. Предварительно замочите нити в тёплой воде на 10 минут для лучшего раскрытия аромата.'
  },
  {
    id: 2,
    title: 'Шафрановый ризотто',
    time: '45 минут',
    difficulty: 'Средняя',
    description: 'Растворите шафран в тёплом бульоне и добавляйте постепенно к рису. Это придаст блюду золотистый цвет и тонкий аромат.'
  }
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-heading font-bold mb-4">Товар не найден</h2>
          <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
        </div>
      </div>
    );
  }

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={24} />
            </Button>
            <div className="flex items-center gap-2">
              <Icon name="Sparkles" className="text-primary" size={32} />
              <h1 className="text-3xl font-heading font-bold text-primary">Вкус Востока</h1>
            </div>
          </div>
          <Button variant="outline" size="icon">
            <Icon name="ShoppingCart" size={20} />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div className="relative h-[500px] rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Badge className="mb-2">{product.origin}</Badge>
              <h1 className="text-5xl font-heading font-bold mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={20}
                      className={i < Math.round(Number(avgRating)) ? 'text-primary fill-primary' : 'text-muted'}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {avgRating} ({reviews.length} отзывов)
                </span>
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            <div>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-5xl font-heading font-bold text-primary">
                  {product.price} ₽
                </span>
                <span className="text-xl text-muted-foreground">{product.weight}</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <label className="text-lg font-semibold">Количество:</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Icon name="Minus" size={18} />
                  </Button>
                  <span className="w-12 text-center text-xl font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Icon name="Plus" size={18} />
                  </Button>
                </div>
              </div>

              <Button size="lg" className="w-full text-lg" onClick={() => navigate('/checkout')}>
                <Icon name="ShoppingCart" size={20} className="mr-2" />
                Добавить в корзину — {product.price * quantity} ₽
              </Button>
            </div>

            <Card className="p-6 bg-muted/30">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Icon name="Truck" className="text-primary" size={24} />
                  <span>Бесплатная доставка от 3000 ₽</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Shield" className="text-primary" size={24} />
                  <span>Гарантия качества и свежести</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Leaf" className="text-primary" size={24} />
                  <span>100% натуральный продукт</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl">
            <TabsTrigger value="description">Описание</TabsTrigger>
            <TabsTrigger value="recipes">Рецепты</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы ({reviews.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-8">
            <Card className="p-8">
              <h2 className="text-3xl font-heading font-bold mb-6">О продукте</h2>
              <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  {product.name} — это премиальная специя, собранная вручную в лучших регионах {product.origin}. 
                  Каждая партия проходит строгий контроль качества, чтобы вы получили только свежий и ароматный продукт.
                </p>
                <p>
                  Выращивается традиционным способом без использования химикатов. Фермеры бережно собирают 
                  и обрабатывают сырьё, сохраняя все полезные свойства и натуральный вкус.
                </p>
                <h3 className="text-2xl font-heading font-semibold mt-6 mb-4 text-foreground">
                  Применение в кулинарии
                </h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Идеально для плова, ризотто и паэльи</li>
                  <li>Добавляет изысканный аромат соусам и маринадам</li>
                  <li>Прекрасно сочетается с морепродуктами</li>
                  <li>Используется в десертах и выпечке</li>
                </ul>
                <h3 className="text-2xl font-heading font-semibold mt-6 mb-4 text-foreground">
                  Хранение
                </h3>
                <p>
                  Храните в герметичной упаковке в прохладном тёмном месте. Срок годности — 24 месяца. 
                  Для сохранения аромата избегайте попадания прямых солнечных лучей.
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="recipes" className="mt-8">
            <div className="space-y-6">
              {recipes.map(recipe => (
                <Card key={recipe.id} className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-heading font-bold mb-2">{recipe.title}</h3>
                      <div className="flex gap-4 text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Icon name="Clock" size={16} />
                          {recipe.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="ChefHat" size={16} />
                          {recipe.difficulty}
                        </span>
                      </div>
                    </div>
                    <Icon name="BookOpen" className="text-primary" size={32} />
                  </div>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    {recipe.description}
                  </p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-8">
            <div className="space-y-6">
              <Card className="p-8">
                <div className="flex items-center gap-8 mb-6">
                  <div className="text-center">
                    <div className="text-6xl font-heading font-bold text-primary mb-2">
                      {avgRating}
                    </div>
                    <div className="flex items-center justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={20}
                          className={i < Math.round(Number(avgRating)) ? 'text-primary fill-primary' : 'text-muted'}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">на основе {reviews.length} отзывов</p>
                  </div>
                  <Separator orientation="vertical" className="h-24" />
                  <div className="flex-1">
                    <Button size="lg" className="w-full">
                      <Icon name="MessageSquare" size={20} className="mr-2" />
                      Написать отзыв
                    </Button>
                  </div>
                </div>
              </Card>

              {reviews.map(review => (
                <Card key={review.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar>
                      <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-heading font-semibold text-lg">{review.author}</h4>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={16}
                            className={i < review.rating ? 'text-primary fill-primary' : 'text-muted'}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{review.text}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
