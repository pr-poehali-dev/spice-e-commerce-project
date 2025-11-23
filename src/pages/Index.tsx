import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  weight: string;
  category: string;
  image: string;
  description: string;
  origin: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
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

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Sparkles" className="text-primary" size={32} />
            <h1 className="text-3xl font-heading font-bold text-primary">Вкус Востока</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#catalog" className="text-foreground hover:text-primary transition-colors font-medium">
              Каталог
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
              О нас
            </a>
            <a href="#blog" className="text-foreground hover:text-primary transition-colors font-medium">
              Блог
            </a>
            <a href="#contacts" className="text-foreground hover:text-primary transition-colors font-medium">
              Контакты
            </a>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" size={20} />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle className="font-heading text-2xl">Корзина</SheetTitle>
              </SheetHeader>
              
              <div className="mt-8 flex flex-col gap-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <Icon name="ShoppingBag" className="mx-auto mb-4 text-muted-foreground" size={48} />
                    <p className="text-muted-foreground">Корзина пуста</p>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 space-y-4">
                      {cart.map(item => (
                        <Card key={item.id} className="p-4">
                          <div className="flex gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h3 className="font-heading font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.weight}</p>
                              <p className="text-lg font-semibold text-primary mt-1">
                                {item.price} ₽
                              </p>
                            </div>
                            <div className="flex flex-col items-end justify-between">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Icon name="X" size={16} />
                              </Button>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex justify-between text-lg font-heading font-semibold">
                        <span>Итого:</span>
                        <span className="text-primary">{cartTotal} ₽</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Оформить заказ
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://cdn.poehali.dev/projects/46345fac-9264-4faa-9674-f4fa48ff57e6/files/1bc6a044-9872-4812-9c35-920e66e75273.jpg)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white animate-fade-in">
          <h2 className="text-6xl md:text-7xl font-heading font-bold mb-6">
            Вкус Востока
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-light">
            Премиальные специи, чаи и травы со всего мира. Погрузитесь в мир ароматов и вкусов.
          </p>
          <Button size="lg" className="text-lg px-8">
            Исследовать каталог
          </Button>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              className="p-8 text-center hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedCategory('spices')}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Flame" className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-2">Специи и пряности</h3>
              <p className="text-muted-foreground">
                Отборные специи из разных уголков мира
              </p>
            </Card>

            <Card
              className="p-8 text-center hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedCategory('tea')}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                <Icon name="Coffee" className="text-secondary" size={32} />
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-2">Чай и травы</h3>
              <p className="text-muted-foreground">
                Элитные сорта чая и травяные смеси
              </p>
            </Card>

            <Card
              className="p-8 text-center hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedCategory('gift')}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Icon name="Gift" className="text-accent" size={32} />
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-2">Подарочные наборы</h3>
              <p className="text-muted-foreground">
                Эксклюзивные коллекции в красивой упаковке
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-heading font-bold">Хиты продаж</h2>
            <div className="flex gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
              >
                Все
              </Button>
              <Button
                variant={selectedCategory === 'spices' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('spices')}
              >
                Специи
              </Button>
              <Button
                variant={selectedCategory === 'tea' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('tea')}
              >
                Чай
              </Button>
              <Button
                variant={selectedCategory === 'gift' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('gift')}
              >
                Наборы
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden group hover:shadow-xl transition-all animate-scale-in">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 right-4">{product.origin}</Badge>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-heading font-semibold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">{product.price} ₽</p>
                      <p className="text-sm text-muted-foreground">{product.weight}</p>
                    </div>
                    <Button onClick={() => addToCart(product)}>
                      <Icon name="ShoppingCart" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-heading font-bold mb-6">Наша философия</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Мы путешествуем по всему миру, чтобы найти для вас самые качественные специи, 
              чаи и травы. Работаем напрямую с фермерами, которые соблюдают традиционные 
              методы выращивания и заботятся о природе.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Каждый продукт проходит строгий контроль качества и поставляется в экологичной 
              упаковке. Мы верим, что настоящий вкус — это сочетание качества, традиций и заботы.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <Icon name="Leaf" className="mx-auto mb-4 text-primary" size={48} />
              <h3 className="text-xl font-heading font-semibold mb-2">Натуральность</h3>
              <p className="text-muted-foreground">Без химических добавок и консервантов</p>
            </div>
            <div className="text-center">
              <Icon name="Globe" className="mx-auto mb-4 text-secondary" size={48} />
              <h3 className="text-xl font-heading font-semibold mb-2">Аутентичность</h3>
              <p className="text-muted-foreground">Продукты из регионов происхождения</p>
            </div>
            <div className="text-center">
              <Icon name="Heart" className="mx-auto mb-4 text-accent" size={48} />
              <h3 className="text-xl font-heading font-semibold mb-2">Этичность</h3>
              <p className="text-muted-foreground">Честная торговля и поддержка фермеров</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-heading font-bold mb-4 flex items-center gap-2">
                <Icon name="Sparkles" size={24} />
                Вкус Востока
              </h3>
              <p className="text-background/80">
                Премиальные специи и чаи со всего мира
              </p>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-4 text-lg">Каталог</h4>
              <ul className="space-y-2 text-background/80">
                <li><a href="#" className="hover:text-background transition-colors">Специи</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Чай</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Подарки</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Аксессуары</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-4 text-lg">Информация</h4>
              <ul className="space-y-2 text-background/80">
                <li><a href="#" className="hover:text-background transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Блог</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Контакты</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-semibold mb-4 text-lg">Контакты</h4>
              <ul className="space-y-2 text-background/80">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@vkusvostoka.ru
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (495) 123-45-67
                </li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8 bg-background/20" />
          
          <div className="text-center text-background/80 text-sm">
            © 2024 Вкус Востока. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}